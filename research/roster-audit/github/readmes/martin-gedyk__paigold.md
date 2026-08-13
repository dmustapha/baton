<p align="center">
  <img src="logo.png" alt="PaiGold — gold bar stamped with the Flare hallmark" width="240">
</p>

# PaiGold — Privacy-First Point-of-Sale for Physical Gold Dealers, Anchored on Flare

> **PaiGold is the digital branch for a gold dealer — it makes every part of the shop
> more efficient, and every part of it secure.** Customers pull a queue ticket
> from a QR poster and browse the live-priced showcase while they wait: the waiting
> time sells. Appointments arrive pre-described, so the visit at the counter is shorter
> and better prepared. The desk walks staff step by step through inspection, offer,
> AML paperwork, payout and the refinery shipment — no training effort. Management
> opens one evening view across every branch. An auto mode works the standard chain
> by itself.
>
> The security layer runs on **Flare**: every price on every screen is read live from
> **our own oracle contracts on Flare Mainnet**, and every deal, security bag and vault
> deposit gets a **tamper-proof digital seal on-chain** — the customer checks their own
> receipt with a printed code, the refinery audits whole lots, and not one piece of
> personal data ever leaves the house. The idea was born in the waiting room of a real
> German gold dealer, from the customer's side of the counter — built for the whole
> trade, and live in production.
>
> And it is a **Confidential Compute** app: before money changes hands, the counter asks
> *"is this piece reported stolen?"* — two parties need the same answer and neither may
> show their data. No public chain can do that; an enclave can. The **FCC extension**
> for exactly this question is built on Flare's scaffold and **registered on Coston2**
> (extension ID `0x101a9`), one function away from switching the register from house
> database to enclave — and Protocol Managed Wallets then retire the last key an
> operator holds. The seam, the honest status and every correction along the way:
> [`blockchain/FCC-INTEGRATION.md`](blockchain/FCC-INTEGRATION.md).

