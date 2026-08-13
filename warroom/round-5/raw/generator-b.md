# Generator B — Interoperable Asset Products

## 1. Redemption Conservator

Name: Redemption Conservator

Problem: An FXRP redeemer can burn the asset, wait for an assigned XRP payment, and still be left manually deciding whether the request is merely late, provably unpaid, or ready for native default compensation.

Market Anchor: FAssets redeemers already pay redemption fees, wait for an assigned agent payment on XRPL, and may need to invoke the protocol's default path when that payment misses its deadline.

Named Buyer: A self-custodied FXRP holder redeeming to an XRP address; the holder controls the FXRP burn, names the XRP destination, and is the affected redeemer when payment fails.

Existing Workflow: The holder submits a native redemption, tracks the assigned request and XRPL destination, waits for proof of the agent payment, and manually uses native default instructions if the payment does not arrive.

Current Substitute: The official reference flow, separate explorer and FDC checks, manual deadline arithmetic, support, and a one-off native default call.

Mechanism: A conservation state machine accepts a holder-signed redemption intent, follows every resulting request independently, and closes each branch only with FDC-backed payment confirmation or the redeemer-authorized native default, yielding an invariant receipt that accounts for the burned FXRP as delivered XRP or protocol-issued default compensation.

Chain-Native Angle: The product exists because FAssets redemption spans an FXRP burn on Flare, an assigned agent payment on XRPL, FDC evidence, and a native compensation branch; removing that cross-chain state machine removes the product.

Sponsor Fit: FAssets supplies the real redemption and default lifecycle, FDC supplies payment or non-payment evidence, and Contract Registry resolves the current Asset Manager rather than trusting a hardcoded address.

Demo Hook: One redemption countdown forks live: the paid request turns green from an XRPL payment proof, while a staged expired request unlocks only the valid default action; the holder signs it and a single receipt proves where every unit ended.

Competitor-Derived Insight: Existing products prove that minting, redemption, proof display, and native recovery are individually feasible, but users still encounter payment, proof, delay, recovery, and completion as separate systems.

Missing Outcome: A redeemer lacks a closed-loop answer to “did I receive XRP, or did the protocol compensate me, and is any burned FXRP still unaccounted for?”

Multi-Track Architecture (single-track + exact primitive): Interoperable Asset Products only — exact primitive: FAssets redemption exception state machine joining `redeem`, FDC-backed `confirmRedemptionPayment`, and native `redemptionPaymentDefault` into one holder intent.

Per-Track Load-Bearing Test: Remove the FAssets redemption/default primitive and the product cannot burn FXRP, assign an XRP obligation, or compensate a missed payment; it collapses into a generic tracker with no completed asset outcome.

Proof Path: Holder-signed `redeem` input → FXRP burn and emitted redemption request → assigned XRPL payment observed and attested through FDC, or deadline plus supported non-payment/default evidence → native confirmation or redeemer-signed redemption-payment-default call → XRP delivery or protocol compensation → replayable conservation receipt containing source request, proof, final owner, amounts, and terminal status.

Authority and Integration Map: Redemption creation → FXRP holder → Asset Manager `redeem` resolved through Contract Registry → Flare → live holder-signed burn → redemption-request receipt; fulfillment → assigned registered agent → protocol-specified XRPL payment reference and destination → XRPL → live when a cooperating/test agent is available, otherwise explicitly staged request fixture → XRPL transaction; fulfillment confirmation → assigned agent or its authorized executor → Asset Manager `confirmRedemptionPayment` with FDC payment proof → Flare → live only under that authority → confirmation receipt; missed-payment resolution → affected redeemer holding the required non-payment proof → Asset Manager `redemptionPaymentDefault` after the protocol deadline → Flare → live on an eligible staged request, otherwise clearly simulated calldata only with no completion claim → default receipt and changed compensation balances. The project contract controls no protocol assignment or compensation.

Adaptation Note: Family: cross-chain lifecycle state machine — explicit payment, proof, deadline, default, and terminal ownership states → adapted into an asset-conservation invariant rather than a progress view. Family: proof-carrying receipt — source proof plus final owner → remixed with closed-loop diagnosis → action → verification. CROSS: reversible staging before irreversible completion → redemption exception handling, where the UI stages evidence but the redeemer alone authorizes the irreversible default call.

## 2. Exact-Out Redemption Queue

Name: Exact-Out Redemption Queue

