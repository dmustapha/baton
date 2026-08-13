# Round 4 Strict Post-Freeze Gate - Generators A and B

Date: 2026-08-13  
Scope: eight frozen ideas, four from Generator A and four from Generator B  
Method: non-compensating Gate 0, Gate 0b on every transition, native-substitute, global plain-language prior art, event and Dami-portfolio collision, both track-removal tests, mechanism novelty ≥7, composition novelty ≥7, demo surprise ≥7, and one-builder buildability. No quota and no scoring phase.

## Verdict

**Survivors: 0 / 8. Do not score this batch.**

| Idea | Gate 0 | Gate 0b | Native substitute | Plain-language / collisions | IA removal | FCC removal | Mechanism novelty | Composition novelty | Demo surprise | Buildability | Final |
|---|---|---|---|---|---|---|---:|---:|---:|---|---|
| A1 XRP SafePass | PASS: holder mistake pain and asset use are real; switching case weak | KILL: no exact guarded vault target; FCC boundary conditional | KILL: hash, nonce, atomic rollback, wallet preflight | Guard/session-policy; B1 duplicate; Mandate Zero/Backstop adjacency | PASS | KILL | 2 | 5 | 7 | KILL | **KILL** |
| A2 XRP Aftercare | PASS pain/user class, but switching case weak | KILL: no exact post-proof preauthorization-to-vault interface | KILL: `0xE0/E1/E2`, same-proof retry, nonce replay control | Saga + idempotency + contingency; round-3 AfterMint | PASS | KILL | 4 | 5 | 7 | KILL | **KILL** |
| A3 Relay Rescue | PASS executor role; claimed wrong-payload state false | KILL: primary outage/status is self-declared; guarded target unresolved | KILL: permissionless execution, fee replacement, pin/unpin | Failover + scoped policy; B2 duplicate; round-3 Relay Epoch | PASS | KILL | 3 | 5 | 7 | KILL | **KILL** |
| A4 Quiet Lifeline | KILL: no evidenced willingness/channel for this new escrow | KILL: generic inactivity is not an FDC fact; Smart Account standing recovery absent | KILL: seed backup, social recovery, timelock, custody | Dead-man switch; Heirloom, Remnara, StillMe, Kinship Window | KILL after operable repair | KILL | 2 | 5 | 6 | Conditional generic escrow only | **KILL** |
| B1 CallSeal | KILL: executor cannot alter hash-pinned call bytes | KILL: existing vault/guard interface unresolved | KILL: native hash and nonce checks already supply guarantee | Same idea as A1; transaction guard; Mandate Zero/Backstop | PASS | KILL | 2 | 5 | 7 | KILL | **KILL** |
| B2 Relay Lifeboat | PASS executor market; weak first-five reach | KILL: no exclusive FCC branch over native execution | KILL: `0xE2`, retry, permissionless phase, pin/unpin | Same idea as A3; failover/session policy; Relay Epoch | PASS | KILL | 3 | 5 | 7 | KILL | **KILL** |
| B3 Redemption Window Governor | PASS agent role/fees/private treasury state; no participating agent | KILL: no FCC-enforced XRPL signer/PMW interface or live assignment | KILL: agent treasury tools plus native default/executor lifecycle | Private payment-source policy; Redemption Triage; dense FAssets assurance cohort | PASS conceptually | KILL | 4 | 6 | 7 | KILL | **KILL** |
| B4 Collateral Pulse Permit | PASS agent role/collateral behavior; no participating agent | KILL: no exact agent vault/guard path or controlled agent position | KILL: native agent top-up/self-close/liquidation controls | Private exact-amount approval; dense collateral/risk cohort; RefiRail/Backstop adjacency | PASS conceptually | KILL | 3 | 5 | 6 | KILL | **KILL** |

The three numeric novelty columns are hard-gate measurements, not weighted scores. A value below 7 is independently fatal.

## Binding Evidence Baseline

### Market and distribution

