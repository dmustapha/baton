# Baton Implementation Plan

**Project:** Baton — one XRPL signature drives a whole Flare DeFi portfolio
**Hackathon:** Flare Summer Signal · Track: Interoperable Asset Products
**Deadline:** 2026-08-14 19:59 UTC (platform) · internal safety 17:59 UTC — **~22h**
**Stack:** Next.js 15 + viem + xrpl.js + `smart-accounts-cli` (Python subprocess)
**Architecture Doc:** `baton/ARCHITECTURE.md` (THE source of truth for all code)

## [EMERGENCY MODE — 0 components mocked]

## How to Use This Plan
1. Read in order. Do not skip phases or reorder tasks.
2. Every phase has a GATE — verify every item before proceeding.
3. At 🔀 decision points, test BOTH paths and follow the match.
4. Copy code from ARCHITECTURE.md — do not improvise.
5. Commit after every task with the given message.
6. Save deployed/discovered addresses and CLI flags to `.env` immediately.
7. If something fails and isn't covered by a decision tree: STOP, report, don't guess.
8. VERIFY-MILESTONE tasks are mandatory and cannot be skipped.
9. `scripts/seed-demo.ts` must exist and run before any demo-related step.
10. **Task-0 and Gate-1 are the two fail-fast gates** — each has a lighter fallback that still ships a demo.

---

## Phase Overview

| Phase | Purpose | Est. | Depends On |
|:---:|---|:---:|---|
| 0 | Task-0 go/no-go: CLI + funded XRPL e2e proves the live operator executes | 2h | — |
| 1 | Encoder + Gate-1 depth decision (mint vs faucet) | 4h | 0 |
| 2 | Atomic multi-vault deposit proven on-chain (the differentiator) | 4h | 1 |
| 3 | Read paths: account, status, positions + FTSO | 3h | 2 |
| 4 | Next.js UI + `/proof` + deploy | 5h | 3 |
| 5 | seed-demo, pre-warm real run, NEW_WORK, proof, competitor eyeball | 2h | 4 |
| 6 | Record 3-min demo + package submission | 2h | 5 |

**Time feasibility:** 2+4+4+3+5+2+2 = **22h ≤ 22h build budget.** PASS. No slack buffer — the two gates are the buffer.

### Forge→Build winning-pattern steps
| Step | Artifact | Arch ref |
|---|---|---|
| Phase 1.1 | `DOMAIN-GUIDE.md` | §12 |
| Phase 4.4 | `scripts/seed-demo.ts` | §23, PRD §6 |
| Per-task | test file alongside source | §17 |
| Phase 5.2 | capture tx hashes → `submission/proof.md` | §13, PRD §7.6 |
| Phase 4.3 | `/proof` page | §11 |
| Phase 0.1 | `scripts/` test dir | §17 |

---

## Phase 0: Task-0 Go/No-Go (2h)

**Purpose:** Prove the whole approach — Flare's live operator executes an instruction we sent from a funded XRPL testnet payment. This is the go/no-go for everything.

### Task 0.1: Clone + pin the reference CLI
**Files:** none (external clone); create `scripts/` dir.
**Steps:**
1. Clone and pin:
   ```bash
   git clone https://github.com/flare-foundation/smart-accounts-cli ../smart-accounts-cli
   git -C ../smart-accounts-cli rev-parse HEAD
   ```
   Expected: a commit hash printed.
2. Discover the real interface:
   ```bash
   cd ../smart-accounts-cli && python3 -m pip install -e . 2>/dev/null; python3 -m smart_accounts_cli --help || python3 cli.py --help
   ```
   Expected: help text listing `encode`, `bridge`, and account subcommands.
3. Record the exact entry + subcommands into `baton/.env` (`CLI_ENTRY`, `SMART_ACCOUNTS_CLI_DIR`) and into a note `baton/CLI-INTERFACE.md`.

