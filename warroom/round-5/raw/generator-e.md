# Generator E — Interoperable Asset Products

## 1. FXRP Arrival Guarantee

Name: FXRP Arrival Guarantee

Problem: An XRP holder using a wallet to enter FXRP cannot easily prove that the XRP payment, FDC proof, mint, and final FXRP ownership all belong to the same purchase, so a delayed arrival becomes a support hunt across two chains.

Market Anchor: Self-custodied XRP holders already send XRP through direct minting or a Smart Account route, pay minting or executor fees, wait for proof, and receive FXRP into a Flare-controlled account.

Named Buyer: A self-custodied XRP holder using an authorized wallet integration or the builder-controlled reference wallet; the holder controls the XRP source and final Flare or Personal Account.

Existing Workflow: The holder copies current payment parameters, signs an XRP payment, waits through FDC proof latency, watches a separate Flare account for FXRP, and consults explorers or support when the asset is late.

Current Substitute: Wallet warnings, two explorers, protocol documentation, transaction hashes pasted into support, and manual balance checking.

Mechanism: Before payment, the wallet issues a single-use arrival covenant binding the current Asset Manager, XRP destination/reference/amount/deadline, and final FXRP owner; after authorization it can become complete only by attaching the source payment, FDC evidence, mint receipt, and before/after owner balance to the same portable receipt.

Chain-Native Angle: The guarantee joins an irreversible XRPL payment to a proof-mediated FAssets mint and final ownership on Flare; without FDC and the FAssets lifecycle there is no cross-chain arrival to guarantee.

Sponsor Fit: FAssets supplies the reservation and mint state, FDC proves the external XRP payment, and Contract Registry resolves the current protocol address at covenant creation and verification.

Demo Hook: A user pays once in XRP and watches a physical-style boarding pass collect four live stamps—paid, proven, minted, owned—then opens the raw proof bundle from the final FXRP balance without switching explorers.

Competitor-Derived Insight: Existing products make minting possible and expose pieces of progress, while proof-carrying receipts can bind source transaction, protocol proof, asset transition, current owner, and failure status into one replayable object.

Missing Outcome: The holder lacks a durable, independently replayable promise that a particular XRP payment ended as FXRP under the intended owner's control rather than merely reaching an intermediate address.

Multi-Track Architecture (single-track + exact primitive): Interoperable Asset Products only — exact primitive: a holder-bound FAssets mint covenant completed by XRPL payment evidence, FDC attestation, Asset Manager `executeMinting`, and final FXRP ownership proof.

Per-Track Load-Bearing Test: Remove FAssets plus FDC and the product cannot connect the XRP payment to a canonical mint or prove the intended FXRP owner; it becomes a generic payment receipt with no interoperable asset guarantee.

Proof Path: Current Contract Registry and reservation terms → holder-approved covenant → exact XRP payment → FDC payment proof → minter or authorized executor calls `executeMinting` → FXRP balance change at the bound owner → signed portable receipt with all identifiers, versions, amounts, timing, and terminal ownership; a mismatch or expired covenant remains visibly incomplete and cannot be restamped as success.

Authority and Integration Map: Route construction → holder's authorized wallet or builder-controlled reference wallet → current reservation data plus Contract Registry → Flare → live read → versioned covenant; XRP payment → XRP holder → holder-controlled XRPL signer and protocol-specified destination/reference → XRPL → live → transaction hash; payment proof → FDC verifier → supported payment attestation → XRPL to Flare → live when timing permits → proof receipt; mint completion → minter or protocol-authorized executor → Asset Manager `executeMinting` → Flare → live on an eligible reservation → mint transaction; ownership stamp → public verifier → FXRP balance and mint event at the bound account → Flare → live read → final receipt. The wallet cannot sign for the holder or label an intermediate payment as FXRP arrival.

Adaptation Note: Family: proof-carrying receipt — bind source payment, proof, transition, and owner → adapted into a consumer arrival guarantee rather than an audit artifact. Family: versioned integration route — freeze recipient, reference, network, and protocol address → remixed with a first-session countdown/reveal so completion is both safe and immediately legible.

## 2. Deposit Route Renewal Checkout

Name: Deposit Route Renewal Checkout

