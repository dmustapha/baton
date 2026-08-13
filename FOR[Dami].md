# FOR[Dami]: Flare Summer Signal Intel

## 1. What This Project Does

This workspace turns the Flare Summer Signal hackathon into a decision-ready evidence base. It explains the rules, Flare technology, current competitors, technical risks, and idea categories that are already too crowded. You use it to choose a product direction with a real chance of winning before committing build time.

## 2. Vocabulary

**Flare**
An EVM-compatible Layer 1 designed around external data, external assets, and cross-chain execution. In this hackathon, deploying ordinary Solidity to Flare is not enough. The product must use a Flare capability meaningfully.

**Coston2**
Flare’s main dApp testnet, with chainId `114`. It is the default place to deploy judge-runnable contracts without risking mainnet funds.

**Songbird**
Flare’s canary network, with chainId `19`. Protocol upgrades usually reach Songbird before Flare Mainnet, so it matters for FCC rollout claims.

**FTSOv2**
Flare Time Series Oracle v2. It provides decentralized data feeds with values available near each Flare block. A product should consume the value in a load-bearing decision, not merely display it.

**FDC**
Flare Data Connector. It turns external-chain events and some Web2 JSON data into proofs that a Flare contract can verify.

**FAssets**
Flare’s over-collateralized system for representing assets from chains that do not natively support EVM smart contracts. FXRP is the first major live example.

**FXRP**
The FAsset representation of XRP on Flare. It lets XRP participate in Flare DeFi while remaining redeemable through the FAssets lifecycle.

**FCC**
Flare Confidential Compute. It connects Flare contracts to Trusted Execution Environments for private or complex offchain computation whose signed results can be checked onchain.

**FCE**
Flare Compute Extension. A custom application that runs inside the FCC TEE framework.

**TEE**
Trusted Execution Environment. A hardware-isolated compute environment that can attest to the code and state it runs. A normal server with encryption is not automatically a TEE.

**Protocol Managed Wallet**
An FCC system application that manages multisignature keys inside TEEs and signs transactions for external chains such as XRPL or Bitcoin.

**Flare Smart Account**
A Flare account controlled through XRPL authorization. It lets a user initiate Flare activity from an XRPL wallet without learning a separate EVM signing flow.

**Contract Registry**
Flare’s onchain directory for current protocol addresses. It prevents integrations from silently breaking when mutable protocol contracts move.

**Admiralty source rating**
The evidence notation used in the research brief. The letter rates source reliability and the number rates claim credibility. `[A1]` is strong official and corroborated evidence. `[C3]` is useful community evidence that still needs caution.

**BLUF**
Bottom Line Up Front. Each analytical section states the conclusion first, then evidence, confidence, and strategic consequence.

**Kill list**
Ideas rejected before Warroom because they are saturated, depend on broken assumptions, are already built, or have no meaningful track alignment.

**PULSE**
The rolling pipeline context file. Later skills read it to learn verified facts, decisions, assumptions, blockers, and what the next phase must do.

## 3. How the Workspace Is Organized

`config.json` is the structured event manifest. Pipeline skills read it for the deadline, prizes, tracks, network, requirements, integrations, judges, and planning weights.

`intel-state.json` is the execution ledger. It records which intel phases completed, when they completed, what evidence proves completion, which sources were consulted, and which gaps remain.

`research/research-brief.md` is the human decision document. It converts raw event and ecosystem data into conclusions, competitor threats, technical hazards, strategic whitespace, and a kill list.

`pipeline-log.md` is append-only operational history. It records when a pipeline skill starts, completes, or blocks.

`PULSE.md` will carry the handoff from Intel into Warroom and every later phase. It is shorter than the research brief and contains only facts and decisions that downstream work must retain.

The main data flow is: primary and community sources enter Intel, Intel normalizes stable facts into `config.json`, records execution in `intel-state.json`, synthesizes decisions in the research brief, and writes a compact handoff into PULSE. Warroom then uses the research brief and kill list to generate and score ideas.

## 4. Prompting Tips for This Workspace

