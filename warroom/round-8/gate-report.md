# Round 8 — Gate Report (full-strength, post-freeze)

Kill-list/saturation/prior-art revealed only after pool hash `bd3cac95…`. No concept edited/revived/repaired.

## Carry-forward binding test (R7 lesson)
FCC is load-bearing ONLY when a second party who controls value must be convinced of a result WITHOUT seeing the private inputs. All 10 concepts were generated to satisfy this + were capability-grounded against dev.flare.network. The gate now applies event-collision, saturation, buildability, and FCC-necessity at full strength.

## CLEAR KILLS (4)

| # | Concept | Cause of death |
|---|---|---|
| D1 | STENCIL (sanctions/PEP screening) | **Saturated — explicit.** Kill List: "Compliance screening: AegisFlow and Veilfactor occupy confidential screening"; "confidential AML screening" listed saturated. Direct event-collision with AegisFlow. |
| A2 | PROOF-OF-RESERVE-DELTA (confidential solvency/PoR) | **Event-collision.** Vouchsafe = "private stake-backed solvency claims with public verification" (near-identical); fassets-verify = proof-of-solvency; Veil = TEE credit. Confidential solvency/reserves is occupied. |
| C1 | SEALEDREF (confidential hiring references) | **Contrived crypto tie + FCC-necessity soft + build risk.** Employers don't escrow signing bonuses on-chain (performed-outcome is artificial); a neutral third party could aggregate references without a TEE; subjective NLP scoring over multi-human free-text is a heavy 26h solo build. |
| E1 | PROOFDOCK (charter-party demurrage) | **Reachability / "why Flare".** Shipping demurrage desks are far outside the Flare/XRPFi user base; no reachable first user in-ecosystem. Genuine FCC-necessity but judges will ask why this is on Flare. (E2 kept as the stronger real-world-privacy representative.) |

## BORDERLINE — advanced to tool-grounded adversarial verification (5)

| # | Concept | Why it passed first-pass | Concern to verify (tool-grounded) |
|---|---|---|---|
| B1 | CONFORMANCE (secret cert-suite → whitelist) | Sits in the intel's #1 unowned whitespace (FCC lifecycle ops); crypto-native user (integrators); performs a real whitelist flip; buildable. | Is it actually unowned (search)? Is "confidential test suite" a compelling enough secret with a real paying integrator? Anti-pattern (infra-not-experience)? |
| B2 | SLA-PROOF (private probe audit → escrow) | Intel whitespace #4 (integration-test infra); Web2Json+FCC depth; maps to verbatim documented pain; performs escrow release. | Is the SLA-audit market real/reachable? FDC round latency in a 90s demo? Prior art? |
| A1 | SLATE (cap-table covenant → unlock gate) | Crypto-native (token unlocks/vesting); FCC genuinely load-bearing (cap table private); performs unlock; light build. | Collision with confidential-compliance competitors? Is on-chain unlock-gating a real demanded workflow or contrived? |
| C2 | CLOSEDFIX (confidential bug-bounty triage) | Strongest two-party deadlock + demo; genuine private input (PoC). | **Buildability (top risk): running a fork/exploit inside a Confidential Space container solo in 26h.** Prior art (TEE/ZK confidential bounty is a known trope)? Confidentiality unfalsifiable on sim-TEE? |
| E2 | SPLITFAIR (confidential royalty audit) | Strong adversarial two-party; genuine dual-private inputs; FCC non-removable. | Reachability/"why Flare" (music royalties vs XRPFi user base); is FCC-necessity real vs a trusted auditor? |

Verifier instruction: **default KILL if uncertain**; MANDATORY tool use — search for competitors/prior art AND verify 26h-solo FCC build feasibility; cite. Tests: (a) genuinely uncrowded/unowned; (b) FCC non-removable with a real value-controlling verifier who demands the proof; (c) real reachable demand; (d) solo-buildable self-contained demo on Coston2 sim-TEE; (e) performed outcome, not a dashboard.

---

## Adversarial verification of the 5 borderline concepts (tool-grounded, cited)

Each verifier ran independently, REFUTE-mode, default-KILL, MANDATORY tool use. 43 total tool calls.

| # | Concept | Verdict | Tools | Decisive grounded evidence |
|---|---|---|:---:|---|
| B1 | CONFORMANCE | **KILL** | 10 | Self-gating (suite-owner=whitelist-gater=value-controller); SLSA VSA standardized primitive; boolean-flip anti-pattern; sim-TEE can't show confidentiality |
| B2 | SLA-PROOF | **KILL** | 8 | Chainlink `uptime_sla` escrow (2023) + arXiv 2510.13370 TEE-SLA (2025) = exact prior art; FDC ~180s round breaks 90s demo; confidentiality anti-productive to real SLAs |
| A1 | SLATE | **KILL** | 9 | Self-gating (TEE attests computation not input-truth; issuer can doctor cap table); saturated confidential-compliance/accredited-gating; market trending to PUBLIC unlock transparency (Streamflow/Sablier) |
| C2 | CLOSEDFIX | **KILL** | 8 | zkPoEX (ETHDenver 2023 winner) near-exact prior art; TEE not load-bearing (commit-reveal+escrow); anvil-in-enclave → toy in 26h; sim-TEE trust claim unfalsifiable |
| E2 | SPLITFAIR | **KILL** | 9 | Data-owner (publisher) profits from opacity, won't participate; no reachable Flare user; TEE decorative; shallow Flare-depth |

## Final tally: 0 / 10 survivors.

## The four structural walls (cited)
1. **Self-gating / attested-inputs:** a TEE attests a computation ran over the *submitted* inputs, NOT that the inputs are *truthful*. When the data-submitter is the beneficiary, the proof is worthless (A1, and the B1 variant).
2. **The FDC-public / FCC-unverified tension (deepest):** the only *trustless-external* data on Flare (FDC) is **public in its Merkle proof**; the only *private* data (into FCC) is **self-reported** (attestable computation, not attestable truth). You cannot get data that is BOTH trustlessly-truthful AND private on this stack — so every confidential app has either public inputs or unverifiable private inputs.
3. **Prior-art wall:** the genuinely load-bearing confidential patterns are already shipped/won — SLSA VSA (B1), Chainlink SLA + 2025 paper (B2), zkPoEX (C2), confidential screening/AegisFlow (D1), proof-of-solvency/Vouchsafe (A2).
4. **Sim-TEE wall:** Coston2 = simulated TEE (MODE=0, software vTPM, no hardware root of trust) → the core trust claim ("verifier trusts because a real enclave hid the data") is exactly what a Coston2 demo cannot show.

Escape hatch (breaks wall 1+2): an enclave that **pulls private authoritative data directly via held credentials** (data-owner can't lie) → but the obvious instances (proof-of-reserves, sanctions screening) are the saturated/occupied ones.
