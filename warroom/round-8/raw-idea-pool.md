# Round 8 — Raw Idea Pool (FROZEN before gate reveal)

Single-track Confidential Compute Apps. 5 blind tool-grounded generators (each verified FCC/FCE/FDC capability against dev.flare.network before finalizing). 10 concepts. Competitor kill-list withheld until this hash is recorded.

**Grounded capability spine (all concepts):** FCE = reproducible Docker image in a TEE (Intel TDX / GCP Confidential Space), runs arbitrary code + outbound HTTPS, signs results with an on-chain-registered identity key (code-hash whitelisted) that a Solidity contract verifies. **Coston2 = SIMULATED TEE (MODE=0)** — honest label required. **FDC-attested data is PUBLIC in the Merkle proof** → FDC carries public triggers only; private inputs live in FCC. FDC Web2Json (JQ→ABI, Merkle-verified) is live on Coston2.

---

## A1 — SLATE (Confidential Cap-Table Compliance Attestor)
- User: startup CFO/fund-admin certifying covenant compliance (max holder %, lockup cliff, accredited-only) before a token unlock/secondary.
- Second party (controls value): investor / exchange listing desk / on-chain UnlockGate — gates the unlock tx.
- Private inputs: full cap table (wallets, allocations, lockup, accreditation) — commercially sensitive, off-chain, not public.
- FCE op: compute covenant booleans over private cap table; emit only {pass, thresholds, capTableCommitment}. Sign; UnlockGate.sol verifies TEE signature vs registered identity → permits unlock.
- Outcome: unlock tx actually fires/refuses on Coston2 + receipt.
- FCC non-removable: investor must trust a computation over data they can't see; plain-ZK cap-table circuit infeasible in 26h. Cite: fcc/overview.

## A2 — PROOF-OF-RESERVE-DELTA (Confidential Solvency Ratio Attestor for OTC Lenders)
- User: OTC desk/lending treasurer proving collateral ≥150% of liabilities to draw a credit line without revealing venues/balances/counterparties.
- Second party: lender/margin-provider CreditLine.sol — controls the draw.
- Private inputs: per-venue balances (read-only API keys held IN the TEE), liabilities, exposures.
- FCE op: pull balances inside TEE, compute ratio bucket, emit {ratio≥150%:bool, ts, commitment}. Sign; CreditLine verifies → sets maxDraw.
- Outcome: maxDraw updated / draw succeeds-or-reverts on Coston2.
- FCC non-removable: lender can't hold the API keys; FDC would publish balances → defeats privacy. Cite: fcc/overview, fdc public-proof.

## B1 — CONFORMANCE (Signed Pass/Fail on a Vendor's Secret Certification Suite)
- User: protocol integrations team certifying a third-party contract/adapter before production whitelist. (Whitespace: FCC-ops, unowned.)
- Second party: integrator/customer — controls the go-live whitelist entry + integration payment.
- Private inputs: the certification suite (adversarial fixtures, fault-handling policy, tolerance thresholds) — gamed if published.
- FCE op: replay a deterministic failure capsule against candidate (read via FDC EVMTransaction), apply secret pass policy, emit {candidate, suiteVersion, verdict, score}. Sign; Coston2 verifier flips approved[candidate].
- Outcome: whitelist contract flips approved=true only after verifying the signature.
- FCC non-removable: CI runs on vendor's box (untrusted); encryption can't prove which code ran. Cite: fcc/overview, fdc EVMTransaction.

## B2 — SLA-PROOF (Private Synthetic-Probe Audit Unlocks Escrowed Payment)
- User: company buying an API/infra service under SLA (echoes "reads as a hang not a failure" / "endpoint is gone"). (Whitespace: FCC-ops.)
- Second party: the provider getting paid — demands the signed audit to release escrowed USDC/FLR.
- Private inputs: buyer's probe fault-injection schedule + SLA tolerance policy — gamed if seen.
- FCE op: pull provider's live endpoint via FDC Web2Json, replay secret probe schedule, compute SLA compliance, emit {provider, window, met, p95}. Sign; escrow verifies → releases.
- Outcome: escrow releases payment on verified PASS on Coston2.
- FCC non-removable: buyer can't hand provider the plaintext probe (gamed); provider won't pay on buyer's word. Web2Json makes the real endpoint sample on-chain-verifiable. Cite: fdc Web2Json, fcc/overview.

## C1 — SEALEDREF (Confidential Reference / Backchannel Checks for Hiring)
- User: hiring manager wanting candid references; candidate won't expose current-employer referees.
- Second party: prospective employer — controls the offer / escrowed signing bonus.
- Private inputs: referee identities + candid free-text answers — legally sensitive, candor collapses if attributed.
- FCE op: referees submit directly to enclave; compute coarse aggregate (verified count, weighted rehire/reliability score, ≥N-flag), emit coarse only; RA-signed; offer-escrow releases if score≥threshold.
- Outcome: offer-escrow deposit released/withheld on Coston2.
- FCC non-removable: encryption would decrypt raw refs to employer (defeats candor); ZK over adversarial free-text infeasible. Cite: flare-ai-kit (Confidential Space), fcc.
- Note: NLP-scoring build risk; real-world HR domain.

