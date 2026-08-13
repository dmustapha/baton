# Exact Callable-Interface Gate — Blind Batch 2

Applied before scoring against the same public interface baseline as batch one.

| ID | Claimed asset action | Exact callable path | Network | Builder access | Controlled state | Boundary | Judge receipt | Result |
|---|---|---|---|---|---|---|---|:---:|
| F1 Sealed Delivery Switch | Route project-escrowed FXRP | FXRP `IERC20.transfer` from project escrow | Coston2 | Public | Project escrow | Live FXRP; simulated FCC decision | `Transfer` + routed outcome event | PASS |
| F2 Cold-Chain Make-Good | Pay capped FXRP from reserve | FXRP `IERC20.transfer` from reserve | Coston2 | Public | Project reserve | Live FXRP; simulated FCC analysis | `Transfer` + `MakeGoodPaid` | PASS |
| F3 Recall Kill Switch | Rotate Smart Account into safe mode | No public Flare Smart Account recovery-module/authority-rotation interface identified | N/A | No exact path | Account authority | Unsupported | None | FAIL |
| G1 Forget-to-Redeem | Redeem FXRP and unlock a project bond after FCC result | `IAssetManager.redeem` plus project-bond `release` after typed FCC signature | Coston2 | Public guides | FAssets redemption request plus project bond; cannot alter protocol finality | Live redemption; simulated FCC erasure claim | redemption events + `ErasureAccepted/BondReleased` | PASS WITH CORRECTION |
| G2 One-Shot Treasury | Transfer FXRP through a project nullifier gate invoked by Smart Account | `executeDirectMintingWithData` → `executeUserOp` → project gate → FXRP `transfer` | Coston2 | Public guide | Project-held/authorized FXRP and project nullifier only | Live Coston2; simulated FCC policy | `UserOperationExecuted`, `Transfer`, `AuthorizationConsumed` | PASS |
| G3 Lineage Toll | PMW executes XRP split payment | No public PMW builder interface | Songbird design only | No | XRPL payments | Unsupported | None | FAIL |
| H1 Exit Relay | Route escrowed FXRP and change next tranche cap | FXRP `transfer` from tranche router; project `recordBatchResult` | Coston2 | Public token path | Project router cap and escrow | Live FXRP; simulated FCC private inclusion ledger | `Transfer`, `BatchScored`, `CapChanged`, `Rerouted` | PASS |
| H2 Sealed Payroll Pulse | PMW pays/retries XRP payroll | No public PMW builder interface | Songbird design only | No | XRPL payments | Unsupported | None | FAIL |
| H3 Proven Handoff | Revoke/grant Smart Account executor authority | No public Flare account-rotation/module interface identified | N/A | No exact path | Account authority | Unsupported | None | FAIL |
| I1 Redemption Ladder | Release project-escrowed FXRP tranches; optional real redemption | FXRP `transfer`; optional `IAssetManager.redeem` | Coston2 | Public | Project escrow and optional redemption request | Live FXRP; simulated FCC threshold selection | `Transfer`/redemption event + `LadderAdvanced` | PASS |
| I2 Shadow Drawdown Vault | Install expiring Smart Account drawdown policy | Arbitrary call exists, but no public account-level module installation/enforcement path identified | N/A | No exact path | Account authority | Unsupported module | None | FAIL |
| I3 Proof Waterfall | Reallocate project reserve and pay FXRP claims | FXRP `transfer` from reserve after project allocation result | Coston2 | Public | Project reserve and claim queue | Live FXRP; simulated FCC private priority | `Transfer`, `AllocationChanged`, `ClaimPatched` | PASS |
| J1 Mint Rescue Run | Choose route that corrects or unwinds stalled mint | No general corrected-recipient or unwind interface; `0xE0` is narrower and same-account only | N/A | No for claimed route set | Claimed mint correction | Unsupported | None | FAIL |
| J2 Vault Escape Room | Revoke Smart Account policy and install recovery module | No public module/authority interface identified | N/A | No exact path | Account authority | Unsupported | None | FAIL |
| J3 Refund Sprint | PMW sends XRP refund | No public PMW builder interface | Songbird design only | No | XRPL payment | Unsupported | None | FAIL |

Result: 7 passed, 8 failed. Only the seven passing ideas receive the global prior-art and substitution gate.
