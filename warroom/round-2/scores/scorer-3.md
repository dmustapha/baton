# Independent Scorer 3

Neutral evaluation order chosen before scoring: **Exit Relay**, then **Forget-to-Redeem**. Scores are 1–10 integers. Weighted totals use the scorer-contract weights and are reported out of 100.

## FINAL RANK 1: EXIT RELAY

### Hard dimensions

- **User-visible mechanism novelty: 7/10.** Performance-based capacity limits and rerouting are familiar separately. The minimum credible novelty is the exact feedback rule: confidentially prove inclusion and fulfillment for one routed tranche, then deterministically shrink the same provider's next tranche and move the withheld FXRP. It falls below 7 if reduced to reputation, scoring, slashing, or an operator-selected cap.
- **Protocol-composition novelty: 9/10.** A private inclusion ledger, signed FCC/FCE batch result, project-controlled FXRP capacity transition, and immediate reroute form a tight causal composition. The composition is not a passive FDC/FCC dashboard.
- **Demo surprise: 8/10.** A hidden omitted or partially fulfilled request visibly reducing the next live FXRP tranche and rerouting the remainder is a strong reveal. Surprise depends on executing both cap change and transfer, not animating them.
- **Interoperable Asset depth: 8/10.** The project router funds, caps, transfers, withholds, and reroutes live FXRP. This is a genuine asset consequence, though it controls an application pool rather than FAssets protocol agent capacity.
- **Confidential Compute depth: 8/10.** Private request amounts, identities, queue order, and deadlines are processed into a signed batch root/nullifier/performance/cap result. Machine identity, status, typed verification, expiry, monotonic batch IDs, and omission failure are explicit. Production depth is capped by likely simulated FCC execution.
- **One-builder feasibility: 7/10.** A tranche-router contract, deterministic FCC/FCE worker, typed-signature verifier, and three-request UI are plausible. Live FXRP transfers are callable on Coston2; the main risk is presenting private inclusion convincingly while honestly labeling simulated FCC.

**Hard-floor result: CREDIBLE.** All six non-compensating floors pass. Mechanism novelty passes at the threshold and must not be broadened into a generic provider score.

### Weighted hackathon dimensions

- **Product usefulness and target-user clarity: 8/10.** FXRP holders and routed-redemption operators have a concrete failure: hidden omission or partial fulfillment that otherwise leaves the next exposure unchanged. The route-provider operating model needs a concise explanation, but the protection is understandable.
- **Quality and depth of Flare integration: 8/10.** Live FXRP movement and verified confidential computation are independently necessary and joined. The score is not 9 because FDC-confirmed external fulfillment is not required in the callable path as frozen, and the cap belongs to the application router rather than the FAssets protocol.
- **Technical execution and demo quality: 7/10.** The demo can show funding, hidden commitments, signed result, cap transition, allowed transfer, reroute, and omission refusal. FCC operational maturity and proof-fixture honesty remain material execution risks.
- **New work completed during the program: 8/10.** The private inclusion-to-next-cap state machine, verifier, live router, and evidence UI constitute substantial coherent new work if built during the event.
- **Distribution, traction, and continuation potential: 7/10.** It has a plausible path through FAsset support and service-routing workflows without a new marketplace. Adoption requires an operator-controlled routed pool and enough repeated service batches to matter.

**Weighted total: 77/100.** Calculation: `8×30% + 8×30% + 7×20% + 8×10% + 7×10% = 7.7/10`.

### Prior-art collision analysis

Plain-language substitution: **A service provider proves that every hidden request was included; incomplete service deterministically reduces its next capacity and immediately reroutes the withheld asset.** Performance penalties, capacity allocation, service-level scoring, and circuit breakers are established. The surviving mechanic is narrower: private inclusion and fulfillment evidence changes the same provider's next application-controlled asset tranche in the visible lifecycle. A reputation badge, discretionary operator update, generic performance bond, or slash-only version collides and fails.

### Exact-interface status

**PASS.** On Coston2, the exact callable path is live FXRP `IERC20.transfer` from the project tranche router plus project `recordBatchResult`/cap-state logic. Builder access and controlled state are public and project-owned. Judge receipts are FXRP `Transfer`, `BatchScored`, `CapChanged`, and `Rerouted` events. FCC private inclusion may be simulated but must be labeled as such.

### Removal tests

- **Remove Interoperable Assets: PASS.** Without the funded FXRP router and next-tranche transfer/reroute, the output is only a private SLA score; the user-valued protection disappears.
- **Remove Confidential Compute: PASS.** Without confidential inclusion evaluation, request identities, amounts, and queue order must be exposed or omission cannot be proven; the cap transition loses its defining guarantee.

### Joined-proof assessment

**PASS, conditional on same-demo execution.** Required path: fund project FXRP router → commit hidden service requests → identified FCC/FCE worker emits typed inclusion/fulfillment result → contract verifies signer, root, batch ID, expiry, and cap → router transfers the allowed next tranche and reroutes the withheld amount → explorer-visible transfers and cap/reroute events. The failure path must show omitted request or stale batch causing revocation/abstention. Merely showing a calculated next cap fails.

### Failed-claim list

- Do not claim to alter FAssets agent protocol capacity; only the project router's capacity changes.
- Do not call a simulated FCC worker attested, registered, or production.
- Do not claim private inclusion from a hidden list unless the committed root, deterministic inclusion rule, and omission failure are reproducible.
- Do not claim external redemption fulfillment is FDC-verified unless an exact FDC request/proof path is implemented and shown.
- Do not market the project as novel if the demo stops at a performance score, cap recommendation, or slashing event.

## FINAL RANK 2: FORGET-TO-REDEEM

