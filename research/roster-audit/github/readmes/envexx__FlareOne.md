<p align="center">
  <img src="public/flareone-hero-editorial.png" alt="FlareOne hero" width="720" />
</p>

<h1 align="center">🔥 FlareOne</h1>

<p align="center"><b>The AI Command Center for the Flare Ecosystem</b></p>

<p align="center">
  <a href="https://dev.flare.network"><img src="https://img.shields.io/badge/Network-Coston2-ff6d00?style=flat-square" alt="Coston2" /></a>
  <a href="#"><img src="https://img.shields.io/badge/Hackathon-Summer%20Signal%202026-e62058?style=flat-square" /></a>
  <a href="#"><img src="https://img.shields.io/badge/Bounty-Interoperable%20Asset%20Products-111111?style=flat-square" /></a>
  <a href="#"><img src="https://img.shields.io/badge/Tests-107%20passing-22c55e?style=flat-square" /></a>
  <a href="#"><img src="https://img.shields.io/badge/Next.js-14-000000?style=flat-square&logo=nextdotjs" /></a>
  <a href="#"><img src="https://img.shields.io/badge/License-MIT-94a3b8?style=flat-square" /></a>
</p>

<p align="center">
  From natural-language intent to on-chain execution — across FAssets, FTSOv2, FDC, Firelight, and Flare Smart Accounts.
</p>

---

> **"The user should describe what they want, not how to do it."**

## 📑 Table of Contents

- [About](#-about)
- [✨ Live on Coston2 Today](#-live-on-coston2-today)
- [🏗️ Architecture](#️-architecture)
- [📦 Tech Stack](#-tech-stack)
- [🚀 Quick Start](#-quick-start)
- [🔗 Flare Integration](#-flare-integration)
- [📜 Smart Contract](#-smart-contract)
- [🧭 Roadmap](#-roadmap)
- [📄 License](#-license)

## 📖 About

FlareOne is a non-custodial AI Command Center for the Flare ecosystem, built for **Flare Summer Signal 2026 — Bounty 1 (Interoperable Asset Products)**.

Instead of navigating wallets, FAssets, oracles, vaults, and automation tools separately, Flare users describe a goal in natural language. FlareOne turns it into an explainable, policy-bounded plan and executes only through **independently verified route adapters** — with the user signing every sensitive action.

**Where it's heading:** after the hackathon, FlareOne moves to **Flare Mainnet** — live FXRP minting and redemption, delegated execution through Flare Smart Accounts, validated swap routes, and later private workflows on Flare Confidential Compute.

## ✨ Live on Coston2 Today

- ✅ **Portfolio reads** — real C2FLR, FTestXRP, and Firelight vault share balances from Coston2 RPC
- ✅ **FTSOv2** — live XRP/USD price and freshness checks
- ✅ **Firelight deposit** — verified FTestXRP → Firelight vault flow with exact approval and receipt/event/share verification (user-signed)
- ✅ **FXRP preflight** — AssetManager, XRPL vault address, mint fees, and minimum redeem resolved from the Flare Contract Registry
- ✅ **Policy engine** — allowlisted contracts, per-action and daily limits, slippage, expiry, pause
- ✅ **Adaptive scheduler + audit ledger** — 5/15/60-minute evaluation cadence with recorded events
- ✅ **Private Telegram notifications** — bot token encrypted server-side (AES-256-GCM)

> Swap, FAssets mint/redeem execution, and Smart Account delegation are analyzed but reported honestly as **not yet verified** — no fabricated calldata, no fake routes.

## 🏗️ Architecture

```
┌─────────────────────────────────────┐
│  LAYER 1: UI (Next.js + Tailwind)  │  AI Command Bar, Dashboard,
│                                     │  Workflow Builder, Strategies
├─────────────────────────────────────┤
│  LAYER 2: API (Next.js API Routes) │  Intent parsing, Workflow engine,
│                                     │  Portfolio aggregation
├─────────────────────────────────────┤
│  LAYER 3: AI Agents                │  Planner, Research, Risk,
│  (Vercel AI SDK + Multi-Model)     │  Execution, Notification
├─────────────────────────────────────┤
│  LAYER 4: Flare Protocols          │  FAssets, FTSO, FDC,
│                                     │  Smart Accounts, EVM
└─────────────────────────────────────┘
```

## 📦 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Next.js 14, Tailwind CSS, shadcn/ui, React Flow |
| **Backend** | Next.js API Routes, Prisma ORM |
| **Database** | PostgreSQL |
| **AI** | Vercel AI SDK (OpenAI, Anthropic, Groq, Google AI — BYOK) |
| **Wallet** | Wagmi v2, RainbowKit |
| **Smart Contract** | Solidity (Hardhat), FlareOneOrchestrator |
| **Deployment** | Local dev + Coston2 testnet (deployment target: Vercel + Railway) |

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Set up database
npx prisma db push

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Run the test suite:

```bash
npm test        # 37 files · 107 tests
npm run build   # production build
```

## 🔗 Flare Integration

FlareOne deeply integrates with four core Flare protocols:

| Protocol | Role |
|----------|------|
| **FAssets / FXRP** | Mint, bridge, and manage wrapped non-smart-contract assets |
| **FTSO** | Real-time enshrined price feeds for risk assessment and portfolio valuation |
| **FDC** | Cross-chain event verification for workflow step confirmation |
| **Flare Smart Accounts** | Multi-step transaction execution in a single approval session |

## 📜 Smart Contract

**FlareOneOrchestrator** — on-chain workflow orchestrator *(design/prototype, not yet deployed)*:

- Batch execution of multi-protocol steps in a single transaction
- Per-step `requireFTSOVerification` / `requireFDCConfirmation` flags *(stub hooks — live FTSO/FDC calls are the next milestone)*
- 5-minute timelock safety window with cancel capability
- Full on-chain audit trail via events

> Current demo execution runs through direct wallet signatures (Wagmi); the orchestrator is the roadmap path to delegated execution.

See [`contracts/contracts/FlareOneOrchestrator.sol`](contracts/contracts/FlareOneOrchestrator.sol).

## 🧭 Roadmap

| Phase | Focus |
|-------|-------|
| **01 · Intent Foundation** *(current)* | AI Chat, Wallet Connect, Workflow Builder, Intent→Workflow, Telegram Notification, Strategy Library |
| **02 · On-chain Automation** *(next)* | Visual builder, delegated execution via Flare Smart Accounts, persistent automation, monitored recovery |
| **03 · Strategy Marketplace** | Community strategies — discovery, forking, ratings, creator attribution |
| **04 · Autonomous Portfolio** | Auto rebalancing, AI risk scoring, yield optimizer |
| **05 · Private Intelligence** | Confidential workflows, encrypted prompts (FCC) |
| **06 · Developer Platform** | SDK, public API, plugin system |

## 📄 License

[MIT](LICENSE) — Built for Flare Summer Signal Hackathon 2026.
