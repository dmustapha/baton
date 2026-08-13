# Flare Summer Signal: Research Brief

**Compiled:** 2026-08-13
**Intel Depth:** ID 10 (Deep Intelligence)
**Research window:** Information checked through 2026-08-13 08:32 UTC
**Sources:** Live DoraHacks event data and complete registered roster, Flare primary documentation, Flare governance, official ecosystem posts, participant-disclosed GitHub profiles and repositories, GitHub issues, public X signals, The Grid

## Executive read

**BOTTOM LINE:** This is a two-track, product-oriented Flare hackathon with a $12,000 pool and an exact DoraHacks cutoff of August 14, 2026 at 19:59 UTC. Both tracks are exceptionally crowded. A complete audit of all 577 registered hackers found 99 likely-current public-repository or profile-disclosed project signals, compared with only 27 repositories found by exact-event search. The bar is a working, proof-rich product with a load-bearing Flare integration. [A1] [A2] [C2]

**EVIDENCE:**

- The event offers $6,000 for Interoperable Asset Products and $6,000 for Confidential Compute Apps. Each pays $4,000 for first and $2,000 for second. [A1]
- Indexed event text lists product usefulness, Flare integration quality, technical execution, evidence of new work, and clarity plus future potential as the judging criteria. No official weights are published. [A1]
- The DoraHacks roster API returned 577 registrations. Collection reconciled 577 unique registration records with no pagination mismatch. [A2]
- 487 participants disclosed GitHub data. The audit normalized 484 valid unique handles, resolved 475 accounts, enumerated all 26,519 public repositories, and reconciled every resolved account's repository count with zero mismatches. [A2] [C2]
- Metadata, README, current-period commit, contributor, language, and participant-profile evidence produced 87 likely-current repository projects, four additional repositories recovered only through profile disclosures, and eight detailed profile-only or unlinked signals. [C2]
- The strongest projects show live applications, verified Coston2 or Flare Mainnet contracts, exact transactions, adversarial tests, real FDC and FAssets lifecycles, and explicit mock or trust-boundary disclosures. [C2]
- Flare says FCC is still in final development and is not yet a fully public production system. This creates both differentiation potential and substantial delivery risk. [A2]

**CONFIDENCE:** High on tracks, prizes, deadline timestamp, multi-track entry support, technology, roster coverage, and public competition. Medium on judge identities, team-size limit, private work, final eligibility, and prize stacking because those facts are not exposed by the public roster or event configuration.

**SO WHAT:** Do not enter with a generic oracle dashboard, AI yield sentinel, FXRP vault, inheritance vault, payroll app, compliance screen, sealed-bid market, dark pool, or private OTC desk. Those concepts already have public implementations. Target a real product gap that uses Flare Smart Accounts, Protocol Managed Wallets, FCC operations, or an unresolved FAssets lifecycle problem, then prove it with a live transaction and a short reproducible path.

## Overview

| Field | Value |
|---|---|
| Name | Flare Summer Signal |
| Organizer | Flare |
| Platform | DoraHacks |
| Format | Open online hackathon |
| Development opens | June 29, 2026 |
| Final submission cutoff | August 14, 2026 at 19:59 UTC, from DoraHacks `timelineEnd` |
| Judging | August 15 to 21, 2026 |
| Winner ceremony | August 24, 2026 |
| Prize pool | $12,000 |
| Tracks | Interoperable Asset Products; Confidential Compute Apps |
| Primary chain | Flare |
| Recommended dApp testnet | Coston2, chainId 114 |
| Telegram | https://t.me/+5Vn6ZKhr6KI3NjIx |
| Team limit | Not published in accessible sources |
| Registered hackers | 577 at the 2026-08-13 roster snapshot |
| Multi-track entry | Enabled by DoraHacks; bounty selection limit is 10 |

Source assessment: the schedule, tracks, prizes, requirements, hacker count, exact platform cutoff, and multi-track configuration were extracted from the live DoraHacks event model. Flare Dev Hub announcements corroborate the public program. [A1]

### Submission requirements

Each submission should include: [A1]

- **Project identity:** Project name and selected bounty or bounties.
- **Product:** Short description and target user.
- **Proof:** Demo link, video, or working application link.
- **Technical evidence:** GitHub repository or equivalent materials.
- **Flare integration:** Clear explanation of how Flare is used and why it is load-bearing.
- **New work:** Clear separation of what was newly built, ported, integrated, or improved during the program.
- **Deployment:** Contract addresses or relevant deployment details where applicable.
- **Continuation:** Short roadmap or next steps.

Teams are encouraged to state whether the product is deployed on Coston2, Songbird, or Flare Mainnet and to show user testing, distribution work, community interest, pilot users, partner conversations, or traction. These are not stated as hard requirements, but they directly support the judging criteria. [A1]

## Demo Video Requirements

| Field | Value |
|---|---|
| Max length | No explicit limit found |
| Formats | No explicit format restriction found |
| Platform | No specific video platform required in accessible sources |
| Content notes | A demo link, video, or working app link is required |

**BOTTOM LINE:** A video is one accepted proof format, not the only accepted proof format. A live application with a concise video is the strongest interpretation of the rules. [A1]

**EVIDENCE:** The live event description says “Demo link, video, or working app link” and emphasizes whether the demo works. DoraHacks configuration does not make a video URL or repository URL a platform-level mandatory field. [A1]

**CONFIDENCE:** High for the current event configuration. Recheck immediately before submission because platform fields can change.

**SO WHAT:** Prepare both a live demo and a 2 to 3 minute recorded proof. Keep the recording short enough for a judge to finish and include one exact onchain transaction, contract address, and reproducible action.