1. Say “use the Flare Summer Signal active brief and research brief” when starting a new pipeline phase. This prevents a later skill from falling back to generic Flare knowledge.
2. Ask for “load-bearing Flare integration.” This forces the agent to explain what stops working if FTSO, FDC, FAssets, Smart Accounts, or FCC is removed.
3. Name the exact track. “Interoperable Asset Products” and “Confidential Compute Apps” have different proof standards even when one product targets both.
4. Ask for a competitor collision check against dorr, WhisperDesk, Heirloom, fassets-verify, Faktura, Buta, AegisFlow, Adumbra, and BridgeSafe before approving an idea.
5. When discussing FCC, specify whether the claim is simulated TEE, independently attested TEE, registered FCE, Songbird FCC, or production Flare FCC. Those are not interchangeable.
6. For a technical bug, include network, chainId, RPC, contract address, transaction hash, failing command, and whether the failure occurs before request submission, during attestation, or during onchain verification.
7. Ask the agent to preserve Admiralty tags when updating research. Removing `[A1]` or `[C3]` destroys the confidence context.
8. Use “show the three-minute judge path” when evaluating a feature. If the value cannot be proved quickly, it is likely too broad for this event.

## 5. Domain Knowledge

### How Flare’s primitives fit together

FTSO answers “what is the current value?” FDC answers “did an external fact happen?” FAssets answers “how can an external asset become programmable on Flare?” Smart Accounts answer “how can an XRPL user authorize Flare execution?” FCC and Protocol Managed Wallets answer “how can private computation or external signing be executed and verified?”

The strongest products combine only the primitives required by one user outcome. Misunderstanding this produces sponsor-tech soup: many logos with no coherent mechanism.

### How FDC proofs affect product design

FDC is not a synchronous web API call that instantly returns a trusted answer. Requests enter a voting and proof lifecycle, and the result must be fetched and verified by a contract. The UI needs progress states, retry behavior, and staged demo data.

If this is misunderstood, a judge sees a spinner or timeout and assumes the product is broken.

### How FCC trust differs from ordinary hosting

FCC trust comes from reproducible code, attested TEE identity, registration, instruction authorization, and onchain verification of signed results. A server that says “I ran inside a TEE” is not sufficient proof.

If this is misunderstood, the entire privacy claim becomes marketing rather than verifiable architecture.

### How FAssets differ from a normal bridge token

FAssets use collateral, agents, FTSO values, and FDC payment proofs to keep the representation redeemable. The product must account for mint, transfer, redeem, default, and recovery states, not only an ERC-20 balance.

If this is misunderstood, the demo can claim real XRP utility while using only a mock token or ignoring the underlying settlement lifecycle.

### How the source-rating system protects decisions

Official documentation can establish a network fact. A competitor README can establish what that repository claims, but not that the claim is independently true. A GitHub issue can expose real friction, but one issue does not prove every builder has the same problem.

If this is misunderstood, the team either trusts weak claims too much or discards useful early signals completely.

## 6. Gotchas and Non-Obvious Behavior

**The official event page can fail intermittently**
What it looks like: One failed automated request means the event data is inaccessible.
What actually happens: Earlier requests hit WAF or network failures, while a later request exposed the Nuxt event model and roster API.
How to avoid it: Preserve verified API pages, retry boundedly, and reconcile the platform's declared count against collected unique records.

**The platform cutoff and our safety cutoff are different**
What it looks like: “August 14” sounds complete.
What actually happens: The DoraHacks event model closes at 19:59 UTC, but relying on the final minute creates avoidable packaging risk.
How to avoid it: Treat 17:59 UTC as the internal submission deadline and 19:59 UTC as the hard platform cutoff.

**The Grid reports zero Flare-tagged products**
What it looks like: The Flare ecosystem is empty.
What actually happens: Broad search finds Flare, FTSO, FAssets, and FDC, so the zero reflects taxonomy coverage.
How to avoid it: Use event repositories and Flare primary sources for saturation decisions.

**FCC can be buildable without being fully public production infrastructure**
What it looks like: A getting-started guide means production readiness.
What actually happens: Flare explicitly says FCC is still in final development.
How to avoid it: Label simulated, canary, registered, and production claims precisely.

**Public Coston2 RPC has a 30-block log cap**
What it looks like: A larger indexer range should only be slower.
What actually happens: It can write zero rows, retry, and appear hung.
How to avoid it: Keep `log_range = 30` and monitor indexer state rows before starting the proxy.

## 7. Debugging Guide

### Debugging event facts

Working signal: `config.json` parses and each fact has a corresponding source in the research brief.

Common failure: Event mirrors disagree on deadline or schedule.

Diagnosis: Compare the official event page, official Flare announcement, and the newest indexed copy. Trace whether secondary pages copied one original.

Usual fix: Keep the highest-reliability, newest source and record the contradiction instead of deleting it.

### Debugging the intel state

Working signal: `jq empty config.json intel-state.json` succeeds, `phases_complete` matches the phase ledger, and every ledger entry has evidence.

Common failure: State says complete while an artifact is missing.

Diagnosis: Run `ls -la` on the three required artifacts and inspect the final phase ledger entry.

