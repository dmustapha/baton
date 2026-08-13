# Round 4 — Generator C Compliance Rerun

## Concept 1

**Name:** FXRP Double-Pay Shield

**Problem:** An XRP holder paying a known person or business can accidentally repeat a payment after a delayed screen, wallet retry, or forgotten earlier transfer. The first payment may be valid, but the second is irreversible.

**Market Anchor:** Self-custodied XRP holders already authorize payments, mint or hold FXRP, and face nonce conflicts, delayed execution, failed target calls, and wrong-payment risk. The first users are five current holders willing to replay small transfers to recipients they already pay; no marketplace or institutional buyer is required.

**Named Buyer:** Self-custodied XRP holder using FXRP for a real payment.

**Existing Workflow:** The holder reviews wallet history, copies a recipient, enters an amount, and sends. After an ambiguous failure or delay, the holder decides manually whether to retry.

**Current Substitute:** Wallet history, personal notes, test payments, support documentation, or simply waiting to see whether the first payment appears.

**Mechanism:** Before each send, the holder supplies a private payment reference, recipient label, retry window, and repeat-payment rule. FCC compares the new intent with the holder's sealed prior-intent set and signs `NEW`, `SAFE_RETRY`, or `DUPLICATE`. A verifier contract accepts only `NEW` or a call-bound `SAFE_RETRY`; otherwise the FXRP stays in the holder's account. Only the action code, amount bound, intent commitment, policy version, nonce, and expiry leave the confidential boundary.

**Chain-Native Angle:** The protected action is an actual FXRP transfer reached from the XRP-to-FXRP holder journey and optionally authorized by an XRPL-linked Smart Account. The FCC result is checked onchain before FXRP moves, so a generic notification or interchangeable ERC-20 demo does not reproduce the product.

**Sponsor Fit:** Interoperable Asset Products supplies the real FXRP/Smart Account payment consequence. Confidential Compute Apps supplies private duplicate detection with an honestly labeled simulated, registered, or attested machine state, signed minimum result, and contract verification.

**Demo Hook:** Make one FXRP payment, then press retry with the same public amount while changing only the private reference status. One run produces a verified safe transfer; the duplicate run is visibly blocked with unchanged FXRP balance and a signed refusal receipt.

**Competitor-Derived Insight:** Pre-action and post-action guardians become compelling when they close the loop with a value consequence, and explicit abstention is stronger than a warning the user can dismiss.

**Missing Outcome:** Existing preflight and wallet warnings rarely reconcile a holder's naturally private payment purpose with an enforceable decision about whether the exact FXRP retry may execute.

**Multi-Track Architecture:** Holder commits private payment context and grants a narrow FXRP allowance; FCC evaluates the exact proposed call against the sealed intent set; the onchain verifier checks machine signature, call hash, amount, recipient commitment, policy version, nonce, and expiry; the payment adapter either transfers FXRP to the holder-selected recipient or fails closed.

**Per-Track Load-Bearing Test:** Remove FXRP/Smart Account execution and the product becomes a private bookkeeping checker with no XRP-native consequence. Remove FCC and either the payment references become public or an ordinary backend can arbitrarily decide whether the transfer occurs.

**Proof Path:** Holder proposes payment → holder-controlled FXRP and authorization state are shown → private reference is evaluated → signed result is verified → permitted FXRP payment executes or duplicate attempt abstains → before/after balances, call hash, machine status, and decision receipt are displayed.

**Authority and Integration Map:** Holder authors the private rule and payment reference → holder signs or grants a revocable amount-bounded authorization → FCC can only classify the proposed call → verifier contract can only enforce the signed bound → holder-selected recipient receives FXRP → holder receives the receipt. No app, operator, or fictional reviewer gains independent spending authority.

**Adaptation Note:** Adapts private inclusion checking and pre/post-action guarding to a current holder payment retry. Reject the concept if the private reference is invented by the app, the result is advisory, privacy is ordinary backend encryption, the transfer can bypass verification, a fabricated compliance role is required, or another token can stand in for the XRP-to-FXRP journey.

## Concept 2

**Name:** FXRP Reserve-First Redeem

