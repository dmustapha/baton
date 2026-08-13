# Independent Scorer 1

## 1. Forget-to-Redeem

### Hard dimensions

| Dimension | Score | Reason |
|---|---:|---|
| User-visible mechanism novelty | 7/10 | Secure erasure claims and privacy bonds already exist independently. The minimally novel user rule is narrower: a cross-chain exit leaves an application bond locked until the identified confidential machine attests consumption of the exact one-use capsule bound to that payout. This clears the floor only if presented as a lifecycle-specific liability, not as generic deletion proof. |
| Protocol-composition novelty | 9/10 | `IAssetManager.redeem` plus XRPL payout/FDC evidence plus an FCC/FCE typed result plus application-bond release is an unusually tight causal composition. The FCC result is downstream of the real payout and economically consequential. |
| Demo surprise | 8/10 | Watching XRP arrive while a bond remains visibly locked, then unlocking it only after capsule consumption, is counterintuitive and legible. Replay rejection adds a good failure beat. Surprise collapses if the demo implies FAssets redemption itself is pending. |
| Interoperable Asset depth | 7/10 | A live FXRP redemption and FDC-confirmed XRP payout are substantive. However, the controllable consequence is only the project's bond; the application cannot delay, close, or redefine FAssets protocol finality. Depth is therefore adequate, not exceptional. |
| Confidential Compute depth | 7/10 | Private route, identity, fallback, and recovery material are genuinely sensitive; machine identity, code hash, typed signature, epoch, and nullifier form a credible verification boundary. The score is capped because FCC is operationally immature and the result proves execution of a measured consumption routine, not absence of copies elsewhere. |
| One-builder feasibility | 6/10 | One bond/verifier contract, a documented redemption call, typed signature verification, and two scripted paths are bounded. Live redemption/FDC timing plus FCC/indexer uncertainty creates real deadline risk, so the honest fallback must preserve a live asset path and label simulated attestation. |

Hard-floor result: **CREDIBLE, WITH MANDATORY CLAIM CORRECTIONS.** All floors pass, but user-visible novelty, both track depths, and feasibility are at or near the minimum.

### Weighted hackathon dimensions

| Dimension | Weight | Score | Reason |
|---|---:|---:|---|
| Product usefulness and target-user clarity | 30% | 6/10 | The target holder and stale private-route risk are understandable, but a rational user cannot know that no copy exists outside the measured machine. The practical value is accountability and bonded service behavior, not assured privacy after settlement. |
| Quality and depth of Flare integration | 30% | 8/10 | Redemption, FDC payout binding, typed confidential result verification, and bond release form one joined lifecycle. It loses points because the final controllable state is an application overlay rather than FAssets finality. |
| Technical execution and demo quality | 20% | 7/10 | The open-bond/consume/release/replay sequence is strong and receipt-heavy. FCC availability, indexer setup, FDC latency, and the temptation to overclaim deletion are execution hazards. |
| New work completed during the program | 10% | 8/10 | The payout-bound erasure-liability state machine, typed result, verifier, and demo receipts represent coherent new work rather than a generic integration. |
| Distribution, traction, and continuation potential | 10% | 5/10 | It could serve redemption services and privacy-sensitive wallets, but adoption requires a service to post bonds and keep sensitive routing inside the measured boundary. The immediate distribution wedge is narrower than ordinary redemption tooling. |

Weighted total: **68/100** (`6×30% + 8×30% + 7×20% + 8×10% + 5×10% = 6.8/10`).

### Prior-art collision analysis

Plain-language substitution: **A service bond stays locked after cross-system settlement until an identified secure machine attests that it consumed the one-use secret tied to that settlement.**

Certified deletion, secure-erasure research, one-use secrets, nullifiers, and bonded service behavior are prior art. The survivor is not “proof of deletion.” Its defensible difference is the precise state transition: successful external payout creates a remaining application liability, and a typed consumption claim for the payout-bound capsule releases that liability. If reduced to “delete data after payment,” it fails novelty.

### Exact-interface status