## Submission Form Fields

The live event model reports `isEnabledSubmissionForm=false`, so no custom final form fields are currently published. The following fields are explicitly requested by the event description and remain the package checklist: [A1]

- Project name
- Selected bounty or bounties
- Short product description
- Target user
- Demo link, video, or working app link
- GitHub repository or technical materials
- How the project uses Flare
- Work newly built, ported, integrated, or improved during the program
- Smart contract addresses or deployment details
- Roadmap or next steps

**SO WHAT:** Re-open the final form before packaging and capture any newly exposed required fields. The package should already contain every item above.

## Disqualifiers

**BOTTOM LINE:** The accessible rules publish few automatic disqualifiers. The largest preventable failure is an ambiguous submission that cannot separate old work from new work or cannot show meaningful Flare use. [A1]

**EVIDENCE:**

- Final submission closes at DoraHacks timestamp `2026-08-14T19:59:00Z`. [A1]
- Existing projects are allowed, but must clearly separate prior work from hackathon work. [A1]
- Superficial Flare integration scores poorly under an explicit judging criterion. [A1]
- No accessible source publishes a team-size cap, mandatory mainnet deployment, banned library list, or minimum amount of new code. [B3]

**CONFIDENCE:** High for the live event model and published description. Medium for rules that may be added before cutoff.

**SO WHAT:** Keep an internal safety margin ahead of 19:59 UTC. Create `NEW_WORK.md`, use a clean commit boundary, and make every Flare primitive visible in the architecture and demo.

## Prizes

| Track | Place | Amount | Source confidence |
|---|---:|---:|---|
| Interoperable Asset Products | 1st | $4,000 | [A1] |
| Interoperable Asset Products | 2nd | $2,000 | [A1] |
| Confidential Compute Apps | 1st | $4,000 | [A1] |
| Confidential Compute Apps | 2nd | $2,000 | [A1] |

No micro-bounties, student prizes, workshop prizes, or sponsor side prizes were found. [B2]

## Judging Criteria

No official weights are published. The planning weights below are derived from the event’s wording and should not be presented as official. [A1]

| Criterion | Planning weight | What it means | How to score high |
|---|---:|---|---|
| Product usefulness | 25% derived | Solves a real user, developer, ecosystem, or infrastructure problem | Name the user, show the failure today, and demonstrate a complete outcome |
| Flare integration quality | 25% derived | Flare is necessary, not cosmetic | Remove Flare in the explanation and show why the product stops working |
| Technical execution | 20% derived | Demo works and architecture is credible | Live app, verified contracts, tests, failure handling, and exact chain evidence |
| Evidence of new work | 15% derived | Program work is clear and meaningful | Commit boundary, `NEW_WORK.md`, deployed changes, and before versus after evidence |
| Clarity and future potential | 15% derived | Product, user, integration, and next steps are understandable | Three-minute judge path, short roadmap, and concrete continuation signal |

**BOTTOM LINE:** Utility and Flare depth are the two decisive dimensions. This event explicitly rewards serious product work over a technology showcase. [A1]

**EVIDENCE:** The submission requirements ask for target user, new work, Flare usage, roadmap, and optional traction. Prior Flare judges also highlighted rounded products that connected technologies through Flare’s unique infrastructure. [A1] [A2]

**CONFIDENCE:** High on criterion names, medium on the derived weighting.

**SO WHAT:** The winning demo should tell one complete story: a named user suffers a costly failure, the product resolves it, and one Flare-native primitive provides proof or execution that another EVM chain cannot provide in the same way.

## Workshop Signals

| Workshop | Speaker | Topic | Strategy signal |
|---|---|---|---|
| Flare Summer Signal x Flare Africa Builder Webinar | Flare Africa team | Tracks, setup, judging, build planning | Product planning and judge fit are explicit priorities [B2] |
| Shipping on Flare: Builders & Infrastructure | Flare Dev Hub, Ankr, Tenderly | RPCs, simulation, testing, deployment | Reliability and shippability matter, not only contract logic [B2] |
| Summer Signal Office Hours | Flare mentors and ecosystem team | Ideas, architecture, blockers | Organizer feedback is available for risky FCC and FDC assumptions [B2] |
| Builder Workshop 23: From Idea to Product on Flare with AI Agents | Quantic and Flare Dev Hub | AI-assisted research, prototyping, integration | AI is presented as a build accelerator, not a standalone track [B2] |

**BOTTOM LINE:** The workshop program repeatedly emphasizes shipping, infrastructure, architecture, and product iteration. [B2]

**EVIDENCE:** Ankr and Tenderly were featured for infrastructure and simulation; office hours invited architecture questions; the AI workshop focused on turning an idea into a product. [B2]

**CONFIDENCE:** Medium because some workshop metadata is available only through indexed social posts.

**SO WHAT:** Validate RPC, indexer, FDC, and FCC dependencies before polishing UI. Ask the Telegram group one narrow question for every unresolved protocol assumption.

## Tech Deep Dive

**BOTTOM LINE:** Flare’s differentiated stack is not “EVM plus an oracle.” It combines an EVM L1, enshrined price feeds, attested external data, trust-minimized representations of non-smart-contract assets, XRPL-controlled smart accounts, and emerging TEE execution. [A1]

**EVIDENCE:**

