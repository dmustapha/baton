# Round 6 Strict Post-Freeze Gate — Generator E

**Track:** Interoperable Asset Products  
**Frozen input:** 4 ideas; SHA-256 `8fc949e71800b720c21f39aac46487c0ce5b33b89a350b74b79328f38ca24316` (matches [`raw-pool-freeze.md`](../raw-pool-freeze.md))  
**Method:** hard-gate elimination; no quota, ranking, aggregate score, or compensating strengths  
**Result:** **0 survivors / 4 killed**

Generator E is well anchored in real FAssets participants, but none of its four new project contracts clears every independent gate. PoolProof Kicker fails exact-interface and economic-unit checks before novelty. Provenance Floor has a callable atomic path, but its frozen inequality does not measure the holder's claimed personal pool loss and reduces to a familiar transaction postcondition. Clearance Dividend has no rationally paid early executor and repackages an ordinary completion bounty around repeated native liquidations. TwinProof Relay cannot hold its reward-split bargain because balance-decreasing proofs are publicly reusable by a direct native challenger, bypassing the relay.

## Binding evidence and rules

This audit used the complete Warroom skill, active brief §11, PULSE facts/decisions, full market evidence, frozen safe maps, the 99-signal corpus, global prior-art registry, prior-project appendix, and all prior round verdicts. Official primary sources were refreshed for every load-bearing native call.

