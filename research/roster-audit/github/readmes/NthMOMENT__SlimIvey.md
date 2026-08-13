![SlimIvey](assets/logo.png)

# SlimIvey

**SlimIvey reads the sharp money so you don't have to.** Pay 0.05 USDC via x402, get the signal AI agents act on, settled cross-chain via CCTP on Injective.

Built for the [Injective Global Cup Hackathon](https://xsxo494365r.typeform.com/to/TMaGb1du) by [NTH MOMENT](https://nthmoment.xyz).

## What problem this solves

Sharp odds movement — the moment professional/"sharp" money moves a line before the public notices — is one of the highest-signal indicators in sports betting markets. It's also almost entirely paywalled and locked behind manual dashboards built for human bettors, not the AI agents that are increasingly the ones doing the watching and the trading. SlimIvey exposes that signal as a machine-payable, machine-callable primitive: no account, no subscription, no human clicking "subscribe" — an agent with a funded wallet can discover the tool, pay for exactly what it uses, and get verified data back in the same call.

## What it does

1. A **sharp odds movement detector** (ported from [SolBet](https://github.com/NthMOMENT/SolBet)) watches odds price history per fixture/market and flags moves greater than a threshold (default 2%) within a 60-second window.
2. Access to signals is gated behind an **x402 micropayment** (0.05 USDC) on Injective — no payment, no data.
3. The whole thing is exposed as an **MCP tool** (`get_sharp_signals`) so an AI agent can call it autonomously, with the payment happening transparently underneath the tool call.
4. Payment can originate as USDC on **any CCTP-supported chain**, not just Injective — CCTP handles the cross-chain burn/mint so the user never has to manually bridge first.

## How users interact with it

- **Directly over HTTP**: `GET /signals?fixture_id=...&threshold=...` — returns `402 Payment Required` with the exact price/asset/recipient until a valid x402 payment header is attached, then returns the signal data.
- **As an AI agent, via MCP**: connect any MCP client to `gateway/src/mcp-server.ts` and call the `get_sharp_signals` tool. The agent supplies only `fixture_id` (optional) and `threshold` (optional) — payment is handled entirely server-side by the tool's own funded wallet, the same way any autonomous x402 client would pay for any other API.

## Architecture

```
                                   ┌─────────────────────────┐
   AI agent (MCP client) ───────▶ │  MCP server               │
                                   │  get_sharp_signals tool   │──┐
                                   └─────────────────────────┘  │ pays x402
                                                                  │ (own wallet)
   curl / any HTTP client ───────────────────────────────────────┤
                                                                  ▼
                                   ┌─────────────────────────┐
                                   │  Gateway (Express)        │
                                   │  x402-gated GET /signals  │
                                   └────────────┬────────────┘
                                                │ verify + settle
                                                ▼
                                   ┌─────────────────────────┐
                                   │  Facilitator service      │
                                   │  submits transferWith-    │
                                   │  Authorization, confirms  │
                                   │  via on-chain state read  │
                                   └────────────┬────────────┘
                                                │
                                                ▼
                                     Injective EVM Testnet
                                     (payment settlement)

   USDC on Arc / any CCTP chain ──▶ burn ──▶ Circle attestation ──▶ mint on Injective
                                     (gateway/src/cctp.ts — cross-chain settlement)

   Gateway ──▶ spawns ──▶ signal-engine/replay.py (Python, unchanged detection algorithm)
```

## The four Injective technologies used

### 1. Injective EVM

All payment settlement happens on Injective's EVM execution layer (testnet chain ID `1439`, mainnet `1776`). USDC is native on Injective via Circle's direct deployment (not a bridged/wrapped token), and supports EIP-3009 `transferWithAuthorization` — the mechanism x402 payments use to let a payer sign a transfer off-chain with no gas cost to them.

### 2. x402 — the payment gate

[`gateway/src/server.ts`](gateway/src/server.ts) wraps `GET /signals` in `injectivePaymentMiddleware` from `@injectivelabs/x402`. A request without a valid `PAYMENT-SIGNATURE` header gets `402 Payment Required` with the exact price (0.05 USDC), asset, network, and recipient. A client with funds signs an EIP-3009 authorization (no gas, no on-chain action yet), retries the request with that signature, and only then does settlement happen and the handler run.

Settlement itself is handled by a small custom facilitator ([`gateway/src/facilitator-service.ts`](gateway/src/facilitator-service.ts)) rather than the SDK's built-in one. Reason: Injective's public testnet RPC reliably executes submitted transactions but its `eth_getTransactionReceipt` index was observed, repeatedly and reproducibly, to lag for minutes (sometimes indefinitely) behind actual chain state — while state reads (`eth_call`) resolved promptly every time. The SDK's default facilitator confirms settlement by waiting on a receipt and times out on this RPC even when the payment already succeeded on-chain (verified manually multiple times: wallet balance moved by exactly the payment amount while the receipt lookup for that same transaction returned `null`). The custom facilitator submits the same `transferWithAuthorization` transaction, then confirms via `authorizationState` (a state read) instead of waiting on the receipt index — same trust model, more reliable on this specific RPC.

### 3. CCTP — cross-chain settlement

[`gateway/src/cctp.ts`](gateway/src/cctp.ts) implements the full CCTP V2 burn → attest → mint flow: `depositForBurn` on the source chain's `TokenMessengerV2`, poll Circle's Iris API for the attestation, `receiveMessage` on Injective's `MessageTransmitterV2`. This lets a user (or an agent) hold USDC on a different chain and still settle on Injective — SlimIvey never has to touch any chain but Injective directly.

This isn't decorative: it's how this project's own test wallet got its Injective testnet USDC in the first place. Circle's public faucet doesn't support Injective testnet directly, so USDC was drawn from Circle's **Arc Testnet** faucet and bridged to Injective Testnet with exactly this code path — burn on Arc, attested by Circle, minted on Injective, verified by watching the destination balance increase on-chain.

Try it: `npm run cctp-bridge -- --amount 1` (see [Setup](#setup) below).

**Supported chains**: CCTP V2 is deployed identically (same `TokenMessengerV2`/`MessageTransmitterV2` addresses via CREATE2) across 23 testnet chains — Ethereum Sepolia, Avalanche Fuji, OP Sepolia, Arbitrum Sepolia, Base Sepolia, Polygon Amoy, Unichain Sepolia, Linea Sepolia, Codex Testnet, Sonic Testnet, World Chain Sepolia, Monad Testnet, Sei Testnet, XDC Apothem, HyperEVM Testnet, Ink Testnet, Plume Testnet, **Arc Testnet**, EDGE Testnet, **Injective Testnet**, Morph Hoodi Testnet, Pharos Testnet, and Cronos Testnet (source: [Circle CCTP contract addresses](https://developers.circle.com/cctp/references/contract-addresses)). `gateway/src/cctp.ts` currently wires and tests the Arc ↔ Injective pair; adding another source chain is a matter of adding its `CctpChainConfig` (RPC, chain ID, domain, USDC address) — the burn/attest/mint logic is chain-agnostic.

### 4. MCP Server — agent-callable interface

[`gateway/src/mcp-server.ts`](gateway/src/mcp-server.ts) exposes one tool, `get_sharp_signals`, over the Model Context Protocol (stdio transport):

- **Input**: `fixture_id` (optional string), `threshold` (optional number, default 0.02)
- **Output**: verified sharp movement signals, returned only after the x402 payment for this call has settled

Deliberately, payment details are **not** part of the tool's input schema. The MCP server holds its own funded wallet and pays the x402 gate on every call — an agent invokes the tool exactly like any other read-only tool, and the payment happens underneath it with no human approval step. That's the actual point of x402 for agents: no API keys, no subscription flow, no human in the loop.

## Custody model

SlimIvey never holds a user's private key. A payer signs an EIP-3009 `transferWithAuthorization` off-chain (their key never leaves their own environment); the facilitator only ever submits that *exact*, bounded, single-use authorization — it cannot move any amount beyond what the user signed, and has no access to the user's other funds. This is the standard x402/EIP-3009 trust model, not something SlimIvey adds on top.

The wallets configured in this repo (`FACILITATOR_WALLET_PRIVATE_KEY`, `DEV_WALLET_PRIVATE_KEY`) are SlimIvey's *own* operating wallets — one is the merchant/facilitator wallet that receives payment and pays gas, the other is a test wallet standing in for "the agent" during development and demos. A real calling agent would hold and sign with its own key exactly as `gateway/scripts/client-pay-demo.ts` and `gateway/src/mcp-server.ts` do — it never hands that key to SlimIvey.

## Prompt injection note

The signal engine (`signal-engine/`) is read-only: it parses a CSV, runs a threshold/windowing comparison, and returns data. There is no code path from a tool argument, a replayed data value, or the detector's own output to any wallet operation, transaction, or fund transfer. The one and only transaction SlimIvey's server-side code ever initiates is the fixed-price x402 settlement for the current request, executed before the signal engine runs at all — a malicious or manipulated `fixture_id`/`threshold` argument can change *which signals come back*, never *whether or how much gets paid or moved*.

## Setup

Prerequisites: Node 20+, Python 3.12+, an Injective EVM testnet RPC (public default works), two funded testnet wallets (one for gas/settlement, one to act as payer).

```bash
cd gateway
npm install
cp .env.example .env   # fill in DEV_WALLET_PRIVATE_KEY / FACILITATOR_WALLET_PRIVATE_KEY, etc.

cd ../signal-engine
python3 -m venv .venv  # no third-party deps required — stdlib only
```

Run the facilitator service and gateway (two terminals, from `gateway/`):

```bash
npm run facilitator   # port 4022
npm run dev           # port 4021 — the x402-gated GET /signals
```

Pay for a signal batch as a plain HTTP client:

```bash
npm run pay-demo
```

Call it as an AI agent would, over MCP:

```bash
npm run mcp-test
```

Bridge USDC cross-chain (Arc Testnet → Injective Testnet) via CCTP:

```bash
npm run cctp-bridge -- --amount 1
```

Replay the signal engine directly (no payment, no server):

```bash
cd signal-engine
.venv/bin/python3 replay.py --fixture-id wc2026-final --format json
```

## Note on demo data

The live World Cup TxLINE feed that the original [SolBet](https://github.com/NthMOMENT/SolBet) scanner streamed from has ended (tournament concluded). `signal-engine/data/sample_ticks.csv` is synthetic historical tick data standing in for that feed, engineered to include both clear sharp movements and sub-threshold noise so the detector's behavior is demonstrable and verifiable. The detection algorithm itself (`signal-engine/signals.py`) is unchanged from `txline_scanner.py` — only the price-update source changed, from a live SSE stream to a historical CSV replay.

## Demo video

See [docs/demo-script.md](docs/demo-script.md) for the shot list and exact commands.

## Repo layout

```
gateway/                 TypeScript — x402 gate, facilitator, MCP server, CCTP bridge
  src/server.ts             x402-gated GET /signals
  src/facilitator-service.ts  custom x402 facilitator (state-poll settlement confirmation)
  src/mcp-server.ts          MCP server, get_sharp_signals tool
  src/cctp.ts                CCTP V2 burn/attest/mint
  src/signalEngine.ts        spawns the Python replay engine, parses its output
  scripts/                   demo/test scripts (pay-demo, mcp-test, cctp-bridge)
signal-engine/            Python — detection algorithm, unchanged from SolBet
  signals.py                 pure detection logic (ported from txline_scanner.py)
  replay.py                  historical CSV replay CLI
  data/sample_ticks.csv      synthetic demo data
```

## License

MIT — see [LICENSE](LICENSE).