### Hard dimensions

- **User-visible mechanism novelty: 7/10.** Certified deletion/secure erasure, one-use secrets, nullifiers, and privacy bonds exist. The threshold-level novelty is the public economic liability that remains after a cross-chain exit until the identified confidential environment attests capsule consumption. It fails novelty if framed as ordinary deletion, expiring permission, or replay protection.
- **Protocol-composition novelty: 9/10.** Real FXRP redemption, FDC-confirmed XRP payout, typed FCC/FCE capsule-consumption result, and application-bond release form an unusual, causally joined composition.
- **Demo surprise: 8/10.** Showing XRP already paid while an application bond remains locked, then unlocking it only after a signed consumption claim and rejecting replay, is memorable. The reveal weakens materially if redemption itself is presented as pending or if the payout is only a fixture.
- **Interoperable Asset depth: 8/10.** `IAssetManager.redeem` and FDC-linked payout evidence anchor the privacy obligation to a real cross-chain exit. The bond is an application overlay and does not change FAssets protocol finality.
- **Confidential Compute depth: 7/10.** The private route, identity mapping, fallback data, and recovery secret are consumed within an identified machine boundary; typed output, code/machine epoch, payout binding, signature verification, nullifier, and replay failure are specified. The score stays at 7 because attestation can prove approved code ran, not that no copy exists outside the represented environment.
- **One-builder feasibility: 6/10.** The project contract and typed worker are modest, but a live FXRP redemption, FDC timing, FCC operational constraints, and an honest capsule-consumption story create a narrow delivery margin. A fixture redemption would reduce sponsor and demo credibility.

**Hard-floor result: CREDIBLE WITH MANDATORY CORRECTIONS.** All floors pass, with feasibility at its minimum and mechanism novelty only at threshold.

### Weighted hackathon dimensions

- **Product usefulness and target-user clarity: 7/10.** The privacy residue after settlement is a real risk for users of a route-holding service, but the named service and why it posts the bond must be explained concretely. This is less immediately common than failed redemption routing.
- **Quality and depth of Flare integration: 9/10.** FXRP redemption, FDC payout binding, FCC/FCE consumption result, and onchain bond release are all causally necessary. This score assumes the corrected application-overlay architecture.
- **Technical execution and demo quality: 6/10.** The before/after sequence is clear, but live redemption/FDC latency and simulated FCC status are substantial risks. The demo must distinguish payout completion from application-bond release.
- **New work completed during the program: 8/10.** The cross-chain payout-bound capsule lifecycle, typed verifier, application liability, and replay path are a meaningful new product slice.
- **Distribution, traction, and continuation potential: 6/10.** It can serve wallets or redemption-routing services, but requires those services to adopt a privacy bond and machine-bound capsule design. The immediate distribution route is less direct than an operator protection tool.

**Weighted total: 74/100.** Calculation: `7×30% + 9×30% + 6×20% + 8×10% + 6×10% = 7.4/10`.

### Prior-art collision analysis

Plain-language substitution: **A privacy bond stays locked after asset settlement until an identified confidential machine attests that it consumed the one-use secret tied to that settlement.** Secure erasure, certified deletion, privacy bonds, one-use capabilities, and replay nullifiers are established families. The surviving distinction is the post-exit economic liability tied to a specific cross-chain payout and released only by the typed machine claim. The project must not claim invention of deletion proof or global deletion.

### Exact-interface status

**PASS WITH CORRECTION.** Exact Coston2 path: `IAssetManager.redeem`, observed redemption/FDC-related receipts, then project-bond `release` after the typed FCC signature verifies. Builder access to redemption and the application contract is public. Controlled state is the redemption request plus project bond; the application cannot delay, close, or redefine FAssets protocol finality. Judge receipts are redemption events, XRP/FDC evidence, `ErasureAccepted`, and `BondReleased`.

### Removal tests

- **Remove Interoperable Assets: PASS.** Without the real FXRP redemption and corresponding XRP payout, there is no cross-chain exit event that defines when the capsule becomes stale or when the application bond becomes releasable.
- **Remove Confidential Compute: PASS.** Without the identified private execution boundary and signed consumption result, the application cannot establish its release condition without exposing the capsule or trusting the service's unsupported assertion.

### Joined-proof assessment

**PASS WITH CORRECTED ORDERING.** Required path: call `IAssetManager.redeem` → observe XRP payout and FDC evidence → identified FCC/FCE environment consumes the payout-bound capsule and signs a typed claim → application verifier checks signer, code/machine epoch, payout hash, nonce, and result → application bond releases → judge sees redemption, payout, FDC status, `ErasureAccepted`, `BondReleased`, and replay rejection. FAssets redemption is already complete before the overlay bond releases.

### Failed-claim list

- Raw claim that “redemption cannot finalize” until erasure is invalid; only the project application bond remains locked.
- Raw claim that the application contract “closes” the FAssets redemption request is invalid.
- Raw references to an “agent bond” are unsupported unless the project itself creates and funds that bond; call it an application privacy bond.
- Do not claim information-theoretic, global, physical, or cryptographic proof that no copy exists elsewhere.
- Use **attested capsule consumption** or **typed erasure claim**, not unqualified “proof of deletion.”
- Do not imply simulated FCC execution is official registration or hardware attestation.
- Do not count a fixture payout as a live cross-chain redemption.

## Overall decision

1. **Exit Relay — 77/100, credible.** Best balance of visible utility, live callable asset action, and confidential proof that directly changes the next asset outcome.
2. **Forget-to-Redeem — 74/100, credible with mandatory claim corrections.** Stronger Flare composition, but thinner target-user immediacy, higher delivery risk, and a trust claim that must remain strictly bounded.