Problem: A holder seeking a specific XRP exit can receive partial requested redemptions and multiple request outcomes, forcing repeated burns, deadline tracking, and default handling while making it easy to over-request or abandon a remainder.

Market Anchor: FXRP holders already redeem through native requests, and the verified workflow includes multiple redemption requests, partial requested redemption, mandatory fees, proof latency, and missed-payment defaults.

Named Buyer: A self-custodied FXRP holder who wants to exit a chosen amount to XRP and controls every FXRP redemption transaction and XRP destination.

Existing Workflow: The holder estimates an exit amount, submits a redemption, inspects how much was actually requested, repeats for the remainder, monitors each assigned agent payment, and separately defaults any expired unpaid request.

Current Substitute: Manual transaction sequences across the reference application, wallet balances, explorer events, spreadsheets, and native default instructions.

Mechanism: A bounded same-holder queue recalculates the unmet XRP target after every protocol-assigned partial request, permits the next `redeem` only for the remaining authorized amount, and terminates each child request through FDC-backed payment confirmation or redeemer-authorized native default before advancing.

Chain-Native Angle: Partial requested redemption and agent-by-agent XRPL fulfillment are native FAssets lifecycle states; the queue's exact-out guarantee is impossible without reading those protocol assignments and completing their payment/default branches.

Sponsor Fit: FAssets provides partial redemption assignment, burn, and default compensation; FDC binds each assigned request to its XRP payment outcome; Contract Registry supplies the current Asset Manager address for each queued call.

Demo Hook: A “receive exactly 50 XRP” intent visibly becomes three native redemption requests; one pays, one partially fills, and one expires, after which the holder signs the only enabled default action and the queue stops with a zero unexplained remainder.

Competitor-Derived Insight: Bounded batch execution is credible only when every member shares one authorized actor, an exact interface, deterministic failure handling, and an individual receipt; existing lifecycle tools do not turn that pattern into a holder-level exact-out outcome.

Missing Outcome: A holder cannot currently express and prove one exact exit intent across partial requested redemptions without manually coordinating every child request and exception.

Multi-Track Architecture (single-track + exact primitive): Interoperable Asset Products only — exact primitive: holder-bounded FAssets `redeem` queue with per-request FDC evidence, agent-authorized `confirmRedemptionPayment`, and redeemer-authorized `redemptionPaymentDefault` completion.

Per-Track Load-Bearing Test: Remove the native FAssets partial-request and default transitions and the queue cannot discover the actual assigned amount, safely compute the next burn, or close an unpaid child request; exact-out conservation no longer holds.

Proof Path: Holder enters target XRP amount and maximum FXRP burn → holder signs first Asset Manager `redeem` → emitted request defines actual requested amount and assigned agent → FDC proves XRP payment or eligible missed-payment state → native confirmation/default terminal receipt → remaining target recomputed from delivered XRP and protocol compensation policy → holder separately authorizes the next bounded `redeem` if needed → final bundle proves every child and the zero or explicitly accepted remainder.

Authority and Integration Map: Queue intent → FXRP holder → local signed constraints in the application → offchain planning only → live → signed intent record; each burn/request → same FXRP holder → Asset Manager `redeem` resolved through Contract Registry → Flare → live → request event and burn receipt; each XRP fulfillment → assigned agent → protocol-defined XRPL payment → XRPL → live only with an assigned/cooperating agent, otherwise labeled fixture → transaction hash; each paid closure → assigned agent or its authorized executor → Asset Manager `confirmRedemptionPayment` with FDC proof → Flare → live only under that authority → confirmation receipt; each unpaid exception → affected redeemer holding the required proof → Asset Manager `redemptionPaymentDefault` after eligibility is proven → Flare → live on an eligible request or calldata-only simulation with no state-change claim → default receipt. No batcher signs for the holder, chooses an agent, or fabricates fulfillment.

Adaptation Note: Family: bounded batch execution — same actor, exact interface, deterministic failure, individual receipt → adapted from throughput batching into a safety-preserving exact-out redemption queue. Family: forced expiry and reauthorization — each child expires independently and the holder must reauthorize the next burn → remixed with before-and-after ownership proof so partial completion cannot silently become asset loss.

## 3. Mint Reservation Salvage Covenant

Name: Mint Reservation Salvage Covenant

Problem: A minter can reserve collateral and then face a stale deadline, unprovable XRP payment, or mismatched payment parameters, with no single outcome that prevents a second irreversible mistake and closes the reservation through the exact native path available to that minter.

