# Broad XRP/Crypto User Market Evidence

**Research date:** 2026-08-13  
**Purpose:** Market-evidence mining for the Flare Summer Signal warroom. This is not idea generation.

## Evidence standard

This report applies the current warroom Market Reality and End-to-End Operability gates:

- Current primary evidence must show an existing workflow and recurring behavior, not merely an available protocol.
- A named buyer means an existing role that can fund, pay for, or authorize adoption. “Protocol,” “operator,” “provider,” and project-created roles are insufficient without a real-world analogue.
- Economic evidence means transaction volume, assets managed, fees/revenue, paid software, payroll, commerce, or another repeated asset flow.
- Private inputs must already be confidential in the workflow. Public ledger facts cannot be made “private” by copying them into a TEE.
- A callable project token transfer proves only movement of project funds. It does not prove access to an exchange, employer, merchant, custodian, or payment-provider workflow.
- “Natural fit” means FXRP and FCC/FCE are each causally necessary for an evidenced user outcome. “Conditional” means the market is real but additional buyer or workflow evidence is required. “Bolted on” means one or both tracks do not naturally follow from the evidence.

Source hierarchy:

1. Government, regulator, protocol documentation, governance, explorer, or public-company filing.
2. First-party operational data from a payment, custody, payroll, or tax vendor. These figures are useful evidence of behavior but remain self-reported.
3. Vendor surveys and marketing claims only as secondary corroboration, never as the sole market anchor.

## Flare capability and deployment boundary

Market fit must be judged against what is actually available:

