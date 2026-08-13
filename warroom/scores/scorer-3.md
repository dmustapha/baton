# Independent Scorecard — Scorer 3

## Evaluation Order

Independent virtual coin flip: **tails**. Tails was preassigned to **S3 → S4**, so the scoring order was:

1. S3 — SplitLock
2. S4 — Mandate Zero

No other scorecard was read.

## Calibration

Planning weights: Product Usefulness 25%, Flare Integration Quality 25%, Technical Execution 20%, Evidence of New Work 15%, Clarity and Future Potential 15%. Both hard-gate survivors preserve **Gate 4b: CLEAR**.

The active brief requires a live or reproducible end-to-end outcome, exact transaction evidence, a failure path, and a three-minute judge path. It also warns that FCC is not fully public production infrastructure and may require hosted or self-hosted indexer access. Those hazards reduce execution scores even when the architecture is elegant.

## S3 — SplitLock

**Gate 4b:** CLEAR  
**Weighted total:** **7.00 / 10**

### Weighted Criteria

| Criterion | Weight | Score | Evidence-based rationale |
|---|---:|---:|---|
| Product usefulness | 25% | 7 | A treasury operator with two concurrently valid policies faces a costly, concrete choice between unauthorized loss and an unpaid supplier, but this split-brain edge state is narrower than a routine wallet problem (`synthesis-pool.md`, S3 Center/Differentiation). |
| Flare integration quality | 25% | 9 | FCC must privately compute the common-safe policy intersection and PMW must turn that exact result into an XRPL payment, so both Flare primitives are causal rather than decorative (`gate-report.md`, S3 Interoperable primitive, Confidential primitive, and Removal tests; active brief §5). |
| Technical execution | 20% | 3 | The gate requires a real PMW submission produced from a real FCC/FCE result, while the brief states FCC is not fully public production infrastructure and may block on indexer access, making the end-to-end dependency chain high-risk under the remaining time (`gate-report.md`, S3 Required live receipt; active brief §8). |
| Evidence of new work | 15% | 8 | The synthesized artifact explicitly reduces prior treasury/continuity patterns to one new split-brain rule—compute the safe intersection of two committed private policy versions or abstain—and Gate 4b remains CLEAR (`synthesis-pool.md`, S3 Differentiation/Catalog; `primitives-sheet.md`, Gate-Only Prior Project Appendix). |
| Clarity and future potential | 15% | 8 | The 700-approved, 701-rejected external payment is a crisp 90-second proof, and the same intersection rule could later govern signer rotations and conflicting treasury epochs without exposing policies (`gate-report.md`, S3 Joined proof and Demo/build). |

Weighted calculation: `(7×0.25) + (9×0.25) + (3×0.20) + (8×0.15) + (8×0.15) = 7.00`.

### Shadow Scores

- **Catalog Novelty: 8/10** — multi-party high-stakes resolution plus a local safety boundary creates a new external-asset execution rule rather than repeating a generic private treasury (`synthesis-pool.md`, S3 Catalog; `primitives-sheet.md`, Multi-party consensus and Local safety boundary).
- **Generative Competitor Leverage: 8/10** — it converts the identified policy-drift/signer-continuity edge into a single causal asset outcome while avoiding payroll and generalized treasury scope; the differentiation is structural, not cosmetic (`synthesis-pool.md`, S3 Differentiation).

### Track Depth and Joined Coherence

#### Interoperable Asset Depth — 9/10

- **Primitive:** Protocol Managed Wallet performs one actual, amount-bounded XRP supplier payment on XRPL (`gate-report.md`, S3 Interoperable primitive).
- **Necessity:** The product promises settlement of the common-safe obligation; without PMW there is only a confidential policy opinion, not an interoperable asset product.
- **Removal-test result:** **Pass** — removing PMW destroys the external payment outcome (`gate-report.md`, S3 Removal tests).
- **Proof evidence:** Payment intent → verified intersection result → PMW transaction → XRPL receipt → 701 and replay rejection (`gate-report.md`, S3 Joined proof).
- **Operational risk:** **Very high** — the required receipt is a real PMW submission, and local emulation explicitly fails the gate; PMW is also a roadmap technology coupled to immature FCC access (`gate-report.md`, S3 Required live receipt; active brief §§5, 8).

