# Round 3 Market Reality Map

Status: generator-safe demand map frozen before ideation
Research date: 2026-08-13
Track contract: both Interoperable Asset Products and Confidential Compute Apps are independently load-bearing

This map describes existing actors, workflows, economic behavior, and naturally private inputs. It is not an idea list. The named-source and rejection material begins only after the gate-only divider.

## Generator-Safe Demand Map

### Demand cluster 1: XRP holder entering and using XRPFi

| Field | Evidence-safe finding |
|---|---|
| User and named buyer | A self-custodied XRP holder controls the funding transaction; an existing wallet or vault operator can authorize an integration. |
| Existing workflow | The holder sends XRP through a direct-mint or Smart Account route, receives FXRP, and deposits into an existing DeFi strategy. |
| Economic signal | Current ecosystem evidence shows substantial FXRP supply, millions of FXRP DeFi transactions, and most circulating FXRP actively deployed. Wallet campaigns have required meaningful deposited value and holding periods. |
| Costly failure | Wrong recipient/address and below-minimum payments are irreversible; delayed minting, nonce conflicts, failed custom instructions, and executor problems strand the flow until native recovery. |
| Current substitute | Manual preflight, wallet warnings, protocol recovery opcodes, and support documentation. Prevention remains more valuable than post-failure recovery for irreversible mistakes. |
| Natural confidentiality | Risk bounds, intended amount, target-strategy preference, future call payload, and personal portfolio context are private before execution. Final transfers and executed calldata are public. |
| Reachable distribution | Existing XRP wallet, FAssets, and XRPFi communities; a holder can self-authorize a complete test flow without an enterprise integration. |
| Authority chain | Holder signs XRPL payment → executor obtains proof and invokes published direct-mint/Smart Account interfaces → Personal Account or holder-owned EVM account invokes application/vault → onchain receipts. |

### Demand cluster 2: FAssets agent treasury and operations

| Field | Evidence-safe finding |
|---|---|
| User and named buyer | A registered FAssets agent or its treasury/operations lead controls agent work and management addresses and bears collateral risk. |
| Existing workflow | The agent posts collateral, accepts minting demand, holds underlying XRP, fulfills assigned redemptions, proves payments, and manages collateral health. |
| Economic signal | Agents earn minting/redemption fee shares and risk collateral loss, liquidation, default premiums, and challenge rewards. Historical public beta data shows repeated mint/redeem and agent activity. |
| Costly failure | Inadequate liquidity, missed proof windows, failed payments, stale operational state, and compromised work keys can cause delayed settlement or collateral loss. Native protocol safeguards cover many public failure states. |
| Current substitute | Agent console, internal treasury tooling, public agent state, FDC proofs, collateral top-ups/self-close, default and liquidation mechanisms. |
| Natural confidentiality | Agent signing keys, planned underlying-liquidity movements, internal exposure limits, emergency policy, and work-address credentials are private. Public collateral ratios, queue state, and redemption events are not. |
| Reachable distribution | Existing official agent support group/admin channel and public agent registry. A pilot requires a cooperating real agent; otherwise stay within self-controlled demo state and do not claim adoption. |
| Authority chain | Agent-owned offchain policy/key material → confidential computation may return a minimal signed decision → agent-authorized or project-owned application call → published FAssets/FXRP interface → receipt. No application may change native assignment or capacity. |

### Demand cluster 3: Smart Account executor reliability

| Field | Evidence-safe finding |
|---|---|
| User and named buyer | An existing Smart Account operator/executor or wallet integration monitors XRPL instructions and earns an executor fee. |
| Existing workflow | Operator observes an XRP payment or committed custom instruction, obtains FDC proof, delivers offchain call bytes when used, and relays execution to the Personal Account. |
| Economic signal | Executor fees are built into the flow; named wallet integrations already route XRP holders into live Flare applications. |
| Costly failure | Payload mismatch, stale nonce, inadequate fee, unavailable executor, failed target call, and secret/credential compromise interrupt the user journey. Native recovery exists for stuck mint, nonce, and fee replacement. |
| Current substitute | Operator backend preflight, serialization, monitoring, recovery opcodes, pin/unpin rules, and eventual permissionless execution. |
| Natural confidentiality | The committed call bytes before submission, operator credentials, risk thresholds, service availability policy, and user-specific preflight context can be private. Executed target/value/calldata become public. |
| Reachable distribution | Operator and wallet-builder communities plus a self-hosted executor path; no new provider marketplace is needed. |
| Authority chain | XRPL account owner signs payment/commitment → operator receives authorized payload → FDC proves payment → controller/Personal Account executes → project/vault state changes → receipt. |

### Demand cluster 4: exchange or custodial XRP attribution and reconciliation