**PASS WITH CORRECTION.** The supported callable path is `IAssetManager.redeem` on Coston2 plus a project contract's `release` after verification of the typed FCC/FCE signature. Judge receipts can include redemption events, FDC/XRPL payout evidence, `ErasureAccepted`, and `BondReleased`. The project controls only its bond and verifier. It cannot delay or redefine protocol redemption finality.

### Removal tests

- Remove Interoperable Asset primitive: there is no real cross-chain payout event defining which capsule became residual risk or when the application liability may release. A generic erasure-bond service remains, but this product outcome fails.
- Remove Confidential Compute primitive: there is no machine-bound, signed capsule-consumption boundary. A timer or operator assertion could release the bond, but the core verifiable privacy-accountability guarantee fails.

Both removal tests pass, provided bond release is strictly keyed to both the FDC-bound payout hash and the accepted typed machine result.

### Joined-proof assessment

**Pass, with staging risk.** Required chain: FXRP redemption call → XRP payout and FDC evidence → identified FCC/FCE machine consumes the exact committed capsule → application verifier accepts typed result → application bond releases → explorer/event bundle shows redemption, payout, machine status, result, release, and replay rejection. The demo must keep the bond visibly open after payout and must distinguish live, registered, attested, and simulated states.

### Failed-claim list

- “The redemption cannot finalize until erasure” fails. FAssets protocol finality is not controlled by the application.
- “The contract closes the redemption request” fails if it refers to protocol state; only an application record or liability may close.
- “Proof that sensitive instructions were erased” fails as a global claim. The valid claim is attested execution of capsule consumption inside the identified measured boundary.
- “The instructions cannot survive settlement” fails because copies may exist outside that boundary.
- “Agent bond” is unsupported unless the project itself funds and controls that bond; it must be called an application/service bond.
- Any unlabeled simulated FCC attestation, fixture payout, or mocked FDC result fails the evidence standard.

## 2. Exit Relay

### Hard dimensions

| Dimension | Score | Reason |
|---|---:|---|
| User-visible mechanism novelty | 7/10 | Performance-based capacity, penalties, inclusion proofs, and rerouting are known separately. The minimally novel mechanic is the direct feedback rule: privately proven batch inclusion and fulfillment deterministically changes the same provider's next routed asset tranche and immediately reroutes the withheld portion. A scorecard or generic SLA version fails. |
| Protocol-composition novelty | 9/10 | Private request inclusion, fulfillment receipts, a typed next-cap result, project-router state, and actual FXRP rerouting form a strong closed loop. Each primitive drives the next rather than sitting beside it. |
| Demo surprise | 8/10 | One partial service event visibly shrinking the next tranche and moving withheld FXRP to fallback is clear, dynamic, and stronger than a penalty number. Omission refusal provides a useful negative path. |
| Interoperable Asset depth | 7/10 | The exact supported path is a project-controlled router transferring live FXRP and updating its own cap. That is a real asset consequence, but it is not a native FAssets agent-capacity mutation and need not invoke an actual redemption. The score clears the floor only because the cap directly controls the next live FXRP tranche. |
| Confidential Compute depth | 8/10 | Full request amounts, holders, order, promised windows, and batch membership remain private; the machine emits a constrained root/nullifier/fulfillment/cap result that the contract verifies. Inclusion is causally necessary to prevent selective omission. Operational FCC status must still be labeled honestly. |
| One-builder feasibility | 7/10 | A single tranche router, deterministic FCC/FCE worker, three-request fixture, typed-signature verifier, and live FXRP transfers are feasible. Avoiding real induced redemption faults reduces scope; exact fulfillment references can be reproducible fixtures if clearly labeled. |

Hard-floor result: **CREDIBLE, WITH A STRICT APPLICATION-ROUTER BOUNDARY.** All floors pass. Novelty and Interoperable Asset depth are exactly at the minimum.

### Weighted hackathon dimensions

