# Competitor Opportunity Map — Flare Summer Signal

## Evidence Boundary and Coverage

This map mines the complete reconciled corpus of 99 likely-current public/profile signals: 87 likely-current repositories, four profile-recovered repositories, and eight profile-only or unlinked signals. It is generative evidence, not proof of formal submission or market nonexistence.

The generator-safe map deliberately uses anonymized coherent clusters. Each signal appears exactly once in the gate-only coverage ledger, while multi-label concept counts remain available only to synthesis and gating.

## Generator-Safe Track Strategy Contract

Strategy: `multi-track required`.

- **Interoperable Asset primitive:** a real FAssets/FXRP state transition, Smart Account authorization, PMW external-chain action, or FDC-verified asset lifecycle. A balance display or passive read fails.
- **Confidential Compute primitive:** a necessary FCC/FCE computation or policy execution with private inputs, explicit disclosure boundary, machine/attestation status, signed result, and contract verification. Ordinary encryption or an unsupported TEE claim fails.
- **Independent removal tests:** removing either primitive must destroy a necessary economic action, safety guarantee, or product outcome.
- **Joined proof path:** user trigger → external/FAsset state → necessary confidential operation → verified result → asset action → exact judge-visible receipt and failure safeguard.

## Corpus-Derived Opportunity Clusters

### C1. Asset entry, routing, and first-use conversion

- **User and job:** XRP holders, merchants, and first-time Flare users need to enter an interoperable asset lifecycle without coordinating several wallets, tags, proofs, and contracts.
- **Costly failure:** a wrong reference, stale quote, incomplete mint, or ambiguous state strands value and support time.
- **Core mechanism:** guided direct minting, destination tags, authorization shims, route selection, and FDC-confirmed settlement.
- **Asset lifecycle:** XRP payment → proof/request state → FXRP mint/transfer → downstream use.
- **Confidential operation:** private intent, recipient policy, route constraints, or authorization can be reduced to a signed minimum-necessary decision.
- **Proof pattern:** staged lifecycle status plus source-chain payment, FDC proof, Flare transaction, and final balance receipt.
- **Distribution path:** XRPL wallets, merchant checkout, remittance corridors, and existing XRP communities.
- **Demonstrated strength:** the field makes a complicated protocol legible through one guided journey.
- **Missing outcome:** safe intervention when the guided journey leaves the happy path.
- **Unserved edge state:** mismatched tag, expired quote, duplicated intent, proof delay, or payment observed after the user abandons the flow.
- **Portable primitive:** preflight → intent commitment → cross-chain evidence → exact reconciliation receipt.

### C2. FAssets risk, assurance, and exception resolution

- **User and job:** FXRP holders, agents, redeemers, and protocol operators need assurance that assets remain redeemable and exceptions will be resolved.
- **Costly failure:** liquidation, redemption default, thin exit liquidity, incorrect collateral assumptions, or silent stalled state causes direct loss.
- **Core mechanism:** proof-of-solvency, nonexistence proofs, insurance, risk scoring, challenger actions, deleveraging, and exit-depth measurement.
- **Asset lifecycle:** mint/collateral → use → redemption/liquidation/challenge → recovery or payout.
- **Confidential operation:** sensitive positions, recovery policy, or counterparty exposure can be evaluated privately before an authorized corrective action.
- **Proof pattern:** raw-chain derivation, deterministic calculations, failure-path test, action transaction, and post-action solvency receipt.
- **Distribution path:** FAsset agents, FXRP holders, DeFi positions, and protocol support channels.
- **Demonstrated strength:** negative evidence and explicit abstention states create credible automation.
- **Missing outcome:** most tools diagnose or insure; fewer complete a safe, policy-bounded recovery.
- **Unserved edge state:** conflicting evidence, partial redemption, unavailable signer, stale collateral, or corrective action that itself worsens exposure.
- **Portable primitive:** confidential counterfactual simulation → bounded recovery authorization → public before/after receipt.

### C3. Payments, payroll, invoices, escrow, and streams

