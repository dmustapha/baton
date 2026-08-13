# Round 3 Post-Freeze Hard Gate — Generators A and B

Date: 2026-08-13  
Scope: all eight frozen ideas in `generator-a.md` and `generator-b.md`  
Method: non-compensating Warroom Gates 0, 0b, 1, 2, 3, 3b, 3c, 4a, 4b, 5, and 6, plus the round-two global plain-language substitution and independent novelty/demo floors. No quota was preserved and no scoring was performed.

## Binding evidence baseline

- The active contract path for a hash-memo Smart Account mint is `AssetManagerFXRP.executeDirectMintingWithData(IXRPPayment.Proof, bytes)` → `MasterAccountController.handleMintedFAssets` → `PersonalAccount.executeUserOp(Call[])` → `UserOperationExecuted`. The controller already checks the committed `keccak256(PackedUserOperation)`, sender, and nonce; if any inner call fails, the entire Flare transaction rolls back. [Official custom-instruction documentation](https://dev.flare.network/smart-accounts/custom-instruction)
- Smart Accounts already provide `0xE0` failed-mint recovery, `0xE1` nonce fast-forward, `0xE2` executor-fee replacement, `0xD0` pin, `0xD1` unpin, and permissionless execution after the exclusive window. [Official Smart Accounts overview](https://dev.flare.network/smart-accounts/overview)
- FAssets redemption is protocol-assigned from a FIFO ticket queue. `redeemAmount` and `redeemWithTag` already handle a partial *requested redemption* by returning the unprocessed amount through `RedemptionAmountIncomplete`; `redemptionPaymentDefault(IReferencedPaymentNonexistence.Proof,uint256)` handles agent non-payment. These interfaces do not expose an application-controlled “pay the remainder” transition that aggregates an agent's partial XRP payments. [Official redemption flow](https://dev.flare.network/fassets/redemption), [official `IAssetManager`](https://dev.flare.network/fassets/reference/IAssetManager)
- FAssets protocol addresses must be resolved through `FlareContractRegistry.getContractAddressByName` or `getContractAddressByHash`; the canonical registry is `0xaD67FE66660Fb8dFE9d6b1b4240d8650e30F6019`. [Official Contract Registry guide](https://dev.flare.network/network/guides/flare-contracts-registry)
- The accessible FCC/FCE builder route is a Coston2 user extension: an `InstructionSender` calls `TeeExtensionRegistry.sendInstructions`, data providers and `ext-proxy` relay to `POST /action`, and the result is returned as a signed `ActionResult`. The official walkthrough uses `SIMULATED_TEE=true`, requires an indexer-backed proxy, and does not establish production hardware isolation. [Official FCC getting-started guide](https://dev.flare.network/fcc/guides/getting-started)
- A project contract can verify an FCC result by reconstructing the domain-separated `ActionResult` hash and recovering the registered machine signer before changing project-owned state. That proves result verification, not authority over an agent wallet, incumbent vault, or buyer system. [Official signed-result example](https://dev.flare.network/fcc/guides/weather-insurance-extension)
- XRPFi demand is real: Flare reports about $200M XRP TVL and 3.4M+ FXRP DeFi transactions across about 16.5K users. Xaman and D'CENT are named wallet distribution paths. This proves holder/vault activity, not demand for every confidential overlay. [Flare XRPFi report](https://flare.network/news/xrpfis-next-phase), [Xaman integration](https://flare.network/news/one-click-defi-vault-xaman-flare-smart-accounts), [D'CENT integration](https://flare.network/news/flare-and-dcent-bring-one-flow-institutional-yield-to-xrp-holders-worldwide)
- FCC/FCE's verified current boundary is builder access and Coston2 simulated execution, not an established paying market for arbitrary user-defined confidential applications. Market demand therefore has to come from the underlying holder, agent, executor, or authorized treasury workflow; FCC cannot create the buyer.

## Result matrix

`PASS` in an intermediate column means only that this one gate is not independently fatal. `KILL` means the idea fails that non-compensating gate. `N/A after kill` is not used: every requested hard test was still applied.

| Idea | Gate 0 market reality | Gate 0b authority/interfaces | Native-substitute conflict | Plain-language/global prior art | Dual-track removal | Novelty floor | Demo floor | Buildability | Final |
|---|---|---|---|---|---|---|---|---|---|
| A1 Intent Lifeboat | PASS buyer class; pain partly native-handled | **KILL** no complete two-phase FCC-result → precommitted user-op interface | **KILL** hash, nonce, atomic rollback, `0xE0/E1/E2` already protect the cited failures | **KILL** expiring guard + circuit breaker + compensating fallback | **KILL** FCC policy is not necessary to the native recover-to-Personal-Account outcome | **KILL** below independent 7/10 mechanism/composition floors | PASS as a staged failure demo | **KILL** FDC + FCC proxy/indexer + Smart Account + vault in remaining time | **KILL** |
| A2 Redemption Triage Receipt | PASS agent role/fees/private policy | **KILL** FCC result cannot enforce the agent-owned XRPL payment; no exact gating signer interface | PASS only for residual pre-payment policy; native default remains substitute | **KILL** private counterfactual approval/abstention is established transaction-policy prior art | **KILL** removing FCC leaves the same authorized agent payment and FDC close | **KILL** below user-visible and composition floors | Conditional; needs a real assigned redemption and agent wallet | **KILL** unavailable authorized agent scenario plus FCC/FDC latency | **KILL** |
| A3 Private Unwind Covenant | PASS holder/vault market and private risk bound | **KILL** no named vault or exact withdraw interface; “existing strategy” is unresolved | PASS; manual/native vault withdrawal is a substitute, not a contradiction | **KILL** stop-loss/circuit breaker + expiring approval; GhostFund/private-vault repeat | PASS technically if a real vault were named | **KILL** below all novelty floors and event-local private-vault surface is saturated | PASS as a visual unwind/abstain flow | **KILL** missing target integration plus FCC operational load | **KILL** |
| A4 XRP Treasury One-Time Rail | **KILL** no actual XRP-funded pilot, organization, or reachable first five | **KILL** no authorized treasury source, recipient, accounting interface, or deployable buyer system | **KILL** accounting approval, allowlists, multisig, and idempotency already do the job | **KILL** one-time approval + duplicate suppression + private policy | Technically separable, but buyerless composition cannot pass | **KILL** below user-visible and composition floors | PASS only as a fixture; fixture is not demand | PASS for a project-owned demo, **KILL** for the claimed end-to-end product | **KILL** |
| B1 AfterMint | PASS holder activity and proof-delay pain | **KILL** post-proof FCC disposition is not wired to an exact pre-authorized Smart Account call | **KILL** retry-same-proof, `0xE0`, nonce replay protection, and holder-controlled landing already exist | **KILL** saga/idempotency + intent commitment + hold/abstain | **KILL** native safe hold/recovery survives removal of FCC | **KILL** below independent novelty floors | PASS; late proof and duplicate refusal are legible | **KILL** joined FDC/FCC/Smart Account path is too broad for the deadline | **KILL** |
| B2 Remainder Rail | **KILL** claimed recurring “partial agent payment then exact remainder” workflow is not evidenced | **KILL** no published FAssets interface aggregates a remainder payment into completion | **KILL** partial requested redemption and non-payment/default already have native paths | **KILL** compensating transaction + private approval | **KILL** the proposed interoperable transition is not callable; FCC is advisory to the agent | **KILL** below all novelty floors | PASS only with a deterministic fixture; fixture cannot prove the protocol transition | **KILL** relies on a nonexistent/undefined close interface | **KILL** |
| B3 Relay Epoch | PASS executor role, fees, and private credentials | **KILL** no native executor-epoch mutation controlled by the app; replacement eligibility is not created by FCC | **KILL** immutable hash check, nonce, pin/unpin, fee replacement, and permissionless relay already cover the cited integrity/availability states | **KILL** failover + session/epoch key + preflight guard | **KILL** FCC does not add owner authority and the exact-byte guarantee already survives without it | **KILL** below independent novelty floors; close to Backstop/AgentTreasury/EdgeLedger | PASS as a machine-failure timeline | **KILL** two executors + FDC + FCC proxy/indexer + live asset target | **KILL** |
| B4 LedgerTwin | **KILL** no evidenced XRP-funded pilot or existing paired XRP-receipt/FXRP-payment workflow | **KILL** no authorized business/accounting source or counterparty integration | **KILL** incumbent accounting, idempotency, approvals, and reconciliation are native substitutes | **KILL** duplicate suppression + private invoice commitment + conditional payment | Technically separable, but the asset loop is invented/bolted on | **KILL** below user-visible and composition floors | PASS only as a seeded invoice fixture | PASS for project state; **KILL** for claimed buyer workflow | **KILL** |

## Per-idea evidence and cause of death

### A1 — Intent Lifeboat — KILL

**Plain-language substitution:** “A hidden policy checks a signed transaction and chooses execute, fallback, or stop.” This is a pre/post transaction guard plus circuit breaker, expiring approval, and compensating fallback. The global registry already records Safe Guards, expiring approvals, saga/compensating transactions, and circuit breakers. No new user-visible state transition remains after sponsor names are removed.

**Gate 0 / native substitute:** The holder and executor workflow is real, but the claimed payload-mismatch and nonce failures are already prevented or recovered natively. `keccak256(_data)` must equal the XRPL commitment, nonce must match, any failed inner call atomically reverts, and `0xE0/E1/E2` recover failed mint, nonce, and fee states. The product therefore cannot claim that it uniquely detects executor substitution or rescues generic stuck execution.

**Gate 0b:** The frozen map jumps from an FCC signed branch code to a precommitted `0xFE` user operation. But the `PackedUserOperation` hash is fixed in the earlier XRPL payment, while the FCC `ActionResult` is asynchronous and produced later. A workable design would need an exact two-phase project contract state machine: precommitted call → `sendInstructions` → proxy result → verified permit stored under the same commitment → later authorized execution. That interface, its caller, and its receipt are absent. “Verifier/router” is not an exact public interface.

**Dual-track removal:** Without FCC, the owner still gets the native guaranteed outcome after a failed custom instruction: recover FXRP to the Personal Account with `0xE0` and submit a fresh current-nonce action. FCC changes policy UX, not the necessary holder-controlled recovery outcome.

**Prior/collision:** Event-local C1 entry/routing projects already crowd guided minting and exception UX. Globally the mechanism is an expiring guard/circuit breaker. It does not reach the independent 7/10 user-visible or protocol-composition novelty floors.

**Build/demo:** The visual branch is clear, but completing live FDC, FCC's support/indexer-dependent simulated extension, Smart Accounts, project router, and a real vault before the deadline is not credible for one builder.

### A2 — Redemption Triage Receipt — KILL

**Plain-language substitution:** “A private treasury simulation recommends the permitted payment amount or tells the operator not to pay.” This is established maker-checker/policy-engine and bounded-approval behavior.

**Gate 0:** The registered FAssets agent, fee flow, collateral exposure, private keys, liquidity plan, and internal thresholds are evidenced. This is the strongest market anchor in the batch.

**Gate 0b:** The decisive external action is an XRP payment from the agent-owned wallet. FCC can sign a recommendation, and a Flare verifier can verify it, but neither controls that XRPL signer. The idea names no current agent-wallet API, signing module, or contract-enforced interface that rejects a payment lacking the FCC envelope. The official public `IAssetManager` surface accepts proofs and manages protocol state after the external payment; it does not make the FCC envelope mandatory for the agent wallet. A human “checks and authorizes” is advisory integration, not a callable gate.

**Dual-track removal:** Remove FCC and the same authorized agent can still send the required XRP and use the existing proof path. The confidential result does not create the payment authority or protocol acceptance rule, so the claimed bounded-payment guarantee is not end to end.

**Native substitute:** FDC and `redemptionPaymentDefault` already close non-payment; agent console/internal controls govern pre-payment policy. The idea may improve an agent's internal process, but it does not establish a new enforceable asset outcome.

**Prior/collision:** The 99-signal C2 cluster is dense with FAssets risk, assurance, and exception products. The global mechanism is private counterfactual approval plus abstention, and Dami's RefiRail/Mirror work is adjacent. It fails the user-visible novelty floor even though the Flare setting is relevant.

**Build/demo:** A credible demo needs a real assigned redemption, authorized agent wallet, FCC extension, XRP payment, FDC proof, and updated FAssets state. The frozen idea permits “live where available,” which is not a resolved boundary and fails the deadline gate.

### A3 — Private Unwind Covenant — KILL

**Plain-language substitution:** “A secret stop-loss threshold triggers a bounded withdrawal, and stale data makes it abstain.” This is a familiar stop-loss/circuit-breaker with expiring authorization.

**Gate 0:** FXRP holders, wallet channels, vault deposits, withdrawals, and naturally private risk thresholds are evidenced. The holder can authorize its own asset, so buyer authority is credible.

**Gate 0b:** The asset transition remains “existing strategy withdraw interface.” No named vault, address, ABI, withdrawal method, share-token flow, settlement delay, or receipt is specified. Contract Registry resolves Flare protocol contracts; it does not resolve arbitrary third-party vaults. An ERC-20 balance change cannot substitute for proving withdrawal from the claimed strategy.

**Prior/native substitute:** The current substitute is the vault's existing withdrawal plus manual risk monitoring. Globally the mechanism is a circuit breaker and expiring permission. Event-locally, SealedFi, Autopilot, FXRP vault projects, private strategy products, and the C9 cluster cover essentially the same user/mechanism/outcome/proof path. Dami's shipped GhostFund is a direct private-yield-vault and confidential allocation/exit-policy repeat. This independently kills Gate 4a.

**Dual-track:** The removal tests could pass if a concrete vault and genuinely private policy-controlled unwind existed. That technical possibility cannot compensate for the missing exact integration, direct prior repeat, saturated surface, and failure of all three novelty floors.

**Demo/build:** A 90-second unwind/abstain demo is imaginable, but without a concrete vault it is only project-controlled token movement. Adding the real vault plus FCC proxy/indexer path is not buildable in the remaining time.

### A4 — XRP Treasury One-Time Rail — KILL

**Plain-language substitution:** “Private invoice rules issue a single-use payment approval and reject duplicates.” This is idempotency/duplicate suppression plus an expiring scoped approval and ordinary accounts-payable policy.

**Gate 0:** The frozen idea says only “an evidenced crypto-native SME or payment operator” but names no organization, pilot, authorized workspace, existing counterparty, or first-five-user route. The market map expressly says broad payment volume is insufficient and only an actual XRP-funded pilot qualifies. No such pilot is supplied. The buyer and decisive private dataset are therefore conditional placeholders.

**Gate 0b:** The only exact callable transition is a project contract transferring FXRP from a project/holder-controlled account. There is no external accounting source for the invoice/approval graph, no authorized treasury integration, no identified counterparty interface, and no receipt joining the business obligation to the transfer. Project-created nonce state proves only project idempotency.

**Native substitute / ecosystem fit:** Private accounting systems, maker-checker, multisig/custody policy, allowlists, and idempotency already solve the ordinary problem. A bank or non-Flare treasury has the same job. FXRP and FCC are therefore bolted onto a generic invoice-payment problem, which independently fails Gate 6.

**Dual-track/novelty:** The technical composition can make both calls load-bearing inside a project contract, but the underlying user outcome is still a familiar single-use approval. Protocol composition cannot repair a below-floor user-visible mechanism or an invented adoption path.

**Demo/build:** A fixture can show release then replay refusal in 90 seconds, but fixture invoices and project-funded FXRP are not market evidence. The code may be buildable; the claimed product is not operable.

### B1 — AfterMint — KILL

**Plain-language substitution:** “A delayed job is matched to an earlier private intent, then completed, held, or rejected as a duplicate.” This is an idempotent saga/reconciliation workflow with an intent commitment.

**Gate 0 / native substitute:** Proof latency and abandonment are real, but official Smart Account handling already says a delayed mint must be retried with the same proof after `executionAllowedAt`; duplicate-nonce attempts are rejected; `0xE0` recovers FXRP to the holder's Personal Account without executing the failed instruction. “Safe holder-controlled landing” therefore already exists without FCC.

**Gate 0b:** The frozen authority map says the verifier “permits” a pre-authorized Smart Account action but gives no exact two-phase callable interface tying the later FCC result to the earlier `PackedUserOperation` hash. Holding FXRP in the Personal Account is not a call at all; deploying later requires a fresh holder-authorized operation unless an exact precommitted project contract state machine is specified. That transition is absent.

**Dual-track removal:** Remove FCC and the duplicate is still rejected by nonce/XRPL-transaction replay rules, while failed execution still lands in the native `0xE0` recovery path. Private portfolio preference may choose a later strategy, but it is not necessary to the missing recovery outcome.

**Prior/collision:** It collides strongly with A1 in the same frozen batch and with the C1 mint/routing cohort. Globally it is saga + idempotency + guarded disposition, below the independent novelty floors.

**Demo/build:** The late-proof UI is strong, but the full FDC delay, FCC simulated extension, result verifier, Smart Account operation, and real strategy action are too broad for the remaining build window.

### B2 — Remainder Rail — KILL

**Plain-language substitution:** “After a partial payment, a private policy authorizes the unpaid remainder and proves completion.” This is a compensating transaction plus bounded approval.

**Gate 0:** The official protocol supports partial *redemption requests* when ticket availability or ticket-count caps prevent the whole requested amount. It emits `RedemptionAmountIncomplete`, and the redeemer may call `redeemAmount` again. That is not evidence that an agent can partially pay one assigned XRP redemption and later submit an aggregate “remainder proof.” The claimed recurring workflow is unsupported by the cited market evidence.

**Gate 0b:** No exact public `IAssetManager` method is identified that accepts two XRP payment proofs or aggregates a first payment plus remainder into one completed request. The published surface exposes `redeem`, `redeemAmount`, `redeemWithTag`, and `redemptionPaymentDefault`; the frozen “published FAssets interface processes the proof” is not a function name. A deterministic fixture cannot stand in for a protocol state transition.

**Native substitute:** For an unprocessed requested remainder, the user calls `redeemAmount`/`redeemWithTag` again. For non-payment, the redeemer/executor uses `redemptionPaymentDefault` with FDC nonexistence proof and receives collateral compensation. The product both conflates the two native states and duplicates their correction paths.

**Dual-track:** Because the purported remainder-close transition is not callable, the Interoperable Asset track fails before FCC is considered. FCC can recommend a payment but cannot make the unsupported proof valid.

**Novelty/demo/build:** Compensating payment plus private approval is below all novelty floors. A seeded partial-payment demo could look clear, but it would falsely represent project fixtures as native FAssets completion and is therefore inadmissible and unbuildable as claimed.

### B3 — Relay Epoch — KILL

**Plain-language substitution:** “After a worker fails, a replacement rechecks a private job under the current session policy and either runs the exact job or refuses it.” This is standard failover, session/epoch keys, and preflight guarding.

**Gate 0:** Smart Account operator/executor work, fees, private credentials, and availability failures are evidenced.

**Gate 0b/native substitute:** The native controller already makes byte substitution impossible by checking the committed hash, makes replay impossible through nonce and XRPL transaction ID, supports executor pin/unpin and fee replacement, and becomes permissionless after the exclusive period. The frozen idea does not identify a native `setExecutorEpoch` or comparable interface; its “machine epoch” exists only in project/FCC state. FCC checking an operator credential cannot expand or transfer the XRPL owner's authority, and any eligible executor already relays the same immutable bytes.

**Dual-track removal:** Remove FCC and the exact-byte and owner-authorization guarantees remain intact. The replacement executor can use the native path; private availability policy is an operator-internal choice, not a necessary asset guarantee.

**Prior/collision:** The 99-signal C6 cluster contains Keyless, Aegis, Tacit, Cipher Sign, Ward, CAVOK, FlareClaw, Denarii Orchestrator, and other policy/signer systems. Dami's Backstop and AgentTreasury, plus in-flight EdgeLedger, already cover bounded authorization, signer separation, policy gating, abstention, and reconciliation. Globally, failover/session keys/guards are mature. The idea fails all independent novelty floors.

**Demo/build:** Killing one executor and showing a second relay is visually legible, but two executor services, FCC proxy/indexer, FDC, Smart Account proof, and a live FXRP target are not credible for one builder at the current deadline.

### B4 — LedgerTwin — KILL

**Plain-language substitution:** “A private invoice commitment consumes an incoming payment and prevents a second outgoing settlement.” This is cross-ledger reconciliation plus idempotency and conditional payment.

**Gate 0:** Broad XRP payments and private invoice workflows exist, but no current business is identified that receives XRP for an obligation and then pays the same obligation again in FXRP. The frozen idea names a generic crypto-native SME/payment operator and makes admission conditional on a pilot that it does not provide. The paired source-XRP/FXRP flow, buyer, and first users are invented at gate time.

**Gate 0b:** FDC can attest an XRP payment and a holder-owned Smart Account can transfer FXRP, but no authorized business accounting source maps either transfer to the same invoice. The frozen map omits a real invoice API, treasury account, approval source, named counterparty, and pilot receipt. The project commitment proves only project-owned duplicate state.

**Native substitute/ecosystem fit:** Existing accounting systems, approval workflows, idempotency keys, multisig/custody controls, and reconciliation already address duplicate settlement. A plain SaaS treasury has the same problem. The idea fails Gate 6 because FXRP/FCC composition is not the source of the job.

**Dual-track/novelty:** Both technical legs can be made mandatory inside a demo contract, but the user-visible mechanism remains ordinary duplicate suppression. The event-local C3 payment/invoice cluster is saturated, including Faktura, VeriPay, RelayPay, and related settlement projects. It does not meet the independent user-visible or composition novelty floors.

**Demo/build:** A replay-refusal demo is easy with seeded invoices and project FXRP, but those fixtures do not prove the business workflow. End-to-end operability remains killed.

## Survivor interface ledger

No idea survived. Therefore there is no survivor for which a complete actor/interface/network/live-boundary/receipt ledger can truthfully be enumerated. Isolated callable components exist, but preserving an idea because one component is callable would repeat the round-two evaluation failure:

| Isolated component | What it proves | What it does not prove |
|---|---|---|
| `executeDirectMintingWithData` / `executeUserOp` | An XRPL-authorized Smart Account operation can execute atomically on Flare | Demand for a new recovery overlay, a later FCC permit wired into the earlier commitment, or a named vault action |
| `TeeExtensionRegistry.sendInstructions` + signed `ActionResult` verification | A Coston2 simulated FCC extension can compute and sign a result that a project contract verifies | Production TEE isolation, authority over an agent/treasury wallet, or adoption by a buyer |
| `redeemAmount` / `redeemWithTag` / `redemptionPaymentDefault` | Native redemption and default paths are callable | Application-controlled assignment or aggregation of an agent's partial XRP payments |
| FXRP `transfer` | Holder/project-controlled FXRP can move | An invoice, agent duty, vault withdrawal, business adoption, or external settlement workflow |

## Final gate outcome

- Survivors: **0 / 8**
- Killed by Gate 0 market reality: **A4, B2, B4**
- Killed by Gate 0b authority or exact-interface incompleteness: **all 8**
- Killed by native-substitute conflict: **A1, A4, B1, B2, B3, B4**
- Killed by global plain-language prior art or Dami repeat: **all 8**
- Killed by dual-track removal or missing track transition: **A1, A2, B1, B2, B3**
- Killed by novelty floors: **all 8**
- Demo floor alone: no idea is killed solely for visual clarity; the demos are often legible, but fixtures and isolated token transfers cannot cure other hard-gate failures.
- Buildability: only the project-owned treasury fixture code is narrow enough, but the claimed market product is not operable. The integration-heavy native concepts are not credible for one builder before the submission cutoff.

The correct result is an empty survivor set. Gate strictness is not relaxed because the task explicitly forbids quota preservation, and the failures are primarily market authority, native-substitute, exact-interface, and novelty failures rather than merely conservative implementation estimates.
