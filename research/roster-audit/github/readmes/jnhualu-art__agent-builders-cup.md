# ABCMM — Agent Builders Cup Entry

**ABCMM** (Agent Builders Cup Market Maker) — a Flare-powered market-making
agent for the [Agent Builders Cup](https://botcamp.xyz/hackathons/agent-builders-cup-1)
(Botcamp · Flare ecosystem). Built as a **Condor Agent** (LLM-driven, Hummingbot
execution layer).

> ⚠️ **What this competition actually is:** a *live trading-agent* competition.
> Each agent races with **$800–1000 USDC** of sponsor-provided capital on a real
> exchange for a 48h livestreamed final. It is NOT a confidential-compute/TEE
> hackathon — Flare's role here is **FTSO v2 decentralized fair value + FXRP
> inventory**, not enclaves.

---

## The Flare differentiator

Every other builder anchors quotes to a single CEX mid (washable / manipulable /
dislocatable on wicks). **We anchor to Flare FTSO v2** — an enshrined oracle
updated every ~1.8s by 98 independent providers with Flare's full economic
security. The agent's fair value is manipulation-resistant by construction.

```
XRP/USD FTSO v2  ──►  fair_value anchor
        │
        ├── vs CEX mid ──► dislocation capture (mean-reversion edge)
        └── inventory skew ──► neutral inventory management
```

`src/abc_ftso.py` resolves `FtsoV2` via `FlareContractRegistry`
(`0xaD67FE66660Fb8dFE9d6b1b4240d8650e30F6019`, same on all Flare networks) and
reads `getFeedById(0x015852502f555344...)`.

## Venues (apply to both teams)

| Team | Venue | Pair | Why |
|------|-------|------|-----|
| **Gate** | Gate.io (CEX) | XRP-USDT | Easy to run (API key); FTSO fair value still applies |
| **XRPL** | XRPL native DEX | XRP/RLUSD | Purest Flare fit — FTSO tunes XRP spread on-chain |

Apply independently to each: Gate · XRPL. Each team picks its own 2 agents.

## File structure

```
agent-builders-cup/
├── src/
│   ├── abc_ftso.py          # FTSO v2 fair-value client (the ABC edge)
│   └── fk_*.py              # (legacy) ports from FlareKeeper — NOT used by ABCMM
├── strategy/
│   ├── strategy.md          # Condor strategy (system prompt for the tick LLM)
│   └── abc_fairvalue_routine.py  # Condor routine: FTSO fair value + context
├── config/
│   └── agent_config.py      # venues, risk limits, FTSO settings, deadlines
└── docs/
    └── SUBMISSION.md        # step-by-step submit + run checklist
```

> **Naming note:** files prefixed `abc_` are ABCMM's own code. Files prefixed
> `fk_` are FlareKeeper leftovers (from the *other* Flare hackathon — Flare
> Summer Signal). They are kept only as reference and are **not** imported by
> ABCMM.

## How to run (Condor stack)

Requires **Linux/macOS or WSL2 + Docker** (Windows users: WSL2 Ubuntu).

1. Install Condor: `curl -fsSL https://raw.githubusercontent.com/hummingbot/deploy/main/setup.sh | bash`
2. Add your LLM (Claude/Gemini) and exchange API keys (trade perms) via Telegram `/keys`.
3. Create the routine: `manage_routines(action="create_routine", name="abc_fairvalue", code=...)`
4. Create the strategy: `manage_trading_agent(action="create_strategy", name="ABCMM", instructions=<strategy.md>, agent_key="claude-code", default_config={trading_pair:"XRP-RLUSD", frequency_sec:60, total_amount_quote:800, execution_mode:"loop"})`
5. Dry-run, then go live (loop). Apply to Gate + XRPL teams.

See `docs/SUBMISSION.md` for the full checklist and judging fit.

## Judging fit (Volume · PnL · HBOT Vote)

- **Volume** — two-sided quotes on a liquid pair across Gate + XRPL.
- **PnL** — decentralized fair value avoids being picked off on dislocated wicks.
- **HBOT Vote** — a clearly *Flare-native* agent stands out from generic CEX MMs.

## Deadlines (Series 1)

- Registration close: **2026-08-15**
- Submission close: **2026-08-31**
- Judging: 2026-09-01 → 09-30
- Finals: 2026-10-01 → 10-02 (48h livestream)
- Winners: 2026-10-07 (Token2049, Singapore)