Problem: A repeat XRP wallet customer can reuse an old destination tag, recipient, executor, or contract route after an integration changes, creating an irreversible payment that the current service route may not reconcile.

Market Anchor: Wallets and XRP services already reserve tags, construct memos, reconcile external payments to minted assets, pay support costs, and periodically change recipients, executors, networks, or contract addresses.

Named Buyer: The deposit-operations lead of a wallet or XRP service that has granted an authorized sandbox or pilot, with its existing customers as users; without that authorization the product is limited to the builder-controlled reference wallet.

Existing Workflow: The service stores routing data in an internal registry, the customer retrieves deposit instructions, signs an XRP payment, and operations staff later reconcile the payment with the resulting FXRP or investigate stale-route errors.

Current Substitute: Internal tag databases, X-addresses, static deposit screens, reconciliation software, expiry warnings, and customer support.

Mechanism: Every checkout produces an expiring customer-visible route ticket signed by the authorized integrator and bound to one recipient, tag/memo, executor, network, Asset Manager version, amount rules, and intended FXRP owner; the wallet refuses signing after expiry and converts a used ticket into a proof-carrying lifecycle receipt.

Chain-Native Angle: The ticket protects the exact XRPL-to-FAssets mapping whose external payment is irreversible but whose mint and final owner settle on Flare; a normal web checkout has no FDC-attested cross-chain asset state to reconcile.

Sponsor Fit: FDC links the used route ticket to the XRP payment, FAssets supplies the minted asset transition, and Contract Registry makes protocol-address changes an explicit route version rather than a silent backend update.

Demo Hook: Two QR-style deposit tickets sit side by side; a service migration expires the old one, the wallet blocks its signature, then the renewed ticket completes and folds into a receipt showing the customer's exact final FXRP owner.

Competitor-Derived Insight: Repeat integrations already manage tags, memos, recipients, executors, proofs, and reconciliation, while the portable versioned-route primitive can make migrations safe without granting a third party authority over customer funds.

Missing Outcome: A wallet customer lacks a service-authenticated, expiring guarantee that the deposit instructions are current and a matching receipt that proves the service route completed end to end.

Multi-Track Architecture (single-track + exact primitive): Interoperable Asset Products only — exact primitive: authorized integrator-signed versioned XRP route ticket consumed by an FDC-backed FAssets mint and terminal FXRP-owner receipt.

Per-Track Load-Bearing Test: Remove the FAssets/FDC consumption proof and the ticket cannot demonstrate that a customer payment minted the intended asset; remove integrator authority and it cannot validly represent a service's tag or recipient, so the product is rejected rather than downgraded to public-chain guesswork.

Proof Path: Authorized service route configuration → signed expiring ticket → customer wallet preflight and XRP signature → XRPL payment → FDC attestation → native mint completion → service reconciliation acknowledgment inside its authorized sandbox plus onchain final-owner evidence → portable customer receipt; stale or mismatched tickets fail before payment and remain unconsumed.

Authority and Integration Map: Route publication → authorized wallet/service deposit-operations lead → service-owned sandbox registry or builder-controlled reference registry → service system → live only with written sandbox/pilot authority → signed route version; payment → customer → customer-controlled XRPL signer → XRPL → live → transaction hash; payment proof → FDC verifier → supported attestation → Flare → live when timing permits → proof receipt; mint → minter or authorized executor → current Asset Manager mint interface → Flare → live on an eligible route → FXRP mint receipt; service reconciliation → authorized service sandbox only → documented sandbox acknowledgment interface → service system → live only under pilot authority, otherwise omitted rather than simulated → reconciliation ID; final ownership → public verifier → FXRP balance/event → Flare → live → customer receipt. Public chain access never mutates an incumbent ledger.

Adaptation Note: Family: versioned integration route — bind tags, memos, recipients, executors, network, and contract version → adapted into an expiring consumer checkout artifact. Family: reversible staging before irreversible completion — replace or cancel a ticket before XRP signing → remixed with proof-carrying receipts after consumption, creating a safe migration outcome rather than developer configuration.

## 3. One-Tap XRPFi Delivery Note

Name: One-Tap XRPFi Delivery Note

Problem: A Smart Account user can authorize XRP-to-FXRP plus a Flare action in one XRPL instruction but still cannot tell whether a delay or failed target call left the value in transit, minted inside the Personal Account, or successfully delivered to the chosen application.

