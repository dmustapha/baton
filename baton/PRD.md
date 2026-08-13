# Baton — Product Requirements Document

**Hackathon:** Flare Summer Signal
**Track:** Interoperable Asset Products (single track, full commit)
**Deadline:** 2026-08-14 19:59 UTC (platform) · internal safety 17:59 UTC — **~22h build remaining**
**Version:** V1

## [EMERGENCY MODE — 0 components mocked]

## Emergency Mode Notice

Baton runs entirely on **live, hard-verified Coston2 infrastructure** — there is nothing to fabricate. No component is a `[MOCK]`. Two behaviours are **honest-labelled fallbacks**, not mocks:

| Item | Real path (target) | Honest fallback | On-screen label |
|---|---|---|---|
| FXRP source | depth-8: real FXRP direct-mint via agent `0x55c815…` | depth-7: **FTestXRP from the Coston2 faucet** (verified faucet-available — no agent/collateral) | "Test FXRP (faucet)" vs "Minted FXRP (agent)" |
| Execution latency | real FDC voting round ~90–180s | none — shown live, honestly | "FDC round in progress ~90–180s" |
| Whole approach | live operator executes the custom `Call[]` | **plain FDC-Payment checkout** (single asset action) if Task-0 fails | documented in PLAN Phase 0 |

Emergency cascade applied: minimal component count, demo-first scope, single hero flow, no custom Solidity, reference-CLI reuse over reimplementation.

---

## 1. Project Overview

### One-Liner
An XRP holder with **only an XRPL wallet** — no FLR gas, no EVM wallet, no bridge — signs **one** XRPL payment that atomically deploys FXRP across **multiple Flare vaults** at once.

<!-- [CRITIQUE E-4] name the real (mainnet) user so this reads as a product, not a testnet toy. -->
**Target user (real):** an XRP holder using **Xaman or D'CENT on XRPL mainnet** who wants a diversified FXRP position on Flare without becoming an EVM power-user. The hackathon build runs on Coston2 + XRPL testnet as a *demo constraint*; the product target is XRPL mainnet FXRP with Xaman QR signing (roadmap; see ARCH §10 self-custody upgrade). Testnet is how we demo it, not what it is.

### Problem Statement
Flare's own flagship Smart Accounts demo (Xaman) lets an XRPL user drive **one** Flare vault from an XRPL signature. But a real portfolio is never one vault. Today, to hold a diversified FXRP position on Flare, an XRP-native user must: acquire FLR for gas, create and fund an EVM wallet, bridge or mint FXRP, then send **N separate transactions** to N vaults — each a failure point, each requiring EVM literacy the XRPL user does not have. **The multi-vault case — the one that actually matters — has no self-custody path.** ~40% of the Flare Summer Signal competitor set touches FXRP/vaults; **none expose the atomic multi-call** that makes a portfolio possible from a single XRPL signature.

### Solution
Baton uses **Flare Smart Accounts' custom `Call[]` instruction** (EIP-4337 `executeUserOp(Call[])`) — the atomic multi-call primitive Flare's Xaman demo does not expose. The user, holding only an XRPL testnet wallet, signs **one** XRPL Payment whose memo encodes a multi-vault deposit. Flare's **live hosted operator** (`0x103b38…`, 52,581 txs executed) watches the provider wallet, fetches the **FDC Payment proof**, and executes the whole basket atomically as the user's deterministic `PersonalAccount`: FXRP is placed and deposited into **vault A + vault B in a single all-or-nothing transaction**. Positions appear on Flare with a receipt. The user never touches FLR, an EVM wallet, or a bridge.

### Why This Wins
| Judging Criterion | Weight* | How We Excel |
|---|:---:|---|
| Product usefulness | 25% | First self-custody path to a **multi-vault FXRP portfolio** from one XRPL signature — the case Flare's own demo can't do |
| Flare integration quality | 25% | Four load-bearing primitives: **Smart Accounts custom `Call[]`** + **FAssets FXRP lifecycle** + **FTSO valuation** + **FDC proof under the flow** |
| Technical execution | 20% | Built on **hard-verified live addresses** (operator with 52,581 txs), real atomic multi-call, real FDC round — no fabricated state |
| Evidence of new work | 15% | Exposes the atomic `Call[]` portfolio primitive the official product hides; `NEW_WORK.md` + tx receipts |
| Clarity & future potential | 15% | One-signature portfolio UX generalises to any N vaults, any strategy template; honest live status UI |

