# Round 3 Post-Freeze Gate — Generators C and D

Date: 2026-08-13  
Mode: strict, non-compensating gates; no scoring and no survivor quota  
Ideas audited: 8  
Result: **0 PASS / 8 KILL**

## Evidence and interface baseline

The binary decisions below use the complete Round 3 market-reality map and appendix, all three Round 3 market research files, the Round 2 global mechanism registry and market-reality correction, the active brief, the complete Warroom gate contract, the reconciled 99-signal registry/opportunity/collision materials, and the current Dami prior/in-flight analysis. Primary official sources were rechecked on 2026-08-13.

The exact public boundary matters:

- **Smart Account direct mint:** on XRPL the owner sends a `Payment` with opcode `0xFE` and `keccak256(PackedUserOperation)`. On Coston2 (`chainId 114`) an executor calls `IAssetManager.executeDirectMintingWithData(IXRPPayment.Proof,bytes)`. `MasterAccountController` natively checks the committed hash, sender, current `getNonce(personalAccount)`, pinned executor when set, and transaction replay; it then calls controller-only `IPersonalAccount.executeUserOp(Call[])`. Any inner revert rolls the entire Flare transaction back, so no FXRP is minted. Receipts are `UserOperationExecuted`, the Flare transaction, and FXRP balance change. The official failure path is opcode `0xE0`; `0xE1` advances an abandoned nonce and `0xE2` replaces an executor fee. [Custom Instruction](https://dev.flare.network/smart-accounts/custom-instruction), [IMasterAccountController](https://dev.flare.network/smart-accounts/reference/IMasterAccountController), [IPersonalAccount](https://dev.flare.network/smart-accounts/reference/IPersonalAccount).
- **FAssets mint/redemption:** resolve the FXRP Asset Manager with `ContractRegistry.getAssetManagerFXRP()`, not a hardcoded address. Public calls include `executeDirectMinting`, `executeDirectMintingWithData`, `redeem`, `redeemAmount`, `redeemWithTag`, and `redemptionPaymentDefault`. Redemption assignment is protocol FIFO and public through `RedemptionRequested`; the agent alone controls its XRPL payment. Native default compensates the redeemer from collateral after an FDC non-payment proof. [IAssetManager](https://dev.flare.network/fassets/reference/IAssetManager), [Redemption](https://dev.flare.network/fassets/redemption), [default guide](https://dev.flare.network/fassets/developer-guides/fassets-redemption-default), [Contract Registry](https://dev.flare.network/network/guides/flare-contracts-registry).
- **FCC/FCE:** the accessible one-builder path is a project `InstructionSender` calling `TeeExtensionRegistry.sendInstructions`, an `ext-proxy` relaying to the extension's `POST /action`, a signed `ActionResult`, and project-contract signature verification. The official Coston2 scaffold uses `SIMULATED_TEE=true` unless separately deployed and attested. A result signature proves represented execution, not permanent secrecy or absence of copies. [FCC getting started](https://dev.flare.network/fcc/guides/getting-started), [private-key extension](https://dev.flare.network/fcc/guides/sign-extension), [signed-result verification example](https://dev.flare.network/fcc/guides/weather-insurance-extension).
- **PMW:** the Developer Hub still labels Protocol Managed Wallets **in development**. STP.13 says Foundation machines at launch are used for system extensions and that user-deployed machines/apps are not utilized at launch. No idea may treat PMW as a current third-party signing interface. [Developer Hub](https://dev.flare.network/), [STP.13](https://proposals.flare.network/STP/STP_13.html).
- **Deployed contract evidence:** official references publish the Coston2 FAssets and Smart Account deployments; production code must still resolve mutable protocol addresses through Contract Registry. [FAssets reference](https://dev.flare.network/fassets/reference), [Smart Accounts reference](https://dev.flare.network/smart-accounts/reference).

## Gate ledger

`PASS` means that gate alone was met. `KILL` means the idea independently dies at that gate; later passes cannot compensate.

| Idea | Gate 0 market reality | Gate 0b authority + exact interfaces | Native substitute conflict | Global prior art + plain-language substitution | Dual-track removal | Novelty/demo floors | One-builder buildability | Final |
|---|---|---|---|---|---|---|---|---|
| C1 LateLatch | PASS on holder, current XRP→FXRP flow, private pre-execution bounds, self-authorization, and wallet distribution; KILL on switch: the claimed aftercare does not beat atomic rollback plus native recovery for the named failure | **KILL:** no exact target strategy, `park FXRP` contract/function, or post-proof FCC-to-mint ordering is named; “published application interface” is not a callable row | **KILL:** Smart Accounts already enforce exact bytes, nonce, atomic rollback, skip-memo recovery, fee replacement, and permissionless execution | **KILL:** “after a delayed transfer, apply a pre-agreed fallback or stop” is a saga/circuit-breaker plus expiring approval; it is also the Round 2 G1 interrupted-intent family | PASS in theory only: FXRP action and private policy are separately necessary if a real gate exists | **KILL:** familiar timeout/fallback mechanism and a native recovery screen do not clear either independent floor | PASS only as an honestly simulated project-contract demo; not a live claimed recovery integration | **KILL** |
| C2 Redemption Brake | **KILL:** the agent workflow and private treasury policy are real, but no primary evidence shows an agent switching from internal policy tooling to a publicly verified FCC approval; the result has no relying party beyond the same agent | **KILL:** no exact agent-wallet signing API is supplied; PMW is unavailable; no current public FAssets pre-payment policy hook makes the project verifier authoritative; “published lifecycle interface” is not the exact success-proof call | PASS narrowly: it does not replace FIFO/default if framed only as agent pre-payment control; any claimed alternative recovery would conflict with native default | **KILL:** in plain language this is a private transaction policy engine/maker-checker with an abstain state; mature policy-signing and pre/post-guard prior art already provides it | **KILL:** without FCC the agent's existing private backend can run the same check and the agent can still pay; FCC is attestable plumbing, not a necessary buyer outcome | **KILL:** a private allow/deny payment policy is below the novelty floor; a fixture redemption plus refusal is below the real-demo floor | **KILL:** a credible live path needs a cooperating registered agent, live assignment, authorized XRPL signer, FDC timing, and an exact success-proof interface; the idea supplies none | **KILL** |
| C3 RelayProof | PASS on a real fee-earning executor workflow, private pre-submission bytes, and reachable operator channel | **KILL:** the proposed “Personal Account gate” is not an insertable protocol hook; `executeUserOp` is controller-only and an unrelated existing vault does not consume the project witness | **KILL:** `0xFE` already commits the exact bytes; the controller natively checks hash, sender, nonce, pinned executor and transaction replay, then atomically emits `UserOperationExecuted` | **KILL:** “one-use signed execution capsule with expiry and bounds” is expiring approval/session-key/guard prior art; Round 2 G10 and Dami's EdgeLedger/Backstop family are adjacent | **KILL:** removing FCC leaves the core promised payload-integrity, failover, and replay guarantees intact because Smart Accounts already enforce them | **KILL:** changed-byte and replay rejection are native behavior, so neither user-visible mechanism novelty nor demo surprise clears the floor | PASS for reproducing the native flow plus a project verifier, but that only proves redundant code | **KILL** |
| C4 ExitWindow | PASS on holder-controlled FXRP positions and naturally private exit bounds; KILL on a specific current failure/buyer switch because no named live strategy or operator is supplied | **KILL:** “existing strategy,” withdrawal function, route-disappearance source, and FTSO/FDC trigger are unspecified; `may supply` and `live/fixture` are not exact rows | KILL where it merely wraps a vault's own withdrawal and wallet alerts; no residual failure is proved | **KILL:** “secret stop-loss/emergency withdrawal with expiry” is a familiar guard/circuit breaker; Round 2 G5 explicitly rejected this family | PASS only for a hypothetical named vault whose withdrawal consumes the FCC result | **KILL:** saturated private-vault/guardian presentation does not clear novelty; an expired-envelope refusal is standard guard UX | **KILL:** no exact vault, trigger, receipt, or callable unwind exists in the proposal | **KILL** |
| D1 Agent Epoch Checkpoint | **KILL:** agent, fees, duty, and private credentials are real, but no evidence shows demand for a separate attested policy epoch over existing credential rotation and internal controls | **KILL:** only the agent owns the XRPL signer; no exact wallet interface or FAssets pre-payment hook consumes the FCC envelope; an application cannot make itself mandatory; PMW cannot fill the gap | PASS only if limited to internal preflight; native default remains the actual protocol safeguard | **KILL:** expiring authorization, session keys, signer rotation, and policy epochs are direct global prior art; it also approaches Dami's EdgeLedger/Backstop transaction-authorization loop | **KILL:** the agent can refresh policy, rotate credentials, and pay without FCC; the native asset obligation is unchanged | **KILL:** old-epoch refusal is established wallet-policy behavior and a replayed assignment is not sufficient demo surprise | **KILL:** real proof requires a cooperating agent and live assigned redemption; the public FCC scaffold remains simulated and support/indexer dependent | **KILL** |
| D2 Sealed Call Witness | PASS on the real executor workflow and private `0xFE` bytes before Flare execution | **KILL:** the claimed verifier duplicates the controller and cannot become a mandatory gate for arbitrary existing target contracts; no new authorized insertion interface is identified | **KILL:** this is an exact duplicate of native `keccak256(_data)==userOpHash`, nonce validation, atomic failure, transaction-ID replay protection, and event receipts | **KILL:** private inclusion accumulator plus one-use authorization is familiar; more importantly, the protocol already supplies the exact user-visible equality witness | **KILL:** removing FCC leaves inclusion equality and rejection unchanged; only a second signature disappears | **KILL:** the proposed hero demo is the official Smart Account hash-mismatch demo, so both floors fail | PASS as a small redundant wrapper, which does not cure any gate | **KILL** |
| D3 Late Mint Landing | PASS on holder-controlled mint flow, late-proof friction, private intent, and reachable wallet channels; KILL on a distinct missing outcome because native atomic failure already lands the user in a recoverable hold path | **KILL:** no named wallet partner, target vault contract/function, or callable post-mint landing hook is supplied; the three-way FCC action must exist before the atomic `executeDirectMintingWithData` call but the proposal does not map that ordering | **KILL:** on stale/failed target call, mint rolls back; `0xE0` then mints FXRP to the Personal Account without the original operation, which is the proposed `HOLD` outcome | **KILL:** “if an instruction is stale, hold funds instead of executing” is timeout/circuit-breaker/saga prior art and repeats Round 2 G1 | PASS only if a project landing contract and fresh FCC result are inserted, but that would be a new wrapper around the native hold outcome | **KILL:** countdown plus hold is legible but not novel or surprising against the documented native recovery | PASS as simulated UX around native recovery; KILL as the claimed new integrated product | **KILL** |
| D4 Confidential Treasury Net | **KILL:** it names no actual XRP-funded SME/pilot, invoice source, or first five users; the market file explicitly says broad payment volume is insufficient and stablecoin/fiat substitutes dominate | **KILL:** the only exact controllable transition is a project batch contract moving treasury-owned FXRP; invoice approval, obligation validity, and recipient confirmation have no current external interface or evidenced actor | **KILL:** accounting software, internal netting, idempotency keys, allowlists, multisig and custody policy engines already perform the job | **KILL:** “deduplicate approved invoices and batch net payments once” is standard netting plus duplicate suppression; payments/invoices are saturated locally and adjacent to Dami's GhostPay | **KILL:** removing FXRP yields the same accounts-payable batch in any asset; removing FCC yields the same private backend calculation, so both sponsor legs are interchangeable | **KILL:** generic batch compression and replay refusal clear neither floor | PASS for a project-owned fixture batch, but that does not pass market or authority gates | **KILL** |

## Complete per-idea gate notes

### C1 LateLatch — KILL

- **Gate 1 relevance / Gate 3 sponsor fit:** nominally relevant and uses both sponsor surfaces, but relevance cannot repair the market, substitute, interface, or novelty failures.
- **Gate 3b provenance:** PASS. It genuinely recombines the C1 late-payment edge, C10 abstention, and C11 continuity patterns.
- **Gate 4a Dami repeat:** PASS narrowly; no direct Dami product repeat. This does not cure its direct Round 2 interrupted-intent convergence.
- **Gate 4b competitor/catalog:** adjacent to the crowded asset-entry cohort and materially the same causal loop as Round 2 `LATE ROUTE × TAGBACK`. The proposed “park” branch is also the documented native outcome after `0xE0` recovery.
- **Gate 5 / Gate 6:** the countdown is concrete, but the mechanism is a generic fallback policy around a native atomic mint. The user-visible novelty and ecosystem-native residual outcome both fail.

### C2 Redemption Brake — KILL

- **Gate 1 / Gate 3:** FAssets operations are relevant and FCC/FDC would be technically non-trivial.
- **Gate 3b:** PASS. It traces C2 counterfactual recovery and C6 policy separation.
- **Gate 4a:** adjacent to AgentTreasury, Backstop, EdgeLedger and RefiRail's bounded authorization/repair receipts; not allowed to rely on the generic signed-minimal-result primitive as differentiation.
- **Gate 4b:** event-local FAssets assurance is dense: Ballast, Backstop, Vouchsafe, LedgerGuard, Haircut, XRPShield, FAsset Sentry, Herkos and fassets-verify already occupy risk/exception handling. The idea never reaches a new authorized repair transition.
- **Gate 5 / Gate 6:** the agent problem is Flare-native, but the actual product remains a conventional internal payment approval. No exact protocol transition makes the FCC result necessary.

### C3 RelayProof — KILL

- **Gate 1 / Gate 3:** relevant sponsor use is claimed, but it duplicates the sponsor's native guarantee.
- **Gate 3b:** PASS as a corpus recombination; provenance does not establish need.
- **Gate 4a:** high adjacency to Backstop/AgentTreasury/in-flight EdgeLedger's hash-bound policy, abstention and reconciliation loop.
- **Gate 4b:** the C6 signer-policy cluster is crowded by Keyless, Aegis, Tacit, Cipher Sign, Ward, BridgeSafe, CAVOK, FlareClaw and Denarii Orchestrator.
- **Gate 5 / Gate 6:** exact call integrity is ecosystem-native, but already solved inside `MasterAccountController`; the extra FCC witness is not load-bearing.

### C4 ExitWindow — KILL

- **Gate 1 / Gate 3:** a real FXRP unwind could fit the tracks, but the proposal never identifies one.
- **Gate 3b:** PASS. It uses the C9 bounded-unwind and C10 evidence-label patterns.
- **Gate 4a:** substantive overlap with Dami's GhostFund private allocation/exit policy and adjacency to RefiRail and ShadowDesk+/Axon.
- **Gate 4b:** direct collision with SealedFi, Autopilot, Haircut, Ballast and the saturated private-strategy/vault cohort. Round 2 G5 ordered this exact family not to advance.
- **Gate 5 / Gate 6:** the visual is concrete only after inventing an unspecified route failure and vault; absent those interfaces, it is generic stop-loss automation.

### D1 Agent Epoch Checkpoint — KILL

- **Gate 1 / Gate 3:** nominally relevant; FCC is not a buyer-required control and PMW is unavailable.
- **Gate 3b:** PASS. It traces C6 versioning and C2 abstention.
- **Gate 4a:** strong adjacency to Backstop, AgentTreasury and in-flight EdgeLedger; the forced-expiry variation is not enough once the external payment hook is missing.
- **Gate 4b:** same crowded signer-policy competitors as C3, plus Round 2 G10 `MANDATE ZERO × SPLITLOCK`.
- **Gate 5 / Gate 6:** a live redemption countdown is concrete, but the visible old-epoch refusal is a familiar permission control and does not control FAssets itself.

### D2 Sealed Call Witness — KILL

- **Gate 1 / Gate 3:** sponsor-shaped but redundant.
- **Gate 3b:** PASS. The private-inclusion pattern is genuinely traced from C4 into C1.
- **Gate 4a:** adjacency to EdgeLedger's hash-bound authorization.
- **Gate 4b:** crowded C6 policy-signing field; native Smart Accounts are the closest and dispositive prior art.
- **Gate 5 / Gate 6:** no new mechanism survives removal of the FCC witness. The exact changed-byte, nonce and replay failures are already judge-visible native receipts.

### D3 Late Mint Landing — KILL

- **Gate 1 / Gate 3:** relevant and technically composable only through an additional project gate.
- **Gate 3b:** PASS. It directly uses C1's late-payment edge and C10's freshness/abstention pattern.
- **Gate 4a:** no direct Dami repeat.
- **Gate 4b:** repeats Round 2 G1 and sits beside Wayafee, Rill, Undelayed, PortalFX, FlareRamp and other asset-entry flows; the purported missing hold outcome is native.
- **Gate 5 / Gate 6:** clear countdown, but the product is a wrapper over atomic rollback and `0xE0`, not a new chain-native state transition.

### D4 Confidential Treasury Net — KILL

- **Gate 1 / Gate 3:** payments can be useful, but this is the wrong hackathon frame under Gate 6: ordinary accounts payable with FXRP/FCC attached.
- **Gate 3b:** PASS as a C3+C6 recombination, but corpus provenance cannot replace demand.
- **Gate 4a:** payment-domain adjacency to GhostPay and signed-policy adjacency to AgentTreasury/EdgeLedger.
- **Gate 4b:** Faktura and the broad payment/invoice/escrow cohort occupy the surface; generic netting is older global prior art.
- **Gate 5 / Gate 6:** a five-to-three transfer animation is concrete, but no new user-visible state machine or Flare-specific necessity remains after plain-language substitution.

## Survivor interface sheet

**None.** No idea reached survivor status, so there is no permissible survivor interface/network/authority/boundary/receipt enumeration. The interface baseline above records the exact public surfaces that caused the kills and must not be misread as approval to revive any concept.

## Freeze-safe conclusion

No quota is preserved. The eight ideas fail independently on native substitution, exact end-to-end authority, plain-language/global mechanism prior art, dual-track necessity, novelty/demo floors, or one-builder operability. Passing provenance or sponsor relevance does not compensate for any of those failures.