- **User and job:** businesses, contractors, families, schools, and merchants need external-value settlement with programmable terms.
- **Costly failure:** private commercial terms leak, milestones are disputed, recurring payments drift, or source-chain payment cannot be reconciled.
- **Core mechanism:** FDC-attested payments, FXRP escrow, milestone release, subscriptions, invoice finance, payroll proofs, and evidence-linked payouts.
- **Asset lifecycle:** funding/payment → escrow/stream/claim → conditional release → reconciliation.
- **Confidential operation:** terms, salary, invoice evidence, dispute facts, or recipient rules can be evaluated inside a verifiable boundary.
- **Proof pattern:** exact funding receipt, private-decision status, release transaction, and claimant/recipient confirmation.
- **Distribution path:** existing payer-payee relationships; no marketplace is required.
- **Demonstrated strength:** clear users and visible money movement make the product immediately understandable.
- **Missing outcome:** privacy and settlement often sit side by side rather than making the confidential result causally necessary.
- **Unserved edge state:** disputed partial work, late source-chain payment, duplicate invoice, policy change mid-stream, or recipient recovery.
- **Portable primitive:** privately evaluate conditional entitlement, reveal only release/deny/amount, and atomically bind it to asset release.

### C4. Confidential trading, auction, RFQ, and conditional execution

- **User and job:** traders and liquidity providers need execution without leaking bids, stops, strategy, route, or size.
- **Costly failure:** transparent intent invites front-running, herding, adverse selection, or information extraction.
- **Core mechanism:** sealed bids, batch clearing, commit-reveal, enclave routing, encrypted triggers, and private matching.
- **Asset lifecycle:** deposit/bond → private order → match/clear → settlement/slash/refund.
- **Confidential operation:** order terms and matching are private; only the minimum settlement instruction is signed.
- **Proof pattern:** encrypted input commitment, machine identity/attestation, deterministic result, settlement transaction, and refund/failure evidence.
- **Distribution path:** existing FXRP traders, desks, vaults, and prediction-market users.
- **Demonstrated strength:** privacy is load-bearing and the reveal/settlement moment creates a strong demo.
- **Missing outcome:** operational recovery, accountable machine rotation, and execution when the enclave abstains are weakly served.
- **Unserved edge state:** enclave downtime, unmatched orders, stale price, disputed match, or inability to prove input inclusion without disclosure.
- **Portable primitive:** inclusion receipt + private computation + public settlement or explicit abstention.

### C5. Confidential credit, collateral, and eligibility

- **User and job:** borrowers and capital providers need usable underwriting without publishing full histories or proprietary models.
- **Costly failure:** privacy loss, unsafe under-collateralization, opaque denial, or stale evidence harms both sides.
- **Core mechanism:** enclave scoring, selective result release, FDC history evidence, collateral adjustment, and private working-capital decisions.
- **Asset lifecycle:** evidence/assessment → credit line → FXRP collateral/loan → repayment or liquidation.
- **Confidential operation:** transaction history, business records, model logic, and eligibility are computed privately.
- **Proof pattern:** input commitment, signed score/limit, onchain terms change, loan event, and disclosed limitation matrix.
- **Distribution path:** existing borrowers, lenders, FAsset agents, and XRP-native businesses.
- **Demonstrated strength:** a minimal signed result connects privacy to a concrete economic term.
- **Missing outcome:** appeal, correction, evidence expiry, and model/policy change are rarely first-class lifecycle states.
- **Unserved edge state:** contradictory inputs, expired score, denied applicant, model rotation, or position deterioration after approval.
- **Portable primitive:** time-bounded confidential authorization with explainable reason code and revocable asset terms.

### C6. Treasury, signer, Smart Account, and autonomous policy

- **User and job:** teams and asset owners need external-chain actions without giving an operator unrestricted raw-key control.
- **Costly failure:** compromised signers, unavailable machines, policy drift, or unreviewed transactions create catastrophic loss.
- **Core mechanism:** policy-gated signing, XRPL-linked authorization, autonomous treasury agents, pre-execution controls, and TEE-held keys.
- **Asset lifecycle:** proposal → simulation/policy check → external signing → Flare/external settlement → reconciliation.
- **Confidential operation:** sensitive policy inputs, transaction intent, keys, and risk evaluation remain inside the boundary.
- **Proof pattern:** policy hash, simulation output, machine/attestation state, signed transaction, source/destination confirmations, and refusal receipt.
- **Distribution path:** XRPL account owners, DAOs, treasuries, asset agents, and wallet providers.
- **Demonstrated strength:** separating authorization policy from key possession removes operator custody.
- **Missing outcome:** recovery, rotation, quorum change, degraded mode, and independent evidence across the full signer lifecycle.
- **Unserved edge state:** machine loss, split-brain policy, stale signer set, chain congestion, or a valid signature for a now-invalid intent.
- **Portable primitive:** policy versioning + private simulation + threshold external signature + post-execution reconciliation.

