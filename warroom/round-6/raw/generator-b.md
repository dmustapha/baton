**Name:** StrikeSlices

**Problem:** A permissionless liquidator must keep enough FXRP idle to capture a premium, yet one all-or-nothing liquidation can strand too much capital or miss a smaller profitable action.

**Market Anchor:** Liquidators already acquire and burn the required asset through public liquidation calls for explicit protocol premiums, while bearing timing, capital-preparation, and profitability risk.

**Named Buyer:** A permissionless FAssets liquidator using their own FXRP.

**Existing Workflow:** The liquidator reads public agent health, acquires FXRP, submits a public liquidation call when eligible, and reconciles the premium against capital and execution cost.

**Current Substitute:** Custom bots, raw events, FDC tooling, manual contract calls, and keeping an undifferentiated FXRP balance ready.

**Mechanism:** The liquidator escrows FXRP into independently expiring strike slices; any public caller may deploy the smallest profitable slice into an eligible native liquidation, and the realized premium is split by `capital owner share = premium × lockedSeconds / (lockedSeconds + activationDelay)`, with the remainder paying the caller and every unused slice returning at expiry.

**Chain-Native Angle:** The payoff exists only because FAssets exposes public liquidation, requires the asset to be burned, and pays a native liquidation premium against agent collateral state.

**Sponsor Fit:** FAssets is load-bearing for eligibility, FXRP burn, and realized premium; Asset Manager addresses are resolved through Contract Registry rather than hardcoded.

**Demo Hook:** Three visibly different FXRP slices count down; one agent becomes liquidatable, a second wallet fires only the matching slice, and the screen reveals the exact premium split while the other two slices unlock untouched.

**Competitor-Derived Insight:** Existing products and operators prove public state-to-liquidation execution, but the safe opportunity map identifies prepared capital and exact profitability as unfinished participant outcomes.

**Missing Outcome:** A liquidator can price the opportunity cost of each unit of idle FXRP separately and prove realized return per locked second instead of treating all standby capital alike.

**Multi-Track Architecture (single-track contract):** Interoperable Asset Products only: expiring FXRP strike slices feed a real FAssets liquidation and settle the native premium.

**Per-Track Load-Bearing Test:** Remove the FAssets liquidation and its FXRP burn/premium result, and the slices have neither an executable trigger nor revenue to divide; the product collapses into inert escrow.

**Proof Path:** Public agent state and resolved Asset Manager address → liquidator escrows holder-owned FXRP slices → public caller selects an eligible slice → contract calls the native liquidation interface → FXRP is consumed and native result emitted → contract records returned value and distributes the measured premium → expiry refunds every unused slice; a failed or ineligible call leaves slice ownership unchanged.

**Authority and Integration Map:** Slice creation → FXRP owner → ERC-20 approval/deposit on Flare → live holder-controlled state → deposit receipt; liquidation → any eligible participant through the slice contract → resolved public Asset Manager liquidation interface on Flare → live public transition → native event/transaction receipt; split → slice contract over value actually returned to project-controlled accounting → Flare → live → per-slice payout event; expiry refund → slice owner → public expiry withdrawal → Flare → live → balance delta and receipt. The demo never claims authority over agent operations.

**Adaptation Note:** Participant economics — separate prepared capital into measurable earning units → adapted into expiring strike slices whose native premium split prices lock duration and activation delay. CROSS: forced expiry and reauthorization → liquidation capital, so stale capital cannot remain silently committed. Self-rejected variants included monitoring bots, generic liquidation alerts, and an unsupported agent-coordination scheme.

---

**Name:** PremiumBurnback

**Problem:** A liquidator who wins one premium still has to decide how much of that gain to recycle into the next burn, so repeated opportunities alternate between overexposure and capital starvation.

**Market Anchor:** Permissionless liquidators already spend FXRP in public FAssets liquidations and receive explicit premiums, creating a repeated realized capital cycle rather than a hypothetical yield forecast.

**Named Buyer:** A technically capable permissionless FAssets liquidator controlling the FXRP and every cycle decision.

**Existing Workflow:** The liquidator prepares FXRP, performs a qualifying liquidation, calculates net proceeds, and manually chooses whether to replenish liquidation inventory.

**Current Substitute:** Spreadsheets, treasury scripts, raw contract reads, custom bots, and manually rebuilding an FXRP inventory after each action.

**Mechanism:** Each successful liquidation mints no derivative claim; its actual premium is divided by a user-set burnback curve: `nextReserve = min(principalCap, realizedPremium × consecutiveWins / (consecutiveWins + 1))`, while any failure or expired opportunity resets consecutive wins and makes the full reserve immediately withdrawable before the user reauthorizes another native burn.

**Chain-Native Angle:** The measurable input is a real FAssets liquidation premium produced by burning FXRP against unhealthy agent collateral; without that cross-chain asset lifecycle there is no burnback cycle.

**Sponsor Fit:** FAssets supplies the public liquidation transition and premium; Contract Registry supplies the current Asset Manager address, avoiding stale protocol routing.

