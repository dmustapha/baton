# Generator C — Interoperable Asset Products

## 1. Exit-Price Range

**Name:** Exit-Price Range

**Problem:** An XRP holder can put newly minted FXRP into concentrated liquidity, but the position's paired asset, fees, and out-of-range inventory make “get my XRP back” a separate, uncertain workflow.

**Market Anchor:** FXRP holders already swap, hold vault-like positions, and exit or redeem; concentrated-liquidity providers already choose price ranges and earn trading fees.

**Named Buyer:** A self-custodied XRP holder who wants to provide concentrated liquidity with a predeclared XRP exit price.

**Existing Workflow:** Mint FXRP, obtain the pool's paired ERC-20, choose an AMM range, mint the non-fungible liquidity position, monitor it, remove liquidity, swap the paired token, and redeem FXRP.

**Current Substitute:** The AMM position UI plus a separate swap UI, manual fee collection, and the FAssets redemption UI.

**Mechanism:** The user chooses an XRP exit price, and the app constructs an FXRP-heavy one-sided or narrow concentrated-liquidity range that naturally converts inventory toward the paired asset as that price is crossed. At exit, the user removes liquidity; the app quotes a user-approved swap of only the paired proceeds back to FXRP, combines them with collected FXRP fees, and starts redemption. The novel loop is **FXRP acquisition → market-making inventory conversion → deterministic unwind back into redeemable FXRP**, so the AMM range doubles as the user's visible exit policy rather than a generic yield position.

**Chain-Native Angle:** FAssets supplies the XRP↔FXRP lifecycle; FDC proves the source payment and eventual agent payment; Contract Registry resolves current FAssets addresses; the AMM's deployed concentrated-liquidity interfaces perform position mint, decrease-liquidity, collect, and swap.

**Sponsor Fit:** Deep FAssets and FDC usage with a simple asset-product experience; no FCC dependency.

**Demo Hook:** In under three minutes, mint FXRP, enter a visibly bounded price range, move the demo pool price across the exit boundary, reveal the changed token composition, unwind, and show the XRP redemption receipt. A minimum-output failure leaves proceeds in the user's wallet instead of swapping.

**Competitor-Derived Insight:** Existing interfaces expose minting, LP management, swaps, and redemption as unrelated endpoints; the useful product is the economic transition connecting the LP's terminal composition to an XRP exit.

**Missing Outcome:** A liquidity position whose range has an understandable XRP-denominated conclusion and a complete self-custodied unwind.

**Multi-Track Architecture (single-track):** Interoperable Asset Products only: FAssets lifecycle plus a deployed concentrated-liquidity AMM; no confidential-compute claim.

**Per-Track Load-Bearing Test:** Remove FAssets and there is no external XRP origin or XRP redemption; remove the concentrated-liquidity state transition and there is no product, only mint-and-redeem routing.

**Proof Path:** XRPL payment hash and payment reference → FDC payment proof → FXRP mint event and owner → AMM position ID, ticks, liquidity, and token balances → decrease/collect events → bounded swap event → FAssets redemption request → FDC-confirmed XRP payment → replayable final receipt. Failure proof shows a rejected stale quote or minimum-output breach without loss of user custody.

**Authority and Integration Map:** The holder signs the XRP payment, approves FXRP and the paired ERC-20, signs the AMM position and unwind calls, approves the final swap, and requests redemption. The FAssets Asset Manager mints/burns; the assigned agent pays redeemed XRP; FDC verifies external payments; the deployed AMM contracts alone change LP state. FXRP, XRP, the paired ERC-20, and the LP NFT are explicitly non-interchangeable and are reconciled separately. Implementation proceeds only against a verified deployed pool and its published interfaces.

**Adaptation Note:** If no suitable live FXRP concentrated-liquidity pool is verified, use a clearly labeled local/testnet pool for AMM mechanics and make no liquidity or production-market claim; the FAssets legs still use live supported interfaces.

