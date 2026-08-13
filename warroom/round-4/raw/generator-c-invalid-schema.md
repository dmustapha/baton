# Round 4 — Blind Generator C

## 1. FXRP Safe Send

### One-line concept
A self-custodied FXRP holder privately defines who may receive FXRP and under what amount limit; a signed FCC decision is the only authorization the transfer contract accepts.

### Market Anchor
Current XRP/FXRP holders already move value from an XRPL wallet into FXRP and face irreversible wrong-recipient and wrong-amount failures. This product protects the transfer they already intend to make; it does not create a new actor or marketplace.

### Named Buyer
Self-custodied XRP holder who has minted, or is preparing to mint, FXRP.

### Existing Workflow
The holder mints FXRP, manually checks an address and amount, then submits a transfer or target call.

### Pain in ordinary language
One copied address or extra zero can send money somewhere the holder cannot recover it.

### Current Substitute
Manually compare addresses, use a wallet warning, send a small test payment, or maintain a visible allowlist.

### Why the buyer switches
The recipient relationship and personal limit stay private, while the guard is enforceable rather than another warning the holder can click through.

### Reachable First Five Users
Recruit five existing self-custodied XRP holders from current XRP/Flare community channels, screening only for control of an XRPL wallet and an actual FXRP send they are willing to replay with a small test amount. No institution, integration partner, or invented budget is required.

### Product Experience
The holder creates a private recipient rule and per-send or period limit, authorizes a bounded FXRP amount, and pastes the intended recipient. The screen returns `APPROVE`, `DENY_RECIPIENT`, or `DENY_LIMIT`; only `APPROVE` enables the FXRP send. The holder can revoke the rule without revealing it.

### Judge-visible Private Fact → Necessary FXRP Consequence
The judge privately enters a recipient membership fact and amount cap, then tries one matching and one nonmatching send. The matching fact produces a signed approval and an FXRP transfer; changing the hidden fact produces a denial and no transfer. The receipt reveals the decision, policy version, amount, and transaction status—not the private allowlist.

### Interoperable Asset Primitive
Real FXRP transfer from holder-controlled funds, optionally reached through XRPL-authorized Smart Account execution. FXRP is not interchangeable here: the user journey begins with XRP ownership and continues through the live XRP-to-FXRP lifecycle.

### Confidential Compute Primitive
FCC/FCE evaluates the private recipient rule and limit against the proposed transfer. It exposes only a signed action code, bounded amount, recipient commitment, nonce, expiry, and policy version.

### Disclosure Boundary, Machine Status, and Verification
Recipient labels, relationship data, full allowlist, and remaining personal limit remain inside the confidential boundary. The UI labels the machine as simulated, registered, or attested according to what is actually live. The transfer contract verifies the machine signature, policy version, nonce, expiry, recipient commitment, and approved amount before moving FXRP.

### Authority and Integration Map
Holder authors private rule → holder grants a revocable, amount-bounded FXRP authorization → FCC evaluates the holder's proposed send → verifier contract accepts or rejects the signed result → holder-controlled contract transfers FXRP → receipt. No operator gains independent spending authority.

### Joined Proof Path
Holder proposes send → FXRP and authorization state are read → FCC evaluates private membership and cap → signed result is verified onchain → approved FXRP transfer executes or denied transfer remains untouched → before/after balances and decision receipt are shown.

### Independent Removal Tests
- Remove FXRP/Smart Account execution: there is no XRP-native value consequence, only a private address checker.
- Remove FCC/FCE: the private relationship and cap must become public or the contract cannot enforce them.

### Failure Safeguard
Unknown machine, expired policy, reused nonce, signature failure, unavailable FCC, or mismatch between approved and submitted call fails closed; funds remain under holder control.

### 90-second Judge Proof
Set hidden recipient rule → authorize test FXRP → approve and execute the matching send → alter only the private membership fact → show the second send denied → open signed decision plus exact FXRP before/after receipt.

### Self-Rejection Check
Passes only if the contract truly requires the confidential signature and moves real FXRP. Reject if reduced to a backend-held allowlist, an advisory warning, a generic ERC-20 demo, or a fictional compliance officer.

