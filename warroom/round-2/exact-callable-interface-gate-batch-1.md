# Exact Callable-Interface Gate — Blind Batch 1

Applied before scoring. A protocol description, intended adapter, or project-defined verb is not a callable public builder path.

## Verified public surfaces

| Surface | Official function/interface | Network and public path | Controlled transition | Boundary and receipt |
|---|---|---|---|---|
| FXRP transfer from a project escrow/vault | `IERC20.transfer` / `transferFrom` on FXRP | Coston2 FXRP and AssetManager are published in [FAssets Reference](https://dev.flare.network/fassets/reference) | Moves project-held FXRP between Flare addresses | Live Coston2; ERC-20 `Transfer` plus project event and explorer transaction |
| FAssets redemption | `IAssetManager.redeem` / documented amount variants | Public Coston2 examples in [Redeem FAssets](https://dev.flare.network/fassets/developer-guides/fassets-redeem) | Burns FXRP and creates an XRP redemption request | Live Coston2/XRPL lifecycle; `RedemptionRequested`, later payment/default evidence |
| Redemption default | `IAssetManager.redemptionPaymentDefault(proof, requestId)` | Public guide and FDC path in [Redemption Defaults](https://dev.flare.network/fassets/developer-guides/fassets-redemption-default) | Pays compensation from agent collateral after proven non-payment | Live proof boundary; `RedemptionDefaulted` and explorer transaction |
| Smart Account arbitrary call | `executeDirectMintingWithData(proof,data)` → personal account `executeUserOp(Call[])` | Public Coston2 TypeScript and contract path in [Custom Instruction](https://dev.flare.network/smart-accounts/custom-instruction) | Atomically mints FXRP and calls user-selected contracts | Live Coston2 plus XRPL payment/FDC proof; `UserOperationExecuted` and Flare receipt |
| Failed Smart Account mint recovery | `0xE0` memo flag, then re-submit `executeDirectMintingWithData` | Public Coston2 guide in [Recover Stuck Mint](https://dev.flare.network/smart-accounts/guides/typescript-viem/recover-stuck-mint-transaction-ts) | Mints stuck payment to the same personal account without executing original user operation | Live Coston2; `IgnoreMemoSet`, mint event, and transaction receipt |
| FCC/FCE signed decision | Registered extension instruction plus result-signature verification | Public Coston2 scaffold and simulated-TEE path in [FCC guide](https://dev.flare.network/fcc/guides/getting-started) and [sign extension](https://dev.flare.network/fcc/guides/sign-extension) | Project contract accepts a typed result from the registered/simulated machine | Simulated TEE unless real registration is available; instruction, signed result, verifier event |

## Idea-by-idea gate

| ID | Claimed asset action | Official callable interface | Supported network | Accessible builder path | Controlled state | Live/simulated boundary | Judge receipt | Result |
|---|---|---|---|---|---|---|---|:---:|
| A1 Orphan Mint Rescue | Redirect/correct an abandoned XRP mint or refund it | None for corrected recipient; official docs say wrong recipient is irreversible, while `0xE0` only recovers to the same personal account | N/A | No | Claimed recipient rewrite/refund | Unsupported | None | FAIL |
| A2 Quorum Fallback Payroll | Install temporary fallback authority and batch-pay hidden salaries | No official Flare Smart Account module-install/authority-rotation interface identified; `executeUserOp` can call contracts but does not install the proposed enforcement layer | N/A | No exact path | Account authorization plus payroll | Unsupported module; FCC could only simulate policy result | No authority-change receipt | FAIL |
| A3 LatePay Return Router | PMW-sign an XRP refund | No verified public PMW builder interface; STP.13 is Songbird protocol design | Songbird design only | No | XRPL refund | Unsupported | None | FAIL |
| A4 Partial Redemption Patch | Pay claimant from a project recovery vault | `IERC20.transfer` after project verifier accepts FCC result | Coston2 | Yes | Project-held FXRP only; not FAssets protocol redemption state | Live FXRP transfer; simulated FCC allowed if labeled | `Transfer` + `PatchPaid` | PASS |
| B1 TagBack | Correct recipient of mistagged mint | None; wrong-recipient mint is explicitly irreversible | N/A | No | Claimed recipient correction | Unsupported | None | FAIL |
| B2 Intent Fuse | Cancel PMW payment and release reserved obligation | No public PMW transaction path | Songbird design only | No | XRPL transaction plus project reservation | Unsupported PMW | Reservation event alone cannot prove asset action | FAIL |
| B3 Rotation Bridge | Rotate Smart Account authority then grant capped unwind | No official authority-rotation/recovery-module surface for Flare Smart Accounts identified | N/A | No exact path | Account authority | Unsupported | None | FAIL |
| B4 Quiet Partial | Split project-escrowed FXRP between contractor and payer | `IERC20.transfer` / `transferFrom` from project escrow | Coston2 | Yes | Project-held FXRP escrow | Live transfer; simulated FCC adjudication labeled | Two `Transfer` events + `Settled`/`Frozen` | PASS |
| C1 Reconcile Window | Complete or refund mismatched mint | No generic completion/refund interface; only narrowly scoped `0xE0` recovery to personal account | N/A | No for proposed branch | Claimed mint/refund rewrite | Unsupported | None | FAIL |
| C2 Policy Epoch Exit | Expiring Smart Account policy authorizes safe unwind | No official policy-module installation/enforcement path identified | N/A | No exact path | Account authorization | Unsupported module | None | FAIL |
| C3 Quiet Milestone | PMW pays XRP entitlement | No public PMW builder interface | Songbird design only | No | XRPL payment | Unsupported | None | FAIL |
| C4 Inclusion Refund Seal | Refund duplicate from project-held FXRP checkout escrow | `IERC20.transfer` from project contract; FDC proof may evidence source payment | Coston2 | Yes | Project escrow, not original XRPL payment reversal | Live FXRP transfer; simulated FCC inclusion accumulator | `Transfer` + `RefundAuthorized/Paid` | PASS |
| D1 Sealed Exit Desk | Settle/refund project-escrowed FXRP | `IERC20.transfer` from escrow | Coston2 | Yes | Project escrowed FXRP | Live transfer; simulated FCC match | `Transfer` + `Matched/Refunded` | PASS |
| D2 Vanishing Vault Guardrail | Install one-use Smart Account guardrail, deposit/hold/unwind | No public Flare guard/module installation interface identified; target vault call alone does not enforce account-wide one-use authority | N/A | No exact path | Account authorization | Unsupported module | None | FAIL |
| D3 Expiring Invoice Signer | PMW signs and sends XRP payment | No public PMW builder interface | Songbird design only | No | XRPL payment | Unsupported | None | FAIL |
| D4 Revolving Proof Line | Release/repay project-held FXRP credit | `IERC20.transfer` / `transferFrom` in project credit contract; FDC proof can inform state | Coston2 | Yes | Project credit-line balance | Live FXRP; simulated FCC renewal result | `Transfer` + line-state event | PASS |
| E1 Credit Patch | Unlock project-held FXRP credit line | `IERC20.transfer` from project credit contract | Coston2 | Yes | Project-held FXRP line | Live FXRP; simulated FCC scoring/appeal | `Transfer` + `TermsPatched` | PASS |
| E2 Pocket Quorum | Change Smart Account authority for reversible handoff | No exact public recovery-module/owner-threshold interface for Flare Smart Accounts identified | N/A | No | Account authority | Unsupported module | None | FAIL |
| E3 Lineage Payout | PMW pays multiple XRP recipients | No public PMW builder interface | Songbird design only | No | XRPL payments | Unsupported | None | FAIL |
| E4 Redemption Jury | Release undisputed project-escrowed FXRP and retain remainder | `IERC20.transfer` from project resolution escrow; FDC proof can bind redemption evidence | Coston2 | Yes | Project escrow only; cannot mutate FAssets redemption result | Live FXRP; simulated FCC jurors | `Transfer` + `PartialRelease/Disputed` | PASS |

## Result

- Passed exact interface: 7 of 20.
- Failed exact interface: 13 of 20.
- Every PMW-dependent concept failed because no verified public callable builder path exists.
- Every “corrected mint” concept failed because the official protocol explicitly makes wrong-recipient minting irreversible; the narrow `0xE0` recovery does not redirect the recipient.
- Smart Account calls are public, but an arbitrary call is not proof that account-level recovery, rotation, or module enforcement exists.

Only the seven passing ideas advance to the remaining hard gates. None is scored yet.