Usual fix: Return the state to `in-progress`, regenerate or verify the artifact, and append a new ledger entry.

### Debugging source coverage

Working signal: Required sections contain Admiralty tags and every major claim links to a source.

Common failure: A strategic claim is supported only by a competitor README.

Diagnosis: Check whether the source proves the underlying mechanism or only the competitor’s claim.

Usual fix: Downgrade confidence or add independent chain, documentation, or explorer evidence.

### Debugging competition density

Working signal: The DoraHacks API count equals the unique roster count, each disclosed GitHub account is paginated fully, and the registry distinguishes concepts, deployments, and proof quality.

Common failure: Exact-event search misses repositories, while duplicate handles, support repos, and project variants inflate counts.

Diagnosis: Compare owner, description, commit history, deployment addresses, and concept overlap.

Usual fix: Start from the registered roster, validate every profile's repository count, reconcile variants manually, and label the result as public signals rather than formal submissions.

### Debugging Flare integrations later

Working signal: The exact contract call or transaction succeeds on the named network and chainId.

Common failures: Wrong network, stale feed, hardcoded protocol address, FDC request drift, FCC indexer not caught up, or RPC 429.

Diagnosis: Check chainId, resolve through Contract Registry, inspect request and proof round, query indexer state, and reduce RPC concurrency.

Usual fix: Correct the network configuration first, then the protocol-specific failure. Do not patch around an incorrect chain assumption.

## 8. Mistakes Log

No entries yet. Future sessions will add entries here.

## 9. Quizzes

### Conceptual

1. Why is a live FTSO price dashboard weaker than a contract whose settlement depends on a fresh FTSO price?
2. Why can an independently hosted TEE service not automatically claim official FCC trust?
3. Why is exact-event GitHub search not a complete view of competition?

### Practical

1. An idea is a sealed-bid FXRP OTC desk with FCC matching. What should you do before scoring it?
2. The FDC demo takes more than a minute and the judge sees no progress. What should the product change?
3. An FCC proxy exits with no indexer state and deployment calls return 429. What should you inspect first?

### Artifact reading

1. Read `config.json` lines 13 to 27. Which submission requirement prevents a generic EVM port from being competitive?
2. Read `research/research-brief.md` lines 10 to 21. Which evidence turns the recommendation from generic advice into event-specific strategy?

### Answer key

1. The dashboard only displays Flare data. Load-bearing settlement proves that removing FTSO changes or breaks the product outcome.
2. FCC trust requires the official instruction, attestation, registration, identity, and onchain result-verification chain. Hosting technology alone does not prove that chain.
3. Repository names and READMEs often omit the event name. Roster-first enumeration expanded 27 exact-search hits into 99 likely-current public or profile signals across participant accounts.
4. Reject or materially differentiate it because Veil, Faktura, SealedFi, UMBRA, Buta, Adumbra, and multiple other entries already occupy that concept cluster.
5. Show explicit request, voting, proof-ready, verification, and retry states. Pre-stage a known request for the judge path without faking the live mechanism.
6. Confirm `log_range = 30`, wait for the indexer state rows, reduce RPC concurrency, and only then restart the proxy or deploy tooling.
7. The requirement to explain meaningful Flare use, reinforced by the explicit required integration, means deployment alone is not sufficient.
8. The complete roster coverage, named proof quality, judging criteria, and official FCC production caveat support a concrete kill list and whitespace recommendation.

## 10. What the Corrective Roster Audit Changed

The first pass searched GitHub for the event name and found 27 repositories. That answered “which repositories explicitly name the event,” not “what are all registered builders working on.” The corrected method treated DoraHacks registrations as the population, then walked outward through every disclosed GitHub identity.

The audit reconciled 577 of 577 registrations, found 487 GitHub disclosures, normalized them to 484 unique valid handles, resolved 475 profiles, and enumerated all 26,519 public repositories. Repository totals were checked against each profile and produced zero count mismatches. Metadata filters advanced 153 README candidates; current-period commits, contributors, languages, profile statements, duplicate handles, support repositories, and project variants were then reconciled.

The result is 99 likely-current public or profile signals: 87 repository projects, four projects recovered from profiles, and eight profile-only signals. This is not a submission count. Private repositories, 90 participants without a disclosed GitHub account, nine unresolved handles, late pivots, and abandoned projects remain outside direct visibility.

Strategically, the obvious market is more crowded than the first pass showed. FAssets access and routing, risk tooling, payments, confidential trading, general confidentiality, agent automation, and credit all contain multiple competitors. The best current whitespace is operational: FCC lifecycle observability, PMW safety controls, FAssets exception recovery, and reusable cross-primitive integration testing.

