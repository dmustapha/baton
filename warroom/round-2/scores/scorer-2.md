# Independent Scorer 2

## 1. Exit Relay

### Hard dimensions

| Dimension | Score | Evidence-based reason |
|---|---:|---|
| User-visible mechanism novelty | 7 | Performance-based capacity is established, but the surviving mechanic is more specific: prove inclusion of hidden requests, use fulfillment receipts to derive the next cap, and immediately reroute the withheld tranche. It stays above the floor only if the cap change and reroute execute; a score, alert, bond slash, or manual operator decision would reduce this below 7. |
| Protocol-composition novelty | 9 | A confidential inclusion/fulfillment result directly controls the next transfer from the same routed FXRP pool. The causal composition is unusually tight even though it controls project routing rather than FAssets protocol agent capacity. |
| Demo surprise | 8 | Three hidden requests, one partial fulfillment, a visibly shrinking next cap, and immediate rerouting create a legible before/after reveal. Surprise falls sharply if fulfillment is represented only by fixtures without exact provenance labels. |
| Interoperable Asset depth | 7 | The exact callable path is live Coston2 FXRP `transfer` from a project tranche router plus project `recordBatchResult`. That is a real asset consequence, but it is not an FAssets agent-capacity mutation and may not be described as one. |
| Confidential Compute depth | 7 | Private request details, queue order, promised window, and batch inclusion are necessary inputs; the typed result is verified by contract and controls routing. Depth is limited by simulated FCC execution and the need to prove that fulfillment receipts are bound to the committed batch rather than merely supplied by the operator. |
| One-builder feasibility | 7 | One router contract, one deterministic batch worker, and a three-request replay are achievable. FCC operational availability, FDC timing if added, and inducing a real partial redemption are risks; an honestly labeled fulfillment fixture keeps the build credible. |

All six hard floors pass. User-visible novelty and both track depths are exactly at the floor and are non-compensating.

### Weighted hackathon dimensions

| Dimension | Weight | Score | Evidence-based reason |
|---|---:|---:|---|
| Product usefulness and target-user clarity | 30% | 7 | The target is an FXRP holder exposed to opaque redemption-service handling, and rerouting future exposure is a concrete protection. The individual holder's ability to choose or fund repeated tranches needs a crisp product explanation. |
| Quality and depth of Flare integration | 30% | 7 | Live FXRP transfer, contract-verified FCC/FCE result, and explorer-visible cap/reroute events form one path. The score is capped because the callable implementation is a project router overlay, not protocol-level FAssets routing. |
| Technical execution and demo quality | 20% | 7 | The state machine has clear success, partial, omission, stale-batch, and reroute branches. Credibility depends on deterministic batch binding, typed signatures, monotonic IDs, and exact live-versus-fixture labels. |
| New work completed during the program | 10% | 8 | The proposed private inclusion ledger, cap transition, router, and proof UI are a coherent new build slice, subject to a clear commit boundary and `NEW_WORK.md`. |
| Distribution, traction, and continuation potential | 10% | 6 | FAsset holders and service operators are identifiable channels, but adoption requires a provider or pooled router to mediate future tranches. First-user value is weaker if the demo cannot show why a holder would route repeatedly through it. |

**Weighted total: 7.0/10 (70/100).**

### Prior-art collision analysis

Plain-language substitution: “A service proves it included every hidden request; incomplete service automatically reduces its next allocation and reroutes the remainder.” Performance penalties, capacity allocation, private inclusion, and revolving-limit changes are individually familiar. The defensible novelty is their single causal state transition: confidential inclusion plus observed fulfillment changes the same provider's next asset tranche without a discretionary scorecard step. Any implementation that stops at reputation, SLA display, generic slashing, or a recommendation collides with established prior art and fails the novelty floor.

### Exact-interface status