Market Anchor: FAssets minters already construct payment references and tags, send XRP, wait for FDC proof, execute minting, pay mandatory fees, and use native minting default or recovery methods when the lifecycle cannot complete.

Named Buyer: A self-custodied XRP holder acting as an FAssets minter; the holder controls the source XRP payment and the receiving Flare account used for the reservation and mint completion.

Existing Workflow: The minter reserves collateral, copies the current agent address, amount, reference, fee, and deadline into an XRP transaction, submits payment, waits for proof, executes minting, or manually follows native default/recovery instructions if the proof window closes.

Current Substitute: Wallet warnings, protocol documentation, manual parameter comparison, the official reference application, support, and isolated native recovery calls.

Mechanism: A signed mint covenant snapshots the live reservation terms immediately before XRP authorization, invalidates itself on any address/reference/amount/deadline drift, and after submission exposes exactly one evidence-gated terminal action: `executeMinting` when payment is provable, `mintingPaymentDefault` when FDC proves non-payment, or `unstickMinting` only after its confirmed-block-height timeout condition.

Chain-Native Angle: The safety problem is created by a Flare reservation that must be satisfied by an irreversible XRPL payment and later proven through FDC; the covenant's mutually exclusive terminal branches have no meaning outside FAssets.

Sponsor Fit: FAssets supplies reservation, mint execution, and the native default/recovery state; FDC proves the XRPL payment or supported negative/deadline condition; Contract Registry prevents stale Asset Manager routing.

Demo Hook: Changing one destination tag after the covenant is signed hard-stops the XRP send; the correct payment then advances to mint, while a staged expired reservation reveals only the minter-authorized salvage action and produces a terminal fee/ownership receipt.

Competitor-Derived Insight: Irreversible-action preflight is proven useful, but prevention alone leaves the already-submitted failure edge open; combining preflight with native exception completion turns a warning into a complete minter outcome.

Missing Outcome: A minter lacks one enforceable promise that the XRP payment still matches the live reservation and that, if minting cannot complete, the reservation reaches its exact native terminal state without pretending the XRP itself is recoverable.

Multi-Track Architecture (single-track + exact primitive): Interoperable Asset Products only — exact primitive: FAssets collateral-reservation covenant joining live preflight, FDC evidence, `executeMinting`, `mintingPaymentDefault`, and timeout-bounded `unstickMinting` as mutually exclusive native outcomes.

Per-Track Load-Bearing Test: Remove the FAssets reservation and its native terminal calls and the covenant becomes an ordinary XRP transaction checker; it can neither mint FXRP nor close the failed reservation, so the promised outcome disappears.

Proof Path: Current Asset Manager and reservation parameters → minter-signed covenant → exact XRPL payment authorization → FDC payment proof → `executeMinting` and final FXRP ownership; exception branch: FDC non-payment proof → eligible proof bearer submits `mintingPaymentDefault`, or confirmed-block-height proof after the attestation window → eligible proof bearer submits `unstickMinting` → terminal reservation/fee receipt. A wrong-recipient XRP payment is explicitly reported as unrecoverable rather than “fixed.”

Authority and Integration Map: Reservation → minter → Asset Manager collateral-reservation interface resolved through Contract Registry → Flare → live → reservation event; XRP payment → same minter's XRP account → protocol-specified agent address, amount, tag/reference, and deadline → XRPL → live holder-signed payment → XRP transaction hash; successful mint → minter or authorized executor holding the FDC payment proof → Asset Manager `executeMinting` → Flare → live when proof timing permits → FXRP balance and mint receipt; proven non-payment closure → any proof-bearing caller permitted by the public Asset Manager interface → `mintingPaymentDefault` with FDC non-payment proof → Flare → live only on an eligible reservation → default receipt; post-attestation-window closure → any proof-bearing caller permitted by the public interface → `unstickMinting` with confirmed-block-height proof → Flare → live only after the native timeout, otherwise calldata preview with no completion claim → terminal reservation receipt. The covenant never claims authority to reverse an XRPL payment.

Adaptation Note: Family: irreversible-action preflight — live route and terms immediately before signature → remixed with native exception completion so a failed post-payment state also terminates. Family: forced expiry and reauthorization — stale covenants cannot be reused → adapted to mint reservations. CROSS: closed-loop diagnosis → action → verification → minter recovery, with mutually exclusive mint and salvage receipts rather than a recovery wrapper.

