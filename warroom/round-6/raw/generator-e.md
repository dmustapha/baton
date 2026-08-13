**Name:** PoolProof Kicker

**Problem:** A collateral-pool provider bears loss when their chosen agent misbehaves, but a permissionless challenger who can prove that behavior receives only the native reward and has no provider-funded reason to prioritize that pool.

**Market Anchor:** FLR providers already enter agent collateral pools, accrue and withdraw FXRP fees, and bear collateral loss; permissionless challengers already assemble FDC evidence and call native challenge methods for explicit rewards.

**Named Buyer:** An FLR collateral-pool provider protecting capital already deposited with one registered agent; any permissionless challenger can earn the kicker without agent cooperation.

**Existing Workflow:** The provider calls `CollateralPool.enter(uint256)` with FLR, later calls `CollateralPool.withdrawFees(uint256)`, and independently watches public agent outcomes while challengers submit proofs through Asset Manager.

**Current Substitute:** Raw pool reads, agent details, manual fee withdrawal, public monitoring, custom challenger tooling, and reliance on the native challenger reward alone.

**Mechanism:** After withdrawing earned FXRP fees, the provider can post a bounded same-agent kicker whose payout rises as the provider's exposed pool-token balance grows: `kicker = min(postedFees, base + exposedPoolTokens × chosenBps)`; it pays only when the kicker contract itself successfully calls `AssetManager.illegalPaymentChallenge(proof, agentVault)` or `AssetManager.doublePaymentChallenge(proof1, proof2, agentVault)` and receives the native result, otherwise the provider reclaims it at expiry.

**Chain-Native Angle:** The payer's capital exposure is an FAssets agent collateral-pool position, the posted budget comes from actual FXRP pool fees, and payout requires a native FDC-backed challenge against that same agent.

**Sponsor Fit:** FAssets supplies pool entry, fee withdrawal, public challenge, and reward settlement; FDC supplies the underlying-chain proof; Contract Registry resolves the current Asset Manager address before execution.

**Demo Hook:** A provider withdraws a visible FXRP fee, drags one slider to bind part of it to their pool-token exposure, and a second wallet submits a valid proof that turns the grey kicker into a native challenge receipt plus an instant reward reveal; an expired control kicker returns untouched.

**Competitor-Derived Insight:** Existing workflows prove pool fee accrual and permissionless proof-to-reward execution, while the safe opportunity map leaves collateral-provider loss exposure and challenger capital prioritization disconnected.

**Missing Outcome:** Let a provider convert already-earned fees into a success-only, same-agent challenge incentive with a measurable ratio of fees risked to pool capital protected.

**Multi-Track Architecture (single-track contract):** Interoperable Asset Products only: collateral-pool fee income funds a same-agent kicker that settles exclusively through an FDC-backed FAssets challenge.

**Per-Track Load-Bearing Test:** Remove the provider's live pool position and fee withdrawal, and the kicker loses its buyer, budget, and exposure formula; remove the native challenge, and no posted fee can be earned.

**Proof Path:** Provider-owned FLR enters the published pool → provider withdraws accrued FXRP fees → provider posts a capped kicker tied to the same agent vault and expiry → public challenger supplies a supported FDC proof → kicker contract calls the Registry-resolved native challenge method → actual challenge result and received reward authorize kicker payment → invalid/reverted proof changes no protocol state and expiry refunds the provider.

**Authority and Integration Map:** Pool entry → provider → `CollateralPool.enter(uint256)` with provider FLR on Flare → live holder-controlled transition → pool-token receipt; fee withdrawal → provider → `CollateralPool.withdrawFees(uint256)` → live → FXRP balance/event; kicker post/refund → provider → public project contract → live project-controlled escrow only → events; illegal-payment challenge → any challenger → `AssetManager.illegalPaymentChallenge(proof, agentVault)` at Registry-resolved address → live where supported → native receipt; double-payment challenge → any challenger → `AssetManager.doublePaymentChallenge(proof1, proof2, agentVault)` → live where supported → native receipt; payout → contract over only posted fees and value actually received → live → balance deltas. No agent call or signature is required.

