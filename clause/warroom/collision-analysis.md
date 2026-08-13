# Warroom Collision Analysis — 20 Raw Ideas vs. 99-Signal Corpus

## Method

This gate screened all 20 raw ideas against the complete 99-signal coverage ledger, the gate-only collision appendix, the roster registry, and the Research Brief Kill List. A meaningful collision requires alignment across four dimensions:

1. **Target user**
2. **Core mechanism**
3. **Necessary outcome**
4. **Joined proof path**

Shared use of FXRP, FDC, Smart Accounts, PMW, or FCC/FCE alone is not a collision. Conversely, a new label or extra receipt does not rescue an idea when the same user gets substantially the same outcome through substantially the same mechanism and proof path.

Public evidence is directional, not proof of a final submission or complete product. Named comparisons below are limited to meaningful corpus threats supported by their ledger cluster, the high-threat appendix, or the Kill List's “Already Built” findings.

Decision labels:

- **KILL** — four-axis collision or a Kill List surface without sufficient structural change.
- **MERGE** — the raw idea contains a valuable mechanic, but another raw idea is the better carrier.
- **DIFFERENTIATE** — viable only if the stated boundary becomes the product's center, not a footnote.
- **KEEP** — no material four-axis collision found in the public corpus; normal market novelty risk remains.

## Per-Idea Collision Gate

### A1 — LATE ROUTE

- **Meaningful corpus threats:** C1 entry/routing cohort: Rill, Wayafee, Flare Payflow Guard, Undelayed, PortalFX, FlareRamp, NexusXRP, FXRPRoute, Veri, StacksBit Flare, and G1. The Kill List also marks basic minting/routing front ends as saturated.
- **Four-axis result:** User and lifecycle overlap the C1 cohort, but the mechanism and outcome materially differ from happy-path minting: precommitted private recovery envelope → late-payment quarantine → confidential disposition → actual deliver/refund receipt. The closest raw collision is E1 Tagback, which targets the same stranded payer, private claim matching, FXRP correction, and nearly identical FDC → FCC → transfer proof path.
- **Decision:** **MERGE with E1 Tagback; retain LATE ROUTE as the carrier.** Import E1's two-party claim fragments and claim nullifier. Keep the expired-quote/abandoned-session quarantine as the primary demo because it is more specific than a generic wrong-tag support flow.
- **Required differentiation:** Never pitch “better FXRP minting.” Pitch post-payment exception custody: the source payment is irreversible, the session is dead, and only the precommitted private envelope can release quarantined FXRP.

### A2 — VEILED CHANGE ORDER

- **Meaningful corpus threats:** WorkProof is explicitly listed as already-built confidential smart-contract work escrow. MilestoneX Flare, Flare Confidential Settle, Flare Evidence Escrow, Faktura, FAsset Task Bounty, and the broad C3 payment/escrow cohort occupy milestone, invoice, escrow, and evidence-triggered release. The Kill List marks generic escrow and milestone release as saturated.
- **Four-axis result:** The partial change-order amount and Smart Account cap improve the mechanism, but the target parties, confidential work evidence, payment outcome, and commit → private adjudication → escrow release proof path remain close to WorkProof and milestone products. It also collides internally with C1 VeilCheck Escrow.
- **Decision:** **KILL as a standalone.** If salvaged, its only defensible component is “release the undisputed portion while preserving a challenge-locked remainder”; that component can become a failure branch in a non-work product.
- **Material differentiation threshold:** A mere partial payout is insufficient. It would need a different user and asset lifecycle—for example, FAssets exception repair rather than buyer/contractor settlement.

### A3 — PAYROLL PULSE

- **Meaningful corpus threats:** PrivyRoll Signal is explicitly already-built Merkle FXRP payroll. BridgeSafe occupies private XRPL treasury; Keyless, Aegis, Tacit, Cipher Sign, Ward, CAVOK, FlareClaw, Denarii Orchestrator, and TEE-enforced agent authorization occupy confidential signing and policy execution. Simple payroll is on the Kill List.
- **Four-axis result:** The payroll user/outcome collides with PrivyRoll, while the machine-failover mechanism collides internally with B3 Machine Lifeboat and D3 SplitLock. Its strongest novelty is not payroll; it is continuity after signer failure.
- **Decision:** **MERGE into B3 MACHINE LIFEBOAT.** Preserve the visible primary-machine failure and bounded catch-up batch as an example scenario, but remove payroll from the product identity.
- **Required differentiation:** Machine epoch rotation must reconcile one already-pending external intent and reject a valid-but-obsolete signature. Otherwise it collapses into private treasury or payroll.