- Flare is EVM compatible, uses Snowman++ consensus, has approximately 1.8 second blocks, and provides single-slot finality. [A1]
- FTSOv2 uses roughly 100 independent data providers, supports up to 1,000 feeds, and offers block-latency values near each 1.8 second block. [A1]
- FDC verifies external events and Web2 JSON using consensus-backed Merkle proofs. Standard rounds create a visible wait in interactive demos. [A1]
- FAssets uses FTSO and FDC to create over-collateralized representations such as FXRP that remain redeemable for the underlying asset. [A1]
- Flare Smart Accounts let XRPL users authorize actions from XRPL while execution occurs on Flare. [A1]
- FCC lets contracts issue instructions to TEE machines and verify signed results from registered machine identities. FCC is still not a fully public production system. [A2]

**CONFIDENCE:** High. These are primary Flare sources.

**SO WHAT:** Choose the primitive that creates the product, not the primitive that is easiest to mention. A price feed display is weak. A contract that changes settlement based on a fresh FTSO value is stronger. A cross-chain outcome proven by FDC or executed through FCC, PMW, or Smart Accounts is strongest when the user story requires it.

### Integration friction and time to hello world

| Primitive | Time estimate | Friction | Important gotchas |
|---|---:|---|---|
| FTSOv2 read | Under 30 minutes | Low | Resolve addresses through `ContractRegistry`; enforce freshness and decimals [A1] |
| FAssets or FXRP read and transfer | 30 minutes to 2 hours | Medium | Use live FXRP or faucet assets; do not hardcode asset-manager addresses [A1] |
| FDC proof flow | 30 minutes to 2 hours | Medium to high | Request rounds add delay; Web2Json filter support and proof endpoint choice have sharp edges [A2] [C3] |
| Flare Smart Accounts | 30 minutes to 2 hours for a guided example | Medium | Prove real XRPL authorization and Flare execution, not only UI intent encoding [A2] |
| FCC or custom FCE | More than 2 hours | High | Docker, Foundry, Go tools, HTTPS tunnel, indexer DB, reproducible image, registration, and onchain result verification [A2] [C3] |

### Confirmed technical hazards

- **FCC production status:** The official overview says FCC is not yet a fully public production system. A simulated TEE is valid for development but must not be presented as production-grade confidential execution. [A2]
- **Indexer access:** The official path references Flare indexer credentials. A community-verified self-hosted path exists, but it adds MySQL and indexer operations. [C3]
- **Coston2 log range:** The public Coston2 RPC limits `eth_getLogs` to 30 blocks. A higher indexer `log_range` can appear to hang and produce zero rows. [C3]
- **Shared RPC quota:** High indexer concurrency can starve deployment calls and produce HTTP 429 responses. [C3]
- **FDC example drift:** A Flare Viem starter example used an unsupported jq variable-binding form and a dead XRPL endpoint. [C3]
- **Raw proof endpoint:** The non-raw proof endpoint can render a large `uint64` as an imprecise JSON number; use `proof-by-request-round-raw` where documented by the working example. [C3]
- **Onchain secrecy:** Encrypting secrets and publishing the ciphertext onchain is not a durable confidentiality strategy because public ciphertext can be attacked later. [A2]
- **Address stability:** FAssets asset-manager addresses can change. Resolve them with Flare Contract Registry. [A1]

## Network / Chain Infrastructure

| Field | Value |
|---|---|
| Chain | Flare Testnet Coston2 |
| Chain ID | `114` |
| Native gas token | `C2FLR` |
| HTTPS RPC | `https://coston2-api.flare.network/ext/C/rpc` |
| WSS RPC | `wss://coston2-api.flare.network/ext/C/ws` |
| Explorer | `https://coston2-explorer.flare.network` |
| Systems explorer | `https://coston2-systems-explorer.flare.network` |
| Faucet | `https://faucet.flare.network/coston2` |
| Flare mainnet chain ID | `14` |
| Flare mainnet gas token | `FLR` |
| Songbird chain ID | `19` |
| Contract Registry | `0xaD67FE66660Fb8dFE9d6b1b4240d8650e30F6019` |
| Deploy requirement | Coston2, Songbird, or Flare Mainnet deployment is encouraged; mandatory deployment was not stated in accessible rules |

**SO WHAT:** Coston2 is the safest default for a judge-runnable dApp. FCC protocol work may also need Songbird or Coston depending on the feature. State the network and chainId next to every address.

## Ecosystem Products

| Product | Purpose | Integration depth | Notes |
|---|---|---:|---|
| FAssets and FXRP | Bring XRP into programmable finance | Core | FXRP is live and widely deployed in Flare DeFi [A1] |
| Flare Smart Accounts | XRPL-authorized execution on Flare | Core | Strong distribution and chain-abstraction signal [A1] |
| FTSOv2 | Fast decentralized data feeds | Core | Easy to integrate, therefore weak as the only differentiator [A1] |
| FDC | External-chain and Web2 attestations | Core | Powerful for cross-chain proof, but slower and operationally sharper [A1] |
| FCC and FCE | Verifiable private computation | Core | High differentiation and highest build risk [A2] |
| Firelight | FXRP staking and yield | Supporting | Existing yield surface; generic vault products are crowded [A2] |
| SparkDEX | Trading and liquidity | Supporting | Existing DeFi surface named in Flare ecosystem materials [A2] |
| Kinetic, Morpho, Mystic | Lending and borrowing | Supporting | Credit and collateral are established, so generic lending is weak [A2] |
| Upshift | Curated vault strategies | Supporting | Smart Account distribution path already exists [A2] |
| Xaman and D'CENT | XRPL wallet distribution | Supporting | Large user-access surfaces for Smart Account products [A1] |
| Ankr | RPC infrastructure | Supporting | Featured in the hackathon infrastructure workshop [B2] |
| Tenderly | Simulation and debugging | Supporting | Featured in the hackathon shipping workshop [B2] |

## Capability Sheet

