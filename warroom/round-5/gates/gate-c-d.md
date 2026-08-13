# Round 5 Post-Freeze Gate — Generators C + D

**Track:** Interoperable Asset Products  
**Frozen corpus:** 8 ideas; Generator C SHA-256 `a5b37571543cde606729f915dca1c21a6681d328e89ae968cf776d74c9a363d4`; Generator D SHA-256 `ad9b050c176ef793c9ca65ece8a9fe9ac9ecb1b6a77ecabaa43a6e99e2a7097c`  
**Method:** strict elimination, no quota, no ranking, no aggregate score  
**Result:** **0 survivors / 8 killed**

The empty result is evidence-driven, not quota-driven. Generator C finds real operator workflows but adds local preflight, batching, or receipts around transitions the protocol already exposes. Generator D finds real holder demand but never freezes a named application, deployed address, ABI, and network in any proposal; its strongest loops are also already first-party documented. None independently clears the mechanism-novelty, protocol-composition, and demo-surprise floors.

## Evidence and decision rules

This gate used the complete Warroom instructions, active brief and PULSE, round-5 demand/opportunity/primitive maps, market-reality research, global mechanism prior art, the 99-signal collision corpus, prior and in-flight project appendix, and prior verdicts. The frozen-input hashes match [`raw-pool-freeze.md`](../raw-pool-freeze.md).

The binding local evidence is:

- [`market-reality-map.md`](../../round-3/market-reality-map.md) and the underlying market research: holder, liquidator, challenger, agent, and executor workflows are real; a holder app leg requires one specifically verified deployed interface, while a live agent-duty demo requires a cooperating registered agent.
- [`global-mechanism-prior-art-registry.md`](../../round-2/global-mechanism-prior-art-registry.md): preflight guards, simulation, proof receipts, staged workflows, exact-output calculations, and saga/checkpoint routing are established mechanism families.
- [`competitor-opportunity-map.md`](../../competitor-opportunity-map.md): the 99-project corpus is already dense in FAssets access/routing/yield (50 signals), risk/monitoring (45), agents/automation (15), and credit/liquidation (12).
- [`primitives-sheet.md`](../../primitives-sheet.md): shipped and in-flight Dami prior art includes Backstop and AgentTreasury for guarded execution, EdgeLedger for hash-bound preflight/reconciliation, GhostFund for portfolio routing/exit, and RefiRail for multi-leg capital transitions.
- Prior strict gates—[`round-2 market reality`](../../round-2/market-reality-verdict.md), [`exact interface batch 1`](../../round-2/exact-callable-interface-gate-batch-1.md), [`exact interface batch 2`](../../round-2/exact-callable-interface-gate-batch-2.md), [`round-3 C+D`](../../round-3/gates/gate-c-d.md), and [`round-4 C+D`](../../round-4/gates/gate-c-d.md)—bind the same rule: a future integration condition, fixture, generic wrapper, or project-local receipt cannot substitute for a reachable native transition.

Official interface baseline used to audit every transition:

