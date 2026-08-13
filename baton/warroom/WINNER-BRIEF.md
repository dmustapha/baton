# WINNER-BRIEF.md — Flare Summer Signal

> Selected by Dami after an 8-round Warroom exhausted novelty-first ideation (0 survivors) and a deliberate pivot to an **execution-first** strategy (event scores usefulness 30 + Flare-depth 30 + execution 20 = 80%; novelty 10%). Direction chosen, then **hard-verified on the live Coston2 chain before locking** (see `clause/SMART-ACCOUNTS-SPIKE.md`).

## Idea
**Name:** Baton (working name) — *one XRPL signature drives a whole Flare DeFi portfolio.*
**One-liner:** An XRP holder with **only an XRPL wallet** — no FLR gas, no EVM wallet, no bridge — signs **one** XRPL payment that atomically **mints FXRP and deploys it across multiple Flare vaults** via Flare Smart Accounts' custom multi-call.
**Track:** Interoperable Asset Products (single track, full commit).
**Why it wins:** genuine **multi-primitive depth** (Smart Accounts + FAssets mint + FTSO + FDC) and a self-custody demo that is *impossible without Flare* — and it goes **deeper than Flare's own single-vault Xaman demo** by exposing the atomic `Call[]` the official product doesn't.

## Ratings (honest)
- **Uniqueness ~6/10** — "we do what Flare's own flagship demo can't" (atomic multi-vault from one XRPL signature). Capped ~6 because Flare is publicly seeding the XRPL-intent→Flare space; not an invention.
- **Flare-depth ~8/10** (the 30% axis) — Smart Accounts (custom `Call[]`) + **real FAssets FXRP direct-mint lifecycle** + FTSO (valuation/trigger) + FDC (proof under the flow), all load-bearing. 8 is the honest ceiling (FCC is pre-production/cut; PMW has no builder interface).
- **Buildability** — GO, on **verified live infra** (operator with 52,581 executed txs) + a working reference CLI.

## Thesis
1. **WINNING ARGUMENT:** From only an XRPL wallet (no FLR gas, no EVM wallet, no bridge), one signed XRPL payment atomically mints FXRP and fans it across a multi-vault Flare portfolio — deeper than Flare's single-vault demo, winning on real multi-primitive depth + a self-custody "impossible-without-Flare" demo.
2. **EVIDENCE:** Verified live on Coston2 — MasterAccountController `0x4349…37c`; funded operator `0x103b38…` (**52,581 txs**); 4 live vaults; minting agent `0x55c815…`; provider XRPL wallet `rEyj8ns…`. Official CLI + audited contracts = working reference.
3. **DEMO OBLIGATION:** the judge WITNESSES a user holding ONLY an XRPL wallet sign one payment → FXRP mints → deposits into multiple Flare vaults atomically → positions appear on Flare, self-custody, no gas, in front of them. (Second beat: contrast with Flare's single-vault demo.)
4. **HERO FLOW:** XRPL sign (one payment, encoded custom `Call[]` instruction) → provider wallet → Flare operator fetches FDC proof + executes → PersonalAccount mints FXRP (Core Vault + agent) + atomic `Call[]` deposits into vault A + vault B (FTSO-priced) → portfolio live on Flare with a receipt.
5. **INVARIANTS:** (a) user never needs FLR gas or an EVM wallet — XRPL signature only; (b) the multi-action is ATOMIC (all-or-nothing `Call[]`); (c) real on-chain execution via the LIVE operator — no fabricated state; (d) real FXRP mint lifecycle (depth-8) or an honestly-labeled faucet fallback (depth-7); (e) built against the verified live addresses, not assumptions.
6. **DRIFT TRIPWIRES:** collapses to Flare's single-vault demo (loses the multi-call edge); requires the user to hold FLR gas / an EVM wallet (breaks the self-custody pitch); fabricates portfolio state; the "mint" silently becomes a faucet transfer with no disclosure; depends on an executor we'd have to build (we use Flare's live one).

## Non-negotiables
- Self-custody: the whole point is the user acts from XRPL only. Never require a Flare wallet/gas.
- Atomic multi-call (`Call[]`) is the differentiator vs the Xaman single-vault demo — it must be in the hero flow.
- Honest labels: if we fall to the faucet-FXRP fallback, say so; don't dress a faucet transfer as a mint.

## Build order + fail-fast gates
0. **Task 0 (hr ~2) — funded e2e validation:** faucet an XRPL testnet seed; run the reference CLI `encode fxrp-transfer | bridge instruction -` and confirm the live operator executes it on Coston2. **PASS → continue. FAIL → fall back to the plain FDC-Payment checkout** (documented fallback).
1. **Gate 1 (hr ~5–6) — mint depth:** real FXRP direct-mint (`fxrp-cr` path, agent `0x55c815…`) works end-to-end → **ship depth-8**. Too heavy → **faucet FXRP → depth-7** (still multi-vault, still deep).
2. Custom `Call[]` multi-vault deposit (2 vaults from `getVaults()`), atomic, from one XRPL signature.
3. FTSO valuation/price display (and stretch: price-gate the execution).
4. Next.js UI: XRPL sign → live status (FDC round ~90–180s) → portfolio positions + receipt. Honest sim/latency labels.
5. NEW_WORK.md + proof artifacts (tx hashes, contract addresses, the XRPL→Flare receipt).

## Stack
- Reuse/adapt the reference CLI clients (Python) OR reimplement the encode+bridge flow in **TS/viem** (flare-ai-skills has viem snippets) for a Next.js app. Foundry only if we add a custom `Call[]` target contract.
- Coston2 (chainId 114) + XRPL Testnet. User needs only XRPL testnet XRP; operator pays Flare gas.

## Risks / caveats (carry into Forge)
- FDC round ~90–180s per action → demo pacing (pre-warm / show live status honestly).
- Real direct-mint has more moving parts (collateral reservation, agent, mint payment) → hence the depth-7 fallback.
- `getXrplProviderWallets()` returns XRPL address STRINGS (not EVM) — decode accordingly.
- Resolve all Flare addresses via ContractRegistry; don't hardcode mutable ones.
- Competitor scan: eyeball the DoraHacks BUIDL list to confirm no team shipped this exact multi-vault-one-signature product before final lock.

## Handoff
Next: **hackathon-forge** — PRD + ARCHITECTURE + PLAN. Task 0 (funded e2e) is the first build step and the go/no-go for the whole approach; the faucet-FXRP checkout is the documented fallback. Prior confidential "CLAUSE" concept is retired (see PULSE W19/W20 walls). Verified facts in `clause/SMART-ACCOUNTS-SPIKE.md`.
