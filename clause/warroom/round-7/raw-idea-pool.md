# Round 7 — Raw Idea Pool (FROZEN before gate reveal)

Generators: 5 fresh-context, blind to competitors/saturation/prior-art/kill-list. Seeded only from the workflow evidence map (WF-1..WF-4) + creative deck. Each produced 2 concepts. Pool = 10.

Freeze rule: no edit, revive, or repair of any concept after this file is hashed. Gates run at full strength on this frozen set.

---

## A1 — SOLVENT (Prove-the-Buffer Self-Close) — WF-1
- Actor/authority: FAssets agent operator; owns vault + `IAssetManager` agent cap/collateral authority + private book.
- Private data: off-Flare hedge positions, cost basis, true liquidation buffer. Publishing invites grief-liquidation.
- Asset transition: agent collateral / minting-cap adjustment via `IAssetManager` agent functions; before/after mintable receipt.
- FCC: reads private hedge book + FTSOv2 price, emits signed `{policyHash, bufferOK, band∈{HEALTHY,TIGHT,CRITICAL}, blockRef}`. Only band+bool cross boundary.
- Joined path: CR dips → cap change requested → FCC verifies buffer ≥ floor → signed attestation verified by vault contract → `IAssetManager` transition → receipt.
- Removal Asset: attestation with no transition = theater. Removal FCC: must publish hedge book (leak) or trust unsigned claim (unverifiable).
- Demo: split screen, public shows CRITICAL, agent proves buffer, cap raises, book stays blacked out.
- Novelty risk: "private policy engine" collapse; proof is load-bearing on real transition.

## A2 — MANDATE (Confidential Redemption Guard for XRP Treasury) — WF-1×WF-3
- Actor: fund running FXRP position + XRP via Smart Account; holds redeem authority + signer set.
- Private data: redemption rate limits, per-counterparty allowlist, drawdown cap, quorum rules.
- Asset transition: `IAssetManager` FXRP redemption authorized by Smart Account XRPL execution (two chained lifecycle transitions).
- FCC: evaluates redemption vs private mandate; chain sees only `{mandateHash, approved, reasonCode}`.
- Joined path: redemption request → pending → FCC mandate check → signed approve → Smart Account authorizes → FXRP→XRP redeem → receipt; over-limit → `approved=false, RATE_LIMIT`, no execution.
- Removal Asset: mandate-checker approves nothing, no XRP moves. Removal FCC: publish limits/allowlist (leak) or trust off-chain (unverifiable).
- Demo: two redemptions; first approved+executes, second breaches hidden rate limit → blocked, number never shown.
- Novelty risk: maker-checker/policy-engine family. Two-hop cross-asset transition claimed as differentiator.

## B1 — SILENTAXE (Stake-Backed Private Liquidation Claim) — WF-2
- Actor: permissionless liquidator; `IAssetManager.liquidate` authority is open to anyone.
- Private data: detection strategy — CR thresholds, price-drift lead indicators, per-agent watchlist weights.
- Asset transition: `IAssetManager.startLiquidation` + `liquidate(_agentVault,_amountUBA)`; `LiquidationStarted/Performed` events.
- FCC: scores private watchlist+weights+live CR inside enclave; emits `{agentVault, liquidateNow, attestation, sig}`. Weights never leave.
- Joined path: watchlist → FCC scores → signed trigger → contract verifies attestation → liquidation fires → receipt. Safeguard: native reverts if agent actually healthy.
- Removal Asset: trigger authorizes nothing = dashboard. Removal FCC: scoring in clear = watchlist leaks, front-run.
- Demo: run own agent vault, push under CR yourself, FCC lights up, one tx, LiquidationStarted; weights redacted.
- Novelty risk: private targeting over permissionless native primitive; "am I rebuilding native liquidation?" scrutiny.

