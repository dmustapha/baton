# Round 6 Post-Freeze Gate — Generators C + D

**Track:** Interoperable Asset Products

**Frozen corpus:** 8 ideas; Generator C SHA-256 `19341fc3d0a015c8c5a2055508956d077c713c8fe3b2d0aea9f12107c8dc62dc`; Generator D SHA-256 `67c918de70128c95963bd789a5cf683acb93034110076284371d0f0bb9f6f0f2`

**Method:** strict elimination; every gate is independently binding; no quota, ranking, or aggregate score

**Result:** **0 survivors / 8 killed**

The empty set is evidence-driven. The ideas identify real holder, collateral-provider, borrower, and liquidator workflows, but none freezes both a novel economic mechanism and a complete callable application path. Four depend on unnamed “verified” vault, AMM, or lending interfaces; two assume generic ERC-4626/Aave semantics that conflict with the named Flare applications available today; and the two ideas whose native FAssets path is exact merely package existing protocol actions into a portfolio policy or UI. No idea independently passes mechanism novelty, protocol composition, and demo surprise.

## Evidence and hard rules

This pass used the full active brief and PULSE, all round-3 market maps, round-5 safe maps, the research brief and 577-participant/99-signal registry, the complete collision analysis, global mechanism prior-art registry, shipped/in-flight project appendix and winner briefs, and every prior strict verdict. The frozen hashes match [`raw-pool-freeze.md`](../raw-pool-freeze.md).

Binding local evidence:

- [`market-reality-map.md`](../../round-3/market-reality-map.md) and its three source maps establish real FXRP holder, borrower, pool-provider, liquidator, challenger, agent, and executor workflows. They do not authorize inferring an application ABI merely from EVM compatibility.
- [`research-brief.md`](../../../research/research-brief.md), [`roster-intelligence.md`](../../../research/roster-intelligence.md), and [`collision-analysis.md`](../../collision-analysis.md) cover all 99 public signals. FAssets access/routing/yield, risk/monitoring, automation, and credit/liquidation are already dense fields.
- [`global-mechanism-prior-art-registry.md`](../../round-2/global-mechanism-prior-art-registry.md) makes range orders, profit skimming, debt sweeps, savings thresholds, reserve buckets, expiring permissions, bounded mandates, and staged workflows familiar mechanism families.
- [`primitives-sheet.md`](../../primitives-sheet.md) and [`catalog-prior-analysis.md`](../../catalog-prior-analysis.md) bind shipped/in-flight portfolio prior art: GhostFund on private vault allocation/exit, RefiRail on closed-loop debt-position movement, Backstop/AgentTreasury/EdgeLedger on bounded authorization and reconciliation, and Veil/9ncore/PrivLend on credit.
- Prior rounds, especially [`round-5 C+D`](../../round-5/gates/gate-c-d.md), bind the exact-interface rule: “use a verified application later” and a local/testnet fixture are not frozen market integration.

Official interface baseline used for every claimed transition:

