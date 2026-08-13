# Embargo

[![CI](https://github.com/fexx301/embargo/actions/workflows/ci.yml/badge.svg)](https://github.com/fexx301/embargo/actions/workflows/ci.yml)

**Pay valid bugs. Keep the exploit sealed.**

[Open the public demo](https://embargo-production.up.railway.app) — its
interactive workflow is deliberately labeled `LOCAL_SIMULATION`, while the
page separately links the real Coston2 execution evidence.

Embargo is a confidential bug-bounty protocol for Flare. A researcher sends a
strictly bounded, encrypted state-transition trace to a selected Flare
Confidential Compute TEE. The extension privately reproduces one pinned
ERC-4626 invariant failure and returns a signed, fixed-width receipt. The
contract verifies that receipt and pays the first valid finding without
publishing the exploit.

The winning trace stays on its original TEE so a sponsor can later replay it
against a patched profile and publish a narrow regression certificate.

## Live Coston2 proof

On 30 July 2026, Embargo completed the full FCC proof and settlement path on
Coston2 with simulated TEE attestation:

| Evidence | Value |
|---|---|
| Embargo contract | [`0xa779FdCc4bbaDC01A7E2EDfE12b8680E6ca5307a`](https://coston2-explorer.flare.network/address/0xa779FdCc4bbaDC01A7E2EDfE12b8680E6ca5307a), source verified |
| FCC extension | `65830` (`0x10126`) |
| TEE machine | [`0xdF59D0f044867E45a3148DAC2dcE3E02B630f881`](https://coston2-explorer.flare.network/address/0xdF59D0f044867E45a3148DAC2dcE3E02B630f881), manager status `2` |
| Encrypted finding | [`0xf4e78509…54feb`](https://coston2-explorer.flare.network/tx/0xf4e78509c7ecde4574272051464f71ff324a109356fad23ea8a06e06d7b54feb) |
| FXRP settlement | [`0x7be0cc27…492dd`](https://coston2-explorer.flare.network/tx/0x7be0cc27395fe4bd2f281a7bd1ff606f5e67cb2e8b77d60d4dee67a5a27492dd), researcher balance `0 → 1,000,000` FTestXRP base units |
| Same-TEE patch replay | [`0xa04fc8b0…95fefa`](https://coston2-explorer.flare.network/tx/0xa04fc8b0129089a6c9b5864448d509edf4a22917f4b9d5b827dd9a674295fefa), action `0x3352…5742a` |
| Patch certificate settlement | [`0x1157083d…6b566`](https://coston2-explorer.flare.network/tx/0x1157083dbab077145edc502290ecd15faf55322ca06cc24bde58b4e10576b566), status `Verified` |

This is a real Coston2 contract/FCC/FTestXRP run, but
`SIMULATED_TEE=true`: it does not claim confidential hardware. See the
[complete evidence ledger](docs/COSTON2_EVIDENCE.md).

## Why this is not another generic bounty board

Traditional bounty products coordinate disclosure. Embargo adds a neutral
machine-verifiable step between disclosure and payout:

- the researcher does not reveal the exploit to receive a validity decision;
- the sponsor does not pay based on an unauditable claim;
- the public result contains commitments and verdict fields, not the action
  sequence or amounts;
- patch verification reuses the exact sealed finding rather than a rewritten
  public proof; and
- the prototype accepts data only, never arbitrary bytecode, scripts,
  contracts, URLs, or researcher-supplied binaries.

The v0.1 verifier intentionally covers one vulnerability class well:
ERC-4626 donation/inflation traces that cause a successful positive deposit to
mint zero shares.

## End-to-end flow

1. A sponsor escrows one ERC-20 reward and commits the target build and verifier
   profile digests.
2. A researcher calls `reserveFinding`, which derives a finding ID and pins one
   registered TEE before encryption.
3. The client fetches that exact TEE's attested public key, encrypts the closed
   finding schema with ECIES, and uploads the ciphertext.
4. The FCC extension decrypts the payload, validates every field and bound,
   replays the deterministic model, and retains only a valid trace in sealed
   process state.
5. A relayer submits the TEE's signed canonical result. The contract checks its
   signer, instruction ID, domain, bindings, shape, and replay status before
   paying.
6. After remediation, the sponsor encrypts a candidate profile. The contract
   routes it to the winning finding's original TEE, which replays the retained
   trace and returns a patch certificate.

The reservation step is important: encryption never targets a TEE chosen later
by a random on-chain call.

## Repository map

| Path | Purpose |
| --- | --- |
| `app/` | Judge-facing product site and client-side ECIES/verifier simulation |
| `fcc/` | TypeScript FCC extension, closed schemas, ABI codec, sealed store, and tests |
| `protocol/` | Foundry bounty, settlement, TEE routing, patch state, mocks, and tests |
| `fixtures/` | Shared production-schema, result, and geth-compatible ECIES golden vectors |
| `compat/geth-ecies/` | Independent Go/go-ethereum crypto gate and resumable Coston2 FCC proof/settlement runner |
| `docs/PRODUCT_SPEC.md` | Frozen product behavior and acceptance criteria |
| `docs/ARCHITECTURE.md` | Components, trust boundaries, wire formats, and state machines |
| `docs/THREAT_MODEL.md` | Assets, adversaries, mitigations, and residual risk |
| `docs/DEMO_SCRIPT.md` | Reproducible judge demo and failure-path checks |
| `docs/COSTON2_RUNBOOK.md` | Gated FCC scaffold, deployment, registration, and evidence workflow |
| `docs/COSTON2_EVIDENCE.md` | Public Coston2 contract, TEE, proof, and FXRP transaction ledger |
| `docs/DORAHACKS_SUBMISSION.md` | Submission copy, evidence matrix, and honest placeholders |

## Run the project

Prerequisites:

- Node.js `>=22.13.0`
- npm
- Go `>=1.25.1` for the browser-to-tee-node ECIES compatibility gate
- Foundry for the Solidity suite

```bash
npm install
npm run dev
```

The web experience runs at `http://localhost:3000`.

Run the complete repository gate:

```bash
npm test
```

That command executes the browser-model unit vectors, production site build and
server-render checks, the FCC extension suite, and the Foundry suite.

Individual checks:

```bash
npm run lint
npm run test:web
npm run test:fcc
npm run test:protocol
```

FCC runtime commands:

```bash
cd fcc
npm ci
npm test
npm run typecheck
docker build --platform linux/amd64 -t embargo-fcc .
```

The Docker build requires a running Docker daemon. Unit tests replace the
TEE-node decrypt endpoint with an identity decryptor; production code always
uses the official base64 `/decrypt` wire shape.

Prepare and evaluate the live Coston2 FCC path without broadcasting:

```bash
./scripts/fcc/prepare-scaffold.sh
./scripts/fcc/check-coston2-readiness.sh
```

The second command intentionally returns `NO-GO` until the dedicated deployment
and proxy wallets have C2FLR, the HTTPS tunnel is configured, and the
Flare-provided indexer credentials are present. Test-FXRP funding is deliberately
deferred until the stack and registration are healthy. See the
[Coston2 runbook](docs/COSTON2_RUNBOOK.md).

After deployment and simulated-TEE registration, run proof and payout as two
explicit phases:

```bash
./scripts/fcc/run-coston2-e2e.sh
# Review outputs/coston2-evidence.json, then:
./scripts/fcc/run-coston2-e2e.sh --settle
```

The first command creates the escrow and FCC instruction but cannot release the
reward. The second resumes the same state, re-verifies the signed result, and
asserts the exact FTestXRP balance delta.

Run patch replay and certificate settlement as the same two gated phases:

```bash
./scripts/fcc/run-coston2-e2e.sh --patch
# Review the signed certificate, then:
./scripts/fcc/run-coston2-e2e.sh --patch --settle-patch
```

## What the web demo does

The interactive page uses the same field names, action union, bounds, profiles,
golden vector, deterministic replay, salted domain-separated Keccak commitment,
and patch payload as the FCC extension. It creates ciphertext in the exact
go-ethereum `ECIES_AES128_SHA256` wire format used by the pinned tee-node. A
committed TypeScript vector is independently decrypted by go-ethereum v1.16.7
in the Go compatibility gate.

It is deliberately labeled as a client-side simulation. It does **not** send a
Flare transaction, call a live TEE, release funds, or produce an attested
certificate. A separate read-only console decodes the live bounty, finding,
machine, reward, and patch state directly from Coston2. Judges may connect an
injected wallet as the RPC provider without signing or sending a transaction,
so local UI transitions are never confused with the live evidence.

## Current verification

- Public web demo: deployed on Railway and anonymously smoke-tested over HTTPS.
- Browser/site: 11 verifier, ECIES, and design-token tests; 4 rendered-HTML
  tests; production build; typecheck; and lint passing.
- Browser-to-tee-node crypto: the committed TypeScript ECIES vector decrypts
  with go-ethereum v1.16.7 in an independent Go test.
- Coston2 live runner: deployed contract
  [`0xa779…5307a`](https://coston2-explorer.flare.network/address/0xa779FdCc4bbaDC01A7E2EDfE12b8680E6ca5307a),
  with verified source, registered extension `65830` and TEE
  [`0xdF59…0f881`](https://coston2-explorer.flare.network/address/0xdF59D0f044867E45a3148DAC2dcE3E02B630f881),
  verified the signed FCC result, then settled
  [`1 FTestXRP`](https://coston2-explorer.flare.network/tx/0x7be0cc27395fe4bd2f281a7bd1ff606f5e67cb2e8b77d60d4dee67a5a27492dd)
  with the exact asserted balance delta. It later replayed the retained finding
  on that same TEE and settled the
  [verified patch certificate](https://coston2-explorer.flare.network/tx/0x1157083dbab077145edc502290ecd15faf55322ca06cc24bde58b4e10576b566).
- FCC extension: 25 tests passing, including the pinned tee-node
  `ActionResult` JSON contract, and TypeScript typecheck passing.
- FCC container: the pinned Linux/amd64 image builds successfully; an
  ephemeral-container smoke test verifies the tee-node binary, attestation
  root, compiled extension, and Node 22.23.1 runtime. CI repeats this on every
  branch/PR and publishes provenance plus an SBOM to GHCR for version tags.
- Solidity protocol: 36 tests passing, including 3 Foundry fuzz properties at
  512 runs each; `forge lint` and formatting clean.
- The shared FCC submit and patch result bytes settle in the Foundry suite.
- Contract runtime: 17,930 bytes, 6,646 bytes below the EIP-170 limit.
- `EmbargoBounties.sol` coverage: 95.29% lines and 100% functions.
- Root and FCC npm audits: zero known vulnerabilities in the production
  dependency trees that ship to users (`npm audit --omit=dev`), verified
  2026-08-10. Advisories published after that date can change this result
  without any change to the pinned lockfiles. Development-only build tooling
  (`vite`, `wrangler`, `miniflare`) currently carries open advisories whose
  fixes require breaking major upgrades; that code is never served to a
  browser and is deliberately not gated on.

## Honest limitations

- The exploit walkthrough is still a client-side simulation. The browser
  wallet integration is intentionally read-only; it verifies live Coston2
  state but does not submit confidential findings from a judge's wallet.
- The registered Coston2 machine used simulated TEE attestation, not GCP
  Confidential Space or another confidential-hardware deployment.
- The live reward was Coston2 `FTestXRP`. It proves testnet FXRP-compatible
  settlement, not a mainnet FXRP or native XRP payment.
- The live patch certificate proves only that the exact retained trace stopped
  reproducing under the fixed patched model. It does not authenticate an
  external vault artifact or prove the absence of other vulnerabilities.
- The reference verifier proves only the compiled zero-share invariant for one
  bounded trace language. It is not a general EVM or bytecode verifier.
- Valid finding state is process-local to the selected TEE. Patch replay is
  pinned to that machine; durable encrypted replication is future work.
- Ciphertext is public transaction data and may become decryptable if the TEE
  key is compromised later. Forward-secure key rotation and disclosure expiry
  are future work.
- FCC is beta infrastructure, and the local interface copies should be replaced
  with the published package when the API stabilizes.
- The contracts and extension have not received an independent security audit.

Read the full [threat model](docs/THREAT_MODEL.md) before treating the prototype
as production-ready.

## Flare references

- [Flare Confidential Compute overview](https://dev.flare.network/fcc/overview)
- [FCC getting started](https://dev.flare.network/fcc/guides/getting-started)
- [FCC TypeScript sign-extension guide](https://dev.flare.network/fcc/guides/sign-extension)
- [FXRP overview](https://dev.flare.network/fxrp/overview)

Built for Flare Summer Signal 2026.

Released under the [MIT License](LICENSE).
