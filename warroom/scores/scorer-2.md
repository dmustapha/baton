# Independent Scorecard — Scorer 2

Scoring order preserved: **SplitLock first, then Mandate Zero**. Scores use the planning weights in `scorer-instructions.md`; no other scorecard was read.

## 1. SplitLock (S3)

**Gate 4b:** CLEAR — preserved from `synthesis-pool.md` S3 and `gate-report.md`; no catalog or prior-project kill applies at this gate.

### Weighted criteria

1. **Product usefulness — 7/10.** A treasury operator facing two concurrently valid confidential policy versions has a costly, concrete failure—either freeze an urgent obligation or risk an unauthorized payment—but the split-brain case is narrower and less frequent than routine stale authorization (`synthesis-pool.md`, S3 Center/Differentiation).
2. **Flare integration quality — 7/10.** FCC policy intersection causally creates the only PMW-acceptable external XRP payment, an unusually natural two-track composition, but `gate-report.md` requires a still-unproven real FCC/FCE-to-PMW receipt and explicitly rejects local emulation.
3. **Technical execution — 4/10.** The minimum honest demo depends on live FCC/FCE, PMW external signing, XRPL submission, and receipt reconciliation while the active brief §8 says FCC is not fully public and may require hosted or self-hosted indexer access; this is a severe remaining-time risk.
4. **Evidence of new work — 8/10.** `synthesis-pool.md` S3 records a CLEAR adaptation in which multi-party high-stakes resolution and a local safety boundary become a new common-intersection external execution rule rather than generic treasury policy.
5. **Clarity and future potential — 8/10.** The `700 allowed / 701 rejected / no-overlap abstains` judge path makes the product legible, and the primitive could extend to policy migration and quorum rotation if the PMW/FCC lifecycle is proven (`gate-report.md`, S3 Joined proof/Demo).

**Weighted total:** `(7×0.25) + (7×0.25) + (4×0.20) + (8×0.15) + (8×0.15) = 6.70/10`.

### Track-depth and coherence scores

#### Interoperable Asset depth — 7/10

- **Primitive:** PMW performs one bounded external XRPL payment for the exact destination, amount, intent hash, nonce, and deadline authorized by the resolved policy intersection.
- **Necessity:** value must actually leave through a Flare-managed external wallet; an internal policy verdict is not the product outcome.
- **Removal-test result:** **PASS** — without PMW, the supplier is not paid and no external settlement receipt exists (`gate-report.md`, S3 Interoperable primitive/Removal tests).
- **Proof evidence:** intended chain is FCC result → verifier → PMW submission → XRPL transaction/recipient balance → 701 and replay rejection.
- **Operational risk:** **HIGH** — PMW access and exact instruction format are not yet evidenced, and emulation would invalidate this track.

#### Confidential Compute depth — 7/10

- **Primitive:** FCC/FCE privately evaluates both committed policy versions, internal quorum evidence, supplier terms, and limits, then signs the safe intersection or abstention.
- **Necessity:** the common safe amount cannot be derived publicly without exposing confidential policies, and PMW must refuse without that result.
- **Removal-test result:** **PASS** — removing FCC forces full policy disclosure or complete payment freeze (`gate-report.md`, S3 Confidential primitive/Removal tests).
- **Proof evidence:** two policy commitments, machine identity/status, signed intersection or reason-class abstention, and onchain verification bind the private decision to the external intent.
- **Operational risk:** **HIGH** — a local deterministic function with a signature is ordinary backend computation unless packaged and observed through the real FCC/FCE lifecycle; active brief §11 rejects simulated TEE claims.

#### Joined Product Coherence — 9/10

- **Primitive join:** a confidential policy conflict is not merely analyzed; its one safe intersection becomes the exact external asset authority PMW can exercise.
- **Necessity:** neither track produces a useful substitute alone—FCC without PMW cannot settle, PMW without FCC cannot safely authorize.
- **Removal-test result:** **PASS / PASS**, with no ornamental integration.
- **Proof evidence:** payment intent → conflicting private policies → signed intersection/abstention → verified PMW instruction → XRPL receipt → over-cap/replay refusal (`gate-report.md`, S3 Joined proof).
- **Operational risk:** the conceptual join is excellent, but failure of either live subsystem collapses the whole demo rather than degrading gracefully.

### Shadow scores

- **Catalog Novelty — 8/10.** The primitives sheet's multi-party consensus and local safety boundary are materially transformed into private policy-set intersection controlling one external transaction; `synthesis-pool.md` marks the result CLEAR.
- **Generative Competitor Leverage — 8/10.** The concept directly uses corpus-derived split-brain policy, stale signer, machine-state, abstention, and post-execution-reconciliation gaps rather than merely avoiding an occupied surface.

### Scorer 2 verdict

**Keep as Rank 2 only if an immediate live PMW-from-FCC receipt exists.** The idea has the best joined-product coherence, but elegance cannot offset the 4/10 execution score under the brief's explicit FCC/indexer hazards.

## 2. Mandate Zero (S4)

