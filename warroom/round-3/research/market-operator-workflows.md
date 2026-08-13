# Market Operator Workflows for Flare/FXRP

Research date: 2026-08-13  
Scope: market-evidence mining only. This document records established operator workflows and integration boundaries. It does not propose products.

## Decision standard

An operator surface counts as a **real insertion point** only when all of the following already exist:

1. an identifiable actor that currently performs the workflow;
2. an existing fee, funded asset flow, or repeated economic action;
3. a recurring failure documented by the operator or protocol;
4. naturally private inputs, not public chain data relabeled as confidential;
5. an accessible interface that a one-builder application can call;
6. an authorized path from input through asset consequence and receipt;
7. a supported Flare/FXRP boundary, rather than a hoped-for future listing or network deployment.

Ratings used below:

- **NATURAL:** the actor, flow, Flare/FXRP transition, and callable surface already exist.
- **CONDITIONAL:** the external market is real, but Flare/FXRP support, credentials, or transition authority is absent or unverified.
- **UNUSABLE OVERLAY:** a project would have to create the market, operator set, asset budget, job feed, or settlement authority itself.

## Executive finding

The strongest evidence is not an external “solver reserve.” It is Flare's own FAssets and Smart Account operator lifecycle. FAssets already has agents, redeemers, optional executors, collateral, minting and redemption fees, agent listings, default handling, and exact Coston2 interfaces. Smart Accounts already defines an operator/executor that observes XRPL payments, obtains FDC proof, and dispatches committed user operations. These are **NATURAL** insertion surfaces at the application and executor layer, with strict limits: an app may act on project-owned state or call published protocol functions, but it may not invent protocol assignment rights or claim to change agent capacity.

Intent solvers, bridge relayers, staking operators, custodians, exchanges, merchant processors, and treasury operators are all established markets. However, their current official interfaces either expose public jobs rather than confidential ones, restrict execution to supported incumbent networks/assets, require an existing enterprise account, or require protocol/governance authority. None supplies a verified public route for a one-builder app to inject FXRP into the incumbent operator market.

## Summary matrix

| Operator market | Existing actors and economic flow | Naturally private inputs | Public integration surface | Flare/FXRP insertion | Rating |
|---|---|---|---|---|---|
| Flare FAssets | Agents, redeemers, default executors; minting, redemption, executor fees; collateral and FXRP lifecycle | Agent wallet keys and operating policy; redeemer identity/route context can be sensitive, although core request fields and agent metrics are public | `IAssetManager`, FDC, agent-list functions, FXRP ERC-20, redemption/default events | Exact Coston2/mainnet lifecycle exists; app/executor layer only | **NATURAL** |
| Flare Smart Account executors | XRPL users pay an operator/executor; FDC proof triggers personal-account actions and direct minting | Off-chain `PackedUserOperation` before submission, executor policy, credentials; targets/calldata become public when executed on Flare | `executeDirectMintingWithData`, `IMasterAccountController`, memo opcodes, FDC | Exact Coston2 workflow and receipts exist | **NATURAL** |
| Intent solvers/fillers | Solvers/fillers compete to settle signed swap orders using inventory and strategies | Solver strategy, inventory, private-liquidity relationships; user orders are generally public to the feed | UniswapX order API/reactors; CoW orderbook/driver/settlement services | Supported-chain lists do not establish Flare or FXRP; recreating a filler network is cold start | **CONDITIONAL / unusable for this event** |
| Bridge relayers | Relayers front destination liquidity and earn relayer fees; LPs earn utilization fees | Private keys, inventory thresholds, rebalancing configuration; deposits are public | Across Swap API, fee API, relayer software, SpokePool | Across publishes many supported chains, but not a verified Flare/FXRP route | **CONDITIONAL** |
| Staking operators | Node operators receive stake, earn protocol-fee shares, post bonds, and face penalties/ejection | Validator signing keys and internal operations; allocations and performance are largely public | Lido StakingRouter, module contracts, oracle artifacts | FXRP is not a consensus staking asset and Flare app has no authority over Lido allocation | **UNUSABLE OVERLAY** |
| Custodians | Vault operators authorize and sign transfers under enterprise policy | Key shares, vault mappings, approval policy, transaction notes | Fireblocks REST/SDK, policy APIs, webhooks | Ripple and Songbird appear in documented support; Flare mainnet/FXRP support is not established by the reviewed source | **CONDITIONAL** |
| Exchanges/prime brokers | Institutional portfolios trade, custody, finance, deposit, and withdraw; negotiated fees apply | Orders, portfolio balances, client policy, credentials | Coinbase Prime REST, FIX, WebSocket | Asset/network access is entity-scoped; published network tables do not list Flare/FXRP | **CONDITIONAL** |
| Merchant processors | Merchants create checkouts, receive payments, reconcile, refund, and pay transaction fees | Invoice metadata, customer/order linkage, refund policy | Coinbase Business/Commerce APIs and signed webhooks | Current Checkout support is USDC on Base, not FXRP/Flare | **CONDITIONAL** |
| Treasury operators | Existing Safe owners propose, co-sign, execute, and index treasury transactions | Draft proposals, internal purpose/limits, signer communications; executed state and owners are public | Safe Protocol Kit, API Kit, Transaction Service | Unsupported networks require infrastructure deployment; no reviewed official hosted Flare service was established | **CONDITIONAL / too heavy for one builder** |

