# Nightjar

![Nightjar logo](web/public/nightjar-logo.png)

**Confidential cross-chain RFQ and settlement for XRP on Flare.**

Nightjar lets a treasury buy XRP without broadcasting its size, limit price, or the liquidity providers' competing quotes. Flare Confidential Compute (FCC) decrypts and matches the RFQ inside an attested TEE. Flare Time Series Oracle (FTSO) constrains the winning price. Flare Data Connector (FDC) proves the provider's XRP Ledger payment before USDT0 escrow is released.

Built for **Flare Summer Signal 2026**, targeting both the Confidential Compute Apps and Interoperable Asset Products bounties.

**Live demo:** [nightjar-eight.vercel.app](https://nightjar-eight.vercel.app) · **Repository:** [github.com/Hexdee/nightjar](https://github.com/Hexdee/nightjar)

## Why it exists

Large public orders leak intent and invite adverse price movement. A centralized OTC desk hides the order, but asks both sides to trust the operator and its settlement records. Nightjar combines private execution with verifiable settlement:

- RFQ size, limit, XRP address, and all quotes are ECIES-encrypted to the selected FCC TEE.
- The enclave applies deterministic best-price matching and reveals no losing quote.
- A signed match receipt is accepted only if its clearing price is inside the user's limit and FTSO deviation band.
- The buyer's USDT0 remains in a Flare escrow until FDC proves the exact XRP payment on XRPL.
- The proof is bound to the provider, buyer, amount, RFQ memo, and this settlement contract.

## Core flow

```mermaid
sequenceDiagram
    participant B as Treasury buyer
    participant LP as Liquidity providers
    participant FCC as Nightjar TEE
    participant S as Flare escrow
    participant X as XRP Ledger
    participant FDC as Flare Data Connector

    B->>FCC: Encrypted RFQ
    LP->>FCC: Encrypted quotes
    FCC->>FCC: Filter by limit + FTSO band; select best
    FCC-->>B: Signed minimal match receipt
    B->>S: Lock USDT0 with receipt
    LP->>X: Pay XRP to buyer (RFQ ID memo)
    X-->>FDC: Finalized XRP payment
    B->>S: Submit FDC XRPPayment proof
    S->>LP: Release USDT0
```

## Flare integration

| Primitive | Nightjar use |
| --- | --- |
| FCC | Encrypted RFQ/quote delivery, private in-enclave matching, signed settlement receipt |
| FTSOv2 | XRP/USD reference price and stale-price/deviation protection at escrow creation |
| FDC | `XRPPayment` proof verifies source, recipient, drops received, transaction ID, and RFQ memo |
| Coston2 | Target testnet for the FCC instruction sender and settlement escrow |

## Coston2 deployment

| Component | Address / identifier |
| --- | --- |
| Nightjar `InstructionSender` | [`0x5cb3aa00dc062d9eB6A0c9fE940bC793Ee320eb6`](https://coston2-explorer.flare.network/address/0x5cb3aa00dc062d9eB6A0c9fE940bC793Ee320eb6) |
| Nightjar `NightjarSettlement` | [`0x5f574B03f5221a88bc60f4c57e543c8b98587FB7`](https://coston2-explorer.flare.network/address/0x5f574B03f5221a88bc60f4c57e543c8b98587FB7) |
| FCC extension ID | `0x0000000000000000000000000000000000000000000000000000000000010241` |
| FCC image | `sign-extension-go:v0.1.0` · image `sha256:69ad69f…c9cac` · production attestation mode |
| Settlement deployment transaction | [`0x86b59ceb35ef94365669d48e38bd673c759d1734f9ab51ae680a893c8cd9afff`](https://coston2-explorer.flare.network/tx/0x86b59ceb35ef94365669d48e38bd673c759d1734f9ab51ae680a893c8cd9afff) |

The settlement deployment resolves to Coston2's current `FtsoV2` (`0xC4e9…304d`) and `FdcVerification` (`0x9065…B933`) contracts. The FCC instruction sender and extension registration are live; the full Go extension image still requires placement on an attested Confidential Space host.

The FCC implementation is based on Flare Foundation's MIT-licensed [`fce-sign`](https://github.com/flare-foundation/fce-sign) encrypted-delivery example. Nightjar's RFQ model, matcher, signed receipt, FTSO guard, FDC settlement, and tests are new work.

## Repository map

- `go/internal/extension/` — confidential RFQ engine (the deployable Go TEE implementation)
- `go/pkg/types/` — encrypted inputs and minimal public output types
- `contracts/InstructionSender.sol` — FCC on-chain instruction entrypoint
- `contracts/NightjarSettlement.sol` — USDT0 escrow, FTSO validation, FDC settlement
- `test/NightjarSettlement.t.sol` — settlement and adversarial proof tests
- `web/` — interactive treasury execution desk and full proof-flow demo
- `scripts/` and `go/tools/` — official FCC build, registration, and deployment tooling

## Run the verified core

Requirements: Go 1.25+, Foundry, and Docker for the local FCC stack.

```bash
cd go
go test ./...

cd ..
forge test
```

For the simulated Coston2 FCC environment:

```bash
bash ./scripts/use-chain.sh coston2
bash ./scripts/full-setup.sh --chain coston2 --test
```

The Coston2 proxy requires read-only Flare indexer credentials supplied by the hackathon organizers. Keep them in the ignored proxy configuration files; never commit them.

## Privacy and trust model

The public chain sees FCC instruction ciphertext, aggregate extension counters, the selected provider, the clearing price, and settlement status. It does not see the RFQ's limit, losing quotes, or quote-provider pricing history.

This hackathon implementation encrypts inputs to the current TEE public key before placing ciphertext on-chain. That is suitable for the demo but not forward secrecy against a future compromise of the TEE key. A production deployment should use FCC direct actions over an authenticated ephemeral channel, signer rotation, persistent sealed state, multiple admitted TEE implementations, and explicit recovery procedures.

FDC verifies that an XRPL payment happened; it does not reverse that payment. If the provider pays after escrow expiry, a production system needs a grace period or dispute/recovery path. The MVP makes the deadline visible and rejects proof after expiry.

## Status

- [x] Encrypted RFQ and quote ingestion
- [x] Deterministic buy/sell best-price matching
- [x] FTSO price-band enforcement
- [x] TEE-signed, domain-separated match receipt
- [x] USDT0 escrow with FDC `XRPPayment` verification
- [x] Replay, wrong-recipient, out-of-band, and expiry tests
- [x] Responsive browser demo with wallet detection and end-to-end RFQ walkthrough
- [x] Coston2 instruction sender, extension registration, and settlement deployment
- [x] Reproducible production-mode FCC Go image (`sha256:69ad69f…c9cac`)
- [ ] Attested Confidential Space host for the FCC Go extension image
- [ ] Demo recording

Not audited. Hackathon software; do not use with real funds.