*Planning weights only — official criteria have no published weights (brief §3).

**Thesis framing (WINNER-BRIEF §Thesis field 1):** From only an XRPL wallet, one signed payment atomically fans FXRP across a multi-vault Flare portfolio — deeper than Flare's single-vault demo, winning on multi-primitive depth + a self-custody demo impossible without Flare.

---

## 2. System Architecture Overview

### System Diagram
```
┌─────────────────┐   1. build+sign ONE XRPL Payment          ┌──────────────────────┐
│  User (browser) │   (memo = encoded custom Call[])           │   XRPL Testnet        │
│  XRPL wallet    │──────────────────────────────────────────▶│  provider wallet      │
│  ONLY           │   xrpl.js sign & submit                    │  rEyj8nsHLdgt79KJ…    │
└────────┬────────┘                                            └──────────┬───────────┘
         │                                                                 │ 2. FDC attests
         │ polls status/positions (read-only, viem)                        │    the payment
         ▼                                                                 ▼
┌─────────────────────────────┐        3. operator fetches FDC proof + executes
│  Baton Next.js app          │◀──────── (Flare runs this — we DO NOT build it)
│  ┌───────────────────────┐  │                              │
│  │ /api/encode (CLI wrap)│  │        ┌─────────────────────▼─────────────────────────┐
│  │ /api/status  (viem)   │  │        │  Coston2 (chainId 114)                          │
│  │ /api/positions (viem) │  │        │  MasterAccountController 0x4349…37c             │
│  └───────────────────────┘  │        │    └─▶ user PersonalAccount (CREATE2, det.)     │
│  ┌───────────────────────┐  │        │         executeUserOp(Call[]) ATOMIC:           │
│  │ smart-accounts-cli    │  │        │           • FXRP (mint agent 0x55c8… | faucet)  │
│  │ (Python subprocess)   │  │        │           • deposit → Vault A (Upshift 0xD913…) │
│  └───────────────────────┘  │        │           • deposit → Vault B (Firelight 0xC90…)│
│  ┌───────────────────────┐  │        │  FTSO (FXRP/USD valuation)  ·  FDC verification │
│  │ FTSO reader (viem)    │  │        └─────────────────────────────────────────────────┘
│  └───────────────────────┘  │
└─────────────────────────────┘
```

### Component Table
| Component | Type | Purpose | Key Dependencies |
|---|---|---|---|
| XRPL Signer (browser) | Frontend module | Build + sign + submit the ONE XRPL Payment to provider wallet | `xrpl.js`, provider wallet address |
| Instruction Encoder | API route + CLI subprocess | Encode the custom `Call[]` multi-vault deposit into an XRPL memo instruction | `smart-accounts-cli` (Python), vault addresses |
| Personal Account Resolver | API route (viem read) | Derive the user's deterministic `PersonalAccount` address from their XRPL address | viem, MasterAccountController |
| Execution Status Poller | API route (viem read) | Track FDC round + operator execution; surface honest live status | viem, Coston2 RPC, PersonalAccount |
| Portfolio Positions Reader | API route (viem read) | Read vault balances + FTSO valuation after execution | viem, vault ABIs, FTSO |
| FTSO Valuation | API route (viem read) | Fetch FXRP/USD for portfolio valuation and receipt | viem, FtsoV2 via ContractRegistry |
| Status/Portfolio UI | Frontend | XRPL sign → live status → positions + receipt | Next.js App Router, the API routes |
| Proof/Receipt module | Frontend + `submission/proof.md` | Show + persist tx hashes, addresses, XRPL→Flare receipt | status/positions data |