### A4 — KINSHIP WINDOW

- **Meaningful corpus threats:** Heirloom is explicitly current and the Kill List says it already covers XRP inheritance with nonexistence proofs; Remnara also covers TEE-signed inheritance. C11 directly covers inactivity, beneficiary release, and continuity vaults.
- **Four-axis result:** Same asset owner/beneficiary, same inactivity-plus-private-beneficiary mechanism, same inheritance/release outcome, and same absence proof → eligibility → challenge window → transfer path. Reversibility on renewed activity is useful but does not materially change all four dimensions.
- **Decision:** **KILL.** This is the clearest direct collision in the pool.

### B1 — REDEMPTION REWIND

- **Meaningful corpus threats:** Backstop, Ballast, Vouchsafe, LedgerGuard, fassets-verify, Haircut, XRPShield, Herkos, FAsset Sentry, and the C2 cohort cover redemption risk, solvency, exit depth, insurance, challenger action, and diagnosis. The Kill List says this infrastructure is already built. D4 Repair Receipt is a close raw collision.
- **Four-axis result:** It avoids a direct collision only where confidential counterfactual choice causes a bounded exception transition after a *specific partial redemption*. D4 targets the same operator/redeemer failure, selects retry/reroute/return privately, restores stranded value, and proves FDC → FCC permit → corrective transition.
- **Decision:** **MERGE into D4 REPAIR RECEIPT.** Carry over B1's three-branch counterfactual simulation and “smallest safe bounded action” logic.
- **Required differentiation:** The product must execute one exception recovery. Risk scoring, solvency views, or redemption diagnosis alone collide with the named C2 leaders.

### B2 — SECOND LOOK CREDIT

- **Meaningful corpus threats:** Veil, CreditGate, Sealed Credit, FlareCredit, Cuddly Lamp, and the C5 cohort target confidential eligibility, underwriting, signed limits, and collateral changes. Veil and CreditGate are named high-threat comparisons.
- **Four-axis result:** The initial borrower/scoring surface is crowded, but the necessary outcome is materially narrower: correct a stale or wrongly denied decision through a one-use policy-version appeal that changes an existing FXRP collateral term. The proof path adds old/new policy hashes, corrected FDC evidence, a single-use amendment, and replay rejection—an edge state the cluster map explicitly marks as underserved.
- **Decision:** **DIFFERENTIATE.** Keep only if the demo starts from an already-denied live position; do not build origination, general scoring, or a lender market.
- **Required differentiation:** Call it a confidential appeal/correction protocol, not confidential credit. The core receipt must prove evidence replacement and policy-version comparison before the one-time collateral amendment.

### B3 — MACHINE LIFEBOAT

- **Meaningful corpus threats:** Keyless, Aegis, Tacit, Cipher Sign, Ward, BridgeSafe, Denarii Orchestrator, CAVOK, FlareClaw, and TEE-enforced agent authorization occupy policy-gated signing and private treasury. Balary and the C12 cohort cover machine lifecycle tooling. A3 Payroll Pulse and D3 SplitLock are close raw ideas.
- **Four-axis result:** Generic signer rotation would collide. The defensible combination is different: a PMW operator with one already-pending rescue/refund intent; old-machine liveness failure; confidential reconciliation of policy epoch and current cap; one replacement permit; actual XRPL action; FDC closure; stale-intent rejection. No named signal in the reviewed evidence is shown completing that exact continuity-to-asset-recovery path.
- **Decision:** **KEEP as the carrier for the machine-continuity merge.** Merge A3's visible failover timeline and D3's split-policy intersection as the adversarial branch, but keep one pending XRP rescue/refund as the product outcome.
- **Required differentiation:** Do not expand into treasury management. The demo must show an old signature that is cryptographically valid but economically obsolete being refused before the replacement completes one bounded external action.