**Problem:** An FXRP holder redeeming back toward XRP can accidentally redeem more than intended and leave too little liquid FXRP for another commitment. The holder's true reserve need and wider portfolio context are private.

**Market Anchor:** FXRP holders already enter, deploy, hold, and exit the FAssets lifecycle. Redemption is a native part of that journey, while amount mistakes, liquidity mismatch, stale operational state, and proof timing are current sources of friction. Five current FXRP holders can test the experience with their own reserve choices and small balances.

**Named Buyer:** Self-custodied FXRP holder preparing an authorized redemption.

**Existing Workflow:** The holder checks several balances, calculates an amount to redeem, initiates the native redemption path, follows payment/proof state, and manually verifies the final XRP and FXRP balances.

**Current Substitute:** Calculator or spreadsheet, manual balance checks, a smaller trial redemption, public wallet thresholds, and protocol status monitoring.

**Mechanism:** The holder privately supplies a minimum FXRP reserve, maximum redemption size, expiry, and purpose-specific constraint. FCC evaluates the proposed redemption against the available holder-controlled FXRP and signs `REDEEM_UP_TO`, `KEEP`, or `ABSTAIN`. The redemption adapter accepts only the signed bounded amount and consumes the authorization once. The reserve value and portfolio context stay private; only the executable bound and status are disclosed.

**Chain-Native Angle:** A verified FCC result directly gates a real FXRP redemption state transition and its FDC-visible XRP settlement path. FXRP is indispensable because the product protects the holder while crossing from the programmable representation back through the XRP-linked FAssets lifecycle.

**Sponsor Fit:** Interoperable Asset Products provides FXRP redemption and FDC-confirmed external payment evidence. Confidential Compute Apps provides a signed private reserve computation whose result the redemption adapter must verify before the holder's FXRP can be committed.

**Demo Hook:** Use the same visible FXRP balance and proposed redemption twice. Change only the hidden reserve floor: the first result commits the bounded redemption; the stricter floor produces `KEEP` with no FXRP movement. Then show the FDC timing/status and exact before/after receipt for the permitted branch.

**Competitor-Derived Insight:** Confidential counterfactual simulation is strongest when it authorizes a bounded recovery or exit rather than stopping at diagnosis, and raw external evidence should sit beside the derived decision and final asset receipt.

**Missing Outcome:** Holder tools expose balances and protocol state, but do not make a private personal reserve rule causally necessary for the exact FXRP redemption amount.

**Multi-Track Architecture:** Holder escrows or approves only the proposed FXRP amount; current redemption state plus the private reserve policy enter FCC; FCC signs a redemption call commitment and upper bound; the verifier adapter initiates only that native redemption; FDC evidence reconciles the external XRP payment; any mismatch yields abstention.

**Per-Track Load-Bearing Test:** Remove FAssets/FXRP/FDC and there is no XRP-linked redemption or external settlement to protect. Remove FCC and the reserve must be public or a trusted server can choose the amount, destroying the privacy-enforced guarantee.

**Proof Path:** Holder proposes redemption → real FXRP balance and native redemption state are committed → FCC evaluates the private reserve → contract verifies the signed bound → FXRP redemption proceeds or remains untouched → FDC-derived XRP settlement and both asset receipts are shown.

**Authority and Integration Map:** Holder defines the private reserve and signs a one-use redemption allowance → FCC computes but cannot spend → verifier adapter may submit only the bounded native redemption → existing FAssets participants perform their protocol-defined roles → XRP settlement returns through the standard path → holder verifies final balances. The app does not control agent assignment, capacity, or native redemption authority.

**Adaptation Note:** Adapts private counterfactual simulation to an existing holder-controlled exit. Reject if FCC merely advises an amount, if a backend stores the rule without signed contract enforcement, if the app invents an agent or liquidity promise, if unsupported live/attested claims replace honest labels, or if the demo avoids actual FXRP redemption.

## Concept 3

**Name:** FXRP Continuity Pocket

**Problem:** A self-custodied holder can lose access or become inactive, permanently stranding FXRP; but publishing a beneficiary and release rule in advance exposes sensitive family or recovery information and can invite premature claims.