**BOTTOM LINE:** The winning capability is the combination of external assets, verified data, and private execution. Single-primitive entries are easier to copy and already crowded. [A1] [C2]

- **FTSOv2:** Contract-native, approximately 1.8 second price and time-series data from roughly 100 providers. Uniqueness: feed security is enshrined in the network. [A1]
- **FDC:** Verifiable EVM, XRP, BTC, DOGE, address-validity, nonexistence, and Web2 JSON attestations. Uniqueness: external facts become contract-consumable proofs. [A1]
- **FAssets:** Over-collateralized representations of non-smart-contract assets. Uniqueness: XRP becomes a composable EVM asset without relying on a conventional centralized bridge. [A1]
- **FXRP OFT:** FXRP can move through LayerZero-compatible routes. Uniqueness: XRP liquidity can reach connected ecosystems while retaining an FAssets origin. [A2]
- **Flare Smart Accounts:** XRPL signatures authorize Flare execution. Uniqueness: users can retain the wallet and key model they already use. [A1]
- **FCC and FCE:** Registered TEE identities execute arbitrary offchain computation and sign results that contracts verify. Uniqueness: private, attestable compute is connected to Flare contract instructions. [A2]
- **Protocol Managed Wallets:** TEE-managed multisig keys assemble and sign transactions on XRPL and BTC. Uniqueness: Flare contracts can coordinate native external-chain execution. [A2]
- **Fast finality:** Approximately 1.8 second blocks with single-slot finality. Uniqueness: proof and execution pipelines can settle with low onchain latency once external attestations are ready. [A1]

## Social Intel

Manual Telegram review was not performed because the private group requires guided human access. Public X and indexed organizer signals were reviewed. Flare Dev Hub first reported more than 100 developers, then the live DoraHacks roster grew to 577. Quantic publicly highlighted Keyless and other builds and emphasized that public visibility matters, confirming that project announcements outside GitHub are a separate competitive surface. [B2] [C3]

**SO WHAT:** Manually scan Telegram for unpublished builds, organizer clarifications, and prize-stacking rules before idea lock. The roster-driven GitHub registry is the public baseline, not the ceiling, because 90 participants disclosed no GitHub and private repositories remain invisible.

## Registered-Participant GitHub Enumeration

**BOTTOM LINE:** The complete roster audit materially changes the competition estimate. Exact-event GitHub search found 27 repositories; roster-first enumeration found 26,519 public repositories across participant accounts and reduced them to 99 likely-current public or profile-disclosed project signals after evidence reconciliation. [A2] [C2]

**EVIDENCE:**

| Coverage stage | Result |
|---|---:|
| DoraHacks API registrations | 577 |
| Unique registrations collected | 577 |
| Participants with non-empty GitHub disclosure | 487 |
| Unique syntactically valid handles | 484 |
| GitHub profiles resolved | 475 |
| Unresolved handles | 9 |
| Public repositories enumerated | 26,519 |
| Per-account repository-count mismatches | 0 |
| Repositories advanced to README inspection | 153 |
| Explicit current-event repositories after README reconciliation | 58 |
| Strong current candidates | 35 |
| Likely-current repository projects after exclusions and variant merging | 87 |
| Repositories recovered only through DoraHacks profile disclosures | 4 |
| Detailed profile-only or unlinked project signals | 8 |
| Total likely-current public or profile signals | 99 |

The canonical endpoint was `https://dorahacks.io/api/v1/hub/hackathons/2234/hackers?page=N&page_size=50&include_following=true`. Every page was stored. Every resolved GitHub account was paginated through all public repositories, then checked against the profile's `public_repos` count. Candidate READMEs, current-period commits, contributors, languages, and DoraHacks interest statements were reconciled before manual exclusions. [A2] [C2]

Five repositories were excluded as support, ecosystem, or unrelated artifacts, and two Sotto/Umbra repositories from one owner were merged as one project variant. Four current projects were recovered only because participant profiles led to repositories with neutral metadata: SealedFlare, StacksBit Flare, Balary, and VeriFlow AI. [C2]

**CONFIDENCE:** High on roster and GitHub coverage counts. Medium on current-project classification because public activity does not prove a final submission, team membership, eligibility, or private strategy.

**SO WHAT:** Treat 99 as an evidence-backed public threat surface, not a submission count. Use the full [`roster-intelligence.md`](roster-intelligence.md) registry for concept collision checks. Any idea that appears novel against only exact-event search is unsafe.

## Competitor Landscape

**BOTTOM LINE:** Competition is high in both tracks and dense inside nearly every obvious product cluster. The strongest entries already provide live demos, verified Coston2 or Flare Mainnet contracts, exact transactions, failure-path evidence, and reproducible tests. [C2]

**EVIDENCE:** The complete roster audit surfaced 99 likely-current public or profile signals. The priority registry below contains the highest-consequence threats; the exhaustive 87-repository registry and profile-only appendix live in `research/roster-intelligence.md`. [C2]

**CONFIDENCE:** High that these repositories exist and contain the cited claims. Medium on final eligibility, team identity, and submission status because repository publication does not prove a completed DoraHacks submission.

**SO WHAT:** A winning direction must beat the proof bar and avoid concept overlap. Novel copy alone will not differentiate against live, verified products.

### Competitor Registry

