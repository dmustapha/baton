# Sotto — a sealed-bid batch auction for FXRP on Flare

Sotto is a decentralised exchange where **front-running is impossible rather than merely
discouraged**. Orders are encrypted to a key that exists only inside a Trusted Execution
Environment, so the mempool carries ciphertext. Each batch clears at a **single uniform
price**, so even if someone could read the book, being first in the block would buy them
nothing.

Built for Flare Summer Signal. Targets both bounties from one codebase: FXRP — XRP bridged
trustlessly onto Flare — is the traded asset, and the matching engine runs inside Flare
Confidential Compute's TEE model.

---

## The problem

On a normal AMM, a swap sits in the public mempool before it executes. A searcher reads it,
buys ahead of it, lets your trade push the price up, and sells into you. You receive a worse
price and the difference goes to the bot. This is not an edge case — it is a standing tax on
every retail swap, and the usual defences (slippage limits, private RPCs, commit-reveal) all
either degrade the trade or move trust to whoever runs the relay.

## The approach

Two mechanisms, each covering the other's weakness:

**1. Encrypted orders.** A trader encrypts `(side, size, limit)` to the enclave's public key
using ECIES over secp256k1 and submits the ciphertext on-chain. `SottoBook` stores opaque
bytes and emits them. Nobody — not a searcher, not the operator, not us — can read an order
before it executes.

**2. Uniform clearing price.** Each 30-second batch settles at one price for everyone. The
enclave computes the call-auction crossing price that maximises matched volume, then clamps it
into a ±2% band around Flare's enshrined **FTSOv2** XRP/USD feed. The crossing price alone
respects the limits traders signed, but in a thin batch one fake order can drag it anywhere;
the clamp bounds that attack to 2% while never binding in a liquid batch.

## Why you don't have to trust us

The uncomfortable question for any TEE product is "what stops the operator lying?" Sotto
answers it on-chain, not in prose.

Google Confidential Space does not hand an application a raw Intel TDX quote. It issues an
**OIDC attestation token** — an RS256 JWT signed by Google's Attestation Verification Service
whose claims pin the exact container image digest running in the enclave. Verifying that token
therefore reduces to an RSA-2048 PKCS#1 v1.5 signature check, and the EVM has a **modexp
precompile at `0x05`**.

So `TeeAttestationVerifier` verifies Google's attestation **entirely on-chain**, in about
1.9M gas. There is no oracle, no relayer, and no admin key in the trust path:

| Property | Enforced by |
|---|---|
| The key holding the order book was generated inside a real TDX enclave | RSA signature over Google's attestation token |
| …running exactly the audited container image | `image_digest` claim checked against the registered digest |
| …and not some other key swapped in later | `eat_nonce` claim equals `keccak256(enclaveKey)` |
| Settlement really came from that enclave | ECDSA recover against the registered key |
| The price is not fabricated | ±2% band around FTSOv2, re-checked on-chain |
| Your fill is the one that was signed | Merkle proof against the signed root |
| The enclave runs *our* code, not just *some* TEE | `expectedImageDigest` pinned immutably in the book |
| Settlement cannot create or destroy value | A batch applies only if its fills net to exactly zero |

Registration is **permissionless**. Anyone can relay the attestation; the contract does the
checking. The enclave needs no gas and no privileged operator to come into service.

---

## Live on Coston2

