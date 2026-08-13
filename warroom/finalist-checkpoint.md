# Dami Finalist-Selection Checkpoint — Flare Summer Signal

Warroom stops here. No winner has been selected; no Winner Brief, Forge, or implementation work has started.

## 1. Mandate Zero — Recommended

**Problem/mechanism:** Stale delegated FXRP authority can remain valid after a user's private obligations change; Mandate Zero makes authority expire to zero and permits only a fresh FCC-derived one-cycle action through an XRPL-authorized Smart Account custom instruction.

- **Round-0 average:** 7.83/10, unanimous #1.
- **Fact-check-adjusted:** 7.50/10.
- **Catalog:** CLEAR.
- **Fact check:** no fatal failed claim after correcting the execution boundary; Smart Account authorization comes from XRPL, while a called MandateVault verifies and enforces the FCC result.
- **Demo hook:** `50 FXRP authority → ZERO → stale action rejected → FCC computes 20 FXRP cap → direct mint/custom instruction executes exact action → over-cap and replay rejected`.
- **Competitor-derived insight:** stale policy, signer drift, and private automation gaps are common; forced expiry and confidential reconstitution remain weakly served.
- **Interoperable depth:** FAssets direct mint plus Smart Account `0xFE` custom instruction and a real FXRP action. Removal destroys the XRP-to-FXRP economic outcome.
- **Confidential depth:** FCC/FCE computes and signs the only valid next-cycle cap from hidden constraints. Removal leaves MandateVault safely at zero.
- **Joined proof path:** private constraints → FCC result → XRPL signed payment/userOp commitment → FDC/direct mint → Personal Account calls MandateVault → exact FXRP action → zero/replay receipts.
- **Trust disclosure:** the documented Coston2 path uses a real chain with simulated TEE attestation unless a real Confidential Space deployment is completed.
- **Risk:** MEDIUM-HIGH, dominated by FCC indexer/registration access and the combined direct-mint custom-instruction path.

## 2. SplitLock — Bold Alternative

**Problem/mechanism:** Two concurrently valid confidential treasury policies can freeze an urgent external payment; FCC computes their common-safe intersection and PMW executes exactly that XRP amount or abstains.

- **Round-0 average:** 6.72/10, unanimous #2.
- **Fact-check-adjusted:** 5.95/10.
- **Catalog:** CLEAR.
- **Fact check:** two material failures—no public PMW builder interface or example was found, and accepted PMW deployment is on Songbird rather than the proposed Coston2 path.
- **Demo hook:** private policies allow 900 and 700 XRP → result `PAY 700` → PMW pays 700 → 701 rejected → no-overlap case abstains.
- **Competitor-derived insight:** policy drift, signer continuity, and valid-but-obsolete intent are unserved edge states; private safe intersection is a new outcome in reviewed evidence.
- **Interoperable depth:** Songbird PMW external XRPL payment. Removal leaves a non-economic policy verdict.
- **Confidential depth:** FCC private intersection or abstention. Removal requires disclosure or freezes payment.
- **Joined proof path:** intent → conflicting policy commitments → FCC intersection → PMW instruction → XRPL payment → over-cap/replay receipt.
- **Risk:** HIGH; current public evidence does not support an honest implementation plan before cutoff.

## Selection

Dami chooses the direction. Selecting Mandate Zero unlocks Winner Brief creation in a later continuation; selecting SplitLock accepts an immediate dependency-discovery gamble. Forge and implementation remain prohibited until after selection and an explicit next-step instruction.