**Adaptation Note:** Participant economics — connect an existing fee flow to an existing rewarded public action → adapted into an exposure-indexed success kicker. CROSS: forced expiry plus closed-loop diagnosis → action → verification → provider-funded challenge prioritization. Self-rejected variants included passive risk displays, automatic watcher services, invented agent insurance, and any payout based on a project verdict.

---

**Name:** Provenance Floor

**Problem:** A liquidator can earn enough total collateral to look profitable while too much of that payout is drawn from the collateral pool they also supply, turning a nominal premium into a hidden self-loss.

**Market Anchor:** Permissionless liquidators already acquire and burn FXRP through public liquidations for vault- and pool-collateral payouts, while pool providers hold loss-bearing pool tokens and currently reconcile before/after economics manually.

**Named Buyer:** A permissionless FAssets liquidator who also owns pool tokens for the target agent and controls the FXRP offered for liquidation.

**Existing Workflow:** The participant reads public agent and pool state, manually decides an FXRP amount, calls `AssetManager.liquidate(agentVault, amountUBA)`, then compares received vault/pool collateral with the change in their pool exposure.

**Current Substitute:** Raw events, explorer balances, spreadsheets, custom scripts, and treating the headline liquidation premium as profit without an atomic personal-loss constraint.

**Mechanism:** The holder escrows one FXRP liquidation lot with two signed bounds—minimum total payout and maximum pool-sourced payout—and the contract calls `AssetManager.liquidate(agentVault, amountUBA)`; using its exact returned `liquidatedAmountUBA`, `amountPaidVaultCollateralWei`, and `amountPaidPoolWei`, the entire transaction reverts unless `totalPayout / liquidatedAmountUBA ≥ floor` and `amountPaidPoolWei / totalPayout ≤ poolDrainCeiling`.

**Chain-Native Angle:** FAssets liquidation uniquely exposes a burn-funded payout drawn from two collateral sources, while the same participant can economically own part of the pool source; the product prices that circular exposure atomically.

**Sponsor Fit:** FAssets provides the public liquidation and split collateral return values; Contract Registry supplies the current Asset Manager address rather than a hardcoded deployment.

**Demo Hook:** The user sets a green total-return floor and a red self-drain ceiling; the first native liquidation visibly reverts despite an attractive headline premium, then a changed collateral mix passes and reveals both gross premium and net-of-pool-exposure gain.

**Competitor-Derived Insight:** Before-and-after ownership proof and exact public execution are demonstrated strengths, but the safe maps leave liquidation profitability and collateral-provider loss accounting as separate, fragmented jobs.

**Missing Outcome:** Enforce a liquidator-provider's personal economic floor inside the same transaction that burns FXRP, rather than discovering self-funded profit after settlement.

**Multi-Track Architecture (single-track contract):** Interoperable Asset Products only: one bounded FXRP lot enters a native FAssets liquidation whose two collateral payout sources determine atomic acceptance.

**Per-Track Load-Bearing Test:** Remove `AssetManager.liquidate` and its split return values, and neither the provenance ceiling nor the net economic floor can be enforced; a generic swap slippage check does not reproduce the circular pool exposure.

**Proof Path:** Holder proves pool-token balance and escrows holder-owned FXRP → contract resolves Asset Manager and calls `liquidate(agentVault, amountUBA)` → native call returns liquidated amount plus vault/pool payouts → signed inequalities pass and balances settle, or fail and the EVM reverts the burn and payouts atomically → receipt shows inputs, returned split, holder pool share, and accepted net result.

**Authority and Integration Map:** Pool position → holder → public `CollateralPool` balance read on Flare → live observation only → block-referenced read; lot authorization → FXRP holder → ERC-20 approval/project escrow → live holder-controlled state → deposit event; liquidation → public contract as eligible participant → `AssetManager.liquidate(agentVault, amountUBA)` at Registry-resolved address → live → native event and return values; bounds → project contract over its own call and escrow → live atomic revert/pass → transaction status and payout deltas; refund → holder → public withdrawal after unused/failed lot → live → receipt. No agent cooperation or protocol assignment change is asserted.