Market Anchor: Smart Account users already encode XRPL instructions, pay executor fees, obtain FDC proof, mint FXRP, and atomically execute a Flare action through a Personal Account, while nonce conflicts, fee shortfalls, delayed execution, and failed target calls are known workflow pains.

Named Buyer: An XRP holder using a Smart Account wallet who controls the XRPL owner account and the resulting Personal Account.

Existing Workflow: The holder constructs and signs an XRPL instruction, waits for an executor or eventual permissionless execution, then checks separate wallet, Personal Account, and application views to infer where the asset landed.

Current Substitute: Official guides, backend preflight, executor monitoring, wallet balances, application UIs, and native state-specific recovery instructions.

Mechanism: The wallet turns each XRPL instruction into a delivery note that commits to nonce, executor fee, Personal Account, target call, minimum acceptable result, and expiry, then seals it only with FDC proof plus one of three observed terminal ownership outcomes: target application position, FXRP retained under the user's Personal Account, or a controller-supported recovery transition executed by its exact authorized actor.

Chain-Native Angle: Flare Smart Accounts uniquely let an XRPL owner authorize mint and execution on Flare through a controller and Personal Account; the product's value is proving the final controller and asset location across that native instruction lifecycle.

Sponsor Fit: Smart Accounts provide the XRPL-authorized Personal Account execution, FDC proves the instruction payment, FAssets produces FXRP, and Contract Registry/versioned controller data prevents a delivery note from following stale protocol addresses.

Demo Hook: A one-tap “mint and deposit” instruction deliberately fails its target call; instead of a red error, the note unfolds to show the FXRP safely retained in the user's Personal Account, the exact controller-approved next action, and then a final holder-authorized completion receipt.

Competitor-Derived Insight: Existing systems expose payment, proof, execution, recovery, and completion separately; progressive disclosure plus a portable proof bundle can make “who controls it now and what exact action remains?” a consumer product moment.

Missing Outcome: A Smart Account user lacks a single authoritative delivery result that distinguishes failed application execution from lost assets and carries the exact recoverable state forward without repeating the XRP payment.

Multi-Track Architecture (single-track + exact primitive): Interoperable Asset Products only — exact primitive: Smart Account XRPL instruction plus FDC proof, FAssets mint, Personal Account atomic target call, and controller-version-specific recovery/continuation transition exposed only when the live controller reports it valid.

Per-Track Load-Bearing Test: Remove Smart Account execution and the XRP owner cannot authorize the Flare action from XRPL; remove the FAssets/FDC lifecycle and the note cannot prove the XRP-funded asset or final FXRP controller, reducing it to an application transaction receipt.

Proof Path: Holder-approved XRPL instruction with nonce, fee, account, and target commitment → XRP payment → FDC proof → executor or permissionless controller execution → FXRP mint into the Personal Account → target-call result and before/after balances → success delivery note, or live controller state → holder/executor invokes only the published valid recovery/continuation transition → final ownership receipt. If the controller exposes no action for the observed state, the product fails closed and makes no recovery claim.

Authority and Integration Map: Instruction authorization → XRP holder → Smart Account wallet encoder plus holder-controlled XRPL signer → XRPL → live → signed instruction transaction; relay → configured executor, then permissionless caller only when the controller permits → published controller interface for the resolved version → Flare → live when executor access exists, otherwise explicit builder-operated executor → execution receipt; proof → FDC verifier → supported attestation → Flare → live when timing permits → proof receipt; asset mint and target execution → Personal Account controller → version-resolved native Smart Account path → Flare → live → FXRP balance and target-call receipt; exception continuation → holder, executor, or permissionless caller exactly as the live controller version authorizes → that controller version's published state-specific operation → Flare → live only when eligibility is observable, otherwise no call → final controller/owner receipt. The app never substitutes a project transfer for controller recovery.

Adaptation Note: Family: cross-chain lifecycle state machine — payment, proof, execution, recovery, and ownership → adapted into a consumer delivery note. Family: progressive disclosure — ordinary “delivered / safely held / action needed” first, raw evidence on demand → remixed with forced expiry and reauthorization so stale instructions cannot be replayed as fresh delivery promises.

## 4. FXRP Position Passport