### B4 — COLLATERAL CIRCUIT BREAKER

- **Meaningful corpus threats:** Ballast, Backstop, Vouchsafe, LedgerGuard, Haircut, XRPShield, FAsset Sentry, Herkos, fassets-verify, Veilfactor, and AegisFlow cover risk, position health, deleveraging, or confidential screening. The Kill List calls generic risk products saturated and independent FAssets risk/challenger infrastructure already built. C2 Quiet Exit Window and D1 Exit Envelope overlap internally.
- **Four-axis result:** Same at-risk holder/operator, private risk simulation, protective unwind outcome, and state → computation → bounded deleverage → before/after path as multiple corpus and raw exit/guardian concepts. “Smallest safe action” is an improvement, not a different product.
- **Decision:** **KILL.** If retained as a component, use its minimum-safe-amount calculation inside D4's redemption repair, where the trigger is a concrete failed lifecycle rather than generic deterioration.

### C1 — VEILCHECK ESCROW

- **Meaningful corpus threats:** WorkProof is explicitly already-built confidential smart-contract work escrow. MilestoneX, Flare Confidential Settle, Evidence Escrow, FAsset Task Bounty, and C3/C7 signals cover private work evaluation and asset release.
- **Four-axis result:** Buyer/contractor, hidden artifact and tests, work-payment outcome, and commitment → confidential verdict → escrow split/refund path align directly with WorkProof's described surface. Inclusion and erasure receipts do not change the four-axis core.
- **Decision:** **KILL.** Do not attempt cosmetic differentiation around partial payout, attestations, or file erasure.

### C2 — QUIET EXIT WINDOW

- **Meaningful corpus threats:** The collision appendix marks confidential OTC, RFQ, routing, hidden stops, strategy vaults, and conditional execution as saturated, with Cinder, Adumbra, Whisper, Nightjar, DarkStop, Sotto, Wraith, UMBRA, Midpoint, SealedFlare, and private-FXRP variants. SealedFi and the C9 cohort cover automated vault exits. D1 Exit Envelope and B4 Circuit Breaker overlap internally.
- **Four-axis result:** Treasury owner, concealed exposure/route policy, bounded confidential unwind, and evidence → private simulation → one-use asset action are red-ocean patterns. Abstention on source conflict is good engineering but insufficient differentiation.
- **Decision:** **KILL.** Preserve evidence-status and abstention UX as a shared proof primitive only.

### C3 — CIPHER REFUND RELAY

- **Meaningful corpus threats:** VeriPay, RelayPay, Flare Payflow Guard, Faktura, Evidence Escrow, Flare Confidential Settle, and the broad C3 cohort occupy payments, invoices, merchant settlement, and escrow. Generic merchant/payments are saturated. A1 Late Route and E1 Tagback overlap at the interrupted-payment boundary.
- **Four-axis result:** It differs from payment intake products because the necessary outcome is an *outbound, least-authority XRPL refund* after private claim adjudication, executed by PMW and reconciled to the source payment. It differs from A1/E1 because it does not rescue reserved/minted FXRP; it returns XRP externally to the payer. However, if PMW execution is removed or mocked without an honest boundary, it collapses into a crowded refund/support decision tool.
- **Decision:** **DIFFERENTIATE.** Keep separate from the Late Route/Tagback merge only if the PMW refund is the live centerpiece.
- **Required differentiation:** One source payment, one encrypted claim, one nullifier, one narrowly signed XRPL refund, one external receipt. Avoid checkout, invoice financing, broad merchant tools, and FXRP escrow.

### C4 — PROOFHUSH BOUNTY

- **Meaningful corpus threats:** FAsset Task Bounty already occupies task-bounty territory; WorkProof occupies confidential work verification; ProofVault, WorkProof, and C7 signals cover confidential artifacts and payout. The Kill List marks bounties and escrow as saturated. E2 FixBond is the closest raw collision.
- **Four-axis result:** Security researcher plus hidden exploit is a more specific user/input, but committed private work → confidential validity/severity → FXRP bounty release remains close to existing work/bounty surfaces. E2 has the stronger Flare-native outcome because its hidden patch must repair a failed FAsset lifecycle before payout.
- **Decision:** **MERGE into E2 FIXBOND, then evaluate that merged concept against D4.** Preserve the inclusion receipt, duplicate/nullifier, and abstention-on-uncertain-reproduction mechanics; drop generic vulnerability-severity payout.
- **Required differentiation:** The payout criterion must be a verified asset repair, not “report judged valid.”

