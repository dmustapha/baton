# Round 7 — Gate Report (full-strength, post-freeze)

Kill-lists, saturation, prior-killed ideas, and prior-art were revealed only after the pool hash was recorded (`4afb4e68…`). No concept was edited, revived, or repaired.

## The decisive cross-cutting test

The wall that killed Rounds 3-6: **a confidential computation is only load-bearing if a SECOND party who controls value must be convinced of something about private data WITHOUT seeing it.** If one actor already holds the data privately AND gates their own action, FCC is decoration (the actor can just act off-chain) — this is kill trigger **K2 (removable FCC)**, and the "confidential guard on my own action" pattern also collapses to the already-killed **Mandate Zero** family (expiring/limited authorization: ERC-7674, ERC-8255, Safe spending limits, ERC-4337 session keys).

Applying this consistently:

## CLEAR KILLS (7)

| # | Concept | Cause of death |
|---|---|---|
| A1 | SOLVENT | **K2 + native-substitute + novelty-collapse.** Agent self-gates their own collateral action. No external party demands or acts on the private solvency proof (native FAssets sets collateral rules by protocol, not by private attestation; predators don't need your proof). Collapses to a private stop-loss / **Collateral Circuit Breaker** (already killed R5-6) with private thresholds. FCC removable. |
| E1 | SWAPBACK | **Duplicate of A1** (generator E explicitly collapsed WF-1+WF-2 to a single self-gating actor) + same K2/native/novelty kills. `[CATALOG-CONVERGENCE]` with A1. |
| A2 | MANDATE | **Revives Mandate Zero (Round-1 KILL) + K2.** Confidential rate-limit/allowlist/quorum guard on the fund's OWN redemption = expiring/limited authorization + spending limit. Self-imposed policy, no external verifier. Explicit instruction: do not revive Mandate Zero. |
| C1 | EXPIRING MANDATE | **Revives Mandate Zero + novelty-collapse.** "Authority decays, must be re-proven under forced expiry" = expiring approval / session-key re-auth (ERC-8255) reskinned as "forced memory scarcity." Self-gating; no external verifier. |
| B1 | SILENTAXE | **K2 (FCC decoration) + native-substitute.** A liquidator's watchlist/weights are ALREADY private off-chain; nobody demands a confidential attestation of the model. Just run the model privately and call permissionless `liquidate()`. FCC adds nothing load-bearing. Also adjacency to confidential order-routing (saturated). |
| B2 | GHOSTCHALLENGE | **K2 (FCC decoration).** Same as B1: challenger heuristics are already private off-chain; no party demands proof of "which ref I picked." FDC+FAssets is real but the *confidential* track is decoration — remove FCC and the challenger loses nothing (their targeting was already secret). Event-collision: fassets-verify, XRPShield, AegisFlow. |
| E2 | HALFLIFE | **Gimmick-stacking + `[CATALOG-OVERLAP]` + saturation.** Fractional ownership of private machinery = Slopstock catalog primitive (3+ shared primitives). Erasure-proof is decorative. "Confidential trading rule execution" ≈ private strategy/perps (saturated). Multi-mechanic breadth violates one-novel-mechanic pattern. |

## BORDERLINE — advanced to independent adversarial verification (3)

These are the ONLY concepts where FCC is genuinely non-removable because a **second party who controls value** must be convinced without seeing private data:

| # | Concept | Why it passed first-pass | Unresolved concern for verification |
|---|---|---|---|
| C2 | SEALED-BID SUPPLIER SETTLEMENT | Competing suppliers genuinely won't reveal terms to each other → confidential clearing is demanded by the parties. | **Saturation:** confidential OTC / dark-pool / private-matching is EXPLICITLY on the saturated list (Veil, SealedFi). Multi-supplier onboarding = mild marketplace cold-start. |
| D1 | DELTA (bilateral reconciliation) | Two businesses reconcile without exposing ledgers to each other → strongest FCC-necessity + both self-hold authority + real broad pain. | **Ecosystem-native (Gate 6):** inter-company reconciliation is a TradFi/SaaS problem — risk of "TradFi + privacy bolted on." Thin FAssets depth (FXRP used as settlement token, not lifecycle). Asset action ≈ escrow release (K3 risk). |
| D2 | TRIPWIRE (FDC payment → private verdict) | FDC attestation of a real XRPL payment is a genuinely load-bearing Flare-native external trigger; payer keeps terms secret while payee gets a verifiable verdict. | Confidential conditional-payout is escrow/payroll-adjacent (saturated). Payee-fairness-trust gap (can a payee trust a verdict over rules they can't see?). Asset action ≈ escrow release (K3 risk). |

Verification instruction to skeptics: **default to KILL if uncertain.** Test (a) is FCC truly non-removable with a real value-controlling verifier; (b) ecosystem-native vs TradFi-bolted-on; (c) saturation/named-competitor collision; (d) is the asset action more than a token transfer; (e) solo-buildable self-contained demo.

---

## Adversarial verification of the 3 borderline concepts (tool-grounded, cited)

Each verifier ran independently, instructed to REFUTE and default to KILL, with a HARD mandate to use WebSearch/WebFetch and cite real evidence (the first pass used 0 tools and was rejected).

| # | Concept | Verdict | Tool calls | Decisive grounded evidence |
|---|---|---|:---:|---|
| C2 | SEALED-BID | **KILL** | 9 | arXiv 2510.19491 = identical mechanism; Flare markets sealed-bid auctions as flagship FCC demo; escrow release ≠ FAssets lifecycle (dev.flare.network/fassets/minting); multi-sided cold-start; TradFi e-procurement (ProcurEngine/Prokuria) |
| D1 | DELTA | **KILL** | 7 | Ripple Treasury ships XRPL-orbit intercompany netting; Coupa/Tipalti/BlackLine incumbents; FDC = 7 fixed attestation types (not arbitrary hash anchor); MPC netting patent US20220309492A1; settleDelta = gated transfer |
| D2 | TRIPWIRE | **KILL** | 9 | TEE proves execution not rule-fairness → payee can't rely → FCC decoration; ZSecretEscrow prior art; asset action = gated ERC-20 transfer not FAssets lifecycle; Coston2 FCC simulated only; FDC round = minutes |

Cross-cutting grounded facts (apply to all escrow concepts): (1) releasing already-minted FXRP from escrow is a bare ERC-20 transfer — forbidden by the Interoperable Asset track; the real lifecycle is mint (Core Vault + FDC proof) / redeem / agent collateral. (2) FDC supports 7 fixed attestation types, not arbitrary hash anchoring. (3) FCC on Coston2 is a simulated TEE (real TEE only on Songbird/mainnet).

## Final tally: 0 / 10 survivors. See round-7-blocker.md for the structural pincer finding and Dami's decision options.