## 2. Redeemable Debt Staircase

**Name:** Redeemable Debt Staircase

**Problem:** An FXRP-backed loan has a cliff-like exit: borrowers must source the debt asset, repay, withdraw collateral, then separately determine whether the released FXRP can return to XRP.

**Market Anchor:** FXRP holders already borrow/lend and redeem, while overcollateralized borrowers already make partial repayments to release collateral.

**Named Buyer:** An FXRP holder who wants a stablecoin loan without losing a legible path back to native XRP.

**Existing Workflow:** Mint FXRP, supply it to a lending market, borrow a stablecoin, track health, repay debt, withdraw FXRP, and request redemption.

**Current Substitute:** A lending-market UI, wallet balances, a health-factor display, manual repayment sizing, and a separate FAssets redemption interface.

**Mechanism:** Before borrowing, the user divides the intended loan into redeemable FXRP lots and signs a maximum-debt policy. Each user-triggered stablecoin repayment unlocks the largest safe collateral lot supported by the lending market's live account data; the same session withdraws that exact FXRP lot and offers its native redemption. The loop is **XRP capital → FXRP collateral → stablecoin credit → incremental debt repayment → progressively returned XRP**, turning repayment milestones into observable cross-chain principal releases rather than merely improving a health score.

**Chain-Native Angle:** FAssets and FDC prove the XRP origin and XRP return; Contract Registry resolves FAssets contracts; a verified deployed lending market supplies exact supply, borrow, repay, withdraw, and account-liquidity interfaces.

**Sponsor Fit:** Makes FXRP useful as productive collateral while preserving a verifiable XRP lifecycle and judge-visible application integration.

**Demo Hook:** Mint FXRP, supply it, borrow a small stablecoin amount, repay one step, and reveal the exact FXRP lot released and redeemed to XRP while the remainder stays collateralized. A deliberately oversized release is refused from live lending-state simulation.

**Competitor-Derived Insight:** Debt apps optimize for borrowing power and health; FAssets apps optimize for mint/redeem completion. Neither user experience makes a partial debt payment produce an intelligible unit of returned native principal.

**Missing Outcome:** A loan whose partial repayments translate into verifiable, user-controlled XRP principal releases.

**Multi-Track Architecture (single-track):** Interoperable Asset Products only: FAssets plus one deployed overcollateralized lending market.

**Per-Track Load-Bearing Test:** Without the lending position, no debt staircase exists; without FAssets redemption, a released collateral lot is merely an ERC-20 withdrawal rather than returned XRP principal.

**Proof Path:** XRP transaction → FDC proof → FXRP mint → lending supply and borrow events → before-state debt, collateral, and account liquidity → stablecoin repay event → safe FXRP withdrawal event → redemption request → FDC-proven agent XRP payment → lot-level receipt. Failure proof records the simulated health-factor breach and absence of a withdrawal transaction.

**Authority and Integration Map:** The holder signs XRP mint payment, FXRP approval/supply, stablecoin borrow and repay, FXRP withdrawal, and redemption. The lending contracts calculate debt and authorize collateral withdrawal; the app cannot release collateral itself. FAssets mints/burns, the assigned agent returns XRP, and FDC proves both external legs. XRP, FXRP, the borrowed stablecoin, lending receipt token, and debt balance remain distinct assets/claims. The build must verify a deployed market that explicitly accepts FXRP and exposes published partial repay/withdraw calls.

**Adaptation Note:** If a live FXRP lending market cannot be verified, demonstrate against a labeled local/testnet lending deployment and narrow claims to the transition design; do not imply mainnet liquidity, rates, or protocol endorsement.

## 3. Harvest-to-Home Vault

**Name:** Harvest-to-Home Vault

**Problem:** Vault yield is easy to display, but an XRP holder cannot tell when earned value is sufficient to fund a meaningful return home or exit the position without selling principal unexpectedly.