---

## 2. Mint Intent Rescue

### One-line concept
A holder commits a private destination and recovery preference before sending XRP; if the mint journey is delayed or resumed, FCC reconciles that private intent with FDC-observed payment and releases the resulting FXRP only to the holder-authorized destination or recovery pocket.

### Market Anchor
XRP holders already enter FXRP through direct mint or a Smart Account, while proof delays, abandoned screens, stale calls, and target failures can separate the source payment from its intended use.

### Named Buyer
Self-custodied XRP holder performing a direct FXRP mint or XRPL-authorized Smart Account entry.

### Existing Workflow
The holder sends XRP, waits for proof and mint completion, then manually resumes and deploys FXRP into the originally intended destination.

### Pain in ordinary language
After money has left the XRP wallet, a delay or failed screen can make the holder unsure where the resulting FXRP will land or what to do next.

### Current Substitute
Keep the tab open, save transaction details, ask support, or manually restart the downstream transfer after mint completion.

### Why the buyer switches
The recovery choice is committed before the risky step, stays private, and remains enforceable when the user returns after a delay.

### Reachable First Five Users
Recruit five existing XRP holders who are already willing to test the XRP-to-FXRP entry journey through XRP/Flare community channels. Each uses their own wallet and self-authored recovery choice; no support desk or agent role is assumed.

### Product Experience
Before payment, the holder privately chooses a destination commitment, maximum amount, expiry, and owner-controlled fallback pocket. After FDC confirms the XRP payment and the FXRP lifecycle reaches the releasable state, FCC returns `ROUTE_PRIMARY`, `ROUTE_FALLBACK`, or `ABSTAIN`. The contract can perform only the signed route.

### Judge-visible Private Fact → Necessary FXRP Consequence
The judge privately chooses whether a late mint should still use the primary destination or fall back after expiry. With the same public payment evidence, changing that hidden recovery fact changes where the FXRP is released. The public receipt reveals the selected route class and FXRP destination commitment, not the unrevealed alternative or intent notes.

### Interoperable Asset Primitive
FDC-confirmed XRP payment plus a real FXRP mint/release and, where used, XRPL-authorized Smart Account call. The XRP-origin proof and FXRP result make another token an invalid substitute.

### Confidential Compute Primitive
FCC/FCE compares the holder's private intent, amount bound, expiry preference, and fallback rule with the FDC-derived payment state and proposed release call, then signs exactly one bounded route or abstention.

### Disclosure Boundary, Machine Status, and Verification
The unused route, purpose, preference, and private amount bound stay confidential. The product explicitly labels whether FCC is simulated, registered, or attested. The release verifier checks the signed payment reference commitment, route commitment, maximum amount, expiry, nonce, and policy version.

### Authority and Integration Map
Holder commits intent and signs XRP payment → FDC proves payment state → standard FAssets path produces releasable FXRP → FCC selects within holder-authored routes → verifier contract releases to primary or holder fallback → receipt. The app neither controls native FAssets assignment nor invents recovery authority.

### Joined Proof Path
Private intent commitment → XRP payment → visible FDC request/proof timing → FXRP mint/releasable state → FCC signed route → verified FXRP release → source payment, proof, destination, and balance receipt.

### Independent Removal Tests
- Remove FDC/FAssets/FXRP: there is no external payment to reconcile and no XRP-derived asset to recover.
- Remove FCC/FCE: both routes and the decision rule must be public, or a backend can arbitrarily choose the destination.

### Failure Safeguard
Conflicting payment proof, amount above commitment, expired result, machine failure, unknown policy, or destination-call mismatch yields `ABSTAIN`; FXRP remains in the holder-controlled fallback state.

### 90-second Judge Proof
Commit two hidden recovery choices in turn → replay one FDC-confirmed payment fixture or live staged payment with honest status → show primary release before expiry → change the private expiry preference → show fallback release/abstention → display linked XRP proof and FXRP receipt.

### Self-Rejection Check
Reject if payment evidence is merely decorative, if FCC only recommends a route, if the fallback is app-controlled, if ordinary encrypted storage could replace contract verification, or if the demo swaps in an unrelated token.

