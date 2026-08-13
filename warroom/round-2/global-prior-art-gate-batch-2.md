# Global Prior-Art and Plain-Language Gate — Blind Batch 2

Hard minimums are independent: mechanism novelty ≥7, protocol-composition novelty ≥7, demo surprise ≥7.

| Idea | Plain-language substitution | Closest prior art | Mechanism novelty | Composition novelty | Demo surprise | Result |
|---|---|---|---:|---:|---:|---|
| Sealed Delivery Switch | “A private adjudicator routes escrow after a delivery dispute.” | Delivery escrow, private claims adjudication | 4 | 7 | 7 | KILL |
| Cold-Chain Make-Good | “Private sensor rules pay a capped spoilage claim.” | Parametric insurance and make-good reserve | 3 | 8 | 7 | KILL |
| Forget-to-Redeem | “A privacy bond remains locked after asset redemption until the confidential machine consumes the one-use secret and emits an auditable erasure claim.” | Proof of secure erasure and privacy bonds exist separately; no reviewed product joins erasure evidence to cross-chain exit completion | 7 | 9 | 8 | PASS, with honest attestation boundary |
| One-Shot Treasury | “One private authorization permits one payment and can never be replayed.” | One-time capability, nonce/nullifier, temporary approvals | 3 | 8 | 6 | KILL |
| Exit Relay | “A provider proves all hidden requests were included; incomplete fulfillment deterministically shrinks its next asset capacity and reroutes the withheld tranche.” | Performance penalties and capacity allocation exist, but the inclusion-to-next-cap feedback state machine is not a simple score, slash, or alert | 7 | 9 | 8 | PASS |
| Redemption Ladder | “Private thresholds release the largest acceptable exit tranche.” | Laddered redemption, partial withdrawals, tranche selection | 5 | 8 | 7 | KILL |
| Proof Waterfall | “Late fulfillment dynamically reallocates a reserve across ranked claims.” | Claims waterfall, reserve priority, compensating payment | 5 | 8 | 8 | KILL |

## Mandatory global-prior-art caveats for survivors

### Forget-to-Redeem

- Proof of secure erasure and certified deletion are established research areas. The novelty claim is not “first deletion proof.”
- FCC attestation proves that approved code ran in an identified environment; it does not provide information-theoretic deletion or prove no copy exists elsewhere.
- The project must say **attested capsule consumption** or **erasure claim**, not cryptographic proof of global deletion.
- The project bond is an application overlay. It does not delay or redefine FAssets protocol redemption finality.

### Exit Relay

- Performance-based capacity and penalties are established outside crypto. The novelty claim is the causal product rule: privately prove request inclusion and execution, then directly alter the same provider's next interoperable-asset tranche.
- A generic reputation score, SLA dashboard, or slashing bond would fail the substitution test. The cap change and reroute must execute in the demo.
- The application controls its own routed FXRP pool; it does not alter FAssets agent protocol capacity.

Credible survivors: **2**. The mandatory repeat condition is satisfied without weakening gates.