- The Flare Mainnet registry publishes Asset Manager XRP at `0x2a3Fe068cD92178554cabcf7c95ADf49B4B0B6A8` and FXRP at `0xAd552A648C74D49E10027AB8a618A3ad4901c5bE`. ([FAssets deployed contracts](https://dev.flare.network/fassets/reference))
- `IAssetManager.liquidate(agentVault, amountUBA)` is public and returns the liquidated amount plus vault- and pool-collateral payouts; agent information, the pool address, liquidation factors, and maximum amount are public reads. Challenges and liquidation are native participant actions. ([official `IAssetManager`](https://dev.flare.network/fassets/reference/IAssetManager), [liquidation guide](https://dev.flare.network/fassets/liquidation))
- `ICollateralPool.enter()` is payable and has no amount argument; pool holders have native `exit`, `selfCloseExit`, and `withdrawFees` paths, subject to native fee-debt and exit rules. ([official `ICollateralPool`](https://dev.flare.network/fassets/reference/ICollateralPool), [collateral-pool economics](https://dev.flare.network/fassets/collateral))
- Firelight’s named Coston2 vault is period-based: `withdraw` or `redeem` creates a request, then the holder waits and calls `claimWithdraw`. Its documented deployment is `0xC90D6847747b85d1fa2E07859869fb9fB72c0361`. ([Firelight overview](https://dev.flare.network/fxrp/firelight), [withdraw boundary](https://dev.flare.network/fxrp/firelight/withdraw), [claim boundary](https://dev.flare.network/fxrp/firelight/claim))
- Upshift exposes a different lifecycle: an application-specific instant redemption with a fee, or a dated request followed by claim. These semantics cannot be replaced by a generic `IERC4626.redeem()` assumption. ([FXRP application overview](https://dev.flare.network/fxrp/overview), [Upshift instant redeem](https://dev.flare.network/fxrp/upshift/instant-redeem), [Upshift claim](https://dev.flare.network/fxrp/upshift/claim))
- Kinetic documents a live isolated FXRP–USDT0–STFXRP market: Unitroller `0x15F69897E6aEBE0463401345543C26d1Fd994abB`, ISO FXRP market `0xD1b7A5eFa9bd88F291F7A4563a8f6185c0249CB3`, and mainnet FXRP `0xAd552A648C74D49E10027AB8a618A3ad4901c5bE`. It does not validate the frozen ideas’ generic Aave-style `repay(asset,amount,rateMode,onBehalfOf)` call. ([Kinetic contracts](https://docs.kinetic.market/contracts-and-api-documentation), [supported markets](https://docs.kinetic.market/getting-started))
- SparkDEX documents a V3 concentrated-liquidity product and explicitly describes one-sided LP positions as limit-order functionality. Its public documentation reviewed here does not identify the frozen idea’s exact FXRP pair, pool address, fee tier, position manager, router, or ABI. ([SparkDEX product description](https://docs.sparkdex.ai/introduction/the-super-dapp), [official app links](https://docs.sparkdex.ai/additional-information/official-platform-links))
- A Smart Account custom instruction is an XRPL payment committing to a `PackedUserOperation`; an executor calls `executeDirectMintingWithData`, and `IPersonalAccount.executeUserOp(Call[])` atomically dispatches arbitrary calls as the Personal Account. Sender, nonce, hash, and transaction ID already provide replay/binding controls. ([custom instruction](https://dev.flare.network/smart-accounts/custom-instruction), [`IPersonalAccount`](https://dev.flare.network/smart-accounts/reference/IPersonalAccount))

“Single-track removal” asks only whether removing the exact Interoperable Asset primitive destroys the product. A pass establishes track fit, not novelty. A local pool, deterministic yield injection, or local lending deployment can demonstrate contract mechanics but cannot cure a failed market or exact-E2E gate.

## Gate summary

| Idea | Market | Exact E2E | Native substitute | Prior art / collision | Single-track removal | Mechanism novelty | Composition | Demo surprise | Usefulness / buildability | Verdict |
|---|---|---|---|---|---|---|---|---|---|---|
| C1 Exit-Price Range | Real LP behavior; exact FXRP pool absent | Fail | Fail | Fail | Pass | Fail | Fail | Fail | Understandable policy, but fixture-dependent and route-heavy | **Kill** |
| C2 Redeemable Debt Staircase | Live Kinetic market exists | Fail as frozen | Fail | Fail | Pass | Fail | Conditional | Conditional | Useful borrower UX; exact safe release and XRP return are not frozen | **Kill** |
| C3 Harvest-to-Home Vault | Real vault/yield demand | Fail | Fail | Fail | Pass | Fail | Conditional | Fail | Principal claim is unsafe across losses, fees, and queued exits | **Kill** |
| C4 Pool-to-Premium Cycle | Real pool/liquidation economics | Pass, opportunity-dependent | Fail | Fail | Pass | Fail | Fail | Fail | Native calls are buildable; live liquidation is not schedulable | **Kill** |
| D1 Just-in-Time FXRP Line | Real holder/Smart Account demand | Fail | Fail | Fail | Pass | Fail | Fail | Conditional | No named vault or target application | **Kill** |
| D2 FXRP Snowball | Real yield/debt workflow | Fail | Fail | Fail | Pass | Fail | Fail | Fail | Frozen lending ABI is wrong for verified market | **Kill** |
| D3 Yield Layaway | Plausible savings behavior | Fail | Fail | Fail | Pass | Fail | Fail | Fail | No named source/destination; principal floor is unsafe | **Kill** |
| D4 One-Exit Reserve | Real reserve/yield tradeoff | Fail | Fail | Fail | Pass | Fail | Conditional | Fail | Buildable custody policy, but unnamed vault and familiar envelope rule | **Kill** |

## C1 — Exit-Price Range — KILL

**Plain-language substitute:** a one-sided concentrated-liquidity limit order, followed by manual collect, swap, and native FXRP redemption.

| Transition | Authority | Exact interface / boundary | Gate finding |
|---|---|---|---|
| Mint FXRP | Holder, executor, FAssets | native XRP→FXRP flow | Valid. |
| Open price range | Holder | unnamed FXRP pool / position manager | **Unsupported:** no pair, pool, fee tier, manager, router, ABI, or network is frozen. |
| Cross exit price | AMM traders and price movement | external market state | Not controlled or schedulable by the product. |
| Remove/collect | LP-NFT holder | unnamed `decreaseLiquidity` / `collect` | Unsupported application leg. |
| Swap paired proceeds | Holder | unnamed router and path | Unsupported application leg and exposed to liquidity/slippage. |
| Redeem FXRP | Holder, assigned agent, FDC | native redemption lifecycle | Valid but already native. |

SparkDEX itself characterizes one-sided V3 LP functionality as limit orders. The frozen local/testnet-pool fallback proves only a project fixture and deletes the stated market anchor. Even after inserting a pool post-freeze, the product remains a familiar range order plus unwind recipe in the most saturated access/yield surface.

**Independent floors:** mechanism novelty **fail**; protocol composition **fail**; demo surprise **fail**.

**Cause of death:** the sole distinctive application leg is both unspecified and a documented limit-order pattern; the remainder is manual LP unwinding plus native redemption.

## C2 — Redeemable Debt Staircase — KILL

**Plain-language substitute:** make a partial loan repayment, withdraw whatever collateral the lending protocol permits, then redeem the released FXRP.

| Transition | Authority | Exact interface / boundary | Gate finding |
|---|---|---|---|
| Supply FXRP / borrow USDT0 | Holder, Kinetic market | a live FXRP isolated market exists | Market validated, but the frozen idea names no deployment, ABI, or receipt-token semantics. |
| Repay one step | Holder | generic `repay` category | No exact call is frozen. |
| Compute “largest safe lot” | Lending protocol plus project solver | account-liquidity reads, FXRP lot size, changing prices/liquidity | A quote, not a protocol guarantee; inclusion-time state can change. |
| Withdraw exact FXRP lot | Holder if market permits | generic `withdraw` category | No exact Kinetic call or collateral-membership transition is frozen. |
| Redeem released lot | Holder, FAssets, agent, FDC | native redemption | Valid, delayed, and not atomic with repayment/withdrawal. |

The market gap can now be named, but the frozen proposal cannot be repaired by silently substituting Kinetic after generation. Its repayment milestone does not create a new lending right: the protocol already determines whether collateral is withdrawable. “Debt staircase” is conventional amortization/collateral release, adjacent to RefiRail and the dense credit/liquidation cohort. A local lending fork would not demonstrate a current buyer workflow.

**Independent floors:** mechanism novelty **fail**; protocol composition **conditional but insufficient**; demo surprise **conditional**.

**Cause of death:** the only novel-sounding step is a non-binding safe-withdrawal calculation around ordinary partial repayment, with no frozen exact market calls.

## C3 — Harvest-to-Home Vault — KILL

**Plain-language substitute:** skim apparent vault profit, withdraw it as FXRP, and invoke the native arbitrary-amount redemption path.

| Transition | Authority | Exact interface / boundary | Gate finding |
|---|---|---|---|
| Deposit / record basis | Holder; project accounting | unnamed “ERC-4626-style” vault | Basis is local accounting, not an asset right or loss guarantee. |
| Determine gain | Vault exchange rate plus project arithmetic | generic `previewRedeem` assumption | Does not establish recoverable principal after loss, fees, rewards, or queue effects. |
| Redeem “gain-only” shares | Holder | generic `redeem` | Firelight is period-based; Upshift has distinct instant/dated paths. The generic path is false across verified candidates. |
| Return FXRP to XRP | Holder, agent, FDC | native redemption | Valid but familiar. |

This is the same product center killed as Round-5 Harvest Home. Profit skimming is familiar global prior art, the 99-signal corpus is crowded with FXRP vault/yield products, and GhostFund already occupies portfolio allocation/exit. Deterministic yield injection would make the demo local rather than prove deployable demand.

**Independent floors:** mechanism novelty **fail**; protocol composition **conditional but ordinary**; demo surprise **fail**.

**Cause of death:** unsupported portable principal accounting and mismatched vault semantics, followed by a familiar profit-skimming mechanism.

## C4 — Pool-to-Premium Cycle — KILL

**Plain-language substitute:** one wallet holds collateral-pool tokens and FXRP, then optionally invokes the public native liquidation call against the same agent.

| Transition | Authority | Exact interface / boundary | Gate finding |
|---|---|---|---|
| Join pool | Provider | `getCollateralPool(agentVault)` then payable `enter()` | Valid native path. |
| Earn/withdraw fees and exit | CPT holder | `withdrawFees`, `exit` / `selfCloseExit` | Valid native path under protocol rules. |
| Hold response lot | Holder | ordinary FXRP balance | No new state or commitment. |
| Price liquidation | Any reader / project arithmetic | native agent factors, balances, prices | A local profitability quote. |
| Liquidate | Any FXRP holder | `liquidate(agentVault, amountUBA)` | Valid, permissionless, and already economically complete. |
| Redeem unused FXRP | Holder, agent, FDC | native redemption | Valid native path. |

No contract binds the pool position to the response lot; the “same-agent relationship” is a UI filter over independently owned assets. Removing that local association leaves every economically material action intact. Pool provision does not grant special liquidation authority or premium. The live hero moment also depends on a naturally liquidatable test agent; a replay is explanatory, not executable. The idea collides with the 12-signal credit/liquidation cluster and with Backstop/RefiRail-style risk-response narratives.

**Independent floors:** mechanism novelty **fail**; protocol composition **fail**; demo surprise **fail**.

**Cause of death:** native pool and liquidation calls already provide every material state transition; the project adds only same-wallet attribution and a profitability display.

## D1 — Just-in-Time FXRP Line — KILL

**Plain-language substitute:** an owner-authorized batch withdraws their own savings immediately before spending or redepositing them.

| Transition | Authority | Exact interface / boundary | Gate finding |
|---|---|---|---|
| Commit instruction | XRPL holder | `0xFE` custom instruction / `PackedUserOperation` hash | Valid; target, nonce, and replay binding are already native. |
| Dispatch calls | executor then Personal Account | `executeDirectMintingWithData` → `executeUserOp(Call[])` | Valid, but the flow also processes the triggering direct mint; it is not a generic FDC relay detached from minting. |
| Draw from vault | Personal Account owning shares | unnamed `IERC4626.redeem()` | Unsupported; Firelight cannot supply a just-in-time immediate draw. |
| Spend in app | Personal Account | unnamed AMM `exactInput` or lending `supply` | Unsupported alternatives, not one frozen application. |
| Return residue | Personal Account | unnamed vault redeposit | Unsupported. |

Custom instructions can dispatch arbitrary calls, but that is the native composition surface, not the new product mechanism. The idea never names the owned vault position or the target application. Its “overdraft” is merely a bounded withdrawal of the holder’s own funds under an expiring mandate—familiar sweep/session-permission prior art and adjacent to Backstop, AgentTreasury, and EdgeLedger.

**Independent floors:** mechanism novelty **fail**; protocol composition **fail**; demo surprise **conditional but insufficient**.

**Cause of death:** two missing application interfaces wrapped in native Smart Account batching and a familiar bounded self-sweep.

## D2 — FXRP Snowball — KILL

**Plain-language substitute:** periodically skim vault yield, swap it, and repay debt until the balance is zero.

| Transition | Authority | Exact interface / boundary | Gate finding |
|---|---|---|---|
| Identify/redeem gain | holder or approved helper | unnamed vault / generic ERC-4626 reads | Unsupported and inherits C3’s principal-floor defect. |
| Swap gain | holder/helper | unnamed AMM `exactInput` | Unsupported pool, router, path, and minimum-output semantics. |
| Repay debt | holder/helper | `repay(asset, amount, rateMode, onBehalfOf)` category | **Interface mismatch:** this Aave-shaped call is not the documented Kinetic market interface. |
| Read zero / destroy mandate | project contract | unnamed debt read plus local state | Buildable locally, but stop-at-zero is ordinary allowance/session expiry. |

Auto-harvest-to-debt is a familiar debt-sweep strategy. Authority destruction at zero prevents overspending but does not create a new economic outcome; the loan is already repaid and ordinary bounded approvals can stop future calls. The frozen application composition cannot execute against the verified FXRP lending market as written.

**Independent floors:** mechanism novelty **fail**; protocol composition **fail**; demo surprise **fail**.

**Cause of death:** familiar yield-to-debt automation built on three unnamed or mismatched application interfaces.

## D3 — Yield Layaway — KILL

**Plain-language substitute:** save harvested yield in a bucket until it reaches a target, then deposit that bucket into another product.

| Transition | Authority | Exact interface / boundary | Gate finding |
|---|---|---|---|
| Harvest source surplus | permissionless caller under holder approval | unnamed vault `redeem` | Unsupported; “surplus” and principal preservation are not generic invariants. |
| Accumulate | project contract | internal non-transferable FXRP balance | Project-local escrow/bucket. |
| Reach target | project contract | threshold comparison | Familiar goal-based savings/layaway state. |
| Open destination position | holder | unnamed `deposit` or lending `supply` | Two alternatives, no address, ABI, network, or exact receiver semantics. |
| Expire/refund | holder/project contract | local deadline and FXRP transfer | Familiar escrow expiry/refund. |

No exact source or destination exists in the frozen design, and the user-visible mechanism is standard target savings with expiry. The second application does not deepen composition when it is only the destination of accumulated tokens. It sits squarely in the 50-signal access/yield cluster and repeats GhostFund’s application-allocation neighborhood.

**Independent floors:** mechanism novelty **fail**; protocol composition **fail**; demo surprise **fail**.

**Cause of death:** a familiar threshold bucket between two unspecified applications, dependent on unsafe generic principal accounting.

## D4 — One-Exit Reserve — KILL

**Plain-language substitute:** keep one envelope of FXRP liquid, invest only the excess, and refill the envelope after spending it.

| Transition | Authority | Exact interface / boundary | Gate finding |
|---|---|---|---|
| Set target/recipient | holder | project contract state | Buildable holder policy. |
| Hold reserve | project contract or Personal Account | ERC-20 balance | Familiar segregated balance; no native FAssets reservation exists. |
| Deposit excess | holder/project contract | unnamed vault `deposit` | Unsupported application and unclear share receiver in the frozen path. |
| Redeem reserve | holder through project path | native Asset Manager redemption | Native path; settlement remains asynchronous and agent-dependent. |
| Prove XRP payment/reset gate | FDC then project contract | proof/confirmation plus local state | Buildable after settlement, but the reset is local envelope budgeting. |

The reserve-versus-yield tradeoff is real, but the mechanism is the emergency-fund/envelope-budget pattern. FAssets defines the amount and discharge, while the project merely refuses to invest a balance threshold. It does not reserve redemption capacity, lock an agent, or guarantee timing. The unnamed vault prevents an exact E2E demo; Firelight’s queued exit cannot simply be assumed away.

**Independent floors:** mechanism novelty **fail**; protocol composition **conditional but ordinary**; demo surprise **fail**.

**Cause of death:** familiar reserve-bucket policy, no protocol-level exit right, and no frozen productive application.

## Survivors and exact full paths

**None.** No idea survives all hard gates, so there are no survivor paths to enumerate.

For avoidance of doubt, none may be promoted by post-freeze substitution of Kinetic, SparkDEX, Firelight, or Upshift; by replacing a local fixture with a market claim; or by deleting the unsupported principal/accounting assumptions. Any such change is a new concept requiring a fresh freeze and full gate pass.