**Market Anchor:** Asset owners already use self-custody and need value to remain recoverable across inactivity or signer failure. FDC-confirmed presence or absence and holder-authored recovery controls are available primitives, while current substitutes force a tradeoff between privacy, trust, and recoverability. The first five users are existing XRP/FXRP holders who already maintain a personal recovery plan.

**Named Buyer:** Self-custodied XRP/FXRP holder who wants a private continuity plan for holder-owned FXRP.

**Existing Workflow:** The holder records recovery instructions offline, shares keys or legal instructions with a trusted person, or leaves assets entirely dependent on the original signer remaining available.

**Current Substitute:** Seed phrase handoff, hardware-wallet backup, public beneficiary contract, custody service, multisig, or private written instructions that cannot enforce an onchain release.

**Mechanism:** The holder deposits a bounded FXRP amount into a holder-configured continuity pocket and privately commits the beneficiary, inactivity rule, challenge preference, and fallback-to-owner condition. FDC supplies the required external presence or absence evidence. FCC evaluates the private policy and signs `WAIT`, `OPEN_CHALLENGE`, `RETURN_OWNER`, or `RELEASE_BENEFICIARY`; the pocket contract verifies the signed result and enforces a reversible challenge stage before final release.

**Chain-Native Angle:** FDC evidence and a real FXRP lock, challenge, owner-return, or beneficiary-release transition form the product. The XRP/FXRP ownership history and external activity evidence are not interchangeable with a generic timelock token.

**Sponsor Fit:** Interoperable Asset Products contributes FXRP custody transitions and FDC-attested XRP-chain activity or nonexistence. Confidential Compute Apps keeps beneficiary and contingency rules private while emitting a signed minimum action that the pocket contract alone can verify and execute.

**Demo Hook:** Commit a beneficiary privately, stage a holder-activity proof and an absence proof, and show the same pocket return `WAIT` then `OPEN_CHALLENGE`. During the challenge, present fresh owner activity and visibly reverse to `RETURN_OWNER`; in the alternate replay, let the signed release move FXRP and display the exact receipt without revealing the unused policy branches.

**Competitor-Derived Insight:** Dual absence evidence and reversible confidential recovery are more credible than a one-shot dead-man switch; explicit challenge, abstention, and machine-failure states turn recovery from a promise into a product.

**Missing Outcome:** Existing continuity mechanisms rarely combine private beneficiary policy, independently attested XRP-chain activity, a reversible handoff, and a final contract-required FXRP consequence.

**Multi-Track Architecture:** Holder configures and funds the pocket; FDC evidence is bound to the policy and evaluation window; FCC signs a policy-versioned transition with beneficiary commitment, amount bound, challenge deadline, nonce, and expiry; the verifier contract opens or reverses the challenge and ultimately transfers only to the committed holder or beneficiary.

**Per-Track Load-Bearing Test:** Remove FXRP/FDC and the experience is an ordinary private inheritance database or generic timelock. Remove FCC and the beneficiary and contingency policy become public or a recovery service gains discretionary control over release.

**Proof Path:** Holder funds FXRP pocket → FDC proves activity or bounded absence → FCC privately resolves the holder-authored policy → verifier checks signed transition → pocket waits, returns, or releases FXRP → evidence status, challenge timeline, machine status, and final balance receipt are shown.

**Authority and Integration Map:** Holder alone selects policy, beneficiary commitment, and bounded FXRP deposit → FDC reports external evidence but grants no authority → FCC selects only among holder-approved transitions → pocket contract enforces challenge and destination commitments → original holder can prove resumed activity during the reversible stage → final recipient receives only the authorized FXRP. No recovery company, executor, or invented adjudicator controls funds.

**Adaptation Note:** Adapts continuity and dual-absence patterns to an owner-funded FXRP pocket with a reversible first-session demonstration. Reject if a fictional estate role or private dataset is assumed, if inactivity is guessed rather than evidenced, if FCC is only advisory, if beneficiary data merely sits in an encrypted database, or if the mechanism works unchanged with any token and no XRP/FDC lifecycle.

## Concept 4

**Name:** FXRP Private Pay Pocket