Name: FXRP Position Passport

Problem: An FXRP holder moving from mint into a live application position and later exiting must piece together acquisition, approval, deposit, position ownership, withdrawal, and redemption evidence, so neither the holder nor wallet can prove the full useful life of the asset.

Market Anchor: FXRP holders already transfer, swap, deposit, borrow or lend, hold vault shares, withdraw, and redeem, and most circulating FXRP is actively deployed through repeated DeFi activity.

Named Buyer: A self-custodied FXRP holder using a wallet that supports one specifically verified FXRP application; the holder controls every token and application authorization.

Existing Workflow: The holder mints or receives FXRP, visits an application UI, approves and deposits, monitors a separate position view, withdraws later, and returns to the FAssets flow to redeem to XRP.

Current Substitute: Wallet portfolio views, individual application UIs, explorers, manual transaction-history exports, and disconnected mint/redemption receipts.

Mechanism: A holder-owned position passport advances only when a verified application call changes the holder's FXRP into a named position token or balance, later proves the holder-authorized unwind, and finally attaches either retained FXRP ownership or a native XRP redemption outcome, turning “asset utility” into a portable completed lifecycle rather than a balance display.

Chain-Native Angle: The passport begins with XRP provenance through FAssets, records an actual FXRP application transition on Flare, and can end in native redemption to XRP; without the interoperable FXRP lifecycle it is only a generic DeFi history.

Sponsor Fit: FAssets and FDC establish XRP-to-FXRP provenance and optional XRP redemption closure, while the selected Flare application supplies the meaningful holder-authorized position transition; Contract Registry resolves all mutable protocol addresses.

Demo Hook: One passport flips from XRP origin to live yield-bearing position, then the holder unwinds it and tears off a final XRP redemption stub; every stage expands into its exact transaction, owner, and failure safeguard.

Competitor-Derived Insight: Existing products show that FXRP can enter applications, but the missing product is a proof path from origin through useful action to safe unwind; live performance receipts are stronger than projected return dashboards.

Missing Outcome: A holder lacks one portable proof that FXRP was not merely minted or transferred, but entered a specific useful position under holder authority and exited without an orphaned asset or unexplained remainder.

Multi-Track Architecture (single-track + exact primitive): Interoperable Asset Products only — exact primitive: XRP/FDC-backed FXRP provenance joined to one ABI-verified holder-authorized application `deposit` and `withdraw` lifecycle, with final FXRP ownership or native FAssets `redeem` closure.

Per-Track Load-Bearing Test: Remove FAssets provenance and redemption and the passport loses its connected-ecosystem asset lifecycle; remove the verified application transition and it proves only mint and transfer, violating the useful-product outcome.

Proof Path: XRP source payment and FDC proof or existing FXRP ownership → FXRP acquisition receipt → holder approves only the exact verified application spender and calls its published deposit interface → position token/balance plus before/after FXRP ownership → holder calls the same application's published withdrawal interface → returned FXRP → holder retains it or calls native `redeem` → XRP payment proof or eligible native default receipt → complete passport with no unexplained remainder.

Authority and Integration Map: FXRP provenance → holder/public verifier → FAssets mint event plus FDC payment proof or holder balance → Flare → live → provenance page; application entry → FXRP holder → one selected application's verified deployed ABI and exact `deposit` interface → Flare → live only after interface/network verification → position receipt; application exit → same holder → the same verified ABI's `withdraw` interface → Flare → live → returned-FXRP receipt; XRP exit request → FXRP holder → Asset Manager `redeem` resolved through Contract Registry → Flare → live → redemption receipt; XRP fulfillment → assigned agent and FDC verifier → protocol-defined XRPL payment plus attestation → XRPL to Flare → live when available → payment/confirmation receipt; unpaid exception → affected redeemer → Asset Manager `redemptionPaymentDefault` with required proof after eligibility → Flare → live only on an eligible request → default receipt. Unsupported applications are rejected from passport creation rather than represented by arbitrary transfers.

Adaptation Note: Family: self-authorized asset composition — acquire FXRP, perform one meaningful application action, and preserve a credible exit → adapted into a portable consumer passport. Family: live performance receipts instead of projected benefit — record actual position entry and unwind → remixed with before-and-after ownership proof and native redemption closure.