### D1 — EXIT ENVELOPE

- **Meaningful corpus threats:** SealedFi, Autopilot, FXRP vault variants, Haircut, Ballast, and the C2/C9 cohorts cover vault strategy, exit depth, routing, and safe unwind. The Kill List marks vault/yield utilities and private strategy products saturated. C2 Quiet Exit and B4 Circuit Breaker are close raw collisions.
- **Four-axis result:** Saver, private exit threshold, unwind outcome, and route failure → private policy → bounded FXRP exit align with crowded vault-guardian patterns. Route-disappearance recovery is useful but not enough to move all four axes.
- **Decision:** **KILL.** The below-minimum rejection can be reused as a safeguard in E3 Veiled Exit or D4 Repair Receipt.

### D2 — MANDATE ZERO

- **Meaningful corpus threats:** Keyless, Aegis, Tacit, SealedFi, Autopilot, Warden, CAVOK, FlareClaw, and the C6/C9 cohorts cover policy-controlled signing, Smart Accounts, savings automation, and private constraints.
- **Four-axis result:** The wallet/savings setting is crowded, but the load-bearing mechanic and outcome are distinct: asset authority deterministically becomes *zero* after one cycle, and only a fresh confidential result can recreate a smaller mandate after private circumstances change. The proof path is centered on expiration refusal → recomputation → exact one-cycle execution → spent-mandate replay rejection, not ongoing autonomous allocation.
- **Decision:** **KEEP, with strict scope.** This is a portable authorization mechanic rather than another savings vault.
- **Required differentiation:** Demo the zero state first. If the product spends more time showing allocation/yield than forced re-authorization, it collides with the C9 cohort.

### D3 — SPLITLOCK

- **Meaningful corpus threats:** BridgeSafe is explicitly already-built private XRPL treasury; Keyless, Aegis, Tacit, Cipher Sign, Ward, CAVOK, FlareClaw, and Denarii Orchestrator cover confidential transaction policy. B3 Machine Lifeboat overlaps internally.
- **Four-axis result:** A treasury payment under hidden policies is crowded. The common-safe-intersection mechanism for concurrently valid policy versions is differentiated, but its external payment outcome and PMW proof path fit more naturally as the split-brain adversarial branch of B3's machine-epoch recovery than as a second treasury product.
- **Decision:** **MERGE into B3 MACHINE LIFEBOAT.** Use the 700-versus-701 intersection test after machine rotation to prove the replacement did not inherit ambiguous authority.
- **Required differentiation:** If retained standalone, the product must resolve a real split-brain signer epoch, not merely compare two spending rules.

### D4 — REPAIR RECEIPT

- **Meaningful corpus threats:** Backstop, Ballast, Vouchsafe, LedgerGuard, fassets-verify, Haircut, XRPShield, Herkos, FAsset Sentry, and C2 signals cover FAsset health and exceptions; Balary and C12 cover reproducible operational workflows. B1 Redemption Rewind and E2 FixBond overlap internally.
- **Four-axis result:** The public corpus strongly covers diagnosis and safety infrastructure, but the map itself records a missing outcome: tooling observes failure without completing user-valued asset recovery. D4's operator, deterministic failed-intent capsule, confidential bounded repair, fresh FDC gate, real return/retry, and replay bundle target that gap directly. B1 is substantially the same path from the redeemer side.
- **Decision:** **KEEP as the carrier for the redemption-repair merge.** Merge B1's counterfactual branch simulator. Treat E2's maintainer bond as an optional extension only if it does not add a second product and second contract.
- **Required differentiation:** The 90-second demo must begin with a failed redemption and end with restored user value. A dashboard, risk score, or generic test harness is a collision.

### E1 — TAGBACK