## B2 — GHOSTCHALLENGE (Confidential Payment-Non-Existence Challenger) — WF-2 (WF-1 texture)
- Actor: challenger in FAssets redemption; may submit payment-non-existence challenge.
- Private data: XRP-ledger monitoring heuristics, watchlist, timing/amount fingerprints, scan ordering.
- Asset transition: FDC `ReferencedPaymentNonexistence` attestation → `IAssetManager.confirmRedemptionPaymentDefault`; `RedemptionDefault` event, collateral pays redeemer+challenger.
- FCC: selects WHICH redemption ref to challenge from private heuristics; emits `{redemptionRef, challengeNow, attestation, sig}`.
- Joined path: heuristics → FCC selects suspect ref → signed → request FDC non-existence proof → verify sig+FDC → confirm default → receipt. Safeguard: if payment existed, FDC returns Payment proof, challenge reverts.
- Removal Asset: no default confirmation, nothing transitions. Removal FCC: heuristics run in open, competitors challenge first.
- Demo: own agent skips XRP redemption payment, FCC flags ref, real FDC round, challenge tx, RedemptionDefault; heuristics sealed.
- Strength: deepest Flare-native stack (FDC+FAssets+FCC). Novelty risk: private targeting over native challenge.

## C1 — EXPIRING MANDATE (Proof-of-Freshness Treasury) — WF-3 (forced memory scarcity)
- Actor: XRP treasury operator controlling Smart Account + XRPL signer set.
- Private data: per-counterparty exposure ceilings, current drawn amounts, remaining risk budget.
- Asset transition: `SmartAccount.execute(committedCalldata,nonce)` targeting FAssets redeem/collateral path.
- FCC: verifies action vs ceiling AND mandate freshness; each param carries proof-of-freshness expiry; prior committed mandate state erased; emits `{approved, nonceBinding, freshnessEpoch, attestationStatus}`.
- Joined path: payout request+price → operator re-proves fresh ceiling into enclave → enclave checks ceiling+freshness → signs → Smart Account executes → receipt; expired/breach → denied.
- Removal Asset: private calculator, no on-chain outcome. Removal FCC: post ceilings on-chain (leak) or freshness unverifiable.
- Demo: payout approved+executes; fast-forward freshness clock → same payout denied. "Treasury forgot its authority, had to re-prove."
- Novelty claim: authority DECAYS and must be re-earned confidentially before each action — not a static maker-checker.

## C2 — SEALED-BID SUPPLIER SETTLEMENT — WF-3×WF-4
- Actor: XRPL business treasury paying suppliers under private mandate; settles FDC-proven invoices.
- Private data: per-supplier negotiated unit prices, volume-discount tiers, priority ranking.
- Asset transition: FDC `verify(attestation)` of delivery/payment → Smart Account `execute` releases FXRP escrow to winner.
- FCC: sealed-bid clearing over private per-supplier terms + FDC facts; emits `{winningSupplierId, clearingAmount, calldataHash, nonce, attestationStatus}`; terms never revealed across suppliers.
- Joined path: FDC-verified delivery → enclave clears sealed bids → signed winner+amount → Smart Account releases FXRP → receipt; no clear/FDC fail → denied, escrow locked.
- Removal Asset: cleared result settles nothing. Removal FCC: terms revealed on-chain → collusion, cost structure leak.
- Demo: two sealed supplier terms (never shown), FDC delivery lands, enclave clears winner, FXRP releases, loser terms never exposed.
- Novelty claim: confidential multi-party clearing (sealed-bid) — no maker-checker analog.

## D1 — DELTA (Private Bilateral Reconciliation, Public Net Settlement) — WF-4×WF-3
- Actor: two XRPL-native businesses (supplier+buyer), each own treasury Smart Account; existing payer-payee.
- Private data: each side's line-item ledger — invoices, credit memos, disputes, rebate schedules, discount tiers.
- Asset transition: `openDelta(counterparty,periodHash)` escrows max-exposure FXRP bond each side → `settleDelta(periodId,signedResult)` releases exactly netAmount FXRP debtor→creditor, remainder refunds.
- FCC: matches line items, applies each side's private rules, computes ONE net number+direction; emits `{periodId, netDebtor, netCreditor, netAmount, ledgerHashes, attestationStatus}`; ledgers never leave.
- Joined path: FDC anchors each committed ledger hash → openDelta escrows both bonds → FCC reconciles → signed net delta → settleDelta verifies → netAmount FXRP moves, bonds refund → receipt. Safeguard: bad sig/hash mismatch → refund after timeout.
- Removal Asset: back to spreadsheet+manual wire. Removal FCC: expose full ledgers to compute net → core collapses.
- Demo: two private ledgers (never uploaded), FCC returns "Buyer owes Supplier 412 FXRP", one click settles exactly 412, receipt.
- Novelty claim: two-sided reconcile, reveal only the delta.
- Note: TWO real actors — check hypothetical-partner concern (both are self-holding their own authority; existing relationship).