- Collateral providers deposit native FLR, receive pool tokens, earn FAsset fees, bear pool-collateral loss, and must withdraw remaining fees before exit. The current public pool ABI is payable `enter()`—not `enter(uint256)`—plus `withdrawFees(uint256)`, `exit(uint256)`, `poolToken()`, `agentVault()`, `totalCollateral()`, and `fAssetFeesOf(address)`. ([official collateral guide](https://dev.flare.network/fassets/collateral), [official `ICollateralPool`](https://dev.flare.network/fassets/reference/ICollateralPool), [source interface](https://github.com/flare-foundation/fassets/blob/main/contracts/userInterfaces/ICollateralPool.sol))
- Any FAsset holder can liquidate an eligible agent. `liquidate(agentVault, amountUBA)` burns the caller's FAssets and returns the actual liquidated amount plus vault- and pool-collateral payouts; `getAgentLiquidationFactorsAndMaxAmount` exposes current factors and the maximum amount. ([official liquidation guide](https://dev.flare.network/fassets/liquidation), [source interface](https://github.com/flare-foundation/fassets/blob/main/contracts/userInterfaces/IAssetManager.sol#L464-L478), [implementation](https://github.com/flare-foundation/fassets/blob/main/contracts/assetManager/facets/LiquidationFacet.sol#L55-L109))
- Illegal- and double-payment challenges accept one or two `IBalanceDecreasingTransaction.Proof` values plus the agent vault. Success triggers full liquidation and pays the caller from vault collateral; neither method returns a result value. The emitted `IllegalPaymentConfirmed` or `DuplicatePaymentConfirmed`, agent state, transaction status, and reward balance delta are the receipts. ([official challenge guide](https://dev.flare.network/fassets/liquidation), [source interface](https://github.com/flare-foundation/fassets/blob/main/contracts/userInterfaces/IAssetManager.sol#L937-L962), [implementation](https://github.com/flare-foundation/fassets/blob/main/contracts/assetManager/facets/ChallengesFacet.sol))
- FDC `BalanceDecreasingTransaction` is a public attestation type. The current FAssets verifier checks source chain and proof validity but, unlike certain mint paths, does not apply `verifyProofOwnership` inside `verifyBalanceDecreasingTransaction`; therefore a revealed valid challenge proof is not relay-exclusive. ([official FDC overview](https://dev.flare.network/fdc/overview), [official attestation types](https://dev.flare.network/fdc/attestation-types), [FAssets verification source](https://github.com/flare-foundation/fassets/blob/main/contracts/assetManager/library/TransactionAttestation.sol#L89-L98))
- The official reference lists deployed FAssets surfaces on Flare Mainnet, Coston2, Songbird, and Coston; mutable FAssets addresses must be resolved through the registry. ([official deployments/reference](https://dev.flare.network/fassets/reference), [registry guide](https://dev.flare.network/fassets/developer-guides/fassets-asset-manager-address-contracts-registry))
- Event collision is unusually direct: FAsset Sentry already discovers agents, monitors XRPL, obtains FDC evidence, simulates and submits `illegalPaymentChallenge`, and emits an end-to-end challenge/reward receipt. FAsset TaskBounty already escrows FTestXRP for public work and has a live two-party completion/reward path. Backstop already runs an autonomous proof-requesting keeper. The wider C2 cluster contains Ballast, LedgerGuard, fassets-verify, Haircut, XRPShield, Herkos, Vouchsafe, and agent-risk/liquidation products. ([FAsset Sentry](https://github.com/Alike001/fasset-sentry), [FAsset TaskBounty](https://github.com/SharkHand3/fasset-taskbounty), [Backstop](https://github.com/edycutjong/backstop))
- Global prior art includes escrowed task/keeper bounties, deadline bonuses, batched execution, pro-rata fallback settlement, slippage/minimum-output checks, and transaction guards with pre/post-state assertions. Safe documents guards that inspect a transaction before execution and final account state afterward. ([Safe Guards](https://docs.safe.global/advanced/smart-account-guards))

The independent floors are binary here: user-visible mechanism novelty, protocol-composition novelty, and demo surprise must each clear the round's floor. Track relevance, a real buyer, or a valid native call cannot compensate for any failed floor.

## Gate summary

| Idea | Market reality | Exact every-transition path | Native substitute / economic validity | Event/global/portfolio collision | Track removal | Mechanism novelty | Composition novelty | Demo surprise | Verdict |
|---|---|---|---|---|---|---|---|---|---|
| E1 PoolProof Kicker | Provider/challenger roles real; extra-provider bounty demand unproved | **Fail:** wrong `enter(uint256)` signature; exposure formula mixes pool-token and FXRP units | **Fail:** native challenge already pays a fixed reward; frozen kicker has no defensible conversion or shortage proof | **Fail:** FAsset Sentry, TaskBounty, Backstop keeper, generic success bounty | Pass in isolation | Fail | Fail | Conditional/fixture-dependent | **Kill** |
| E2 Provenance Floor | Liquidator-provider role possible but niche | Native liquidation call valid; personal-loss calculation incomplete | **Fail:** bound measures gross pool payout, not holder's pro-rata pool loss; native call already returns split | **Fail:** direct Round-5 Premium Fuse adjacency; Safe-style postcondition/slippage guard | Pass | Fail | Fail | Fail | **Kill** |
| E3 Clearance Dividend | Liquidation economics real; stranded-remainder demand unproved | Contract can escrow and liquidate, but premium accounting/executor compensation is incomplete | **Fail:** early executors pay gas without promised compensation; target is owner-defined, not native completion | **Fail:** keeper/task completion bounty plus bounded batch; dense liquidation automation | Pass | Fail | Fail | Conditional | **Kill** |
| E4 TwinProof Relay | Challenge role real; independent proof-holder market unproved | Native pair call valid through relay, but relay exclusivity fails | **Fail:** revealed public proofs can be submitted directly; commit alone cannot help a second finder discover the linked proof | **Fail:** commit/reveal + finder bounty + reward split; direct FAsset Sentry/TaskBounty surface | Pass | Fail | Conditional but bypassed | Conditional/fixture-dependent | **Kill** |

## E1 — PoolProof Kicker — KILL

**Plain-language substitution:** a depositor posts an expiring success bounty so a public keeper prioritizes evidence against the depositor's chosen counterparty.

### Every-transition authority ledger

| Transition | Existing actor with authority | Exact interface / source | Network and controlled state | Live boundary and receipt | Finding |
|---|---|---|---|---|---|
| Enter pool | FLR holder | `ICollateralPool.enter()` payable | Flare-family deployed pool; FLR → pool tokens/timelock | Live call and returned token amount/timelock | **Frozen ABI is wrong:** it names `enter(uint256)`. |
| Establish same agent | Any reader | `ICollateralPool.agentVault()` and `poolToken()` | Public pool relation and holder balance | Block-referenced reads | Valid, but these exact reads are absent from the frozen formula/path. |
| Establish withdrawable fee | Provider | `fAssetFeesOf(provider)` then `withdrawFees(amount)` | Pool fee accounting → provider FXRP | Live transaction and balance delta | Valid. Withdrawal locks an appropriate ratio of transferable pool tokens; the budget is not costless. |
| Post/refund kicker | Provider | Project escrow contract | Provider FXRP → project state → refund | Project events/balances only | Callable, but creates only project-local rights. |
| Obtain proof | Any requester / FDC | `BalanceDecreasingTransaction` request, round finalization, proof retrieval | XRPL fact → FDC proof | Live only if qualifying agent payment exists; proof latency visible | Valid conditionally. |
| Challenge | Relay contract as `msg.sender` | `illegalPaymentChallenge(proof, agentVault)` or `doublePaymentChallenge(proof1,proof2,agentVault)` | Asset Manager full-liquidation transition; reward paid to relay | Transaction, native event, agent state, balance delta | Valid. The call returns no “native result” value; success is non-reversion plus state/event/reward. |
| Pay kicker | Relay over escrowed FXRP and received vault collateral | Project payout method | Two non-interchangeable assets | Project event plus separate balance deltas | Frozen prose blurs “native reward” and FXRP kicker; they must not be treated as one unit. |

The formula `min(postedFees, base + exposedPoolTokens × chosenBps)` is dimensionally invalid as frozen: pool-token units do not become FXRP fee units by multiplying by basis points. A valid conversion would need exact pool supply, tracked collateral, FXRP fee state, token decimals, and a defined valuation asset; none is supplied. More importantly, official evidence proves native challenger rewards, not a recurring reward shortage or collateral providers paying additional FXRP to reprioritize their own pools. The switch from native rewards/custom watcher tooling to a second bounty is speculative.

The corrected core is a familiar expiring task bounty paid upon a successful public call. FAsset Sentry already performs the exact XRPL→FDC→challenge→reward lifecycle, while FAsset TaskBounty and Backstop already occupy escrowed task reward and proof-keeper mechanics. Removing the extra kicker leaves the authoritative FAssets transition unchanged; retaining it adds no new protocol-consumed state.

**Independent floors:** mechanism novelty **fail**; protocol-composition novelty **fail** (pool fee withdrawal and native challenge are joined only by project escrow); demo surprise **fail/conditional** because a real illegal payment is not holder-controlled, while a fixture cannot prove market operability.

**Cause of death:** wrong exact interface, invalid cross-token exposure formula, no primary evidence for the extra bounty market, and direct bounty/challenger collision.

## E2 — Provenance Floor — KILL

**Plain-language substitution:** wrap a sale in an atomic postcondition that reverts unless total proceeds and proceeds-by-source remain within signed bounds.

### Every-transition authority ledger

| Transition | Existing actor with authority | Exact interface / source | Network and controlled state | Live boundary and receipt | Finding |
|---|---|---|---|---|---|
| Establish holder pool exposure | Holder / public reads | `poolToken().balanceOf(holder)`, pool-token total supply, `totalCollateral()`, fee-debt state | Same agent pool | Block-referenced reads | Frozen map names only a balance read; that is insufficient to derive personal loss. |
| Stage FXRP lot | FXRP holder | ERC-20 `approve`/`transferFrom` into project contract | Holder FXRP → contract | Deposit event/balance | Valid; contract becomes the native liquidation caller. |
| Read current liquidation bounds | Any reader | `getAgentLiquidationFactorsAndMaxAmount(agentVault)` | Asset Manager state | Live read | Required for a coherent preflight but omitted from the frozen path. |
| Liquidate | Project contract holding FXRP | `liquidate(agentVault, amountUBA)` | Burns caller FXRP; pays caller vault collateral and NAT | Return tuple, `LiquidationPerformed`, balances | Valid while eligible. |
| Enforce bounds | Project contract | Compare exact return tuple; revert on failure | Entire EVM call tree reverts atomically | Transaction status | Technically valid. |
| Refund unused lot | Holder | Project withdrawal | Remaining FXRP → holder | Balance/event | Valid if contract state is sound. |

This is Generator E's strongest technical path. Nevertheless, the claimed outcome and frozen inequality diverge. `amountPaidPool / totalPayout` measures the liquidation payout's source composition. It does **not** measure the holder's personal loss as a pool provider. Personal loss depends on the holder's exact pool-token share and the pool state before/after the payout; fee debt and token transfer/timelock state are separate. A holder with 0.1% and a holder with 40% of the pool receive the same frozen ceiling despite radically different self-loss.

Even after repairing that accounting, the mechanism is a post-call minimum-output/source-composition guard. Native `liquidate` already returns the exact split and atomically burns/pays; Round 5 killed Premium Fuse because wrapping this call with profitability preflight and before/after receipts did not create a missing native outcome. Safe-style before/after guards and ordinary slippage constraints are global direct substitutes. Event-local collision spans Ballast, LedgerGuard, Haircut, FAsset Sentry, fassets-verify, XRPShield, and the 12-signal credit/liquidation cluster. It is also adjacent to Dami's shipped Backstop and EdgeLedger guarded execution/reconciliation, although no direct portfolio repeat is needed for the kill.

**Independent floors:** mechanism novelty **fail**; protocol-composition novelty **fail** (one native liquidation inside a conventional postcondition); demo surprise **fail** (red inequality reverts, green inequality settles is expected guarded-call behavior).

**Cause of death:** the frozen bound does not calculate the promised personal pool loss, and the repaired form is a familiar atomic slippage/postcondition wrapper around a native call that already exposes both payout sources.

## E3 — Clearance Dividend — KILL

**Plain-language substitution:** split a job into equal tasks, reserve part of each realized reward, and give the accumulated bonus to whoever completes the final target before expiry.

### Every-transition authority ledger

| Transition | Existing actor with authority | Exact interface / source | Network and controlled state | Live boundary and receipt | Finding |
|---|---|---|---|---|---|
| Fund capped lot | FXRP owner | ERC-20 `approve`/`transferFrom` | Holder FXRP → project contract | Deposit event/balance | Valid. |
| Establish executable slice | Any reader/project | `getAgentLiquidationFactorsAndMaxAmount(agentVault)` | Current protocol cap/factors | Block-referenced read | Needed each slice; frozen path does not name it. |
| Execute slice | Public caller invokes project; project is native caller | `liquidate(agentVault, sliceUBA)` | Contract FXRP burn → contract collateral payouts | Return tuple/event/balances | Valid conditionally. No executor owns the burned FXRP or native payout. |
| Compute “actual premium” | Project contract | Return tuple plus exact price/decimal conversion across FXRP, vault collateral, and NAT | Project accounting | Per-token deltas | **Incomplete:** no exact valuation interface or formula is frozen. |
| Pay ordinary slice executor | Project contract | No frozen amount/formula/source | Project balances | No determinate receipt | **Missing transition:** the prose says early callers receive ordinary slice pay, but the mechanism allocates only a final dividend or expiry fallback. |
| Pay final dividend | Project contract | Owner-signed cumulative target, not a native “clearance” state | Project state | Payout event/balance | Callable but project-defined. |
| Expiry fallback | Owner and recorded callers | Project settlement | Unused FXRP plus pro-rata project reward | Project events | Callable; familiar fallback settlement. |

The economic loop is not incentive compatible as frozen. Before the terminal slice, a public executor pays gas while the project contract supplies the FXRP and retains the non-reserved payout. The promised “ordinary slice pay” has no formula or funding transition. If the accumulated dividend is paid only to the terminal executor, rational callers wait or race for the last slice; if expiry returns it pro rata, the product becomes a conventional keeper pool. The “completion” target is owner-signed cumulative volume, not the protocol's health state, and native liquidation may accept less than a slice or end when the agent is healthy. Thus the dividend can reward an arbitrary counter rather than completing an unhealthy position.

Global prior art is last-task bonuses, keeper bounties, batch jobs, and pro-rata fallback. Event collision is sharper: FAsset TaskBounty has a live FTestXRP task/reward lifecycle; FAsset Sentry and Backstop already automate evidence-triggered public actions; the C2 risk/liquidation cluster is dense. The new bonus curve does not create a new FAssets state transition.

**Independent floors:** mechanism novelty **fail**; protocol-composition novelty **fail** (repeated native calls feed a project counter); demo surprise **conditional but below floor** (four tiles filling a ring is presentation of a familiar jackpot/last-task bonus and requires a controllable liquidation fixture).

**Cause of death:** missing early-executor compensation, incomplete cross-token premium accounting, project-defined rather than native completion, and familiar keeper/completion-bounty prior art.

## E4 — TwinProof Relay — KILL

**Plain-language substitution:** the first finder commits evidence and a purse; a second finder supplies the matching evidence; a relay claims the public reward and splits it by time.

### Every-transition authority ledger

| Transition | Existing actor with authority | Exact interface / source | Network and controlled state | Live boundary and receipt | Finding |
|---|---|---|---|---|---|
| Commit first hash/purse | Any challenger | Project relay | Challenger funds → project commitment | Event/balance | Callable, but a bare hash conveys no searchable payment identity to a second finder. |
| Produce proof one/two | Any requester / FDC | Two `BalanceDecreasingTransaction` requests, round finalization, proof retrieval | XRPL → FDC | Request tx, rounds, proofs | Valid if two qualifying finalized payments exist. |
| Bind first contributor | Relay | Hash comparison only | Project attribution | Project event | Not exclusive; no native challenge function consumes the commitment. |
| Submit pair through relay | Any second contributor | Relay calls `doublePaymentChallenge(proof1,proof2,agentVault)` | Full liquidation and reward paid to relay | Transaction/event/state/balance | Valid if relay wins the race. |
| Submit pair directly | Any caller with revealed proofs | Same native `doublePaymentChallenge` | Same full liquidation; entire native reward paid to direct caller | Native receipt | **Fatal bypass:** current challenge verification does not enforce relay/proof ownership. |
| Split reward and purse | Relay | Project arithmetic over received value | Relay balances → A/B | Project payout events | Only occurs if participants decline the profitable direct bypass. |
| Expiry cleanup | Any caller | Project expiry method | Purse fee/refund only | Project event | Callable; does not recover proof opportunity. |

The relay cannot simultaneously enable collaboration and enforce attribution. If A publishes or privately gives proof one to help B identify the matching payment, B can call the Asset Manager directly with both proofs and take the full native reward. If A reveals only a hash, B cannot derive which public payment/reference needs a pair. The implementation confirms that `verifyBalanceDecreasingTransaction` validates the proof but does not call `verifyProofOwnership`, and the native challenge has no relay, commitment, or split parameter. A salted commitment would reduce hash theft but would not close direct-call bypass after reveal.

Primary evidence proves individual challengers and native rewards, not a recurring market of independent partial-proof owners or their willingness to post completion purses. Globally the design is commit/reveal plus finder bounty and revenue split. Event-locally, FAsset Sentry already performs the exact public proof-to-challenge receipt, while FAsset TaskBounty already escrows and releases FTestXRP for completed public work. The visible two-tile reveal is attractive but depends on a contrived pair and ignores the dominant bypass.

**Independent floors:** mechanism novelty **fail**; protocol-composition novelty **conditional but fails end to end** (two FDC proofs are genuinely required by the native call, but the project split is not enforceable); demo surprise **conditional** on a fabricated double-payment scenario and below floor once the bypass is shown.

**Cause of death:** no exclusive or incentive-compatible contribution path—the public native interface lets any holder of both proofs bypass the relay and its reward split—plus unproved two-finder demand and direct event/global collision.

## Portfolio and prior-round consistency

- No Generator E concept is a literal repeat of one shipped project; that does not rescue it. PoolProof Kicker and TwinProof Relay sit between Dami's guarded-execution/receipt lineage and the event's already-live FAsset Sentry/TaskBounty/Backstop surfaces.
- Provenance Floor reproduces Round 5 Premium Fuse's decisive failure: a real participant and exact `liquidate` call do not make local profitability/postcondition logic a new asset product.
- PoolProof Kicker and TwinProof Relay reproduce Challenge Capsule's residual surface: after correcting false or unenforceable economic capital, the authoritative action remains the native FDC-backed challenge.
- Clearance Dividend adds a reward schedule, but a reward curve around repeated native calls is not an independent state-transition novelty and cannot substitute for a missing executor market.

## Final disposition

- PoolProof Kicker: **KILL**
- Provenance Floor: **KILL**
- Clearance Dividend: **KILL**
- TwinProof Relay: **KILL**

**Generator E contributes 0 survivors. Do not score these ideas.** This is an evidence-driven hard-gate result, not a pool-size target.
