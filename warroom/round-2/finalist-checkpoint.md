# Dami Finalist-Selection Checkpoint — Warroom Round 2

Status: **AWAITING DAMI SELECTION**

Round one remains rejected. Mandate Zero and SplitLock were not reused, renamed, merged, or promoted. Two blind batches generated 35 fresh ideas; exact-interface and global-prior-art hard gates left two credible finalists.

## 1. Exit Relay — 7.40/10 — MEDIUM risk

**User and failure:** An FXRP routing service can privately omit or under-serve requests while receiving the same next allocation because request demand and queue order are sensitive.

**Mechanism:** The provider proves hidden batch inclusion and fulfillment inside FCC/FCE. That result directly changes the application's next FXRP tranche: complete service preserves capacity, partial service shrinks it, omission revokes it, and withheld FXRP immediately reroutes.

**Why it is not familiar prior art:** Capacity penalties and private inclusion exist separately. The hard-gated novelty is the visible causal loop: private inclusion evidence changes the same provider's next asset capacity and moves the withheld asset, without a reputation-score or manual step.

**Demo hook:** Three hidden requests enter. One is partially fulfilled. The next live FXRP tranche shrinks on screen, and the withheld amount transfers to fallback with explorer receipts. An omitted or stale batch fails closed.

**Interoperable Asset depth:** Live Coston2 FXRP is held and transferred by the application router. Removing it leaves only analytics.

**Confidential Compute depth:** Private request membership, amounts, order, and fulfillment bind to a typed result. Removing FCC exposes demand or makes omission unverifiable.

**Exact interface:** Coston2 FXRP `IERC20.transfer`; project `recordBatchResult`; events `BatchScored`, `CapChanged`, and `Rerouted`. Current FXRP is dynamically resolved through Contract Registry.

**Boundary:** It changes only the application's provider cap, never FAssets protocol agent capacity.

**Main risk:** The first-user/provider model and fulfillment-evidence source need a crisp explanation; external fulfillment may be a clearly labeled fixture in the initial demo.

## 2. Forget-to-Redeem — 6.97/10 — HIGH risk

**User and failure:** A privacy-sensitive redemption service may retain a route, identity mapping, fallback secret, or recovery capsule after XRP payout completes, leaving residual exposure with no economic accountability.

**Mechanism:** A separate application privacy bond remains locked after FXRP redemption until FCC/FCE attests that the payout-bound one-use capsule was consumed. A typed claim releases the bond; reuse of the capsule is rejected.

**Why it is not familiar prior art:** Secure erasure, deletion certificates, nullifiers, and bonds exist. The hard-gated novelty is the cross-chain residual liability: completed payout does not release the service's separate bond until the confidential boundary returns the payout-bound consumption claim.

**Demo hook:** XRP arrives, yet the application bond stays locked. The confidential machine consumes the capsule, the bond unlocks, and replay visibly fails.

**Interoperable Asset depth:** Live `IAssetManager.redeem` plus XRPL payout/FDC evidence. Removing the cross-chain exit removes the capsule's lifecycle trigger.

**Confidential Compute depth:** Machine identity, payout hash, capsule commitment, epoch, typed signature, and nullifier govern bond release. Removing FCC reduces the release to operator trust.

**Exact interface:** Coston2 `IAssetManager.redeem`; FDC `IXRPPayment`; project bond `release` after typed FCC verification.

**Boundary:** It does not delay FAssets redemption. It proves only attested capsule consumption inside the identified machine, never global deletion.

**Main risk:** One-builder feasibility is exactly 6/10, and the bond payer, beneficiary, loss model, and immediate demand remain weaker than Exit Relay.

## Dami's decision

Choose one finalist, reject both, or request a focused clarification. No Winner Brief, Forge, architecture, or implementation will begin before your selection.