**PASS, with a strict scope correction.** The callable path is an FXRP `IERC20.transfer` from a project-controlled tranche router and project `recordBatchResult` on Coston2. The project controls its own escrow and next-tranche cap. It does not alter a FAssets agent's protocol capacity, redemption queue, or routing rules. Judge receipts should include `Transfer`, `BatchScored`, `CapChanged`, and `Rerouted` events plus chainId 114 and explorer links.

### Removal tests

- Remove Interoperable Assets: the inclusion result becomes a private service score with no FXRP tranche to shrink or reroute; the protective economic outcome fails.
- Remove Confidential Compute: request membership and omissions cannot be evaluated without exposing holder demand or trusting a selectively disclosed batch; the next-cap transition loses its defining guarantee.

Both tests pass only when the confidential result automatically causes the project router's cap transition and FXRP reroute.

### Joined-proof assessment

**PASS, conditional on exact implementation.** Required path: fund project router with live FXRP → commit hidden requests and batch root → FCC/FCE worker emits a typed inclusion/fulfillment result with explicit simulated/registered/attested status → verifier accepts signer, root, expiry, and monotonic batch ID → `recordBatchResult` lowers the project cap → router transfers the allowed tranche and reroutes the withheld FXRP → UI presents explorer receipts and an omitted-request or stale-batch rejection. A dashboard-only cap or an unexecuted reroute fails.

### Failed-claim list

- “Real FXRP redemption/agent transition” is not supported by the gated callable path; claim a project-controlled FXRP tranche-router lifecycle.
- “Agent's next FXRP allocation cap” must be “the application's next routed tranche cap for that provider.”
- The application cannot claim to change FAssets protocol capacity, agent capacity, or protocol routing.
- A supplied fulfillment fixture is not raw external proof; its source and simulation status must be explicit.
- A simulated FCC/FCE signature is test evidence, not production attestation.

**Final rank: 1 of 2. Credible, with boundary corrections mandatory.**

## 2. Forget-to-Redeem

### Hard dimensions

| Dimension | Score | Evidence-based reason |
|---|---:|---|
| User-visible mechanism novelty | 7 | Secure erasure, certified deletion, one-use secrets, and privacy bonds already exist. The narrow surviving novelty is that a project bond remains locked after a cross-chain exit until the identified confidential machine attests capsule consumption. It fails the floor if framed as generic deletion proof or ordinary post-transaction cleanup. |
| Protocol-composition novelty | 9 | `IAssetManager.redeem`, external XRP payout evidence, typed FCC/FCE capsule-consumption result, and application-bond release form a strong cross-primitive sequence. The overlay does not redefine protocol redemption finality. |
| Demo surprise | 8 | Showing the XRP payout complete while a visible liability remains locked, then consuming the capsule, unlocking the bond, and rejecting replay is memorable. The moment depends on clearly separating protocol completion from application privacy completion. |
| Interoperable Asset depth | 8 | The gated callable path includes a real `IAssetManager.redeem` request and redemption receipts on Coston2, which is deeper than a token transfer overlay. FDC-confirmed payout staging and Contract Registry address resolution must be real or honestly labeled. |
| Confidential Compute depth | 7 | The private route, identity mapping, fallback secret, capsule commitment, typed result, machine epoch, and contract verification are causally necessary for bond release. The score cannot exceed 7 because FCC attestation only supports an execution claim inside an identified boundary; it cannot prove global deletion or absence of copies. |
| One-builder feasibility | 6 | The bond contract and nullifier/replay path are small, but real FXRP redemption, XRP payout/FDC timing, FCC simulation, and a polished trust-boundary explanation create substantial integration risk near the deadline. A deterministic staged fixture is necessary as fallback but cannot replace the live redemption proof. |

All six hard floors pass. User-visible novelty, Confidential Compute depth, and feasibility are at their floors; any overclaim or live-redemption failure makes the concept non-credible.

### Weighted hackathon dimensions

