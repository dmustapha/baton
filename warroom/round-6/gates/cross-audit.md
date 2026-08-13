# Round 6 Gate Cross-Audit

Date: 2026-08-13  
Scope: the frozen Round 6 pool and the final dispositions in `gate-a-b.md`, `gate-c-d.md`, and `gate-e.md`. This audit checks coverage and consistency only. It does not rescore, redesign, or repair any killed idea.

## Verdict

**PASS — all 20 frozen ideas were evaluated, all 20 have at least one independent hard kill, and no missed hard-gate error can turn a killed idea into a survivor.**

| Gate batch | Ideas audited | Survivors | Cross-audit result |
|---|---:|---:|---|
| Generators A–B | 8 | 0 | PASS |
| Generators C–D | 8 | 0 | PASS |
| Generator E | 4 | 0 | PASS |
| **Round 6 total** | **20** | **0** | **PASS: do not score** |

## Consistency findings

The three reports apply the same non-compensating rules:

- A real participant or native call does not prove demand for the added product layer.
- An unnamed vault, market, router, ABI, network, or signer is a missing integration, not a detail to fill after freeze.
- A project contract can control its own accounting but cannot create protocol authority, exclusive proof ownership, a native consumer, or an external application state.
- Native liquidation, challenge, redemption, recovery, and Smart Account execution remain the authoritative transitions; wrappers must add a necessary outcome that native behavior does not already provide.
- Familiar take-profit, stop-loss, threshold harvesting, reserve buckets, capital rental, reinvestment curves, keeper bounties, postcondition guards, and reward splits do not become novel by naming FXRP or FAssets.
- Passing the Interoperable Asset removal test establishes track relevance only. It cannot compensate for failed market, operability, substitute, prior-art, novelty, demo, or buildability gates.
- A fixture-dependent visualization cannot rescue an uncontrollable liquidation, challenge, multi-epoch vault, or FDC timing path.

## Cross-batch convergence

| Failure class | A–B examples | C–D examples | E examples | Binding result |
|---|---|---|---|---|
| Unfrozen or incorrect application interfaces | GainLock, FXRP Thermostat, Redemption Battery | Exit-Price Range, Debt Staircase, Harvest-to-Home, FXRP Snowball | PoolProof Kicker | Exact end-to-end operability fails. Adding an app or correcting an ABI after freeze creates a new concept. |
| Familiar automation around native flows | Earn-or-Exit Covenant, SalvageSlope | One-Exit Reserve, Yield Layaway | Provenance Floor | Native calls remain unchanged; the added policy is established prior art and not a new asset outcome. |
| Incomplete or false asset economics | StrikeSlices, PremiumBurnback, ProofDividend | Pool-to-Premium Cycle | PoolProof Kicker, Clearance Dividend | Returned assets, valuation, reimbursement, or executor incentives do not close as claimed. |
| Native bypass or substitute | Redemption Battery, SalvageSlope | Pool-to-Premium Cycle, Just-in-Time FXRP Line | TwinProof Relay | The protocol already supplies the core action, or public native execution bypasses the project bargain. |
| Unproved buyer or switching demand | All A–B project layers | All C–D project layers | All E project layers | Category activity proves participants, not adoption of the proposed wrapper, rule, or marketplace. |
| Non-deterministic judge path | StrikeSlices, ProofDividend | Pool-to-Premium Cycle | Clearance Dividend, TwinProof Relay | The hero state depends on an uncontrollable liquidation, challenge, proof pair, epoch, or external actor. |

## Missed-kill and missed-survivor audit

- **Coverage:** the frozen hashes identify five generator files with four ideas each; the three gate reports dispose of A1–A4, B1–B4, C1–C4, D1–D4, and E1–E4 exactly once.
- **Market reality:** no invented buyer, repeated workflow, proof-holder market, executor market, or switching case is preserved as a survivor.
- **Authority and interfaces:** no concept advances with a missing vault, lending market, AMM route, signer, native consumer, proof exclusivity rule, or supported ABI.
- **Native substitutes:** no wrapper around partial redemption, liquidation, challenge rewards, Smart Account recovery, fee replacement, or public execution is treated as a new protocol outcome.
- **Prior art and collision:** no familiar harvesting, range policy, threshold, reserve, relayer auction, capital lease, keeper bounty, guard, or reward waterfall survives by composition alone.
- **Independent novelty floors:** every concept fails mechanism novelty, composition novelty, demo surprise, or more than one of them; no strong track fit offsets those failures.
- **Buildability:** no post-freeze application substitution, added swap leg, fabricated yield, controllable liquidation, or staged challenge is admitted as honest proof.
- **Nearest cases:** StrikeSlices and the exact native liquidation/challenge paths remain callable fragments, but their product-added economics are incomplete or familiar and their live judge moments are uncontrollable. They are not missed survivors.

## Final disposition

**0 PASS / 20 KILL.** Round 6 has no scoring pool and no finalist. No conclusion requires reversal, and no killed idea may be promoted without becoming a newly frozen concept and passing the full gate stack again.