| Field | Evidence-safe finding |
|---|---|
| User and named buyer | Exchange wallet/operations/support lead or custodian product lead controls off-ledger account attribution and hot-wallet actions. The depositing customer controls only their transaction. |
| Existing workflow | Customers send XRP with an account-identifying tag; the business detects the payment, reconciles it to an internal ledger, and later processes withdrawals. |
| Economic signal | Major exchanges report substantial XRP transaction revenue, assets on platform, and repeated deposit/withdrawal activity. Missing or wrong tags create manual support work. |
| Costly failure | Wrong/missing tags, partial-payment interpretation, internal ledger mismatch, and withdrawal-policy exceptions cause delayed credit, manual investigation, or loss. |
| Current substitute | Required destination tags, X-addresses, internal reconciliation, support tickets, hot/cold-wallet procedures, and incumbent custody policy engines. |
| Natural confidentiality | Customer-to-tag mapping, internal balance, review status, withdrawal request, approval graph, and notes are private. Ledger payment and amount are public. |
| Reachable distribution | Only credible with an authorized sandbox/account or cooperating exchange/custodian. A public chain proof cannot credit the internal ledger. |
| Authority chain | Customer submits XRP → business-owned ingestion maps tag/account → authorized internal system decides/credits → business-owned wallet or approved integration moves assets → receipt. Missing enterprise authority is a hard kill. |

### Demand cluster 5: XRP-funded business treasury or payment operation

| Field | Evidence-safe finding |
|---|---|
| User and named buyer | Crypto-native SME treasury lead, payment-service operator, or finance lead that already holds/receives XRP and controls its own payments. |
| Existing workflow | Treasury receives XRP, manages counterparties/invoices/limits privately, converts or deploys assets, and sends settlement. |
| Economic signal | Crypto B2B payments and XRP settlement are active paid markets, but stablecoins and fiat dominate broadly. Only an evidenced XRP-funded pilot qualifies. |
| Costly failure | Wrong recipient, policy breach, liquidity mismatch, duplicate payment, and exposed future payment intent can cause loss or front-running. |
| Current substitute | Private accounting/payment systems, approval workflows, multisig/custody controls, allowlists, and manual conversion. |
| Natural confidentiality | Counterparty mapping, invoice, purpose, future route, approval policy, risk limit, and liquidity position are private before settlement. Final public-chain payment is not. |
| Reachable distribution | A crypto-native SME or self-controlled treasury pilot; requiring a licensed payout network or new merchant market fails. |
| Authority chain | Treasury owner supplies private policy and authorizes funds → confidential result must directly gate a holder-controlled FXRP/Smart Account action → recipient receives asset → receipt. |

## Generator Admission Rules

Every generated concept must:

1. Select one demand cluster without inventing any new actor.
2. Name the buyer, current workflow, current substitute, and existing economic signal from that cluster.
3. Use only naturally private inputs listed for that workflow.
4. Keep every transition inside the cluster's existing authority chain.
5. Map every external transition to an exact accessible interface before the concept can be scored.
6. Produce a normal-user sentence that states the pain without Flare, FXRP, FCC, FCE, TEE, or architecture terminology.
7. Explain why the buyer would switch from the current substitute.
8. Reject itself if confidential computation only reproduces ordinary backend privacy or if FXRP is interchangeable with any token.

---

# Gate-Only Source Attribution and Rejection Appendix

**Do not expose this appendix, named sources, collision framing, or its rejection examples to generators until their raw pool is durably frozen.**

## Primary attribution

- Current FXRP activity, wallets, and vault distribution: Flare Foundation ecosystem reports, Flare Explorer, Xaman, D'CENT, and Monarq integration announcements.
- Native FAssets actors, fees, queues, errors, and interfaces: official Flare FAssets overview, minting/redemption guides, troubleshooting, collateral/liquidation docs, `IAssetManager`, `IAssetManagerEvents`, and Contract Registry.
- Smart Account executor flow and recovery: official Smart Accounts overview, custom instruction, `IMasterAccountController`, and TypeScript/Viem guides.
- FCC boundary: official FCC getting-started and signing-extension guides, STP.13, FIP.16, and current Developer Hub status.
- Exchange/custody workflow: XRPL exchange listing, tags, partial payments, public-company filings, and official custody/prime APIs.
- Payment workflow: XRPL Payments Suite and named Ripple payment/customer case studies.

Full citations and evidence are preserved in:

- `research/market-flare-native.md`
- `research/market-broad-users.md`
- `research/market-operator-workflows.md`

## Gate-only hard rejections

- Private native redemption queue, external agent assignment, application-controlled protocol capacity, and alternative default insurance: contradict or duplicate native FAssets behavior.
- Generic Smart Account recovery: native stuck-mint, nonce, fee, pin/unpin, and permissionless-execution paths already exist.
- PMW products: no verified current public third-party builder interface.
- New FXRP solver/relayer/provider market: requires cold-start jobs, inventory, providers, budget, and acquisition.
- Exchange or custodian actions without an authorized sandbox/account: public APIs do not confer customer-ledger or wallet authority.
- Private scoring of public chain/operator data: no natural confidentiality.
- Project-funded reserves or fixture jobs represented as market evidence: demo execution is not demand.
- Payroll, tax, generic commerce, and broad remittance: real markets, but FXRP and FCC are normally bolted on.
- TEE custody/signing by itself: mature MPC, policy-engine, multisig, and maker-checker prior art; buyer access and missing outcome remain unproved.
- Permanent secrecy of Smart Account calldata: call data becomes public on Flare execution.
- Production FCC or global deletion claims from the Coston2 scaffold: current tutorial uses simulated TEE and attestation does not prove absence of copies.
