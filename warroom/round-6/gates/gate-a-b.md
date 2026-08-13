# Round 6 Strict Post-Freeze Gate — Generators A+B

Date: 2026-08-13  
Scope: all eight frozen ideas in `round-6/raw/generator-a.md` and `round-6/raw/generator-b.md`  
Frozen SHA-256: Generator A `614fa9d758ec389724ebab68735a6e13cac6b2019155eaf9039aeb2578eea1a2`; Generator B `f7df6dad30fcf847736dc642a961bca5e600f3bf4d8957dae503f3f1db12f52e`  
Track contract: single-track, Interoperable Asset Products  
Method: non-compensating Market Reality, every-transition authority/interface/network/boundary/receipt, native substitute, global substitution, 99-signal event collision, shipped/in-flight portfolio collision, Interoperable removal, independent mechanism novelty, protocol-composition novelty, demo surprise, usefulness, and one-builder buildability gates. No survivor quota, aggregate score, or comparative ranking is used.

## Binding evidence and interface baseline

- FXRP holders and protocol participants are real, but category demand is not product demand. The event research records 3.4 million FXRP DeFi transactions and about 16,500 users as of May 2026, while Upshift documents a live earnXRP vault and two actual withdrawal modes. This admits the buyer classes while still requiring a reason to switch. [Research brief](../../../research/research-brief.md), [Upshift earnXRP workflow](https://learn.upshift.finance/en/articles/14471229-earnxrp-on-flare-how-to-earn-yield-on-your-xrp)
- A concrete FXRP vault exists, but its exit is not the generic synchronous `IERC4626.redeem()` assumed repeatedly in Generator A. Upshift exposes `requestRedeem(shares,receiver,holder)` followed by a dated `claim(...)`, or fee-bearing `instantRedeem(...)`; its official interface also exposes `convertToAssets`, previews, withdrawal fees, and epoch state. [Upshift vault interface](https://docs.upshift.finance/developer-docs/vault-contract-interface), [Upshift architecture](https://docs.upshift.finance/architecture/vault-architecture)
- Firelight is ERC-4626-shaped and accepts FXRP, but the launch vault issues stXRP and its withdrawal lifecycle must still be bound to the deployed vault and exact exit method. A generic standard name is not a frozen app integration. [Firelight vaults](https://docs.firelight.finance/introducing-firelight/core-features/vaults), [Firelight workflows](https://docs.firelight.finance/technical-documents/common-workflows)
- Smart Accounts provide exact, supported Firelight and Upshift instruction families. Firelight has `deposit`, `redeem`, and `claimWithdraw`; Upshift has `deposit`, `requestRedeem`, and `claim`. The same official surface exposes native `0xE0`, `0xE1`, and `0xE2` recovery/fee-replacement instructions. [Official FAsset instructions](https://dev.flare.network/smart-accounts/fasset-instructions)
- `IAssetManager.liquidate(agentVault,amountUBA)` burns up to the FXRP owned by the **caller** and pays that caller vault collateral plus pool-native collateral. The outputs are heterogeneous collateral, not FXRP. `illegalPaymentChallenge`, `doublePaymentChallenge`, and `freeBalanceNegativeChallenge` accept FDC proofs, trigger full liquidation, and reward the caller; the challenge calls do not require a challenger FXRP stake. [Official `IAssetManager.sol`](https://github.com/flare-foundation/fassets/blob/main/contracts/userInterfaces/IAssetManager.sol), [official liquidation guide](https://dev.flare.network/fassets/liquidation)
- Smart Account `0xFE` commits the hash of `PackedUserOperation`, including sender, nonce, calls, and a fixed executor fee encoded in the XRPL instruction. An executor obtains the FDC proof and calls `executeDirectMintingWithData`; the controller executes atomically and emits `UserOperationExecuted`. Production starts with a Flare-operated executor, while the guide's one-process flow is explicitly a demo boundary. [Official custom-instruction guide](https://dev.flare.network/smart-accounts/guides/typescript-viem/custom-instruction-ts), [official overview](https://dev.flare.network/smart-accounts/overview)
- Event collision pressure is decisive but never the only kill. The 99-signal corpus makes simple vault/yield/lending, automated guards, liquidation/challenger tooling, Smart Account lifecycle tooling, and receipt products crowded. Direct threats include Autopilot, SealedFi, the public FXRP vault, Ballast, Backstop, Haircut, FAsset Sentry, FAsset Task Bounty, ProofVault, and the audited FAsset Liquidator surface. [Opportunity-map collision appendix](../../competitor-opportunity-map.md), [roster registry](../../../research/roster-intelligence.md), [official FAsset Liquidator audit](https://dev.flare.network/assets/files/20231207-Coinspect-Flare-Smart_Contract_Review-FAsset_Liquidator-v231207-59702b90f3f564fedc2436ebc2cca35e.pdf)
- Global substitution includes profit skimming/high-water marks, take-profit, stop-loss with keeper execution, threshold savings, scheduled/epoch withdrawals, commit-reveal bounties, time-locked capital, relayer auctions, progressive reinvestment, and expiring attempts. Prior rounds already killed Harvest Home, Premium Fuse, Challenge Capsule, Executor Margin Lock, Redemption Ladder, private unwind/circuit-breaker families, and lifecycle receipt wrappers. [Global prior-art registry](../../round-2/global-mechanism-prior-art-registry.md), [Round 5 gate cross-audit](../../round-5/gates/cross-audit.md)
- Portfolio collision remains non-compensating. GhostFund owns private yield-vault policy, RefiRail owns one-action financial repair with before/after proof, Backstop owns FDC-backed FAssets protection, AgentTreasury and EdgeLedger own bounded execution/reconciliation, and Mirror owns recovery evidence. No A+B concept is killed only by adjacency; each fails an earlier market, interface, substitute, novelty, or buildability gate.

## Verdict matrix

`PASS` means only that the named gate is not independently fatal. One `KILL` is terminal.

| Idea | Market reality | Every-transition operability | Native substitute | Global/event/portfolio collision | Interoperable removal | Novelty/composition/demo floors | Usefulness/buildability | Final |
|---|---|---|---|---|---|---|---|---|
| A1 GainLock | Real vault holder; weak switch beyond manual partial withdrawal | **KILL:** no deployed vault/router, network, ABI, output asset, or correct queued-vs-instant exit is frozen | Vault preview/partial exit plus ordinary take-profit/harvest | Harvest/profit-skimming; simple vault/yield cluster; GhostFund adjacency | FXRP vault and swap are relevant, but FAssets origin is replaceable by any ERC-20 vault asset | **KILL:** familiar gain skimmer; ordinary vault→DEX composition; no surprise beyond a partial withdrawal | One app could be built, but not the advertised generic cross-app product | **KILL** |
| A2 FXRP Thermostat | Real lending/exit behavior; no evidence holders demand this volatility rule | **KILL:** lending market, address, ABI, volatility-window source, and exact redemption amount path are absent | Alerts plus manual withdraw; keeper stop-loss/repay/boost products already close the job | Stop-loss/circuit breaker; Ballast/SealedFi/risk cluster; GhostFund/RefiRail adjacency | FXRP redemption is optional until holder marks `ExitOnly`; the core thermostat survives with any lending token | **KILL:** standard hysteretic risk automation; three unresolved integrations; staged oracle reveal is familiar | FTSO + lending + redemption/FDC is too broad, and a paid/default XRP receipt cannot be forced in 90 seconds | **KILL** |
| A3 Redemption Battery | Real vault gains and native redemption; weak evidence for a new battery product | **KILL:** no exact vault; generic `redeem()` misstates Upshift; principal accounting and threshold parameters are not app-bound | Manual harvest followed by native arbitrary-amount `redeemAmount` | Threshold savings/yield skimming; Round-5 Harvest Home; vault/yield cluster; GhostFund adjacency | FAssets redemption is necessary to reach XRP, but the “battery” layer is removable scheduling | **KILL:** familiar accumulate-until-minimum mechanic; ordinary vault→redemption composition; battery animation is presentation | Multi-epoch vault gain plus FDC/agent payment is not a self-contained judge path | **KILL** |
| A4 Earn-or-Exit Covenant | Real vault inertia; no primary evidence for holder-set productivity covenants | **KILL:** no deployed vault/ABI; synchronous `redeem()` and realized-profit branch are not portable across Upshift/Firelight | Calendar/manual exit; conditional take-profit and expiring deposit strategies | Take-profit/stop-loss/term deposit; SealedFi/Autopilot/vault cluster; GhostFund/EdgeLedger adjacency | Vault expiry remains the product if XRP redemption is removed; FAssets is an optional terminal button | **KILL:** familiar performance hurdle plus expiry; ordinary epoch vault orchestration; two accelerated fixtures are not live economics | Needs fabricated yield or elapsed epochs and later redemption; claimed full demo is not credible | **KILL** |
| B1 StrikeSlices | Real permissionless liquidator and premium; no evidence for delegated slice capital | Technically callable only if the contract owns FXRP; **KILL:** frozen proof omits exact collateral-valued premium accounting and profitable-slice guarantee | A liquidator can call `liquidate` directly with any amount up to its balance | Time-locked capital/keeper bounty; FAsset Liquidator, Premium Fuse, challenger/risk cluster | Native liquidation is load-bearing; slices are removable capital packaging | **KILL:** familiar escrowed capital rental and duration split; wrapper composition; countdown is not a new outcome | Cannot deterministically stage a live liquidatable agent or guarantee smallest-profitable execution; capital owner bears race risk | **KILL** |
| B2 PremiumBurnback | Real repeated liquidation possibility; repeated wins are not evidenced as a stable user workflow | **KILL:** liquidation returns vault collateral plus pool native collateral, not FXRP; no swap/reacquisition interface can create `nextReserve` | Manual capital recycling after native liquidation | Progressive reinvestment/anti-martingale; Premium Fuse and operator tooling; EdgeLedger adjacency | FAssets is necessary for the first result, but the claimed FXRP cycle cannot close | **KILL:** familiar reinvestment curve; false asset composition; arc/reset demo rests on nonexistent FXRP output | A third swap leg and live successive liquidations exceed a credible one-builder demo | **KILL** |
| B3 ProofDividend | Real challenger/reward path; split challenger/executor roles are project-created rather than evidenced | Native challenge is callable through a wrapper and rewards that wrapper; **KILL:** “execution capital reimbursement” has no native capital leg beyond gas and the project waterfall is not protocol state | One challenger directly submits proof and receives the full native reward | Commit-reveal bounty/reward waterfall; FAsset Task Bounty, ProofVault, Challenge Capsule; AgentMesh/solv-001 adjacency | FDC/FAssets challenge is load-bearing, but dividend/deductible allocation is removable | **KILL:** familiar bounty escrow and gas reimbursement; wrapper composition; payout split is unsurprising | Requires a real illegal/double payment and timely FDC proof; otherwise the hero reward is a fixture | **KILL** |
| B4 SalvageSlope | Real holder/executor delay and fee behavior | **KILL:** native executor fee is fixed in the XRPL commitment; project attempt reservations cannot gate public `executeDirectMintingWithData`, and no separate funded payout interface is specified | Eventual permissionless execution plus native `0xE2` executor-fee replacement | Relayer auction/escalating bounty/attempt bond; Executor Margin Lock, Relay Epoch, Smart Account tooling; EdgeLedger adjacency | Smart Account execution is load-bearing; slope/bond layer is not consumed by controller or Asset Manager | **KILL:** familiar dynamic keeper fee; disconnected composition; countdown duplicates native salvage states | Requires competing executors, FDC timing, and a named final FXRP app; none is frozen | **KILL** |

## Per-idea authority and interface audits

### A1 — GainLock — KILL

| Transition | Authorized actor | Exact interface / network | Boundary and receipt | Finding |
|---|---|---|---|---|
| Deposit FXRP | Holder or holder-authorized contract | Frozen idea says `IERC4626.deposit`; no vault/address/network | Hypothetical `Deposit` event/shares | **KILL:** category, not integration. |
| Calculate and withdraw gain | Share owner/approved contract | `convertToAssets` + frozen generic `redeem`; Upshift actually uses `requestRedeem`+`claim` or `instantRedeem` | App-dependent quote, fee, epoch, withdrawal events | **KILL:** no universal synchronous surplus transition. |
| Swap gain | Contract holding released FXRP | “verified AMM `exactInput`”; no router/address/path/network | Hypothetical swap event/output | **KILL:** exact external transition absent. |
| Preserve floor | Project contract only | Internal arithmetic | Project refusal event | Valid project state, not a protocol guarantee against vault loss or fee-adjusted principal erosion. |

**Plain-language substitution:** skim gains above a high-water mark and swap them while leaving nominal principal invested. This is established profit harvesting/take-profit behavior. The closest event surface is the saturated FXRP vault/yield cluster; GhostFund adds portfolio adjacency. The Flare composition is ordinary and incomplete, and the wow moment is a partial vault withdrawal.

**Cause of death:** unnamed and incorrectly generalized application interfaces, followed by familiar profit-skimming mechanics and weak chain necessity.

### A2 — FXRP Thermostat — KILL

| Transition | Authorized actor | Exact interface / network | Boundary and receipt | Finding |
|---|---|---|---|---|
| Supply/withdraw FXRP | Holder/approved contract | Only Aave-shaped `supply/withdraw` category; no verified Flare market/address/ABI | Hypothetical lending events | **KILL:** no callable app row. |
| Derive volatility range | Public reader/project | FTSOv2 is named, but feed ID, observation window, and onchain range method are absent | Project calculation at best | **KILL** to autonomous causal trigger. |
| Move one bounded step | Project contract over approved position | Depends on absent lending authorization/market | Project epoch event plus app event | Conditional only. |
| Redeem `ExitOnly` slice | Holder | `IAssetManager.redeemAmount` on Flare/Coston2, then assigned-agent XRP payment and FDC proof | Native request; eventual paid/default branch | Callable, but amount, recipient, and live timing are not frozen. |

**Plain-language substitution:** when volatility crosses a high threshold, a keeper withdraws investment in steps; after a calmer cooldown it reinvests. That is a hysteretic stop-loss/rebalance guard. Ballast, SealedFi, generic risk automation, and prior private-unwind rounds crowd the surface. Making a slice permanently exit-only is bounded authorization, not a new economic state.

**Cause of death:** no exact lending integration or volatility trigger, plus direct global stop-loss/circuit-breaker substitution and an optional FAssets exit.

### A3 — Redemption Battery — KILL

| Transition | Authorized actor | Exact interface / network | Boundary and receipt | Finding |
|---|---|---|---|---|
| Measure surplus | Vault share owner/project | Generic `convertToAssets`; no vault/address/accounting model | Quote only | **KILL:** nominal deposit is not a portable loss/fee-adjusted principal invariant. |
| Charge FXRP | Approved contract | Frozen generic `redeem`; Upshift exit is queued or fee-bearing instant | App-dependent request/claim | **KILL:** exact transition absent/misstated. |
| Discharge to XRP | Holder/project holding FXRP | `redeemAmount(amountUBA,recipient,executor)` on Asset Manager | Native request and FXRP burn | PASS for request authority. |
| Prove XRP paid | Assigned agent then eligible confirmer/FDC | XRPL payment; `confirmRedemptionPayment` under native authority/timing | Payment proof and terminal native event | PASS eventually, not controllable for the short demo. |

**Plain-language substitution:** sweep gains into a bucket until a minimum payout size is reached, then cash out. This is threshold savings plus yield skimming. Native `redeemAmount` already exists for arbitrary/yield-sized redemptions; the battery neither changes assignment nor improves finality.

**Cause of death:** absent vault semantics and familiar threshold harvesting wrapped around the native redemption path.

### A4 — Earn-or-Exit Covenant — KILL

| Transition | Authorized actor | Exact interface / network | Boundary and receipt | Finding |
|---|---|---|---|---|
| Commit epoch and deposit | Holder | Project configuration plus unnamed `IERC4626.deposit` | Project event plus hypothetical deposit | **KILL:** no deployed app row. |
| Measure hurdle | Project | Generic `convertToAssets`; fees, claims, delayed withdrawals, and losses are app-specific | Project branch | Conditional only. |
| Exit on miss | Preauthorized project contract | Frozen generic `redeem`; Upshift/Firelight have distinct request/claim behavior | App-dependent | **KILL:** settlement timing and authority unresolved. |
| Recommit or redeem to XRP | Holder | Project signature or native `redeemAmount` | Project renewal or native request | Callable separately; XRP exit is optional. |

**Plain-language substitution:** a term deposit must meet a return hurdle or automatically becomes liquid; renewal requires consent. That is a familiar performance covenant/expiring strategy. Removing FAssets redemption leaves the same vault product, so the interoperable lifecycle is not pivotal to the mechanism.

**Cause of death:** unnamed vault, nonportable synchronous-exit assumptions, familiar term/hurdle mechanics, and removable FAssets composition.

### B1 — StrikeSlices — KILL

| Transition | Authorized actor | Exact interface / network | Boundary and receipt | Finding |
|---|---|---|---|---|
| Fund slices | FXRP owner | ERC-20 `approve/transferFrom` to project contract on Flare/Coston2 | Deposit event/balance | PASS as holder custody delegation. |
| Detect eligibility | Public reader/caller | `getAgentLiquidationFactorsAndMaxAmount(agentVault)` and agent state | Current read only | PASS as estimate, not profit guarantee. |
| Execute slice | Project contract, because it owns FXRP | `liquidate(agentVault,amountUBA)` | FXRP burned; vault-token and native collateral returned to contract | PASS technically. |
| Split “premium” | Project contract | Internal formula over heterogeneous returned collateral; no exact valuation/swap frozen | Project payout event | **KILL:** principal/premium separation and common payout asset are unresolved. |
| Refund expiry | Slice owner | Project withdrawal | Balance/event | PASS project state. |

**Plain-language substitution:** lock capital in expiring lots and let a keeper deploy one lot for a duration-weighted cut. This is time-locked capital rental plus a keeper bounty. Direct native liquidation already accepts an amount chosen by the capital owner; the FAsset Liquidator prior contract and event liquidator tooling erase composition novelty. A live unhealthy agent and favorable inclusion-time price cannot be staged reliably.

**Cause of death:** a familiar escrowed-capital wrapper with incomplete returned-collateral economics and no credible 90-second live opportunity.

### B2 — PremiumBurnback — KILL

| Transition | Authorized actor | Exact interface / network | Boundary and receipt | Finding |
|---|---|---|---|---|
| Configure/deposit FXRP | Holder | Project contract and ERC-20 allowance | Project event/balance | PASS. |
| Liquidate | Contract holding FXRP | `IAssetManager.liquidate(agentVault,amountUBA)` | Burns FXRP; returns vault collateral and pool-native collateral | PASS for one native action. |
| Derive premium | Project | Returned amounts plus price/accounting reads not frozen | Project calculation | Conditional and multi-asset. |
| Create next FXRP reserve | No actor/interface named | Requires acquiring FXRP from returned collateral through an AMM or holder top-up | No receipt | **KILL:** cycle cannot close. |
| Reset/unlock | Project/holder | Internal state and withdrawal | Project event | PASS only for whatever assets are actually held. |

**Plain-language substitution:** reinvest an increasing fraction after consecutive wins, reset after a loss. This is a progressive reinvestment/anti-martingale rule. More importantly, the frozen mechanism assumes the native liquidation premium returns as FXRP when the interface returns two collateral classes.

**Cause of death:** false output-asset premise, missing FXRP reacquisition path, and familiar progressive reinvestment mechanics.

### B3 — ProofDividend — KILL

| Transition | Authorized actor | Exact interface / network | Boundary and receipt | Finding |
|---|---|---|---|---|
| Commit proof hash/deductible | Challenger | Project contract | Project event/funds | PASS as project-created bounty state. |
| Obtain evidence | Challenger | FDC `BalanceDecreasingTransaction` proof(s) for XRP/testXRP | FDC response | PASS when a real illegal/double/negative-balance payment exists. |
| Submit challenge | Wrapper contract as protocol caller | `illegalPaymentChallenge`, `doublePaymentChallenge`, or `freeBalanceNegativeChallenge` | Full liquidation plus native reward to wrapper | PASS if wrapper is the exact caller and proof is live. |
| Reimburse “execution capital” | Project contract | Internal payout; native challenge consumes gas, not an FXRP capital leg | Project event | **KILL:** claimed second economic role is not evidenced by protocol. |
| Pay dividend/expiry bounty | Project contract | Internal waterfall over actual reward/deductible | Project event | Callable, but not protocol state. |

**Plain-language substitution:** a researcher posts a deductible, a submitter advances gas, and a successful bounty is split by reveal time. This is commit-reveal bounty escrow plus gas reimbursement. FAsset Task Bounty, ProofVault, Challenge Capsule, and security-work portfolio directions already occupy the surface; direct challenge is the simpler native substitute.

**Cause of death:** a project-created two-sided bounty around a directly permissionless challenge, with no native execution-capital need and insufficient novelty/demo independence.

### B4 — SalvageSlope — KILL

| Transition | Authorized actor | Exact interface / network | Boundary and receipt | Finding |
|---|---|---|---|---|
| Commit instruction and executor fee | XRPL owner | `0xFE` memo commits user-op hash and fixed `executorFeeUBA`; XRPL | Signed XRPL payment | PASS natively; fee is fixed. |
| Reserve attempt/post bond | Any executor | Project contract only | Project reservation event | PASS project state, not recognized by Asset Manager/controller. |
| Execute operation | Any eligible executor under native timing | `executeDirectMintingWithData(proof,data)` on Flare/Coston2 | Atomic mint/action and `UserOperationExecuted` | PASS natively; project cannot grant exclusivity. |
| Raise claimable fee | Project contract, if separately funded | No separate funded fee escrow, success oracle, or payout method frozen | No exact receipt | **KILL:** native fee cannot follow the slope. |
| Replace insufficient fee | XRPL owner | Native `0xE2` replacement instruction | Native replacement event/state | Existing substitute. |

**Plain-language substitution:** a relayer reward rises with delay and failed reservers forfeit bonds to the next relayer. This is an escalating keeper auction with expiring attempt bonds. Native execution remains public and independent of the reservation, while native `0xE2` already addresses fee insufficiency.

**Cause of death:** the slope is not consumed by the Smart Account path, the native fee is fixed in the committed instruction, and the remaining mechanism is familiar relayer-auction prior art.

## Survivor interface ledger

**None.** No A+B concept survives all non-compensating gates, so there is no survivor interface path to enumerate. The following are explicitly prohibited post-freeze repairs:

- silently replacing Generator A's generic vault with Upshift or Firelight and rewriting synchronous `redeem()` into request/claim semantics;
- adding a Kinetic/SparkDEX address, ABI, route, or live liquidity assumption after the fact;
- adding an AMM conversion to make PremiumBurnback's heterogeneous collateral output become FXRP;
- reframing ProofDividend's gas cost as an evidenced capital-provider market;
- adding a separate funded executor-fee contract to SalvageSlope or claiming its attempt reservation gates native execution.

Each would create a materially new concept version requiring a new freeze and gate.

## Final disposition

- GainLock: **KILL**
- FXRP Thermostat: **KILL**
- Redemption Battery: **KILL**
- Earn-or-Exit Covenant: **KILL**
- StrikeSlices: **KILL**
- PremiumBurnback: **KILL**
- ProofDividend: **KILL**
- SalvageSlope: **KILL**

Result: **0 PASS / 8 KILL.** Do not score this batch. The nearest technically callable idea is StrikeSlices, but its project layer is familiar time-locked capital rental, its returned-collateral economics are incomplete, and its live demo depends on an uncontrollable liquidation opportunity. No attractive interface fragment compensates for failed novelty, composition, market-switch, or demo/buildability floors.