| Project | Track | Threat | Tech | Polish and proof | Source | Confidence |
|---|---|:---:|---|---|---|:---:|
| Ballast | Interoperable assets | HIGH | Solidity, Morpho, SparkDEX, FTSOv2, Flare Mainnet | Source-verified mainnet deleveraging contracts; live-state fork tests and explicit liquidity bounds | https://github.com/dmetagame/ballast [C2] | High |
| Cinder | Both | HIGH | Solidity, FDC, FTSOv2, FXRP, XRPL, commit-reveal | Live app; exact payment and non-payment lifecycles; FXRP bond return and slashing evidence | https://github.com/0xNexuz/cinder [C2] | High |
| Backstop | Interoperable assets | HIGH | Solidity, FDC nonexistence proof, FAssets, insurance | Live redemption-default insurance with exact proof and transaction evidence | https://github.com/edycutjong/backstop [C2] | High |
| CreditGate | Both | HIGH | Solidity, Go, TypeScript, FCC, FDC, FTSO, FAssets | 141 tests, eight invariants, live Coston2 deployment, private credit eligibility | https://github.com/tommycet/creditgate [C2] | High |
| Keyless | Confidential compute | HIGH | TypeScript, Go, Solidity, XRPL, TEE policy signer | 152 current-period commits; policy-controlled XRPL account where the operator holds no key | https://github.com/jerrymusaga/Keyless [C2] | High |
| Vouchsafe | Both | HIGH | TypeScript, Solidity, TEE, FAssets agent assurance | Private stake-backed solvency claims with public verification and current transaction evidence | https://github.com/tang-vu/Vouchsafe [C2] | High |
| Heirloom | Interoperable assets | HIGH | TypeScript, Solidity, FDC nonexistence proof, FAssets, XRPL | Live app and a complete XRP inheritance lifecycle with exact reconciliation | https://github.com/a252937166/heirloom [C2] | High |
| fassets-verify | Interoperable assets | HIGH | Python, Flare mainnet, XRPL raw data | Live independent dual-leg proof-of-solvency dashboard using real mainnet data | https://github.com/Hugegreencandle/fassets-verify [C2] | High |
| Faktura | Interoperable assets | HIGH | TypeScript, Solidity, FTSOv2, FDC Web2Json | Hosted demo, 2:39 video, verified strict evidence hub, exact transactions | https://github.com/a252937166/faktura [C2] | High |
| Haircut | Interoperable assets | HIGH | JavaScript, Solidity, FAssets, FTSOv2, SparkDEX | Live mainnet exit-depth tape; 40 tests; append-only registry with explicit abstention state | https://github.com/seekdaseek/haircut [C2] | High |
| SealedFi | Both | HIGH | Go, TypeScript, Solidity, FCC, FTSO, ERC-4626 | 110 current-period commits across three contributors; private strategy vault and onchain guardrails | https://github.com/wngstnr-code/SealedFi [C2] | High |
| XRPShield | Both | HIGH | Java, Solidity, FCC-shaped extension, FTSOv2, Coston2 | 97 current-period commits, deployed contracts, explicit real-versus-roadmap matrix | https://github.com/hari-hara-sudharsan/XRPShield [C2] | Medium |
| UMBRA | Both | HIGH | TypeScript, Solidity, Noir, FTSOv2, FAssets | Four current contributors, live app, Coston2 contracts, disclosed compliance and bridge limitations | https://github.com/davre001/UMBRA [C2] | High |
| Veil | Both | HIGH | Solidity, TypeScript, Go, Python, TEE credit scoring | Full-stack confidential FXRP credit flow with a five-signal proof footprint | https://github.com/RaYYeR220/veil [C2] | Medium |
| Buta | FCC | HIGH | Go, Solidity, ECIES, FCC registry | Live desk, verified Coston2 contract, registered extension, Go and Forge tests | https://github.com/PugarHuda/buta [C2] | High |
| AegisFlow | FCC | HIGH | Next.js, TypeScript, FDC Web2Json, Phala TEE | Live demo, Coston2 gate, remotely attestable enclave | https://github.com/Bsh54/aegisflow [C2] | High |
| Adumbra | FCC | HIGH | Solidity, TEE order router, Coston2 | Live app, 44-second video, verified contracts and swap transaction; uses mock assets | https://github.com/Carlys17/adumbra-flare [C2] | High |
| Wayafee | Interoperable assets | HIGH | TypeScript, Solidity, FAssets, FXRP | Guided XRP-to-FXRP remittance and savings flow with live, deployed, transaction, and test evidence | https://github.com/spiffamani/wayafee [C2] | High |
| Balary | Confidential compute | HIGH | Django, React, Go, Solidity, FCC, USDT0 | Profile-recovered build with Coston2 contracts, registered FCC identifiers, lifecycle rotation and recovery | https://github.com/Sparexonzy95/balary [C2] | High |
| VeriFlow AI | Confidential compute | MEDIUM | TypeScript, Solidity, EIP-191, confidential document claims | Live Coston2 proof registry and explicit statement that current deployment is not a production hardware TEE | https://github.com/Librapraise/veriflow-ai [C2] | High |

Other current signals include WorkProof, BridgeSafe, PrivyRoll Signal, DarkStop, Wraith, Sotto, Nightjar, Whisper, FlareOne, PortalFX, Autopilot, RippleFi, SealedFlare, StacksBit, G1, CAVOK, Denarii Orchestrator, FlareGPT, and dozens more. [C2]

### Competition Density Map

| Track | Est. public repos | Activity | Density |
|---|---:|---|:---:|
| Interoperable Asset Products | At least 44 repository candidates are primarily interoperable; 43 more are dual-use by heuristic | Multiple live apps, verified contracts, mainnet evidence, and exact FAssets lifecycles | HIGH |
| Confidential Compute Apps | At least 6 repository candidates are primarily confidential; 43 more are dual-use by heuristic | Multiple TEE-shaped systems, registered extensions, deployed contracts, and private-compute demos | HIGH |

