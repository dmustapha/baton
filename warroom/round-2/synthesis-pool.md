# Round 2 Synthesis Pool

Batch one produced no survivor. Batch two produced exactly two credible, non-mergeable mechanisms after exact-interface and global-prior-art gates.

## Finalist candidate 1: Forget-to-Redeem

Source: G1, unmerged.

Mechanism: A user posts an application privacy bond alongside an FXRP redemption workflow. After the XRP payout is FDC-confirmed, an FCC/FCE routine consumes the one-use private instruction capsule, returns a typed erasure claim, and only then can the application bond unlock.

Differentiation: Unlike expiring permission or ordinary data deletion, a completed cross-chain exit leaves a public economic liability until the private execution environment attests that the one-use capsule was consumed. The mechanism is not a claim of information-theoretic deletion and does not change FAssets redemption finality.

Track removal tests:

- Remove Interoperable Assets: no cross-chain redemption and payout exists to define when the capsule becomes dangerous or when the bond may release.
- Remove Confidential Compute: there is no verifiable private capsule-consumption boundary, so the bond cannot safely release.

Joined proof: FXRP redemption call → XRPL payout/FDC evidence → FCC consumes capsule and signs typed result → application verifier accepts result → bond release transaction and receipts.

## Finalist candidate 2: Exit Relay

Source: H1, unmerged.

Mechanism: A private inclusion ledger receives hidden redemption-service requests for one routed FXRP tranche. Fulfillment receipts determine a deterministic next-cap transition: complete service preserves capacity, partial service shrinks it, omission revokes it, and the withheld next tranche reroutes immediately.

Differentiation: This is not a dashboard, score, or generic performance bond. The confidential inclusion result directly controls the same provider's next interoperable-asset capacity and moves the withheld FXRP in the same visible lifecycle.

Track removal tests:

- Remove Interoperable Assets: no routed FXRP tranche or asset capacity exists to shrink and reroute.
- Remove Confidential Compute: hidden request inclusion and omission cannot be evaluated without leaking service demand, so the capacity transition loses its core guarantee.

Joined proof: fund FXRP tranche router → commit hidden requests → FCC emits inclusion/fulfillment result → verifier changes next cap → router transfers allowed tranche and reroutes withheld FXRP → events and explorer receipts.

## Pool health

- Mechanism families: erasure-gated liability; private-inclusion capacity feedback.
- Cross-pollination: machine erasure; live performance receipts.
- No family accounts for more than 50% of the pool.
- Neither candidate is Mandate Zero, SplitLock, or a renamed round-one mechanism.