**Live oracle proof:** https://world.playandinvest.com/goldfeed
**Live deployment:** https://pailocal.com/gold — production landing page; the desk and
customer apps behind it are access-gated (a real installation, not a staged page). The
docker quickstart below boots the identical system fully open.
**Built by:** [@martin-gedyk](https://github.com/martin-gedyk) (Martin) — solo founder of [playandinvest.com](https://playandinvest.com)
**Flare Summer Signal 2026** — Bounty 2: Confidential Compute Apps

---

## Quickstart for reviewers — 3 minutes, no keys, no accounts

```bash
git clone https://github.com/martin-gedyk/paigold.git && cd paigold
docker compose up --build
```

| What | Where |
|---|---|
| Customer QR app | http://localhost:8090/customer/?b=1 |
| Staff desk | http://localhost:8090/staff/ — demo login `leitung` / `1234` |

Schema and (fictional) demo data load on first start — nothing to configure.

**Check the claims instead of taking them:**

```bash
docker compose exec web php /var/www/html/verify.php   # 30 checks, no network, no DB
node _t_registry_e2e.cjs   http://localhost:8090       # 34 checks against the running demo
node _t_anchor_versions.cjs                            # 11 checks: seals survive a payload change
```

`verify.php` proves the crypto and the rules on their own (secp256k1/RFC-6979 signing,
EIP-155 chain-id, canonical hashing, i18n parity across 5 languages, secret hygiene).
The `_t_*` gates drive the running system over HTTP. All of them exit non-zero on failure.

On-chain submission is **off by default** — deals still get their SHA-256 anchor and the
counter shows the whole flow. Details in [Run it locally](#run-it-locally).

---

## What it is

PaiGold is a complete self-service & point-of-sale system for physical gold dealers
(buy/sell desks, refineries): QR-based queue tickets, live showcase pricing, deal
processing with chain-of-custody, AML/KYC workflow, and **vault storage with sealed
deposits** — built for the way a German precious-metals counter actually works,
by someone who stood at one as a customer.

Two things make it a Flare product:

1. **The gold price is on-chain.** Every displayed price comes from our own
   **XAU/USD oracle contract on Flare Mainnet** — not from a Web2 API:
   - Contract: `0x94d8F6f88AC99f898311f126a7D9cF3C24B1C37D` (Chain-ID 14)
   - **10,300+ on-chain updates** — contract live since 25 October 2025,
     publishing continuously since 23 May 2026 at a ~10-minute cadence,
     median of multiple independent sources, ±50% jump guard in the contract
   - Read path is a plain `eth_call` to `getCurrentFeed()` — read-only, no key,
     verifiable by anyone: https://world.playandinvest.com/goldfeed

2. **Deals are anchored without PII.** Every completed deal and every
   custody hand-over (dealer → refinery) produces a **SHA-256 anchor over a
   canonical JSON that contains zero personal data** (GDPR-safe by design):
   - Customers get a **viewing code** (`XXXX-XXXX-XXXX`, HMAC-derived) and can
     verify "my deal is anchored and untampered" — seeing only their own deal.
   - The refinery gets its own view: all anchors of transferred lots,
     chain-of-custody included, still without any PII.
   - Tamper detection: verification recomputes the hash live from the data and
     compares against the stored anchor (tested: manipulated amount → mismatch).

## Why Confidential Compute

Today the anchor registry and the data live with the same operator — an honest,
documented trust gap. **Flare Confidential Compute closes exactly this gap**, and
the integration seam is already built and documented:

- Every anchor already carries a structured `fcc_instruction`
  (`{version, extension: 'paigold-anchor', instruction: 'anchor'|'disclose', payloadHash, aud, ref}`)
- The registry component is cut so it can move **1:1 into an FCC custom extension**
  (reproducible image → registered TEEs → instruction-receiving contract)
- On-chain submission is **off by default** (`anchor_enabled=false`, no key in the
  repo, nothing signs unless an operator deliberately switches it on). Since Aug 1
  the app can sign anchors itself (`blockchain/flare-signer.php`) so the sealing
  moment works on plain shared hosting — which makes the remaining trust gap
  explicit rather than hypothetical: whoever runs the installation holds that key.
  With FCC's Protocol Managed Wallets the same call becomes key-less by design,
  and this is exactly the seam where it plugs in.

See [`blockchain/FCC-INTEGRATION.md`](blockchain/FCC-INTEGRATION.md) for the full seam
documentation (written July 2026, before the FCC SDK became publicly available).

## Beyond gold — proof of operations

**From gold counters to AI-run factories: PaiGold is the first vertical of a
proof-of-operations layer on Flare.** The registry is deliberately generic —
`keccak256("paigold:transaction:4")` today, `"pailocal:shift:…"` tomorrow. The
same seal + selective-disclosure pattern (hash on chain, data stays with the
business, viewing keys for the party that may look) next serves restaurant
shift reports (the same pattern fits our gastro system), multi-party
arena settlements, industrial shift hand-overs, ISO training records — and,
further out, the
action log of AI agents operating production lines, where FCC's TEEs and
Protocol Managed Wallets give machines a cryptographic identity.

## What existed before the hackathon vs. what is new

**Before (live since May–July 2026):**
- XAU/USD oracle on Flare Mainnet + publisher keeper (live since October 2025, 10,300+ updates)
- Complete dealer system (queue, showcase, deals, custody, AML classification)
- Privacy/anchoring layer with customer proof codes and refinery view
- FCC integration seam, documented
- Public live price dashboard (goldfeed)

**Newly built during Flare Summer Signal** — running build log, newest last
(each entry tracked in commits):

- **Jul 27 — On-chain anchor submission (Coston2 testnet):**
  [`blockchain/coston2-anchor/`](blockchain/coston2-anchor/) —
  `PaiGoldAnchorRegistry.sol` (write-once anchors, public `verify()`, audience byte)
  plus an operator-side compile/deploy/submit/verify pipeline and
  `blockchain/export-anchors.php`. At this point the PHP app still signed nothing —
  submission stayed outside, exactly where FCC's Protocol Managed Wallets slot in.
  (Superseded on Aug 1, see below: the app can now sign itself so the counter works
  on shared hosting — off unless an operator enables it.)
  **Deployed & used:** contract
  [`0x2C78…465a`](https://coston2-explorer.flare.network/address/0x2C786Bf5CC567bc58175a3A0426e46505d4e465a)
  with demo anchors on-chain (public + refinery audience), all publicly
  verifiable via `verify()` — evidence in
  [`blockchain/coston2-anchor/README.md`](blockchain/coston2-anchor/README.md).
- **Jul 27 — Publicly testable demo instance** for judges.
- **Jul 28 — The sealing moment at the counter:** shipping a security bag fires a
  real on-chain transaction from the desk (key held by a separate local
  seal service, never by the web app) — staff see the live tx hash +
  explorer link and print a sealed proof for the records.
- **Jul 28 — One-login demo:** demo-login popup on the landing page, a
  password-less role switcher (admin / manager / clerk / inspector /
  region), and self-deleting browser setup scripts — every role reachable
  in seconds, no phpMyAdmin.
- **Jul 28 — The desk knows the coins:** ~100 curated coins & bars with
  mintage years (incl. year-dependent specs: Britannia 916→999 in 2013,
  Panda 1 oz→30 g in 2016). Type-ahead search in the buy flow — years typed
  into the query are understood — and inspections come pre-filled with
  weight & fineness.
- **Jul 28 — PAI Metals & FX Oracle on Flare Mainnet:** the original feed carried
  gold alone; for the hackathon it grew into one contract with
  **11 feeds** — XAU/XAG/XPT/XPD plus seven FX majors
  (EURUSD…CNYUSD) — updated with a single `pushMany` transaction per round.
  Median of up to **6 keyless public sources** across provider types
  (spot aggregator, bank, COMEX futures, **ECB reference rates**, two
  crypto exchanges), 2 % consensus check with outlier ejection, ±10 % jump
  clamp, and a per-round attestation log
  ([`attests.jsonl`](blockchain/metals-oracle/)) tracing every on-chain
  value back to its sources. **Deployed & feeding:** contract
  [`0x6485…41f5`](https://flare-explorer.flare.network/address/0x6485Cef8Ef8f7455aB79F4600167c43048A041f5)
  (Chain 14). The dealer app now prices all four metals **and the EUR
  conversion** from chain. Also drafted: a New Feed Request for official
  FTSO metal feeds ([`FLARE-FEED-REQUEST.md`](blockchain/metals-oracle/FLARE-FEED-REQUEST.md)).
- **Jul 29 — Demo tooling: our screen recorder finished and open-sourced.**
  Filming the demo needed a recorder without a watermark, an account or a 300 MB
  installer, so the in-house one got finished instead of a subscription:
  **PaiCap** now records **sound** — system
  audio plus optional microphone, captured via WASAPI because ffmpeg has no
  loopback device on Windows — in an English UI, with a self-test that measures the
  actual audio level rather than trusting that a track exists. Released under MIT as
  one 73 KB executable with no dependencies beyond what Windows ships. A side quest
  next to the gold infrastructure, but every clip in this submission is recorded
  with it, and the tool is public for anyone with the same problem.
- **Jul 31 — The recorder learned to cut (PaiCap v1.1.0).**
  Turning raw takes into a demo needed the second half of the job: trimming three
  clips together, laying music under them, putting a title on one. Installing a
  suite for that would have undone the point of the recorder, so PaiCap grew a
  timeline instead — video / audio / text lanes, trim and split, text overlays,
  music with fades and looping, ten transitions dragged onto the seam between two
  clips, and a one-pass ffmpeg export. Everything measured rather than assumed:
  a project mixing hard cuts with transitions used to die mid-render (`concat`
  emits AVTB, a clip after `fps=N` stays at 1/N, and `xfade` refuses mismatched
  timebases), and the preview needed four separate fixes before picture and clock
  agreed — ffmpeg's own `-re` pacing drifts once an xfade has two inputs, GDI+
  scaling costs 141 ms per frame against 0.9 ms unscaled, `WM_TIMER` capped the
  display at 12 of 30 frames. Two gates now check output rather than the absence
  of exceptions: one renders a project that puts every transition on a seam, the
  other drives the editor and samples the pixels actually on screen. Still MIT,
  still one file, no dependencies — 219 KB now instead of 73, which is what a
  cutting room costs.
- **Aug 1 — The seal happens at the counter, and PHP signs it itself.** Sealing a
  bag used to depend on a local Node service holding the key; on shared hosting
  that service does not exist, so the counter always fell back to "will be sealed
  later" — the sealing moment was unreachable in production. `blockchain/flare-signer.php`
  removes the dependency: keccak256, secp256k1 with RFC-6979 deterministic `k`,
  RLP and an EIP-155 transaction, in plain PHP with GMP *or* BCMath, no library.
  Verified against ethers v6 down to the byte — hash vectors, selectors, address,
  r/s/v and the full signed transaction (14/14), ~10 ms per signature — and then
  against the chain itself: an anchor written from PHP alone, block 33479365,
  `verify()` returning a match. The counter now shows the whole thing happening:
  **transaction sent** (hash + explorer link) → the desk polls for the block →
  **sealed**, with the block number. The server answers immediately and the waiting
  happens in the browser, so a hosting timeout can no longer swallow a transaction.
  An operator switches it on with two config values; a self-test in the admin panel
  reports extension, chain, wallet, funding, authorisation and how many seals the
  balance still covers, so "why is nothing sealing?" has an answer instead of a shrug.
- **Aug 1 — The counter fits in a hand, and the till reads as three steps.** The
  desk was built for a wide screen: on a phone the KPI row was hidden behind `sm:`
  and the tools scrolled off the edge, so a clerk saw almost nothing. Mobile now
  gets its own layout — a compact figures row and one **Menu** sheet holding every
  tool as a labelled tile with its counter, grouped into day-to-day / management /
  views, driven by the same list the desktop bar uses so nothing can silently
  disappear from one of them. The board itself dropped from five columns to three
  stages — **waiting room & appointments · being served · completed** — because the
  five-column version answered "which phase is this deal in?" while the actual
  question at a counter is "who is waiting, who am I serving". Queue tickets and
  today's appointments now live on the board instead of behind a modal, each card
  carrying exactly one action: *Serve* (claim, move to inspection and open the deal
  in one click) or *Call*. Calling is a state change, not a highlight: the ticket
  leaves the queue, so the same customer can no longer stand in two places at once,
  and a no-show can be dropped without inventing a deal first.
- **Aug 1 — Every QR now points at the chain, and the checklist follows the goods.**
  The proof QR on screen and on paper led to our own verification page — reasonable,
  but it made the customer's evidence depend on our software. Once a bag is sealed,
  the QR on the screen, the customer receipt, the hand-over slip, the bag sticker
  and the archive proof sheet all resolve to the transaction in the Flare explorer;
  the private proof code stays alongside as a separate line. Checked by executing
  the print templates and reading the URLs they actually emit (7/7), sealed and
  unsealed. The post-payout checklist was reordered to match what physically happens
  at the desk: bag the goods → put the bag on the blockchain → print the hand-over
  slip (now carrying the real transaction) and have it signed → print the customer
  receipt. Paper is created after the seal exists, not before. "Bag into the vault"
  stopped being a step — the dealer walks the bag to the safe while paying out — and
  a sealed bag no longer offers a *seal now* button, because the registry is
  write-once and a second seal is not a thing. Smaller repairs along the way: the
  print windows carry a bar with a way back (on a phone, dismissing the print dialog
  used to strand you inside the receipt), the customer proof page has a back button,
  and a demo button seeds four random walk-ins — buyers and sellers — so the flow can
  be shown without typing.
- **Aug 1 — Every branch trades in its own currency, and the FX feeds finally earn their keep.**
  The Metals & FX oracle had been pushing seven currency pairs on-chain since July with
  no consumer. Now they carry the till: a branch picks its currency in the admin panel —
  EUR, USD, GBP, CHF, JPY, AUD, CAD or CNY, exactly what the oracle covers — and the spot
  ticker, showcase, offers, inspection pricing, scrap calculator and all number formatting
  follow at once. Conversion runs through the own on-chain feeds (fresh within 2 h, ECB as
  fallback, and on failure the branch stays in EUR rather than pricing off a stale factor);
  stored spots remain EUR-based as the single source of truth. Verified live against
  mainnet: EUR→USD 1.15, GBP 0.852, JPY 115 — from the own contract. Alongside: the
  catalogue grew to 130 entries (Britannia/Libertad/Panda fractionals, 10 guilder, Turkish
  Ata, 10-tola bars, Morgan and Peace dollars, full platinum/palladium bar ranges), and
  bookkeeping gained a third one-click export next to Excel/SKR03 and the DATEV posting
  batch: the **seal journal** — every blockchain anchor of the period as CSV with hash,
  transaction, block and explorer link. The proof files into the same folder as the books.
- **Aug 2 — A second product fell out of the seal: vault storage.** Research first:
  dealers who store customer valuables hand out what the trade has always handed
  out — a paper storage certificate, with an auditor confirming the holdings once
  or twice a year; on-chain competitors tokenize ownership instead (VaultChain,
  PAXG) — nobody seals the deposit slip itself. PaiGold now does: a **Vault
  storage** desk tool takes in gold, jewellery or watches with a customer profile
  (AML), a condition photo whose **SHA-256 goes into the anchor**, condition
  grade, compartment and free-text notes — and seals the deposit on Flare in the
  same live *sent → sealed* moment as the bags (`vault_in`). Hand-back writes a
  **second seal that chains the deposit hash into its own payload** (`vault_out`),
  so the whole storage period is framed on-chain; deposit and release receipts
  each carry a QR to their own transaction, plus signature lines for both sides.
  Values are computed, not typed — weight × fineness × the day's rate from the own
  oracle, shown as *current value* ("the price of the item is irrelevant, it can
  be different tomorrow" — the owner); a declared value remains only for pieces
  without metal data, like a watch. A running deal can hand its customer and goods
  straight into a prefilled deposit form (*take into storage*) — the pawn-shop
  direction. The table creates itself on first use, demo stock is one click, and
  the landing page explains the module in plain language in all three languages.
- **Aug 2 — The counter can be operated by an AI agent.** PaiGold has always been
  a JSON API with a human UI on top — now that door is labelled: a dedicated
  **`agent` role** (created in one click from the admin panel, or seeded in the
  Docker demo as `agent`/`7777`) logs in like any staff member and works the
  whole desk through the API — queue, deals, inspection, offers, custody seals,
  vault storage. Server-enforced boundaries instead of trust: no admin surface,
  a **payout limit** (default €10k — above it, a human completes), and every
  action lands in the audit log under the agent's own name, with completed deals
  sealed on Flare as usual. [`AGENT.md`](AGENT.md) is the manual written *for the
  model*: auth flow, endpoint recipes, rules of engagement ("behave like someone
  who is being watched by a blockchain — you are"). Point Claude Code or any
  tool-using model at it and it runs the counter; with FCC's Protocol Managed
  Wallets, that same agent later gets its own cryptographic identity.
- **Aug 3 — Auto mode: the counter serves by itself.** The agent above needs a
  model on the other end of a wire. Most of a buy desk does not: inspect → offer →
  call → pay out → bag → seal → receipt is the same chain every time. **Auto mode**
  (a second lamp under the agent lamp, manager-only) runs that chain server-side,
  one step every three seconds so a human can follow it, with the card framed in
  red while a machine has it. No model, no outside connection, nothing to pay per
  deal — and the *same* limits: ID check from €2,000, enhanced diligence from
  €10,000, payout limit. While a handover waits for a person, the whole desk holds
  still. Deterministic where determinism is enough; the API agent stays for
  everything that needs judgement.
- **Aug 3 — The handover is now a moment, not a silent stop.** Whichever machine
  hits a boundary, the desk shows one full-screen card — *human needed*, the
  reason in plain language, Flare mark, FCC named as what removes the limitation
  later — and the deal waits. After the human pays out, the machine notices by
  itself and continues with bagging, sealing and the receipt. One card at a time,
  never stacked, and a cancelled deal stops asking.
- **Aug 3 — Machines are not roles.** Signing in *as* the agent (a human at its
  desk, watching) is not the same as an agent being *connected*. Only sessions
  created through "connect" carry the link marker, so the lamp is green when a
  machine is really on the wire — and the payout limit binds the machine, not the
  person who sits down to take over. That distinction cost two rounds of testing
  to get right: the human who was supposed to approve a payout was blocked by the
  agent's own limit.
- **Aug 3 — Currencies that mean something.** The branch currency (EUR, USD, GBP,
  CHF, JPY, CNY, AUD, CAD) is picked from a flag list; prices, offers, calculator,
  inventory, vault and analytics compute in it through the Metals & FX oracle. The
  agent's payout limit and the AML thresholds convert with it — a fixed €10k
  compared against a yen amount is a different rule in every currency. Amounts
  keep the currency they were booked in.
- **Aug 3 — Five languages.** Chinese (中文) and Japanese (日本語) join German,
  French and English — 741 keys each, counter and customer app, placeholders
  verified key by key. The language switcher became a dropdown with flags and
  native names; five two-letter codes in a row were no longer readable.
- **Aug 3 — Fixes worth naming:** silver priced as gold (the metal now comes from
  catalogue → inventory → text, never from a default); the seal moment invisible
  to anyone who had not clicked it; deals that showed their bag and Flare block
  only after a reload; a paused agent that could not even *read* its own state and
  hung the desk in a loop of 423s; `Authorization: Bearer` silently dropped by
  Apache, so a correct token answered "not signed in"; and the transfer-proof view
  that returned a server error because one file had never been uploaded.
- **Aug 4 — A trading day has two sides.** A purchase used to book as pure cash
  out: €1,180 paid, nothing gained — the best day of the week read like the worst,
  and the manager's margin was "sales minus purchases". [`api/lib/books.php`](api/lib/books.php)
  now books both: cash out **and** fine metal in at market value, gross profit as
  the difference, cost of sold pieces from inventory (market value where none is
  recorded, so the profit is 0 rather than invented). Metal comes from the same
  resolver as the inspection room, so silver is never valued at the gold rate.
  Shifts and closings stopped being buttons — a day is 00:00 to 23:59 and catches
  itself up on the first request of the morning, because shared hosting has no
  reliable cron. Recomputed against real transactions: 20 g of fine gold bought for
  €1,900 → cash −1,900, metal +2,251.95, **result +351.95**.
- **Aug 4 — The software measures, and the inspection becomes a document.** The
  inspection room held a verdict — *passed*, plus weight and fineness, both typed.
  Now the scale is read directly ([`ui/gold-scale.js`](ui/gold-scale.js), WebSerial,
  no driver and no service on the till): put the piece on, tap the scale icon in the
  row, and the settled value lands in the field **and** in the report with device and
  timestamp. Nine units are converted, and a troy ounce is never confused with an
  avoirdupois one — the 9.6 % between them is the kind of mistake that survives an
  audit. On top of it, a real inspection report ([`api/lib/inspection.php`](api/lib/inspection.php)):
  twelve methods with device, reading, inspector and time — and the software says
  what is **missing**, because a bar needs surface *and* core. Density is
  deliberately not accepted as core evidence (tungsten 19.25 against gold 19.32),
  XRF only sees the surface, and 5,180 m/s in a gold bar raises a tungsten flag
  next to the reading. Sealing the report closes it; every call recomputes the
  checksum, and a mismatch is shown in red. A4 certificate with the method table
  and an explorer QR. Gates: 23/23 parser, 23/23 domain rules, 19/19 end-to-end
  including "changed behind the application's back → checksum no longer matches".
- **Aug 4 — Three parties around one bag.** The strongest case for a chain rather
  than a database: dealer, secure carrier and refinery, and a dispute that happens
  in real life — the bag arrives lighter than the protocol says. A shipment now
  carries **two seals**: one at departure with bag list and weight, one at
  acceptance that chains the departure hash into itself. The carrier gets a code on
  the waybill and opens [`customer/transport.html`](customer/transport.html) —
  bags, weights, seals and nothing else; no customer names, no amounts, because a
  carrier transports and does not value. Whoever accepts enters the weight they
  measured themselves; beyond tolerance (0.5 g or 0.1 %) the shipment is recorded
  as **disputed** rather than accepted. A third audience byte (`courier`) joins
  customer and refinery. 21/21 end-to-end, including "the code shows nothing while
  the bag is still being packed" and "no customer data in the response".
- **Aug 4 — Mail-in purchases: the record is written before the valuation.** Goods
  arrive by post and the customer is not there when the parcel is opened — that is
  where "there was more in it" comes from. Receiving, then opening with the weight
  **while still sealed** plus a photo, then anchoring (`parcel_open`) — and only
  then inspection and offer. A record written after the valuation would answer
  nothing. 15/15, including "opened twice is impossible" and "the protocol accepts
  nothing once it is sealed".
- **Aug 4 — The inbox, sorted and drafted.** The mail agent
  ([`api/lib/mailagent.php`](api/lib/mailagent.php)) reads over IMAP, classifies
  rule-based — appointment, price enquiry, storage, offer to sell, supplier,
  invoice, advertising, spam — **and says what it recognised it by**. For the four
  answerable ones it writes a draft into the mailbox's *Drafts* folder: appointments
  with real free slots from the queue projection, price enquiries with today's
  buying rate per gram and an explicit reservation, because a binding number in an
  email is an offer. Human approval is not a rule here but the construction: there
  is no SMTP path and none can be switched on. The reading side uses EXAMINE, not
  SELECT, so the agent never marks a human's mail as read. 32/32 on classification
  and drafting, 17/17 on parsing what an IMAP server actually answers.
- **Aug 4 — Numbers a dealer steers by, and a vault that can prove itself.**
  Gross profit per metal and per staff member, conversion rate (tickets that became
  business), turnaround time, days on hand — with the allocation stated openly in
  the answer: a transaction is paid, not an item, so amounts are split by market
  value, an assumption rather than a measurement. And the vault marks items as
  **issuable** when everything a claim would need is present — number, metal,
  weight, fineness, condition photo, deposit seal, location. Nothing is issued:
  whoever issues tokens on gold is an issuer under MiCA, which is a company
  decision with a lawyer, not a switch. 12/12.
- **Aug 5 — A seal has to survive its own software.** Adding the serial-number
  commitment on Aug 4 put one new field into the deal payload — and with it, every
  transaction sealed *before* that change recomputed to a different checksum. In the
  live branch 59 of 61 hand-overs suddenly read "does not match". Nothing had been
  tampered with; the recipe had changed. Payloads now carry **versions**: verification
  walks from the newest recipe to the oldest, a hit means the facts are unchanged, and
  the answer says which version matched. Tampering still fails all of them. On top of
  it, an anchor that is already on chain is never re-hashed — otherwise the database
  says one thing and the chain another, and the customer sees a warning nobody caused.
  New gate [`_t_anchor_versions.cjs`](_t_anchor_versions.cjs) reproduces exactly that
  day: 11/11. The rule that came out of it is in the code: a new field means a new
  version, and old ones are never edited.
- **Aug 5 — Fifteen tools became six groups.** The tool bar had grown to fifteen
  buttons in a row that scrolled off half the screens in use, with related things
  standing far apart. Counter, goods, figures, agent, settings, views — each a group
  that opens its handful of tools, with waiting counters summed onto the closed
  group so nothing hides. The phone sheet uses the same grouping. Mail and mail-in
  purchases moved into the agent's reach as well: receiving a parcel, logging it and
  sorting an inbox is precisely the always-same work an agent does well.
- **Aug 5 — The question before the money: is this piece reported lost?** A dealer
  who buys stolen goods does not become the owner — he pays and hands it back.
  So the counter now asks one question before the valuation, and the answer is
  yes or no ([`api/lib/registry.php`](api/lib/registry.php)). Three values that
  are easily confused, kept apart on purpose: the **serial** is what both sides
  share; the **lookup value** (HMAC over the serial with a house key) is what the
  register stores and searches, so a stolen copy of the database cannot be walked
  through; the **ownership key** — handed to the buyer once at the sale — is what
  authorises a *report*, never a search, because the dealer at the counter does not
  have it. A first draft had the query run on the ownership key; building it showed
  that nobody could ever find anything that way. The receipt is written for **both**
  answers: that is what lets a house show later that it looked. Owners report a loss
  themselves on the proof page with no account and no name, and spelling does not
  matter — `pai 0001` and `PAI-0001` are the same bar. The serial itself never
  leaves the house. 25/25 on the arithmetic, 24/24 end-to-end through a real sale,
  theft, report and hit.
- **Aug 5 — And where Confidential Compute enters, precisely.** One function,
  `reg_ask()`, is the whole switch: today it reads our own table, tomorrow it sends
  the same lookup value into an enclave and gets the same yes or no back — plus the
  proof that nobody read along. The answer already carries the question in FCC's
  own shape (`fcc.instruction = "check"`). Two corrections went into
  [`blockchain/FCC-INTEGRATION.md`](blockchain/FCC-INTEGRATION.md) with it: the
  query value (above), and the claim that Flare's C-chain indexer has to be
  requested — it does not. The extension scaffold ships its own indexer service and
  a local chain, and the indexer itself is public. Nothing to ask for; the honest
  limit is that third-party extensions are not switched on for the live network yet.
- **Aug 8 — The waiting room got a toy box.** While a customer's ticket waits, the
  screen offers three game tiles — one of them FTSO Battle, where the same live
  Flare price that sets the counter's rates drives a battlefield's frontline.
  Per-branch switch, off by default; the demo seed turns it on so a reviewer sees it.
- **Aug 10/11 — Hardening days at a live counter.** What running the system for real
  surfaced, each fix travelling with its own gate: seal references now carry the
  house name (the write-once registry let demo, reviewer docker and pilot claim each
  other's numbers — whoever came second got an eternal "already anchored");
  auto mode calls one buyer at a time (a called buyer waiting for payout counted as
  parked work — three customers at one counter); amounts are typed in the branch
  currency, booked in the deal's own, and judged in euros at the AML threshold
  (a euro deal at a dollar branch could demand check boxes that existed nowhere);
  and the demo scale weighs the piece the row expects, to the milligram
  (a Maple Leaf kept weighing like a Krugerrand). Gates: `_t_seal_ref` 12,
  `_t_automode` 35, `_t_gwg_ccy` 10, `_t_scale` 36.
- **Aug 12 — The house moved.** GitHub's automation silently flagged the original
  account in early August — profile and repository return 404 to everyone but their
  owner, without a notification; the repo's own traffic graph dates it (daily views
  until Aug 5, zero from Aug 6). This repository is the unchanged history under the
  founder's real name: same commits, same dates, same code — the move itself is the
  newest commit.
- _...this log grows with the program — see commit history._

## Architecture

```
Customer QR app ──┐
Staff desk app  ──┤   PHP 8 + PDO (MariaDB)         Flare Mainnet
Refinery view   ──┼─► api/gold/*  ────────────────► ftso-price-feed.php ── eth_call ──► XAU/USD oracle
                  │        │                                                    (getCurrentFeed)
                  │        └─► flare-anchor.php ─► SHA-256 anchors (no PII)
                  │                 └─► fcc_instruction  ····· future: FCC custom extension
                  └─► proof.php (customer viewing codes, rate-limited)
```

- **Backend:** PHP 8, PDO, zero-framework, Composer-free (runs on plain shared hosting)
- **Frontend:** React 18 via Babel-in-browser (no build step), five languages (DE/FR/EN/ZH/JA)
- **Oracle keeper:** Node script (`blockchain/xau-publisher/`) — median of multiple
  price sources, clamped against the contract's jump guard
- **Local dev:** `docker compose up --build` → http://localhost:8090
  (customer: `/customer/?b=1`, staff: `/staff/`, demo login: `leitung` / `1234`)

## Run it locally

```bash
docker compose up --build
# Customer app:  http://localhost:8090/customer/?b=1
# Staff desk:    http://localhost:8090/staff/    (demo: leitung / 1234)
```

The database schema + demo seeds load automatically on first start
(`db/pai-gold-schema.sql` — all seed data is fictional demo content).
Set your own gate credentials in `login.php`
(see the TODO placeholders) before any public deployment.

### Watch a machine run the counter

Two ways, both in the running container. Neither needs a key, an account or a
cent.

**1. Auto mode — no model, no network.** Sign in as `leitung` / `1234`, press
**+4 demo customers**, then click the **Auto mode** lamp at the top. The desk
takes the next deal and works it: inspect, offer, call, pay out, bag, seal,
receipt — one step every three seconds, the card framed in red while the machine
has it. On a deal above the limits it stops and asks you; approve the payout and
it carries on by itself.

**2. API agent — point any tool-using model at it.** Same desk, over HTTP:

```bash
# 1) sign in as the manager and let them issue a connection
curl -s -c jar.txt -H 'Content-Type: application/json' \
     -d '{"login":"leitung","pin":"1234"}' \
     http://localhost:8090/api/gold/staff/login.php

curl -s -b jar.txt -H 'Content-Type: application/json' \
     -d '{"action":"connect","label":"Judge"}' \
     http://localhost:8090/api/gold/staff/agent.php
# -> {"token":"…","api_base":"…","header":"Authorization: Bearer …"}

# 2) from here on, the agent is just that header
curl -s -H "Authorization: Bearer $TOKEN" \
     http://localhost:8090/api/gold/staff/dashboard.php
```

[`AGENT.md`](AGENT.md) is the rest: the endpoint recipes, the pacing, and where
the machine must stop. Hand that file to Claude Code, Grok or anything else that
can call HTTP and it will run the desk — the boundaries are enforced on the
server, not in the prompt.

Publishing that manual gives nothing away: every call in it needs a token a
manager issues on a running instance, and the whole API surface is readable in
`staff/app.js` anyway. What must never ship is in `.gitignore` — the sealing key,
`config.local.php`, the publisher `.env`.

**Sealing on chain is off by default** in the Docker demo (`flare.anchor_enabled`
in `api/lib/config.php`). Deals and bags still get their SHA-256 anchor and the
counter shows the whole flow; switching submission on needs a funded Coston2
submitter key, which is exactly the operator decision FCC removes later.

## Related: playandinvest.com

PaiGold shares its Flare foundation with **Play & Invest**, a free, ad-free
learning & gaming platform for kids and families (10 learning worlds, 450+ lessons,
30+ games): all crypto market prices there come live from **Flare FTSOv2 oracles**,
and the gold price comes from this same XAU/USD oracle.

## License / status

Commercial project in development; source published for hackathon review.
Contact: via GitHub or X [@PAIMultiverse](https://x.com/PAIMultiverse).