**Demo Hook:** Two successful native liquidations make the next-reserve arc grow from one-half to two-thirds of realized premium; a deliberately failed third attempt snaps the arc to zero and returns the reserve to the holder.

**Competitor-Derived Insight:** The corpus proves closed-loop protocol action and judge-visible receipts, while the opportunity map leaves after-action accounting and capital preparation unresolved for paid participants.

**Missing Outcome:** Turn a sequence of realized premiums into a self-limiting capital-growth rule whose exposure, gain, and reset are visible after every native action.

**Multi-Track Architecture (single-track contract):** Interoperable Asset Products only: successive FAssets liquidation receipts drive a holder-selected FXRP reserve curve and explicit reauthorization boundary.

**Per-Track Load-Bearing Test:** Remove native FAssets liquidations and their realized premiums, and neither the win counter nor reserve formula has an honest input or economic output; a generic token loop would not be the product.

**Proof Path:** Holder deposits a capped FXRP amount → public eligible liquidation call executes against the Registry-resolved Asset Manager → native event and balance deltas establish principal consumed and value returned → actual premium updates the burnback reserve → holder withdraws surplus or explicitly authorizes the next cycle; revert, expiry, or zero premium resets and unlocks rather than silently retrying.

**Authority and Integration Map:** Capital cap/curve → FXRP holder → signed project-contract configuration on Flare → live holder-controlled state → event; liquidation → holder or any public caller → public Asset Manager interface on Flare → live → native receipt; premium accounting → project contract uses only transaction balance deltas/native result under its custody → live → cycle event; reauthorization/withdrawal → holder → public project call → live → FXRP balance receipt. No agent signing, assignment change, or offchain XRP control is asserted.

**Adaptation Note:** Before-and-after solvency or ownership proof — make each economic cycle auditable → adapted into before/after FXRP capital and realized-premium receipts. CROSS: progressive exposure plus forced reauthorization → repeated liquidation, yielding a nonlinear burnback curve rather than autocompounding, monitoring, or passive custody. Self-rejected variants included fixed-percentage reinvestment and generic yield compounding as familiar mechanisms.

---

**Name:** ProofDividend

**Problem:** A challenger can assemble valid cross-chain evidence yet still bear the entire delay and execution cost before knowing whether the public challenge will earn a reward.

**Market Anchor:** FAssets challengers already submit proof of invalid or double underlying payments through public interfaces for explicit protocol rewards, while cross-chain evidence assembly, timing, false-positive risk, and proof-to-reward accounting remain costly.

**Named Buyer:** A permissionless FAssets challenger controlling a candidate FDC proof; the execution-capital role is also open to any public participant.

**Existing Workflow:** The challenger finds suspect underlying-chain behavior, assembles the supported proof, calls the public challenge interface, and reconciles the protocol reward or failed transaction alone.

**Current Substitute:** Custom bots, raw events, FDC tooling, manual calls, and one challenger funding the full proof-to-reward path.

**Mechanism:** A challenger seals a proof hash with a self-funded deductible and reveals the proof before expiry; a public executor may fund and submit the exact challenge, then an actual native reward flows through a time-weighted waterfall—first reimbursing execution cost up to a declared cap, then paying `evidenceDividend = residualReward × remainingRevealWindow / totalRevealWindow`, with the rest to the executor; no reward means no dividend, and an unrevealed deductible becomes the executor bounty.

**Chain-Native Angle:** FDC-backed evidence and the public FAssets challenge/reward transition are the revenue source and truth boundary; the waterfall cannot settle from a project verdict.

**Sponsor Fit:** FDC supplies supported external-chain evidence, FAssets supplies the permissionless challenge and native reward, and Contract Registry resolves the relevant live protocol address.

**Demo Hook:** Wallet A commits a proof hash and deductible, Wallet B advances execution capital, the FDC proof is revealed into a successful native challenge, and one reward visibly waterfalls into cost reimbursement, evidence dividend, and executor residual; an expired twin commitment pays only its posted deductible.

**Competitor-Derived Insight:** Portable proof bundles and closed-loop diagnosis-to-action are demonstrated strengths, but the safe maps identify proof assembly, false-positive exposure, capital preparation, and after-action reward accounting as an unserved edge state.

**Missing Outcome:** Give evidence work a measurable share of a reward that exists only after a successful native challenge, without inventing a protocol bounty or trusting a private judge.

**Multi-Track Architecture (single-track contract):** Interoperable Asset Products only: an FDC proof drives a public FAssets challenge, and the resulting native reward funds the evidence/execution dividend waterfall.

**Per-Track Load-Bearing Test:** Remove FDC-backed challenge evidence or the FAssets reward transition and the committed hash cannot produce verifiable revenue; the waterfall becomes an unfunded promise and the product fails.

**Proof Path:** Public underlying-chain candidate → challenger commits proof hash plus deductible → supported FDC proof becomes available → challenger reveals → public executor submits the native challenge through the resolved interface → challenge receipt and actual returned reward settle reimbursement/dividend/residual → invalid call preserves protocol state and expiry handles only the challenger-posted deductible.