### C7. Protected work, documents, identity, and access

- **User and job:** workers, verifiers, institutions, and data owners need to prove claims or release access without publishing sensitive inputs.
- **Costly failure:** documents, identities, work artifacts, or vulnerability details leak before verification or payment.
- **Core mechanism:** programmable access, confidential verification, work escrow, bug-bounty proof, identity claims, and signed minimal results.
- **Asset lifecycle:** stake/escrow/payment → private submission → verify/release → payout or access grant.
- **Confidential operation:** artifact contents, identity evidence, exploit details, or evaluation run privately.
- **Proof pattern:** submission commitment, private result, payment/access transaction, and explicit simulation/attestation label.
- **Distribution path:** existing employer-worker, issuer-verifier, buyer-seller, and project-researcher relationships.
- **Demonstrated strength:** privacy protects a real asset or human interest rather than hiding already-public chain data.
- **Missing outcome:** revocation, dispute, correction, and downstream proof erasure or expiry are weakly handled.
- **Unserved edge state:** fraudulent resubmission, partial disclosure, revoked credential, ambiguous work quality, or verifier unavailability.
- **Portable primitive:** confidential claim evaluation → time-bounded capability or asset release → revocable receipt.

### C8. Prediction, game, and outcome markets

- **User and job:** forecasters and players need fair participation where early visible behavior does not distort later decisions.
- **Costly failure:** herding, copied bets, manipulated resolution, or opaque game economics destroys fairness.
- **Core mechanism:** encrypted positions, confidential resolution, oracle/FDC evidence, and FXRP-native game economies.
- **Asset lifecycle:** stake/bet/spend → private state transition → outcome resolution → payout.
- **Confidential operation:** choice, strategy, or resolution logic remains private until the agreed boundary.
- **Proof pattern:** commitment, live external/oracle input, signed result, payout transaction, and replayable round receipt.
- **Distribution path:** existing players, communities, and time-bounded events.
- **Demonstrated strength:** a countdown, reveal, and value transfer create a judge-friendly first-session experience.
- **Missing outcome:** dispute resolution and proof that every committed input was included without leaking it.
- **Unserved edge state:** cancelled event, stale feed, tie, missing participant input, or confidentiality failure before resolution.
- **Portable primitive:** private inclusion accumulator + verifiable resolution + deterministic refund branch.

### C9. Wallet, savings, yield, and portfolio automation

- **User and job:** XRP/FXRP holders need safe use of assets across savings, yield, transfers, and portfolio actions.
- **Costly failure:** fragmented UX, unsafe strategy changes, misunderstood risk, and unclear execution state cause loss or abandonment.
- **Core mechanism:** Smart Account entry, yield routing, savings vaults, wallet aggregation, FTSO valuation, and automated guardrails.
- **Asset lifecycle:** authorize/deposit → allocate → accrue/rebalance → withdraw/spend.
- **Confidential operation:** preferences, risk bounds, strategy logic, or notification thresholds can be evaluated privately.
- **Proof pattern:** user authorization, actual allocation transaction, policy result, performance receipt, and safe-exit test.
- **Distribution path:** existing XRPL wallets, FAsset holders, and DeFi users.
- **Demonstrated strength:** one-click execution and familiar wallets reduce protocol friction.
- **Missing outcome:** private policy often does not causally control a unique asset action, and recovery after failed automation is underdeveloped.
- **Unserved edge state:** failed rebalance, route disappearance, policy conflict, stale valuation, or signer unavailable at exit.
- **Portable primitive:** user-held authorization + confidential policy check + bounded allocation + verified unwind.

### C10. External evidence, intelligence, and truth labeling

