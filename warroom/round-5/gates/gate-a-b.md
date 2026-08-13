# Round 5 Post-Freeze Hard Gate — Generators A+B

Date: 2026-08-13  
Scope: all eight frozen ideas in `raw/generator-a.md` and `raw/generator-b.md`  
Frozen SHA-256: Generator A `920f6f1fb253ce8c5c50e7debd5b45d85e5eaa5d5bebcea08fd78b3017415afc`; Generator B `bf2b7608376cc9666fdd6decc71055e701d4bd596c622b592f0aa6457149862e`  
Track contract: single-track, Interoperable Asset Products  
Method: non-compensating Market Reality, exact end-to-end operability, authority, native-substitute, plain-language global prior art, 99-signal event collision, shipped/in-flight portfolio collision, Interoperable removal, independent user-mechanism novelty, protocol-composition novelty, demo surprise, usefulness, and one-builder buildability gates. There is no survivor quota, weighted ranking, or compensating score.

## Binding evidence baseline

- FXRP has a real broad holder market. Flare Explorer reports more than 150 million FXRP and more than 13,000 holders, while Flare reports that more than 85% of minted FXRP has entered DeFi. Xaman and D'CENT expose production one-flow XRP-to-FXRP/application journeys; D'CENT reports 330,000 hardware-wallet and 720,000 app users. These facts pass market existence, not product demand. [FXRP Explorer](https://flare-explorer.flare.network/token/0xAd552A648C74D49E10027AB8a618A3ad4901c5bE?tab=holders), [Flare activity report](https://flare.network/news/from-activity-to-value-accrual-our-plan-for-flr), [Xaman flow](https://flare.network/news/one-click-defi-vault-xaman-flare-smart-accounts), [D'CENT flow](https://flare.network/news/flare-and-dcent-bring-one-flow-institutional-yield-to-xrp-holders-worldwide)
- FAssets already exposes the exact native mint and redemption state machines. `executeMinting(proof,id)` is restricted to the minter, its appointed executor, or the agent owner. `mintingPaymentDefault(nonexistenceProof,id)` and payable `unstickMinting(blockHeightProof,id)` are restricted to the agent-vault owner. `redeemAmount(amountUBA,address,executor)` already accepts an arbitrary amount and emits `RedemptionAmountIncomplete` when protocol ticket limits cause a partial request. `confirmRedemptionPayment(proof,id)` is agent-owner-only until `confirmationByOthersAfterSeconds`, after which anybody may confirm. `redemptionPaymentDefault(nonexistenceProof,id)` is restricted to the redeemer, its appointed executor, or the agent owner. [Official `IAssetManager`](https://dev.flare.network/fassets/reference/IAssetManager), [official FAssets source](https://github.com/flare-foundation/fassets/blob/main/contracts/userInterfaces/IAssetManager.sol), [official `IRedeemExtended`](https://github.com/flare-foundation/fassets/blob/main/contracts/userInterfaces/IRedeemExtended.sol)
- Smart Account custom instructions already bind `sender`, nonce, executor fee, and exact packed calls under the XRPL-authorized `0xFE` hash. The Controller increments nonce only on success and `executeUserOp(Call[])` reverts atomically. If a downstream call fails, no FXRP is minted and the XRP remains in the Core Vault. Native memos `0xE0`, `0xE1`, and `0xE2` respectively skip a failed call and mint to the Personal Account, advance a stuck nonce, and replace the executor fee. [Official custom-instruction specification](https://dev.flare.network/smart-accounts/custom-instruction), [official Smart Accounts source](https://github.com/flare-foundation/flare-smart-accounts)
- FDC supports `Payment`, `ReferencedPaymentNonexistence`, and `ConfirmedBlockHeightExists` attestations for XRP/testXRP, but an attestation does not grant the caller another actor's protocol role or XRPL signing key. [Official FDC client](https://github.com/flare-foundation/fdc-client)
- The official demo dapp already performs direct mint preflight, fee/minimum display, `DirectMintingExecuted` tracking, arbitrary/partial redemption, deadline monitoring, payment proof, and non-payment/default handling on Coston2 and Flare. The official transaction verifier already checks transaction network, recipients, values, and contract calls before signing. [Official FAssets demo dapp](https://github.com/flare-foundation/fassets-demo-dapp), [official transaction verifier](https://github.com/flare-foundation/flare-tx-verifier)
- Global mechanism prior art already includes test/canary transactions, two-phase reserve/commit, expiring signed requests, full-payload commitments, nonce replay protection, bounded batches, saga/state-machine receipts, circuit breakers, exact-out orchestration, pre-sign guards, maker-checker controls, and before/after reconciliation. A project receipt or client lock is evidence/UX unless a live system consumes it and changes a user outcome.
- The 99-signal corpus contains direct collisions: Flare Payflow Guard performs FXRP direct-mint preflight and receipts; Undelayed predicts direct-mint execution; FlareRamp implements Check → Sign → Prove → Mint; Autopilot and PortalFX manage Smart Account/FAssets lifecycles; Backstop handles FXRP redemption default with FDC nonexistence proof; `flare-fassets-agent`, FXRP Agent Radar, FAsset Sentry, and Veri cover agent/FXRP operations. The active brief classifies simple FXRP utilities and direct-mint front ends as saturated.
- Portfolio adjacency is independently material: Backstop already owns FDC-backed FXRP redemption-default protection; AgentTreasury and EdgeLedger Predicate Striker own controlled treasury execution and lifecycle reconciliation; RefiRail and Mirror own before/after repair and recovery evidence. No portfolio collision is needed to rescue or kill an idea where an earlier hard gate already decides it.

## Row verdicts

`PASS` means only that the named hard gate is not independently fatal. One `KILL` is terminal.

| Idea | Market reality | E2E operability / authority | Native substitute | Prior art / collision | Interoperable removal | Hard novelty floors | Demo / usefulness / buildability | Final |
|---|---|---|---|---|---|---|---|---|
| A1 CanaryMint | **PASS** real holder, irreversible XRP payment, reachable first users; switching case weak | **PASS** two holder-signed native mints are callable; project only withholds the second unsigned payment | **KILL** official preflight, minimum/fee checks, native receipts, and wallet progress already address the route | **KILL** ordinary test transaction/two-phase release; Payflow Guard, Undelayed, FlareRamp | Underlying mint fails removal; the canary gate does not reserve or enforce the remainder route | **KILL** mechanism, composition, and surprise each below 7 | Clear demo, but doubles minimum/fees and cannot prove unchanged capacity/assignment for payment two | **KILL** |
| A2 RouteFuse | **PASS** real Smart Account stale-state risk and broad holder channel | **KILL** expiry is client-local; no live controller method consumes it or prevents a pre-expiry XRPL payment from executing later | **KILL** native `0xFE` payload hash, nonce, pinned executor, controller checks, and tx verifier bind/check the claimed fields | **KILL** expiring request/versioned route/replay guard; Autopilot, Payflow Guard, FlareRamp | Smart Accounts are load-bearing to execution; the fuse itself is removable without protocol consequence | **KILL** mechanism, composition, and surprise each below 7 | Countdown theater is easy, but refusal proves the app UI—not a new cross-chain guarantee | **KILL** |
| A3 XRP Exit Ladder | **PASS** real holder exit and native payment/default branches | **PASS** each holder redemption and eligible default is callable; live paid/default branch depends on assigned-agent timing | **KILL** `redeemAmount` already supports arbitrary/partial exits and native default already closes missed payment | **KILL** bounded tranche/ladder/saga; prior Round-2 Redemption Ladder and Backstop collision | FAssets obligations are load-bearing; ladder sequencing remains an offchain client convention | **KILL** mechanism, composition, and surprise each below 7 | Useful exposure cap, but repeated fees/timing and no same-agent/route guarantee; default cannot be staged live on demand | **KILL** |
| A4 Homebound FXRP | **PASS** real failure/recovery concern | **KILL** central state is impossible: a failed target atomically reverts the mint, so no FXRP exists in the Personal Account to prove or return | **KILL** native `0xE0` already performs the correct recovery; `0xE1/E2` cover adjacent stuck states | **KILL** recovery wizard/status receipt; Autopilot plus Mirror/RefiRail adjacency | Native recovery is load-bearing; the proposed ownership-recovery layer disappears after correcting the state model | **KILL** mechanism, composition, and surprise each below 7 | Advertised reveal is false; honest demo becomes documented `0xE0` UX | **KILL** |
| B1 Redemption Conservator | **PASS** real redeemer, fee, wait, and default exposure | Conditional **PASS** on exact native branches; **KILL** demo substitutes fixtures for the external agent/deadline where authority or timing is absent | **KILL** official dapp and native lifecycle already track payment, confirmation, deadlines, and default compensation | **KILL** saga/conservation receipt; direct Backstop collision | FAssets is load-bearing to asset result; conservation receipt is passive and removable | **KILL** mechanism, composition, and surprise each below 7 | Useful support artifact, but no new right, safeguard, or economic terminal state | **KILL** |
| B2 Exact-Out Redemption Queue | **PASS** partial redemption coordination is real | **KILL** exact XRP output is not enforceable: `amountUBA` is burned input, fee is subtracted, partial tickets vary, and default returns collateral—not XRP | **KILL** native `redeemAmount` already computes/returns partial requested amount and invites another call | **KILL** exact-out/bounded queue/ladder; prior Redemption Ladder and Backstop | FAssets is load-bearing to requests; “exact-out” promise disappears when native branches are stated honestly | **KILL** mechanism, composition, and surprise each below 7 | Three-branch demo cannot end at exact XRP after a default; buildable only as a tracker | **KILL** |
| B3 Mint Reservation Salvage Covenant | **PASS** real minter preflight pain | **KILL** fatal authority error: `mintingPaymentDefault` and `unstickMinting` are agent-owner-only, not “any proof-bearing caller” or holder salvage | **KILL** official preflight/troubleshooting and native agent exception methods already supply the valid outcome | **KILL** transaction preflight + exception router; Payflow Guard/FlareRamp and EdgeLedger adjacency | Reservation is load-bearing; claimed minter salvage is unsupported authority | **KILL** mechanism, composition, and surprise each below 7 | Success branch is feasible; hero salvage branch cannot be executed by the named buyer | **KILL** |
| B4 Redemption Duty Capsule | **PASS** registered agents and fee/default economics are real; **KILL** no named cooperating buyer or signer access | **KILL** no authorized work key, XRP signer, agent policy hook, or cooperating registered agent; fixture cannot close a real assigned duty | **KILL** agent console/bot can perform the same exact checks before native payment and confirmation | **KILL** maker-checker payment template + reconciliation; agent, radar, sentry, Veri, AgentTreasury, EdgeLedger | FAssets duty is load-bearing; capsule is not consumed by XRPL or Asset Manager and is removable | **KILL** mechanism, composition, and surprise each below 7 | Wrong-reference refusal is legible but proves only a builder signer; claimed live product is not operable | **KILL** |

Every idea must independently reach 7/10 on mechanism novelty, protocol-composition novelty, and demo surprise; none does. No comparative or aggregate score is assigned.

## Exact transition and receipt audit

### A1 — CanaryMint — KILL

| Transition | Actor / authority | Exact callable interface and network | Live boundary / receipt | Gate |
|---|---|---|---|---|
| Resolve route | Public reader | Contract Registry → current `AssetManagerFXRP` and FAssets reads; Coston2 | Live resolved address/parameters | PASS |
| Create canary | Holder/minter | Reserved `reserveCollateral(...)` then XRPL payment and `executeMinting(IPayment.Proof,id)`, or direct `executeDirectMinting(IXRPPayment.Proof)`; XRPL + Coston2 | Reservation/payment/mint tx and native mint event | PASS if one exact route is selected |
| Prove owner | Public FDC/native reads | FDC `Payment`/`XRPPayment` proof plus FXRP event/balance; Coston2 | Proof response, event, balance | PASS |
| Hold remainder | Holder's client; no asset authority exercised | No chain call; second XRP payment remains unconstructed/unsigned | Local locked state only | PASS as UX |
| Guarantee same conditions | No actor has this authority | No interface reserves the same agent capacity, fee, minimum, registry version, or Smart Account nonce for the second payment | No enforceable receipt | **KILL** |
| Execute remainder | Holder/minter and eligible executor | A fresh independent mint lifecycle; XRPL + Coston2 | Second payment and mint receipt | PASS, but not guaranteed by canary |

**Evidence verdict:** A real canary limits value-at-risk, but it is an ordinary test transaction. It pays another minimum/fee, and success of transaction one is not a protocol reservation for transaction two. The official demo, preflight, and three direct event collisions erase the claimed novelty and switching advantage.

### A2 — RouteFuse — KILL

| Transition | Actor / authority | Exact callable interface and network | Live boundary / receipt | Gate |
|---|---|---|---|---|
| Read state | Public reader | Contract Registry reads plus Smart Account `getNonce`; Coston2 | Live values | PASS |
| Bind instruction | XRPL owner | `0xFE` memo commits `keccak256(PackedUserOperation)` containing sender, nonce, executor fee, and calls; XRPL | Signed XRP transaction | PASS natively |
| Apply fuse expiry | Builder client | Local deadline comparison before signature | UI refusal only | **KILL** as protocol guarantee |
| Relay/prove | Configured executor, then FDC | `executeDirectMintingWithData(IXRPPayment.Proof,bytes)`; Coston2 | Relay tx and proof | PASS under executor rules |
| Execute | Controller/Personal Account | Controller verification then `executeUserOp(Call[])`; Coston2 | `UserOperationExecuted`, target events, balances | PASS |
| Prevent late execution after payment | No project authority | No controller expiry field/call in the frozen mechanism; valid native bytes may execute under native timing | No fuse-burn receipt recognized by protocol | **KILL** |

**Evidence verdict:** The only new control is a pre-sign countdown. Native hashing, nonce, executor rules, and controller verification already bind the operation; the official verifier already checks the human-facing transaction fields. Removing RouteFuse does not alter the signed instruction's validity or outcome.

### A3 — XRP Exit Ladder — KILL

| Transition | Actor / authority | Exact callable interface and network | Live boundary / receipt | Gate |
|---|---|---|---|---|
| Plan tranches | Holder | Local plan; no asset movement | Signed/local plan | PASS as UX |
| Request rung | FXRP holder | `redeemAmount(uint256,string,address payable)` (or `redeem` in lots); Coston2 | `RedemptionRequested`, possible `RedemptionAmountIncomplete`, FXRP burn | PASS |
| Fulfill rung | Protocol-assigned agent | Exact XRPL Payment to emitted destination/reference for `value-fee`; XRPL | XRP transaction | PASS only when assigned agent acts |
| Confirm paid rung | Agent owner; anyone only after configured delay | `confirmRedemptionPayment(IPayment.Proof,id)`; Coston2 | Native confirmation event/state | PASS under exact authority/time |
| Default unpaid rung | Redeemer, appointed executor, or agent owner | `redemptionPaymentDefault(IReferencedPaymentNonexistence.Proof,id)`; Coston2 | Default event and collateral compensation | PASS after deadline/proof |
| Unlock next rung | Holder's client | Observation of payment/confirmation; no chain-enforced sequence | Local unlocked state | PASS as voluntary gating only |
| Preserve same route/agent | Protocol, not project | Agent/ticket assignment comes from FAssets; no holder pin in the frozen mechanism | Assignment may differ per request | **KILL** to claimed route continuity |

**Evidence verdict:** All native child transitions exist, but the new mechanism is a familiar tranche ladder whose next-step lock is local. `redeemAmount` and native partial/default handling already supply the substantive outcome. A paid/default split cannot be reliably compressed into a live judge demo without a cooperating assigned agent and elapsed deadline.

### A4 — Homebound FXRP — KILL

| Transition | Actor / authority | Exact callable interface and network | Live boundary / receipt | Gate |
|---|---|---|---|---|
| Authorize entry/action | XRPL owner | `0xFE` Smart Account payment with committed calls; XRPL | Signed payment | PASS |
| Prove and execute | Configured executor | `executeDirectMintingWithData(proof,data)`; Coston2 | Transaction attempt | PASS |
| Target reverts | Personal Account atomic execution | `executeUserOp(Call[])`; Coston2 | Entire Flare transaction reverts; **no FXRP mint** | **KILL: frozen state model false** |
| Prove FXRP already controlled | Nobody | No FXRP exists in Personal Account after the revert | No balance/event possible | **KILL** |
| Authorize recovery | XRPL owner | New `0xE0` skip-memo Payment naming stuck XRPL tx; XRPL | Recovery instruction tx | PASS natively, omitted/misordered by frozen proof path |
| Complete recovery | Executor | Resubmit original proof under native recovery flow; Coston2 | FXRP mints to Personal Account without original calls | PASS native substitute |
| Return to separate wallet | Personal Account controller/holder | Requires a separately specified transfer call; frozen idea names no exact interface | Unspecified | **KILL** if “holder wallet” means a different address |

**Evidence verdict:** Atomic rollback invalidates the hero state, proof path, and demo narration. Correcting the flow yields the documented `0xE0` recovery journey, with no independently new user mechanism.

### B1 — Redemption Conservator — KILL

| Transition | Actor / authority | Exact callable interface and network | Live boundary / receipt | Gate |
|---|---|---|---|---|
| Create redemption | FXRP holder | `redeem`/`redeemAmount`; Coston2 | Native request and burn event | PASS |
| Agent pays | Assigned registered agent | Protocol-specified XRPL Payment; XRPL | Payment tx | PASS only if external agent acts |
| Prove payment | FDC client/relayer | `Payment` proof for XRP/testXRP | FDC proof | PASS |
| Confirm payment | Agent owner; public only after delay | `confirmRedemptionPayment(proof,id)`; Coston2 | Confirmation receipt | PASS under exact authority/time; raw executor claim is inaccurate |
| Prove non-payment | FDC | `ReferencedPaymentNonexistence` proof after eligible window | Proof response | PASS after real timing |
| Default | Redeemer/appointee/agent owner | `redemptionPaymentDefault(proof,id)`; Coston2 | Compensation/default receipt | PASS |
| Prove conservation invariant | Project indexer | Joins public request, proof, balances, and terminal event | Project receipt, not protocol state | PASS as evidence; **KILL** as new outcome |

**Evidence verdict:** The base lifecycle is real and operable when external timing/authority exists. The official dapp and Backstop already cover the same payment/default closure. A staged request fixture or calldata preview cannot satisfy the advertised live fork, and the conservation receipt changes no asset right or terminal outcome.

### B2 — Exact-Out Redemption Queue — KILL

| Transition | Actor / authority | Exact callable interface and network | Live boundary / receipt | Gate |
|---|---|---|---|---|
| Set XRP target | Holder | Local intent | Project record | PASS as planning |
| Burn/request | FXRP holder | `redeemAmount(_amountUBA,...)`; Coston2 | Actual redeemed input amount and possible incomplete event | PASS |
| Receive XRP | Assigned agent | XRPL Payment for native `value-fee` | XRP tx/amount | PASS when agent acts |
| Receive default compensation | Redeemer/appointee/agent owner invokes `redemptionPaymentDefault`; Coston2 | Native default branch | Collateral, not XRP | PASS natively; **KILL** to exact-XRP invariant |
| Recompute remainder | Builder client | Reads delivered XRP and/or collateral compensation | Local arithmetic | PASS as observation |
| Guarantee exactly target XRP | No actor/interface | Input amount is not output XRP; fee is subtracted; partial assignment and collateral default are heterogeneous | No native exact-out receipt | **KILL** |
| Advance child queue | Holder signs each fresh `redeemAmount` | Coston2 | Independent native receipts | PASS but familiar/manual orchestration |

**Evidence verdict:** `redeemAmount` itself is the native partial-request primitive. The frozen “exact-out” guarantee is mathematically and economically false once fees, partial assignment, and collateral default are admitted. The honest remainder queue is the previously rejected Redemption Ladder pattern.

### B3 — Mint Reservation Salvage Covenant — KILL

| Transition | Actor / authority | Exact callable interface and network | Live boundary / receipt | Gate |
|---|---|---|---|---|
| Reserve | Minter | `reserveCollateral(address agentVault,uint256 lots,uint256 fee,address payable executor)`; Coston2 | Reservation event/id | PASS |
| Preflight/pay | Same minter | Exact XRPL Payment to emitted agent underlying address/reference/amount before deadline | XRP tx | PASS |
| Complete mint | Minter, appointed executor, or agent owner | `executeMinting(IPayment.Proof,id)`; Coston2 | FXRP mint event/balance | PASS |
| Declare minter non-payment | **Agent-vault owner only** | `mintingPaymentDefault(IReferencedPaymentNonexistence.Proof,id)`; Coston2 | Reservation unlocked; agent receives fee | **KILL** to named holder's salvage authority |
| Unstick expired proof window | **Agent-vault owner only**, with enough NAT | payable `unstickMinting(IConfirmedBlockHeightExists.Proof,id)`; Coston2 | Agent-side terminal receipt | **KILL** to named holder's salvage authority |
| Recover wrong XRP payment | No FAssets holder interface | XRPL payment is irreversible; protocol docs do not provide minter reversal | None | **KILL** to closed holder outcome |

**Evidence verdict:** The raw authority map explicitly says “any proof-bearing caller” for two agent-owner-only methods. Proof possession is not protocol authorization. Once corrected, the covenant offers the holder only ordinary preflight plus `executeMinting`; the claimed exception-completion product is gone.

### B4 — Redemption Duty Capsule — KILL

| Transition | Actor / authority | Exact callable interface and network | Live boundary / receipt | Gate |
|---|---|---|---|---|
| Observe assignment | Public reader | `RedemptionRequested` from Registry-resolved Asset Manager; Coston2 | Request id/terms | PASS |
| Bind agent policy | Registered agent operations lead | Agent-owned work-key and XRPL-signer policy; no public FAssets capsule interface | Requires named cooperating agent/configuration | **KILL: absent buyer/authority** |
| Refuse malformed payment | Agent-controlled signer | Project pre-sign policy | Local refusal receipt | PASS only in builder/test signer; native agent unchanged |
| Pay XRP | Assigned agent's authorized XRPL key | Exact XRPL Payment to request destination/reference/amount | Live only with signer authority | **KILL without cooperating agent** |
| Prove | FDC | `Payment` attestation | Proof | PASS after real payment |
| Confirm | Agent owner; public only after configured delay | `confirmRedemptionPayment(proof,id)`; Coston2 | Native confirmation receipt | **KILL for immediate builder call without agent authority** |
| Enforce capsule consumption | No native consumer | Neither XRPL nor Asset Manager accepts capsule id/signature/policy | No protocol consequence | **KILL** |
| Reconcile | Agent treasury/indexer | Public balances, payment, and request state | Project before/after receipt | PASS as reporting only |

**Evidence verdict:** A registered-agent operations product could be useful, but this frozen idea names no cooperating registered agent, approved work key, XRP signer, pilot, or public signer-policy interface. A test fixture proves code, not the claimed buyer's duty. Existing agent tooling can implement the same checks without the capsule, which neither network consumes.

## Collision and prior-verdict audit

- **A1/A2/B3** collide on user, irreversible preflight, mint lifecycle, proof path, and receipt with Payflow Guard, Undelayed, FlareRamp, and the official demo. Their plain-language mechanisms are respectively “send a test transaction first,” “expire and recheck a signed request,” and “preflight then choose the documented exception function.”
- **A3/B1/B2** collide with Backstop and the prior Round-2 Redemption Ladder. Their plain-language mechanisms are a tranche ladder, a saga tracker, and an exact-out queue. The previous ladder reached composition/surprise floors only by packaging; its independent mechanism remained familiar and was killed. Round 5 adds no enforcing primitive.
- **A4** repeats the Round-4 Smart Account failure class: the proposed UX assumes a partial state that atomic execution forbids, then becomes a native recovery wrapper when corrected.
- **B4** repeats the prior market/authority failure class: an operator product without a named cooperating operator or exact signer boundary cannot use a builder fixture to claim live closure.
- Across shipped and in-flight Dami work, Backstop is an exact redemption-default adjacency; AgentTreasury and EdgeLedger cover controlled treasury duties and lifecycle receipts; Mirror and RefiRail cover recovery/repair evidence. These increase composition familiarity and do not supply missing authority.
- Interoperable Asset Products remains genuinely load-bearing to all eight underlying native journeys. That is insufficient: in every case the proposed project layer is either removable from the asset outcome, already native, factually impossible, or unauthorized.

## Survivor interface ledger

No idea survived all hard gates. Therefore no survivor interface ledger exists; producing one would falsely imply an operable finalist.

## Final disposition

- A1 CanaryMint: **KILL**
- A2 RouteFuse: **KILL**
- A3 XRP Exit Ladder: **KILL**
- A4 Homebound FXRP: **KILL**
- B1 Redemption Conservator: **KILL**
- B2 Exact-Out Redemption Queue: **KILL**
- B3 Mint Reservation Salvage Covenant: **KILL**
- B4 Redemption Duty Capsule: **KILL**

**Generators A+B contribute 0 survivors.** Every kill has at least one independent fatal gate; most have several. The outcome is evidence-driven and quota-free. Do not rank or score these ideas.