**Authority and Integration Map:** Commit/reveal → challenger → public project contract on Flare with challenger-owned deductible → live → events; proof acquisition → challenger/public FDC workflow → supported external-chain attestation into Flare → live where available, with proof timing shown → verifier receipt; challenge → any eligible executor → public FAssets challenge interface at Registry-resolved address → live → native transaction/event; waterfall → project contract over only reward it actually receives and posted deductible → live → payout events. It never labels project escrow as a protocol reward.

**Adaptation Note:** Portable proof bundles — preserve evidence from source to consequence → adapted into a proof hash that earns only from a successful native challenge. CROSS: live performance receipts plus forced expiry → participant reward allocation, creating a reveal-time dividend and deductible-funded expiry consequence. Self-rejected variants included proof monitoring, a generic bounty board, fabricated proof buyers, and project-decided challenge validity.

---

**Name:** SalvageSlope

**Problem:** A Smart Account operation can stall after the XRP holder has authorized it because the first executor has too little incentive to finish—or too much fee—while recovery becomes more urgent over time.

**Market Anchor:** XRP holders already encode Smart Account instructions, pay executor fees, obtain FDC proof, mint FXRP, and execute a Flare action; current pain includes insufficient executor fees, nonce conflicts, delayed execution, failed target calls, and confusing recovery.

**Named Buyer:** An XRP holder authorizing a Smart Account operation; any existing or self-hosted permissionless executor may compete to complete it.

**Existing Workflow:** The holder commits the cross-chain instruction and executor fee, an executor relays the proof-backed operation, and the controller/Personal Account performs the committed Flare call or exposes a native recovery state.

**Current Substitute:** Official guides, backend preflight, operator monitoring, native recovery opcodes, and eventual permissionless execution at a fixed precommitted fee.

**Mechanism:** The holder commits one capped fee that follows a salvage slope: an early executor earns a small base fee, the claimable fee rises each block of unresolved delay, and any executor choosing an attempt window posts a short-lived bond; successful committed execution returns the bond plus the current fee, while an expired attempt sends only that executor-posted bond into the next executor's fee and never alters the holder's native recovery rights.

**Chain-Native Angle:** The timed competition resolves a proof-backed XRPL-authorized Smart Account instruction whose controller, Personal Account, FDC proof, executor, and recovery states are specific to the Flare asset path.

**Sponsor Fit:** Flare Smart Accounts are the committed execution and recovery state machine; FDC proves the XRP instruction; FAssets/FXRP provide the real acquired asset and downstream action.

**Demo Hook:** An XRP instruction lands, Executor A reserves a cheap window and lets it expire, Executor B sees the slope jump by A's forfeited bond, executes the committed FXRP action, and receives the exact fee while the Personal Account receipt proves final ownership.

**Competitor-Derived Insight:** Existing flows prove holder-authorized cross-chain execution and eventual permissionless completion, but one trustworthy transition from delayed proof to economically motivated salvage remains missing.

**Missing Outcome:** Price urgency without surrendering holder control: the fee grows only while the exact authorized operation remains unresolved, and failed executors—not the holder—finance the salvage premium.

**Multi-Track Architecture (single-track contract):** Interoperable Asset Products only: the salvage slope surrounds one XRPL-authorized Smart Account route from XRP instruction through FXRP acquisition to a committed Flare asset action.

**Per-Track Load-Bearing Test:** Remove Smart Account authorization/FDC proof and the fee slope is merely a keeper auction with no interoperable asset obligation; remove the final FXRP action and there is no useful completion receipt.

**Proof Path:** Holder signs and sends the exact XRPL instruction with capped fee terms → FDC proves it → public executor posts a bounded attempt bond → controller/Personal Account executes the committed mint-and-action path → final FXRP owner/application state and executor payout appear in one receipt; expiry forfeits only executor-posted capital, and unresolved holder assets retain the documented native recovery path.

**Authority and Integration Map:** Instruction → XRP owner → owner-signed XRPL payment/memo → live holder-controlled source transition → source transaction; attestation → public executor/FDC → supported proof into Flare → live with visible delay → proof receipt; attempt bond → any executor → public salvage contract on Flare → live → reservation event; committed action → controller/Personal Account under the owner's instruction via published Smart Account interfaces → live or honestly bounded testnet route → final call/event; payout → salvage contract over holder-capped fee plus expired executor bonds → Flare → live → payout receipt; native recovery remains solely with the authorized holder/controller path.

**Adaptation Note:** Participant economics — make the executor's fee and capital cost the measurable outcome → adapted into a delay-rising salvage slope funded partly by failed executors. CROSS: first-session countdown/reveal/consequence plus forced expiry → cross-chain execution, so each attempt window produces either completed asset ownership or a precisely bounded capital consequence. Self-rejected variants included executor monitoring bots, fixed fee bumping, preflight-only UX, and any claim that the project can override native nonce or recovery authority.