| Contract | Address |
|---|---|
| `TeeAttestationVerifier` | [`0x72097934F45ec9A57F55f159802Aa7832Cac160c`](https://coston2-explorer.flare.network/address/0x72097934F45ec9A57F55f159802Aa7832Cac160c) |
| `SottoBook` | [`0xEC1Cd3F33Ea7c532331697D262f06C3A7BF2E197`](https://coston2-explorer.flare.network/address/0xEC1Cd3F33Ea7c532331697D262f06C3A7BF2E197) |
| `TestUSD` (quote) | [`0x4CBE960DEb6e27259B4933E4E636F1291b437265`](https://coston2-explorer.flare.network/address/0x4CBE960DEb6e27259B4933E4E636F1291b437265) |
| **FXRP** (base, real Coston2 FAsset) | [`0x0b6A3645c240605887a5532109323A3E12273dc7`](https://coston2-explorer.flare.network/address/0x0b6A3645c240605887a5532109323A3E12273dc7) |

The four live Google Confidential Space signing keys are registered on-chain as the system's
only trust anchor, pulled from
`signer@confidentialspace-sign.iam.gserviceaccount.com`.

The base asset is the **real** Coston2 FAsset resolved from `AssetManagerFXRP` in the Flare
contract registry — XRP brought onto Flare without a bridge multisig. The quote token is a
local test stablecoin with an open faucet purely so a judge can reproduce a trade without
hunting for testnet liquidity.

## Flare primitives used

- **FAssets / FXRP** — the traded base asset, resolved live from `AssetManagerFXRP`.
- **FTSOv2** — enshrined XRP/USD feed, read on-chain inside `settleBatch` to bound the
  clearing price. Not an off-chain price the enclave asserts; the contract fetches it itself.
- **Flare Contract Registry** — all Flare addresses resolved at runtime, nothing hardcoded.
- **Confidential Compute / TDX** — the matching engine, with attestation verified on Flare.

Flare Confidential Compute is documented as *"in the final stages of development and not yet a
fully public production system"*, so third parties cannot yet deploy onto Foundation-operated
TEE nodes. Sotto therefore runs the enclave on Intel TDX via Google Confidential Space — the
same path Flare's own `flare-ai-kit` SDK uses — with attestation verified by a contract on
Flare. When FCC opens to third-party workloads the enclave moves; the on-chain verifier does
not change.

---

## Repository layout

```
contracts/
  TeeAttestationVerifier.sol   on-chain RS256 verification of Google TDX attestations
  SottoBook.sol                encrypted order mailbox, batch settlement, Merkle claims
  TestUSD.sol                  quote-side test stablecoin with an open faucet
  test/                        harnesses and probes used only by the test suite
enclave/
  main.py                      boot, attest, then run batches forever
  attest.py                    fetches the Confidential Space attestation token
  matching.py                  clearing rule: crossing price clamped to the FTSO band
  orders.py                    ECIES envelope, and dropping unreadable spam safely
  chain.py                     ABI, Merkle tree, settlement digest
  Dockerfile                   pinned build; its digest is what the attestation commits to
scripts/                       deploy, JWKS sync, enclave activation, live demo
test/                          Solidity tests plus Python/Solidity cross-language vectors
web/
  src/pages/                   landing, docs, and the four app screens
  src/lib/                     chain access, ECIES sealing, Merkle port
  src/components/              cipher animation, panels, scroll reveals
```

## The web app

```bash
cd web && npm install
npm run dev
```

Contract addresses are read from `deployments/coston2.json` at build time, so a redeploy is
picked up by the next build with nothing to edit by hand.

Four screens, deliberately developer-facing before consumer-facing:

- **Setup** — connect, faucet, deposit. Approves only when the allowance is actually short.
- **Trade** — composes an order, seals it with ECIES *in the browser*, and shows the exact
  ciphertext before anything is submitted. The encryption key is read from
  `book.enclavePublicKey()` rather than cached, because a restarted enclave rebinds a fresh
  key and an order encrypted to a stale one could never be opened.
- **Batches** — settled batches with clearing price, FTSO reference, drift, and Merkle root,
  plus pull-based fill claiming with the proof rebuilt client-side.
- **Enclave** — the attestation inspector. It *recomputes* its claims in the browser rather
  than asserting them: that the verifier holds an active registration, that the on-chain
  digest is the keccak of the attested image digest, and that the bound public key derives to
  the bound address.

## Reproducing it

```bash
npm install
npx hardhat test                                    # 23 tests, no network needed
python enclave/test_enclave.py                      # enclave crypto self-checks

npx hardhat run scripts/deploy.js     --network coston2
npx hardhat run scripts/syncJwks.js   --network coston2   # Google's real signing keys

powershell -File scripts/enclave.ps1 up                   # start, attest, register, fund
npx hardhat run scripts/demo.js       --network coston2   # live encrypted trade
npx hardhat run scripts/frontrun.js   --network coston2   # searcher vs AMM, then vs Sotto
powershell -File scripts/enclave.ps1 down                 # stop billing
```

The enclave VM is normally **stopped** — Confidential Space bills by the second and the book
only needs to be live while someone is trading. `enclave.ps1 up` brings it back and re-registers
it on-chain, which is required regardless: a restarted enclave mints a fresh key inside the TEE
and must be re-attested before it can settle anything.

### Verifying the enclave yourself

You do not have to take the deployment on faith:

```bash
docker build -t sotto-check enclave/           # rebuild the image
docker inspect --format='{{.Id}}' sotto-check  # compare to the on-chain image digest
```

If the digest matches what `TeeAttestationVerifier.enclaves(enclaveKey)` recorded, the code in
this repository is the code that held the order-book key.

## Testing

- **23 Solidity tests.** Beyond happy paths, they assert the adversarial cases that matter: a
  tampered attestation payload, a *genuinely Google-signed* token attesting the wrong image, a
  settlement signed by an unattested key, a clearing price outside the FTSO band, a forged
  Merkle fill, and a replayed claim.
- **Cross-language vectors.** The enclave builds Merkle trees in Python; the chain verifies
  them in Solidity. A divergence in leaf hashing or pair ordering would not fail loudly — every
  claim would just revert. `test/crosslang.test.js` pins the two implementations together with
  fixtures generated by `python enclave/test_enclave.py --vectors`.
- **ECIES interop.** `eciesjs` (client) and `eciespy` (enclave) are checked to round-trip.
- **Chain capability probe.** `scripts/checkEvm.js` proves Coston2 executes `MCOPY` before the
  build depends on a Cancun target.

## Known limits

Honest accounting of what is deliberately unfinished:

- The enclave currently runs on the `confidential-space-debug` image, whose tokens carry
  `dbgstat: enabled`. Production images are a one-line change once serial-console debugging is
  no longer needed.
- Claim matching in `TeeAttestationVerifier` is a substring search, not a JSON parser. Safe
  while both needles are high-entropy and claims come from Google; it would need a real parser
  if anything attacker-influenced entered that payload.
- Pro-rata allocation floors each fill, dropping at most one unit per order. Irrelevant at
  6-decimal precision, would need remainder assignment for whole-unit assets.
- A restarted enclave generates a fresh key and must be re-attested and re-bound. That is the
  security model working as intended, not a bug, but a production deployment would want two
  enclaves overlapping so the book never pauses.