### Data Flow
User generates/imports an XRPL **testnet** wallet in the browser (self-custody, testnet-labelled). The app calls `/api/encode` which shells out to `smart-accounts-cli` to produce (a) the encoded custom `Call[]` multi-vault deposit and (b) the XRPL Payment fields (destination = provider wallet, memo = the encoded instruction, amount = executor fee + reserve). The browser signs that exact Payment with `xrpl.js` (one signature) and submits it to XRPL testnet. Flare's live operator observes the payment, requests the **FDC Payment attestation**, and once the round finalises (~90–180s) submits the execution to the user's `PersonalAccount` on Coston2, which runs `executeUserOp(Call[])` atomically. The app polls `/api/status` (PersonalAccount nonce / execution event) and, on success, `/api/positions` (vault balances × FTSO price) to render the live portfolio and a receipt with exact tx hashes.

---

## 3. User Flows

### Flow 1 (HERO): One signature → multi-vault portfolio
1. User opens Baton, generates/imports an **XRPL testnet wallet** in-browser (labelled "testnet demo wallet"; no FLR, no EVM wallet).
2. User picks a **portfolio template** (default: 50% Upshift vault A / 50% Firelight vault B). FTSO shows live FXRP/USD.
3. User clicks **"Sign & Send"**. App builds ONE XRPL Payment (memo = encoded custom `Call[]` multi-vault deposit) and signs it locally with `xrpl.js`.
4. Payment submits to XRPL testnet → app shows **"Submitted to XRPL"** + XRPL tx hash.
5. App shows **honest live status**: "Operator observed → FDC round in progress (~90–180s) → executing on Flare". Progress reflects real chain state, not a timer.
6. Operator executes `executeUserOp(Call[])` on the user's PersonalAccount **atomically** (FXRP placed → deposit vault A → deposit vault B, all-or-nothing).
7. App renders **portfolio positions** (per-vault FXRP balance + USD value via FTSO) and a **receipt** (PersonalAccount address, Flare execution tx hash, XRPL tx hash, vault addresses).
8. Second demo beat: side-by-side contrast — "Flare's Xaman demo = 1 vault. Baton = N vaults, one signature, atomic."

**Depth variant (Gate-1 → depth-7, part of Flow 1):** if real direct-mint proves too heavy at Gate-1, the PersonalAccount is pre-funded with **FTestXRP from the Coston2 faucet** (labelled "Test FXRP (faucet)"). The single XRPL signature still drives the **atomic multi-vault deposit** `Call[]` — multi-vault, self-custody, and atomicity all preserved. Only the FXRP origin changes, and it is disclosed. This is a variant of Flow 1, not a separate flow.

### Flow 2: Failure path (honest safeguard)
1. If the FDC round stalls or the operator has not executed past a timeout, the app shows **"Attestation pending — this is the real ~90–180s FDC round, not a hang"** with the live round number and a Retry-poll button.
2. If the XRPL payment itself fails (unfunded seed), the app blocks send with **"Fund this testnet wallet at faucet.flare.network / XRPL testnet faucet first"** and a faucet link — no silent failure.

### Sequence Diagram (Hero Flow)
```
User(browser) -> BatonAPI: POST /api/encode {xrplAddr, template}
BatonAPI -> smart-accounts-cli: encode custom-instruction (Call[] = depositA + depositB)
smart-accounts-cli -> BatonAPI: {memoHex, paymentAmount, providerWallet}
BatonAPI -> User(browser): {xrplPayment fields}
User(browser) -> XRPL: sign+submit Payment (ONE signature)
XRPL -> User(browser): xrpl txHash
Flare Operator -> XRPL: observe payment (Flare-run, external)
Flare Operator -> FDC: request Payment attestation
FDC -> Flare Operator: proof (round finalises ~90-180s)
Flare Operator -> Coston2 PersonalAccount: executeUserOp(Call[]) ATOMIC
User(browser) -> BatonAPI: GET /api/status?xrplAddr (poll)
BatonAPI -> Coston2: read PersonalAccount execution event/nonce
BatonAPI -> User(browser): {stage: executed, flareTxHash}
User(browser) -> BatonAPI: GET /api/positions?xrplAddr
BatonAPI -> Coston2: read vault balances + FTSO price
BatonAPI -> User(browser): {positions[], usdValue, receipt}
```

---

## 4. Technical Specifications