#### 🔀 Decision Point: CLI interface discovery [Risk 8]
Run: the `--help` above.
✅ **If help lists encode/bridge:** record exact flags, continue to 0.2.
🔀 **If module path differs** (`cli.py`, `main.py`, or a console script `smart-accounts`):
1. `ls ../smart-accounts-cli` and read its README/pyproject `[project.scripts]`.
2. Set `CLI_ENTRY` to the working invocation; re-run `--help`.
3. If flags differ from ARCHITECTURE §6, update `lib/encode.ts` arg arrays to match the real ones.
⛔ **If the CLI won't run at all** (deps broken): use the CLI repo's README example commands directly via shell in `task0-e2e.ts`; if still broken, GOTO Phase-0 fallback (FDC checkout).

**Commit:** `chore(cli): clone + pin smart-accounts-cli, record interface`

### Task 0.2: Funded XRPL testnet e2e
**Files:** Create `scripts/task0-e2e.ts` (uses the CLI + xrpl.js to send one real instruction).
**Steps:**
1. Fund a testnet seed at `https://faucet.altnet.rippletest.net` (save seed to `.env` as `DEMO_XRPL_SEED`).
2. Encode + bridge a **minimal** instruction (per CLI docs — the simplest `fxrp-transfer` or a 1-call custom instruction) and submit the XRPL Payment to `rEyj8ns…`:
   ```bash
   npx tsx scripts/task0-e2e.ts
   ```
   Expected: XRPL tesSUCCESS hash printed, then within ~180s a Coston2 tx on the derived PersonalAccount.
3. Confirm on explorer: `https://coston2-explorer.flare.network/address/<personalAccount>`.