**Problem:** A holder who repeatedly pays the same real recipient must either reveal a recurring budget and schedule onchain or remain online for every payment. A compromised executor or stale instruction can also send too much or continue after the holder intended to stop.

**Market Anchor:** XRP-funded payments and known payer-payee relationships already exist, and self-custodied holders already authorize transfers or Smart Account calls. Private amount limits, future intent, recipient rules, and availability policy are naturally private. Five current holders can pilot small recurring payments to people or services they already pay without recruiting a new merchant network.

**Named Buyer:** Self-custodied XRP holder with an existing recurring recipient and a desire to pay in FXRP.

**Existing Workflow:** The holder remembers each due date, checks the recipient and amount, signs a payment, and later reconciles whether it landed; automation requires exposing the schedule or trusting an operator.

**Current Substitute:** Calendar reminders, manual transfers, wallet allowlists, public streaming contracts, custody automation, or a generic backend that holds the schedule and submits calls.

**Mechanism:** The holder funds a revocable FXRP pocket and privately specifies recipient commitment, cadence, per-payment cap, cumulative cap, pause condition, and expiry. On each requested payment, FCC evaluates the sealed policy and signed prior-payment accumulator, then emits `PAY_UP_TO`, `NOT_DUE`, `PAUSED`, or `EXPIRED`. The contract verifies the result and transfers only the approved amount to the committed recipient.

**Chain-Native Angle:** XRPL-linked Smart Account authorization can establish the pocket, and every successful confidential decision produces a real bounded FXRP transfer plus cumulative onchain receipt. The XRP-to-FXRP entry and owner-authorized recurring use make another token or ordinary subscription database an invalid substitute.

**Sponsor Fit:** Interoperable Asset Products supplies holder-controlled Smart Account authorization and repeated FXRP settlement. Confidential Compute Apps supplies private schedule and budget evaluation, policy versioning, signed results, contract verification, and honest simulated/registered/attested machine labels.

**Demo Hook:** Fund the pocket, privately set a cadence and cap, then run a countdown. At the boundary, a signed result releases FXRP to the known recipient; an immediate replay returns `NOT_DUE`; changing the hidden pause fact returns `PAUSED`. The judge sees transfers and refusal receipts but not the future schedule or cumulative budget.

**Competitor-Derived Insight:** A first-session countdown and reveal make confidential policy tangible, while forced expiry and reauthorization prevent long-lived automation from silently drifting beyond the owner's current intent.

**Missing Outcome:** Public streams reveal future intent, while private automation commonly relies on an ordinary backend and does not make a verified confidential result necessary for each asset payment.

**Multi-Track Architecture:** Holder signs and funds a recipient-bound pocket; FCC holds no spending key and evaluates private cadence, caps, pause state, and prior-payment commitment; verifier checks machine signature, policy version, cumulative bound, recipient, amount, nonce, call hash, and expiry; the pocket transfers FXRP or fails closed; the holder can revoke future calls at any time.

**Per-Track Load-Bearing Test:** Remove FXRP/Smart Account execution and the product becomes a private reminder with no XRPFi settlement. Remove FCC and the future schedule and budget must be public or an operator becomes the trusted payment decision-maker.

**Proof Path:** Holder authorizes and funds FXRP pocket → private recurring rule is committed → payment request reaches FCC → signed due/pause result is verified → exact FXRP payment executes or abstains → recipient balance, cumulative bound, machine status, expiry, and replay-proof receipt are displayed.

**Authority and Integration Map:** Holder chooses the existing recipient and every private rule → holder grants only pocket-bounded FXRP authority → requester or executor may trigger evaluation but cannot choose outcome → FCC signs within holder policy but cannot transfer → verifier pocket pays only the committed recipient and bound → holder revokes or reauthorizes after expiry. No invented payroll department, merchant platform, or discretionary operator is required.

**Adaptation Note:** Adapts private value flow, forced policy expiry, and a countdown mechanic to an existing holder-recipient relationship. Reject if the recurring payment is hypothetical, the operator can bypass FCC, privacy is only offchain storage, FCC returns advice instead of a required signature, a fabricated budget or user role is assumed, or FXRP can be swapped for a generic token without losing the Smart Account/XRPFi journey.