- **User and job:** operators and users need external facts, market data, or intelligence converted into a decision they can trust.
- **Costly failure:** stale, imprecise, manipulated, or weakly sourced data causes bad transactions and false confidence.
- **Core mechanism:** FTSO/FDC evidence, multi-source comparison, divergence anchors, Web2 JSON, and confidence/status labeling.
- **Asset lifecycle:** evidence request → verified fact → contract decision → asset action or abstention.
- **Confidential operation:** source fusion, proprietary rules, or sensitive context can run privately while revealing an action code and provenance class.
- **Proof pattern:** source identifiers, freshness, raw proof, computation status, transaction consequence, and abstention reason.
- **Distribution path:** protocol operators, treasuries, merchants, and builders already consuming Flare data.
- **Demonstrated strength:** honest evidence labels and exact receipts improve trust.
- **Missing outcome:** many products stop at dashboards or alerts instead of closing the loop with a safely authorized action.
- **Unserved edge state:** source disagreement, proof delay, decimal/endpoint drift, or fact arriving after its action window.
- **Portable primitive:** verified/computed/estimated label → confidential action policy → execute-or-abstain receipt.

### C11. Continuity, delegation, and recovery

- **User and job:** asset owners need value to remain recoverable across inactivity, lost access, signer failure, or delegated control.
- **Costly failure:** inactivity or key loss permanently strands assets; premature recovery can enable theft.
- **Core mechanism:** nonexistence/inactivity proof, beneficiary release, policy-gated delegation, signer rotation, and continuity vaults.
- **Asset lifecycle:** deposit/delegate → monitor evidence → challenge/wait → recover/reassign.
- **Confidential operation:** beneficiary rules, contingency policy, or recovery evidence can be evaluated privately.
- **Proof pattern:** policy commitment, time/nonexistence evidence, challenge window, confidential authorization, and release transaction.
- **Distribution path:** existing asset holders, wallets, and organizations with continuity obligations.
- **Demonstrated strength:** negative evidence can trigger a meaningful state change.
- **Missing outcome:** recovery from the infrastructure itself failing, not only from the user becoming inactive.
- **Unserved edge state:** false inactivity, contested beneficiary, recovered original signer, machine loss, or policy migration.
- **Portable primitive:** dual absence proof (user event plus signer/service liveness) → private resolution → reversible handoff before final release.

### C12. Developer operations, lifecycle observability, and reproducible proof

- **User and job:** builders and operators need FCC/FCE, FDC, FAssets, and RPC workflows to fail visibly and recover predictably.
- **Costly failure:** hidden prerequisites, indexer stalls, RPC limits, registration drift, and ambiguous simulation claims consume build time and invalidate demos.
- **Core mechanism:** lifecycle state machines, capability matrices, failure injection, contract discovery, proof receipts, machine rotation, and reproducible environments.
- **Asset lifecycle:** test intent → real or fixture asset state → fault → recovery action → verified final state.
- **Confidential operation:** private fault policy, test secrets, signer rotation, or machine-bound operation must still emit a verifiable minimal result.
- **Proof pattern:** deterministic scenario ID, exact network/contract resolution, instruction, machine status, result signature, asset transaction, and replay bundle.
- **Distribution path:** current hackathon builders, FAsset integrators, FCC operators, and protocol support teams.
- **Demonstrated strength:** evidence production and honest trust-boundary labeling can themselves be part of the experience.
- **Missing outcome:** tooling commonly observes a failure but does not complete a user-valued asset recovery.
- **Unserved edge state:** indexer lag, machine rotation, expired registration, 30-block log limit, 429, stale proof, or simulated-to-live mismatch.
- **Portable primitive:** deterministic failure capsule → confidential policy response → real interoperable asset correction → portable proof bundle.

## Cross-Corpus Generative Synthesis

### Repeated mechanisms proving demand or feasibility

1. FDC-confirmed presence or absence can safely trigger asset state transitions.
2. Confidential computation is clearest when it emits a signed minimum-necessary result.
3. Policy-controlled signing can separate authority from key custody.
4. Failure and abstention states increase credibility when made explicit.
5. Receipts connecting offchain computation to onchain settlement are judge-legible.
6. Pre-execution simulation is strongest when followed by authorization and exact post-action proof.

### Missing outcomes shared across clusters

1. Recovery after the private machine, proof service, or signer fails.
2. A confidential decision that is causally required for the interoperable asset action.
3. Inclusion and dispute evidence without revealing sensitive inputs.
4. Policy/version rotation across long-lived asset lifecycles.
5. Closed-loop action and reconciliation rather than monitoring alone.
6. First-user value for existing operators without requiring a new marketplace.

