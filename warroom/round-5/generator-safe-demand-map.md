# Round 5 Generator-Safe Demand Map

Track strategy: **single-track — Interoperable Asset Products**

This map contains verified market behavior without named competitors, prior projects, collision material, saturation labels, kill lists, or differentiation prompts.

## Market 1: XRP holder entering FXRP and XRPFi

- **Buyer/user:** a self-custodied XRP holder who controls the source payment and destination account.
- **Current behavior:** send XRP through direct minting or a Smart Account route, receive FXRP, and deploy it in a Flare application.
- **Economic signal:** substantial FXRP supply, millions of FXRP DeFi transactions, active holders, and funded wallet/vault acquisition campaigns.
- **Pain:** wrong recipient, wrong destination, below-minimum amount, stale parameters, unclear cross-chain progress, delayed proof, failed downstream action, and uncertain safe exit.
- **Current substitute:** wallet warnings, manual parameter checks, protocol documentation, support, and native recovery instructions.
- **Authority:** the holder signs the XRP payment and controls the receiving Flare/Smart Account; public FAssets and application interfaces execute the asset transition.
- **Reach:** existing XRP wallet and XRPFi communities; no enterprise partner required for a holder-controlled product.

## Market 2: FXRP holder using and exiting DeFi

- **Buyer/user:** an FXRP holder who controls a wallet or Personal Account and chooses where to deploy assets.
- **Current behavior:** transfer, swap, deposit, borrow/lend, hold vault shares, withdraw, redeem to XRP, or move to another strategy.
- **Economic signal:** most circulating FXRP is actively deployed, with repeated transfers and DeFi use.
- **Pain:** fragmented balances, opaque position state, unclear exit path, insufficient redemption planning, partial completion, route disappearance, and execution uncertainty.
- **Current substitute:** individual application UIs, wallet portfolio views, manual transaction sequences, and public protocol dashboards.
- **Authority:** holder-approved ERC-20/application calls, published vault/DEX/lending interfaces when specifically verified, and FAssets redemption interfaces.
- **Reach:** existing FXRP holders and application communities.

## Market 3: FAssets minter and redeemer

- **Buyer/user:** an XRP/FXRP holder performing a native mint or redemption.
- **Current behavior:** construct payment references/tags, send XRP, wait for proof and mint, or burn FXRP and wait for agent XRP payment.
- **Economic signal:** mandatory minting/redemption fees, optional executor fees, and repeated lifecycle activity.
- **Pain:** irreversible input mistakes, proof latency, multiple redemption requests, partial requested redemption, missed deadlines, and the operational burden of invoking default compensation.
- **Current substitute:** official reference applications, manual monitoring, executor services, native default and recovery methods.
- **Authority:** holder, native protocol, assigned agent, optional executor, FDC verifier, and published Asset Manager interfaces.
- **Reach:** any testnet/mainnet user able to mint or redeem; no invented service provider.

## Market 4: Registered FAssets agent

- **Buyer/user:** an existing registered agent or its treasury/operations lead.
- **Current behavior:** post collateral, set terms, accept minting, maintain underlying XRP, fulfill assigned redemptions, prove payments, and manage collateral health.
- **Economic signal:** fee income, locked capital, liquidation/default premiums, and challenger rewards.
- **Pain:** liquidity planning, proof deadlines, collateral deterioration, fragmented cross-chain operations, work-key exposure, and costly operational mistakes.
- **Current substitute:** agent console, scripts/bots, internal treasury tooling, public monitoring, and native protocol safeguards.
- **Authority:** agent-owned addresses and signing systems plus published FAssets calls. A third-party app cannot sign or alter protocol assignment without explicit agent authorization.
- **Reach:** existing agent support/operator channels; a live agent-dependent claim requires a cooperating agent.

## Market 5: Collateral-pool provider

- **Buyer/user:** an FLR holder who deposits into a specific agent collateral pool and receives pool tokens.
- **Current behavior:** inspect agent/pool state, deposit, accrue a share of minting fees, claim fees, observe fee debt, wait through timelocks, and exit.
- **Economic signal:** locked FLR, fee distributions, transferable/timelocked pool tokens, and loss exposure when agent collateral is consumed.
- **Pain:** difficult agent comparison, fee-debt interpretation, exit timing, collateral risk, and fragmented before/after accounting.
- **Current substitute:** raw contract reads, explorer data, agent details, and manual pool interaction.
- **Authority:** provider-owned funds and published collateral-pool interfaces.
- **Reach:** existing FLR/FXRP ecosystem participants.

## Market 6: Liquidator and challenger

- **Buyer/user:** an open participant monitoring agent health or illegal underlying-chain behavior.
- **Current behavior:** identify unhealthy agents or invalid/double payments, acquire/burn the required asset, submit proofs, and receive premiums or rewards.
- **Economic signal:** explicit protocol premiums and challenger rewards.
- **Pain:** cross-chain evidence assembly, timing, capital preparation, transaction profitability, false-positive risk, and fragmented proof-to-reward tracking.
- **Current substitute:** custom bots, raw events, FDC tooling, and manual contract calls.
- **Authority:** any eligible participant using exact public proof, liquidation, or challenge interfaces.
- **Reach:** permissionless operators and technically capable ecosystem users.

## Market 7: Smart Account wallet user and executor

- **Buyer/user:** XRP holder, wallet integration, or existing operator/executor.
- **Current behavior:** encode an XRPL instruction, pay executor fees, obtain FDC proof, mint FXRP, and atomically execute a Flare action through a Personal Account.
- **Economic signal:** executor fees and named wallet-distributed asset flows.
- **Pain:** complicated construction, nonce conflicts, insufficient executor fee, failed target calls, delayed execution, and confusing recovery states.
- **Current substitute:** official guides, backend preflight, native recovery opcodes, operator monitoring, and eventual permissionless execution.
- **Authority:** XRPL owner authorizes the operation; executor relays; controller and Personal Account enforce the committed call.
- **Reach:** current wallet/builders and self-hosted executor users.

## Market 8: Repeat XRP service integrator

- **Buyer/user:** a wallet, exchange, custody service, or application that repeatedly maps XRP payments into a known Flare recipient/executor route.
- **Current behavior:** reserve/configure destination tags, construct memos, reconcile external payment with the minted asset, and support user errors.
- **Economic signal:** repeated deposits, withdrawals, support operations, and executor fees.
- **Pain:** tag lifecycle management, recipient/executor changes, reconciliation, partial-payment interpretation, and support burden.
- **Current substitute:** internal databases, tag registries, X-addresses, reconciliation software, and customer support.
- **Authority:** only credible when the builder controls the integration or has an authorized sandbox/pilot. Public chain access cannot mutate an incumbent's customer ledger.
- **Reach:** conditional on a real cooperating integrator; otherwise use holder-controlled paths only.

## Mandatory product admission

Every idea must include:

1. A named existing buyer/user role from this map.
2. A recognizable pain stated without protocol jargon.
3. Existing economic behavior and current substitute.
4. A reason the user switches now.
5. Exact actor authority for every transition.
6. A real FAssets, FXRP, Smart Account, or FDC-backed asset lifecycle—not an arbitrary token transfer.
7. A complete proof path ending in a judge-visible receipt and failure safeguard.
8. One-builder feasibility and a path to the first five users.
9. User-visible mechanism novelty and demo surprise that stand without sponsor names.

Optional technologies receive no automatic credit. Do not invent buyers, operators, budgets, private data, external support, or protocol authority.
