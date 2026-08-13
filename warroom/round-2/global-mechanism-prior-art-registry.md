# Global Mechanism Prior-Art Registry — Gate Only

Status: revealed only after the 20-idea pool freeze
Purpose: test user-visible mechanism novelty independently from Flare composition

This registry is not generator input. It combines primary standards, official wallet and protocol modules, established DeFi mechanisms, shipped product documentation, and non-crypto distributed-systems patterns. Absence from this registry is not proof of novelty.

## Authorization, delegation, and account recovery

| Prior-art family | Primary or official evidence | Existing mechanism | Round-two collision surface |
|---|---|---|---|
| Temporary approvals | [ERC-7674](https://eips.ethereum.org/EIPS/eip-7674) | Transaction-scoped token allowance using transient storage | One-shot, self-erasing, or “vanishing” spend authority |
| Expiring approvals | [ERC-8255](https://eips.ethereum.org/EIPS/eip-8255) | Allowances expire by timestamp; duration-specific approvals include single-block authorization | Epoch, expiry, or forced-refresh spending policies |
| Wallet execution permissions | [ERC-7715](https://ercs.ethereum.org/ERCS/erc-7715) and [ERC-7710](https://ercs.ethereum.org/ERCS/erc-7710) | Wallet grants scoped permission that a delegate redeems through a delegation manager | Offline execution, bounded action capabilities, revocation, policy attenuation |
| Session keys and delegation | [ERC-4337 documentation](https://docs.erc4337.io/smart-accounts/session-keys-and-delegation.html) | Temporary or constrained delegated authority, enforced by wallet modules | Policy epochs, target/amount limits, one-cycle authorization |
| Spending limits and recurring allowances | [Safe allowance quickstart](https://docs.safe.global/home/ai-agent-quickstarts/agent-with-spending-limit) | One-time or periodically resetting token limits with delegated execution | Payroll fallback, invoice signer, autonomous vault limits |
| Smart-account modules | [Safe Modules](https://docs.safe.global/advanced/smart-account-modules) | Recurring actions, standing orders, recovery, whitelists, rate limits, spending caps | Module-based payroll, treasury, and recovery controls |
| Pre/post transaction guards | [Safe Guards](https://docs.safe.global/advanced/smart-account-guards) | Checks before execution and after final account state | Intent fuses, stale-policy refusal, post-action reconciliation |
| Social recovery and threshold handoff | [Safe account overview](https://docs.safe.global/advanced/smart-account-overview) | Recovery modules, multiple owners, mutable thresholds, owner replacement | Guardian quorum, successor rotation, challenge-window recovery |
| Timelocked administration | [OpenZeppelin TimelockController](https://docs.openzeppelin.com/contracts/5.x/api/access) | Schedule, delay, cancel, and execute privileged operations with roles | Reversible handoff windows, delayed rotation, safe-exit checkpoints |
| Emergency stop | [OpenZeppelin Pausable](https://docs.openzeppelin.com/contracts-compact/security) | Authorized pause and unpause of protected calls | Circuit breakers, frozen lines, abstention and reopen controls |

## Settlement, escrow, credit, disputes, and confidentiality

| Prior-art family | Primary or official evidence | Existing mechanism | Round-two collision surface |
|---|---|---|---|
| Escrow with partial release/refund | Standard contract escrow and payment-channel behavior; event-backed settlement is ubiquitous | Lock funds, release earned portion, refund remainder | Quiet Partial, Quiet Milestone, inclusion refunds |
| Optimistic assertion and dispute | [UMA official documentation](https://docs.uma.xyz/) | Assert arbitrary facts, challenge, escalate, then settle | Jury decisions, challenge escrows, claim adjudication |
| Multisig/quorum decisions | [Safe smart-account overview](https://docs.safe.global/advanced/smart-account-overview) | N-of-M authorization with owner/threshold management | Confidential juries, guardian fragments, compatible-verdict threshold |
| Revolving credit and limit refresh | Established lending-product mechanism | Repayment restores capacity; policy may shrink, freeze, or reopen a line | Revolving Proof Line and credit appeals |
| Credit appeals and corrected evidence | Established underwriting and adverse-action workflow | Applicant challenges evidence; corrected data changes terms | Credit Patch and re-evaluation of disputed inputs |
| Private RFQ / sealed bid | Established OTC, auction, commit-reveal, and dark-pool mechanism | Hide quotes until matching or clearing, settle or refund | Sealed Exit Desk and other confidential matching |
| Royalty split / lineage payout | Established revenue-split and provenance royalty mechanism | Attribute contributors, calculate shares, pay recipients | Lineage Payout |
| Confidential role membership | [OpenZeppelin ShieldedAccessControl](https://docs.openzeppelin.com/contracts-compact/shielded-access-control) | Merkle commitments and nullifiers hide role holders while proving authorization | Private guardian/role fragments and revocable confidential authority |

## Failure recovery, duplicate handling, and non-crypto mechanisms

| Prior-art family | Primary or official evidence | Existing mechanism | Round-two collision surface |
|---|---|---|---|
| Saga and compensating transactions | [Microsoft Saga pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/saga) | Distributed steps plus compensating actions after failure | Late-payment refunds, mint/redeem repair, release/unwind branches |
| Compensating transaction | [Microsoft Compensating Transaction pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/compensating-transaction) | Idempotent undo/repair steps with progress tracking and audit correlation | Make-whole patches, partial correction, interrupted lifecycle recovery |
| Circuit breaker | [Microsoft Circuit Breaker pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/circuit-breaker) | Closed/open/half-open state prevents repeated calls during failure | Intent fuse, machine liveness gate, freeze/reopen control |
| Idempotency and duplicate suppression | Standard payment/API mechanism | One idempotency key maps retries to one fulfillment; duplicates are rejected or refunded | Inclusion Refund Seal and duplicate mint/payment handling |
| Two-phase reservation/commit | Established distributed transaction and inventory-reservation pattern | Reserve capacity, validate, then commit or release | Intent Fuse obligation reservation and unlock |
| Dead-man switch / inactivity recovery | Established continuity mechanism | Absence or liveness failure starts recovery or beneficiary handoff | Rotation Bridge, Policy Epoch Exit, Pocket Quorum |
| Maker-checker / four-eyes approval | Established financial operations control | Independent reviewers approve high-impact transitions | Redemption Jury and confidential quorum decisions |
| Data minimization and selective disclosure | Established privacy principle | Reveal only decision or required attributes, not source inputs | Minimal FCC result across nearly every idea; not novel by itself |

## Flare-native shipped and documented mechanism prior art

| Mechanism | Official evidence | Consequence for novelty |
|---|---|---|
| Smart Account arbitrary call and atomic mint-plus-action | [Custom Instruction](https://dev.flare.network/smart-accounts/custom-instruction) | Deep composition is feasible but not itself a new user-visible mechanism |
| Failed custom-instruction mint recovery | [Recovery after failed mint](https://dev.flare.network/smart-accounts/custom-instruction#recovery-after-a-failed-mint) | `0xE0` already skips the failed memo and mints recovered FXRP to the personal account |
| Stuck nonce recovery | [Fast-Forward Nonce](https://dev.flare.network/smart-accounts/guides/typescript-viem/fast-forward-nonce-ts) | `0xE1` already advances abandoned memo-instruction state |
| Executor-fee replacement | [Smart Accounts overview](https://dev.flare.network/smart-accounts/overview) | `0xE2` already replaces executor fee for a stuck XRPL transaction |
| Redemption-default compensation | [Monitor Redemptions and Execute Defaults](https://dev.flare.network/fassets/developer-guides/fassets-redemption-default) | FDC nonexistence proof already triggers collateral compensation and `RedemptionDefaulted` |
| Wrong-recipient mint | [Minting Troubleshooting](https://dev.flare.network/fassets/troubleshooting/minting-troubleshooting) | Wrong encoded recipient is explicitly irreversible onchain; “corrected mint” claims are invalid |

## Mandatory plain-language substitution test

For each frozen idea:

1. Replace Flare, FXRP, FDC, FCC, FCE, Smart Account, PMW, XRPL, and TEE names with generic nouns.
2. State the remaining user mechanism in one sentence.
3. Compare it against this registry and the event-local collision corpus.
4. Kill the idea if it becomes a familiar approval, escrow, refund, credit, auction, recovery, quorum, royalty, dispute, circuit-breaker, or compensation pattern unless a new load-bearing state transition or user outcome remains.
5. Protocol-composition novelty never repairs failure of user-visible mechanism novelty.

## Hard score thresholds

- User-visible mechanism novelty: at least 7/10.
- Demo surprise: at least 7/10.
- Protocol-composition novelty: at least 7/10.
- Each is independent and non-compensating.