**Adaptation Note:** Before-and-after solvency or ownership proof — account for the holder's position on both sides of a transition → adapted into a payout-provenance constraint. CROSS: reversible staging before irreversible completion → FXRP liquidation, using EVM atomicity to reject a superficially profitable but self-draining result. Self-rejected variants included generic profit calculators, alerts, and ordinary minimum-output orders that ignore collateral provenance.

---

**Name:** Clearance Dividend

**Problem:** A large liquidator-funded FXRP lot may begin clearing an unhealthy position but leave an uneconomic remainder that no public executor wants to finish.

**Market Anchor:** FAssets liquidators already burn prepared FXRP for explicit premiums through repeated public liquidation calls, and the safe maps identify capital preparation, timing, transaction profitability, and partial completion as live participant burdens.

**Named Buyer:** A permissionless FAssets liquidator supplying the FXRP lot; any public executor may submit a slice without agent cooperation.

**Existing Workflow:** One liquidator chooses an amount and calls `AssetManager.liquidate(agentVault, amountUBA)` directly, or repeats manual calls while the public liquidation state and profitable amount change.

**Current Substitute:** One-shot manual liquidation, custom execution scripts, idle FXRP inventory, or leaving a small residual opportunity untouched.

**Mechanism:** The capital owner divides one FXRP lot into a fixed number of equal native liquidation slices and commits a clearance share of each slice's actual premium; the contract calls `AssetManager.liquidate(agentVault, sliceUBA)` per public execution and accumulates those shares into a dividend that is paid only to the executor whose call makes cumulative `liquidatedAmountUBA` reach the owner's signed lot target before expiry, while an unreachable final shortfall returns the accumulated dividend pro rata to completed-slice executors.

**Chain-Native Angle:** The dividend is funded solely by realized FAssets liquidation premiums and completion is measured by native returned liquidated amounts, not by a project health score.

**Sponsor Fit:** FAssets supplies FXRP burn, public liquidation, returned liquidation amount, and premium; Contract Registry resolves the mutable Asset Manager address.

**Demo Hook:** Four FXRP tiles clear one by one and feed a glowing premium ring; three callers receive ordinary slice pay, then the fourth clears the signed target and the entire ring snaps into that executor's wallet; a second run expires short and visibly refunds the ring pro rata.

**Competitor-Derived Insight:** Bounded batch execution and live performance receipts are proven useful primitives, while the opportunity map leaves partial liquidation completion and exact executor profitability unresolved.

**Missing Outcome:** Make the economically awkward final slice the most visibly valuable execution without inventing a subsidy, buyer, or offchain coordinator.

**Multi-Track Architecture (single-track contract):** Interoperable Asset Products only: a bounded batch of public FAssets liquidations converts realized premiums into a native-completion dividend.

**Per-Track Load-Bearing Test:** Remove the FXRP-burning native liquidation and returned `liquidatedAmountUBA`, and neither dividend funding nor completion can be established; arbitrary project counters cannot replace the protocol result.

**Proof Path:** FXRP owner escrows a capped lot, slice size, completion target, clearance share, and expiry → any public executor invokes one slice → contract calls `AssetManager.liquidate(agentVault, sliceUBA)` → returned amount and actual balance change determine realized premium → share accumulates → reaching signed cumulative target pays the clearance dividend; revert leaves the slice, and expiry returns unused FXRP plus the documented pro-rata fallback.

**Authority and Integration Map:** Lot creation → FXRP owner → ERC-20 approval and project escrow on Flare → live → event; slice execution → any public executor → project entrypoint calling Registry-resolved `AssetManager.liquidate(agentVault, sliceUBA)` → live → native receipt/return values; premium measurement → contract-owned before/after balances and native result only → live → per-slice event; completion payout → contract over actual accumulated shares → live → balance delta; expiry → owner and recorded executors → public settlement calls → live → unused-capital and fallback receipts. Agent state is read publicly and never modified except through the native permissionless liquidation.

**Adaptation Note:** Bounded batch execution — preserve independent receipts and deterministic failure handling → adapted into premium-funded clearance slices. CROSS: first-session countdown/reveal/consequence → liquidation, where the final protocol-confirmed slice captures a visible dividend and expiry flips it to pro-rata settlement. Self-rejected variants included execution bots, fixed keeper subsidies, arbitrary batch transfers, and a project-defined liquidation-complete flag.