### Instruction Encoder
- **Purpose:** Turn a portfolio template into the exact custom `Call[]` instruction and XRPL Payment memo that the live operator will execute.
- **Interface:** `POST /api/encode { xrplAddress, template }` → `{ memoHex, paymentDrops, providerWallet, personalAccount, calls[] }`.
- **Key data structures:** `Call { target: address, value: uint256, data: bytes }`; template → `Call[]` (one deposit call per vault). `depth-8` prepends a mint call.
- **Dependencies:** `smart-accounts-cli` (encode `custom-instruction` / `upshift-cr-deposit` / `firelight-cr-deposit`, then `bridge instruction`); ContractRegistry for FXRP + vault resolution.
- **Constraints:** Do not hardcode mutable protocol addresses — resolve vaults via `getVaults()` and FXRP via ContractRegistry. XRPL memo ≤ 1 KB.

### Personal Account Resolver
- **Purpose:** Compute the user's deterministic Flare `PersonalAccount` (CREATE2) from their XRPL address so positions can be read before/after execution.
- **Interface:** `GET /api/account?xrplAddress` → `{ personalAccount, exists }`.
- **Dependencies:** MasterAccountController (`0x4349…37c`), viem.
- **Events/Signals:** reads controller mapping / CREATE2 derivation.

### Execution Status Poller
- **Purpose:** Report honest live progress across the FDC round + operator execution.
- **Interface:** `GET /api/status?xrplAddress&sinceBlock` → `{ stage: submitted|observed|attesting|executed|failed, fdcRound?, flareTxHash?, message }`.
- **Constraints:** Coston2 public RPC caps `eth_getLogs` at **30 blocks** — poll in ≤30-block windows.

### Portfolio Positions Reader
- **Purpose:** Read post-execution vault balances after the atomic `Call[]` runs.
- **Interface:** `GET /api/positions?xrplAddress` → `{ positions: [{vault, symbol, fxrpBalance, usdValue}], totalUsd, ftsoPrice, receipt }`.
- **Dependencies:** vault `balanceOf`/`convertToAssets` ABIs (resolved via `getVaults()`).

### FTSO Valuation
- **Purpose:** Fetch FXRP/USD to value the portfolio and the receipt.
- **Interface:** internal helper used by `/api/positions` and the FTSO ticker: `getFxrpUsd()` → `{ price, decimals, feedId }`.
- **Dependencies:** `FtsoV2.getFeedByIdView` (free view) via ContractRegistry.

### XRPL Signer (browser)
- **Purpose:** Build, sign, and submit the single XRPL Payment that drives the whole flow.
- **Interface:** `signAndSend({ xrplPayment }) → { xrplTxHash, result }` using an in-browser testnet wallet (self-custody).
- **Dependencies:** `xrpl.js`, the `/api/encode` output (destination, memo, amount).
- **Constraints:** exactly ONE signature; never requests FLR or an EVM wallet (INVARIANT a).

### Status/Portfolio UI
- **Purpose:** Render the hero flow — sign → honest live status → positions + receipt.
- **Interface:** React client components driving `/api/encode`, `/api/status` (poll), `/api/positions`.
- **Dependencies:** Next.js App Router, the API routes, the XRPL Signer module.

### Proof/Receipt module
- **Purpose:** Show and persist the XRPL→Flare receipt for judges.
- **Interface:** `/proof` page + writes `submission/proof.md`; renders PersonalAccount, Flare tx hash, XRPL tx hash, explorer links.
- **Dependencies:** `/api/status` + `/api/positions` outputs.

---

## 5. API Contracts

### External: XRPL Testnet
- **Base URL:** `wss://s.altnet.rippletest.net:51233` (public testnet)
- **Auth:** client-side seed signing (`xrpl.js`); no server key.
- **Op:** `Payment` to provider wallet with `Memos[0].Memo.MemoData = memoHex`. Success = `meta.TransactionResult == "tesSUCCESS"`. **Unavailability risk:** Risk 1 (operator/XRPL path does not execute → FDC-checkout fallback).