The track heuristic is multi-label and intentionally conservative. DoraHacks explicitly enables multiple tracks and allows up to 10 bounty selections. It does not establish whether one project may receive both prizes. [A1] [C2]

### Concept Density Map

Multi-label keyword routing across the 87 likely-current repository projects shows the size of the collision surface. Counts are directional because one project can occupy several clusters. [C2]

| Concept cluster | Public repository signals | Density |
|---|---:|:---:|
| FAssets access, minting, routing, wallets, yield | 50 | EXTREME |
| Risk, verification, compliance, monitoring | 45 | EXTREME |
| Payments, payroll, escrow, invoices, subscriptions | 25 | EXTREME |
| Confidential trading, RFQ, auctions, orders | 21 | EXTREME |
| Non-trading confidentiality and protected data | 16 | HIGH |
| Agents, automation, treasury | 15 | HIGH |
| Credit, lending, scoring, liquidation | 12 | HIGH |

## Community Pain (Verbatim Quotes)

**BOTTOM LINE:** The strongest documented pain is operational, not conceptual. Builders lose time to hidden FCC prerequisites, silent indexer failures, FDC example drift, rate limits, and asset lifecycle ambiguity. [C3]

**EVIDENCE:**

> “It cost me an afternoon before I checked whether it was a capability limit or a convenience.” [C3]

Source: https://github.com/flare-foundation/fce-extension-scaffold/issues/5

> “It reads as a hang, not a failure. I lost about an hour to it.” [C3]

Source: https://github.com/flare-foundation/flare-system-c-chain-indexer/issues/5

> “The endpoint the example points at is gone.” [C3]

Source: https://github.com/flare-foundation/flare-viem-starter/issues/2

> “Could you please advise whether this requires agent refund, settlement, or manual intervention?” [C3]

Source: https://github.com/flare-foundation/fassets/issues/3

**CONFIDENCE:** High that the quotes and issues are authentic. Medium that each reflects widespread pain rather than one builder’s experience.

**SO WHAT:** Developer operations, recovery, observability, and proof tooling are more defensible whitespace than another end-user trading front end.

## Past Editions Analysis

**BOTTOM LINE:** This appears to be the first Flare Summer Signal edition, but prior Flare hackathons reveal a consistent pattern: useful interfaces, verifiable computation, and deep use of Flare primitives win. Multi-track winners are possible. [A2]

**EVIDENCE:**

- At the 2025 Flare x Google Cloud hackathon, 2DeFi won first in DeFAI and second in RAG Knowledge with simple onboarding, embedded wallets, TEE portfolio analysis, and integrated Flare DeFi. [A2]
- Flare Fact Checker won Social AI Agents with TEE verifier nodes and correctness evidence. Command Flare and NFT Deep Appraisal also won with clear user interfaces plus verifiable computation. [A2]
- Virtual winners Quince Finance and ScribeChain combined direct user experiences with confidential computation. [A2]
- At Encode London 2024, Flare awarded Sepia, WeatherShield, Prace to the Top, and GuardFi. The organizer said the winners best exemplified FDC and FTSO capabilities in rounded products. [A2]

**CONFIDENCE:** High for named winners and official descriptions. Medium when transferring the pattern to Summer Signal because the criteria are product-focused and FCC is now a native Flare capability rather than a Google Cloud side integration.

**SO WHAT:** The recurring winning shape is not raw protocol complexity. It is a legible product whose core outcome is verifiable because of Flare. A dual-track entry can win, but only when both integrations are natural.

## Broader Market Context

**BOTTOM LINE:** Flare’s 2026 priority is turning XRPFi activity into distribution, execution, and sustainable value capture while bringing FCC online. The event is timed to push products into those new surfaces. [A2]

**EVIDENCE:**

- Flare reported roughly $200 million in XRP TVL, a $440 million broader ecosystem, 3.4 million FXRP DeFi transactions, and about 16,500 users in May 2026. [A2]
- Flare says XRPFi UX is fragmented and positions direct minting plus Smart Accounts as the path to scale. [A2]
- FAssets v1.3 introduces more direct minting through XRPL destination tags and clearer execution controls. [A2]
- Smart Accounts are live through Xaman and D'CENT distribution surfaces. [A2]
- Songbird accepted STP.13 to introduce FCC, including FDC v2 and Protocol Managed Wallets, in July 2026. [A1]
- Flare’s economic roadmap names FAssets fees, FDC fees, Smart Account fees, FCC, and protocol-level MEV as future value sources. [A2]

**CONFIDENCE:** High because these are Flare primary sources and governance records.

**SO WHAT:** A project aligned to distribution, chain abstraction, reliable operations, or privacy-preserving cross-chain execution has stronger political fit than a standalone dashboard.

## Category Saturation (Grid Data)

Query date: 2026-08-13.

| Category query | Products tagged `flare` | Distinct roots | Reported saturation |
|---|---:|---:|---|
| DEX, lending, yield, derivatives, liquid staking | 0 | 0 | UNKNOWN: taxonomy coverage gap |
| Developer tooling, explorer, data API, RPC, oracle, payments, wallet | 0 | 0 | UNKNOWN: taxonomy coverage gap |
| AI agent, agent platform, agent framework | 0 | 0 | UNKNOWN: taxonomy coverage gap |

The Grid broad search does contain Flare Network, FTSO, FAssets, and FDC. The tag-scoped zeroes therefore indicate incomplete Flare classification, not an empty ecosystem. [C3]

**SO WHAT:** Do not use The Grid counts to infer blue ocean. Use the complete registered-participant registry, current repository corpus, and Flare ecosystem sources for competition decisions.

## Builder Project History (Copilot unavailable)