### Underserved users and lifecycle stages

- FAsset support/operator teams resolving stuck states.
- PMW/FCC operators rotating machines and policies.
- XRPL wallet users recovering interrupted cross-chain intents.
- Asset owners handling an unavailable signer or stale authorization.
- Builders proving failure recovery to judges and future integrators.
- Claimants challenging a private decision without exposing the full input.

### Strong mechanism pairs not coherently joined in reviewed public evidence

These are opportunity hypotheses, not claims of global novelty:

1. Confidential counterfactual simulation + authorized FAssets exception recovery.
2. Private inclusion accumulator + FDC-confirmed settlement/refund.
3. Policy/machine rotation + Smart Account or PMW continuity action.
4. Honest capability labels + user-valued interoperable asset correction.
5. Dual absence proof + reversible confidential recovery authorization.
6. Forced policy expiry + re-authorization before the next external asset action.

### Proof patterns worth adapting

- Exact transaction and contract links beside each lifecycle state.
- Live/simulated/registered/attested/production labels.
- Negative-path demonstrations with explicit abstention.
- Raw external evidence plus derived result plus asset consequence.
- Replayable scenario bundles with deterministic IDs.
- Before/after state receipts rather than a generic dashboard.

### Distribution patterns worth adapting

- Existing XRPL wallet surface.
- FAsset agent/operator workflows.
- Existing merchant, employer, borrower, or payer relationships.
- Protocol support and incident-response channels.
- Current FCC/FCE builders facing reproducible operational pain.

<!-- GENERATOR-SAFE VIEW ENDS HERE. EVERYTHING BELOW IS GATE-ONLY. -->

## Gate-Only 99-Signal Coverage Ledger

Cluster assignment proves every reconciled signal informed the generative map. Names below must never enter generator prompts.

