# Confidential Settlement — Flare Summer Signal (Bounty 2: Confidential Compute Apps)

A **confidential AML/risk decisioning engine for agent payments**, built as a
Flare Confidential Compute (FCC) extension. An AI agent submits an AP2
`PaymentMandate` on-chain; the risk model evaluates it **inside a TEE** and
returns a signed `ALLOW`/`DENY` verdict. The scoring weights, the AML watchlist,
and the per-counterparty exposure ledger **never leave the enclave** — only the
bucketed verdict is observable on-chain.

> **Bounty:** Confidential Compute Apps ($4,000 / $2,000) · **Event:** Flare
> Summer Signal (DoraHacks) · submission deadline **Aug 14, 2026**.

## The problem

Agentic payments need a guardrail: *should this autonomous payment be allowed?*
That decision depends on an AML watchlist, sanctioned-counterparty lists, and
risk/exposure policy. But if you put that policy on-chain, you leak it — anyone
can read the thresholds and structure payments to slip under them, and the
watchlist itself is sensitive. If you put it on a centralized server, you lose
verifiability. **FCC resolves the dilemma:** the policy runs in an attested TEE,
so it stays secret *and* its verdicts are trustworthy.

## What it does

| Operation | What happens in the enclave | What's revealed on-chain |
|-----------|------------------------------|--------------------------|
| `SCORE_MANDATE` | Hard AML blocklist check, sanctioned-keyword scan, per-currency notional ceiling, cumulative-velocity check, graduated risk score | `{allowed, riskBucket (LOW/MEDIUM/HIGH/BLOCKED), reason, decisionNum}` |
| `GET_EXPOSURE` | Look up confidential running notional for a counterparty | `{exposureTier (NONE..OVER_LIMIT), settledCount}` — bucketed, never raw |

Scores and notionals are **bucketed** on the way out so the confidential model
can't be reconstructed by probing it with crafted mandates.

## Architecture

```
 AI agent ──(AP2 PaymentMandate JSON)──▶ SettleInstructionSender.sol
                                              │ sendScoreMandate()
                                              ▼
                                   Flare TEE Extension Registry
                                              │ relays instruction
                                              ▼
                        ┌─────────────────────────────────────────┐
                        │  Confidential Compute Extension (TEE)    │
                        │  internal/extension/risk.go  ← SECRET    │
                        │   • AML blocklist                        │
                        │   • sanctioned keywords                  │
                        │   • per-currency limits                  │
                        │   • cumulative exposure ledger           │
                        └─────────────────────────────────────────┘
                                              │ signed verdict
                                              ▼
                                   ALLOW / DENY  (+ reason, bucket)
```

- `internal/extension/risk.go` — **the confidential policy**. Weights, watchlist,
  keyword set, exposure limits. In production these are sealed into the enclave at
  attestation time; inlined here for a runnable demo.
- `internal/extension/extension.go` — instruction routing + the confidential
  exposure ledger (enclave-only mutable state) + public counters.
- `contracts/SettleInstructionSender.sol` — on-chain entry point.

## What was newly built vs. ported (judging criteria: "evidence of new work")

This entry **ports the risk/AML decisioning model from a prior project
(SettleStack)** — originally a HashKey-chain settlement-guard built on Google's
AP2 mandate spec — and re-homes its "brain" inside a Flare TEE.

- **Ported (pre-existing):** the AP2 `PaymentMandate` model, the deterministic
  risk-rule design (AML blocklist + sanctioned-keyword + notional ceiling +
  velocity), and the ALLOW/DENY-with-reason verdict shape.
- **Newly built for Flare Summer Signal:** the entire FCC extension — Go
  instruction handlers (`SCORE_MANDATE`, `GET_EXPOSURE`), the **confidential
  exposure ledger as enclave-only persistent state**, score/exposure **bucketing**
  so the model stays secret under probing, the `SettleInstructionSender` FCC
  entry-point contract, decoder registrations, and the 12-test suite.
- **Why it matters for Flare:** turns settlement risk from "either secret OR
  verifiable" into "secret AND verifiable" — only possible with Confidential
  Compute. The watchlist and thresholds are exactly the kind of data that must
  stay private but must also be provably applied.

## Build & test (ground-truth receipts)

```bash
cd extension

# Go extension — builds + 12/12 tests pass
go build ./...
go test ./internal/... ./pkg/...        # ok  internal/extension  (12 tests)

# Solidity entry-point contract — compiles (solc 0.8.30, via-IR)
forge build                             # Compiler run successful! (3 files)
```

Verified on Go 1.25.1 / forge 1.7.1 against the pinned Flare `tee-node`
(`v0.0.21-0.20260619...`) and `go-flare-common v1.2.2-...`.

## Status

- [x] FCC extension ported from SettleStack risk core — **builds clean**.
- [x] Confidential risk model (AML / keywords / limits / velocity / exposure) —
      **12/12 unit tests pass**.
- [x] `SettleInstructionSender.sol` — **compiles** (solc 0.8.30).
- [ ] Coston2 simulated-TEE deploy (next: request indexer-DB creds in Flare TG;
      run `scripts/full-setup.sh --chain coston2 --test`).
- [ ] Demo video + DoraHacks BUIDL submission.

## Layout

```
extension/                     FCC extension (Go) + entry-point contract
  internal/config/config.go       OPType/OPCommand constants
  internal/extension/extension.go instruction routing + enclave state
  internal/extension/risk.go      ★ confidential risk policy (enclave-only)
  pkg/types/                      request/response types + decoder registry
  contracts/                      SettleInstructionSender.sol
  scripts/                        pre-build / full-setup / test (from scaffold)
deps/tee-node/                  Flare TEE node (pinned dependency)
```

Built on Flare Foundation's `fce-extension-scaffold`.
