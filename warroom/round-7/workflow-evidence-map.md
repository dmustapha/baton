# Round 7 — Workflow Evidence Map (Pre-Generation Gate)

> Built BEFORE any generator runs. Generators receive only the **ADMITTED** section.
> Named competitors, prior projects, saturated surfaces, kill-lists, and global prior art are
> withheld from generators and applied only after the raw pool is frozen (Phase 4).

## Purpose

Rounds 1-6 died because concepts invented buyers, workflows, private inputs, economic roles,
and authority. This map inverts the order: we admit a small set of **real, observed workflows**
first, and generators may only build dual-track products *on top of an admitted workflow*.

## Admission test (ALL ten required)

A workflow is ADMITTED only if every cell is satisfied by real, current evidence:

1. **Named user/buyer** — a real role that exists today, not a hypothetical operator.
2. **Current economic behavior** — money already moves in this workflow.
3. **Naturally-private inputs** — data that is *already* confidential in the workflow (not invented, and not data that is already public on a transparent ledger being "re-hidden").
4. **Reachable first users** — a channel to reach the first user without a new marketplace.
5. **Complete authority (THE ROUND-7 CRUX)** — **one actor already holds authority over BOTH the private data AND the asset action.** No hypothetical partner integration required.
6. **Exact public interfaces** — the asset action maps to a documented, callable Flare interface on a supported network.
7. **Supported network** — Coston2 (114) / Songbird (19) / Flare (14).
8. **Controlled state transition** — a real lifecycle transition, NOT a bare `IERC20.transfer`.
9. **Honest live/simulated boundary** — we can label exactly what is live vs. FCC-simulated-TEE (FCC on Coston2 = simulated TEE per VF-W18).
10. **Receipts** — a judge-visible before/after receipt exists for the asset action.

## Kill triggers (fail ANY → row killed before generation)

- **K1 Invented confidentiality** — the "private" data is actually public on-chain, or only private in a hypothetical overlay.
- **K2 Removable FCC** — remove the confidential computation and the product still works (FCC is decoration).
- **K3 Mere token transfer** — the "asset action" is an ERC-20 transfer or balance read, not a lifecycle transition.
- **K4 Hypothetical-partner authority** — the confidential result can only act if some incumbent wallet/agent-signer/exchange/custodian integrates it. (This is the exact "missing join" that killed Rounds 3-6.)
- **K5 Native-already-does-it** — native FAssets / Smart Accounts already supply the outcome (FIFO redemption, default compensation, nonce/replay binding, failed-mint recovery, executor fees, permissionless execution).

---

## Candidate workflows

### WF-1 — FAssets **agent (vault operator)** self-managing collateral & minting capacity

| Test | Finding |
|---|---|
| Named user | FAssets agents are a real, live mainnet role: they post collateral, back FXRP minting, and answer redemptions. |
| Economic behavior | Agents already earn minting/redemption fees and manage collateral value continuously. |
| Naturally-private inputs | An agent's **off-chain hedge positions, cost basis, and private liquidation-avoidance thresholds** are genuinely secret today — publishing your buffer invites adversarial mint/redeem timing. |
| Reachable users | FAsset agent operator channels / Flare operator community; small known population. |
| Complete authority | **YES.** The agent owns its own vault and calls `IAssetManager` agent functions as itself. It owns both the private risk data and the collateral/capacity action. |
| Exact interfaces | Agent collateral / minting-cap / self-close functions on `IAssetManager` (resolve via Contract Registry). |
| Supported network | Coston2 / Songbird / Flare. |
| Controlled transition | Collateral top-up/withdraw, minting-cap change, self-close — real lifecycle transitions. |
| Live/simulated | Asset action live; FCC risk computation = simulated TEE on Coston2, honestly labeled. |
| Receipts | Agent-info before/after (collateral ratio, cap) + tx hash. |
| K5 native? | Native provides the *levers* but NOT a verifiable binding between a **private computed risk decision** and the on-chain change. Borderline — flag for novelty scrutiny at gate. |
**Verdict: ADMIT.** Private data is real and self-held; FCC lets the agent prove "I acted within a sound private risk policy" without exposing the hedge book. Removal test: remove FCC → agent must publish the buffer or act unverifiably; remove asset action → no economic effect. Watch novelty-collapse to "private policy engine" at gate.