## 1. Flare-native FAssets operators

### Actors and existing workflow

- **Agents** lock vault and pool collateral, receive underlying XRP during minting, and pay underlying XRP during redemptions. Their available capacity, collateral ratios, fees, and vault status are queryable through `getAvailableAgentsDetailedList`. [Flare agent-list guide](https://dev.flare.network/fassets/developer-guides/fassets-list-agents)
- **Minters** choose an available agent, reserve collateral, pay underlying XRP, and call `executeMinting` with proof. `reserveCollateral` accepts the agent vault, lots, maximum fee, and executor. [IAssetManager reference](https://dev.flare.network/fassets/reference/IAssetManager)
- **Redeemers** burn FXRP through `IAssetManager.redeem` and receive XRP from an assigned agent. [Redeem FAssets guide](https://dev.flare.network/fassets/developer-guides/fassets-redeem)
- **Default executors** may monitor overdue redemptions, obtain FDC nonexistence proof, and call `redemptionPaymentDefault`; either the redeemer or authorized executor can act. [Redemption-default guide](https://dev.flare.network/fassets/developer-guides/fassets-redemption-default)

### Existing fees and asset flows

- Redemption charges an obligatory underlying-asset fee split between the agent and collateral pool. An optional executor fee in FLR compensates an executor that triggers a default. [Flare redemption overview](https://dev.flare.network/fassets/redemption)
- Published operational parameters include collateral reservation fee, redemption fee, minimum redeem amount, and redemption-default premium. The current table documents economically meaningful values rather than hypothetical tokenomics. [FAssets operational parameters](https://dev.flare.network/fassets/operational-parameters)
- Agents and pool participants lock real collateral; failed redemptions and liquidations can consume agent or pool collateral. Pool participants receive FAsset fees, while agents must maintain stake in their pools. [FAssets collateral model](https://dev.flare.network/fassets/collateral)

### Recurring/documented failures and current substitutes

- An agent may miss the underlying-chain payment deadline. The native substitute is already defined: obtain an FDC `ReferencedPaymentNonexistence` proof and call `redemptionPaymentDefault`. An overlay that merely detects or compensates the same default duplicates the protocol. [Redemption-default guide](https://dev.flare.network/fassets/developer-guides/fassets-redemption-default)
- Mint capacity may be unavailable because of collateral ratios, pool stake, minting caps, fee limits, or agent availability. Users currently query agent state and preflight the protocol parameters. [Agent-list guide](https://dev.flare.network/fassets/developer-guides/fassets-list-agents), [operational parameters](https://dev.flare.network/fassets/operational-parameters)
- Redemption requests, deadlines, fees, payment references, executor, and destination tag emit as protocol events. These fields are public evidence, not confidential inputs. [IAssetManager events](https://dev.flare.network/fassets/reference/IAssetManagerEvents)

### Natural confidentiality

- Agent signing keys, wallet controls, treasury exposure policy, and internal operational thresholds are naturally private.
- Core agent metrics, redemptions, fees, deadlines, payment references, and protocol assignment are public and cannot be “made private” to justify FCC.
- A confidential computation can credibly use private operator policy only when its signed result controls an application-owned action or an already-authorized protocol call. It cannot override native assignment, default, collateral, or governance rules.

### Interfaces and one-builder insertion boundary

- FXRP and `AssetManagerFXRP` are deployed and documented; Coston2 FXRP has an official token address, while production code should resolve protocol contracts through the registry. [FAssets reference](https://dev.flare.network/fassets/reference), [Flare Contract Registry](https://dev.flare.network/network/guides/flare-contracts-registry)
- FCC extensions can receive instructions, run extension logic, and return results through the proxy; Flare provides a Coston2 scaffold with explicit simulated-TEE mode. [FCC getting-started guide](https://dev.flare.network/fcc/guides/getting-started)
- A registered-machine signature can be verified onchain before an ERC-20 state transition, as shown by Flare's official FCC settlement example. [FCC signed-result example](https://dev.flare.network/fcc/guides/weather-insurance-extension)

**Assessment: NATURAL.** A one-builder application can observe official agent/redemption events, call published FAssets functions, verify an FCC result, and move project-controlled FXRP. It cannot create a new agent market, modify native agent capacity, replace default compensation, or assert control over an agent's underlying wallet.

## 2. Flare Smart Account operators and executors

### Actors, flow, and economic signal

Flare Smart Accounts define an existing two-actor flow. An XRPL user sends a `Payment` to an operator address with an instruction. The operator requests FDC proof and submits it to the `MasterAccountController`; the user's personal account performs the encoded action. The direct-mint custom-instruction flow includes minting and executor fees paid in XRP. [Smart Accounts overview](https://dev.flare.network/smart-accounts/overview), [custom-instruction implementation](https://dev.flare.network/smart-accounts/guides/typescript-viem/custom-instruction-ts)

### Recurring/documented failures and native substitutes

- `executeDirectMintingWithData` can revert for invalid sender, nonce, memo, hash, or insufficient call value. A duplicate nonce can leave the later XRP payment at the Core Vault. [Custom Instruction failure handling](https://dev.flare.network/smart-accounts/custom-instruction)
- Flare already supplies recovery opcodes: skip failed memo (`0xE0`), fast-forward nonce (`0xE1`), replace executor fee (`0xE2`), and pin/unpin executor (`0xD0`/`0xD1`). [Smart Accounts overview](https://dev.flare.network/smart-accounts/overview)
- A stuck direct mint caused by a reverted call or an executor that never submitted proof has an official recovery guide. [Recover Stuck Mint Transaction](https://dev.flare.network/smart-accounts/guides/typescript-viem/recover-stuck-mint-transaction-ts)

### Natural confidentiality

- In the `0xFE` flow, only a hash is carried in the XRPL memo; the full `PackedUserOperation` travels to the executor offchain. This is genuine pre-execution confidentiality on XRPL.
- The target, value, and calldata become visible when the executor submits and executes the user operation on Flare. This is delayed disclosure, not permanent secrecy. [Custom Instruction protocol](https://dev.flare.network/smart-accounts/custom-instruction)
- Executor credentials, availability policy, private risk thresholds, and preflight context are naturally private. Public nonce, transaction ID, final calls, and emitted results are not.

### Interfaces and one-builder insertion boundary

- Exact callable path: XRPL payment → FDC `XRPPayment` proof → `AssetManagerFXRP.executeDirectMintingWithData(proof,data)` → personal-account `executeUserOp` → `UserOperationExecuted`. [Custom Instruction protocol](https://dev.flare.network/smart-accounts/custom-instruction)
- Official Coston2 examples include transaction hashes and demonstrate the full proof and execution path. [TypeScript/Viem custom-instruction guide](https://dev.flare.network/smart-accounts/guides/typescript-viem/custom-instruction-ts)

**Assessment: NATURAL.** The executor role, fee, private payload delivery, exact calls, and receipts already exist. A one-builder app may implement an executor-facing application or an application contract invoked by the personal account. It must not claim a generalized private job market or permanent calldata secrecy.

## 3. Intent solvers and fillers

### Actors and workflow

- UniswapX swappers sign auction orders; fillers monitor the order feed, evaluate orders using strategy, inventory, and risk controls, then call the target reactor's `execute`. The filler role is permissionless; the quoter role is permissioned. [UniswapX filler overview](https://developers.uniswap.org/docs/liquidity/uniswapx/filling/overview)
- Orders are submitted through the Trade API and remain open until filled, canceled, or expired. [UniswapX order API](https://developers.uniswap.org/docs/api-reference/post_order)
- CoW Protocol exposes an orderbook API for signed orders and fee estimates; solvers query open orders, while the autopilot cuts auctions and stores competition results. [CoW Protocol services](https://github.com/cowprotocol/services)

### Existing flow, failure, and substitute

- Fillers use their own liquidity or external sources and pay gas; competition determines who settles first. Unfilled orders expire, and order services track `filled`, `cancelled`, `expired`, `error`, and `insufficient-funds` states. [UniswapX overview](https://developers.uniswap.org/docs/liquidity/uniswapx/overview), [official UniswapX order service](https://github.com/Uniswap/uniswapx-service)
- The current substitute is the incumbent order service, auctions, reactor contracts, and filler network. Recreating these actors for FXRP would be a new market, not an integration.

### Natural confidentiality

- UniswapX explicitly says signed orders are broadcast publicly. User order size, auction bounds, and deadline therefore fail a confidentiality claim in this workflow. [UniswapX overview](https://developers.uniswap.org/docs/liquidity/uniswapx/overview)
- Solver algorithms, inventory, hedging routes, private-liquidity relationships, and risk thresholds are naturally private.

### Flare/FXRP boundary

The official filler documentation lists supported chain IDs and does not list Flare. The APIs and reactors are protocol-specific. A standalone FXRP router could transfer tokens, but it would not inherit UniswapX/CoW order flow, quoter authority, filler liquidity, or settlement competition.

**Assessment: CONDITIONAL, unusable for a one-builder Flare market.** The external market proves that solver roles and private strategies exist. It does not provide a callable FXRP operator market. Any concept requiring new FXRP jobs, fillers, inventory, and acquisition fails the cold-start market gate.

## 4. Bridge relayers

### Actors, fees, and repeated flow

Across users deposit on an origin chain; relayers front destination liquidity and wait for reimbursement. The user-paid spread funds LP fees and relayer fees. Relayer fees compensate destination gas, capital opportunity cost, and capital-at-risk from software bugs, reorgs, and settlement delays. The documented reimbursement wait is approximately 1.5 hours. [Across fee model](https://docs.across.to/introduction/fees)

### Workflow, failures, and substitute

- The open-source relayer scans unfilled deposits and fills them when its balances permit. Operators configure private keys, RPCs, gas multipliers, inventory, and automatic rebalancing, and can simulate with `SEND_RELAYS=false` before going live. [Running an Across relayer](https://docs.across.to/introduction/relayers/running-relayer)
- Existing substitutes are the live relayer set, LP pools, fee quotation, inventory rebalancing, refunds, and status tracking.
- Recurring documented risks are insufficient inventory, gas volatility, reorgs, bugs, and delayed reimbursement. These are real operator problems, not inferred demand.

### Natural confidentiality

- Private keys, inventory targets, profitability thresholds, RPC ordering, and rebalancing policy are naturally private.
- Deposit intents, origin/destination, amount, and fill state are public protocol data. Hiding them in a separate app would be artificial unless the incumbent protocol itself accepts a private order channel.

### APIs and Flare/FXRP boundary

- The Swap API exposes supported chains/tokens, quotes, approval transactions, status, and optional integrator fees; production access uses an API key and integrator ID. [Across features](https://docs.across.to/introduction/features), [Across tools](https://docs.across.to/tools)
- Across documents its deployed chain list and `/swap/chains` endpoint. The reviewed official list does not establish Flare or FXRP support. [Across chains and contracts](https://docs.across.to/chains-and-contracts)

**Assessment: CONDITIONAL.** A relayer-local confidential policy is grounded in a real market, but a Flare submission cannot claim Across allocation or settlement until Flare and FXRP appear on supported chain/token endpoints. A project-controlled FXRP transfer is not an Across relay.

## 5. Staking operators

### Actors, fees, and flows

Lido's Community Staking Module lets operators join by running validators and posting a bond. Stake is allocated to valid keys through a protocol queue, and operators earn bond rebase plus a portion of staking rewards. [Lido CSM introduction](https://docs.lido.fi/staking-modules/csm/intro/)

Lido charges a 10% protocol fee on staking rewards; the fee is split between node operators and the DAO treasury. Performance-oracle reports allocate operator rewards, with underperformers receiving no operator reward and persistent bad performance potentially causing penalties or ejection. [Lido overview](https://docs.lido.fi/), [CSM rewards](https://docs.lido.fi/staking-modules/csm/rewards/)

### Failure and current substitute

- Documented failures include low performance, missed duties, slashing, stolen execution-layer rewards, and delayed exits. Native contracts, oracle reports, bonds, penalties, and forced ejection already govern the response. [Lido CSM introduction](https://docs.lido.fi/staking-modules/csm/intro/), [exit penalties](https://docs.lido.fi/guides/oracle-spec/penalties/)
- Allocation authority belongs to the StakingRouter/module/governance roles, not an arbitrary application. The router exposes stake and fee state but mutators are role-gated. [StakingRouter](https://docs.lido.fi/contracts/staking-router/), [protocol levers](https://docs.lido.fi/guides/protocol-levers/)

### Natural confidentiality and Flare boundary

Validator signing keys and internal incident details are private. Operator addresses, validator keys, allocation, performance artifacts, rewards, and penalties are substantially public. FXRP is not a staking/consensus asset in this workflow, and a Flare application has no Lido allocation authority.

**Assessment: UNUSABLE OVERLAY.** Staking proves an operator-capacity market exists elsewhere, but transplanting its scoring and allocation to project-routed FXRP would create a new provider market rather than enter Lido's.

## 6. Custodians

### Actors, workflow, and economic behavior

Fireblocks customers create vault accounts and initiate transfers, contract calls, raw/typed signing, mint, and burn operations through the transaction API. Transactions can target vaults, whitelisted wallets, exchanges, and one-time addresses. [Fireblocks transaction API](https://developers.fireblocks.com/reference/create-transactions)

The official quickstart requires an approved API user, vault funding, transaction creation, and transaction-status verification. This proves a recurring enterprise transaction workflow, although the reviewed official sources do not publish a standard transaction price. [Fireblocks quickstart](https://developers.fireblocks.com/docs/quickstart)

### Failure and current substitute

- Fireblocks recommends `externalTxId`/idempotency keys to prevent duplicate transfers after ambiguous network failures. Responses may report slow or stuck outgoing transactions; CLI errors include rate limits. [Create Transaction reference](https://developers.fireblocks.com/api-reference/transactions/create-a-new-transaction), [CLI usage](https://developers.fireblocks.com/docs/cli-usage)
- Transaction Authorization Policy rules already allow `ALLOW`, `BLOCK`, and `2-TIER` actions with designated signers and authorization groups. [Fireblocks policy configuration](https://developers.fireblocks.com/reference/configure-transaction-authorization-policy)

### Natural confidentiality

MPC/key material, API credentials, vault/customer mappings, destination allowlists, transaction notes, and approval policy are naturally private. Final chain transactions are public. A confidential layer that simply duplicates the incumbent policy engine would not create a new workflow.

### APIs and Flare/FXRP boundary

- Fireblocks supports custom ERC-20 assets on EVM networks that Fireblocks itself supports. [Add Tokens](https://developers.fireblocks.com/docs/add-your-tokens-1)
- The reviewed supported-network table includes Ripple and Songbird, but does not establish Flare mainnet or FXRP availability. [Fireblocks supported networks](https://developers.fireblocks.com/docs/supported-networks)
- Execution requires an existing customer workspace and API credentials; a one-builder demo cannot treat Fireblocks as an open operator market.

**Assessment: CONDITIONAL.** A customer-authorized Fireblocks integration is real only with an existing workspace and confirmed asset/network support. Without those, a mock custodian, invented vault operator, or claimed FXRP settlement is unusable.

## 7. Exchanges and prime brokers

### Actors, fees, and flows

Coinbase Prime provides institutional trading, custody, staking, market-data, and account APIs. Prime trading fees use negotiated basis-point pricing and surface commission/exchange-fee fields on executed orders. [Prime overview](https://docs.cdp.coinbase.com/prime/concepts/overview), [Prime trading fees](https://docs.cdp.coinbase.com/prime/concepts/trading/trading-fees)

The production system exposes authenticated REST, WebSocket, and FIX endpoints. Its smart order router aggregates liquidity across venues and supports venue filtering. [Prime systems and operations](https://docs.cdp.coinbase.com/prime/introduction/systems-operations)

### Failure and current substitute

- Official APIs expose product-specific limits, order/fill state, cancellation, fee fields, and authenticated portfolio scope. Invalid parameter combinations produce errors, and only enabled products for the portfolio are tradable. [Prime changelog](https://docs.cdp.coinbase.com/prime/changes/changelog), [Trading Basics](https://docs.cdp.coinbase.com/prime/concepts/trading/trading)
- The current substitute is Prime's own SOR, custody controls, FIX/REST workflow, and negotiated service relationship.

### Natural confidentiality

Institutional order size, portfolio balances, venue preferences, financing state, client identity, and API credentials are naturally private. Market data and final onchain withdrawals are not. These inputs live behind an authenticated Prime account.

### Flare/FXRP boundary

- API access requires portfolio-scoped keys created in the Prime UI. [Prime authentication](https://docs.cdp.coinbase.com/prime/rest-api/authentication)
- Asset/network eligibility is returned for a specific entity; published multi-network examples cover assets and networks such as USDC, ETH, BTC, Ethereum, Base, Arbitrum, Avalanche, Optimism, and Solana, not Flare/FXRP. [List Assets](https://docs.cdp.coinbase.com/api-reference/prime-api/rest-api/assets/list-assets), [Prime multi-network](https://docs.cdp.coinbase.com/prime/concepts/transactions/multinetwork)

**Assessment: CONDITIONAL.** The market and private data are real, but a builder cannot assume listing, custody, account access, or withdrawal authority for FXRP. A project DEX or project vault does not become an exchange integration by imitating the API shape.

## 8. Merchant processors

### Actors, fees, and flows

Merchants create checkouts/payment requests, customers pay, and processors emit success, failure, expiry, reconciliation, and refund events. Coinbase documents `POST /charges`, checkout retrieval/deactivation, and real-time signed webhooks. [Checkout API mapping](https://docs.cdp.coinbase.com/coinbase-business/checkout-apis/migrate-from-commerce/api-schema-mapping), [Checkout webhooks](https://docs.cdp.coinbase.com/coinbase-business/checkout-apis/webhooks)

Coinbase's published developer pricing lists a 1% Commerce transaction fee, establishing existing willingness to pay for processing. [CDP pricing](https://www.coinbase.com/developer-platform/pricing)

### Failure and current substitute

- Documented lifecycle states include active, processing, expired, completed, and failed; webhooks include payment/refund success and failure. Existing processors already perform status tracking and refunds. [Checkout API mapping](https://docs.cdp.coinbase.com/coinbase-business/checkout-apis/migrate-from-commerce/api-schema-mapping), [Checkout webhooks](https://docs.cdp.coinbase.com/coinbase-business/checkout-apis/webhooks)
- Coinbase Payment Acceptance exposes authorization, capture, charge, void, refund, reconciliation, operators, and webhook APIs. [Payment Acceptance API](https://docs.cdp.coinbase.com/api-reference/payment-acceptance/overview)

### Natural confidentiality

Invoice description, customer/order linkage, fulfillment state, merchant identity, refund policy, and API credentials are naturally private. Payment address, amount, and settlement transaction become observable onchain. A private invoice dataset is credible only when supplied by an actual merchant using the processor.

### Flare/FXRP boundary

The current Coinbase Business Checkout documentation states support for USDC on Base, with other networks/tokens deferred. [Checkout FAQ](https://docs.cdp.coinbase.com/coinbase-business/checkout-apis/migrate-from-commerce/faq)

**Assessment: CONDITIONAL.** Merchant demand and fees are real, but the reviewed incumbent API does not settle FXRP. A one-builder project can demonstrate its own checkout contract, but that does not prove merchant acquisition, processor authority, or insertion into Coinbase's market.

## 9. Treasury operators

### Actors, workflow, and flow

Safe owners create a transaction, propose it to the Transaction Service, retrieve pending transactions, collect signatures, and execute after reaching the account threshold. The official TypeScript guides use Protocol Kit and API Kit for this complete flow. [Execute Safe transactions](https://docs.safe.global/sdk/protocol-kit/guides/execute-transactions)

The Transaction Service indexes executed transactions, configuration changes, token transfers, confirmations, and offchain signatures, and exposes REST endpoints for proposing and tracking transactions. [Safe Transaction Service](https://docs.safe.global/core-api/api-safe-transaction-service), [API overview](https://docs.safe.global/core-api/transaction-service-overview)

### Failure and current substitute

The existing substitute is the Safe account threshold, pending-signature service, transaction decoder, indexing, and owner coordination. Reorg handling and service maintenance are part of the official infrastructure. A separate confidential approval layer must not be counted as a treasury market unless an existing Safe owner authorizes it.

### Natural confidentiality

Internal purpose, draft transaction context, risk limits, and signer communications may be private before execution. Safe owners, threshold, executed calldata, transfers, and module state are public. Offchain proposals are shared with the Transaction Service, not inherently TEE-private.

### Flare/FXRP boundary

Safe documents 49 hosted supported-network entries on its current network page. For unsupported networks, the prescribed path is to deploy contracts and a stack of offchain services; the self-hosted example runs seventeen containers and requires RPC, databases, queues, and indexers. [Safe supported networks](https://docs.safe.global/advanced/smart-account-supported-networks), [Safe infrastructure deployment](https://docs.safe.global/core-api/safe-infrastructure-deployment)

The reviewed evidence did not establish an official hosted Safe Transaction Service for Flare. Self-hosting that stack is not a natural one-builder insertion point for a 24-hour hackathon.

**Assessment: CONDITIONAL / too heavy.** Existing Safe owners are real treasury actors, but without a named owner, supported Flare service, and explicit authorization, a project treasury is only project-owned state. Flare Smart Accounts provide a more direct native path for XRPL-authorized actions.

## Real insertion points

These are evidence classifications, not product proposals.

### A. FAssets agent, redeemer, and default-executor application layer

- **Why real:** actors, collateral, fees, FXRP lifecycle, default process, agent data, callable contracts, and receipts already exist.
- **What one builder controls:** a project contract, project-held FXRP, calls available to any redeemer/executor, UI/workflow, and an FCC result verifier.
- **What one builder does not control:** agent assignment, protocol capacity, agent wallet, governance fee parameters, default compensation, or Core Vault.
- **Evidence needed at demo:** exact Coston2 chain and registry-resolved addresses, real FXRP transaction, FDC proof where applicable, registered/simulated FCC label, signed result, contract verification, and failure receipt.

### B. Smart Account custom-instruction executor/application layer

- **Why real:** operator/executor role, XRP fee flow, offchain committed payload, FDC proof, exact contract path, recovery opcodes, and onchain receipts already exist.
- **What one builder controls:** authenticated delivery endpoint, executor implementation, application contract called by the personal account, preflight policy, and honest simulated/registered FCC boundary.
- **What one builder does not control:** XRPL user demand, official wallet distribution, MasterAccountController rules, FDC finality, or protocol fee schedule.
- **Privacy limit:** the offchain payload is hidden on XRPL but becomes public when executed on Flare; only private policy inputs kept inside FCC can remain undisclosed.

### C. Existing enterprise account integrations, only if credentials already exist

- Fireblocks, Coinbase Prime, Coinbase Business, and Safe expose real APIs and naturally private enterprise data.
- They are insertion points only when the builder already has a funded authorized account/workspace, the relevant Flare/FXRP asset-network is supported, and the demo can execute the full transition.
- Without those prerequisites, they are not credible hackathon dependencies.

## Tempting but unusable overlays

1. **New FXRP solver/provider market.** A router, scoring function, and live token transfer do not create job demand, providers, inventory, fees, fallback operators, or user acquisition. Existing intent markets are chain/protocol-specific and expose their own order feeds.
2. **Private scoring of public operator data.** Agent collateral ratios, redemption events, solver orders, bridge deposits, validator performance, and executed treasury actions are public. Hiding a copied dataset adds no natural confidentiality.
3. **Application cap presented as protocol capacity.** A project can cap its own FXRP router. It cannot alter FAssets agent capacity, Across relayer capacity, Lido stake weights, exchange credit, or custodian policy without the authorized incumbent interface.
4. **External protocol support inferred from EVM compatibility.** An ERC-20 transfer working on Coston2 does not mean Across, UniswapX, Safe's hosted service, Fireblocks, Coinbase, or another incumbent supports Flare/FXRP.
5. **Project-funded reserve presented as existing economic behavior.** Faucet tokens or builder deposits prove execution, not a buyer budget or recurring fee flow.
6. **Fixture jobs presented as market demand.** A seeded request and provider can demonstrate code, but cannot satisfy named-buyer, existing-workflow, first-five-users, or acquisition evidence.
7. **Duplicating native FAssets recovery.** Redemption defaults, failed direct-mint recovery, nonce fast-forward, and executor-fee replacement already have protocol paths. An overlay must complete a different authorized user outcome rather than rebrand those functions.
8. **PMW-dependent external settlement.** Flare's Developer Hub currently labels Protocol Managed Wallets “in development.” No submission should rely on a public production PMW interface unless a new official callable path is verified. [Flare Developer Hub](https://dev.flare.network/)
9. **Information-theoretic privacy claims.** FCC simulated mode is explicit, and public ciphertext is not permanent secrecy. Use machine identity, code hash, registration/attestation status, signed result, and exact disclosure boundary. [FCC private-key extension](https://dev.flare.network/fcc/guides/sign-extension)

## Gate-ready conclusions

- **Market reality winner:** the native FAssets and Smart Account executor workflows. They already have actors, fees, failures, calls, and receipts.
- **Best external analogues:** Across relayers for inventory/risk operations, UniswapX/CoW for solver competition, Fireblocks for private policy-controlled signing, and Safe for multi-owner treasury execution.
- **External integration reality:** analogy does not confer authority. None of the reviewed external operator markets establishes a public, supported FXRP insertion path.
- **Confidentiality reality:** the most defensible private inputs are operator keys, inventory/risk policy, enterprise transaction context, invoice/customer metadata, and Smart Account offchain payload/policy. Public orders and chain events are not private inputs.
- **One-builder rule:** stay inside an existing Flare actor and authority chain, or use an already-authorized enterprise workspace. If the concept needs the builder to recruit providers, source jobs, fund working capital, operate fallback settlement, and acquire both sides, classify it as an unusable overlay before novelty scoring.