- FXRP is not hypothetical. Flare reported roughly $200 million in XRP TVL, 3.4 million-plus FXRP DeFi transactions, and approximately 16,500 users by May 2026. It also reported that more than 85% of circulating FXRP was deployed across DeFi workflows. [Flare: XRPFi's next phase](https://flare.network/news/xrpfis-next-phase), [Flare: activity to value accrual](https://flare.network/news/from-activity-to-value-accrual-our-plan-for-flr)
- The Flare explorer showed about 151.96 million FXRP maximum total supply, 13,138 holders, and 7.7 million transfers when crawled in 2026. These are direct asset-activity signals, though transfers are not the same as unique economic users. [Flare Explorer: FXRP](https://flare-explorer.flare.network/token/0xAd552A648C74D49E10027AB8a618A3ad4901c5bE?tab=holders)
- FAssets provides real mint, redeem, default, queue, and FXRP token interfaces; asset-manager addresses should be resolved through Contract Registry. [Flare FAssets developer guides](https://dev.flare.network/fassets/developer-guides), [Flare redeem guide](https://dev.flare.network/fassets/developer-guides/fassets-redeem)
- FCC was accepted for introduction on Songbird on 2026-07-12. The governance proposal says system applications initially run on Foundation-deployed Google Confidential Compute machines; mechanisms for user-defined applications exist, but user-deployed machines and apps were not utilized at launch. [STP.13](https://proposals.flare.network/STP/STP_13.html)
- Flare's FCC example supports encrypted private parameters, a TEE-signed result, and onchain signature verification, but its Coston2 walkthrough explicitly uses a local simulated TEE unless production deployment is separately completed. [FCC weather-insurance guide](https://dev.flare.network/fcc/guides/weather-insurance-extension)

**Implication:** FXRP has evidenced users and repeated activity. FCC has a credible architecture and developer path, but production/attestation status must be stated exactly. A simulated FCC result cannot be treated as evidence that a broad market already buys verifiable confidential computation.

## Executive market map

| Domain | Existing economic behavior | Named buyer or authorizer | Natural private data | FXRP fit | FCC/FCE fit | Dual-track market verdict |
|---|---|---|---|---|---|---|
| B2B and crypto payments | Very strong: billions in transaction revenue and trillions in stablecoin/crypto infrastructure flows | PSP, fintech payments lead, corporate treasury/finance lead | Counterparty mapping, invoice, routing policy, limits, settlement instructions | Conditional: natural for an XRP-funded payer; otherwise stablecoins/fiat dominate | Conditional-to-natural for private treasury/routing policy, but only with execution authority | **Conditional, not broad by default** |
| Remittance | Very strong: hundreds of billions annually and persistent fees | Licensed MTO/PSP, sender funding own transfer | Sender/recipient identity, purpose, corridor, quote, compliance record | Weak for broad users; recipients typically need fiat or stable value | Natural private data exists, but ordinary regulated processing is the incumbent | **Mostly bolted on unless an XRP-funded MTO workflow is evidenced** |
| Custody and treasury operations | Very strong: hundreds of billions custodied and trillions transferred | Custodian product/security lead, exchange treasury lead, institutional asset owner | Keys, approval graph, limits, allowlists, destinations before broadcast | Conditional on institution actually holding or using FXRP | Strong conceptual fit for attested policy/signing, but incumbent controls already exist | **Promising market, weak one-builder authority** |
| Exchange XRP deposits/withdrawals | Very strong and XRP-specific | Exchange wallet/operations/support lead; customer initiates own transaction | Customer/tag mapping, account balance, withdrawal request, review state | Conditional: direct mint can connect exchange XRP to FXRP, but exchange support is required | Conditional: private account mapping and policy are real, but controlled by the exchange | **Real pain, usually inoperable without exchange access** |
| XRPFi/DeFi | Strong and directly FXRP-native | XRP/FXRP holder funding own position; vault/DeFi product operator | Risk bounds, strategy preference, intended size/route before execution | Strong and natural | Conditional: must control a unique action from genuine private inputs | **Best evidenced FXRP surface; FCC still requires a real private job** |
| Accounting and tax | Strong mandatory workflow plus paid software | Taxpayer, broker compliance lead, crypto-company controller, accountant | Identity/TIN, wallet ownership, basis, classifications, income, books | Weak: FXRP is one more asset to account for, not the reason the job exists | Privacy is natural, but ordinary secure SaaS usually completes the job | **Bolted on for the required dual-track product** |
| Payroll | Strong paid and repeated workflow | Employer CFO/controller/payroll lead; worker opts in | Salary, identity, wallet, tax, benefit split | Weak: first-party evidence says stablecoins/local currency are preferred | Private data is natural, but demand for publicly verified TEE decisions is not evidenced | **Bolted on and competitively saturated** |
| Commerce | Strong repeated payment behavior | Merchant owner/CFO, commerce platform payments lead, PSP | Order/invoice, customer identity, margin, delivery/refund evidence | Weak-to-conditional for merchants serving XRP holders | Conditional only for a real private entitlement or settlement policy | **Broad market, weak FXRP/FCC necessity** |

## 1. B2B and crypto payments

### Market anchor and economic behavior

- Coinbase reported $1.221 trillion in 2025 trading volume, $4.055 billion in transaction revenue, 9.2 million average monthly transacting users, and $376 billion in assets on platform. XRP accounted for 14% of Coinbase spot transaction revenue in 2025, up from 6% in 2024. This is audited/public-filing evidence that people repeatedly pay to transact in crypto and that XRP is commercially material on a major venue. [Coinbase 2025 Form 10-K](https://www.sec.gov/Archives/edgar/data/1679788/000167978826000015/coin-20251231.htm), [Coinbase annual-report metrics](https://www.sec.gov/Archives/edgar/data/1679788/000167978826000047/coinbase2025ars.pdf)
- Fireblocks says it processed over $200 billion in stablecoin transactions per month in 2025 and $6 trillion for the year, with MoneyGram, Zepz/WorldRemit, and Euronet/Ria going live on its infrastructure. This is first-party operational evidence, not an audited market total. [Fireblocks 2025 review](https://www.fireblocks.com/blog/2025-digital-assets-takeaways)
- Ripple identifies banks, fintechs, and crypto businesses as buyers of its B2B cross-border payments product. That proves a named enterprise category and product workflow, but it does not prove those buyers want FXRP or FCC. [Ripple FAQ](https://ripple.com/faq/)

### Named buyers and existing workflow

- **Payment service provider or fintech payments lead:** receives payer instructions, performs account/compliance checks, selects a route, funds liquidity, executes payout, and reconciles settlement.
- **Corporate treasury or finance lead:** authorizes supplier, affiliate, or contractor payment; selects funding account and currency; approves limits; receives settlement confirmation.
- **Current substitutes:** correspondent banking, bank wires, existing stablecoin infrastructure, Ripple Payments, Fireblocks, and exchange/on-ramp settlement.

### Natural confidentiality

Counterparty identity, invoice or payment purpose, bank/wallet mapping, proprietary route, liquidity position, risk limits, and approval chain are naturally non-public before execution. Onchain transaction amount and addresses become public after settlement and cannot be relabeled confidential.

### Authority and distribution

The payer funds and authorizes; its finance team or PSP controls private instructions; the PSP/bank/exchange controls conversion and payout; the recipient receives value. A one-builder product has no authority over these transitions without a cooperating treasury or PSP. Reachable first users are crypto-native small businesses already paying contractors or suppliers, not unspecified “institutions.”

### Fit verdict

- **FXRP:** Conditional. It is natural when an existing payer already holds XRP and wants programmable use or return to XRPL. It is not natural for the broader stablecoin/fiat market.
- **FCC/FCE:** Conditional-to-natural for private routing, limits, or approval logic only when its signed result directly authorizes the payment. Merely hiding an invoice while a normal backend pays is ordinary encryption.
- **Dual-track:** Requires primary evidence from an actual XRP-funded payer or PSP. Broad payment volume alone is insufficient.

## 2. Remittance

### Market anchor and economic behavior

- The World Bank's latest retrospective estimate puts global remittance flows at $856 billion in 2024, with $653 billion going to low- and middle-income countries. It describes millions of migrant workers sending money home every month. [World Bank, July 2026](https://blogs.worldbank.org/en/psd/cutting-the-cost-of-sending-money-home--fast-payment-systems--di)
- The World Bank's Remittance Prices Worldwide database covered hundreds of corridors and reported a 6.36% global average cost in Q3 2025. Digital remittances averaged 4.59%, while Sub-Saharan Africa averaged 8.46%. [World Bank Remittance Prices Worldwide](https://remittanceprices.worldbank.org/), [Q3 2025 report](https://remittanceprices.worldbank.org/sites/default/files/2026-04/RPW_main_report_and_annex_Q325.pdf)
- BIS researchers found that cross-border stablecoin flows had stronger links to remittance costs and transactional needs in emerging markets than Bitcoin or Ether flows. This supports crypto-rail demand, but specifically points toward stablecoins rather than volatile native assets. [BIS Working Paper 1265](https://www.bis.org/publ/work1265.htm)

### Named buyers and existing workflow

- **Sender/migrant worker:** funds a recurring transfer and chooses a service based on cost, speed, trust, and recipient access.
- **Licensed money-transfer operator or payment service provider:** accepts sender funds and identity, quotes fees/FX, screens the transfer, routes liquidity, pays out through bank/mobile-money/cash channels, and handles exceptions.
- **Current substitutes:** banks, MTOs, mobile-money providers, post offices, digital-only MTOs, stablecoin rails, and informal transfers.

### Natural confidentiality

Sender/recipient identity, relationship, purpose, source of funds, recipient bank/mobile account, compliance record, corridor-specific pricing, and internal liquidity routing are naturally private. The fact and amount of a public-chain payment are not private.

### Authority and distribution

The sender funds the transfer; a licensed MTO/PSP controls KYC, conversion, and last-mile payout; the recipient controls receipt. A wallet-only demo cannot prove fiat payout or corridor access. First users are reachable through an existing diaspora group only if a licensed or already-operating payout partner participates.

### Fit verdict

- **FXRP:** Weak for broad remittance. The recipient job is spendable local value with low volatility; the strongest current crypto evidence favors stablecoins. FXRP introduces minting, Flare wallet, price exposure, and off-ramp steps unless both sides already use XRP.
- **FCC/FCE:** Natural private data exists, but banks and MTOs already process it privately. A TEE must create a verifiable outcome unavailable from the incumbent workflow, not merely repeat compliance or routing.
- **Dual-track:** Mostly bolted on without a specific XRP-funded remittance operator, existing corridor, and payout authority.

## 3. Custody and treasury operations

### Market anchor and economic behavior

- Coinbase reported $376 billion in assets on platform at year-end 2025; the metric includes custody, and Coinbase states that institutions pay a separate fee based on assets stored. [Coinbase annual report](https://www.sec.gov/Archives/edgar/data/1679788/000167978826000047/coinbase2025ars.pdf), [Coinbase custody disclosure](https://www.sec.gov/Archives/edgar/data/1679788/000167978826000047/coinbase2025ars.pdf)
- Fireblocks says more than 2,000 businesses used its infrastructure to secure over $10 trillion in digital-asset transactions. Its described workflow includes transaction policies, approvals, allowlists, wallet sweeping, and routing. [Fireblocks product update](https://www.fireblocks.com/blog/fireblocks-security-innovations-digital-asset-infrastructure)
- Fireblocks describes the prior institutional substitute as address whitelisting plus test transfers before settlement. That is direct first-party evidence of repeated manual controls around external transfers. [Fireblocks treasury workflows](https://www.fireblocks.com/blog/accelerate-digital-asset-treasury-operations)

### Named buyers and existing workflow

- **Institutional asset owner/treasury lead:** defines who may move which assets, destination allowlists, limits, and escalation rules.
- **Custodian product or security lead:** operates segregated wallets, cold/warm/hot tiers, policy engines, approvals, signing, monitoring, and business continuity.
- **Exchange treasury/wallet operations lead:** sweeps deposits, replenishes hot wallets, executes withdrawals, and reconciles balances.
- **Current substitutes:** qualified custody, MPC/HSM systems, multisig, cold storage, Fireblocks policy engine, allowlists, test transfers, and manual maker-checker approval.

### Natural confidentiality

Keys, signer topology, approval graph, internal balances, withdrawal queues, emergency rules, future destinations, and transaction intent before broadcast are naturally private and security-sensitive.

### Authority and distribution

The asset-owning institution funds and sets policy; custodian/security staff control keys and approval systems; the custodian or exchange signs; recipients receive transfers. These buyers are real but hard for one builder to access. A project contract cannot claim custody authority over third-party assets.

### Fit verdict

- **FXRP:** Conditional on evidenced custody or treasury use of FXRP. General crypto custody scale does not prove FXRP demand.
- **FCC/FCE:** Strong conceptual fit for attested policy execution or signing because secrets and rules are naturally private. However, mature substitutes already provide MPC, policy engines, and approval controls, so “TEE custody” alone is not a missing job.
- **Dual-track:** Market-real but operationally difficult for a one-builder hackathon unless the user is a self-controlled treasury with real FXRP and an explicit private policy.

## 4. Exchange XRP deposits and withdrawals

### Market anchor and economic behavior

- Coinbase's 2025 filing gives the clearest scale signal: 9.2 million average monthly transacting users, $1.221 trillion trading volume, $4.055 billion transaction revenue, and XRP generating 14% of spot transaction revenue. [Coinbase 2025 Form 10-K](https://www.sec.gov/Archives/edgar/data/1679788/000167978826000015/coin-20251231.htm)
- XRPL's exchange integration guide describes the actual operating workflow: users deposit XRP with destination tags; exchanges credit off-ledger balances, rebalance cold/warm/hot wallets, debit withdrawals, and submit XRP payments from hot wallets. [XRPL: list XRP as an exchange](https://xrpl.org/docs/use-cases/defi/list-xrp-as-an-exchange)
- XRPL documentation states that a missing or wrong destination tag may require manual investigation and customer discussion; `RequireDest` prevents missing tags but cannot validate whether a supplied tag is correct. [XRPL source and destination tags](https://xrpl.org/docs/concepts/transactions/source-and-destination-tags), [XRPL require-destination-tag guide](https://xrpl.org/es-es/docs/tutorials/compliance-features/require-destination-tags)
- Coinbase's help center confirms that XRP deposits require the correct numeric destination tag. [Coinbase destination tag FAQ](https://help.coinbase.com/en/coinbase/trading-and-funding/sending-or-receiving-cryptocurrency/destination-tag-memo-faq)

### Named buyers and existing workflow

- **Exchange wallet/operations lead:** maintains hot/warm/cold accounts, detects deposits, maps tags to customers, credits off-ledger balances, and executes withdrawals.
- **Exchange support lead:** investigates deposits with wrong tags and reconciles customer ownership.
- **Exchange customer:** initiates deposit or withdrawal and bears delay/loss risk from incorrect address/tag data.
- **Current substitutes:** `RequireDest`, X-addresses, support tickets, manual proof of ownership, test transactions, whitelists, and centralized balance reconciliation.

### Natural confidentiality

The mapping between destination tag and customer account, exchange off-ledger balance, identity/KYC record, withdrawal destination before broadcast, support evidence, and risk-review state are private. The XRPL address, tag, amount, and transaction are public once submitted.

### Authority and distribution

The customer controls the source transfer; only the exchange can credit its internal ledger or sign from its hot wallet. A public XRPL proof cannot force an exchange credit. A one-builder product needs exchange cooperation for the decisive state transition.

### Fit verdict

- **FXRP:** Conditional. FAssets v1.3 direct minting via XRPL destination tags creates a real route from exchange withdrawals to FXRP, and Flare says it is intended to support exchange integrations. That does not mean any particular exchange currently exposes the integration. [Flare: XRPFi's next phase](https://flare.network/news/xrpfis-next-phase)
- **FCC/FCE:** The off-ledger customer/tag mapping and withdrawal policy are naturally private, but controlled by the exchange. A third-party FCC app cannot invent access or authority.
- **Dual-track:** Strong user pain and XRP behavior, weak hackathon operability without a cooperating exchange or a wholly user-controlled transition.

## 5. XRPFi and DeFi use

### Market anchor and economic behavior

- Flare reported approximately $200 million in XRP TVL, 3.4 million-plus FXRP DeFi transactions across about 16,500 users, and more than 85% of FXRP deployed across lending, vaults, staking, yield trading, and related workflows. [Flare: XRPFi's next phase](https://flare.network/news/xrpfis-next-phase), [Flare: activity to value accrual](https://flare.network/news/from-activity-to-value-accrual-our-plan-for-flr)
- Flare allocated 2.2 billion FLR to its FAssets incentive program from July 2025 through July 2026 across DEX liquidity, lending, CDPs, and yield derivatives. This proves funded ecosystem behavior but also warns that some activity may be incentive-sensitive. [FAssets Incentive Program](https://flare.network/news/fassets-incentive-program)
- XRPL's native AMM supports deposits, withdrawals, LP tokens, fee voting, and auction-slot bids. The protocol is live, although documentation alone does not quantify current users or volume. [XRPL AMM overview](https://xrpl.org/docs/concepts/tokens/decentralized-exchange/automated-market-makers), [XRPL AMM integration](https://xrpl.org/blog/2024/deep-dive-into-amm-integration)

### Named buyers and existing workflow

- **XRP/FXRP holder:** mints or acquires FXRP, approves a protocol, deposits into a vault/lending/LP position, monitors risk and yield, claims, withdraws, or redeems to XRP.
- **Vault or DeFi protocol operator:** defines strategy/capacity, operates contracts and front end, and attracts deposits.
- **Liquidity provider:** supplies assets, receives LP/vault shares, earns fees/rewards, and bears market, smart-contract, and liquidity risk.
- **Current substitutes:** holding XRP idle, centralized earn products, XRPL AMMs/DEX, existing Flare vaults/lending/staking, and manual strategy switching.

### Natural confidentiality

Personal risk limits, desired exit threshold, full portfolio, intended trade size/route before execution, tax lot, or proprietary operator strategy may be private. Current positions and executed EVM transactions are generally public. “Hide my public balance” is not a valid private input.

### Authority and distribution

The holder can fund and authorize a self-custodial position; protocol contracts execute; the same holder receives shares/yield/withdrawal. This is the cleanest one-builder authority chain. Existing Xaman/Flare and XRPFi communities provide reachable users, though production vault or protocol integration still needs an exact callable interface.

### Fit verdict

- **FXRP:** Strong and natural. It is the evidenced asset being deployed.
- **FCC/FCE:** Conditional. It becomes natural only if a private preference, policy, or strategy calculation produces a signed result that necessarily controls deposit, allocation, unwind, or another unique asset consequence. Private computation beside an ordinary vault deposit is cosmetic.
- **Dual-track:** This is the strongest evidence-backed surface, but the confidential job must be independently demonstrated rather than inferred from the existence of transparent DeFi.

## 6. Accounting and tax

### Market anchor and economic behavior

- IRS rules require taxpayers to report digital-asset income, gains, and losses; brokers began gross-proceeds reporting on Form 1099-DA for transactions from 2025, with basis reporting phased in from 2026. Taxpayers must keep records of receipts, sales, exchanges, dispositions, transfers, and fair market value. [IRS digital assets](https://www.irs.gov/filing/digital-assets), [IRS 1099-DA guide](https://www.irs.gov/businesses/understanding-your-form-1099-da), [IRS digital-asset FAQ](https://www.irs.gov/individuals/international-taxpayers/frequently-asked-questions-on-digital-asset-transactions)
- CoinTracker sells annual plans based on transaction count and lists a $350/month enterprise Starter plan for 1,000 transactions, with larger custom plans supporting more than one million transactions. [CoinTracker personal pricing](https://support.cointracker.io/hc/en-us/articles/4413049695249-CoinTracker-Personal-plan-pricing), [CoinTracker enterprise pricing](https://support.cointracker.io/hc/en-us/articles/29048156908305-CoinTracker-Enterprise-plan-pricing)
- Koinly requires paid plans to generate reports and prices tiers by yearly and account-wide transaction count. It explicitly serves individuals, businesses, and accountants; business accounts sync to QuickBooks and Xero. [Koinly pricing model](https://support.koinly.io/en/articles/9489958-how-pricing-works-in-koinly), [Koinly account types](https://support.koinly.io/en/articles/10915763-koinly-account-types)

### Named buyers and existing workflow

- **Individual taxpayer/active trader:** imports wallets/exchanges, reconciles transfers, labels transactions, computes basis/gain/income, and files tax forms.
- **Crypto-company controller or finance lead:** reconciles ledgers and wallets, maps transactions to accounts, closes books, and supplies auditors/tax preparers.
- **Digital-asset broker compliance lead:** captures proceeds/basis and produces 1099-DA statements.
- **Accountant/tax preparer:** receives client records, corrects classifications, and produces filings.
- **Current substitutes:** spreadsheets, exchange CSV/API exports, CoinTracker, Koinly, QuickBooks/Xero integrations, accountants, and broker statements.

### Natural confidentiality

TIN and legal identity, wallet ownership map, complete portfolio, basis, gains/losses, income, business books, invoices, and transaction classifications are naturally private.

### Authority and distribution

Taxpayers and businesses control their records and can pay for software; brokers control 1099-DA data; accountants receive delegated access. The economic action is filing/report production, not movement of FXRP on Flare.

### Fit verdict

- **FXRP:** Weak. FXRP creates taxable/accounting records, but so does every digital asset. Removing FXRP leaves the same product and buyer job intact.
- **FCC/FCE:** Privacy is natural, but conventional encrypted SaaS already computes reports. Publicly verified TEE output is not required by the evidenced buyer workflow unless a separate relying party demands it.
- **Dual-track:** Bolted on. This market should be rejected for a mandatory Interoperable Asset plus Confidential Compute product unless a distinct FXRP lifecycle consequence is independently evidenced.

## 7. Payroll

### Market anchor and economic behavior

- Bitwage reports more than $400 million processed in crypto/stablecoin payroll, over 90,000 registered workers, and 4,500 companies across more than 100 countries. These are first-party, self-reported figures. [Bitwage stablecoin payroll](https://bitwage.com/en-us/blog/maximizing-efficiency-with-stablecoin-payroll)
- Its documented workflow connects to 23 payroll providers, pulls post-tax employee deductions/preferences, creates recurring payroll, and sends selected fiat or crypto to workers. [Bitwage payroll integrations](https://bitwage.com/en-us/blog/bitwage-launches-crypto-payroll-integrations-with-payroll-providers)
- Bitwage says stablecoins became the preferred method for companies with global workers and that employees choose among local fiat, BTC/ETH, and stablecoins. This is direct evidence against assuming broad payroll demand for FXRP. [Bitwage ten-year review](https://bitwage.com/en-us/blog/bitwage-revolutionizing-the-world-of-remote-work-for-over-10-years), [Bitwage emerging-market payroll](https://bitwage.com/en-us/blog/how-crypto-payroll-increases-financial-inclusion-for-workers-in-emerging-markets)

### Named buyers and existing workflow

- **Employer CFO/controller/payroll lead:** approves payroll, funds the run, supplies post-tax net-pay data, and reconciles payments.
- **Worker or contractor:** opts into a crypto/local-currency split and supplies destination details.
- **Payroll provider:** integrates HR/payroll records, converts funds, executes payouts, produces payslips, and handles tax/compliance obligations.
- **Current substitutes:** bank payroll, international wires, EOR/payroll platforms, Bitwage, stablecoin payroll, and contractor invoicing.

### Natural confidentiality

Salary, employee identity, tax status, benefits/deductions, wallet mapping, employment terms, and exception reasons are naturally private.

### Authority and distribution

The employer funds payroll and controls the employee file; the payroll provider controls conversion and payout; the employee controls destination and receipt. A project contract has no authority over an employer's payroll file without a pilot employer.

### Fit verdict

- **FXRP:** Weak for the broad market. Existing evidence favors fiat and stablecoins; paying volatile FXRP adds employee and accounting friction unless workers explicitly request XRP exposure.
- **FCC/FCE:** Confidential data is real, but payroll systems already keep it private. Verifiable TEE execution must resolve a buyer-recognized trust problem, not merely conceal salaries.
- **Dual-track:** Bolted on without a real employer already paying XRP/FXRP and demanding verifiable confidential execution. The active hackathon brief also classifies simple FXRP payroll as saturated.

## 8. Commerce

### Market anchor and economic behavior

- BitPay says it processed more than 600,000 crypto transactions in 2024 across categories including hosting, precious metals, luxury goods, automotive, gift cards, and bill pay. [BitPay 2024 review](https://www.bitpay.com/blog/2024-year-in-review)
- For 2025 BitPay reports 12% payment-volume growth, an $800 average payment, stablecoins at 40% of total payment volume, and an average stablecoin payment of $3,555. These are first-party operational claims. [BitPay Decrypted 2025](https://www.bitpay.com/decrypted/2025?redirected=1)
- BitPay's customer workflow covers merchant checkout, invoices, wallet payment, bill pay, gift cards, and direct peer-to-peer payment. [BitPay payment guide](https://www.bitpay.com/blog/how-to-pay-with-crypto)

### Named buyers and existing workflow

- **Merchant owner/CFO or commerce payments lead:** issues invoice/checkout request, chooses accepted assets, prices goods, receives settlement, reconciles order, and handles refund/dispute.
- **Payment processor/PSP:** quotes payment, monitors chain confirmation, converts or settles, and provides merchant reporting.
- **Customer:** selects wallet/asset, pays invoice, and receives goods/service or refund.
- **Current substitutes:** cards, ACH/bank transfer, cash, BitPay and other processors, stablecoin checkout, gift cards, and direct wallet payments.

### Natural confidentiality

Order contents, invoice/customer mapping, delivery address, identity, merchant margin, discount, refund evidence, and internal fraud/risk policy are private. Public wallet transfers and amounts are not.

### Authority and distribution

The customer funds; merchant sets commercial terms; PSP controls conversion/settlement when used; merchant or processor authorizes refunds. A builder can reach small crypto-friendly merchants, but cannot claim processor conversion or fiat settlement without an actual integration.

### Fit verdict

- **FXRP:** Weak-to-conditional. It may suit a merchant already serving XRP holders, but the strongest current commerce signal is stablecoin growth. Generic merchant checkout works without FXRP.
- **FCC/FCE:** Conditional only where a naturally private order, delivery, entitlement, or refund fact must cause settlement. Hiding checkout metadata without a distinct verified action is ordinary backend privacy.
- **Dual-track:** Broad commerce demand is real; the required FXRP-plus-FCC mechanism is not evidenced by that demand alone.

## Cross-domain conclusions

### Strong market reality, weak dual-track necessity

- Remittance, payroll, commerce, and accounting/tax have named buyers, repeated flows, paid substitutes, and naturally private data.
- Their current workflows predominantly settle in fiat or stablecoins and already use private databases. FXRP and publicly verified FCC results do not follow naturally from the job.
- These domains must not be admitted merely because “money moves” and “some fields are private.” Both removal tests would usually fail.

### Strongest evidenced FXRP demand

- XRPFi/DeFi is the only broad domain in this review with direct, current evidence of millions of FXRP transactions, substantial deployed value, and users who can authorize their own asset transitions.
- Exchange deposits/withdrawals are strongly XRP-native and have a documented wrong-tag/manual-support edge, but the exchange controls the decisive off-ledger credit and hot-wallet transitions.
- Custody/treasury has naturally confidential policy and signing data, but a general crypto-custody market does not establish FXRP adoption or give a builder institutional execution authority.

### FCC market caution

- Natural confidentiality is necessary but not sufficient. Payroll salaries, tax records, invoices, and exchange account mappings are already private in ordinary systems.
- FCC becomes load-bearing only when an identified buyer needs an attested private computation and its signed minimum result necessarily controls a real asset action.
- FCC deployment remains operationally young. Songbird introduction is real; Coston2 simulated-TEE demos must be labeled as simulations, and no claim of broad production FCC adoption is currently supported.

## Explicit rejections: abstract, deep-niche, or fictional workflows

The following workflow claims fail this evidence review and must not be used as market anchors without new primary evidence:

1. **A generic “XRP user” buys confidential compute.** No broad-user source shows demand for TEE attestations as a standalone product.
2. **Public FAssets failure/default events become a private concierge queue.** Public protocol facts are not a natural private dataset, and native protocol handling is the current substitute.
3. **An unnamed FAsset “operator” privately batches exceptions for users.** No buyer, fee flow, authority, or repeated private input source is evidenced by the broad-market sources.
4. **An exchange will let a third-party app credit deposits or approve withdrawals.** Only the exchange controls its off-ledger ledger and hot wallet; a chain proof cannot substitute for integration authority.
5. **A merchant needs confidential settlement merely because order data is private.** Existing PSPs already keep order data private; a verified confidential result needs a distinct, evidenced settlement job.
6. **An employer wants public proof of a private payroll calculation.** Payroll volume and salary confidentiality are real, but demand for onchain verification is not established.
7. **Taxpayers want tax computation to move FXRP.** Tax/accounting users buy reports and reconciliation; the evidenced workflow does not require an interoperable-asset transition.
8. **Custody demand means a new TEE signer has buyers.** Institutions already purchase MPC, custody, policy engines, multisig, and maker-checker workflows; buyer access and a missing outcome must be shown.
9. **Private portfolio preferences alone justify FCC.** A hidden preference that does not uniquely alter deposit, allocation, unwind, or settlement is a cosmetic settings screen.
10. **Remittance volume proves XRP/FXRP demand.** Current evidence proves remittance demand and stablecoin relevance, not a recipient desire for volatile FXRP or a Flare wallet.
11. **A project-funded reserve proves commercial demand.** Moving project-owned FXRP demonstrates a token transfer, not an existing payer, insurance pool, merchant reserve, employer payroll, or exchange obligation.
12. **Destination-tag mistakes are freely correctable onchain.** XRPL documentation says wrong tags require off-ledger customer support; only the receiving business can credit its internal customer account.

## Gate-ready evidence summary

| Domain | Market Reality | Natural privacy | Reachable first users | End-to-end authority for one builder | Required-track fit |
|---|:---:|:---:|:---:|:---:|---|
| B2B/crypto payments | Strong | Strong | Medium among crypto-native SMEs | Medium only with a pilot payer | Conditional |
| Remittance | Strong | Strong | Medium via diaspora channels | Low without licensed payout partner | Mostly bolt-on |
| Custody/treasury | Strong | Strong | Low for institutions; medium for self-treasury | Low institutionally | Conditional |
| Exchange deposits/withdrawals | Strong | Strong off-ledger | Medium for affected users | Low without exchange | Conditional but blocked by authority |
| XRPFi/DeFi | Strong | Conditional by use case | Strong in existing XRPFi channels | High for holder-controlled flows | Strong FXRP, conditional FCC |
| Accounting/tax | Strong | Strong | Strong | High for report generation, low for asset consequence | Bolted on |
| Payroll | Strong | Strong | Medium with a real employer | Low without employer/payroll integration | Bolted on |
| Commerce | Strong | Strong | Medium among crypto merchants | Medium for direct checkout; low for processor settlement | Weak-to-conditional |

**Bottom line:** the broad-market search does not justify forcing both tracks into every financially active domain. XRPFi supplies the clearest current FXRP buyer behavior and self-authorized asset flow. Payments, exchange operations, and custody contain genuinely private operational data, but require an evidenced cooperating buyer and exact authority chain. Remittance, payroll, commerce, and tax are real markets yet default to sponsor bolt-ons unless new primary evidence proves an XRP/FXRP-specific workflow whose outcome fails without verified confidential computation.