**Market Anchor:** FXRP holders already deposit in vaults, hold shares, withdraw, and redeem; yield-vault users already harvest or realize underlying gains.

**Named Buyer:** A self-custodied XRP holder who wants an FXRP yield position with principal-preserving, user-triggered XRP withdrawals.

**Existing Workflow:** Mint FXRP, deposit it in an ERC-4626-style vault, monitor share value, redeem shares for FXRP, then separately redeem FXRP to XRP.

**Current Substitute:** Vault APY/share-price screens, manual share redemptions, spreadsheets for principal accounting, and the FAssets redemption UI.

**Mechanism:** At deposit, the app records the user's FXRP principal basis in a proof bundle, not a transferable wrapper. Whenever previewRedeem shows assets above that basis, the user can execute **Harvest Home**: redeem only the share amount corresponding to accrued FXRP above principal, then request native XRP redemption while leaving the principal-denominated shares invested. Full exit redeems every share and returns all available FXRP through FAssets. The loop is **XRP → FXRP vault principal → live share appreciation → yield-only FXRP release → native XRP**, a new cross-chain realization event rather than a portfolio view or receipt product.

**Chain-Native Angle:** FAssets provides the origin and final redemption; FDC proves both XRP payments; Contract Registry avoids stale Asset Manager addresses; a verified ERC-4626-compatible FXRP vault provides deposit, previewRedeem, and redeem.

**Sponsor Fit:** A compact, useful asset product with deep lifecycle proof and a clear first-session reveal: earned vault value becomes native XRP.

**Demo Hook:** Mint and deposit FXRP, induce or wait for test yield, show previewRedeem crossing principal, press Harvest Home, and finish with an XRP payment receipt while the original FXRP-equivalent principal remains represented by vault shares. A no-yield attempt is fail-closed.

**Competitor-Derived Insight:** Vault UIs report nominal yield and redemption previews, but the missing product transition is the realization of yield into the holder's original external-chain asset without silently consuming principal.

**Missing Outcome:** A verifiable answer to “send only what I earned back as XRP, and keep my principal working.”

**Multi-Track Architecture (single-track):** Interoperable Asset Products only: FAssets lifecycle plus one verified FXRP-denominated ERC-4626 vault.

**Per-Track Load-Bearing Test:** Remove the vault and there is no earned-value transition; remove FAssets and Harvest Home ends as an FXRP withdrawal rather than an interoperable asset product.

**Proof Path:** XRPL payment → FDC proof → FXRP mint and owner → vault deposit event, shares, and recorded principal basis → live convertToAssets/previewRedeem → yield-only share redemption → FXRP balance delta → FAssets redemption → FDC-proven XRP payment → receipt showing remaining shares and principal coverage. Failure proof shows zero executable harvest when share value is at or below basis.

**Authority and Integration Map:** The holder signs the XRP payment, FXRP approval/deposit, every yield realization, vault share redemption, and FAssets redemption. The vault contract alone determines share-to-asset conversion; the app's basis record grants no asset rights. FAssets and the assigned agent execute return to XRP; FDC verifies it. XRP, FXRP, vault shares, and accounting basis are never treated as interchangeable. A deposited FXRP vault and published ERC-4626 semantics must be verified before integration claims are made.

**Adaptation Note:** If no suitable deployed FXRP vault exists, use an explicitly labeled test vault with deterministic yield injection; preserve the holder-controlled calls and avoid claims about organic APY or production deposits.

## 4. Pool-to-Premium Cycle

**Name:** Pool-to-Premium Cycle

**Problem:** A collateral-pool provider earns agent fees while bearing agent risk, yet responding to that same agent's liquidation state requires separately finding FXRP capital, deciding whether liquidation is worthwhile, and later unwinding two unrelated positions.

**Market Anchor:** FLR holders already provide agent collateral and earn fee shares; open participants already acquire and burn the required asset to liquidate unhealthy agents for protocol premiums.