The reusable lesson is simple: query-first research discovers named projects; roster-first enumeration measures the registered competitive field. For DoraHacks Intel Depth 10, the second method is mandatory.

## 11. Why Competitor Intel Must Generate Ideas

A competitor registry can answer two different questions. The defensive question is “has someone already built this?” The generative question is “what has this field proved, what mechanisms are portable, and which valuable outcomes remain unfinished?” Using only the defensive question throws away most of the intelligence.

The previous Warroom structure made that mistake mechanically: all generators received the kill list, but only one received the competitor landscape. The corrected flow first converts the full corpus into an opportunity map containing users, jobs, mechanisms, asset lifecycles, confidential operations, proof patterns, strengths, missing outcomes, and failure states. Every generator receives that same map. Collision checking happens only after an idea has been derived from the evidence.

For Flare Summer Signal, dual-track positioning is also an architecture rule. The Interoperable Asset integration must cause a real asset action. The Confidential Compute integration must create a necessary privacy, authorization, policy, or execution guarantee. Removing either must break the core outcome. Otherwise, the second track is only a submission label.

The joined proof should read as one causal story: an external or FAsset state enters the system, a necessary confidential computation decides or authorizes what happens, an asset action executes, and the judge receives an exact transaction and trust-boundary receipt.
## 12. Warroom Result: Why Only Two Ideas Survived

The Warroom generated 20 ideas before seeing any competitor names, saturated categories, prior projects, or differentiation prompts. That ordering matters: it let the 99-signal field teach us useful mechanisms before it constrained us.

After synthesis, the strict gates exposed a recurring trap. Many attractive Flare ideas could diagnose a stuck FAsset state, but the proposed app did not control a real protocol repair action. If the central correction had to be simulated, the Interoperable Asset integration was not load-bearing enough.

Mandate Zero survived because its two primitives form one small state machine. An XRPL-authorized Smart Account custom instruction creates the real FXRP action, while an FCC result is the only input a MandateVault accepts to recreate expired authority. SplitLock is more ambitious, but its PMW builder path is not publicly documented and its correct network is Songbird, making it a risky choice under the deadline.

No winner has been selected. Warroom is paused at Dami's choice, and no Forge or implementation work has begun.

## Warroom Round 2: why these finalists survived

Round two tested 35 fresh ideas in two blind batches. The generators saw the same anonymized evidence from all 99 public signals, but they did not see named competitors, prior projects, familiar standards, or kill lists. Only after each batch was hashed and frozen did the hard gates run.

Most ideas died for one of two reasons. Some promised an asset action Flare does not expose publicly, such as changing a mistagged FXRP recipient or using a PMW without a builder interface. Others were buildable but became ordinary escrow, refund, credit, insurance, auction, or authorization products when Flare names were removed.

Exit Relay survived because the confidential result does not merely score a provider. It automatically changes the same provider's next application-controlled FXRP tranche and reroutes the withheld asset. Its key boundary is that it controls our router, not FAssets protocol capacity.

Forget-to-Redeem survived because the XRP payout and privacy completion are separate public states. The payout can finish while an application privacy bond stays locked until the confidential machine attests capsule consumption. Its key boundary is that this is not proof that every copy vanished and does not delay FAssets redemption finality.

The present decision is product taste: Exit Relay is clearer and safer to deliver; Forget-to-Redeem is stranger and more Flare-native, but harder to explain and prove honestly.

## Warroom Single-Track Result: Why There Is No Finalist

The corrected single-track search ran two more blind rounds, 20 ideas each. Every idea had the required schema and was evaluated only after its source file was frozen. Round 5 and Round 6 each ended at 0 survivors.

This does not mean Flare lacks useful product opportunities. It means the available evidence did not support a product that simultaneously had a real buyer and workflow, complete authority over every external transition, a material Interoperable Asset outcome, independent mechanism novelty, a credible live demo, and one-builder scope.

The recurring distinction is between a **callable fragment** and an **integrated product**. A native liquidation, redemption, challenge, vault call, or Smart Account instruction can be real while the added wrapper still lacks buyer demand, application authority, correct asset accounting, or a novel outcome. Familiar thresholds, harvests, stop-losses, keeper bounties, guards, and receipts do not become new products merely because they surround FXRP.

The strongest next move is evidence-first product discovery: start with one reachable real user, observe the exact workflow and costly failure, obtain the authority and interfaces needed to change the outcome, then generate around that narrow truth. More blind batches without new market access would mostly reshuffle the same constraints.