- **Meaningful corpus threats:** Rill, Wayafee, Flare Payflow Guard, Undelayed, PortalFX, FlareRamp, NexusXRP, FXRPRoute, Veri, StacksBit, G1, and the C1 cohort cover payment-to-mint routing. Merchant/payment signals add C3 pressure. A1 Late Route is the direct raw collision.
- **Four-axis result:** Same payer/merchant at a broken cross-chain intent, same private entitlement matcher, same redirect/refund outcome over reserved FXRP, and same FDC → FCC result → nullified transfer proof path as A1.
- **Decision:** **MERGE into A1 LATE ROUTE.** E1 contributes the strongest claimant intersection and duplicate-claim defense; A1 contributes the stronger pre-payment commitment and quarantine lifecycle.

### E2 — FIXBOND

- **Meaningful corpus threats:** FAsset Task Bounty, WorkProof, ProofVault, and C7 cover task/work proof and payout; Backstop, Ballast, Vouchsafe, LedgerGuard, and C2 cover asset remediation; Balary/C12 cover confidential operational replay. B1/D4 cover repair internally, and C4 covers bounty mechanics internally.
- **Four-axis result:** Unlike a generic bounty, payment requires a confidential patch replay to produce a committed FAsset correction and final asset state. That is materially stronger. However, it shares D4's operator, incident capsule, confidential repair verification, restored-value outcome, and end-to-end repair receipt, adding only the maintainer payment layer.
- **Decision:** **MERGE into D4 REPAIR RECEIPT as an optional “paid repair” mode, or keep as an alternate finalist—not both.** Import C4's inclusion/nullifier safeguard. Given one builder and the deadline, the simpler D4 carrier is safer.
- **Required differentiation:** The bond must remain secondary to the asset correction. If the demo reads as a task marketplace, it collides with FAsset Task Bounty and WorkProof.

### E3 — VEILED EXIT

- **Meaningful corpus threats:** Haircut covers exit-depth infrastructure; Backstop/Ballast/Vouchsafe and C2 cover redemption risk; the private-market cohort—Cinder, Adumbra, Whisper, Nightjar, DarkStop, Sotto, Wraith, UMBRA, Midpoint, SealedFlare, and private FXRP variants—covers hidden orders and allocation-like settlement. The Kill List marks private trading and simple FXRP vaults saturated.
- **Four-axis result:** Collision risk is high, but the necessary outcome is narrower than trading: allocate a fixed, FDC-confirmed *redemption capacity* fairly among already-exiting depositors, prove all encrypted requests were included, then redeem or refund real FXRP. No named evidence specifically establishes this batch capacity-allocation and omission-challenge path, though Haircut is a close adjacent threat on exit capacity.
- **Decision:** **DIFFERENTIATE aggressively.** Keep only if it is framed as a one-shot redemption-fairness circuit, never as an auction, RFQ, dark pool, or vault strategy.
- **Required differentiation:** Fixed external capacity, deterministic proportional rule, inclusion root, per-user fill/refund, and omitted-request freeze must all be load-bearing. Any price discovery or route competition turns it into a collision.

### E4 — VOID RECEIPT

- **Meaningful corpus threats:** PixelOrbit Flare, VeilMarket, Flare Prediction Market, Polycast, and the C8 cohort target private participation, external resolution, and payout. The C4 private-market cohort adds further overlap.
- **Four-axis result:** Same participant, hidden position/commitment mechanism, event payout/refund outcome, and commitment → external result → confidential root → FXRP settlement path as existing prediction/outcome products. Cancellation refund and omission challenge improve failure handling but do not change the core four-axis product.
- **Decision:** **KILL.** Reuse the omission-challenge and mandatory refund mechanics in E3 Veiled Exit, where the asset lifecycle is differentiated from outcome markets.

## Recommended Merge Groups

### M1 — Interrupted Mint Recovery

- **Carrier:** A1 LATE ROUTE
- **Merge:** E1 TAGBACK
- **Keep:** recovery-envelope commitment, quarantine state, two-party claim fragments, one-use nullifier, deliver/refund disposition, expired-signature rejection.
- **Do not merge:** C3 CIPHER REFUND RELAY unless PMW cannot be demonstrated. C3's outbound XRPL refund is a different asset consequence; merging it would blur the 90-second proof.

### M2 — Confidential Machine Continuity

