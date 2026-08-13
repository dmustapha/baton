# Veil

**Confidential credit for FXRP on Flare.** A borrower proves creditworthiness over private
financial data inside a Trusted Execution Environment, and borrows FXRP **under-collateralized**
against the attested result — without their raw financials ever touching the chain.

**Watch the walkthrough:** [youtu.be/vv1xXqrgzXA](https://youtu.be/vv1xXqrgzXA) — the whole loop in
two and a half minutes, and every transaction in it is real.
**Try it:** [veil-flare.vercel.app](https://veil-flare.vercel.app) — reads the live deployment on
Coston2. A borrower's file is on display before you connect anything.

## The problem

On-chain lending is stuck at over-collateralization. To lend against someone's creditworthiness
you have to assess private data, and a public blockchain can't hold private data — so every
borrower has to post more than they take. Veil breaks that deadlock with Flare Confidential
Compute: the assessment happens inside an enclave, and only a signed verdict leaves it.

## How it works

```
 borrower's private financials
        │  (ECIES-encrypted to the enclave)
        ▼
 VeilInstructionSender ── binds the caller's address on-chain ──► Flare Compute Extension (TEE)
                                                                    │  scores over private inputs
                                                                    │  signs { borrower, line, expiry }
        ┌───────────────────────────────────────────────────────────┘
        ▼
   CreditOracle ── verifies the enclave signature, publishes the line ──► VeilMarket
                                                                            │ under-collateralized
                                                                            │ FXRP loan, priced by FTSO
                                                                            ▼
                                                                       borrower draws FXRP
```

- **Veil Compute Extension** — a [Flare Compute Extension](https://dev.flare.network/fcc/overview)
  running in a Confidential Space TEE. Borrower financials are encrypted to the enclave, decrypted
  only inside it, scored by a deterministic model, and the verdict is signed with the enclave's
  key. Lender rate-bids are cleared the same way, as a sealed-bid auction, so no rate is visible
  before the round clears.
- **CreditOracle** — verifies the enclave signature on-chain (the exact Flare Compute Extension
  settlement scheme) and publishes each borrower's attested credit line. It **fails closed**: a
  wrong signer, a stale attestation, a replay, or a non-success status all revert.
- **VeilMarket** — a two-sided lending market. Lenders supply FXRP for shares; borrowers draw
  FXRP up to their collateral value plus their attested credit line, priced live by the FTSO
  XRP/USD feed. A request beyond that limit reverts on-chain.
- **ICreditOracle** — the credit line is a reusable primitive. `ReferenceLendingPool` shows a
  separate protocol extending credit through the same interface, and `@veil/sdk` reads it from
  any app.

## Why the enclave is load-bearing

The credit line has to be **private** (it's computed from sensitive financials) but also
**on-chain usable** and **tamper-proof**. That combination is exactly what confidential compute
provides and a normal contract cannot: the inputs stay sealed, yet the output is a verifiable,
signed value the market can act on. Remove the TEE and under-collateralized lending is impossible.

## The key that outlives the machine

An enclave that mints a fresh key on every boot cannot be trusted permanently — each restart would
need a new `setTeeAddress`, and whoever sends that transaction becomes a second thing you have to
trust. Veil closes that hole with the mechanism Confidential Space exists for.

The enclave mints its signing key **inside the TEE** on first boot, wraps it with a Cloud KMS key
and stores only the wrapped blob. On every later boot it authenticates to Google with its own
attestation token through Workload Identity Federation, and the pool's provider only issues
credentials when the token's claims carry the expected measured image, `CONFIDENTIAL_SPACE`,
`GCP_AMD_SEV` and secure boot. Only then does KMS unwrap the key.

So the plaintext key exists in exactly two places: inside an attested enclave, and nowhere. Run a
modified image and the measurement changes, the federation refuses the exchange, KMS never unwraps,
and the enclave falls back to an ephemeral key that the oracle does not trust — it can sign all it
likes and nothing it signs is accepted. `teeAddress` is therefore set **once**, and the address
survives every reboot. See `enclave/sealedkey.go`.

## Live on Coston2

Deployed and verified, wired to the real FTSO oracle and the real FXRP token:

- **CreditOracle** — [`0x551AABfCE5664927cC965f8063Da30CFE518EEb2`](https://coston2-explorer.flare.network/address/0x551AABfCE5664927cC965f8063Da30CFE518EEb2)
- **VeilMarket** — [`0xD780800558DDAd45F15EF6894Dd432D24f16ab21`](https://coston2-explorer.flare.network/address/0xD780800558DDAd45F15EF6894Dd432D24f16ab21)

The credit line below was scored and signed inside a **real GCP Confidential Space (AMD SEV)
enclave**: a Google-signed attestation (`iss: confidentialcomputing.googleapis.com`,
`hwmodel: GCP_AMD_SEV`) bound the enclave's key to the measured image, and `CreditOracle.teeAddress`
was set to that key. The full flow, on-chain:

| Step | Transaction |
|---|---|
| Trust the enclave — register the key bound into its attestation | [`0xee69bcba…`](https://coston2-explorer.flare.network/tx/0xee69bcba2bf216a448d860d5ae3e025cd0a4d014ad3108610f93ef535c58b642) |
| Publish the enclave-signed credit line ($8.00) | [`0xc445a6e6…`](https://coston2-explorer.flare.network/tx/0xc445a6e6032b27121dab1d7f2133cfe04cbb1a68203f214251624430c0a8f055) |
| Borrow FXRP under-collateralized, within the line | [`0xb2a49bcf…`](https://coston2-explorer.flare.network/tx/0xb2a49bcf2dac61d518021b1eda6c525c7935eeda824693169a5ea8284d2bf8fa) |
| Borrow over the line → refused on-chain | [`0x85d2bdac…`](https://coston2-explorer.flare.network/tx/0x85d2bdac50e3ebe7f38b621f7aa80ec18933a225be8a2d79793a5e49e568416c) |

## The enclave sleeps

A confidential VM costs real money to leave running and does nothing between borrowers, so this
one is dormant by default. Opening the Apply page starts it; a cold boot takes about a minute
(pull, measure, attest, unwrap the key) and the page waits, saying what it is waiting for. After
twenty idle minutes the enclave exits and a watchdog powers the instance off behind it.

That only works because the signing key is stable: a fresh key on every boot would need a fresh
`setTeeAddress`, and whoever sent that transaction would become a second thing to trust. Here the
key comes back from KMS, so waking the machine is an operational detail rather than a change of
identity. The credentials that start the VM can start a VM and nothing else — they cannot make the
oracle accept anything.

Everything already on-chain stays verifiable whether or not the enclave is awake: the published
credit line, the position drawn against it, the refusal, and the live check on `/proof`. When no
enclave is reachable and none can be started, the interface says so plainly instead of pretending.
See `enclave/README.md` for the deployment.

## Tests

- 32 Solidity tests (`forge test`), including the credit-line enforcement, interest, liquidation,
  and the reference integration.
- A Coston2 fork test that enforces the credit line against the **live** FTSO XRP/USD price.
- A Go suite for the enclave engines — deterministic scoring, sealed-bid clearing, and the ABI
  bridge (checked byte-for-byte against Solidity's encoding).

## Repo layout

```
contracts/     Solidity (Foundry) — CreditOracle, VeilMarket, VeilInstructionSender, examples, tests
core/          Go — the enclave engines (scoring, sealed-bid clearing, ABI wire); builds standalone
enclave/       Go — the deployable Confidential Space service
extension/     Go — the Flare Compute Extension (official FCC integration)
packages/sdk/  TypeScript SDK for integrators
web/           Next.js — the borrower's file, the lender's pool, and the attestation behind them
```

## Build

```bash
# contracts
cd contracts && forge test

# enclave engines
cd core && CGO_ENABLED=0 go test ./...

# sdk — read the live deployment
cd packages/sdk && npm install && npm run read:live
```

The enclave (`enclave/`) deploys to GCP Confidential Space; the Flare Compute Extension
(`extension/`) is the official FCC integration path. See each directory's README.

## Limits

The scoring model reads self-reported financials; binding those inputs to verified sources through
Flare's Data Connector is the natural next step. On-chain, the credit line is only ever drawable by
the address it was attested for.

## License

MIT