#### Confidential Compute Depth — 8/10

- **Primitive:** FCC/FCE privately consumes two committed policy versions and computes either their common-safe payment envelope or abstention (`synthesis-pool.md`, S3 Center).
- **Necessity:** Revealing the policies defeats the product boundary, while omitting the confidential computation leaves PMW unable to derive a safe amount from conflicting rules.
- **Removal-test result:** **Pass** — without FCC, no safe amount can be produced without policy disclosure (`gate-report.md`, S3 Removal tests).
- **Proof evidence:** The confidential machine signs intersection/abstention; the verifier binds both policy commitments, intent, cap, and replay protection before PMW execution (`gate-report.md`, S3 Joined proof).
- **Operational risk:** **Very high** — a locally signed backend result fails, and official FCC operation may be blocked by indexer credentials, concurrency, or immature public availability (`gate-report.md`, S3 Required live receipt; active brief §8).

#### Joined Product Coherence — 9/10

- **Primitive relationship:** FCC derives the only safe external-payment envelope; PMW can execute only that envelope.
- **Necessity:** Neither a PMW transaction without conflict resolution nor a private intersection without settlement fulfills the supplier-payment job.
- **Removal-test result:** **Pass on both sides** — each removal destroys the same necessary outcome, rather than hiding a feature tab.
- **Proof evidence:** One causal path runs from payment intent through private policy conflict and verified intersection to a real XRP payment plus over-cap/replay refusal (`gate-report.md`, S3 Joined proof).
- **Operational risk:** **Very high** — coherence is excellent on paper but creates a serial dependency on two immature live services, so one unavailable leg invalidates the submission-grade proof.

## S4 — Mandate Zero

**Gate 4b:** CLEAR  
**Weighted total:** **8.10 / 10**

### Weighted Criteria

| Criterion | Weight | Score | Evidence-based rationale |
|---|---:|---:|---|
| Product usefulness | 25% | 8 | A wallet owner gets a concrete safety guarantee: stale delegated authority becomes exactly zero after one cycle and cannot move FXRP until current private obligations produce a new cap (`synthesis-pool.md`, S4 Center/Differentiation; `gate-report.md`, S4 Joined proof). |
| Flare integration quality | 25% | 8 | Smart Account enforcement controls the real FXRP action and FCC is the only mechanism allowed to recreate authority from hidden constraints, satisfying independent removal tests for both required tracks (`gate-report.md`, S4 primitives and Removal tests; active brief §§2, 5, 11 Warroom). |
| Technical execution | 20% | 7 | One policy module, verifier, transfer adapter, and deterministic worker are the strongest remaining-time slice, but the required real FCC/FCE result and actual Coston2 Smart Account enforcement still expose the build to FCC/indexer immaturity (`gate-report.md`, S4 Demo/build and Required live receipt; active brief §8). |
| Evidence of new work | 15% | 9 | Forced memory scarcity is materially transformed into forced financial re-authorization: authority is designed to forget itself and can be recreated only as a fresh bounded asset mandate, with Gate 4b CLEAR (`synthesis-pool.md`, S4 Catalog; `primitives-sheet.md`, Forced memory scarcity and Gate rule). |
| Clarity and future potential | 15% | 9 | “Allowance is zero → stale action fails → private cap is signed → exact FXRP action succeeds → replay fails” is an unusually legible demo and a reusable safety primitive for savings, payments, and delegated asset actions (`gate-report.md`, S4 Joined proof and Demo/build). |

Weighted calculation: `(8×0.25) + (8×0.25) + (7×0.20) + (9×0.15) + (9×0.15) = 8.10`.

### Shadow Scores