## 4. Redemption Duty Capsule

Name: Redemption Duty Capsule

Problem: A registered FAssets agent can receive an assigned redemption while its XRP liquidity, payment reference, proof deadline, and Flare confirmation are split across scripts, making an operational mistake expensive for both the agent and redeemer.

Market Anchor: Registered agents already earn minting fees, hold underlying XRP, fulfill assigned redemptions, prove payments, bear collateral/default costs, and use internal treasury tooling and protocol safeguards.

Named Buyer: An existing registered FAssets agent or the treasury/operations lead authorized to use that agent's work key and underlying XRP address.

Existing Workflow: The agent reads an assigned redemption, prepares the exact XRP amount and reference, signs the underlying payment, obtains proof, confirms fulfillment on Flare, and reconciles the XRP outflow, fees, and remaining collateral exposure.

Current Substitute: Agent consoles, custom bots, manual XRPL payments, raw event monitoring, separate FDC tooling, and after-the-fact treasury reconciliation.

Mechanism: Each assigned redemption becomes a single-use duty capsule that binds the protocol request, authorized agent work key, authorized XRP source, exact recipient/reference/amount/deadline, and FDC confirmation; any mismatch burns the capsule's authorization, while successful payment and confirmation produce a before/after liquidity-and-liability receipt.

Chain-Native Angle: Only FAssets creates the assigned cross-chain duty in which one registered agent must spend underlying XRP and prove that exact payment on Flare before default exposure; the capsule is an executable fulfillment constraint, not a generic operations dashboard.

Sponsor Fit: FAssets supplies the assigned redemption obligation and fulfillment confirmation, FDC binds the XRPL payment to that obligation, and Contract Registry resolves the current Asset Manager used by the authorized work key.

Demo Hook: The agent attempts a payment with a one-character reference error and the capsule refuses to sign; the corrected XRP payment is proven through FDC, confirmed on Flare, and the obligation visibly disappears while a signed before/after treasury receipt reveals the avoided default exposure.

Competitor-Derived Insight: Existing operator products demonstrate demand for scripts, proof tooling, and transaction readiness, but stop short of binding cross-chain evidence, signer authority, and after-action accounting into one consumable execution object.

Missing Outcome: An agent lacks a single-use, proof-carrying fulfillment unit that prevents malformed XRP redemption payments and proves both the obligation closure and resulting treasury state.

Multi-Track Architecture (single-track + exact primitive): Interoperable Asset Products only — exact primitive: agent-authorized FAssets redemption-fulfillment capsule joining the emitted assigned request, exact XRPL payment, FDC attestation, and Asset Manager `confirmRedemptionPayment`.

Per-Track Load-Bearing Test: Remove the assigned FAssets redemption and FDC-backed confirmation primitive and the capsule has no enforceable liability, exact payment semantics, or protocol closure; it degrades into a generic XRP payment template.

Proof Path: Assigned redemption event → capsule constructed from live request and agent authority → authorized agent XRP signer verifies source, recipient, reference, amount, and deadline → XRP payment → FDC payment proof → agent work key submits native redemption-payment confirmation → obligation and collateral exposure update → judge-visible receipt linking request, payment, proof, authority, and before/after balances.

Authority and Integration Map: Assignment observation → public reader → Asset Manager redemption event at Contract Registry-resolved address → Flare → live → request ID and event receipt; capsule authorization → registered agent operations lead → agent-configured work key and approved XRP source policy → local signer boundary → live only with a cooperating registered agent, otherwise explicit test-agent fixture → signed capsule; XRP payment → agent-controlled XRP account → XRPL transaction matching the protocol request → XRPL → live with cooperating/test agent → transaction hash; proof → FDC verifier → supported payment attestation → XRPL to Flare → live when timing permits → proof receipt; fulfillment closure → authorized agent work key or its authorized executor → Asset Manager `confirmRedemptionPayment` → Flare → live only under that agent's authority, otherwise calldata simulation with no closure claim → confirmation transaction and changed request state. If no cooperating agent exists, the product makes no mainnet-agent claim.

Adaptation Note: Family: versioned integration route — bind recipient, reference, signer, network, and contract version → adapted into a single-use redemption duty rather than reusable routing configuration. Family: before-and-after solvency or ownership proof — obligation and treasury state around one fulfillment → remixed with proof-carrying receipts. CROSS: live performance receipt instead of projected benefit → agent operations, proving a completed assigned duty and avoided default rather than displaying agent health.
