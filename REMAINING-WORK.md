# Baton — Remaining Work (resume guide)

Written 2026-08-14 ~04:10 UTC. Deadline 2026-08-14 19:59 UTC (internal safety 17:59 UTC).
Resume via the beacon `.conductor-resume.md` + PULSE.md. Build is COMPLETE and proven on-chain.

## State: what's DONE
- Phases 0-5 built. Thesis PROVEN on-chain (pivoted, DEV-007): one XRPL signature -> mint FXRP + deposit into a live Flare yield vault.
  - Task-0 mint 10 FXRP: Coston2 `0x0c33940a…`
  - One-sig upshift-cr-deposit -> 10 Upshift shares: Coston2 `0x5f4766e1…`
- Feature-complete Next.js app. Prod `next build` PASSES. Verified live: `/api/price`, `/api/positions` (real 10 FXRP, FTSO-valued), `/proof`, `seed-demo` all PASS.
- Submission materials done: README.md, submission/DETAILS-BODY.md, submission/proof.md, NEW_WORK.md, BUILD-REPORT.md, Dockerfile.
- Balances: demo XRPL ~79.9 XRP, backend FLR key 100 C2FLR (both funded for more runs).

## Remaining (in priority order)

1. **DEPLOY (needs user, ~30 min).** App needs Node+Python at runtime, so NOT Vercel. Use the Dockerfile.
   - `flyctl auth login` (or `railway login`), then `fly launch` / `fly deploy` (image builds the CLI venv).
   - OR run judge-side from the Dockerfile (already documented in README). A live URL is nice-to-have, not the thesis (PLAN 4.5).
   - After deploy: set the deployed URL in the DoraHacks submission + README + confirm `/api/price` responds.

2. **DEMO VIDEO (heavy, ~2-3h, fresh session).** Run the demo-video / hackathon-demo skill. Keep < 3 min (brief §Demo). Must show: one real outcome (the deposit landing = shares appear), one exact tx (the Coston2 deposit `0x5f4766e1…`), one failure-safeguard, network+chainId on screen. Pre-warm a real cr-deposit before recording (operator FDC round is ~90-180s — do NOT edit it out dishonestly; show the honest wait). `node scripts/one-sig-deposit.mjs upshift 1` creates a fresh real deposit; the app status strip shows the live round.

3. **PACKAGE / SUBMIT.** DETAILS-BODY.md is paste-ready (markdown). For the DoraHacks rich-text editor, run `/detail` to emit the paste-ready HTML (per Dami's blueprint). Submit with: name Baton, track Interoperable Asset Products, description + target user (from README), demo link (deployed URL or video), GitHub repo, Flare-use explanation, NEW_WORK boundary, contracts + tx links, roadmap.

4. **Optional pipeline phases (fresh sessions):** formal hackathon-debug, hackathon-wire, hackathon-verify (milestone + preflight), design_forge polish, hackathon-stress, hackathon-interrogate. The build already self-verified (tsc clean, vitest 7/7, live checks, prod build). These add rigor but the app is submittable now.

## Key gotchas for the next session
- The WORKING deposit is `{strategy}-cr-deposit` (mint+deposit, 2 XRPL payments, self-replenishing). Pure `{strategy}-deposit` of existing FXRP does NOT execute (operator needs the mint-flow approve). `lib/jobs.ts` drives the cr-deposit; `/api/deposit` spawns it detached, `/api/status` polls the chain.
- Custom multi-vault (`custom-instruction`) is NOT deployed on Coston2 (DEV-007). Do not revive it. `lib/encode.ts`/`encode.test.ts` are archived-but-valid.
- The Python CLI venv lives at `../smart-accounts-cli/venv` (Python 3.12 via uv; system py3.14 lacks wheels). CLI `.env` has the demo seed + backend FLR key.
- npm install deadlocks in this env (lock contention) — use `bun install`. TypeScript pin must be a valid version (caret ranges in package.json).
- Conductor state freezes chmod 444 on dispatch; `chmod u+w` before editing + refresh `.conductor-lock/phase-ownership.json` checksum.