### External: Coston2 EVM RPC
- **Base URL:** `https://coston2-api.flare.network/ext/C/rpc` (chainId 114)
- **Auth:** none. **Rate limit:** `eth_getLogs` ≤ 30 blocks; high concurrency → HTTP 429 (back off). **Unavailability risk:** Risk 7.
- **Calls:** `eth_call` (reads), `getLogs` (execution events).
- **Contract Registry** (`0xaD67FE66660Fb8dFE9d6b1b4240d8650e30F6019`) is accessed over this same RPC — resolve `FtsoV2`, `FdcVerification`, FXRP token, vaults at runtime; never hardcode mutable addresses.

### Internal routes
See ARCHITECTURE §Internal API Contracts for full request/response schemas of `/api/encode`, `/api/account`, `/api/status`, `/api/positions`.

---

## 6. Demo Script

**Total Duration:** 3:00 (brief §Demo: primary proof under 3 minutes)
**Format:** screen recording, narrated. Network + chainId on screen throughout ("Coston2 · chainId 114").

### Scene 1: The gap (0:00–0:30)
**Screen:** Baton landing; split panel "Flare Xaman demo: 1 vault" vs "Baton: N vaults, 1 signature".
**Voiceover:** "Flare Smart Accounts let an XRP holder drive one Flare vault from a single XRPL signature. A real portfolio is never one vault. Baton deploys a whole multi-vault portfolio from that same single signature — atomically."
**Action:** show the XRPL-only wallet (no EVM wallet, no FLR).

### Scene 2: One signature (0:30–1:15)
**Screen:** portfolio template (Upshift 50% / Firelight 50%), live FTSO FXRP/USD; user clicks "Sign & Send".
**Voiceover:** "Only an XRPL testnet wallet — no FLR gas, no EVM wallet, no bridge. Pick a portfolio, sign one XRPL payment. The memo carries an encoded atomic multi-call."
**Action:** `xrpl.js` signs; XRPL tx hash appears.

### Scene 3: Live execution, honestly (1:15–2:15)
**Screen:** live status strip — Submitted → Operator observed → **FDC round in progress ~90–180s** → Executed on Flare. The "Executed" stage flips only when a real vault-deposit log crediting the account is found on-chain (log-based detection, not a timer).
**Voiceover:** "Flare's live operator — over fifty-two thousand transactions executed — sees the payment, fetches the FDC proof of it, and runs the multi-call as my account on Flare. The status flips to Executed only when the on-chain deposit actually lands — no fake instant result."
<!-- [CRITIQUE E-2] pre-empt the "first-party FDC?" depth-probe: state honestly that Baton rides the operator's FDC attestation. -->
**Voiceover (add one line):** "The FDC Payment attestation is requested by Flare's operator; Baton surfaces that real round honestly rather than faking it — the proof of the XRPL payment is what unlocks execution on Flare."
**Action:** interim stages are honest ~90–180s estimates of the real FDC round; the final "Executed" is confirmed by reading the vault deposit log (pre-warmed so it lands inside the take).
**Failure-path safeguard (demonstrates Flow 2):** briefly show the pending-state message — "FDC round in progress (~90–180s) — real attestation, not a hang" — proving Baton surfaces the real latency honestly instead of faking success (brief §Demo: one failure-path safeguard).

### Scene 4: Portfolio + receipt (2:15–3:00)
**Screen:** two vault positions with FXRP balances + USD (FTSO); receipt panel with PersonalAccount, Flare tx hash (explorer link), XRPL tx hash.
**Voiceover:** "One signature. Two vaults. Atomic. Self-custody from XRPL, valued by FTSO, proven by FDC — a portfolio Flare's own demo can't build."
<!-- [CRITIQUE E-3] make the atomic-multicall the on-screen WOW — force + HOLD the explorer internal-calls view; this is the one fact that proves Baton is not a "simple FXRP vault". -->
**Action (the wow beat — do not rush):** click the single Flare tx hash → land and **hold** on the Coston2 explorer's decoded-input / internal-transactions view of that ONE `executeUserOp` tx, showing BOTH internal deposit calls (deposit→Vault A and deposit→Vault B) inside it. On-screen callout: **"ONE transaction · TWO vault deposits · atomic."** This visually proves the differentiator instead of only narrating it.

