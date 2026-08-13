# RunwayKeeper 🛡️

**Autonomous, Policy-Controlled DAO Treasury Execution Engine**

> RunwayKeeper is an autonomous treasury agent that pays approved recipients through KeeperHub while enforcing deterministic spending policies, surviving execution failures, and producing a verifiable on-chain audit trail for every decision and transaction.

---

## 🏆 Hackathon Demo — 5 Scenarios in One Click

The dashboard includes a **Demo Scenario Toolbar** to demonstrate the complete system in under 2 minutes:

| # | Scenario | What It Proves |
|---|----------|----------------|
| 2 | **Alice Payroll — $250 USDC** | Full autonomous payment: policy check → simulation → KeeperHub execution → on-chain confirmation |
| 3 | **Unknown Vendor — $2,000 USDC** | Deterministic policy rejection: recipient not in allowlist → POLICY_REJECTED status + audit log |
| 4 | **RPC Failure & Exponential Backoff** | Retry handling: simulated timeout → automatic retry on attempt 2 → eventual CONFIRMED |
| 5 | **High-Value Escalation — $650 USDC** | Human approval queue: exceeds $500 threshold → PENDING_APPROVAL → operator approves → execution resumes |
| 6 | **x402 Micro-Payment Execution** | Agentic paid access: external agent sends `x-payment` header → treasury intent created → pipeline runs |

---

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        RunwayKeeper                         │
│                                                             │
│  ┌──────────┐  Intent   ┌────────────┐  AI Advisory  ┌────┐│
│  │ API/x402 │──────────▶│ Agent (LLM)│──────────────▶│    ││
│  │ Fastify  │           └────────────┘               │    ││
│  └──────────┘                                        │Proc││
│       │                 ┌────────────┐  Deterministic│essr││
│       │                 │   Policy   │──────────────▶│    ││
│  ┌────▼─────┐           │   Engine   │               │    ││
│  │Dashboard │           └────────────┘               └──┬─┘│
│  │ Next.js  │                                           │   │
│  └──────────┘  ┌──────────────────────────────────────┐│   │
│                │  KeeperHub Execution Adapter          ││   │
│                │  simulate() → execute() → verify()   │◀┘   │
│                └──────────────────────────────────────┘     │
│                         │           │                        │
│                  ┌──────▼──┐  ┌────▼──────┐                │
│                  │  viem   │  │ Audit Log  │                │
│                  │ (Sepolia│  │ (Prisma)   │                │
│                  └─────────┘  └───────────┘                │
└─────────────────────────────────────────────────────────────┘
```

### Payment State Machine

```
CREATED → POLICY_CHECKED → SIMULATED → SUBMITTED_TO_KEEPERHUB → PENDING_ONCHAIN → CONFIRMED
                ↓                              ↓
         POLICY_REJECTED                    RETRYING (up to 3x with exponential backoff)
                                               ↓
         PENDING_APPROVAL (human gate)    EXECUTION_FAILED
```

---

## KeeperHub Integration

RunwayKeeper uses KeeperHub as its **primary autonomous execution layer**:

1. **Simulation** — `KeeperHubApiProvider.simulate()` calls KeeperHub's simulation endpoint and fails closed when it is unavailable
2. **Execution** — `KeeperHubApiProvider.execute()` submits ERC-20 transfer jobs with idempotency keys
3. **Status polling** — `waitForExecution()` polls for `success | failed | pending` status
4. **Retry handling** — Retryable errors (timeout, rate-limit, network) trigger exponential backoff (attempts 1→2→3)
5. **On-chain verification** — `verifyTransfer()` reads the receipt log and confirms the exact `Transfer(from, to, value)` event

---

## x402 Protocol

External AI agents can pay for treasury execution access via the HTTP 402 micro-payment standard:

```bash
curl -X POST http://localhost:3001/api/x402/execute-payment \
  -H "x-payment: <base64-signed-USDC-proof>" \
  -H "Content-Type: application/json" \
  -d '{
    "recipientAddress": "0x3C44CdD459693451D78155B39675694d4d125206",
    "recipientName": "External Agent Payee",
    "amount": "150.00",
    "tokenSymbol": "USDC",
    "purpose": "Paid agentic execution request",
    "idempotencyKey": "agent-run-1234"
  }'
```

Without the `x-payment` header, the server returns `HTTP 402` with the full payment specification.

---

## Policy Engine — 8 Deterministic Safety Guards

Every payment request passes through all 8 checks before execution:

| # | Check | Rule |
|---|-------|------|
| 1 | **Emergency Pause** | All payments suspended when `pauseState = true` |
| 2 | **Token Whitelist** | Only explicitly supported assets are allowed; the current execution path supports USDC |
| 3 | **Recipient Allowlist** | Recipient must be in the approved vendor registry |
| 4 | **Max Single Payment** | No single payment > $500 USDC |
| 5 | **Daily Spending Cap** | Total daily outflow ≤ $1,500 USDC |
| 6 | **Weekly Spending Cap** | Total weekly outflow ≤ $3,000 USDC |
| 7 | **Minimum Runway Floor** | Post-payment balance must stay ≥ $3,000 USDC |
| 8 | **Approval Threshold** | Amounts > $500 are escalated for human approval |

The AI agent layer is **advisory only** — it provides a risk score and explanation for the audit log, but cannot override the deterministic policy engine.

## Chain scope and wallet identity

RunwayKeeper currently targets Ethereum Sepolia. KeeperHub remains the only production transaction execution boundary; the OnchainKit wallet control identifies the operator and selected network, but it does not replace KeeperHub signing.

Solana is intentionally not presented as supported. A future Solana adapter must independently validate signer and account ownership, PDA derivation, replay protection, and devnet execution before being enabled.

RPC and KeeperHub failures are fail-closed. The application does not generate fake transaction hashes, substitute fake treasury balances, or mark unmatched transfer receipts as verified.

---

## Installation

### Prerequisites

- Node.js 20+
- npm or pnpm

### Quick Start

```bash
git clone https://github.com/your-org/runwaykeeper
cd runwaykeeper

