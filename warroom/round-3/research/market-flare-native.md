# Flare-Native Market Evidence Slice

Research date: 2026-08-13  
Scope: current FAssets/FXRP, Flare Smart Accounts, and Flare Confidential Compute workflows. Primary official Flare documentation, governance, explorer, and Foundation announcements only. This is market-evidence mining, not an idea list.

## Evidence discipline

- **Verified workflow** means an official contract interface, operator guide, live system surface, or named production distribution integration exists.
- **Verified economic signal** means an official source identifies a fee, asset flow, incentive, locked collateral, or measured participation. An announced market size is labeled as an official claim, not independently audited here.
- **Not verified** means an accessible token transfer or project-owned contract would not prove the upstream actor, demand, authority, or settlement workflow.
- FCC/FCE simulation, registration, and hardware attestation are distinct states. A simulated Coston2 extension is not production TEE evidence.

# VERIFIED MARKET

## 1. FAssets and FXRP users, operators, and asset flows

### Existing actors with authority

| Actor | Existing job and authority | Economic behavior | Public evidence |
|---|---|---|---|
| XRP/FXRP holder, acting as minter or redeemer | Selects an available agent for reserved minting, or pays the Core Vault for direct minting; later burns FXRP through the Asset Manager to receive XRP | Pays minting/collateral-reservation/executor fees and an obligatory redemption fee; transfers real XRP and FXRP | [FAssets overview](https://dev.flare.network/fassets/overview), [minting](https://dev.flare.network/fassets/minting), [redemption](https://dev.flare.network/fassets/redemption) |
| FAssets agent | Operates hot work and cold management addresses, posts vault collateral, supplies underlying XRP, sets agent terms, fulfills assigned redemptions, and proves payments | Earns a share of minting and redemption fees; risks collateral loss, challenge rewards, liquidation premiums, and permanent vault restriction | [FAssets participants](https://dev.flare.network/fassets/overview), [collateral](https://dev.flare.network/fassets/collateral), [liquidation](https://dev.flare.network/fassets/liquidation) |
| Collateral-pool provider | Deposits FLR into a specific agent pool, receives transferable/timelocked CPTs, claims a share of minting fees, and exits subject to collateral-ratio rules | Locks FLR and earns FAsset minting-fee share; may absorb loss when agent collateral is used | [Collateral](https://dev.flare.network/fassets/collateral), [`ICollateralPool`](https://dev.flare.network/fassets/reference/ICollateralPool) |
| Liquidator | Burns FAssets against an unhealthy agent and receives vault/pool collateral | Earns a liquidation premium; open participation | [Liquidation](https://dev.flare.network/fassets/liquidation) |
| Challenger | Monitors an agent's underlying address and submits FDC proofs of illegal or double payments | Receives rewards from agent vault collateral for valid challenges | [Liquidation and challenges](https://dev.flare.network/fassets/liquidation) |
| Redemption executor | Monitors public redemption deadlines and, when appointed, submits payment or non-payment proofs | Can receive an optional FLR executor fee agreed offchain, sparing the redeemer the recovery call | [Redemption fees](https://dev.flare.network/fassets/redemption), [default guide](https://dev.flare.network/fassets/developer-guides/fassets-redemption-default) |
| Wallet/integration operator | Prepares references, tags, memos, fees, and executor parameters; may monitor and finalize XRPL-to-Flare flows | Receives operator/executor fees in deployed wallet flows and is responsible for reliable relay execution | [Smart Accounts overview](https://dev.flare.network/smart-accounts/overview), [D'CENT production flow](https://flare.network/news/flare-and-dcent-bring-one-flow-institutional-yield-to-xrp-holders-worldwide) |

### Verified current market and distribution signals

- Flare's live Systems Explorer exposes a mainnet FAssets transaction surface with transaction hash, type, agent vault, value, fee, payment address/reference, executor, fee, and status. The page is dynamically populated, so this research does not infer counts from the empty server-rendered table. [Flare Systems Explorer](https://flare-systems-explorer.flare.network/fassets)
- The official FAssets contract reference publishes deployed Asset Manager and FXRP contracts across Flare, Coston2, Songbird, and Coston, and the developer guides expose typed interfaces and a deployed Coston2 demo. [FAssets reference](https://dev.flare.network/fassets/reference), [developer guides](https://dev.flare.network/fassets/developer-guides)
- Flare's February 2026 Xaman announcement says FXRP supply exceeded 100 million and that most was deployed in lending, collateral, and vault strategies. This is a current first-party ecosystem claim, not an independently reproduced onchain count in this slice. It also identifies Xaman as a wallet-native distribution channel. [Xaman Smart Account integration](https://flare.network/news/one-click-defi-vault-xaman-flare-smart-accounts)
- The May 2026 D'CENT integration is a named production distribution path: D'CENT reports 330,000+ hardware users and 720,000+ app users, and embeds a Smart Account route into the Monarq vault. The official campaign required at least $1,000 of XRP value held in the vault for 30 days and allocated a $55,000 reward pool, demonstrating a funded acquisition funnel and measurable asset behavior. [D'CENT integration and campaign](https://flare.network/news/flare-and-dcent-bring-one-flow-institutional-yield-to-xrp-holders-worldwide)
- Historical beta data proves repeated protocol behavior but must not be confused with current mainnet demand: Flare reported 50,238 mints, 63,319 redeems, 14,153 participants, and 58 agents during the June-July 2024 open beta; the completed beta later reported 263,000+ mints, 395,000+ redeems, and 48,000+ participants. [Agent beta update](https://flare.network/news/fassets-open-beta-updates-for-agents), [Songbird launch report](https://flare.network/news/fxrp-is-live-on-songbird-mint-trade-and-get-rewarded)
- A direct channel to FAssets operators already exists: the official agent update names an Agent Admin Console and the FAssets support group, while current contracts expose available agents with collateral ratios, fees, and vault status. [Agent update](https://flare.network/news/fassets-open-beta-updates-for-agents), [list-agents interface](https://dev.flare.network/fassets/developer-guides/fassets-list-agents)

### Recurring workflow and economic loop

1. A minter queries live protocol settings and available agents, or uses direct minting to the Core Vault. Reserved minting charges a collateral reservation fee; direct minting deducts a governance-configured minting fee and flat executor fee from XRP. [Minting](https://dev.flare.network/fassets/minting), [`IAssetManager.reserveCollateral`](https://dev.flare.network/fassets/reference/IAssetManager)
2. The user sends XRP with the required tag, memo, recipient, and payment reference. FDC proves the XRPL payment; the Asset Manager mints ERC-20 FXRP. [Minting](https://dev.flare.network/fassets/minting)
3. FXRP is used in Flare DeFi. The named Xaman and D'CENT routes mint FXRP and deposit it into vault strategies without requiring the XRP holder to manage FLR gas or a second key set. [Xaman flow](https://flare.network/news/one-click-defi-vault-xaman-flare-smart-accounts), [D'CENT flow](https://flare.network/news/flare-and-dcent-bring-one-flow-institutional-yield-to-xrp-holders-worldwide)
4. On redemption, the protocol selects tickets from the FIFO queue, burns the selected FXRP, emits one public `RedemptionRequested` record per responsible agent, and requires the agent to pay XRP with the unique reference. [Redemption](https://dev.flare.network/fassets/redemption), [`IAssetManagerEvents`](https://dev.flare.network/fassets/reference/IAssetManagerEvents)
5. FDC proof of payment releases agent collateral and finalizes accounting. Proof of non-payment lets the redeemer or executor invoke `redemptionPaymentDefault` and receive collateral compensation plus a premium. [Default guide](https://dev.flare.network/fassets/developer-guides/fassets-redemption-default)

### Verified recurring failures and operational costs

| Failure or friction | Who bears cost | Native state and current handling | Evidence |
|---|---|---|---|
| Direct payment below minimum mint fee | Minter loses the payment as fee and receives zero FXRP | Irreversible; prevention only | [Minting troubleshooting](https://dev.flare.network/fassets/troubleshooting/minting-troubleshooting) |
| Wrong recipient encoded in memo/tag | Minter's FXRP goes to the encoded address | Irreversible onchain; prevention only | [Minting troubleshooting](https://dev.flare.network/fassets/troubleshooting/minting-troubleshooting) |
| XRP sent to the wrong XRPL address | Minter's XRP is outside FAssets | No FAssets recovery; fetch Core Vault address at runtime | [Direct-mint guide](https://dev.flare.network/fassets/developer-guides/fassets-direct-minting) |
| Rate limit or large direct mint | Minter waits while XRP remains at Core Vault; executor must retry | Emits `DirectMintingDelayed` or `LargeDirectMintingDelayed`; same proof is retried after `executionAllowedAt`. Flare documentation currently states a 4 million XRP mainnet threshold and two-hour fixed large-mint delay | [Minting](https://dev.flare.network/fassets/minting), [mint-limit guide](https://dev.flare.network/fassets/developer-guides/fassets-mint-limits) |
| Smart Account custom instruction reverts | User's XRP remains at Core Vault and no FXRP/user operation executes | Atomic rollback on Flare; `0xE0` skip-memo recovery can mint FXRP without executing the failed instruction | [Custom instruction failure handling](https://dev.flare.network/smart-accounts/custom-instruction), [stuck-mint recovery guide](https://dev.flare.network/smart-accounts/guides/typescript-viem/recover-stuck-mint-transaction-ts) |
| Concurrent Smart Account payments reuse a nonce | One path succeeds; the other reverts and strands its XRP at Core Vault pending recovery | Read nonce per payment, serialize flows, or recover; replay protection is built in | [Custom instruction](https://dev.flare.network/smart-accounts/custom-instruction) |
| Executor never submits proof or fee becomes inadequate | User flow stalls | Protocol exposes executor pin/unpin, `0xE2` fee replacement, permissionless execution after the exclusive window, and explicit recovery paths | [Smart Accounts overview](https://dev.flare.network/smart-accounts/overview), [minting troubleshooting](https://dev.flare.network/fassets/troubleshooting/minting-troubleshooting) |
| Agent fails redemption payment | Redeemer does not receive XRP by deadline | FDC non-existence proof triggers collateral compensation plus default premium | [Redemption](https://dev.flare.network/fassets/redemption), [default guide](https://dev.flare.network/fassets/developer-guides/fassets-redemption-default) |
| Agent or redeemer is unresponsive after payment/non-payment | Collateral/accounting can remain unresolved | Executor or anyone can submit the relevant proof and may receive a reward | [Redemption edge cases](https://dev.flare.network/fassets/redemption) |
| Neither payment nor non-payment proof is created within the 14-day proof window | Agent collateral can remain locked; normal redemption cannot continue | Agent uses the documented collateral buyback/burn fallback; official docs call this rare and less advantageous | [Expired-proof edge case](https://dev.flare.network/fassets/redemption) |
| Agent collateral ratio deteriorates | Agent and pool capital face liquidation and premiums | Agent tops up/self-closes; anyone can liquidate; protocol thresholds and safety CR govern recovery | [Collateral](https://dev.flare.network/fassets/collateral), [liquidation](https://dev.flare.network/fassets/liquidation) |

The strongest proven unsolved user failures are the explicitly irreversible minting mistakes. The strongest proven operator burden is timely monitoring and proof submission across XRPL, FDC, and Flare state. This statement identifies evidence, not a product direction.

## 2. Flare Smart Accounts: current buyer and operator workflow

### Verified workflow

- An XRPL address controls a unique Flare Personal Account by signing XRPL `Payment` transactions; the user does not need FLR. A designated operator backend monitors incoming instructions, obtains FDC proof, and relays the call to `MasterAccountController`. [Smart Accounts overview](https://dev.flare.network/smart-accounts/overview)
- In direct minting, XRP is paid to the Core Vault, FXRP is minted to the controller, executor fees are paid from minted FXRP, the remainder is forwarded to the Personal Account, and an optional instruction executes. [Smart Accounts overview](https://dev.flare.network/smart-accounts/overview)
- Opcode `0xFE` commits only `keccak256(PackedUserOperation)` on XRPL; an offchain executor delivers the bytes. Opcode `0xFF` carries the full operation inline. Authorization comes from the XRPL payment signature, while the Flare account validates sender and nonce. [Custom instruction](https://dev.flare.network/smart-accounts/custom-instruction)
- The exact public builder surface includes `executeDirectMintingWithData`, `MasterAccountController`, `PersonalAccount.executeUserOp`, the TypeScript/Viem guides, and recovery opcodes `0xE0`, `0xE1`, and `0xE2`. [TypeScript/Viem guides](https://dev.flare.network/smart-accounts/guides/typescript-viem), [`IMasterAccountController`](https://dev.flare.network/smart-accounts/reference/IMasterAccountController)

### Named buyers and first-user channels

| Buyer or adopter | Authority and reason to adopt | Existing distribution |
|---|---|---|
| XRPL wallet provider, evidenced by Xaman and D'CENT | Can construct XRPL instructions, present progress, and route users into named Flare contracts without a second wallet | Wallet-native featured app/deep link and existing XRP user base. [Xaman](https://flare.network/news/one-click-defi-vault-xaman-flare-smart-accounts), [D'CENT](https://flare.network/news/flare-and-dcent-bring-one-flow-institutional-yield-to-xrp-holders-worldwide) |
| DeFi vault/asset manager, evidenced by Monarq | Can receive FXRP deposits and define the target strategy; benefits from wallet-native XRP distribution | D'CENT's embedded Monarq frontend and campaign; Xaman's curated vault route. [D'CENT](https://flare.network/news/flare-and-dcent-bring-one-flow-institutional-yield-to-xrp-holders-worldwide) |
| Smart Account operator/executor | Runs the backend that monitors XRPL payments, requests/uses proofs, submits Flare calls, and may receive fees | Existing operator addresses are queryable from `MasterAccountController`; official guides provide the executor implementation path. [Smart Accounts overview](https://dev.flare.network/smart-accounts/overview), [`IMasterAccountController`](https://dev.flare.network/smart-accounts/reference/IMasterAccountController) |

### Naturally private versus public inputs

- **Naturally private before execution:** with `0xFE`, the arbitrary call bytes are delivered offchain to the executor while XRPL carries only their hash. This can protect the target/value/calldata from XRPL observers during relay. It does not keep them private after the executor submits the call on Flare. [Custom instruction](https://dev.flare.network/smart-accounts/custom-instruction)
- **Naturally private operator material:** executor infrastructure credentials, signing keys, and agent `secrets.json` are operational secrets. The official Agent Admin Console workflow explicitly separates whitelisted management and work addresses and configures secrets. [Agent update](https://flare.network/news/fassets-open-beta-updates-for-agents)
- **Public or eventually public:** XRPL payment, memo/hash, Flare call, Personal Account state, FXRP transfer, redemption request, redeemer, underlying destination, amount, deadline, and payment reference are ledger/event data. They cannot be relabeled as confidential market inputs. [Smart Accounts overview](https://dev.flare.network/smart-accounts/overview), [`RedemptionRequested`](https://dev.flare.network/fassets/reference/IAssetManagerEvents)

## 3. FCC/FCE: verified builder workflow, limited verified application market

### Current rollout status

- Songbird governance accepted STP.13 on 2026-07-12. The initial deployment covers FCC contracts and system-extension applications FDC-V2 and Protocol Managed Wallets. At launch, TEE machines are Foundation-deployed on Google Confidential Compute and used only for system-extension applications; user-deployed machine/application mechanisms exist but are not used at launch. [STP.13](https://proposals.flare.network/STP/STP_13.html)
- The official Developer Hub currently labels Protocol Managed Wallets **“In development.”** Therefore PMW is not a verified public builder action or present third-party buyer workflow. [Developer Hub](https://dev.flare.network/)
- Flare's official GitHub describes FCC as beta and publishes `tee-node`, `tee-proxy`, relay, scaffold, signing, and example extension repositories. [Flare Foundation GitHub](https://github.com/flare-foundation)

### Accessible builder workflow

| Transition | Actor with authority | Exact interface/source | Environment and boundary | Receipt |
|---|---|---|---|---|
| Deploy sender and register extension | Extension developer/deployer | Project `InstructionSender` calls `TeeExtensionRegistry.sendInstructions`; scaffold `pre-build.sh` registers the extension | Live Coston2 contract; builder-controlled sender | Deployment transaction, extension ID, sender address |
| Relay instruction | Flare data providers plus extension proxy | C-chain indexer → `ext-proxy` → TEE `/action` handler | Requires indexer DB access obtained from Flare support/X; local proxy and public HTTPS tunnel | Instruction transaction and proxy queue/result |
| Register machine | Extension governance/deployer plus FCC registration flow | `post-build.sh`, `TeeMachineRegistry`, normal proxy, extension proxy | Coston2 supports simulated TEE; governance hash and extension ID must match | Machine record, code hash, proxy `/info` |
| Execute extension | Onchain caller, relay providers, registered machine | `InstructionSender` → registry → action handler → signed result | Official getting-started path uses live Coston2 with `SIMULATED_TEE=true`; this is not hardware attestation | Action result, signed result, test assertions |

Sources: [FCC getting started](https://dev.flare.network/fcc/guides/getting-started), [extension scaffold](https://github.com/flare-foundation/fce-extension-scaffold), [private-key extension](https://dev.flare.network/fcc/guides/sign-extension).

### Natural confidential data and trust boundary

- The official signing extension demonstrates a TEE holding a private key and returning signatures. Key material is naturally confidential. The guide warns that encrypted secrets posted onchain are unsuitable for production because ledger data is public and encryption may be broken later; production secret delivery should use offchain channels. [Private-key extension](https://dev.flare.network/fcc/guides/sign-extension)
- Extension business inputs may be confidential only if the pre-existing workflow already treats them as such. FCC registration and signing can prove that identified code ran in the represented environment; they do not prove global secrecy, information-theoretic deletion, or absence of off-machine copies.
- The official Coston2 tutorial explicitly sets `SIMULATED_TEE=true`. A successful tutorial proves the instruction/registration/result plumbing, not production hardware isolation. [FCC getting started](https://dev.flare.network/fcc/guides/getting-started)

### Fees and market evidence

- FIP.16 describes an intended FCC economic loop in which request, setup, and maintenance instructions incur fees distributed to infrastructure providers and FIRE. It describes upcoming FCC operation and continuous infrastructure-provider duties; it is governance/economic design evidence, not proof of current third-party FCE fee volume. [FIP.16](https://proposals.flare.network/FIP/FIP_16.html)
- No reviewed official source in this slice establishes current paying third-party buyers, recurring user-defined FCE application volume, or public production-attested builder deployments. The verified near-term market is developers integrating the beta/scaffold and infrastructure providers supporting the rollout, not an evidenced end-user market for arbitrary confidential apps.
- The reachable builder channel is concrete but permission-dependent: official docs instruct developers to contact Flare support or X for C-chain indexer credentials. [FCC getting started](https://dev.flare.network/fcc/guides/getting-started)

## 4. Authority and interface summary

| Workflow | Invoker | Funder | Observer/verifier | Receiver | Exact accessible interface | Current boundary |
|---|---|---|---|---|---|---|
| Direct FXRP mint | XRP holder or wallet integration | XRP holder pays XRP fees; executor may attach Flare gas/value | FDC, Asset Manager, executor, public events | EVM recipient or Personal Account receives FXRP | `executeDirectMinting`, `executeDirectMintingWithData`, typed periphery packages | Live networks; proof and delay lifecycle required |
| FXRP redemption | FXRP holder | Redeemer pays obligatory redemption fee and optional FLR executor fee | Agent, executor, FDC, Asset Manager | Redeemer receives XRP or collateral compensation | `redeem`, `redeemAmount`, `redeemWithTag`, `redemptionPaymentDefault` | Live; FIFO assignment and public events |
| Agent health/liquidation | Agent, collateral provider, liquidator, challenger | Agent/pool capital; liquidator burns FXRP | FTSO/FDC and Asset Manager | Pool provider, liquidator, challenger, or redeemer depending transition | Collateral pool and Asset Manager interfaces | Live; native safeguards extensive |
| Smart Account arbitrary action | XRPL account owner via wallet/operator | XRP payment includes fees; executor relays | FDC, controller, Personal Account | Target Flare contract/account | `0xFE`/`0xFF`, `executeUserOp`, `executeDirectMintingWithData` | Live integration path; calldata becomes public on Flare execution |
| User-defined FCC extension | Developer-owned sender; data providers relay | Developer pays Coston2 gas/registration; planned FCC fees not established as current volume | Extension proxy, registries, machine signer | Caller receives ActionResult | `InstructionSender`, `TeeExtensionRegistry`, `TeeMachineRegistry`, `/action` | Accessible Coston2 simulated TEE; production-attested public builder market not verified |
| PMW external-chain action | System extension at current rollout | Not established for third-party builders | FCC system | External-chain address | No public third-party callable builder workflow verified | In development; do not claim live builder access |

# NO MARKET / NATIVE PROTOCOL ALREADY SOLVES IT

The entries below are rejection evidence. They identify claims that should not pass Market Reality or End-to-End Operability without new primary evidence.

## 1. Private native redemption queue or hidden-request inclusion

**No verified market.** Native redemption tickets are selected from a protocol-controlled FIFO queue. `RedemptionRequested` publicly exposes the agent vault, redeemer, underlying payment address, value, fee, deadlines, reference, and executor. A “private FXRP redemption router” is a new intermediary, not the current FAssets workflow. A project contract can route its own FXRP but cannot prove demand for that role or alter native assignment. [Redemption queue](https://dev.flare.network/fassets/redemption), [`RedemptionRequested`](https://dev.flare.network/fassets/reference/IAssetManagerEvents)

## 2. Alternative non-payment insurance, capacity penalty, or make-good layer

**Native protocol already solves the core failure.** FDC `ReferencedPaymentNonexistence` plus `redemptionPaymentDefault` compensates the redeemer from collateral and adds a default premium. Bursts automatically extend redemption deadlines. Unresponsive agents/redeemers can be bypassed by executors or anyone with the relevant proof and reward path. A generic insurance reserve, performance cap, score, or reroute overlay duplicates rather than proves a missing outcome unless primary evidence identifies a residual loss after native default. [Default guide](https://dev.flare.network/fassets/developer-guides/fassets-redemption-default), [redemption safeguards](https://dev.flare.network/fassets/redemption)

## 3. User-selected native redemption agent or application-controlled protocol capacity

**No authority.** The protocol selects tickets FIFO; the redeemer does not assign an agent. Applications can change only their own escrow/router caps. Available-agent lists and agent settings support mint selection and observation, not mutation of native redemption assignment or capacity. [Redemption](https://dev.flare.network/fassets/redemption), [list agents](https://dev.flare.network/fassets/developer-guides/fassets-list-agents)

## 4. Generic partial-redemption state machine

**Native protocol already handles partial completion.** `redeemAmount`/`redeemWithTag` support arbitrary amounts above the minimum, ticket count is capped, and `RedemptionAmountIncomplete` returns the unprocessed remainder when too many tickets are required. A project escrow can stage its own tranches but cannot claim the native partial-redemption outcome is absent. [Redemption](https://dev.flare.network/fassets/redemption)

## 5. Correcting a wrong direct-mint recipient after execution

**No callable recovery path.** Official troubleshooting says a wrong encoded recipient succeeds from the protocol's perspective and has no onchain recovery. A product may demonstrate prevention, but it must not promise reassignment, corrected mint, protocol unwind, or refund without an independently authorized recipient. [Minting troubleshooting](https://dev.flare.network/fassets/troubleshooting/minting-troubleshooting)

## 6. Generic Smart Account stuck-mint, nonce, or fee recovery

**Native protocol already supplies recovery controls.** `0xE0` skips a failed memo and recovers FXRP, `0xE1` fast-forwards a stuck nonce, and `0xE2` replaces executor fees. Executor pin/unpin and eventual permissionless execution are also documented. A wrapper around these calls may improve UX but cannot claim the recovery primitive is missing. [Smart Accounts overview](https://dev.flare.network/smart-accounts/overview), [custom instruction recovery](https://dev.flare.network/smart-accounts/custom-instruction)

## 7. Permanent confidentiality for Smart Account transaction intent

**No such guarantee.** `0xFE` hides full calldata on XRPL while the executor transports it, but the target/value/calldata are revealed when executed on Flare. Public ledger fields cannot become natural private inputs merely by hashing or copying them into FCC. [Custom instruction](https://dev.flare.network/smart-accounts/custom-instruction)

## 8. Publicly available PMW product or third-party external signer market

**Not currently verified.** The Developer Hub labels PMW in development. STP.13 says initial Foundation-operated machines are used only for system extensions. Without an exact current third-party callable interface, external-chain signing authority, network, fee path, and transaction receipt, PMW product claims fail End-to-End Operability. [Developer Hub](https://dev.flare.network/), [STP.13](https://proposals.flare.network/STP/STP_13.html)

## 9. Production FCC attestation, global deletion, or current FCE customer demand inferred from a scaffold

**Not verified.** The accessible tutorial combines live Coston2 contracts with a simulated TEE and support-gated indexer access. A signed result can attest represented execution, not global deletion or the absence of copies. The scaffold proves builder capability; it does not prove a paying buyer, repeated confidential asset flow, or production hardware isolation. [FCC getting started](https://dev.flare.network/fcc/guides/getting-started), [private-key extension warning](https://dev.flare.network/fcc/guides/sign-extension)

## 10. Private agent risk, fee, or queue data created from public protocol state

**No natural privacy.** Available-agent details expose collateral ratios, fees, and vault status; redemption events expose assignment and payment data; underlying XRP payments and proofs are externally observable. Naturally private material is limited to real offchain business records, operator credentials/keys, and pre-submission call bytes. Confidential Compute cannot be justified by relabeling public agent or redemption data. [List agents](https://dev.flare.network/fassets/developer-guides/fassets-list-agents), [`IAssetManagerEvents`](https://dev.flare.network/fassets/reference/IAssetManagerEvents)

## Bottom line for downstream gating

- **Verified buyers/channels:** XRP holders through Xaman and D'CENT, named vault managers such as Monarq, FAssets agents, collateral providers, liquidators, challengers, redemption executors, wallet operators, and beta FCC extension developers/infrastructure providers.
- **Verified money/value:** XRP-to-FXRP minting, FXRP redemption, obligatory and optional fees, FLR/agent collateral, CPT fee share, liquidation/challenge premiums, vault deposits, and funded wallet campaigns.
- **Verified native pain:** irreversible mint preflight mistakes, cross-system proof latency, delayed mints, executor/nonce failure, proof-window expiry, and agent collateral operations.
- **Already solved natively:** FIFO redemption assignment, non-payment compensation and premium, burst deadline extension, partial redemption, public proof monitoring, Smart Account skip/nonce/fee recovery, liquidation, and illegal-payment challenges.
- **Not yet a verified market:** arbitrary production-attested FCE apps, third-party PMW external signing, private native redemption queues, application-controlled FAssets agent capacity, or permanent privacy for public/effectively public transaction data.