### Demo Prerequisites

**Seed State Table** — exact state before recording. `scripts/seed-demo.ts` establishes it; demo runs it first.

| Item | Value | Network / Location | Created By |
|---|---|---|---|
| Demo XRPL testnet wallet | funded seed (≥ 20 test XRP) | XRPL Testnet | seed-demo.ts (or XRPL faucet) |
| PersonalAccount FXRP (depth-7) | ≥ 10 FTestXRP pre-funded | Coston2 (faucet) | seed-demo.ts |
| Provider wallet reachable | `rEyj8nsHLdgt79KJWzXR5BgF7ZbaohbXwq` | XRPL Testnet | verified live (spike) |
| Vault addresses resolved | A `0xD913…`, B `0xC90D…` | Coston2 `getVaults()` | seed-demo.ts (read + cache) |
| FTSO feed live | FXRP/USD feed id | Coston2 via ContractRegistry | seed-demo.ts (read check) |
| Pre-warm run | one full e2e run captured (tx hashes) | Coston2 + XRPL | seed-demo.ts / manual pre-warm |

**Invariant:** `npx tsx scripts/seed-demo.ts` from project root produces this exact state, idempotently. No fabricated positions — pre-warm state comes from a **real prior run**, per Thesis INVARIANT (c) and TASTE U7.

---

## 7. Risk Register

| # | Risk | Severity | Likelihood | Impact | Mitigation | Decision Tree |
|---|---|---|---|---|---|:---:|
| 1 | **Task-0 fails** — live operator does not execute our instruction | CRITICAL | LOW | whole approach invalid | Task-0 go/no-go hr ~2; fall back to plain FDC-Payment checkout (single asset action, still XRPL-signed) | PLAN Phase 0 |
| 2 | **Custom `Call[]` deposit reverts** in a vault (wrong ABI / deposit signature) | CRITICAL | MED | no multi-vault = no differentiator | validate each vault deposit encode individually before composing; use CLI's known `upshift/firelight-cr-deposit` encodings | PLAN Phase 2 |
| 3 | **FDC round latency** blows the demo pacing | CRITICAL | HIGH | dead air / judge confusion | pre-warm a real run; honest live status UI with round number; never fake instant | PLAN Phase 4 |
| 4 | **Real direct-mint too heavy** (collateral/agent) in 22h | HIGH | HIGH | depth-8 slips | Gate-1 ladder → depth-7 faucet FXRP, atomic multi-vault preserved, honestly labelled | PLAN Phase 1 |
| 5 | **Self-custody invariant broken** — flow secretly needs FLR/EVM wallet | CRITICAL | LOW | kills the whole pitch | user path is XRPL-only by construction; operator pays Flare gas; assert in code + demo | PLAN Phase 3 |
| 6 | **`getXrplProviderWallets()` returns XRPL strings** decoded as EVM | HIGH | MED | payment sent to wrong/garbage dest | decode as XRPL address string; unit-assert format `r...` | PLAN Phase 1 |
| 7 | **Coston2 RPC 429 / 30-block getLogs cap** | HIGH | MED | status polling breaks | ≤30-block windows, backoff, cache; fallback to nonce-delta check | PLAN Phase 3 |
| 8 | **smart-accounts-cli drift** (flags/output format changed) | HIGH | MED | encode step breaks | pin the cloned commit; wrap CLI with output-shape assertions; snapshot a known-good encode | PLAN Phase 1 |
| 9 | **Competitor ships same multi-vault-one-signature product** | MED | LOW | novelty erosion | eyeball DoraHacks BUIDL list before final lock (concern [A]); lean on execution depth | PLAN Phase 6 |
| 10 | **Time overrun** — full hero flow not demoable in 22h | HIGH | MED | no submission | risk-first plan; Task-0 + Gate-1 fail-fast; UI last; demo-first scope | PLAN Phase 0–5 |
| 11 | **Fabricated portfolio state** creeps into demo | CRITICAL | LOW | violates INVARIANT (c), disqualifying dishonesty | seed state comes from a real prior run only; no hand-authored balances | PLAN Phase 4 |