- FAssets liquidation is already permissionless: the caller burns its FAssets and `liquidate(agentVault, amountUBA)` returns the liquidated amount and both collateral payouts. `getAgentLiquidationFactorsAndMaxAmount` exposes the current factors and cap. ([Flare FAssets product example](https://flare.network/products/fassets), [official `IAssetManager.sol`](https://github.com/flare-foundation/fassets/blob/main/contracts/userInterfaces/IAssetManager.sol#L468-L481), [liquidation interface](https://github.com/flare-foundation/fassets/blob/main/contracts/userInterfaces/IAssetManager.sol#L904-L919))
- Illegal- and double-payment challenges require FDC proofs and the agent vault; they trigger full liquidation and reward the caller. They do **not** require the challenger to approve or burn FXRP. ([official liquidation/challenge guide](https://dev.flare.network/fassets/liquidation), [challenge interfaces](https://github.com/flare-foundation/fassets/blob/main/contracts/userInterfaces/IAssetManager.sol#L934-L962))
- Redemption is already FIFO, supports partial execution, and `redeemAmount` explicitly supports arbitrary amounts including yields; after an agent pays on XRPL, `confirmRedemptionPayment(proof, requestId)` closes the duty, while delayed third-party confirmation can earn a native reward. ([official redemption guide](https://dev.flare.network/fassets/redemption), [confirmation interface](https://github.com/flare-foundation/fassets/blob/main/contracts/userInterfaces/IAssetManager.sol#L742-L778))
- Smart Accounts already bind the owner-authorized target, sender and nonce, enforce replay protection, dispatch arbitrary calls, pay an executor from minted FAssets, and provide skip, nonce-forward, fee-replacement, and executor pin/unpin controls (`0xE0`–`0xE2`, `0xD0`–`0xD1`). ([Smart Accounts overview](https://dev.flare.network/smart-accounts/overview), [mint troubleshooting](https://dev.flare.network/fassets/troubleshooting/minting-troubleshooting))
- Flare already publishes an end-to-end XRP→FXRP→vault→FXRP→XRP cycle. Firelight has a named Coston2 deployment, `deposit`, period-based `withdraw`/`redeem`, and `claimWithdraw`; Upshift has deposit, instant/delayed redeem, and claim paths. ([official cycle guide](https://dev.flare.network/smart-accounts/guides/cli/fassets-cycle), [FXRP application overview](https://dev.flare.network/fxrp/overview), [Firelight deployment and interface](https://dev.flare.network/fxrp/firelight), [Firelight withdrawal boundary](https://dev.flare.network/fxrp/firelight/withdraw))
- Contract-call guards that check before/after execution and distributed workflows with checkpoints/compensation are established primitives, not novel outcomes. ([Safe Guards](https://docs.safe.global/advanced/smart-account-guards), [Saga pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/saga))

“Single-track removal” below asks whether removing the exact Interoperable Asset primitive destroys the product. Passing it establishes track fit only; it does not establish novelty. Each independent floor is reported as pass/fail, not scored.

## Gate summary

| Idea | Market reality | Exact E2E path | Native substitute | Collision / prior art | Single-track removal | Mechanism novelty floor | Composition floor | Demo-surprise floor | Usefulness / buildability | Verdict |
|---|---|---|---|---|---|---|---|---|---|---|
| C1 Premium Fuse | Pass | Pass with live liquidation opportunity | Fails | Fails | Pass | Fails | Fails | Fails | Useful to a liquidator; narrow and opportunity-dependent | **Kill** |
| C2 Challenge Capsule | Workflow real; economics misstated | Native call exists; proposed capital leg does not | Fails | Fails | Pass | Fails | Fails | Fails | Invalid frozen mechanism and difficult live misconduct proof | **Kill** |
| C3 Redemption Duty Ladder | Conditional on cooperating agent | Fails live authority boundary | Fails | Fails | Pass | Fails | Conditional | Conditional | Useful internal ops tool; infeasible as claimed without agent signer | **Kill** |
| C4 Executor Margin Lock | Pass | Native relay exists; target is demo-owned | Fails | Fails | Pass | Fails | Fails | Fails | Buildable preflight, not a new user outcome | **Kill** |
| D1 Roundtrip First | Pass | Fails: application unspecified | Fails | Fails | Pass | Fails | Conditional | Conditional | Multi-period/multi-chain demo exceeds clean live boundary | **Kill** |
| D2 Harvest Home | Pass | Fails: application/accounting unspecified | Fails | Fails | Pass | Fails | Conditional | Fails | Principal claim is not portable across vault economics | **Kill** |
| D3 TakeHome XRP | Pass | Fails: application unspecified | Fails | Fails | Pass | Fails | Conditional | Fails | Estimate is buildable; promised band is non-atomic | **Kill** |
| D4 SafeSwitch FXRP | Pass | Fails: both applications unspecified | Fails | Fails | Pass | Fails | Conditional | Conditional | Broadest integration load and no exact route | **Kill** |

## C1 — Premium Fuse — KILL

**Plain-language substitution:** a liquidation-bot profitability check plus a prefilled native `liquidate` transaction and a before/after balance receipt.

### Every-transition authority ledger

| Transition | Authority | Exact interface | Network / boundary | Native receipt | Gate finding |
|---|---|---|---|---|---|
| Resolve Asset Manager | Any reader | Contract Registry / resolved `IAssetManager` | Flare or Coston2; live read | Resolved address | Valid. |
| Read liquidation capacity | Any reader | `getAgentLiquidationFactorsAndMaxAmount(agentVault)` | Same Flare environment | Factors and max amount | Valid; native interface already gives the actionable cap. |
| Read reference price | Any reader | FTSOv2 feed read | Same environment | Price, decimals, timestamp | Valid read, but liquidation settlement is already protocol-priced; the extra snapshot is local estimation, not settlement authority. |
| Commit capital | Liquidator | FXRP balance/allowance and wallet signature | Same environment; participant-owned | Approval/signature | Valid. |
| Execute | Any FXRP holder | `liquidate(agentVault, amountUBA)` | Same environment; only while agent is liquidatable | Transaction plus returned liquidated amount and two payouts | Valid and already complete natively. |
| Profit-floor refusal / receipt | Project UI or helper | Local comparison and balance deltas | Off-chain/project boundary | Local packet | Not a new protocol outcome and cannot guarantee inclusion-time profitability. |

**Gate finding:** the market and authority are real, and the primitive is load-bearing. The missing outcome is not missing: the native call already limits actual liquidation, returns both payout components, and produces state/balance receipts. The fuse merely checks a quote before signature. Safe-style guards and ordinary MEV/liquidator bot economics are direct substitutes. The 99-signal set contains FXRP Agent Radar, FAsset Sentry, fassets-verify, XRPShield, Haircut, Ballast, and other agent-risk/liquidation monitors; Dami adjacency is Backstop plus EdgeLedger’s bound preflight/reconciliation.

**Independent floors:** mechanism novelty **fail**; protocol composition **fail** (FTSO + Registry are reads wrapped around one native write); demo surprise **fail** (a successful call and rejected stale quote are standard preflight behavior).

**Cause of death:** native liquidation plus conventional profitability preflight already completes the claimed outcome; the new artifact is a wrapper, not a new economic state transition.

## C2 — Challenge Capsule — KILL

**Plain-language substitution:** an FDC evidence bundle that prefills the native challenge call and records the reward.

### Every-transition authority ledger

| Transition | Authority | Exact interface | Network / boundary | Native receipt | Gate finding |
|---|---|---|---|---|---|
| Observe suspected payment | Any observer | XRPL transaction data | XRPL public boundary | Transaction hash | Valid. |
| Prove payment | Challenger requests; FDC attests | Supported balance-decreasing transaction proof | XRPL→FDC→Flare | FDC proof | Valid if a qualifying finalized payment exists. |
| Bind “maximum FXRP exposure” | No native authority | None | Project-local | Local capsule | **Invalid premise:** the official challenge does not consume challenger FXRP. |
| Challenge illegal payment | Any challenger | `illegalPaymentChallenge(proof, agentVault)` | Flare/Coston2 | Challenge transaction, agent full-liquidation state, reward delta | Valid. |
| Challenge double payment | Any challenger | `doublePaymentChallenge(proof1, proof2, agentVault)` | Flare/Coston2 | Same consequence/receipt | Valid. |

**Gate finding:** the frozen Problem, Existing Workflow, Mechanism, Per-Track Test, Proof Path, and Authority Map all claim required FXRP capital, approval, exposure, burn, or delta. Official Flare documentation and the published interface show no such parameter or transfer: the challenger submits proof(s) and an agent vault, receives collateral reward, and causes full liquidation. Removing the fictitious capital lock leaves an evidence packet, expiry check, call form, and receipt—well-covered by proof-carrying audit bundles and by the dense fassets-verify/FAsset Sentry/agent-watch collision family.

**Independent floors:** mechanism novelty **fail**; protocol composition **fail** (FDC proof is natively consumed by the single challenge call); demo surprise **fail** (mutating a proof and observing rejection is expected proof validation).

**Cause of death:** a load-bearing economic premise is false, and the corrected product is a conventional proof-submission wrapper.

## C3 — Redemption Duty Ladder — KILL

**Plain-language substitution:** an agent’s redemption job queue with XRPL payment batching, deadlines, and per-request confirmation receipts.

### Every-transition authority ledger

| Transition | Authority | Exact interface | Network / boundary | Native receipt | Gate finding |
|---|---|---|---|---|---|
| Receive assigned duties | FAssets protocol | Asset Manager redemption events/state | Flare/Coston2 | Request IDs, amounts, references, deadlines | Valid; assignment is native FIFO, not project-controlled. |
| “Reserve” XRP per rung | Agent treasury policy | No XRPL reservation primitive named | Agent-local | Local record | Does not bind or protect XRP. |
| Pay each duty | Registered agent’s authorized XRPL signer | XRPL `Payment` with exact reference | XRPL/testnet | XRP transaction hash | Valid only with a cooperating registered agent/test identity controlling the correct underlying key. |
| Prove payment | FDC | Payment proof | XRPL→FDC→Flare | Proof | Valid after finality/attestation. |
| Confirm duty | Agent-vault owner; anyone only after configured delay | `confirmRedemptionPayment(proof, requestId)` | Flare/Coston2 | Obligation/collateral state and transaction | Exact authority is narrower than “permitted executor where allowed.” |
| Batch completion | Project coordinator | No atomic native batch | Cross-boundary | Local aggregate receipt | Each payment/proof/confirmation remains independent; aggregate completion is not native. |

**Gate finding:** the buyer and workflow are real, but the proposal expressly admits that without a cooperating agent/test identity its XRP-payment leg is simulated. No first user, agent vault, underlying signer, assigned request, or exact signer integration is enumerated. A public caller cannot manufacture assigned redemption duties or sign from the registered agent’s underlying XRP address. Even with a partner, this is an internal console/job-queue enhancement; native FIFO assignment, request-level references, confirmation, default, and late-confirmation incentives already define the state machine. It collides with agent-console/automation entries in the 99 corpus and the bounded-batch/treasury families in AgentTreasury and EdgeLedger.

**Independent floors:** mechanism novelty **fail**; protocol composition **conditional but insufficient** (the native XRPL→FDC→FAssets lifecycle is real, yet the project only coordinates it); demo surprise **conditional** on acquiring multiple genuine assigned duties, which the frozen plan cannot do.

**Cause of death:** missing live authority and first-user dependency, followed by generic batch-operations prior art even if that dependency were solved.

## C4 — Executor Margin Lock — KILL

**Plain-language substitution:** an executor profitability preflight around the standard Smart Account relay path.

### Every-transition authority ledger

| Transition | Authority | Exact interface | Network / boundary | Native receipt | Gate finding |
|---|---|---|---|---|---|
| Authorize operation | XRP holder | Signed XRPL payment carrying a supported reference/memo | XRPL | Transaction hash | Valid. |
| Prove authorization | Executor requests; FDC attests | Payment proof or direct-mint proof path | XRPL→FDC→Flare | Proof | Valid. |
| Bind target/nonce | XRP owner through encoded operation; Personal Account verifies | `PackedUserOperation`, sender/nonce checks, replay protection | Flare/Coston2 | Controller/Personal Account transaction | Already native. |
| Set/repair executor terms | XRP owner / protocol rules | native executor fee plus `0xE2`; pin/unpin `0xD0`/`0xD1`; recovery `0xE0`/`0xE1` | XRPL→Flare | Executed opcode/state | Already native. |
| Relay | Eligible executor | `executeDirectMinting` / `executeDirectMintingWithData` or supported Controller dispatch | Flare/Coston2 | Transaction and executor-fee delta | Valid. |
| Enforce max relay cost/minimum margin | Executor’s local policy | None in the committed user operation | Off-chain | Refusal record | A quote check, not owner authorization or protocol enforcement. |
| Target action | Personal Account under owner instruction | Arbitrary public call | Flare/Coston2 | Target receipt | Frozen demo uses only a demo-owned target, not a verified user-valued application. |

**Gate finding:** Smart Accounts already provide the security commitments presented as the lock: target bytes, sender/nonce validation, replay defense, fee payment and recovery, and executor controls. The only addition is an executor-local comparison of expected fee with gas/proof cost. That comparison cannot bind future gas or target success and does not change the owner’s operation. The demo-owned target avoids unsupported integration but also eliminates market usefulness. The closest collisions are prior Round-3 RelayProof/Sealed Call Witness concepts, Safe-style preflight guards, and Dami’s Backstop/EdgeLedger guarded-signing lineage.

**Independent floors:** mechanism novelty **fail**; protocol composition **fail** (native Smart Account relay plus local estimate); demo surprise **fail** (valid nonce executes, stale nonce refuses).

**Cause of death:** native Smart Account controls subsume the security claim, leaving ordinary relayer margin logic with no user-valued target.

## D1 — Roundtrip First — KILL

**Plain-language substitution:** make a small test deposit and withdrawal, then redeem it before depositing more.

### Every-transition authority ledger

| Transition | Authority | Exact interface | Network / boundary | Native receipt | Gate finding |
|---|---|---|---|---|---|
| Pin app route | Holder/project | “Specifically verified application” not named | Claimed Coston2 | None frozen | **Fails exact-interface admission.** |
| Trial deposit | Holder | Unnamed app `approve` + `deposit` | Coston2 claimed | Position/share event | Unsupported until app/address/ABI are fixed. |
| Withdraw to FXRP | Holder | Unnamed app withdrawal path | Coston2 claimed | FXRP delta | Unsupported; Firelight, for example, requires request, period wait, then `claimWithdraw`, not one immediate withdrawal. |
| Redeem FXRP | Holder | Asset Manager `redeemAmount`/supported redemption | Flare/Coston2 | Redemption request | Valid native leg. |
| Fulfill and prove | Assigned agent, then FDC | XRPL payment + payment proof/confirmation | Coston2→XRPL→FDC→Coston2 | XRP hash/proof | Valid but time- and agent-dependent. |
| Unlock large deposit | Project UI/policy; holder still signs | Local route-version flag | Off-chain | Local receipt | Does not prevent the holder from depositing elsewhere or prove future exit liquidity. |

**Gate finding:** the buyer and desire to test exits are real, and FAssets is load-bearing, but no application is selected. The proposal’s “hard admission gate” is a future condition, not an exact path. Official docs now provide the missing concrete candidate—Firelight at `0xC90D6847747b85d1fa2E07859869fb9fB72c0361` on Coston2—but its period-based withdrawal makes the promised immediate round-trip/demo materially different. More importantly, Flare already publishes the entire FAssets cycle through a vault and back to XRP. Manual test transactions are the direct substitute. Collision pressure is extreme across the 50 access/routing/yield signals; GhostFund and ReFiRail cover nearby route/exit proof.

**Independent floors:** mechanism novelty **fail**; protocol composition **conditional** on an integration absent from the frozen proposal; demo surprise **conditional** and operationally weak because the full cycle spans vault and FDC/agent waiting boundaries.

**Cause of death:** no frozen application interface, plus a first-party documented cycle and the universal “small test transaction” substitute.

## D2 — Harvest Home — KILL

**Plain-language substitution:** calculate vault gains from shares, partially withdraw, then use the native arbitrary-amount redemption intended for yields.

### Every-transition authority ledger

| Transition | Authority | Exact interface | Network / boundary | Native receipt | Gate finding |
|---|---|---|---|---|---|
| Establish principal | Project reads holder history | Unnamed app deposit event | Coston2 claimed | Historical event | Event amount alone is not a portable principal invariant. |
| Quote “surplus” | Unnamed app | Unnamed position/preview method | Coston2 claimed | Read result | **Fails exact interface** and omits share price, losses, fees, rewards, and queued withdrawal semantics. |
| Withdraw gains only | Holder | Unnamed partial withdrawal | Coston2 claimed | Share burn/request + eventual FXRP | Unsupported. A Firelight withdrawal is delayed and separately claimed. |
| Redeem surplus | Holder | Native `redeemAmount` | Flare/Coston2 | Request, later XRP payout/proof | Valid; official docs explicitly identify arbitrary redemption as useful for yields. |
| Prove principal preserved | Project arithmetic | Balance/share comparison | Project boundary | Local receipt | Cannot guarantee economic principal merely from nominal deposited FXRP. |

**Gate finding:** the product assumes an invariant that a generic vault does not provide. Deposit receipt amount is not necessarily equal to recoverable principal after losses, fees, or exchange-rate changes, and “surplus shares” cannot be derived without a named vault’s accounting. Once correctly scoped to one app, this is the familiar harvest/profit-skimming pattern followed by a native `redeemAmount` flow specifically documented for yields. It collides directly with yield/vault portfolio signals and GhostFund’s portfolio/exit adjacency.

**Independent floors:** mechanism novelty **fail**; protocol composition **conditional but ordinary**; demo surprise **fail** (partial withdrawal followed by XRP payout).

**Cause of death:** unsupported universal principal accounting, absent app interface, and a native redemption method already designed for the stated yield outcome.

## D3 — TakeHome XRP — KILL

**Plain-language substitution:** an exact-output withdrawal calculator that previews shares, withdraws FXRP, and then submits an arbitrary-amount redemption.

### Every-transition authority ledger

| Transition | Authority | Exact interface | Network / boundary | Native receipt | Gate finding |
|---|---|---|---|---|---|
| Read position/preview | Holder/project | Unnamed app position and preview methods | Coston2 claimed | Quote | **Fails exact-interface admission.** |
| Read FAssets terms | Any reader | Asset Manager settings/redemption parameters | Flare/Coston2 | Current minimum/fees | Valid read. |
| Bound share withdrawal | Holder | Unnamed app partial withdrawal | Coston2 claimed | Share/FXRP deltas | Unsupported until app semantics are fixed. |
| Redeem amount | Holder | `redeemAmount` | Flare/Coston2 | Actual/partial redemption events | Valid; native path already supports arbitrary and partial amounts. |
| Pay and prove take-home | Assigned agent, FDC | XRPL payment + proof | XRPL→FDC→Flare | Actual XRP payout | Valid eventually, not atomic with the quote or app withdrawal. |

**Gate finding:** the product carefully labels the output a band rather than a guarantee, but this also reveals that the mechanism is a calculator. Between preview, queued/instant app withdrawal, refreshed fees, FIFO ticket availability, agent payment, and payout, no authority holds the quote fixed. Native `redeemAmount` already handles partial/yield-sized exits and can partially complete when ticket limits are hit. The holder gets useful legibility, not a new outcome. It collides with ordinary exact-output routers/calculators and the saturated access/routing cohort.

**Independent floors:** mechanism novelty **fail**; protocol composition **conditional on the absent app**; demo surprise **fail** (desired versus actual amount and dust are expected quote reconciliation).

**Cause of death:** missing app interface and non-atomic exact-output estimation around a native arbitrary-amount redemption.

## D4 — SafeSwitch FXRP — KILL

**Plain-language substitution:** manually withdraw to the wallet, then choose another app or redeem; the UI records each step and stops on mismatch.

### Every-transition authority ledger

| Transition | Authority | Exact interface | Network / boundary | Native receipt | Gate finding |
|---|---|---|---|---|---|
| Pin source and destination | Holder/project | Two unnamed deployment manifests/ABIs | Coston2 claimed | None frozen | **Fails twice:** neither route is exact. |
| Unwind source | Holder | Unnamed source withdrawal/claim path | Coston2 claimed | Shares down, FXRP up | Unsupported. |
| Liquid FXRP checkpoint | Holder | ERC-20 balance | Coston2 | Wallet balance | Already the native result of any completed source exit. |
| Enter destination | Holder | Unnamed destination approval/deposit | Coston2 claimed | New position | Unsupported. |
| Escape to XRP | Holder, assigned agent, FDC | native redemption→XRPL payment→proof | Coston2/XRPL | Redemption and payout receipts | Valid, but separate from destination-route safety. |
| Version mismatch stop | Project UI | Local manifest comparison | Off-chain | Refusal record | A conventional saga/circuit-breaker checkpoint. |

**Gate finding:** route versioning and stopping in user-owned FXRP are sensible, but they do not create a new state. The user already owns liquid FXRP after source withdrawal and can decline the next signature or invoke redemption. The itinerary is the standard saga pattern: independently committed steps, checkpoint, retry/alternative route, receipts. It lacks the two exact apps necessary to demonstrate even that orchestration. Collision is strongest with vault/router/yield projects, ReFiRail’s multi-leg position migration, and GhostFund’s routing/exit UX.

**Independent floors:** mechanism novelty **fail**; protocol composition **conditional on two absent integrations**; demo surprise **conditional** but familiar (invalidate B, stop at wallet, choose redeem).

**Cause of death:** generic saga/checkpoint routing, native wallet custody as the alleged innovation, and two unsupported application legs.

## Survivors and exact-path ledger

**None.** No concept survives all gates, so there is no survivor path to enumerate. In particular, no killed concept may be promoted by silently substituting Firelight/Upshift for Generator D’s unnamed application, adding a cooperating agent to C3, or deleting C2’s fictitious FXRP-capital leg; each would be a post-freeze redesign requiring a fresh generation and gate pass.