## C2 — CLOSEDFIX (Confidential Bug-Bounty Triage — Prove Exploit Without Leaking It)
- User: protocol security lead + whitehat, in the classic disclose-before-pay deadlock.
- Second party: bounty program — controls the on-chain bounty escrow payout.
- Private inputs: the working PoC / vulnerable call sequence / repro — most sensitive possible input.
- FCE op: run PoC against a forked target (target address public, exploit private) inside enclave, check protocol-supplied invariant, emit {valid, severity, invariant-id} only; time-locked reveal after payment. Sign; bounty escrow pays on valid.
- Outcome: bounty escrow pays researcher on attested valid verdict on Coston2.
- FCC non-removable: encryption forces decrypt-to-protocol (theft); ZK-EVM over attacker bytecode infeasible in 26h. Cite: flare-ai-kit (TDX), fcc.
- Note: TOP build risk = running anvil/fork inside Confidential Space container.

## D1 — STENCIL (Confidential Sanctions/PEP Clearance for On-Chain Treasuries)
- User: DAO treasury signers / OTC desk who must not pay a sanctioned counterparty but can't redistribute license-restricted screening data.
- Second party: treasury payout vault — controls the transfer.
- Private inputs: license-restricted screening API response (via Web2Json) + proprietary risk ruleset.
- FCE op: Web2Json attests the screening JSON (fact proven, not published), FCE fuses with private ruleset → {CLEAR/BLOCK/MANUAL, confidence}; sign; vault verifies sig + FDC proof → executes/refuses ERC-20 transfer.
- Outcome: vault releases/reverts a transfer on Coston2.
- FCC non-removable: vault can't be given the license-restricted list; needs trusted computation over unseen data. Cite: fcc/overview, fdc Web2Json.

## D2 — PROVENANCE SEAL (Confidential Authenticity Verdict for a Grant/Bounty Payout)
- User: grants/bounty operator confirming a deliverable authentic+eligible before payout without doxxing recipient or leaking rubric.
- Second party: grant escrow (treasury-funded) — controls payout.
- Private inputs: license-restricted originality/identity API response (Web2Json) + confidential scoring rubric/weights.
- FCE op: Web2Json attests the API verdict, FCE fuses with hidden rubric → {ELIGIBLE/REJECT/NEEDS-REVIEW, confidence, provenance-tag}; sign; escrow verifies sig+proof → pays/withholds.
- Outcome: escrow releases/withholds payout on Coston2.
- FCC non-removable: escrow forbidden to see licensed evidence + operator won't publish rubric. Cite: fcc/overview, fdc Web2Json.

## E1 — PROOFDOCK (Attested Charter-Party Laytime & Demurrage Settlement)
- User: dry-bulk/tanker chartering desks vs shipowners; demurrage disputes drag for months on self-reported evidence.
- Second party: the counterparty who owes/pays — settlement of a 5-6 figure claim gated on an agreed number.
- Private inputs: minute-by-minute Statement of Facts, pumping logs, NOR timestamps, confidential charter clauses — commercially sensitive, dual-party.
- FCE op: both parties' raw logs + laytime rules → enclave runs laytime-counting algo → emit {demurrageUSD, exceptedHours} only; sign; contract verifies vs registered identity → records SettlementRecord. Optional Web2Json weather attestation.
- Outcome: signed settlement figure posted on-chain; neither raw log disclosed.
- FCC non-removable: computation over BOTH parties' private inputs that each relies on but can't see; encryption gives confidentiality OR shared result, not both. Cite: fcc/overview, fdc Web2Json.
- Note: real-world shipping domain; laytime scoped to one charter template.

## E2 — SPLITFAIR (Confidential Royalty Audit for Music Catalog Sub-Publishing)
- User: independent writer/manager vs publisher; "black box" streaming statements, suspected underpayment, publisher won't expose raw per-DSP revenue.
- Second party: writer/manager — controls acceptance/waiver of audit rights + reserve release; publisher controls payment.
- Private inputs: publisher's raw per-DSP/territory revenue ledger + writer's confidential contract terms (split %, advances, admin fee).
- FCE op: ledger + contract terms → enclave computes owed royalty + {matchesStatement:bool}; emit final owed + boolean only; sign; contract records AuditAttestation, holds reserve on mismatch. Optional Web2Json revenue-bound.
- Outcome: signed audit attestation on-chain; reserve auto-held on mismatch; raw ledger + co-writer splits never revealed.
- FCC non-removable: mutually-trusted royalty figure across two private datasets; encryption can't. Cite: fcc/overview, fdc Web2Json.
- Note: real-world music domain; royalty math scoped.