#### 🔀 Decision Point: Does the live operator execute our instruction? [Risk 1]
Run: `npx tsx scripts/task0-e2e.ts`; watch the PersonalAccount for ~180s.
✅ **If a Coston2 tx appears on the PersonalAccount:** **GO** — the approach is validated. Record the hash in `submission/proof.md`. Continue to Phase 1.
🔀 **If XRPL tesSUCCESS but no Flare execution after 4 min:**
1. Re-check the memo encoding (must be the CLI's `bridge instruction` output, hex, uppercased).
2. Confirm destination is exactly the `getXrplProviderWallets()` value; confirm amount ≥ executor fee (`getExecutorInfo()` = 1e11).
3. Retry once. If still nothing after two tries: the hosted operator may not pick up custom flows on Coston2 →
⛔ **Fallback (documented): plain FDC-Payment checkout.** Ship a single-asset action: user signs XRPL payment → app requests FDC Payment attestation → contract/read confirms → single vault deposit. Multi-vault becomes a stretch. Update PRD scope note and continue from Phase 1 with the single-leg template. **This still satisfies the Interoperable Asset track (real FDC-verified asset action).**

**Commit:** `feat(task0): funded XRPL→Coston2 e2e go/no-go`

### Phase 0 Gate
- [ ] CLI runs; exact `encode`/`bridge` interface recorded in `.env` + `CLI-INTERFACE.md`.
- [ ] `npx tsx scripts/task0-e2e.ts` produced an XRPL tesSUCCESS **and** a Coston2 tx on the PersonalAccount (GO) **or** the FDC-checkout fallback is armed and scoped.
- [ ] First real tx hashes recorded in `submission/proof.md` (no fabricated values).
- [ ] All Phase 0 commits made.

**If the gate fails on BOTH the primary and the fallback: STOP. This is the only true blocker.**

---

## Phase 1: Encoder + Gate-1 Depth Decision (4h)

**Purpose:** Turn a portfolio template into the atomic multi-vault instruction; decide depth-8 vs depth-7.

### Task 1.1: Scaffold app + config + domain guide
**Files:** Create `package.json`, `next.config.mjs`, `tsconfig.json` (ARCH §23); `lib/config.ts` (§4), `lib/types.ts` (§3); generate `DOMAIN-GUIDE.md` from ARCH §12.
**Steps:**
1. `npm install` (deps from ARCH §23 package.json). Expected: no errors.
2. Copy `lib/config.ts`, `lib/types.ts` exactly from ARCHITECTURE.
3. Write `DOMAIN-GUIDE.md` from ARCH §12 (concepts + invariants).
**Commit:** `feat(scaffold): next app, config, types, domain guide`

### Task 1.2: viem + registry + PersonalAccount
**Files:** `lib/viem.ts` (§5), `abis/contractRegistry.json`, `lib/registry.ts`, `abis/masterAccountController.json`, `lib/personalAccount.ts` (§7).
**Steps:**
1. Copy files from ARCHITECTURE.
2. Verify derivation matches Task-0:
   ```bash
   npx tsx -e "import('./lib/personalAccount').then(m=>m.derivePersonalAccount('<demo r-addr>')).then(console.log)"
   ```
   Expected: the same PersonalAccount address seen on-chain in Task-0.

#### 🔀 Decision Point: PersonalAccount getter [Risk 6]
✅ **If the on-chain `getAccountAddress` getter returns the Task-0 address:** keep the viem path.
🔀 **If the getter reverts / name is wrong:**
1. Read the controller ABI from the CLI repo; find the real view (e.g. `personalAccountOf`, `getAccount`).
2. Update `abis/masterAccountController.json` + the function name in `personalAccount.ts`.
3. If no view exists, rely on the CLI fallback branch (already coded) and confirm it returns the Task-0 address.
⛔ **If neither works:** hardcode the demo PersonalAccount in `.env` for the demo wallet only (labelled), and file it as a known limitation.

**Commit:** `feat(flare): viem client, registry resolver, personal account derivation`

### Task 1.3: Encoder + Call[] builder + test
**Files:** `lib/templates.ts`, `abis/vault.json`, `abis/erc20meta.json`, `lib/cli.ts` (incl. `parseBridgeOutput` adapter), `lib/ftso.ts` (for `getFxrpDecimals`), `lib/encode.ts`, `app/api/encode/route.ts` (§6); `lib/encode.test.ts`, `vitest.config.ts`.
**Steps:**
1. Copy files from ARCHITECTURE. Note `buildCalls` is **async** — it resolves FXRP via registry, reads FXRP `decimals()` at runtime, and emits **`approve` + `deposit` per vault leg** (the approve is NOT optional — deposits revert without it).
2. Confirm the registry names resolve (this is where you pin the exact names):
   ```bash
   npx tsx -e "import('./lib/registry').then(m=>Promise.all([m.resolve('FtsoV2'),m.resolve('FXRP')])).then(console.log)"
   ```
   Expected: two addresses. If `FXRP` isn't the registry name, find the correct one (e.g. `FAssetFXRP`/`FXRP`) and update the `resolve('FXRP')` calls in `encode.ts` + `ftso.ts`.
3. Unit-test the Call[] builder:
   ```bash
   npx vitest run lib/encode.test.ts
   ```
   Expected: each leg emits `[approve(vault,assets), deposit(assets,receiver)]`; weight split correct; FXRP decimals read from chain (mock or live).
4. Encode a real 2-leg instruction and inspect the memo:
   ```bash
   curl -s localhost:3000/api/encode -XPOST -H 'content-type: application/json' \
     -d '{"xrplAddress":"<r-addr>","templateId":"balanced","fxrpAmount":"10"}' | jq
   ```
   Expected: `{memoHex, paymentDrops, providerWallet, personalAccount, calls:[2]}`.

#### 🔀 Decision Point: Gate-1 — depth-8 mint vs depth-7 faucet [Risk 4]
Try the real direct-mint path (`fxrp-cr` via agent `0x55c815…`) as the first leg of the instruction.
✅ **If real FXRP direct-mint composes and executes** within ~1h of attempts: set `BATON_DEPTH=depth-8`, keep the mint call. **Ship depth-8.**
🔀 **If mint needs collateral reservation / multi-step agent flow that won't fit:**
1. Set `BATON_DEPTH=depth-7`.
2. Faucet FTestXRP to the PersonalAccount: `https://faucet.flare.network/coston2` (FTestXRP is faucet-available — TECHNICAL-SPIKE-FDC).
3. The instruction is now just the atomic multi-vault deposit `Call[]` — multi-vault + one-signature + atomic all preserved. Label UI "Test FXRP (faucet)".
⛔ **If even the deposit encode won't build:** fall to the single-leg template (one vault) and revisit atomicity in Phase 2 — but this is the Phase-2 failure path, not here.

**Commit:** `feat(encode): template→Call[]→CLI instruction, gate-1 depth locked`

### Phase 1 Gate
- [ ] `/api/encode` returns a valid memo + payment for a 2-leg template.
- [ ] `lib/encode.test.ts` passes (weights + calldata).
- [ ] Registry resolves FtsoV2 (and FXRP) — no hardcoded mutable address.
- [ ] `BATON_DEPTH` set (8 or 7) and reflected in `.env`.
- [ ] Commits made.

---

## Phase 2: Atomic Multi-Vault Deposit — the Differentiator (4h)

**Purpose:** Prove ONE XRPL signature results in FXRP deposited into TWO vaults in ONE atomic Flare tx. This is the whole thesis.

### Task 2.1: Validate each vault deposit individually
**Files:** update `abis/vault.json` if signatures differ.
**Steps:**
1. For each vault, confirm the real deposit function (Upshift type-2, Firelight type-1 may differ):
   ```bash
   cast call 0xD91324A6e8884147F6425E9ddd60e11Aea060B5b "asset()(address)" --rpc-url https://coston2-api.flare.network/ext/C/rpc
   ```
   (repeat probing `deposit`, `convertToAssets`, `asset` per vault; use the CLI's `upshift-cr-deposit` / `firelight-cr-deposit` encoders as the authority.)

#### 🔀 Decision Point: Vault deposit ABI mismatch [Risk 2]
✅ **If both vaults expose `deposit(uint256,address)`:** keep `abis/vault.json`, continue.
🔀 **If a vault uses a different deposit signature** (e.g. `deposit(uint256)` or a custom `depositFor`):
1. Use the CLI's dedicated `upshift-cr-deposit` / `firelight-cr-deposit` encode commands instead of the generic viem `encodeFunctionData` for that leg.
2. In `lib/encode.ts`, branch per `vaultKey` to call the CLI encoder for that vault type; keep the generic path only for vaults that match.
3. Re-run the encode; confirm calldata matches the CLI's.
⛔ **If a vault can't accept a programmatic deposit at all:** swap it for another `getVaults()` entry of the same type (there are 3 Upshift vaults: `0xD913…`,`0x9E63…`,`0x4066…`); update `lib/config.ts`.

**Commit:** `fix(vaults): confirm real deposit signatures per vault type`

### Task 2.2: Execute the atomic 2-vault instruction end-to-end
**Steps:**
1. Sign+send the 2-leg instruction from the demo XRPL wallet (via `task0-e2e.ts` extended, or the UI once built).
2. Wait for operator execution (~90–180s). Capture the Coston2 tx hash.
3. Verify BOTH vault balances increased in the SAME tx:
   ```bash
   cast call <vaultA> "balanceOf(address)(uint256)" <personalAccount> --rpc-url <coston2>
   cast call <vaultB> "balanceOf(address)(uint256)" <personalAccount> --rpc-url <coston2>
   ```
   Expected: both > 0; the explorer shows one `executeUserOp` tx with two internal deposit calls.

#### 🔀 Decision Point: Atomicity — does the Call[] revert or partially apply? [Risk 2]
Note: the `approve` per leg is **already in `buildCalls`** (default, not a reaction). This DT is for residual reverts.
✅ **If both balances increase in one tx:** the differentiator is proven. Record the hash in `submission/proof.md`.
🔀 **If the Call[] still reverts:**
1. Inspect the revert (explorer / `cast run <txhash>`). Check in order: (a) PersonalAccount actually holds ≥ the total FXRP (depth-7: did the faucet credit it? depth-8: did the mint leg land first?); (b) FXRP `decimals()` matches what `getFxrpDecimals()` read (wrong decimals → wrong amount); (c) the vault's real `deposit` signature (Task 2.1).
2. If depth-8, confirm the mint call is ordered BEFORE the approves/deposits in the `Call[]`.
3. Re-run.
⛔ **If one vault consistently fails:** drop to a single-vault instruction to preserve a working demo, then swap the failing vault (per 2.1 fallback) and re-attempt multi-vault. Never ship a "multi-vault" claim with a one-vault reality — relabel honestly if forced.

**Commit:** `feat(atomic): prove one-signature two-vault atomic deposit on Coston2`

### Task 2.3: VERIFY-MILESTONE Checkpoint — Core Proof
**Purpose:** The thesis is now provable or it isn't. Gate before building UI.
**Gate (MANDATORY):**
- [ ] One XRPL signature → one atomic Flare tx → two vault balances > 0 (real hashes in proof.md).
- [ ] No FLR gas or EVM wallet was used by the user path (INVARIANT a).
- [ ] Depth is locked and honestly labelled.
**If this fails:** STOP. The demo has no differentiator. Revert to single-leg FDC-checkout scope and note it.

---

## Phase 3: Read Paths — Account, Status, Positions, FTSO (3h)

**Purpose:** Everything the UI needs to render live status and the portfolio.

### Task 3.1: Account + status routes
**Files:** `app/api/account/route.ts` (§7), `lib/status.ts` + `app/api/status/route.ts` (§8).
**Steps:** copy from ARCHITECTURE. Status is a two-call contract: baseline (no `sinceBlock`) → `{sinceBlock}`, then poll with it. Smoke-test both:
```bash
curl -s "localhost:3000/api/status?personalAccount=<pa>" | jq                                   # baseline: {stage:idle, sinceBlock}
curl -s "localhost:3000/api/status?personalAccount=<pa>&sinceBlock=<N>&submittedAt=$(date +%s)000" | jq  # honest interim / executed
```
Expected: baseline returns a `sinceBlock`; the poll returns an honest stage. **Verify it does NOT report `executed` for a pre-used account** — detection is log-based from `sinceBlock`, so a fresh `sinceBlock` at sign time is essential.

#### 🔀 Decision Point: Coston2 RPC 429 / 30-block getLogs cap [Risk 7]
✅ **If status reads return within budget:** continue.
🔀 **If you hit HTTP 429 or a getLogs range error:**
1. Ensure every `getLogs` uses ≤30-block windows (already coded in `status.ts`).
2. Add a 1–2s backoff and reduce poll frequency to 6s.
3. Cache the last block queried; only scan new ranges.
⛔ **If the public RPC is unreliable:** switch `COSTON2_RPC_URL` to an alternate Coston2 endpoint, or fall back to a pure nonce-delta check (no getLogs) for the "executed" signal.

**Commit:** `feat(reads): account + honest live status routes`

### Task 3.2: Positions + FTSO + price route
**Files:** `abis/ftsoV2.json` (FREE `getFeedByIdView`), `abis/erc20meta.json`, `lib/ftso.ts`, `lib/positions.ts`, `app/api/positions/route.ts`, `app/api/price/route.ts` (§9).
**Steps:** copy; verify the health/price route then positions:
```bash
curl -s "localhost:3000/api/price" | jq            # FTSO-only, used by ticker + health check
curl -s "localhost:3000/api/positions?xrplAddress=<r-addr>" | jq '{ftsoPrice, totalUsd, positions}'
```
Expected: `/api/price` returns a live price; positions returns per-vault FXRP balances (USD `'—'` if FTSO down — decoupled).

#### 🔀 Decision Point: FTSO view getter name / feed id [Risk 7]
The code uses the **free view** `getFeedByIdView` (NOT the payable `getFeedById`, which reverts through `readContract`).
✅ **If `getFeedByIdView` returns a value:** keep it + `FTSO_FEED_XRP_USD`.
🔀 **If the view name is wrong or reverts:**
1. Find the correct free getter on live `FtsoV2` (e.g. `getFeedById` may have a companion view, or use `FtsoV2Interface`/`FastUpdatesConfiguration`); update the ABI `name` + `functionName` in `ftso.ts`.
2. Confirm the feed id encoding (`01` + hex("XRP/USD") padded to 21 bytes) against Flare docs.
⛔ **If FTSO can't be read at all:** balances already render without USD (decoupled in `positions.ts`); the ticker shows `—`. Note it — valuation is MED priority, not the thesis.

**Commit:** `feat(positions): vault balances + FTSO valuation`

### Phase 3 Gate
- [ ] `/api/account`, `/api/status`, `/api/positions` all return 200 with real data.
- [ ] getLogs stays ≤30 blocks; no 429 under normal polling.
- [ ] FTSO price renders (or graceful no-USD fallback documented).
- [ ] Commits made.

---

## Phase 4: UI + /proof + Deploy (5h)

**Purpose:** The demoable app — XRPL sign → live status → positions + receipt.

### Task 4.1: Core UI + design system
**Files:** `lib/theme.ts`, `app/globals.css`, `app/layout.tsx`, `components/{ContrastHero,FtsoTicker,TemplatePicker,StatusStrip,PortfolioView,ProofView}.tsx` (§11).
**Steps:** copy from ARCHITECTURE; `npm run dev`; confirm the landing renders **feature-complete** — contrast hero (1 vault vs N), live FTSO ticker, token-styled components (no raw inline hex). This meets the "polished from pass one" bar — do not ship a bare stub.
**Commit:** `feat(ui): design tokens, globals, contrast hero, core components`

### Task 4.2: Sign panel + flow island — wire the hero flow
**Files:** `lib/xrpl.ts` (§10), `components/SignPanel.tsx`, `components/PortfolioFlow.tsx`, `app/page.tsx` (server component) (§11).
**Steps:** copy; run the full flow in-browser with the funded demo wallet. Confirm: baseline `sinceBlock` is captured BEFORE signing; status only flips to "Executed" when a real vault log is found (NOT instantly); the button stays disabled through polling (no double-submit); an unfunded wallet shows the faucet-guard failure message.

#### 🔀 Decision Point: Self-custody invariant [Risk 5]
✅ **If the flow completes with only the XRPL wallet** (no EVM/wallet/FLR prompt): invariant holds.
🔀 **If any step needs an EVM signer or FLR:**
1. Find where — likely a read wrongly using a wallet client. All Coston2 access must be `publicClient` (read-only); operator pays gas.
2. Remove any wallet-client usage from the user path.
⛔ **If encoding genuinely needs a Flare signature from the user:** that breaks the thesis — STOP and re-check the CLI flow (the operator signs on Flare, not the user).

**Commit:** `feat(ui): xrpl sign panel, full hero flow wired`

### Task 4.3: /proof page
**Files:** `app/proof/page.tsx` (§11).
**Steps:** copy; confirm `/proof` renders `submission/proof.md` with explorer links.
**Commit:** `feat(proof): /proof page from submission/proof.md`

### Task 4.4: Implement Demo Seed Script (mandatory)
**Purpose:** creates the exact demo state; run before every take.
**Files:** Create `scripts/seed-demo.ts` (ARCH §23, implements PRD §6 Demo Prerequisites).
**Steps:**
1. `npx tsx scripts/seed-demo.ts`
2. Verify each seed-table item exists (live infra, FTSO price, provider wallet format, proof scaffold).
**Gate:** runs to completion, idempotent.
**Commit:** `seed(demo): implement seed-demo.ts from PRD §6 Demo Prerequisites`

### Task 4.5: Deploy (Dockerfile — NOT Vercel)
**Files:** `Dockerfile` (§18).
**Steps:** build the image (pins the CLI via `--build-arg CLI_COMMIT=<Task-0 hash>`); deploy to Railway or Fly:
```bash
docker build --build-arg CLI_COMMIT=<pinned> -t baton . && docker run -p 3000:3000 --env-file .env baton
# then: railway up   (or)   fly deploy
```
Verify: `curl <live>/api/price` returns a price; the hero flow encodes (`/api/encode` returns a memo).

#### 🔀 Decision Point: Python CLI at runtime [Risk 10]
✅ **If the Docker image (Node+Python) deploys on Railway/Fly:** `/api/encode` subprocess works. Ship it.
🔀 **If the image build/deploy stalls:**
1. Do NOT switch to Vercel — its serverless has no Python; `/api/encode` would be dead.
2. Split the encode CLI into a tiny separate Railway service and have `/api/encode` call it over HTTP; set its URL in `.env`.
⛔ **If no host works in time:** run the demo from `localhost` (judge-runnable via repo + README + Dockerfile); a live URL is nice-to-have, not the thesis.

**Commit:** `chore(deploy): Dockerfile (Node+Python) on Railway/Fly`

### Phase 4 Gate
- [ ] Full hero flow works in-browser: create wallet → sign → live status → positions + receipt.
- [ ] `/proof` shows real explorer-linked hashes.
- [ ] `seed-demo.ts` idempotent and green.
- [ ] Live URL (or documented localhost path) serves the flow.
- [ ] Commits made.

---

## Phase 5: Seed, Pre-warm, Proof, Competitor Check (2h)

### Task 5.1: Pre-warm a real run
**Steps:** run the full flow once end-to-end; capture XRPL + Flare tx hashes; let the landing show this real receipt (judge-experience #7). **No fabricated state** (INVARIANT c).

#### 🔀 Decision Point: Fabricated-state guard [Risk 11]
✅ **If the pre-warm receipt comes from a genuinely executed run:** allowed — display it.
⛔ **If tempted to hand-author balances/hashes to save time:** FORBIDDEN (TASTE U7). Either run the real flow or show an empty state honestly. A fabricated receipt is disqualifying dishonesty.

**Commit:** `feat(demo): pre-warm real run receipt on landing`

### Task 5.2: NEW_WORK.md + proof.md + competitor eyeball
**Files:** `NEW_WORK.md`, `submission/proof.md`.
**Steps:**
1. Write `NEW_WORK.md`: **old** = reference CLI, live Flare contracts/operator; **new** = Baton's multi-vault `Call[]` composition, the app, the honest-status UX, the one-signature-portfolio product.
   - **[CRITIQUE E-1]** if Gate-1 fell to depth-7, add a one-line "why depth-7" note here recording the exact direct-mint blocker (from `CLI-INTERFACE.md`) so the depth drop is evidenced, not silent.
2. Finalize `submission/proof.md` with all real hashes/addresses.
   - **[CRITIQUE E-3]** next to the Flare `executeUserOp` tx hash, annotate: "internal calls in this ONE tx: deposit → Vault A, deposit → Vault B (atomic, all-or-nothing)" — so a judge can verify the multi-vault claim from the proof file alone.
3. Eyeball DoraHacks BUIDL list for an existing one-signature-multi-vault product (concern [A]); note the check.
**Commit:** `docs(submission): NEW_WORK, proof, competitor check`

### Phase 5 Gate
- [ ] Landing shows a real pre-warm receipt (explorer-resolvable).
- [ ] `NEW_WORK.md` cleanly separates old vs new.
- [ ] `submission/proof.md` complete with real hashes.
- [ ] Competitor eyeball done.

---

## Phase 6: Demo + Package (2h)

### Task 6.1: Record the 3-minute demo
**Steps:** run `seed-demo.ts`; record per PRD §6 (4 scenes, network+chainId on screen, honest FDC latency, failure-safeguard beat). Pre-warm so execution lands in the take.
- **[CRITIQUE E-3]** in Scene 4, land and HOLD on the Coston2 explorer decoded-input / internal-txns view of the single `executeUserOp` tx showing BOTH deposit calls, with the on-screen callout "ONE transaction · TWO vault deposits · atomic." This is the wow beat — do not rush past it.
- **[CRITIQUE E-2]** in Scene 3, include the added voiceover line clarifying Baton rides the operator's FDC attestation (not a first-party FDC call) — honest depth framing.
**Commit:** `docs(demo): 3-min demo video + screenshots`

### Task 6.2: Package for DoraHacks
**Steps:** assemble submission (name, track, description, target user, demo link, repo, Flare-use explanation, NEW_WORK boundary, contract addresses + tx links, roadmap) per brief §4.
- **[CRITIQUE E-4]** target-user field: name the real mainnet user ("an XRP holder using Xaman/D'CENT on XRPL mainnet") and state testnet is a demo constraint; put mainnet FXRP + Xaman QR signing in the roadmap.
- **[CRITIQUE E-2]** Flare-use explanation: state that FDC is consumed *through* Flare's operator (operator requests the Payment attestation; Baton surfaces the real round honestly) — pre-empts the "first-party FDC?" question. Rich-text delivery per brief §Package (hook→problem→solution→how-it-works→features→proof→stack→contracts→alignment→proof-close; raw addresses + chainId; no em dashes).
**Commit:** `docs(submission): DoraHacks package`

### Phase 6 Gate
- [ ] Demo video ≤ 3 min, one real outcome + one exact tx + one failure-safeguard shown.
- [ ] Submission complete with all brief §4 fields.
- [ ] Submitted before internal safety deadline (17:59 UTC).

---

## Appendix: Quick Reference

### All Addresses
| Item | Address | Network |
|---|---|---|
| MasterAccountController | `0x434936d47503353f06750Db1A444DBDC5F0AD37c` | Coston2 |
| Operator | `0x103b384064ae85577127097A7cCadfd6fb13f437` | Coston2 |
| Agent vault (mint) | `0x55c815260cBE6c45Fe5bFe5FF32E3C7D746f14dC` | Coston2 |
| Vault A / B | `0xD91324A6e8884147F6425E9ddd60e11Aea060B5b` / `0xC90D6847747b85d1fa2E07859869fb9fB72c0361` | Coston2 |
| Contract Registry | `0xaD67FE66660Fb8dFE9d6b1b4240d8650e30F6019` | Flare-family |
| Provider XRPL wallet | `rEyj8nsHLdgt79KJWzXR5BgF7ZbaohbXwq` | XRPL Testnet |

### Troubleshooting
| Error | Likely Cause | Fix |
|---|---|---|
| CLI `module not found` | wrong entry | Task 0.1 DT — read pyproject scripts |
| XRPL tesSUCCESS, no Flare tx | wrong memo/dest/fee | Task 0.2 DT — re-check encode, dest, amount |
| Call[] reverts | missing FXRP approve / insufficient FXRP | Task 2.2 DT — prepend approve calls |
| HTTP 429 | RPC concurrency | Task 3.1 DT — ≤30-block windows, backoff |
| `getFeedById` reverts | fee/feed-id | Task 3.2 DT — free view / feed-id encoding |
| deploy encode fails | no Python on Vercel | Task 4.5 DT — Node+Python host or sidecar |

### Decision Tree Index (CRITICAL + HIGH risks — 10/10 covered)
Risk 1→0.2 · Risk 2→2.1 & 2.2 · Risk 3→(Phase 4/6 pacing, seed pre-warm) · Risk 4→1.3 Gate-1 · Risk 5→4.2 · Risk 6→1.2 · Risk 7→3.1 & 3.2 · Risk 8→0.1 · Risk 10→4.5 · Risk 11→5.1