- **Carrier:** B3 MACHINE LIFEBOAT
- **Merge:** A3 PAYROLL PULSE's machine-failure timeline; D3 SPLITLOCK's common-policy-intersection refusal.
- **Keep:** one pending external rescue/refund, old/new machine epochs, valid-but-obsolete signature rejection, bounded PMW action, FDC reconciliation.
- **Drop:** payroll as product identity, generalized treasury controls, multi-purpose policy language.

### M3 — Redemption Repair

- **Carrier:** D4 REPAIR RECEIPT
- **Merge:** B1 REDEMPTION REWIND's counterfactual recovery selection.
- **Optional:** E2 FIXBOND's maintainer payment only if the core repair is already complete and contract count remains within budget.
- **Keep:** deterministic failed-intent capsule, stale-proof rejection, fresh FDC evidence, private bounded repair, real FXRP correction, portable replay receipt.

### M4 — Confidential Remediation Work

- **Carrier if separately explored:** E2 FIXBOND
- **Merge:** C4 PROOFHUSH BOUNTY's inclusion receipt, duplicate nullifier, and uncertain-reproduction abstention.
- **Constraint:** This group competes directly with M3 for the same product center. Advance at most one of M3 or M4 to finalist selection unless the bond is reduced to a small optional state inside Repair Receipt.

### M5 — Private Exit Ideas

- **Kill:** B4 COLLATERAL CIRCUIT BREAKER, C2 QUIET EXIT WINDOW, D1 EXIT ENVELOPE.
- **Conditional survivor:** E3 VEILED EXIT only as fixed-capacity redemption fairness, importing D1's below-minimum refusal and E4's omission challenge/refund root.
- **Reason:** The other three align with saturated private strategy, risk-guardian, and vault-exit surfaces; E3 changes the necessary outcome to fair allocation of scarce redemption capacity.

## Collision-Kill Summary

Kill as standalone concepts:

1. A2 VEILED CHANGE ORDER — WorkProof/milestone escrow collision.
2. A4 KINSHIP WINDOW — direct Heirloom/Remnara inheritance collision.
3. B4 COLLATERAL CIRCUIT BREAKER — saturated FAssets risk/deleverage collision.
4. C1 VEILCHECK ESCROW — direct confidential work-escrow collision.
5. C2 QUIET EXIT WINDOW — saturated private strategy/exit collision.
6. D1 EXIT ENVELOPE — saturated vault guardian/unwind collision.
7. E4 VOID RECEIPT — existing private outcome/prediction market collision.

Absorb rather than advance independently:

1. A3 PAYROLL PULSE → B3 MACHINE LIFEBOAT.
2. B1 REDEMPTION REWIND → D4 REPAIR RECEIPT.
3. C4 PROOFHUSH BOUNTY → E2 FIXBOND or D4 optional paid-repair mode.
4. D3 SPLITLOCK → B3 MACHINE LIFEBOAT.
5. E1 TAGBACK → A1 LATE ROUTE.
6. E2 FIXBOND → D4 REPAIR RECEIPT unless explicitly chosen as the alternate product center.

## Post-Collision Candidate Set for Dami's Selection Gate

No ranking or finalist selection is performed here. The concepts that remain structurally defensible enough to place in front of Dami are:

1. **LATE ROUTE + TAGBACK** — interrupted mint quarantine and private correction.
2. **MACHINE LIFEBOAT + SPLITLOCK/PAYROLL failure mechanics** — confidential signer continuity that completes one external action.
3. **REPAIR RECEIPT + REDEMPTION REWIND** — private bounded repair of a failed redemption.
4. **SECOND LOOK CREDIT** — only as an appeal/correction lifecycle, not credit origination.
5. **CIPHER REFUND RELAY** — only with a central PMW-executed external refund.
6. **MANDATE ZERO** — forced decay and confidential recreation of asset authority.
7. **VEILED EXIT** — only as fixed-capacity redemption allocation with inclusion and refund proofs.
8. **FIXBOND** — only as an alternate to Repair Receipt, not an additional finalist with the same center.

This candidate set is ready for synthesis scoring and Dami's finalist-selection checkpoint. It does not authorize Forge or implementation.