### WF-2 — FXRP **liquidator / challenger** running a private detection strategy

| Test | Finding |
|---|---|
| Named user | Liquidators/challengers are real FAssets actors who profit from liquidating unhealthy agents / proving payment non-existence. |
| Economic behavior | They already earn liquidation rewards / challenge incentives. |
| Naturally-private inputs | Their **detection model, target watchlist, and trigger thresholds** are genuinely private alpha. |
| Complete authority | YES — they submit liquidation/challenge txs as themselves. |
| Exact interfaces | `IAssetManager` liquidation / illegal-payment-challenge functions. |
| Controlled transition | Liquidation start, challenge submission — real transitions. |
| K5 native? | Native already *allows* permissionless liquidation/challenge. The private part (which target, when) is off-chain alpha. |
**Verdict: ADMIT (guarded).** Confidential compute selects/times the action; the action is a real state transition the actor is authorized to make. Risk: the hero moment needs an *uncontrollable* liquidation event to exist during the demo (flagged by Round-6 audit). Generators must design a self-contained repro. Watch K5 at gate.

### WF-3 — XRP **treasury / fund** authorizing Flare-side execution via **Flare Smart Accounts** under a private mandate

| Test | Finding |
|---|---|
| Named user | Teams/funds holding XRP that want programmatic Flare-side actions authorized from XRPL — Smart Accounts are a stated 2026 distribution priority. |
| Economic behavior | Treasuries already move XRP and pay for execution. |
| Naturally-private inputs | **Mandate rules, per-counterparty limits, allowlists, and signer set** — publishing these is a security exposure. |
| Complete authority | YES — the treasury owns its Smart Account and its mandate. XRPL authorizes; Flare executes. |
| Exact interfaces | Flare Smart Account custom-instruction execution (XRPL-authorized). |
| Controlled transition | XRPL-authorized Flare execution binding committed calldata/nonce — real transition. |
| K5 native? | Smart Accounts bind calldata/nonce and provide recovery, but do NOT evaluate a **private mandate** and bind its signed verdict to execution. |
**Verdict: ADMIT (high novelty-risk).** Strong authority + genuinely private mandate. BUT the user-visible mechanic risks collapsing to "confidential maker-checker / policy engine" (checkpoint novelty-collapse warning). Generators must find a load-bearing transition beyond a guard. Heavy gate scrutiny.

### WF-4 — XRPL-native **business** settling supplier/contractor payments in FXRP with private commercial terms

| Test | Finding |
|---|---|
| Named user | Businesses already paying in XRP with confidential pricing/salary/invoice terms. |
| Economic behavior | Real recurring payments; existing payer-payee relationship (no marketplace needed). |
| Naturally-private inputs | Salary, invoice amounts, discount schedules — genuinely private commercial data. |
| Complete authority | YES over their OWN payments and terms; FDC attests the XRP payment they themselves made. |
| Exact interfaces | FDC payment attestation → FXRP escrow/conditional release (app-owned release + FDC verification). |
| Controlled transition | FDC-verified XRP payment → FXRP escrow → conditional release — real lifecycle. |
| K5 native? | Native does not evaluate private conditional entitlement; app-owned. |
**Verdict: ADMIT (collision-heavy).** Passes authority + naturally-private + real lifecycle. BUT confidential payroll/escrow/invoice is on the SATURATED list and multiple named competitors occupy it — this will face the hardest event-collision + prior-art gate. Admit to generation; expect gate pressure.

### WF-5 — FXRP holder **self-custody exit / redemption** with private destination policy