| Dimension | Weight | Score | Evidence-based reason |
|---|---:|---:|---|
| Product usefulness and target-user clarity | 30% | 6 | The named user and privacy hazard are understandable, but the need for a redemption service to retain route, identity, and fallback data after an onchain request is not yet self-evident. The bond payer, bond beneficiary, and loss model must be explicit. |
| Quality and depth of Flare integration | 30% | 8 | Real FXRP redemption, FDC payout evidence, FCC/FCE typed result, and an application bond are tightly sequenced. The integration remains strong only when protocol finality and application liability are presented as separate states. |
| Technical execution and demo quality | 20% | 6 | The proof cluster is clear, but a deletion-adjacent claim is easy to overstate and FCC plus FDC availability is risky. Replay rejection proves nullifier consumption, not destruction of every copy. |
| New work completed during the program | 10% | 8 | The redemption-bound capsule routine, verifier, bond state machine, and receipt UI are a distinct new slice if commit history and pre-existing components are disclosed. |
| Distribution, traction, and continuation potential | 10% | 5 | FAsset redemption services and privacy-sensitive holders are plausible channels, but demand for bonded capsule-consumption attestations is unproven and the actor willing to post the bond is unclear. |

**Weighted total: 6.7/10 (67/100).**

### Prior-art collision analysis

Plain-language substitution: “A privacy bond stays locked after payment until a confidential machine reports that it consumed a one-use secret.” Secure erasure, certified deletion, one-use capabilities, and bonded claims are established families. The concept survives only on the composition and timing of the public liability: a completed cross-chain exit leaves the application's bond locked until an attested capsule-consumption claim is accepted. It is not the first deletion proof and does not prove that no copy exists elsewhere.

### Exact-interface status

**PASS WITH CORRECTION.** The exact path is public Coston2 `IAssetManager.redeem`, followed by the project's own verifier/bond `release` after a typed FCC signature. The controlled states are the FAssets redemption request and application bond. The project cannot delay, close, or redefine FAssets protocol redemption finality. Judge receipts should include redemption events, external payout/FDC evidence, `ErasureAccepted`, and `BondReleased`.

### Removal tests

- Remove Interoperable Assets: there is no cross-chain redemption and payout event defining when the private capsule has completed its purpose or when the application liability should become releasable.
- Remove Confidential Compute: there is no verifiable execution boundary for capsule consumption, so the application bond cannot release under the product's privacy rule.

Both tests pass after replacing “redemption finality” with “application-bond release.”

### Joined-proof assessment

**PASS, with high operational risk.** Required path: call live `IAssetManager.redeem` using addresses resolved through Contract Registry → show redemption request and XRPL payout/FDC evidence → identified FCC/FCE worker consumes the one-use capsule and signs a typed claim with explicit simulated/registered/attested status → project verifier checks payout binding, machine epoch, and nullifier → application bond releases → replay is rejected. The UI must show that XRP redemption completed before the separate application liability closed.

### Failed-claim list

- “A redemption cannot finalize until” is false; only the project's privacy workflow or bond remains open.
- “Makes bond release and redemption finality conditional on deletion” is false; FAssets redemption finality is unchanged.
- “Destroys the capsule” and “proof that instructions were erased” are too strong; use “attested capsule consumption” or “typed erasure claim within the identified machine boundary.”
- Replay rejection proves one-use nullifier enforcement, not physical deletion or absence of external copies.
- The bond is an application bond, not a protocol bond or FAssets agent bond unless the actual depositor and contract path establish that role.
- A simulated FCC/FCE result is not production attestation and must be labeled on screen.

**Final rank: 2 of 2. Credible only with corrected claims and a real redemption proof.**

## Final ordering

1. **Exit Relay — 70/100.** Stronger user-visible closed loop and lower integration risk, despite only project-level routing control.
2. **Forget-to-Redeem — 67/100.** Deeper native FAssets call and excellent composition, but narrower demand, higher operational risk, and a fragile attestation boundary.