**Gate 4b:** CLEAR — preserved from `synthesis-pool.md` S4 and `gate-report.md`; forced memory scarcity is adapted into financial re-authorization rather than copied at the surface.

### Weighted criteria

1. **Product usefulness — 8/10.** A Smart Account owner who delegated recurring FXRP actions gets a clear safety outcome: stale authority becomes exactly zero until current private obligations generate a fresh cap (`synthesis-pool.md`, S4 Center/Differentiation).
2. **Flare integration quality — 8/10.** Smart Account enforcement and FCC confidential re-derivation are independently load-bearing, and the brief §5 identifies Smart Accounts as a major 2026 distribution priority and FCC/FCE as a high-differentiation surface; the remaining deduction is that the required live receipt is not yet present.
3. **Technical execution — 7/10.** One policy module, verifier, transfer adapter, and deterministic confidential worker are credible in the remaining window (`gate-report.md`, S4 Demo/build), though the worker still must traverse real FCC/FCE rather than use a local signer.
4. **Evidence of new work — 9/10.** `synthesis-pool.md` S4 explicitly records the CLEAR transformation of the primitives sheet's forced memory scarcity from a game mechanic into a one-cycle financial authority state machine whose defining behavior begins at zero.
5. **Clarity and future potential — 9/10.** `50 FXRP mandate → zero → stale action rejected → private constraints recreate 20 → exact action → replay rejected` is a complete first-session product demo and a reusable model for savings, treasury, and recovery mandates (`gate-report.md`, S4 Joined proof/Demo).

**Weighted total:** `(8×0.25) + (8×0.25) + (7×0.20) + (9×0.15) + (9×0.15) = 8.10/10`.

### Track-depth and coherence scores

#### Interoperable Asset depth — 8/10

- **Primitive:** a Flare Smart Account enforces a single-cycle FXRP authorization scoped by operation, asset, amount cap, destination class, nonce, and expiry, then deterministically returns authority to zero.
- **Necessity:** expiration and renewal directly control whether real FXRP can move; this is asset authority, not a displayed risk score.
- **Removal-test result:** **PASS** — without Smart Account enforcement, the signed cap cannot constrain any economic action (`gate-report.md`, S4 Interoperable primitive/Removal tests).
- **Proof evidence:** expired mandate rejects transfer, recreated mandate permits the exact amount, and spent/over-cap/replay attempts fail onchain.
- **Operational risk:** **MEDIUM** — the module/interface must be proven on Coston2 and resolved through supported Flare tooling, but it avoids PMW, XRPL broadcast, FDC latency, and multi-machine rotation.

#### Confidential Compute depth — 8/10

- **Primitive:** FCC/FCE privately evaluates reserve target, obligations, risk preference, prior-cycle receipt, and signer health, revealing only a bounded one-cycle mandate signed by the observed machine identity.
- **Necessity:** the Smart Account remains at zero without the confidential result; publishing the inputs would destroy the privacy guarantee that justifies re-derivation.
- **Removal-test result:** **PASS** — removing FCC prevents safe recreation of authority from hidden current constraints (`gate-report.md`, S4 Confidential primitive/Removal tests).
- **Proof evidence:** machine/status evidence, policy commitment/version, signed cycle/amount/target envelope, verifier acceptance, and rejection of stale or altered envelopes.
- **Operational risk:** **MEDIUM-HIGH** — active brief §8 says FCC is not fully public and indexer access may block operation; a local signed backend result is explicitly disallowed by the survivor gate.

#### Joined Product Coherence — 9/10

- **Primitive join:** Smart Account authority deliberately disappears; only a new FCC result can recreate the next narrow slice of executable FXRP authority.
- **Necessity:** the decay mechanic is meaningless without asset enforcement, and zero authority is unusable without confidential re-authorization.
- **Removal-test result:** **PASS / PASS**, with one state machine rather than two feature tabs.
- **Proof evidence:** old cycle → zero allowance → rejected action → private FCC computation → verified new allowance → exact FXRP action → zero/replay refusal (`gate-report.md`, S4 Joined proof).
- **Operational risk:** both tracks still require real receipts, but the join can be proved with one account, one asset action, and one confidential result.

### Shadow scores

- **Catalog Novelty — 9/10.** Forced memory scarcity is deeply adapted: instead of deleting game memory, the product erases financial authority and requires private regeneration, satisfying the primitives sheet's remix rather than port rule (`synthesis-pool.md`, S4 Catalog).
- **Generative Competitor Leverage — 8/10.** It combines corpus gaps around stale signer sets, policy drift, forced policy expiry, private policy causality, and replayable refusal into one compact outcome.

### Scorer 2 verdict

**Rank 1, subject to the same live-proof rule.** It preserves deep independent track necessity while reducing the operational surface to one Smart Account state machine and one FCC result.

## Final ranking

1. **Mandate Zero — 8.10/10.** Strongest reason: its zero-authority state machine proves both tracks with the fewest live dependencies and the clearest 90-second negative-path demo.
2. **SplitLock — 6.70/10.** Strongest reason for second place: its PMW/FCC union is conceptually exceptional, but the active brief's FCC hazards plus unproven PMW access make honest completion materially less likely.