### Risk Categories Covered
- [x] Technical (2,3,6,7,8) · [x] Competitive (9) · [x] Time (4,10) · [x] Demo (3,11) · [x] Judging (1,5) · [x] Scope (4,10)

---

## 7.5 Judge Experience

- **First-visit state:** landing loads with the split "1 vault vs N vaults" hero, a live FTSO FXRP/USD ticker, and a **pre-warmed receipt** from a real prior run visible below the fold (real PersonalAccount + tx hashes, explorer-linked). No empty states, no wallet-gate wall.
- **Seed script requirements (`scripts/seed-demo.ts`):** fund/verify demo XRPL wallet; pre-fund PersonalAccount with faucet FTestXRP (depth-7); resolve + cache vault addresses and FTSO feed; capture one real pre-warm run's tx hashes into `submission/proof.md`. Idempotent.
- **10-second test:** hero headline "One XRPL signature. A whole Flare portfolio." + the vault-count contrast makes the point instantly.
- **30-second test:** the live FTSO ticker + the visible real receipt show it's genuinely on-chain, not a slide.
- **60-second test:** "Sign & Send" is the single primary CTA; clicking it starts the real flow with live status.
- **Landing content:** always-populated (contrast panel, FTSO ticker, prior receipt) behind no login.

### Demo-Insurance Invariant Check
Baton's claim is **real on-chain execution + self-custody** (Thesis INVARIANTS c, e). Fabricated state is therefore **forbidden** (TASTE U7). Pre-caching is limited to (a) resolving live addresses and (b) displaying a receipt from a **genuinely executed** prior run. The demo take relies on a **pre-warmed real run**, not a fake instant result — the FDC latency is shown honestly.

## 7.6 Judge Proof Artifacts

- **Proof surface:** `/proof` page + `submission/proof.md` + `NEW_WORK.md`.
- **Required artifacts:** PersonalAccount address; Flare `executeUserOp` tx hash (with both vault deposits visible); XRPL Payment tx hash; provider wallet; operator address (52,581 txs) linked to explorer; vault addresses; FTSO price used; FDC round number.
<!-- [CRITIQUE E-3] proof.md must annotate the atomic multi-call so a judge can verify it without watching the video. -->
- **Atomicity annotation (E-3):** next to the Flare `executeUserOp` tx hash in `submission/proof.md`, add the note "internal calls in this ONE tx: deposit → Vault A, deposit → Vault B (atomic, all-or-nothing)" so a judge reading only the proof file can confirm the multi-vault claim from the explorer.
- **Proof generation:** the pre-warm run + at least one live-during-judging run write hashes to `submission/proof.md`.
- **Explorer links:** `https://coston2-explorer.flare.network/tx/{flareTxHash}`, `https://coston2-explorer.flare.network/address/{personalAccount}`; XRPL: `https://testnet.xrpl.org/transactions/{xrplTxHash}`.

---

## 8. Hour-by-Hour Build Plan (emergency, ~22h)

| Block | Hours | Primary Objective | Deliverable |
|:---:|---|---|---|
| B0 | 0–2 | **Task-0 go/no-go:** clone + run `smart-accounts-cli`, funded XRPL e2e, confirm live operator executes on Coston2 | PASS/FAIL decision; fallback armed |
| B1 | 2–6 | Instruction encoder (`/api/encode` + CLI wrap); resolve vaults/FXRP; **Gate-1** mint-vs-faucet decision | encoded custom `Call[]`, depth locked |
| B2 | 6–10 | Atomic multi-vault deposit proven (2 vaults, one signature, all-or-nothing) on Coston2 | real Flare `executeUserOp` tx with both deposits |
| B3 | 10–13 | Reads: PersonalAccount resolver, status poller, positions + FTSO valuation | `/api/account`, `/api/status`, `/api/positions` |
| B4 | 13–18 | Next.js UI: XRPL sign → live status → positions + receipt; `/proof` page; honest labels | working demoable app |
| B5 | 18–20 | `seed-demo.ts`, pre-warm real run, `NEW_WORK.md`, `submission/proof.md`, competitor eyeball | demo state + proof artifacts |
| B6 | 20–22 | Record 3-min demo, screenshots, package for DoraHacks submission | submission-ready |