## D2 — TRIPWIRE (FDC-Observed Payment → Private Entitlement Verdict) — WF-4
- Actor: XRPL business paying performance/milestone entitlements; owns payment + private rules.
- Private data: milestone acceptance criteria, tiered bonus curves, clawback/penalty math, retention thresholds.
- Asset transition: `armEscrow(payeeXRPLAddr,rulesCommit)` funds FXRP escrow → `resolve(fdcProof,signedVerdict)` releases release/deny/partial(amount) FXRP.
- FCC: evaluates FDC-attested payment (amount/memo/timing) against private tiered/clawback math; emits `{escrowId, verdict, amount, fdcProofHash, rulesCommit, attestationStatus}`; rules never leave.
- Joined path: XRP payment lands → FDC attests → armEscrow holds FXRP vs rulesCommit → FCC evaluates → signed verdict → resolve verifies FDC+sig+rulesCommit → verdict amount releases → receipt. Safeguard: bad proof/commit/sig → no release, refund after timeout.
- Removal Asset: manual payout, no receipt. Removal FCC: publish tier/clawback math (leak) or verdict unauditable.
- Demo: private rule set (never uploaded), self-issue XRP milestone payment, FDC attests, FCC returns "PARTIAL 780 FXRP", resolve releases exactly 780.
- Strength: FDC genuinely load-bearing as external trigger; cleaner single-actor demo.

## E1 — SWAPBACK (Solvency-Gated Self-Liquidation Handoff) — WF-1 (+WF-2 collapsed to single actor)
- Actor: FAssets agent operator running BOTH a private solvency check AND a private pre-liquidation trigger on their OWN book (no second real actor — honestly avoids invented partner).
- Private data: full position book — per-position CR, hedge legs, exposure concentration, internal buffer thresholds.
- Asset transition: FAssets agent-vault self-close / collateral top-up lifecycle move; receipt event.
- FCC: computes aggregate solvency margin + per-position liquidation-distance; emits signed `{shouldSelfClose, marginBps, sig}`; book never crosses.
- Joined path: FTSOv2 tick → enclave recomputes private solvency → signs verdict → contract verifies sig/attestation → authorizes self-close → receipt. Safeguard: stale/invalid → rejected, untouched.
- Removal Asset: private calculator. Removal FCC: publish book to justify self-close (leak) or unverifiable.
- Demo: private book (operator-only), FTSOv2 drops, enclave signs shouldSelfClose, contract executes self-close; tamper sig → rejected.
- Convergence note: near-identical to A1 (WF-1 private solvency → gate agent self-action). Candidate merge.

## E2 — HALFLIFE (Fractional Ownership of Confidential Trading Rule + Forced Memory Scarcity) — WF-3
- Actor: treasury operator controlling Smart Account + private execution mandate; issues fractional shares of the rule.
- Private data: mandate/rule parameters — thresholds, allocation targets, signer policy.
- Asset transition: Smart Account XRPL-authorized Flare execution (mandated rebalance/FXRP move); receipt to fractional owners.
- FCC: evaluates mandate over private params; bounded rolling window of past decisions with provable erasure of stale ones (machine-unlearning); emits `{execute, actionParams, erasureCommitment, sig}`. Fractional owners get receipts, never the rule.
- Joined path: FDC/FTSOv2 trigger → enclave evaluates mandate → enforces forced-memory-scarcity erasure → signs → Smart Account verifies sig+XRPL auth → executes → receipt to owners. Safeguard: invalid attestation/broken erasure → rejected.
- Removal Asset: owners get nothing, shares worthless. Removal FCC: mandate public (front-run) or trusted co-owner (recreates custodian risk); erasure impossible without enclave.
- Demo: two owners' dashboards (neither sees rule), trigger fires, "decision N-5 provably erased", Smart Account executes, both get receipt.
- Novelty risk: gimmick stacking (fractional ownership + erasure); erasure-proof scope caveat acknowledged by generator.