| Test | Finding |
|---|---|
| Complete authority | Holder owns their FXRP and triggers redemption themselves. |
| Naturally-private inputs | Destination XRPL address policy / routing intent. |
| K1 invented confidentiality | **`RedemptionRequested` already publishes agent, redeemer, payment address, amount, deadlines, reference** (Round-2 finding). The "private queue/destination" contradicts the live protocol. |
| K5 native | Native FIFO assignment + default compensation already cover this. |
**Verdict: KILL (K1 + K5).** This is the Exit-Relay grave. Redemption data is public; confidentiality is invented; native already assigns and compensates. Do not resurrect.

### WF-6 — Any workflow whose asset action requires a **Protocol Managed Wallet** external XRP signature

| Test | Finding |
|---|---|
| Exact interfaces | **No public callable PMW builder interface/example was found** (VF-W2, VF-W5, W2); STP.13 scopes PMWs to Songbird only. |
**Verdict: KILL (fails test 6).** PMW-authority rows have died every round on missing public builder path. Do not admit.

### WF-7 — Broad **consumer** "prove something private to unlock my own borrow/mint" (confidential eligibility, C5/C7 consumer framing)

| Test | Finding |
|---|---|
| Named buyer / economic behavior | Weak — the checkpoint's core finding: **broad users do not demonstrably demand attested confidential computation.** |
| K2 removable FCC | Often the eligibility check can be a plain on-chain proof; FCC becomes decoration. |
**Verdict: KILL (thin demand + K2 risk).** Consumer-confidential demand is unproven; reserve confidentiality for actors who *already* hold private books (WF-1..WF-4).

### WF-8 — Any workflow requiring an incumbent **wallet / exchange / custodian** to integrate the confidential result

**Verdict: KILL (K4).** This is the exact "missing join" that killed Rounds 3-6. FCC cannot control incumbents without their integration. Excluded by construction.

---

## ADMITTED set handed to generators (blind seed)

Generators receive ONLY these four workflows + the four kill triggers phrased as design rules
(no named competitors, no prior-art registry, no saturation list):

| ID | Actor (self-holds both authorities) | Naturally-private data | Real asset lifecycle transition | Live/simulated |
|---|---|---|---|---|
| WF-1 | FAssets agent / vault operator | hedge book, cost basis, liquidation buffer | collateral / minting-cap / self-close | action live, FCC sim |
| WF-2 | FXRP liquidator / challenger | detection model, watchlist, thresholds | liquidation start / payment-nonexistence challenge | action live, FCC sim |
| WF-3 | XRP treasury / fund (Smart Account) | mandate rules, limits, allowlist, signer set | XRPL-authorized Flare execution (calldata/nonce bound) | action live, FCC sim |
| WF-4 | XRPL-native business (self-payer) | salary / invoice / pricing terms | FDC-verified XRP payment → FXRP escrow → conditional release | action live, FCC sim |

## Standing design rules injected as constraints (not the kill-list)

- The confidential computation must be over data the ACTOR ALREADY holds privately. If you invent the secret, you fail.
- Remove FCC: the product must break (leak the book, or become unverifiable). If it still works, FCC is decoration — fail.
- The asset action must be a lifecycle transition with a documented Flare interface and a before/after receipt. A bare transfer fails.
- The actor must already have authority over the action. No "if wallet X integrates us" — fail.
- Do not rebuild what native FAssets / Smart Accounts already do (FIFO redemption, default compensation, nonce binding, failed-mint recovery, executor fees).

## Honest caveat carried into gating

Even WF-1..WF-4 carry real risk: WF-1/WF-3 can collapse to "private policy engine" novelty; WF-2's hero demo needs a self-contained trigger; WF-4 is collision-saturated. Admission here is a *license to generate*, not a survival guarantee. The post-freeze gates run at full strength. A 0-survivor outcome remains a legitimate, honest result.