- XRPFi usage and wallet distribution are real. Flare documents an XRP-to-FXRP-to-vault flow in Xaman and a live D'CENT flow; the latter names 330,000+ hardware users, 720,000+ app users, two XRPL signatures, and an FXRP vault deposit. This supports the holder and executor classes, not demand for each confidential overlay. [Xaman one-click vault](https://flare.network/news/one-click-defi-vault-xaman-flare-smart-accounts), [D'CENT integration](https://flare.network/news/flare-and-dcent-bring-one-flow-institutional-yield-to-xrp-holders-worldwide)
- A registered FAssets agent has a real fee-bearing workflow: an assigned redemption specifies destination, amount, payment reference, and deadline; the agent pays XRP, FDC proves it, and the protocol closes the redemption. Non-payment already triggers collateral compensation and a default premium. [FAssets redemption](https://dev.flare.network/fassets/redemption), [redemption-default guide](https://dev.flare.network/fassets/developer-guides/fassets-redemption-default)
- No frozen A/B idea names a cooperating wallet operator, registered FAssets agent, or funded vault integration. Xaman/D'CENT distribution and public agent roles do not confer integration authority on the builder.

### Smart Account truth boundary

- A `0xFE` custom instruction commits `keccak256(abi.encode(userOp))` on XRPL. `executeDirectMintingWithData(proof,data)` checks the submitted bytes against that commitment, validates sender and nonce, then dispatches the committed call through the Personal Account. An executor cannot substitute a different amount, target, or payload. Inner-call failure rolls back the complete Flare transaction. [Custom Instruction](https://dev.flare.network/smart-accounts/custom-instruction)
- Smart Accounts already expose `0xE0` skip-memo recovery, `0xE1` nonce fast-forward, `0xE2` executor-fee replacement, `0xD0` pin, `0xD1` unpin, and eventual permissionless handling. Duplicate transaction IDs and duplicate nonces are already rejected or recovered through native state. [Smart Accounts overview](https://dev.flare.network/smart-accounts/overview)
- The round-3 gate already killed AfterMint, Relay Epoch, Intent Lifeboat, and SendSure for these exact native-substitute and missing two-phase-interface reasons. The present ideas do not add a new transition.

### FCC/FCE truth boundary

- The current public builder path is a Coston2 extension: a project `InstructionSender` sends through the TEE extension system, the proxy forwards to an extension `POST /action`, and an `ActionResult` returns onchain. The official quick path uses `SIMULATED_TEE=true`, Docker, a public proxy URL, and an indexer-backed proxy. [FCC getting started](https://dev.flare.network/fcc/guides/getting-started), [private-key extension](https://dev.flare.network/fcc/guides/sign-extension)
- FCC can prove a signed project result and cause a project contract to change project-owned state. It does not automatically constrain a native Smart Account path, an agent-owned XRPL wallet, a third-party vault, or a FAssets agent vault. Every such transition still needs its own authorized caller and exact interface.
- Fresh live check on 2026-08-13: Coston2 RPC returned chainId `114`; Contract Registry resolved AssetManagerFXRP `0xc1Ca88b937d0b528842F95d5731ffB586f4fbDFA`, MasterAccountController `0x434936d47503353f06750Db1A444DBDC5F0AD37c`, and FdcVerification `0x906507E0B64bcD494Db73bd0459d1C667e14B933`. AssetManager returned FXRP `0x0b6A3645c240605887a5532109323A3E12273dc7`; bytecode was present at all four addresses. `getContractAddressByName("TeeExtensionRegistry")` returned zero, so no idea may imply a registry-resolved production FCC contract; the documented project deployment/simulated boundary must be shown honestly. [Contract Registry guide](https://dev.flare.network/network/guides/flare-contracts-registry)

### FAssets authority and substitutes

- `IAssetManager.getAgentInfo(agentVault)` and redemption events expose public protocol state. The agent alone controls its external XRP payment source; the protocol accepts a qualifying proof afterward. FCC result verification does not bind the external signer. [IAssetManager](https://dev.flare.network/fassets/reference/IAssetManager), [redemption flow](https://dev.flare.network/fassets/redemption)
- Agents may add collateral or self-close before liquidation. Agent-vault collateral mutation is agent-controlled; project verification cannot make an FCC result mandatory unless the agent deliberately routes through a new project adapter, which the frozen B4 map does not specify. [FAssets collateral](https://dev.flare.network/fassets/collateral)
- FAssets already provides `redemptionPaymentDefault(proof, requestId)` and an executor/default lifecycle. A private recommendation cannot be counted as a new recovery outcome when the agent can send the same XRP payment without FCC. [IAssetManager reference](https://dev.flare.network/fassets/reference/IAssetManager)

### Global, event-local, and portfolio prior art

- The mandatory substitution registry already covers pre/post transaction guards, target/amount/time-scoped permissions, session keys, spending caps, circuit breakers, idempotency, saga recovery, executor failover, dead-man switches, social recovery, and timelocked beneficiary handoff. [ZeroDev permissions](https://docs.zerodev.app/sdk/v5_3_x/permissions/intro), [Safe RecoveryHub](https://help.safe.global/articles/9622260218-account-recovery-with-saferecoveryhub), [OpenZeppelin access/timelock](https://docs.openzeppelin.com/contracts/5.x/api/access)
- The 99-signal event registry already contains Flare Payflow Guard, Backstop, Keyless, BridgeSafe, Heirloom, Vouchsafe, LedgerGuard, Ballast, Herkos, FAsset Sentry, fassets-verify, XRPShield, and a broad Smart Account/FAssets safety cohort. Research explicitly labels inheritance and generic risk/guard products saturated.
- Dami portfolio collisions are material: Backstop already covers transaction co-sign/veto and receipts; AgentTreasury covers policy-controlled treasury execution; RefiRail covers one-action financial repair with before/after proof; Mirror covers operational recovery receipts. A1/B1 and A3/B2 also repeat rejected Mandate Zero and round-3 guard/relay concepts. No new load-bearing state transition survives substitution.

## Per-Idea Gate Records

### A1 - XRP SafePass - KILL

**Plain-language substitution:** “Private rules approve or reject an exact transaction by amount, target, risk limit, and expiry.” This is a transaction guard plus scoped session policy. Holder error is real, but executor substitution is impossible because the native controller checks the hash of the exact bytes committed on XRPL; local wallet preflight already addresses the broader mistake case.

**Authority and integration matrix**

| Transition | Existing authority | Exact interface/source | Network | Controlled change | Boundary | Receipt | Result |
|---|---|---|---|---|---|---|---|
| Commit instruction | XRP holder | XRPL `Payment` memo `0xFE` with `userOpHash` | XRPL | Holder authorization | Live | XRPL tx/hash | PASS |
| Verify and execute bytes | AssetManager/controller/executor | `executeDirectMintingWithData(IXRPPayment.Proof,bytes)` → controller → Personal Account | Coston2 | Exact committed call only | Live | mint, `UserOperationExecuted`, tx | PASS; disproves claimed substitution failure |
| Evaluate private policy | Holder + project FCC machine | project `InstructionSender` / extension `/action` / signed `ActionResult` | Coston2 FCC path | Project result only | Simulated unless attested deployment exists | instruction/result/status | PASS in isolation |
| Enforce permit on asset action | Undefined project guard + unnamed vault | “verifier contract” and “existing vault interface” are not exact interfaces or addresses | Coston2 | Claimed vault deposit | Unresolved | No complete receipt chain | **FAIL** |
| Reach first five users | Wallet/vault operator | no authorized integration named | External | Distribution | Unsupported | None | **FAIL** |

**Removal tests:** Interoperable Asset removal passes. FCC removal fails: the native hash/nonce controller and a local wallet preflight preserve exact-payload safety.  
**Thresholds:** mechanism 2/10; composition 5/10; surprise 7/10.  
**Cause of death:** native and wallet-local substitutes, missing exact vault interface, optional FCC, familiar guard, and B1/Mandate Zero/Backstop collision.

### A2 - XRP Aftercare - KILL

**Plain-language substitution:** “A delayed payment is matched to an earlier contingency, then parked, continued, or rejected as a duplicate.” This is saga recovery plus idempotency and an expiring instruction.

| Transition | Existing authority | Exact interface/source | Network | Controlled change | Boundary | Receipt | Result |
|---|---|---|---|---|---|---|---|
| Create payment/intent | Holder | XRPL `Payment`, optional custom-instruction memo | XRPL | Source payment/commitment | Live | tx/hash | PASS |
| Observe/complete delayed mint | Executor | FDC proof + `executeDirectMintingWithData` | XRPL→Coston2 | Native direct mint | Live | FDC/mint receipt | PASS |
| Recover failed/abandoned action | Holder + executor | `0xE0`, `0xE1`, `0xE2` native memo instructions | XRPL→Coston2 | Same-owner recovery/nonce/fee | Live | native recovery events | PASS; native substitute |
| Decide private contingency | Holder + FCC machine | project extension and signed result | FCC/Coston2 | Project result | Simulated/attested label required | result/status | PASS in isolation |
| Execute “park or deposit” | Holder's Personal Account | parking is already native ownership; no exact preauthorized target vault/adapter is named | Coston2 | Conditional downstream deposit | Unresolved | only balance if parked | **FAIL** |

**Removal tests:** IA passes; FCC fails because native safe landing, duplicate protection, and recovery remain.  
**Thresholds:** 4/10, 5/10, 7/10.  
**Cause of death:** direct round-3 AfterMint repeat, native recovery duplication, absent two-phase contingency interface, and excessive joined scope.

### A3 - Relay Rescue - KILL

**Plain-language substitution:** “If the first delivery worker fails, private fee and availability rules let another worker submit the same signed job.” This is executor failover plus a scoped, expiring policy.

| Transition | Existing authority | Exact interface/source | Network | Controlled change | Boundary | Receipt | Result |
|---|---|---|---|---|---|---|---|
| Authorize exact call | Holder | XRPL `Payment` + `0xFE` hash commitment | XRPL | Exact user operation | Live | XRPL tx/hash | PASS |
| Establish primary outage | Existing executor | no authoritative liveness interface; operator self-declaration only | Offchain | Availability claim | Simulated | status label only | **FAIL** |
| Select fallback | FCC machine | project extension signed `relay/wait/refuse` | FCC/Coston2 | Project result | Simulated/attested | result/status | PASS in isolation |
| Replace fee/pin or wait | Holder/native system | `0xE2`, `0xD0`, `0xD1`, eventual permissionless execution | XRPL→Coston2 | Native recovery | Live | protocol events/tx | PASS; native substitute |
| Deposit FXRP | Executor + Personal Account | native execution path plus unnamed “existing vault” | Coston2 | Target call | Target unresolved | no complete target receipt | **FAIL** |

**Removal tests:** IA passes; FCC fails because native permissionless handling and exact-byte hash remain.  
**Thresholds:** 3/10, 5/10, 7/10.  
**Cause of death:** A3=B2 semantic duplicate, native failover/fee controls, unverified outage source, unnamed vault, and round-3 Relay Epoch collision.

### A4 - Quiet Lifeline - KILL

**Plain-language substitution:** “No check-in starts a reversible beneficiary handoff; the owner can cancel before a timed final release.” This is a dead-man switch plus social recovery and timelock.

| Transition | Existing authority | Exact interface/source | Network | Controlled change | Boundary | Receipt | Result |
|---|---|---|---|---|---|---|---|
| Fund continuity vault | Holder | FXRP `transferFrom` into project vault | Coston2 | Project-held FXRP | Live | `Transfer` + deposit event | PASS technically |
| Prove inactivity | Requester/FDC | `ReferencedPaymentNonexistence` only for a predeclared payment reference/window, not generic account inactivity | XRPL→Coston2 | Specific absence fact | Live if properly staged | FDC proof | CONDITIONAL; frozen map is underspecified |
| Resolve beneficiary | FCC machine | project extension signed eligibility | FCC/Coston2 | Project result | Simulated/attested | result/status | PASS in isolation |
| Challenge | Holder | a fresh predeclared XRPL check-in plus project cancel call | XRPL/Coston2 | Project escrow cancel | Requires advance design | paired receipts | CONDITIONAL |
| Final release | Project vault | project `release` + FXRP `transfer` | Coston2 | Project-held token transfer | Live | event/transfer | PASS, but token-interchangeable |
| Exercise dormant Smart Account authority | Inactive owner | no standing FSA recovery-module interface; current operations require owner XRPL authorization | XRPL/Coston2 | Claimed dormant handoff | Unsupported | None | **FAIL** |

**Removal tests:** An operable repair is a prefunded generic escrow, so IA removal fails; FCC removal also fails because hashed beneficiary/timelock/social recovery preserves the outcome.  
**Thresholds:** 2/10, 5/10, 6/10.  
**Cause of death:** no evidenced willingness/first-five channel, direct Heirloom/Remnara/StillMe/Kinship collision, established global prior art, unsupported standing recovery authority, and token interchangeability.

### B1 - CallSeal - KILL

**Plain-language substitution:** identical to A1: “A private policy issues an expiring permit for exact call bytes.” Native Smart Accounts already make altered bytes unexecutable.

| Transition | Existing authority | Exact interface/source | Network | Controlled change | Boundary | Receipt | Result |
|---|---|---|---|---|---|---|---|
| Holder authorization | Holder | XRPL `Payment` + `0xFE userOpHash` | XRPL | Exact call commitment | Live | tx/hash | PASS |
| Proof/hash/nonce enforcement | AssetManager/controller | `executeDirectMintingWithData` + controller nonce/hash checks | Coston2 | Mint + exact call | Live | events/tx | PASS; removes stated attack |
| Confidential permit | FCC machine | project extension `ActionResult` | FCC/Coston2 | Project result | Simulated/attested | result/status | PASS in isolation |
| Guarded relay/deposit | Project guard + unnamed vault | no exact guard ABI, vault address, deposit function, or proof of incumbent adoption | Coston2 | Project/third-party state | Unresolved | incomplete | **FAIL** |

**Removal tests:** IA passes; FCC fails because exact-byte integrity and wallet-local limits remain.  
**Thresholds:** 2/10, 5/10, 7/10.  
**Cause of death:** exact duplicate of A1, false failure premise, incomplete interface map, and rejected Mandate Zero/Backstop mechanism.

### B2 - Relay Lifeboat - KILL

**Plain-language substitution:** identical to A3: “Private recovery rules select one fallback relay for an already authorized job.”

| Transition | Existing authority | Exact interface/source | Network | Controlled change | Boundary | Receipt | Result |
|---|---|---|---|---|---|---|---|
| Authorization/proof | Holder/executor | XRPL `Payment`; FDC; Smart Account direct-mint execution | XRPL→Coston2 | Authorized call | Live | proof/tx | PASS |
| Primary unavailability | Existing executor | no authoritative liveness source or service-level interface | Offchain | Failure status | Simulated | self-report only | **FAIL** |
| Branch selection | FCC machine | project extension signed branch | FCC/Coston2 | Project permit | Simulated/attested | result/status | PASS in isolation |
| Native fallback | holder/any eligible executor | `0xE2`, permissionless phase, pin/unpin paths | XRPL→Coston2 | Native delivery/recovery | Live | protocol tx/events | PASS; substitute |
| Strategy deposit | Personal Account | unnamed strategy interface | Coston2 | FXRP deposit | Unresolved | incomplete | **FAIL** |

**Removal tests:** IA passes; FCC fails because the same authorized call can use native retry/permissionless handling.  
**Thresholds:** 3/10, 5/10, 7/10.  
**Cause of death:** semantic duplicate of A3 and round-3 Relay Epoch, optional FCC branch, missing liveness authority, and unresolved target integration.

### B3 - Redemption Window Governor - KILL

**Plain-language substitution:** “Private treasury rules select which account should pay a time-critical obligation, or tell the operator to abstain.” This is maker-checker/treasury policy plus transaction simulation.

| Transition | Existing authority | Exact interface/source | Network | Controlled change | Boundary | Receipt | Result |
|---|---|---|---|---|---|---|---|
| Obtain assignment | FAssets protocol | `RedemptionRequested` event / `IAssetManager` state | Coston2 | Assigned obligation | Live assignment required | event/request ID | PASS only with a real assigned test agent |
| Compute payment branch | Registered agent + FCC machine | project extension signed `pay/abstain` | FCC/Coston2 | Project result | Simulated/attested | result/status | PASS in isolation |
| Send XRP | Registered agent | agent-controlled XRPL wallet; no public PMW builder interface or current signer API named | XRPL | External payment | Requires cooperating agent | XRP tx | **FAIL end-to-end access** |
| Prove payment | agent/executor/FDC | XRP payment proof | XRPL→Coston2 | Payment fact | Live with latency | FDC proof | PASS conceptually |
| Close redemption | agent/executor/native protocol | `confirmRedemptionPayment` path; default path `redemptionPaymentDefault` | Coston2 | Redemption/collateral state | Live | completion/default event | PASS conceptually |
| Make FCC result mandatory | Undefined adapter | neither agent wallet nor AssetManager requires the FCC envelope | XRPL/Coston2 | Claimed safe source selection | Unsupported | None | **FAIL** |

**Removal tests:** IA passes conceptually; FCC fails because the authorized agent can make the same required XRP payment and submit proof without FCC.  
**Thresholds:** 4/10, 6/10, 7/10.  
**Cause of death:** no participating agent or live assignment, no exact FCC-gated signer/PMW path, native default/executor substitute, round-3 Redemption Triage repetition, and below-floor policy novelty.

### B4 - Collateral Pulse Permit - KILL

**Plain-language substitution:** “Private reserve rules calculate an exact top-up; the owner approves it and a guard rejects a larger amount.” This is a private treasury limit plus pre-transaction guard.

| Transition | Existing authority | Exact interface/source | Network | Controlled change | Boundary | Receipt | Result |
|---|---|---|---|---|---|---|---|
| Read agent health | Public observer/agent | `IAssetManager.getAgentInfo(agentVault)` plus FTSO-derived protocol state | Coston2 | Read only | Live | state snapshot | PASS |
| Calculate amount | Agent + FCC machine | project extension signed amount/abstention | FCC/Coston2 | Project result | Simulated/attested | result/status | PASS in isolation |
| Verify/consume permit | Project verifier | project-owned verifier function, not specified in frozen map | Coston2 | Project state only | Live if built | project event | CONDITIONAL |
| Deposit vault collateral | Registered agent | agent-vault `depositCollateral`/tracking path is agent-controlled; frozen idea supplies no exact ABI, vault, token, allowance, or participating agent | Coston2 | Agent vault collateral | Unresolved | no runnable receipt path | **FAIL** |
| Bind native top-up to permit | Undefined | native agent vault does not require the project verifier; agent can call its own path | Coston2 | Claimed exact-amount guarantee | Unsupported | None | **FAIL** |
| Reach first five agents | Registered agents | no cooperating agent/support integration named | External | Adoption | Unsupported | None | **FAIL** |

**Removal tests:** IA passes conceptually; FCC fails because the agent's existing private treasury process and authorized collateral call preserve the top-up outcome.  
**Thresholds:** 3/10, 5/10, 6/10.  
**Cause of death:** advisory rather than enforceable FCC, incomplete exact interface/actor rows, no agent access, native top-up/self-close/liquidation substitutes, and direct collision with the dense event-local collateral-risk cohort.

## Final Disposition and Duplicate Clusters

| Cluster | Ideas | Disposition |
|---|---|---|
| Exact-call guard | A1 XRP SafePass, B1 CallSeal | Both killed. Do not merge; the premise is natively prevented and the mechanism is familiar. |
| Executor fallback | A3 Relay Rescue, B2 Relay Lifeboat | Both killed. Do not merge; native recovery survives FCC removal. |
| Delayed Smart Account recovery | A2 XRP Aftercare | Killed as round-3 AfterMint/native-recovery repeat. |
| Inheritance/continuity | A4 Quiet Lifeline | Killed for direct event/global collision and unsupported dormant authority. |
| Agent redemption policy | B3 Redemption Window Governor | Killed for missing enforceable signer path and agent access. |
| Agent collateral policy | B4 Collateral Pulse Permit | Killed for advisory FCC, missing exact agent path, and saturated risk surface. |

**Final: 0 PASS, 8 KILL.** No idea has complete authority/interface/network/boundary/receipt rows, and every idea independently fails at least one of native substitution, confidential-track removal, global novelty, event collision, or buildability.