| Dimension | Weight | Score | Reason |
|---|---:|---:|---|
| Product usefulness and target-user clarity | 30% | 7/10 | Holders and routing services benefit from omission-resistant service allocation. The immediate user value is real protection of the next tranche, though the project must explain who funds and operates the fallback route. |
| Quality and depth of Flare integration | 30% | 8/10 | Live FXRP movement, contract-enforced cap transitions, typed FCC/FCE verification, and fulfillment-linked receipts are naturally joined. It is not a protocol-level FAssets agent control, preventing a higher score. |
| Technical execution and demo quality | 20% | 8/10 | Three hidden requests, one partial fulfillment, a cap drop, immediate reroute, and omission/stale-batch refusal make a strong 90-second sequence with exact events. The state machine is compact enough to polish. |
| New work completed during the program | 10% | 8/10 | The inclusion-to-next-cap feedback contract, private batch worker, reroute rule, and proof UI constitute a coherent new product mechanism. |
| Distribution, traction, and continuation potential | 10% | 6/10 | FAsset services, routing front ends, and support operators are plausible adopters, but the product initially depends on a project-managed FXRP pool and provider participation rather than protocol-enforced agent allocation. |

Weighted total: **75/100** (`7×30% + 8×30% + 8×20% + 8×10% + 6×10% = 7.5/10`).

### Prior-art collision analysis

Plain-language substitution: **A provider proves all hidden service requests were included; incomplete fulfillment automatically reduces its next asset allocation and sends the withheld amount elsewhere.**

Performance penalties, capacity allocation, SLA enforcement, inclusion ledgers, and adaptive routing are established. The surviving novelty is the same-provider next-cycle feedback transition with immediate asset rerouting. If the output becomes a reputation score, dashboard, bond slash, alert, or manually chosen route, the user-visible novelty falls below 7.

### Exact-interface status

**PASS.** The exact callable route is live Coston2 FXRP `IERC20.transfer` from a project-controlled tranche router plus project `recordBatchResult`. Controlled state is the application's cap and escrow, with judge receipts from `Transfer`, `BatchScored`, `CapChanged`, and `Rerouted`. There is no supported call to alter native FAssets agent capacity.

### Removal tests

- Remove Interoperable Asset primitive: inclusion and fulfillment produce only analytics; no next live FXRP tranche is withheld or rerouted, so the protective economic feedback loop fails.
- Remove Confidential Compute primitive: requests, amounts, identities, and order must be disclosed, or the provider can omit inconvenient failures from the batch used to set its cap. The omission-resistant private-service guarantee fails.

Both removal tests pass if the router accepts no cap update except the verified typed FCC/FCE result and executes the withheld-tranche reroute in the same visible lifecycle.

### Joined-proof assessment

**Pass.** Required chain: fund project router with FXRP → commit three hidden service requests → FCC/FCE proves batch inclusion and computes fulfillment result → verifier records next cap → router transfers the allowed next tranche and reroutes the withheld FXRP → events show machine status, root/nullifiers, cap delta, two asset destinations, and omission/stale-batch refusal. Fixture fulfillment is acceptable only when labeled; the FXRP transfer and cap/reroute must be live.

### Failed-claim list

- “Changes FAssets agent capacity” fails. Only the project router's next allocation cap changes.
- “Real FXRP redemption/agent transition” fails unless an exact supported redemption call is actually integrated; the gated callable core is project-controlled FXRP routing.
- “Verified external fulfillment evidence” fails if receipts are fixtures or unverified inputs. Label them reproducible/simulated unless an exact FDC path is demonstrated.
- “Protects the current stranded redemption” overstates the mechanism. It protects the next project-routed tranche and reroutes withheld capacity; it does not repair protocol redemption state.
- A generic success score, reputation badge, slashing bond, or manual reroute fails the novelty claim.
- Any implication that FCC is production-attested when only a simulated typed signer is used fails the evidence standard.

## Final rank

1. **Exit Relay — 75/100, credible with application-router boundary.** Stronger user-visible loop, cleaner one-session demo, and better execution feasibility. Its survival depends on live cap change plus immediate FXRP reroute.
2. **Forget-to-Redeem — 68/100, credible with mandatory claim corrections.** More novel composition, but weaker practical assurance and higher operational/communication risk. It survives only as an application bond released by an attested capsule-consumption claim, never as proof of global deletion or a FAssets finality control.
