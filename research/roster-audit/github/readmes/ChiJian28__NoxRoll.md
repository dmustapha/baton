# NoxRoll — Confidential Payroll on iExec Nox

<p align="left">
  <img src="./logo.svg" alt="NoxRoll" width="280" />
</p>

**NoxRoll** is a confidential payroll module for on-chain treasuries. Companies can batch-pay employees in **encrypted cUSDC** on **Ethereum Sepolia** using **iExec Nox** (Intel TDX TEE). Individual salaries stay private; the **period aggregate** can be selectively disclosed to an auditor or published for public verification.

> Built for the [iExec WTF Hackathon — Summer Edition](https://discord.gg/RXYHBJceMe) · Nox confidential smart contracts (not PoCo / DataProtector).


## Why NoxRoll

Public payroll on-chain leaks every paycheck. NoxRoll keeps **per-employee amounts encrypted**, while still letting a company prove **how much was paid in total** this period — without modifying Safe/Uniswap/etc. as a hard dependency for the MVP.

| Guarantee | Mechanism |
|---|---|
| Salary privacy | Browser `encryptInput` → Nox Handle Gateway → `batchPay` with handles only |
| Aggregate accountability | On-chain `safeAdd` over encrypted amounts → period total handle |
| Selective disclosure | `addViewer` for auditor ACL |
| Public proof | `publishPeriodTotal` → `publicDecrypt` of the **sum only** |

Nox is **TEE-based confidential computing**, not FHE / “homomorphic encryption.”

## How Nox integrates into existing infrastructure

Hackathon judging asks for a **clean Nox integration into existing open infrastructure**, with privacy at the core, without rewriting the underlying protocol. NoxRoll does that at the **treasury + token rail** layer (not by forking Safe or Uniswap).

### What we integrate (shipped on Sepolia)

| Existing rail | How Nox is layered on | What we do *not* modify |
|---|---|---|
| **ERC-20 cash** (`MockUSDC` as USDC stand-in) | Wrap into **ERC-7984** via Nox’s official `ERC20ToERC7984Wrapper` → `ConfidentialUSDC` / cUSDC | The underlying ERC-20 contract / standard |
| **Treasury holdings** (any address that holds cUSDC) | Treasury calls `setOperator(payroll, until)`; payroll pulls with `confidentialTransferFrom` | How the treasury stores funds day to day |
| **Transparent payroll need** (batch payouts + auditability) | `NoxRollPayroll` accepts **encrypted** amounts (`encryptInput` → `fromExternal`), accumulates an encrypted period total (`safeAdd`), then optional ACL / public aggregate | Employee wallets, explorers, or the ERC-20 ledger model |

Privacy sits **inside** the payout path:

1. Company still holds a normal ERC-20 style balance, then wraps to cUSDC when ready to pay privately.  
2. HR submits **handles + proofs**, never plaintext salaries, into a payroll module.  
3. Recipients receive confidential balances; colleagues cannot read amounts from calldata.  
4. Accountability stays composable with transparent infra: publish **only the period sum** (`allowPublicDecryption` / `publicDecrypt`), while line items stay private.

That is the “route private value through Nox without breaking the public stack” idea, applied to **payroll / treasury ops** instead of a DEX swap.

### Product-shaped, Safe-ready (MVP honesty)

Suggested hackathon target: *Safe / treasury private payouts*. NoxRoll is designed as a **payroll module for a company treasury**:

- `treasury` is a configurable address (EOA **or** Safe).  
- Operator + `confidentialTransferFrom` matches how a multi-sig treasury would authorize a module to move funds **without** forking Safe.  
- `setTreasury` exists so a Safe can become the treasury when you wire governance.

**MVP today:** treasury = deployer EOA (demo HR relay). A Safe address is recorded in `deployments/sepolia.json` for the product story; a full Safe Zodiac/module UI is **stretch**, not claimed as done.

What *is* done and judge-verifiable on Sepolia: ERC-20 → ERC-7984 wrap, encrypted `batchPay`, encrypted period aggregation, auditor ACL, and public aggregate proof—all through **iExec Nox** primitives, without mocking the chain.

### Why this counts as clean integration

- **No protocol fork:** we import `@iexec-nox/nox-confidential-contracts` / `nox-protocol-contracts` and compose.  
- **Composable privacy:** public ERC-20 rails remain; Nox adds confidentiality where payroll amounts must not leak.  
- **Company-deployable shape:** encrypt in browser, module pulls from treasury, selective disclosure for auditors / public totals—the workflow a real finance team would recognize.

## Architecture

![NoxRoll architecture](./architecture.svg)

Five layers:

1. **CLIENT** — Next.js app (Admin / Employee / Auditor) + `@iexec-nox/handle` in the browser  
2. **API** — Fastify relay for demo HR writes; reads treasury / period / balances  
3. **NOX** — Public Sepolia Handle Gateway (encrypt / decrypt / ACL)  
4. **CHAIN** — `MockUSDC` → wrap `ConfidentialUSDC` (ERC-7984) → `NoxRollPayroll`  
5. **TRUST** — Employee decrypt · auditor viewer · publish aggregate · Etherscan proof panel  



## Live Sepolia deployment

| Contract | Address | Explorer |
|---|---|---|
| **NoxRollPayroll** | `0xcc5fd47c8a4c7ca459db3227b2f89c43c2bcfda9` | [Etherscan](https://sepolia.etherscan.io/address/0xcc5fd47c8a4c7ca459db3227b2f89c43c2bcfda9) |
| **ConfidentialUSDC** (cUSDC) | `0x18ebf7d5b1e8e886a29a190b0baf691e12f0025e` | [Etherscan](https://sepolia.etherscan.io/address/0x18ebf7d5b1e8e886a29a190b0baf691e12f0025e) |
| **MockUSDC** | `0x12cd21e051e08a0e963aa25c7ea54e324f2122bf` | [Etherscan](https://sepolia.etherscan.io/address/0x12cd21e051e08a0e963aa25c7ea54e324f2122bf) |
| NoxCompute (protocol) | `0x24ef36ec5b626d7dcd09a98f3083c2758f0f77bf` | — |

Also recorded in [`backend/deployments/sepolia.json`](./backend/deployments/sepolia.json).

**Verified E2E:** encrypted `batchPay` of **1500 + 800** → publicDecrypt period total **2300** USDC (6 decimals).

## Quick start

### Prerequisites

- **Node.js 22+** (`nvm use 22`)
- Sepolia ETH on the deployer (for API relay txs)
- MetaMask (or similar) on Sepolia for encrypt / decrypt
- Backend `.env` filled (see [`backend/.env.example`](./backend/.env.example) if present)

### 1. Backend API

```bash
cd backend
nvm use 22
npm install
npm run api
# → http://127.0.0.1:8787
```

Health check: `GET http://127.0.0.1:8787/health`

### 2. Frontend

```bash
cd frontend
cp .env.example .env.local
# set NEXT_PUBLIC_API_URL=http://127.0.0.1:8787
# optional: NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=...
npm install
npm run dev
# → http://localhost:3000
```

Open **Launch app** → `/app`.

### Optional: CLI scripts (same chain)

```bash
cd backend
npm run setup:treasury      # mint → wrap → setOperator → startPeriod
npm run payroll:run         # encrypt → batchPay
npm run payroll:auditor     # grant auditor on period total
npm run payroll:publish     # publish + publicDecrypt aggregate
```

Docker is **only** needed for local `hardhat test`. Sepolia uses the **public Nox** gateway (no self-hosted TEE).


## UI demo walkthrough

https://youtu.be/4150n2ezq5I

## How privacy works (Nox)

```
Admin UI
  → encryptInput(amount, 'uint256', payrollAddress)     # browser / Handle Gateway
  → POST /api/v1/admin/batch-pay { recipients, handles, proofs }
  → NoxRollPayroll.batchPay
       · Nox.fromExternal(handle, proof)
       · cUSDC.confidentialTransferFrom(treasury → employee)
       · Nox.safeAdd → encrypted period total
```

| Action | Who | Where |
|---|---|---|
| Encrypt salaries | Admin (browser) | `@iexec-nox/handle` |
| Relay `batchPay` / mint / wrap | Deployer key | Backend API |
| Decrypt own pay | Employee wallet | Client `decrypt` |
| View period sum (private) | Auditor after `grantAuditor` | Client `decrypt` |
| View period sum (public) | Anyone after publish | `publicDecrypt` / API |

**Hard rule:** never POST plaintext salary amounts to `/admin/batch-pay`.

`batchPay` max batch size = **5** (gas).


## Repo layout

```
.
├── architecture.svg          # Architecture diagram (this README)
├── README.md
├── backend/
│   ├── contracts/            # MockUSDC, ConfidentialUSDC, NoxRollPayroll
│   ├── api/                  # Fastify HTTP API (:8787)
│   ├── scripts/              # deploy, payroll, publish, decrypt helpers
│   ├── abis/                 # committed ABIs for clients
│   └── deployments/sepolia.json
└── frontend/
    ├── src/app/              # Landing `/` + App `/app`
    └── src/components/       # Admin / Employee / Auditor + Proof Explorer
```


## Tech stack

| Layer | Stack |
|---|---|
| Contracts | Solidity 0.8.35 · Hardhat 3 · `@iexec-nox/nox-*-contracts` · `nox-hardhat-plugin` |
| Confidentiality | `@iexec-nox/handle` · ERC-7984 · NoxCompute (Sepolia) |
| Backend | Node 22 · Fastify · viem · TypeScript |
| Frontend | Next.js 16 · React 19 · Tailwind 4 · wagmi · viem · Framer Motion |


## API surface (frontend)

| Method | Path | Purpose |
|---|---|---|
| GET | `/api/v1/config` | chainId, contracts, roles |
| GET | `/api/v1/treasury` | balances, operator, period |
| GET | `/api/v1/period/current` | period metadata (handles only) |
| GET | `/api/v1/balance/:address` | mUSDC + cUSDC handle |
| GET | `/api/v1/period/:id/total/public` | publicDecrypt after publish |
| POST | `/api/v1/admin/mint` · `/wrap` · `/set-operator` · `/start-period` | treasury setup |
| POST | `/api/v1/admin/batch-pay` | encrypted payroll only |
| POST | `/api/v1/admin/grant-auditor` · `/publish-total` | disclosure |

Full map: `GET http://127.0.0.1:8787/api/v1`


## Security & demo notes

- Deployer private key lives in `backend/.env` only (gitignored). Never commit secrets.  
- Admin relay is for **hackathon UX**; production would use Safe / multi-sig module calls.  
- Employee & auditor decryption require **their** wallets — the connected address must match ACL.  
- Each new payroll period needs a **fresh** auditor grant.


## Links

- Nox docs: https://docs.noxprotocol.io/  
- iExec: https://www.iex.ec/  
- Nox npm org: https://www.npmjs.com/org/iexec-nox  
- Repo: https://github.com/ChiJian28/NoxRoll  

---

## License

Hackathon submission — see repository for details.