| # | Signal | Primary cluster |
|---:|---|---|
| 1 | RaYYeR220/veil | C5 |
| 2 | a252937166/faktura | C3 |
| 3 | edycutjong/backstop | C2 |
| 4 | Risingtell/rill | C1 |
| 5 | YingchenWang999/signal-harbor | C10 |
| 6 | darkty0x/flare-fassets-agent | C2 |
| 7 | fexx301/embargo | C7 |
| 8 | sodiq-code/aegis | C6 |
| 9 | spiffamani/wayafee | C1 |
| 10 | 0xNexuz/cinder | C4 |
| 11 | Carlys17/adumbra-flare | C4 |
| 12 | Donyemiight/whisper | C4 |
| 13 | Hexdee/nightjar | C4 |
| 14 | JohnboscoE/Veripay | C3 |
| 15 | KingOfTheMultiverse/fxrp-agent-radar | C2 |
| 16 | MaxxxDong/flare-evidence-escrow | C3 |
| 17 | Obiajulu-gif/flareseal | C3 |
| 18 | PhiBao/autopilot | C9 |
| 19 | SharkHand3/fasset-taskbounty | C3 |
| 20 | Tajudeeen/ledgerguard | C2 |
| 21 | a252937166/heirloom | C11 |
| 22 | dmetagame/ballast | C2 |
| 23 | drained69/Tacit | C6 |
| 24 | fahmmin/sotto-flare | C4 |
| 25 | ikhsanRamadhan/pixelorbit-flare | C8 |
| 26 | jerrymusaga/Keyless | C6 |
| 27 | nonggde/privyroll-signal | C3 |
| 28 | stephenovo/sealed-credit | C5 |
| 29 | tang-vu/Vouchsafe | C2 |
| 30 | tommycet/creditgate | C5 |
| 31 | wngstnr-code/SealedFi | C9 |
| 32 | yangyangnovelist-hub/darkstop | C4 |
| 33 | Ai-Rook/flare-wallet-port | C9 |
| 34 | CryptoZephyr/herkos | C2 |
| 35 | Derojuu/VaultDrop | C7 |
| 36 | LSUDOKO/Wraith | C4 |
| 37 | Lukeknow0/flare-payflow-guard | C1 |
| 38 | Marc-Dvci/BridgeSafe | C6 |
| 39 | NoBanks/traide-flare | C9 |
| 40 | Pandey456/VeilMarket | C8 |
| 41 | PugarHuda/buta | C4 |
| 42 | PugarHuda/undelayed | C1 |
| 43 | Terese678/schoolsave-flare | C9 |
| 44 | bolajiev/drip | C3 |
| 45 | danielamodu/Warden | C3 |
| 46 | davre001/UMBRA | C4 |
| 47 | envexx/FlareOne | C9 |
| 48 | huangharen/xrpflow-flare | C3 |
| 49 | huzi0000/milestonex-flare | C3 |
| 50 | luongs3/flare-confidential-settle | C7 |
| 51 | mashharuki/Flare-Summer-Signal-Hackathon-2026 | C5 |
| 52 | mystiquemide/jorqeth | C3 |
| 53 | pplmaverick/flare-prediction-market | C8 |
| 54 | thesithunyein/cipher-sign | C6 |
| 55 | Bsh54/aegisflow | C7 |
| 56 | Cubiczan/flareintel | C10 |
| 57 | DiveshChauhan123/flare_ | C3 |
| 58 | EndPx/whisperdesk | C4 |
| 59 | KingBeeee/cuddly-lamp | C5 |
| 60 | Theophilus20/flarecredit | C5 |
| 61 | Webghost01-NG/flare-pulse-ai | C10 |
| 62 | Webghost01-NG/relaypay | C3 |
| 63 | anoopbalan25-creator/proofvault | C7 |
| 64 | captainebru84-sudo/ward | C6 |
| 65 | cyberrockng/workproof | C7 |
| 66 | holyaustin/PortalFX | C1 |
| 67 | onchaindc/RippleFi | C9 |
| 68 | priyaraghavan23/flare-fee-dashboard | C10 |
| 69 | vibenedict/flavest | C10 |
| 70 | Alike001/fasset-sentry | C2 |
| 71 | Cassxbt/fxrp-dark-rfq | C4 |
| 72 | Folawewo/flareshield | C2 |
| 73 | Hugegreencandle/fassets-verify | C2 |
| 74 | Kenny-svg/flareramp | C1 |
| 75 | Marvy247/Umbra-Protocol | C4 |
| 76 | Milites-Christi/prv1311-flare-submission | C10 |
| 77 | Rasslonely/NexusXRP | C1 |
| 78 | ShalyX/private-fxrp | C4 |
| 79 | argenestel/fxrproute | C1 |
| 80 | davife2025/polycast | C8 |
| 81 | hari-hara-sudharsan/XRPShield | C2 |
| 82 | luongs3/flare-firegate | C3 |
| 83 | major101x/midpoint | C4 |
| 84 | martin-gedyk/paigold | C7 |
| 85 | riush03/Veri | C1 |
| 86 | seekdaseek/haircut | C2 |
| 87 | sofiadaniellarossi-cmd/fxrp-vault | C9 |
| 88 | SealedFlare | C4 |
| 89 | StacksBit Flare | C1 |
| 90 | Balary | C12 |
| 91 | VeriFlow AI | C7 |
| 92 | Denarii Orchestrator | C6 |
| 93 | FLEC Hub | C12 |
| 94 | G1 | C1 |
| 95 | FlareGPT | C10 |
| 96 | RebalanceKeeper FCC extension | C12 |
| 97 | CAVOK | C6 |
| 98 | FlareClaw | C6 |
| 99 | TEE-enforced agent authorization | C6 |

## Gate-Only Collision Appendix

### Named high-threat comparisons

Ballast, Cinder, Backstop, CreditGate, Keyless, Vouchsafe, Veil, SealedFi, Heirloom, fassets-verify, Faktura, Haircut, XRPShield, UMBRA, Wayafee, Balary, VeriFlow AI, Buta, AegisFlow, and Adumbra.

### Saturated surfaces

- Confidential OTC, dark pools, RFQ, auctions, routing, private perpetuals, hidden stops, and private strategy vaults.
- Generic oracle, risk, gas, price, and yield dashboards.
- Simple FXRP vaults, wallets, savings, payroll, payments, lending, and minting front ends.
- Generic escrow, merchant checkout, milestone release, and invoice flows.
- XRP inheritance.
- Confidential AML/compliance screening.

### Collision rule

After raw ideas are durably recorded, compare each against all 99 named signals and the multi-label density map. Kill an overlap unless it changes the target user, load-bearing mechanism, necessary outcome, and joined proof path materially. Absence from this public corpus is not proof of global novelty.