---

## 3. Quiet Yield Exit

### One-line concept
An FXRP holder privately sets the conditions under which their deployed FXRP must unwind; FCC produces the only signed exit authorization the holder's bounded vault adapter will accept.

### Market Anchor
Current FXRP holders already deploy circulating FXRP into existing strategies. Their personal loss tolerance, liquidity need, and exit timing are naturally private, while failed or delayed exits are a real holder concern.

### Named Buyer
Self-custodied FXRP holder with FXRP already deposited in an existing strategy or vault.

### Existing Workflow
The holder watches a position, decides when risk is no longer acceptable, manually withdraws, and checks whether FXRP returned.

### Pain in ordinary language
The holder must either reveal the point at which they plan to exit or keep watching and risk reacting too late.

### Current Substitute
Public stop settings where available, wallet alerts, spreadsheets, manual monitoring, or a generic automation backend.

### Why the buyer switches
The exit boundary remains private and the outcome is an enforceable unwind, not an alert that still depends on the holder being online.

### Reachable First Five Users
Recruit five existing FXRP holders from XRP/Flare community channels who already use, or are actively evaluating, an FXRP strategy. The pilot uses their own small positions and self-selected rules; it assumes no treasury, manager, or paid partnership.

### Product Experience
The holder deposits through a revocable, strategy-specific adapter and privately defines a risk boundary, minimum FXRP-to-recover, expiry, and degraded-mode preference. FCC evaluates the private policy against the exact proposed unwind state and signs `EXIT_UP_TO`, `HOLD`, or `ABSTAIN`. Only `EXIT_UP_TO` can call the adapter.

### Judge-visible Private Fact → Necessary FXRP Consequence
The judge sets a hidden minimum acceptable recovery amount. Against the same visible position state, one private value permits the unwind and returns FXRP; a stricter private value yields `HOLD` and leaves the position unchanged. The receipt reveals action code, authorized bound, and resulting FXRP balance—not the threshold itself.

### Interoperable Asset Primitive
Actual FXRP deposit and withdrawal through a holder-bounded strategy adapter, with XRPL-linked Smart Account authorization available for entry. FXRP is essential because the product completes the deployed FXRP lifecycle back to holder-liquid FXRP.

### Confidential Compute Primitive
FCC/FCE runs the holder's private exit policy and counterfactual check over the proposed withdrawal result, then signs a time-bounded maximum action. Contract verification makes the result causal.

### Disclosure Boundary, Machine Status, and Verification
Personal risk tolerance, liquidity need, exact threshold, and unused policy branches remain confidential. The UI distinguishes simulated evaluation from registered/attested execution. The adapter verifies machine signature, vault and FXRP addresses resolved for the active deployment, policy version, state commitment, amount bound, nonce, and expiry.

### Authority and Integration Map
Holder deposits FXRP and grants adapter-specific bounded authority → public position state plus private holder rule enter FCC → FCC signs exit/hold/abstain → verifier adapter may withdraw only the approved amount to holder → FXRP balance receipt. No service can redirect proceeds.

### Joined Proof Path
Holder authorization → real FXRP position → confidential counterfactual exit evaluation → signed result → verified unwind or hold → exact position and holder FXRP before/after receipt.

### Independent Removal Tests
- Remove FXRP position action: the product becomes a private risk calculator with no recovery outcome.
- Remove FCC/FCE: the threshold is public or a trusted backend decides whether the vault exits.

### Failure Safeguard
Stale position commitment, route disappearance, output below the signed bound, expired policy, unavailable machine, or transaction simulation mismatch causes abstention; the adapter cannot improvise another strategy or recipient.

### 90-second Judge Proof
Deposit test FXRP → enter hidden recovery threshold → run the same exit quote under two private thresholds → execute the permitted unwind → show the denied branch and exact returned-FXRP receipt → display machine/evidence status honestly.

### Self-Rejection Check
Reject if FCC emits only a dashboard score or notification, if the adapter can exit without its signature, if a generic token position proves the demo, or if an invented portfolio manager supplies the policy.

---

## 4. Private Mint Split