Colosseum Copilot credentials were unavailable, so semantic prior-art, winner-only, accelerator-only, and archive searches were not executed. This is a coverage gap, not evidence that no prior art exists. Web research and GitHub repository search supplied current-project and prior-winner evidence instead.

## Strategic Whitespace

**BOTTOM LINE:** The roster audit eliminated most apparent product whitespace. The defensible openings now sit in developer operations, exception recovery, and lifecycle assurance around Flare's newest capabilities, not in another end-user FXRP or confidential-finance surface. [A2] [C2] [C3]

**EVIDENCE:**

1. **FCC lifecycle operations and proof observability:** Many projects consume FCC-shaped execution, but no reviewed current project owns extension registration, machine rotation, indexer health, attestation verification, deployment reproducibility, and failure diagnosis as one developer product. [C2] [C3]
2. **Protocol Managed Wallet safety operations:** Keyless and BridgeSafe occupy policy-controlled signing, but disaster recovery, signer rotation, liveness monitoring, transaction-policy simulation, and independent audit evidence remain underdeveloped. [A2] [C2]
3. **FAssets exception recovery:** Proof-of-solvency, exit depth, challenger infrastructure, agent risk, direct-mint guards, insurance, and liquidation are now crowded. A focused product that diagnoses and safely resolves stuck mint, redemption, payment-reference, or failed downstream workflow states remains distinct if it performs a real recovery. [C2] [C3]
4. **Cross-primitive integration test infrastructure:** The field repeatedly rebuilds FDC timing, Coston2 fixtures, FCC simulation boundaries, FAssets state, and explorer proof. A deterministic failure-injection harness with judge-verifiable receipts remains sparse. [C2] [C3]
5. **Confidential vertical with externally validated demand:** Non-trading confidentiality is no longer empty: VaultDrop, Embargo, WorkProof, VeriFlow AI, identity, payroll, credit, and gaming projects exist. Any new vertical must bring a named buyer, proprietary workflow, pilot evidence, and a privacy boundary that cannot be replaced by ordinary encryption. [C2]

**CONFIDENCE:** Medium-high. Public GitHub coverage is exhaustive for every disclosed handle, but private work, 90 non-disclosing participants, and Telegram announcements remain invisible.

**SO WHAT:** Warroom should generate from these five openings, reject overlap with the competitor registry, and require one exact end-to-end proof path before scoring any concept.

### Generative competitor-intelligence handoff

The competitor corpus is not merely a collision list. The complete field must be decomposed before ideation into users, jobs, asset lifecycles, confidential operations, proven mechanisms, proof patterns, distribution paths, missing outcomes, and unserved edge states. The resulting seed map is [`generative-competitor-intelligence.md`](generative-competitor-intelligence.md). [C2]

For this event, Warroom uses a `multi-track required` strategy. Every generated idea and finalist must have one load-bearing Interoperable Asset mechanism, one load-bearing FCC or FCE confidential operation, independent removal tests for both, and a single causal proof path joining them. Collision analysis follows generation; it does not substitute for corpus-driven discovery.

## Key Links & Resources

| Resource | URL |
|---|---|
| Hackathon | https://dorahacks.io/hackathon/flaresummersignal/detail |
| Flare Developer Hub | https://dev.flare.network/ |
| Network configuration | https://dev.flare.network/network/overview |
| FCC overview | https://dev.flare.network/fcc/overview |
| FCE getting started | https://dev.flare.network/fcc/guides/getting-started |
| FAssets overview | https://dev.flare.network/fassets/overview |
| FXRP overview | https://dev.flare.network/fxrp/overview |
| FTSOv2 overview | https://dev.flare.network/ftso/overview |
| FDC overview | https://dev.flare.network/fdc/overview |
| Flare Smart Accounts | https://flare.network/products/flare-smart-accounts |
| FCC Songbird proposal | https://proposals.flare.network/STP/STP_13.html |
| Coston2 explorer | https://coston2-explorer.flare.network |
| Coston2 faucet | https://faucet.flare.network/coston2 |
| Telegram | https://t.me/+5Vn6ZKhr6KI3NjIx |
| Registered roster endpoint | https://dorahacks.io/api/v1/hub/hackathons/2234/hackers |
| Full roster intelligence registry | `research/roster-intelligence.md` |
| Machine audit summary | `research/roster-audit/roster-github-audit.json` |
| Exact-event GitHub query, supplementary only | https://api.github.com/search/repositories?q=%22Flare%20Summer%20Signal%22 |

## Track Coverage Matrix

| Track | Prize pool | Judging focus | Overlap potential | Est. submissions |
|---|---:|---|---|---|
| Interoperable Asset Products | $6,000 | Useful products that make assets work across Flare and connected ecosystems | High with FCC when private execution or external signing is load-bearing | HIGH |
| Confidential Compute Apps | $6,000 | Privacy-preserving applications using Flare Confidential Compute | High with FAssets, FXRP, FDC, Smart Accounts, or PMW | HIGH |

**Multi-track target:** DoraHacks explicitly enables multi-track participation and permits up to 10 bounty selections. A single product can credibly qualify for both when it moves or controls an external asset and uses FCC for a necessary private computation or signature. A cosmetic FXRP balance plus a simulated enclave is not enough. Prize stacking remains unconfirmed. [A1]

**Low-competition track:** None. Both tracks have high public activity. The opportunity is a low-density capability or user problem inside a track, not a low-density track. [C2]

## Domain Knowledge Sources