- **Catalog Novelty: 9/10** — the artifact does not copy periodic game memory loss at the surface; it turns forgetting into an enforceable zero-authority financial state with confidential regeneration (`synthesis-pool.md`, S4 Catalog; `primitives-sheet.md`, Forced memory scarcity).
- **Generative Competitor Leverage: 7/10** — it exploits the underserved stale-policy/forced-reauthorization edge well, though the surrounding Smart Account savings surface must remain ruthlessly excluded to avoid collapsing into generic wallet automation (`synthesis-pool.md`, S4 Differentiation).

### Track Depth and Joined Coherence

#### Interoperable Asset Depth — 8/10

- **Primitive:** Flare Smart Account authorization gates one real bounded FXRP action and deterministically decays its executable allowance to zero (`gate-report.md`, S4 Interoperable primitive).
- **Necessity:** The product's safety claim is enforceable only if the account itself refuses stale, over-cap, and replayed transfers.
- **Removal-test result:** **Pass** — without Smart Account enforcement, the signed cap cannot control value (`gate-report.md`, S4 Removal tests).
- **Proof evidence:** Expired mandate rejects transfer → exact newly capped FXRP action executes → replay and over-cap attempts fail (`gate-report.md`, S4 Joined proof).
- **Operational risk:** **Medium-high** — the slice is small, but the gate requires actual Smart Account enforcement on Coston2; a UI allowance or ordinary local contract simulation is insufficient (`gate-report.md`, S4 Required live receipt; active brief §10).

#### Confidential Compute Depth — 8/10

- **Primitive:** FCC/FCE privately evaluates current reserve, obligations, exposure, prior-cycle receipt, and authorized destination class to sign the only next-cycle cap (`synthesis-pool.md`, S4 Center; `gate-report.md`, S4 Confidential primitive).
- **Necessity:** Once authority reaches zero, hidden user constraints must causally determine whether and how much authority returns; a public or backend-only policy breaks the confidential-compute product.
- **Removal-test result:** **Pass** — without FCC, zero authority cannot be safely recreated (`gate-report.md`, S4 Removal tests).
- **Proof evidence:** A real FCC/FCE result is verified before the Smart Account accepts the exact cap, followed by over-cap and replay refusal receipts (`gate-report.md`, S4 Joined proof and Required live receipt).
- **Operational risk:** **High** — FCC remains immature and can require indexer access, so the real signed-result path must be proven early rather than replaced with a local signer (`active brief §8; gate-report.md`, S4 Required live receipt).

#### Joined Product Coherence — 10/10

- **Primitive relationship:** Smart Account authority is intentionally zero until FCC recreates one narrow executable capability from private current-state constraints.
- **Necessity:** The interoperable state creates the need for confidential computation, and that computation exists solely to control the next asset transition; neither track is separable.
- **Removal-test result:** **Pass on both sides** — removing Smart Account enforcement makes the cap advisory, while removing FCC leaves authority safely and permanently at zero (`gate-report.md`, S4 Removal tests).
- **Proof evidence:** The entire judge path is one state machine: zero allowance, rejected stale action, verified confidential cap, exact FXRP execution, spent mandate, replay/over-cap rejection (`gate-report.md`, S4 Joined proof).
- **Operational risk:** **High but bounded** — FCC access is the principal risk, while the rest of the proof is concentrated in one policy module and one asset action rather than a multi-service cross-chain sequence (`gate-report.md`, S4 Demo/build; active brief §8).

## Final Ranking

### Rank 1 — S4 Mandate Zero — 8.10/10

**Strongest reason:** It turns the two tracks into one irreducible and judge-legible state machine while retaining the strongest credible path to the mandatory live receipt within the remaining time.

### Rank 2 — S3 SplitLock — 7.00/10

**Strongest reason:** Its PMW/FCC proof is architecturally excellent, but the serial requirement for a real FCC result and real PMW external submission creates a submission-killing operational dependency that the current gate explicitly labels high risk.