**Named Buyer:** An existing FAssets collateral-pool provider who also holds or can mint XRP-backed FXRP.

**Existing Workflow:** Deposit FLR into a chosen agent pool, hold pool tokens, accrue or claim fees, monitor the agent, separately acquire FXRP if liquidation opens, submit the liquidation call, wait through pool-token exit conditions, then redeem unused FXRP.

**Current Substitute:** Raw agent/pool reads, an agent-details screen, independent liquidation scripts, manual profitability calculations, and separate pool exit and FAssets redemption calls.

**Mechanism:** The provider pairs a chosen pool position with a self-custodied FXRP **response lot** acquired from their XRP. If that same agent enters a public liquidatable state, the app calculates the exact protocol premium and presents a user-signed choice: withdraw nothing from the pool, burn some response-lot FXRP in liquidation, receive protocol collateral, and keep unused FXRP redeemable. After the event or at any time without it, the user exits pool tokens under native timelocks and redeems unused FXRP. The loop is **provide agent collateral → earn its fees → use separately owned FXRP to price and optionally liquidate that same risk → exit pool and return unused inventory to XRP**, joining fee income and risk response in one economically closed relationship.

**Chain-Native Angle:** FAssets agent state, collateral pools, liquidation, FXRP mint/redemption, Contract Registry resolution, and FDC payment proof are all load-bearing; no application fabricates liquidation eligibility or premium authority.

**Sponsor Fit:** Deep, auditable use of the FAssets economic system with a concrete product for an already incentivized participant.

**Demo Hook:** Deposit test FLR in an agent pool, mint a small FXRP response lot, show the paired before-state, trigger or select a genuine test liquidatable state, execute a user-approved liquidation, then reveal premium collateral, remaining pool exposure, and redemption of unused FXRP. A healthy-agent attempt produces no liquidation call.

**Competitor-Derived Insight:** Pool provision and liquidation are usually presented as different personas; economically, a provider has the sharpest reason to connect fee earning, observed agent deterioration, optional protocol response, and complete capital exit.

**Missing Outcome:** One holder-controlled cycle that prices both the fee income and actionable downside of supporting a specific agent.

**Multi-Track Architecture (single-track):** Interoperable Asset Products only: the FAssets collateral-pool, liquidation, mint, and redemption lifecycle.

**Per-Track Load-Bearing Test:** Remove the same-agent linkage and it becomes a generic liquidation bot; remove the FXRP mint/redemption legs and it loses the connected-XRP asset lifecycle; remove pool provision and the buyer's fee-versus-risk loop disappears.

**Proof Path:** Pool deposit event and pool-token ownership → XRP payment and FDC mint proof → FXRP response-lot balance → exact agent collateral/liquidation state → user-signed liquidation burn → premium collateral event and before/after solvency → pool fee/exit events under native timelock → unused FXRP redemption request → FDC-confirmed XRP return → combined receipt. Failure proof shows a healthy state or unprofitable quote and no liquidation submission.

**Authority and Integration Map:** The provider signs the FLR pool deposit, claims, pool exit, XRP mint payment, FXRP liquidation approval/call, and unused-FXRP redemption. Public FAssets contracts determine agent status, burn FXRP, pay protocol-defined premiums, and enforce pool timelocks; the app only reads, calculates, and submits holder-approved calls. The assigned agent performs redemption payment and FDC verifies external legs. FLR, XRP, FXRP, pool tokens, fee claims, and liquidation collateral are distinct assets or claims and are never netted as interchangeable. No cooperation from the agent is assumed.

**Adaptation Note:** Use a real testnet agent state and published interfaces; if no liquidatable state is available during judging, replay a previously captured public proof for explanation but label it non-executable, then live-demo the healthy-state refusal, pool actions, and FXRP redemption without claiming a liquidation occurred.