### Buffer Allocation
No dedicated buffer in emergency mode — the two fail-fast gates (Task-0, Gate-1) are the risk buffer: each has a lighter fallback (FDC checkout / faucet FXRP) that preserves a shippable demo.

---

## 9. Dependencies & Prerequisites

### External Services
| Service | URL | Auth | Status |
|---|---|:---:|---|
| Coston2 RPC | `https://coston2-api.flare.network/ext/C/rpc` | no | live (verified) |
| XRPL Testnet | `wss://s.altnet.rippletest.net:51233` | no | live |
| Coston2 faucet (C2FLR + FTestXRP) | `https://faucet.flare.network/coston2` | no | live |
| Coston2 explorer | `https://coston2-explorer.flare.network` | no | live |
| XRPL testnet faucet | `https://faucet.altnet.rippletest.net` | no | live |

### Development Tools
| Tool | Version | Purpose | Install |
|---|---|---|---|
| Node | ≥ 20 | Next.js app | nvm |
| Python | 3.10+ | reference CLI | system / pyenv |
| smart-accounts-cli | pinned commit | encode/bridge | `git clone flare-foundation/smart-accounts-cli` |
| viem | ^2 | Coston2 reads | npm |
| xrpl (xrpl.js) | ^3 | XRPL sign/submit | npm |
| tsx | latest | run seed script | npm |

### On-Chain Addresses (all VERIFIED live on Coston2 — spike)
| Item | Address | Network | Source |
|---|---|---|---|
| MasterAccountController | `0x434936d47503353f06750Db1A444DBDC5F0AD37c` | Coston2 | spike (has code) |
| Operator/executor | `0x103b384064ae85577127097A7cCadfd6fb13f437` | Coston2 | spike (52,581 txs) |
| Provider XRPL wallet | `rEyj8nsHLdgt79KJWzXR5BgF7ZbaohbXwq` | XRPL Testnet | `getXrplProviderWallets()` |
| Vault A (Upshift) | `0xD91324A6e8884147F6425E9ddd60e11Aea060B5b` | Coston2 | `getVaults()` type 2 |
| Vault B (Firelight) | `0xC90D6847747b85d1fa2E07859869fb9fB72c0361` | Coston2 | `getVaults()` type 1 |
| Minting agent vault | `0x55c815260cBE6c45Fe5bFe5FF32E3C7D746f14dC` | Coston2 | `getAgentVaults()` |
| Contract Registry | `0xaD67FE66660Fb8dFE9d6b1b4240d8650e30F6019` | Flare-family | brief §6 |
| FXRP token | resolve via ContractRegistry | Coston2 | never hardcode |

### Manual Setup
- Fund a demo XRPL testnet seed (XRPL faucet) and the operator gas is Flare-run (no action).
- Faucet FTestXRP to the demo PersonalAccount for depth-7.

---

## 10. Concerns Compliance

| # | Sev | Concern | How PRD Addresses It |
|---|:---:|---|---|
| 1 | C | Task-0 gate before building further; fall back to FDC-Payment checkout | §8 B0 + Risk 1 + PLAN Phase 0 go/no-go |
| 2 | C | Self-custody: XRPL wallet only, never FLR/EVM wallet | Flow 1 (XRPL-only by construction), Risk 5, §1 |
| 3 | C | Atomic multi-call `Call[]` in the working demo | Flow 1 step 6, Scene 4, Risk 2 — the hero differentiator |
| 4 | C | Demo pacing: honest live FDC progress, not fake instant | Scene 3, Risk 3, §7.5 Demo-Insurance |
| 5 | I | Mint depth: depth-8 target, depth-7 honest fallback | Flow 2, Risk 4, Gate-1 |
| 6 | I | Real values via ContractRegistry, no hardcoded mutables | §4 constraints, §9 (FXRP/vaults resolved), Risk 6/8 |
| 7 | A | Competitor eyeball before submission | §8 B5, Risk 9 |

All [C] concerns are addressed. PRD is complete for emergency scope.
