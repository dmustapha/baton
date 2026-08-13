# Finalist Fact Check — Flare Summer Signal

Checked against official Flare Developer Hub documentation and accepted governance on 2026-08-13. Public corpus absence is treated as reviewed-evidence absence, not global nonexistence.

## Finalist 1 — Mandate Zero

### Claim 1: Smart Accounts can execute the required bounded contract call — PASS WITH ARCHITECTURE CORRECTION

Official Smart Accounts documentation confirms that XRPL users can issue custom instructions which execute arbitrary `Call[]` entries from their deterministic Flare Personal Account. The `0xFE` direct-mint path commits a `PackedUserOperation` in an XRPL memo, FDC proves the payment, FXRP is minted, and the call batch executes atomically.

- Source: https://dev.flare.network/smart-accounts/custom-instruction
- Source: https://dev.flare.network/smart-accounts/overview
- Source: https://dev.flare.network/smart-accounts/reference

**Correction:** Smart Accounts do not natively treat an FCC signature as account authorization. Authorization comes from the XRPL payment signature. The finalist architecture must therefore use:

```text
private constraints → FCC/FCE signed one-cycle mandate
→ XRPL-authorized Smart Account 0xFE custom instruction
→ direct FXRP mint / Personal Account call
→ MandateVault verifies FCC result and enforces cap/cycle/target
→ exact asset action → zeroed mandate → replay refusal
```

This preserves both load-bearing tracks: remove the direct-mint/Smart Account call and no XRP-to-FXRP economic action occurs; remove FCC and MandateVault refuses to recreate authority from private constraints.

### Claim 2: FCC/FCE can produce and verify the private result — PASS WITH DISCLOSURE LIMITATION

Official FCC guides support Go, Python, or TypeScript handlers, Coston2 instruction routing, registered machine identities, signed results, and Solidity verification using the domain-separated `TEE_ACTION_RESULT` payload.

- Source: https://dev.flare.network/fcc/guides/getting-started
- Source: https://dev.flare.network/fcc/guides/weather-insurance-extension
- Source: https://dev.flare.network/fcc/guides/sign-extension

**Limitation:** the documented Coston2 quick path uses a local simulated TEE on a real Coston2 chain; only the attestation is simulated. The UI and submission must say `Coston2 onchain lifecycle + simulated TEE attestation` unless a real Confidential Space deployment is completed. Public indexer credentials are not published and must be requested or self-hosted.

### Claim 3: One builder can prove it before cutoff — PARTIAL PASS / HIGH EXECUTION RISK

The contract and UI slice is small, and official examples already demonstrate both custom Smart Account calls and end-to-end FCC result verification. However, combining the two still requires Docker, proxy, tunnel, indexer access, extension registration, FDC/direct mint execution, and exact signature verification. Estimate: 20-30 focused hours if credentials and test assets are available; not credible if FCC indexer access is unavailable.

### Competitor provenance and novelty — PASS

The concept traces C6 stale-policy/signer edge states and C9 private automation failure into forced authority expiry. No reviewed 99-signal project makes authority deliberately erase itself and require a private one-cycle reconstitution before an atomic Smart Account/FAsset action. This is an evidence-bounded novelty statement.

### Per-track fact check

| Track | Exact primitive | Verified interface | Removal test | Judge-visible receipt | Result |
|---|---|---|---|---|---|
| Interoperable Asset Products | FAssets direct mint to Smart Account + `0xFE` custom instruction calling MandateVault | Official `executeDirectMintingWithData`, `PersonalAccount.executeUserOp(Call[])`, deployed MasterAccountController | Without it, no XRPL-authorized XRP→FXRP action reaches the policy vault | XRPL payment, FDC/direct-mint transaction, Personal Account event, FXRP balance/action | PASS after correction |
| Confidential Compute Apps | FCC/FCE private mandate calculation and registered machine signature | Official extension registry/proxy/action-result flow and onchain signature pattern | Without signed result, MandateVault remains at zero | instruction ID, machine status, signed result, verifier transaction, replay/over-cap rejection | PASS with simulated-attestation disclosure |

**Fact-check-adjusted score:** 7.50/10. Risk: MEDIUM-HIGH. Failed claims: none after architecture correction; one maturity limitation remains.

## Finalist 2 — SplitLock

### Claim 1: PMW can manage and sign for an external XRPL address — VERIFIED AT PROTOCOL LEVEL

Accepted Songbird proposal STP.13 defines PMWs as Songbird applications whose TEE-held keys sign external-chain transactions after weighted data-provider confirmation, with optional cosigners.

- Source: https://proposals.flare.network/STP/STP_13.html

### Claim 2: A public builder can implement the exact PMW call path now — FAILED / UNVERIFIED

No public Developer Hub guide, callable interface reference, sample repository, or builder workflow for PMW submission was found. The available FCC extension guides show custom FCEs, not the system PMW application. This prevents a credible implementation estimate and makes the required live receipt inaccessible from public evidence.

### Claim 3: The proposed Coston2 path is correct — FAILED

STP.13 introduces FCC system applications and PMWs on Songbird. SplitLock would need a Songbird architecture and deployed PMW access, not the Coston2 path used by public custom-extension tutorials. The concept remains architecturally strong but cannot truthfully promise a Coston2 FCC→PMW→XRPL demo.

### Competitor provenance and novelty — PASS

The concept converts C6 split-brain policy and stale-signature edge states into a common-safe private intersection that controls one external payment. No reviewed signal shows that exact intersection-to-PMW proof. Absence is limited to reviewed public evidence.

### Per-track fact check

| Track | Exact primitive | Verified interface | Removal test | Judge-visible receipt | Result |
|---|---|---|---|---|---|
| Interoperable Asset Products | Songbird PMW external XRPL payment | Protocol behavior specified in accepted STP.13; public builder interface not found | Without PMW, no external payment | Would require Songbird instruction plus XRPL transaction/recipient balance | FAIL buildability |
| Confidential Compute Apps | FCC private intersection/abstention result | Custom FCE path is documented; system PMW integration path is not | Without FCC, policy must be disclosed or payment freezes | Signed intersection/abstention plus onchain verification | PARTIAL |

**Fact-check-adjusted score:** 5.95/10. Risk: HIGH. Failed claims: public PMW build path; Coston2 network assumption.

## Final Fact-Check Ranking

1. **Mandate Zero — 7.50 — no fatal failed claim after correction.**
2. **SplitLock — 5.95 — two material failed implementation claims.**

No `WINNER-BRIEF.md` has been written. Selection remains Dami's decision.