| Source | URL | Covers | Essential? |
|---|---|---|:---:|
| FCC overview | https://dev.flare.network/fcc/overview | Architecture, registration, PMW, FDC v2, production caveat | YES |
| FCE getting started | https://dev.flare.network/fcc/guides/getting-started | Scaffold, Docker stack, Coston2 lifecycle | YES for FCC |
| Network configuration | https://dev.flare.network/network/overview | RPCs, chain IDs, explorers, faucets, DA endpoints | YES |
| FAssets overview | https://dev.flare.network/fassets/overview | Minting, redemption, agents, collateral model | YES for interoperable assets |
| FAssets reference | https://dev.flare.network/fassets/reference | Current contract addresses and ABIs | YES for interoperable assets |
| FTSOv2 | https://dev.flare.network/ftso/overview | Feed model and guarantees | YES if pricing is used |
| FDC | https://dev.flare.network/fdc/overview | Attestation types and proof lifecycle | YES if external facts are used |
| Flare Smart Accounts | https://flare.network/products/flare-smart-accounts | XRPL-controlled Flare execution | YES if targeting distribution |
| STP.13 | https://proposals.flare.network/STP/STP_13.html | FCC rollout and PMW roadmap | YES for roadmap alignment |

## Kill List

Ideas matching any category below should be rejected unless the concept has a materially different user, mechanism, and proof path.

### 1. Saturated

- **Private trading:** At least 21 public repository signals touch trading, RFQ, auctions, orders, hedging, or confidential markets. Sealed-bid OTC, dark pools, private swaps, hidden stops, and strategy vaults are red ocean. [C2]
- **Generic oracle and risk products:** At least 45 public signals touch risk, verification, monitoring, compliance, or oracle use. Price trackers, gas dashboards, AI yield sentinels, and thin FTSO alerts are crowded and shallow. [C2]
- **Simple FXRP utilities:** At least 50 public signals touch FAssets access, minting, routing, wallets, vaults, or yield. Savings, payroll, wallets, generic lending, direct-mint front ends, and basic collateral dashboards already exist. [C2]
- **Payments and escrow:** At least 25 public signals touch payments, payroll, escrow, invoices, subscriptions, or bounties. A generic merchant or milestone flow is no longer differentiated. [C2]
- **Inheritance:** Heirloom and Remnara already cover non-custodial XRP continuity and TEE-signed inheritance. [C2]
- **Compliance screening:** AegisFlow and Veilfactor occupy confidential screening and position-health territory. [C2]

### 2. Broken Dependencies

- **Unqualified production FCC claim:** Official FCC is not yet fully public production infrastructure. [A2]
- **Hosted indexer assumption:** FCC proxy setup can block on credentials or require a self-hosted indexer. [C3]
- **Wide Coston2 log queries:** More than 30 blocks can fail while the indexer appears idle. [C3]
- **Unbounded public RPC use:** Shared quota can cause deployment and proof calls to return 429. [C3]
- **Copied FDC starter flow:** Known jq and endpoint problems can stop the example before chain submission. [C3]
- **Long interactive proof loop:** FDC timing can make a live demo feel broken unless the state is staged and progress is visible. [A2]

### 3. Already Built

- Independent FAssets proof-of-solvency, exit depth, agent risk, insurance, and challenger infrastructure: fassets-verify, Haircut, LedgerGuard, Backstop, Herkos, FAsset Sentry, and Vouchsafe. [C2]
- XRP inheritance with nonexistence proofs: Heirloom. [C2]
- Invoice financing with FDC and FTSO: Faktura. [C2]
- Confidential smart-contract work escrow: WorkProof. [C2]
- Confidential FXRP market structures: Cinder, WhisperDesk, Buta, Adumbra, Whisper, Sotto, Wraith, DarkStop, Nightjar, Midpoint, UMBRA, and multiple private-FXRP variants. [C2]
- Confidential AML gate: AegisFlow. [C2]
- Private XRPL treasury: BridgeSafe. [C2]
- Merkle FXRP payroll: PrivyRoll Signal. [C2]

### 4. Zero Alignment

- A generic EVM application deployed to Coston2 with no Flare-native dependency.
- An AI wrapper that reads FTSO but does not change a verifiable onchain outcome.
- A privacy claim backed only by server-side encryption or an unregistered process.
- A cross-chain claim with no FDC proof, FAssets lifecycle, Smart Account authorization, PMW signature, or equivalent Flare-native mechanism.
- A demo that uses only mock assets while claiming real XRP or FXRP settlement.

## Quality Gate

| Dimension | Score | Evidence |
|---|---:|---|
| Specificity | 5 | Exact dates, prizes, networks, endpoints, named projects, contract-proof descriptions |
| Evidence | 5 | Live DoraHacks model, 577-record roster reconciliation, 26,519 paginated repositories, README and commit evidence, primary Flare sources, and explicit limitations |
| Novelty | 5 | Roster-first recovery exposed more than three times the exact-search corpus and found profile-only projects and hidden competition clusters |
| Competitor depth | 5 | Exhaustive public-account coverage, 99 likely-current signals, 87-repository registry, attribution evidence, and priority threat assessment |
| Actionability | 4 | Revised whitespace, quantified density, hazards, and kill list; private Telegram and prize-stacking verification remain open |

**Average:** 4.8 out of 5. PASS after coverage verification.

### Remaining verification before idea selection

1. Capture any custom DoraHacks form fields if the currently disabled form becomes enabled.
2. Manually scan Telegram for unpublished project announcements and organizer corrections.
3. Confirm whether one project may officially receive prizes from both bounties; entry into both is already verified.
4. Confirm whether judges require an official FCC machine registration or accept a simulated or independently attested TEE.
5. Refresh the roster and repository delta immediately before idea lock because registration remains open until the event cutoff.