### One-line concept
An XRP holder privately chooses how newly minted FXRP should be split between liquid FXRP and one existing FXRP strategy; FCC signs the only allocation the Smart Account can execute.

### Market Anchor
XRP holders already mint FXRP and then decide how much to keep liquid versus deploy. Portfolio context and intended strategy size are naturally private, and a mistaken allocation can leave too little available for the holder's near-term use.

### Named Buyer
Self-custodied XRP holder entering FXRP and planning immediate first use.

### Existing Workflow
Mint FXRP, wait for completion, manually calculate a split, then submit a second deposit while leaving the remainder in the wallet.

### Pain in ordinary language
The holder must expose or repeatedly calculate how much they can safely lock up, and a bad split can leave them short.

### Current Substitute
Calculator or spreadsheet, a public vault deposit amount, manual two-step execution, or a wallet's generic percentage buttons.

### Why the buyer switches
One holder-authorized journey preserves a private reserve requirement and makes it impossible for the target call to deploy more than the confidential decision allowed.

### Reachable First Five Users
Recruit five current self-custodied XRP holders through XRP/Flare community channels who intend to try FXRP entry and one existing strategy. They provide only their own reserve preference and funds; the concept assumes no advisor, allocator, or special data feed.

### Product Experience
The holder privately enters a reserve floor, allocation ceiling, and selected existing strategy, then signs the XRP/Smart Account intent. Once FXRP is available, FCC signs `KEEP` and `DEPLOY` amounts whose sum is bounded by minted FXRP. The Smart Account executes that exact split atomically or not at all.

### Judge-visible Private Fact → Necessary FXRP Consequence
The judge privately changes only the reserve floor. The same minted FXRP balance then produces a different signed deploy amount and a visibly different liquid-FXRP remainder. The receipt discloses the executed split and policy version because those are necessary for settlement, but not the wider portfolio context or reason for the reserve.

### Interoperable Asset Primitive
XRPL holder authorization through a Flare Smart Account, XRP-to-FXRP lifecycle evidence, and actual FXRP allocation into an existing strategy. A generic asset cannot reproduce the source-chain authorization plus FXRP mint-and-use journey.

### Confidential Compute Primitive
FCC/FCE computes the bounded split from private reserve and exposure constraints, binds it to the available FXRP state and exact call bytes, and signs the minimum settlement instruction.

### Disclosure Boundary, Machine Status, and Verification
Portfolio context, reserve rationale, full exposure ceiling, and rejected alternatives remain private. Live UI states distinguish simulated, registered, and attested computation. The Smart Account target verifier checks machine signature, minted-balance commitment, exact call hash, keep/deploy amounts, selected strategy, nonce, policy version, and expiry.

### Authority and Integration Map
XRPL owner signs bounded intent → proof/executor path activates owner-controlled Smart Account → available FXRP state and private constraints enter FCC → verifier accepts exact signed split → FXRP remains liquid and/or deposits into the holder-selected existing strategy → receipt. The executor cannot change strategy, amount, or recipient.

### Joined Proof Path
XRPL authorization → FXRP available → private split computation → signed call-bound result → verified FXRP keep/deploy action → wallet remainder, strategy deposit, and transaction receipt.

### Independent Removal Tests
- Remove Smart Account/FXRP lifecycle: it becomes an ordinary portfolio calculator detached from XRP entry.
- Remove FCC/FCE: the reserve policy becomes public or the split is chosen by an untrusted backend.

### Failure Safeguard
Nonce conflict, changed call bytes, insufficient FXRP, stale balance commitment, unavailable executor, unknown machine, or expired result aborts the entire split and leaves FXRP in the holder-controlled account.

### 90-second Judge Proof
Authorize one XRP-to-FXRP intent → privately enter reserve floor → show FCC-signed split → execute keep/deploy → repeat with a different hidden floor → show changed real FXRP allocation and linked authorization/computation/transaction receipts.

### Self-Rejection Check
Reject if the split is advice the user may override, if privacy is only database encryption, if the strategy accepts deposits without the verified FCC result, if a non-FXRP token can stand in, or if an invented advisor chooses the allocation.
