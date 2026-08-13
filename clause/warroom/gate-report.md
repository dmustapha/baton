# Hard Gate Report — Flare Summer Signal

All eight synthesized concepts were tested for relevance, one-builder buildability, sponsor fit, corpus-derived provenance, independent per-track necessity, prior-project repeat, catalog similarity, 90-second demo, ecosystem nativeness, and concrete live proof.

## Survivors

### S4 — Mandate Zero — PASS / CLEAR

- **Interoperable primitive:** Smart Account authority decays to zero and gates a real bounded FXRP action.
- **Confidential primitive:** FCC privately re-derives the only next-cycle cap from current hidden constraints.
- **Removal tests:** without Smart Account enforcement, the signed cap cannot control value; without FCC, zero authority cannot be safely recreated.
- **Joined proof:** expired mandate rejects transfer → FCC signs new cycle cap → Smart Account accepts exact FXRP action → replay/over-cap attempts fail.
- **Demo/build:** one policy module, verifier, transfer adapter, and deterministic worker; strongest 90-second and remaining-time fit.
- **Required live receipt:** real FCC/FCE result plus actual Smart Account enforcement on Coston2. A locally signed backend result fails.

### S3 — SplitLock — PASS / CLEAR / HIGH OPERATIONAL RISK

- **Interoperable primitive:** PMW performs one actual bounded XRPL payment.
- **Confidential primitive:** FCC computes the safe intersection of two committed policy versions.
- **Removal tests:** without PMW no external payment occurs; without FCC no safe amount can be derived without revealing policies.
- **Joined proof:** payment intent → private policy conflict → signed intersection/abstention → PMW transaction → XRPL receipt → 701/replay rejection.
- **Demo/build:** narrow logic and excellent 90-second proof, but PMW/FCC live access is a hard dependency.
- **Required live receipt:** a real PMW submission produced from a real FCC/FCE result. Local emulation fails.

## Killed After Synthesis

### S1 — Late Route — KILL

The app's authority over a real late/mistagged direct-mint asset state is undefined. A quarantine/reserve fixture would simulate the load-bearing interoperable recovery, so Gate 2, Gate 3c, and Gate 6 fail.

### S2 — Repair Receipt — KILL

`Retry`, `reroute`, and `return` are not one named protocol-valid transition the app is proven to control. The joined path ends at an undefined FAssets repair adapter; fixtures reduce the product to observability.

### S5 — Cipher Refund Relay — KILL

FDC + FCC + PMW + XRPL reconciliation is too broad for the remaining window, while the damaged-goods/merchant claim is a generic workflow. Mocking PMW removes the interoperable proof.

### S6 — Veiled Exit — KILL

FDC does not directly provide an aggregate exit-capacity fact as specified; deriving it plus batch commitments, allocation proofs, redemptions, and reconciliation exceeds scope. It also remains adjacent to dense private execution and exit surfaces.

### S7 — FixBond — KILL

The private worker would attest its own patch unless a real post-state independently proves repair; the actual repair adapter remains undefined. Secure patch replay and FAssets correction are infeasible in scope.

### S8 — Void Receipt — KILL

No concrete supported FDC event/cancellation attestation is named, and the core remains a generic private outcome market. A fixture event removes the claimed cross-system truth dependency.

## Gate Health

- Survivors: 2, below the preferred 3-7 range.
- The pool is thin because six candidates fail live protocol control or scope, not because generators lacked diversity.
- Gates were not relaxed: doing so would admit mock-dependent or undefined asset actions, directly violating the event's proof bar and user requirements.
- The two survivors are sufficiently distinct: forced authority expiry versus confidential split-brain resolution and PMW execution.