---

**Name:** TwinProof Relay

**Problem:** A double-payment challenge can require two linked external-chain proofs, yet one challenger may find the first transaction and still fail to complete the pair before the usable evidence window closes.

**Market Anchor:** Permissionless challengers already assemble cross-chain evidence and submit invalid- or double-payment proofs for native rewards, bearing proof latency, false-positive cost, and fragmented proof-to-reward accounting.

**Named Buyer:** The first permissionless FAssets challenger who controls one candidate proof; the second proof contributor and final executor are public roles open to any eligible participant.

**Existing Workflow:** A challenger independently gathers both supported proofs, funds one `AssetManager.doublePaymentChallenge(proof1, proof2, agentVault)` call, and receives the reward only if the complete pair is valid and timely.

**Current Substitute:** Custom bots, raw underlying-chain data, FDC tooling, private sharing, and one operator carrying both evidence-assembly and execution risk.

**Mechanism:** Contributor A commits the first FDC proof hash plus a self-chosen completion purse; Contributor B reveals a nonidentical linked proof and calls the relay, which verifies both commitments by attempting `AssetManager.doublePaymentChallenge(proof1, proof2, agentVault)`; from value actually received, A gets `reward × max(20%, remainingWindow / totalWindow)`, B gets the complement plus the purse, and an expired unmatched commitment returns the purse minus a predeclared public expiry-call fee.

**Chain-Native Angle:** The paired evidence describes an FAssets agent's underlying-chain double payment, and only the native FDC-backed double-payment challenge can establish success and produce reward value.

**Sponsor Fit:** FDC supplies the two supported underlying-chain proofs; FAssets supplies `doublePaymentChallenge` and its reward; Contract Registry supplies the current Asset Manager address.

**Demo Hook:** Wallet A drops one sealed proof tile and a small purse; Wallet B reveals the matching second tile, the pair locks together, and a native challenge receipt explodes into a time-weighted two-wallet payout; an unmatched tile expires with a tiny public cleanup fee.

**Competitor-Derived Insight:** Portable proof bundles and public proof-to-action execution are demonstrated strengths, but the reviewed safe opportunity map leaves multi-proof assembly, timing risk, and reward attribution unfinished.

**Missing Outcome:** Let two permissionless evidence holders complete one native double-payment challenge and divide only a real reward by measurable completion urgency.

**Multi-Track Architecture (single-track contract):** Interoperable Asset Products only: two FDC proof contributions join into one native FAssets double-payment challenge and its reward split.

**Per-Track Load-Bearing Test:** Remove either FDC proof and the exact double-payment call cannot succeed; remove the FAssets challenge and there is no authoritative pair verdict or reward to split.

**Proof Path:** Public underlying transactions → Contributor A commits proof-one hash, agent vault, expiry, and purse → Contributor B supplies both supported FDC proofs with distinct transaction identities → relay checks hashes and calls `AssetManager.doublePaymentChallenge(proof1, proof2, agentVault)` → native receipt and actual received value settle the time-weighted split → invalid pair reverts without a project verdict, and unmatched expiry settles only the posted purse.

**Authority and Integration Map:** First commitment → any challenger → public relay contract on Flare with challenger-owned purse → live → event; proof creation → public FDC process for underlying-chain transactions → supported attestation → live where supported, with latency visible → proof receipts; pair submission → any second contributor/executor → Registry-resolved `AssetManager.doublePaymentChallenge(proof1, proof2, agentVault)` → live → native receipt; reward split → relay over only value actually received plus posted purse → live → payout events; expiry cleanup → any public caller → relay expiry method → live → capped cleanup-fee and refund receipt. No agent, exchange, or private data owner must cooperate.

**Adaptation Note:** Portable proof bundles — preserve independently sourced evidence until an authorized consequence → adapted into a two-contributor proof pair. CROSS: first-session reveal plus forced expiry → challenge economics, using a declining first-finder share and completion purse to price the missing second proof. Self-rejected variants included challenger alerts, proof-selling markets, project-scored evidence, and unsupported single-proof shortcuts.
