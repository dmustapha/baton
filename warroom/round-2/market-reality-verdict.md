# Round 2 Market Reality and End-to-End Operability Verdict

Status: **BOTH FINALISTS WITHDRAWN**

This is an additive correction. It preserves the frozen pools, prior-art gates, scores, and original checkpoint as evidence of the failed evaluation standard.

## Why the previous standard failed

Round two proved isolated technical statements:

- a project contract can hold and transfer FXRP;
- a project contract can verify a typed FCC/FCE result;
- project-owned state can change visibly.

Those facts did not prove that the proposed buyer, workflow, private input source, operator authority, or repeated asset allocation existed. A callable token transfer proved only the transfer.

## Exit Relay — KILL

### Gate 0: Market Reality

| Requirement | Finding | Result |
|---|---|---|
| Named buyer | Only a hypothetical operator of a private FXRP routing service was identified. No current protocol, treasury, or service was shown to buy this allocation function. | FAIL |
| Existing workflow | Native FAssets chooses redemption tickets from a FIFO queue. It does not use an external allocator to choose the next service provider. | FAIL |
| Evidenced pain | Agent non-payment is real, but the protocol already handles it through deadlines, payment-nonexistence proof, collateral compensation, a default premium, and an optional executor. | FAIL |
| Economic behavior | FAssets has agent and executor fees, but no evidence showed payment for a private next-tranche allocator. | FAIL |
| Current substitute | Native `redemptionPaymentDefault` plus collateral compensation addresses the claimed service failure. | FAIL |
| Natural confidentiality | `RedemptionRequested` exposes the agent, redeemer, payment address, amount, deadlines, and payment reference. The proposed hidden native request queue contradicts the live protocol. | FAIL |
| Reachable users | No existing allocator, fallback-provider network, or first-user channel was identified. | FAIL |

### Gate 0b: End-to-End Operability

| Transition | Finding | Result |
|---|---|---|
| Obtain hidden FXRP service requests | No native or public source exists; native redemption data is public. | FAIL |
| Assign a provider | Native assignment is protocol FIFO; the application has no authority over it. | FAIL |
| Prove external fulfillment | Only a fixture was available, not a live service receipt source. | FAIL |
| Change provider capacity | Only project-created cap state changes; it does not control FAssets agent capacity. | FAIL |
| Transfer FXRP | Live `IERC20.transfer` is callable. | PASS, isolated only |
| Acquire allocator and fallback users | No existing workflow or integration path was established. | FAIL |

**Verdict:** Exit Relay is a technically demonstrable mechanism wrapped around an invented market. Withdraw it.

## Forget-to-Redeem — KILL

### Gate 0: Market Reality

| Requirement | Finding | Result |
|---|---|---|
| Named buyer | No current redemption service, payer of the privacy bond, beneficiary, or procurement owner was identified. | FAIL |
| Existing workflow | Native FAssets redemption does not create a one-use confidential capsule whose consumption governs a separate bond. | FAIL |
| Evidenced pain | No primary evidence showed FAssets users paying to prove deletion of route or recovery data after redemption. | FAIL |
| Economic behavior | The separate privacy bond and loss model are project inventions. | FAIL |
| Current substitute | Standard data minimization, retention policy, access control, and deletion attestations address the general concern without this asset-specific bond. | FAIL |
| Natural confidentiality | The redemption event publishes core route and payout fields. Any additional secret capsule belongs to a hypothetical overlay, not the native flow. | FAIL |
| Reachable users | No existing service operator or distribution channel was established. | FAIL |

### Gate 0b: End-to-End Operability

| Transition | Finding | Result |
|---|---|---|
| Create a payout-bound capsule | Project-created; no current FAssets integration emits or requires it. | FAIL |
| Establish bond payer and beneficiary | Undefined. | FAIL |
| Prove capsule consumption | FCC can attest code execution in an identified environment, but cannot prove no other copy exists. | PARTIAL |
| Trigger native redemption | Exact `IAssetManager.redeem*` interfaces exist. | PASS, isolated only |
| Release application bond | Project-owned `release` is implementable. | PASS, isolated only |
| Demonstrate current demand | No buyer, active workflow, or adoption route exists. | FAIL |

**Verdict:** Forget-to-Redeem invents the capsule, bond market, payer, and liability model. Withdraw it.

## Primary evidence

- [Flare FAssets redemption flow](https://dev.flare.network/fassets/redemption)
- [Flare redemption events](https://dev.flare.network/fassets/reference/IAssetManagerEvents)
- [Flare redemption-default guide](https://dev.flare.network/fassets/developer-guides/fassets-redemption-default)
- [Flare IAssetManager redemption interface](https://dev.flare.network/fassets/reference/IAssetManager)
- [UniswapX filler workflow](https://developers.uniswap.org/docs/liquidity/uniswapx/filling/overview)
- [LI.FI intents solver workflow](https://docs.li.fi/lifi-intents/for-solvers/intro)
- [Lido Staking Router](https://docs.lido.fi/contracts/staking-router/)

## Consequence

Credible finalists after the new hard gate: **0**.

The next action is another blind batch seeded by generator-safe evidence of real users, current workflows, economic behavior, naturally private inputs, and reachable distribution. Named products, competitors, prior art, saturation, and differentiation remain gate-only until the new raw pool is durably frozen. Gates will not be weakened.
