# WINNER-BRIEF.md — Flare Summer Signal

> Selected by Dami after an 8-round Warroom that exhausted novelty-first ideation (0 survivors) and a deliberate pivot to an **execution-first** strategy: this event scores usefulness 30% + Flare-integration depth 30% + execution 20% = 80%, with new-work only 10%. The winning axis is a finished, deeply-integrated, cleanly-demoed product — not mechanism novelty. This brief is a known-pattern build chosen to dominate that 80%.

## Thesis
Many real payouts hinge on a **public fact** (did the condition occur?) governed by a **private rule** (how much, under what terms). Neither half alone is trustworthy on-chain: publish the rule and it gets gamed; self-report the fact and it can be faked. **CLAUSE** proves the fact trustlessly with **FDC**, evaluates the confidential payout policy inside **FCC**, and releases **FXRP** on-chain against both proofs — one clean causal pipeline touching all three headline Flare primitives, which legitimately enters **both** bounty tracks. It wins on depth + a concrete "condition → confidential verdict → real money moves" demo, exactly what prior Flare winners (verifiable computation + deep primitive use + rounded product) looked like.

## Idea
**Name:** CLAUSE — Confidential Conditional Settlement for FXRP
**Problem:** Condition-based payouts (parametric insurance, milestone/grant releases, structured escrow) need a trustless public trigger AND a confidential payout policy; today you get one or the other.
**Mechanism:** FDC Web2Json attests the public condition → FCC evaluates it against a committed, confidential policy and signs `{release, amount}` → an escrow contract verifies the FDC Merkle proof + the FCC signature (registered code-hash) → releases FXRP → receipt.
**Chain-native angle:** Uses FDC (trustless external fact), FCC (attested private computation), and FXRP (the asset that moves) together — remove any one and the product breaks. Aligned to Flare's 2026 XRPFi push.
**Track fit:** Confidential Compute Apps (FCC confidential policy) + Interoperable Asset Products (FXRP settlement). Multi-track entry is enabled; select both bounties.
**Demo hook (90s):** Pre-warmed FDC request. On camera: condition proven → confidential policy returns "PAY 250 FXRP" (policy never shown) → FXRP released on Coston2, receipt shown. Second run: condition not met → no release. Honest on-screen labels: "FDC proof LIVE; TEE SIMULATED on Coston2 (MODE=0)."

## Why this survives where 8 rounds didn't
It was NOT gated for novelty (Dami's execution pivot). It is deliberately a **clean execution of a known pattern** with maximal Flare-depth and a concrete demo. The two structural walls that killed the confidential concepts are handled honestly, not hidden:
- **Self-gating wall:** the *fact* half is trustless (FDC), so the payout doesn't rest solely on a self-reported private input; the confidential half only decides *terms*, which the payer is entitled to keep private.
- **Sim-TEE wall:** labeled honestly; the FCC sign/verify flow is real, hardware attestation is simulated on Coston2. Consider Songbird deploy if FCC real-TEE is confirmed live (capability check owed).

## Risks (carry into Forge)
- **FDC ~180s round** vs a 90s demo → pre-warm the request before recording; show verdict→release live. (Cited: dev.flare.network/fdc/overview.)
- **Coston2 = simulated TEE** → honest labels; evaluate Songbird real-TEE (STP.13 accepted Jul 2026, "not yet fully public" — verify before relying).
- **Confidential half must stay load-bearing** → the payout policy must be genuinely private terms (e.g., an insurer's payout curve), not decoration. If it reads as removable, tighten the domain.
- **Prize stacking unconfirmed** → multi-track *entry* is confirmed; one project winning *both* prizes is not. Worst case we still compete in the stronger track.
- **Interoperable depth** → use a real FXRP lifecycle touchpoint, not a bare ERC-20 transfer of pre-minted FXRP, to satisfy the track's "not a bare transfer" bar. Forge to specify the exact FAssets/escrow interface + receipt.

## Build Order
1. **FXRP escrow + verifier contract** (Foundry): holds FXRP, verifies FDC Merkle proof + FCC signature (registered code-hash) before release; emits receipt event. Prove the riskiest integration first.
2. **FDC Web2Json** request + on-chain proof verification for the public condition (pick one concrete, self-triggerable data source).
3. **FCC extension** (reproducible Docker) computing the confidential policy verdict over the committed policy + attested fact, signing the result; register code-hash; wire InstructionSender/verifier.
4. **Next.js demo UI**: fund escrow + commit policy → trigger condition → verdict card (policy redacted) → release tx + receipt.
5. **Two-path demo** (pay / no-pay) + honest sim/live labels + NEW_WORK.md and commit boundary.

## Catalog / Competitor context
- Distinct from named high-threat competitors (Wayafee = guided FXRP remittance; AegisFlow/Veil = confidential screening/credit) — CLAUSE is condition→confidential-verdict→FXRP settlement, a different shape.
- Known-pattern components (conditional escrow, parametric payout, FDC-triggered release) — chosen deliberately for execution, not claimed as novel.

## Handoff
Next phase: **hackathon-forge** — produce PRD + ARCHITECTURE + NEW_WORK plan. Lock the exact FDC attestation type + data source, the FXRP lifecycle touchpoint (not a bare transfer), and the FCC extension interface. Confirm Coston2-vs-Songbird target early.

## Thesis
(PROVISIONAL — derived by forge 2026-08-13 from the execution-first winner brief, not deliberation-fresh)

1. **WINNING ARGUMENT:** CLAUSE proves a public fact (FDC) and evaluates a confidential policy (FCC) to release FXRP on-chain — one causal pipeline through Flare's three headline primitives, entering both bounty tracks. It wins on integration depth + a concrete "condition → confidential verdict → real money moves" demo, not on novelty.
2. **EVIDENCE:** FDC Web2Json is live on Coston2 (JQ→ABI, Merkle-proof verified on-chain); FCC extensions sign results a Solidity contract verifies against a registered code-hash; FXRP is the Flare-native asset — all confirmed against dev.flare.network. Prior Flare winners = useful interface + verifiable computation + deep primitive use.
3. **DEMO OBLIGATION:** the judge WITNESSES a real external condition being proven, a confidential policy verdict computed WITHOUT exposing the policy, and FXRP actually moving on-chain against both proofs — under an honest "TEE SIMULATED on Coston2 (MODE=0)" label.
4. **HERO FLOW:** fund FXRP escrow + commit hashed policy → external condition occurs → FDC Web2Json attests it → FCC evaluates the confidential policy, signs `{release, amount}` → escrow verifies FDC Merkle proof + FCC signature → FXRP released → receipt.
5. **INVARIANTS:** (a) the confidential policy is NEVER shown on-chain or on-screen; (b) FXRP moves only after BOTH the FDC proof AND the FCC signature verify; (c) sim-TEE labeled honestly, never presented as hardware attestation; (d) the FXRP action is a real lifecycle touchpoint with a receipt, not a bare ERC-20 transfer; (e) no fabricated demo state — the FDC round and the FXRP release are real (pre-warmed, never faked).
6. **DRIFT TRIPWIRES:** degenerates into a generic FXRP payment app (FCC decorative); becomes a dashboard/monitor with no performed release; the policy leaks public (defeats confidentiality); the asset action degrades to a bare transfer; the demo fakes the FDC proof or the release.