npm install

# Initialize the SQLite database
npm run db:push

# (Optional) Add your OpenAI API key for AI agent evaluation
cp .env.example .env
# Edit .env and set OPENAI_API_KEY=sk-...

# Start the API server (port 3001)
npm run dev

# In a second terminal, start the dashboard (port 3000)
cd apps/dashboard && npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and click any demo scenario button.

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | Yes | SQLite path — `file:./dev.db` |
| `OPENAI_API_KEY` | No | GPT-4o for AI risk evaluation (falls back to deterministic logic) |
| `KEEPERHUB_API_KEY` | No | KeeperHub API key (falls back to mock execution for demo) |
| `RPC_URL` | No | Ethereum RPC for on-chain verification (defaults to public Sepolia) |
| `TREASURY_ADDRESS` | No | Treasury wallet address |
| `USDC_CONTRACT_ADDRESS` | No | USDC token contract (defaults to Sepolia USDC) |
| `X402_PAYMENT_ADDRESS` | No | Address that receives x402 micro-payment fees |

---

## API Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/health` | Health check |
| `GET` | `/api/treasury/balance` | USDC balance, reservations, daily/weekly spend |
| `GET` | `/api/treasury/runway` | Estimated runway days, burn rate |
| `GET` | `/api/payments` | List all payment intents |
| `GET` | `/api/payments/:id` | Payment intent detail with attempts |
| `POST` | `/api/payments/intent` | Submit new payment intent |
| `POST` | `/api/payments/:id/approve` | Human operator approval |
| `POST` | `/api/payments/:id/cancel` | Cancel a payment intent |
| `GET` | `/api/policy` | Current policy and approved recipients |
| `PUT` | `/api/policy` | Update policy spending limits |
| `POST` | `/api/policy/pause` | Emergency pause all execution |
| `POST` | `/api/policy/resume` | Resume execution after pause |
| `GET` | `/api/audit` | Last 50 audit events |
| `GET` | `/api/events` | SSE stream of live audit events |
| `POST` | `/api/x402/execute-payment` | x402 paid agentic execution |
| `POST` | `/api/dev/seed` | Reset seed data |
| `POST` | `/api/dev/trigger-payroll` | Demo: Alice weekly payroll |
| `POST` | `/api/dev/trigger-malicious` | Demo: Unknown recipient rejection |
| `POST` | `/api/dev/trigger-retry-demo` | Demo: Simulated failure + retry |
| `POST` | `/api/dev/trigger-approval-demo` | Demo: High-value human escalation |

---

## Tests

```bash
npm test
```

```
 ✓ tests/unit/policy.test.ts (10 tests)
 ✓ tests/unit/types.test.ts (4 tests)

 Test Files  2 passed (2)
      Tests  14 passed (14)
```

**Policy unit tests cover:** approved recipient approval, unknown recipient rejection, token whitelist rejection, max single payment enforcement, daily cap enforcement, weekly cap enforcement, minimum runway enforcement, emergency pause blocking, approval threshold escalation, and Zod schema validation.

---

## Monorepo Structure

```
runwaykeeper/
├── apps/
│   ├── api/            # Fastify REST API + x402 endpoint
│   └── dashboard/      # Next.js 15 dark-mode treasury dashboard
├── packages/
│   ├── types/          # Zod schemas + shared TypeScript types
│   ├── db/             # Prisma client + DB helpers
│   ├── policy-engine/  # 8 deterministic policy checks
│   ├── agent/          # GPT-4o AI advisory layer (with fallback)
│   ├── chain/          # viem: balance reads, verification, calldata
│   ├── audit-log/      # Event creation + SSE pub/sub
│   ├── keeperhub-adapter/  # KeeperHub API, dry-run, failure providers
│   └── processor/      # State machine: CREATED → CONFIRMED
├── prisma/schema.prisma
├── tests/unit/
└── .env.example
```

---

## Security

- All financial arithmetic uses `decimal.js` — no floating-point rounding errors
- Idempotency keys prevent duplicate execution on retries
- Balance reservations prevent double-spend across concurrent payments
- AI agent output is **strictly advisory** — deterministic policy engine has final authority
- Emergency pause can halt all execution instantly
- Human approval gate for payments above configurable threshold

---

## License

MIT © RunwayKeeper Contributors
