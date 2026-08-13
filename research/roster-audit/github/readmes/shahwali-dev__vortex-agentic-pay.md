# 🌪️ Vortex Agentic Pay

[![Hackathon](https://img.shields.io/badge/Hackathon-MetaMask%20x%201Shot%20x%20Venice-orange?style=flat-square)](https://devpost.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![Framework](https://img.shields.io/badge/Framework-Next.js%2015%20(App%20Router)-black?style=flat-square)](https://nextjs.org/)
[![Architecture](https://img.shields.io/badge/Architecture-Turbo%20Monorepo-blueviolet?style=flat-square)](https://turbo.build/)

An enterprise-grade, localized autonomous agent infrastructure that orchestrates non-custodial, gas-abstracted on-chain transactions. Powered by **MetaMask Smart Accounts Kit**, **1Shot Permissionless Relayer**, and **Venice AI (Privacy-first Intellect Layer)**, Vortex Agentic Pay enables secure machine-to-machine context execution and programmatic web3 payments.

---

## 💎 Architectural Highlights & Engineering Excellence

Vortex Agentic Pay is built from the ground up to support high-throughput, latency-optimized autonomous workflows without compromising user privacy or regional infrastructure limits.

- **Granular Execution Permissions (ERC-7715 & ERC-7710):** Implements rule-based, fine-grained delegation flows. Users delegate temporal budget constraints (e.g., spending limits per day/week) using the MetaMask Smart Accounts Kit, allowing the autonomous engine to act on their behalf smoothly.
- **Zero-Overhead Gas Abstraction:** Integrates **1Shot API’s Public Relayer** to completely eliminate transaction failure risks due to gas variance. Accounts are dynamically upgraded via **EIP-7702 authorizations** and pay for network usage permissionlessly in stablecoins (USDC/USDT), bypassing standard paymaster funding debt.
- **Privacy-Preserving Intelligence Layer:** Leverages **Venice AI API** for uncensored, zero-surveillance agent reasoning. Utilizing advanced open-weights frontier models with built-in parameter options like real-time web search (`enable_web_search`) and automated scraping capabilities.

---

## 🛠️ System Architecture Diagram

```text
┌────────────────────────────────────────────────────────┐
│               MetaMask Smart Accounts Kit              │
│  (EIP-7702 Account Upgrade & ERC-7715 Permissions)     │
└────────────────────────────────────────────────────────┘
                           │
                           │ Sovereign Session Intent
                           ▼
┌────────────────────────────────────────────────────────┐
│               Vortex Agent Execution Engine            │
│  (Privacy-Preserving Inference via Venice AI Gateway)  │
└────────────────────────────────────────────────────────┘
                           │
                           │ Structured Payload Generation
                           ▼
┌────────────────────────────────────────────────────────┐
│               1Shot Permissionless Relayer             │
│  (Gas Abstraction Matrix & ERC-7710 Budget Compliance) │
└────────────────────────────────────────────────────────┘
                           │
                           │ Gasless Broadcast
                           ▼
              ┌──────────────────────────┐
              │  Hardened On-Chain State │
              └──────────────────────────┘
```

---

## 🖥️ Application Preview & User Interface

The Vortex Agentic Pay dashboard features a modular split-frame layout engineered for complete sovereign control and live telemetry monitoring.

![Vortex Agentic Pay Dashboard](https://github.com/user-attachments/assets/c2bb2692-6e8d-4bac-85b1-6298e0ac9ccc)

### Core Interface Modules:
1. **Sovereign Account Controller:** A linear onboarding channel that orchestrates the MetaMask Flask connection, executes the local smart account cryptographic upgrade, and signs off on temporal spending permissions (e.g., 10 USDC/Week).
2. **Executive Agent Terminal:** A clean CLI telemetry log that monitors network status, active decentralized identifiers, pending `ERC-7715` permissions, and live execution cycles triggered via privacy-first agents.

---

## 📂 Repository Structure & Workspaces

The architecture leverages a high-performance **Turbo Monorepo** managed via `pnpm workspaces` for absolute dependency isolation and ultra-fast build pipelines.

```text
.
├── apps
│   ├── web-app            # Next.js 15 Frontend Dashboard Interface
│   └── x402-server        # Hardened Transaction Execution Node Server
├── packages
│   ├── smart-account-core # Cryptographic Delegation & ERC-7715 Framework Matrix
│   └── venice-agent       # Privacy-Preserving Agentic Logic & Inference Bridge
├── docker-compose.yml     # Multi-Container production mesh orchestration
├── Tiltfile               # Real-time multi-service CLI development engine
└── turbo.json             # Turborepo caching compilation pipelines
```

---

## ⚙️ Technology Stack

- **Core Infrastructure Framework:** Turborepo Monorepo Core Architecture
- **Web Interface App:** Next.js 15 (Hardened App Router, Standalone Layer Isolation)
- **Web3 Interface Core:** MetaMask Smart Accounts Kit (`@metamask/smart-accounts-kit`), Viem v2
- **Relayer Orchestration:** 1Shot API Public Relayer Core Hook Execution System
- **LLM Context Engine:** Venice AI SDK (OpenAI-compatible Private Inference Gateway)
- **Package Infrastructure:** `pnpm` Monorepo Workspaces (Strict dependency isolation)
- **Container Sandbox:** Tilt Engine / Docker Build Pipeline (Non-root user configuration)

---

## 🚀 Local Development & Setup Workflow

Because Vortex Agentic Pay is an enterprise-grade solution utilizing localized secure environments, the stack runs inside **three isolated runtime processes**.

### 1. Environment Preparation
Ensure your environment variables are set up accurately. Clone the repository and generate your configuration mapping:

```bash
git clone [https://github.com/shahwali-dev/vortex-agentic-pay.git](https://github.com/shahwali-dev/vortex-agentic-pay.git)
cd vortex-agentic-pay
cp .env.example .env
```

Ensure your `.env` contains the correct endpoints for Venice AI and 1Shot infrastructure:
```env
VENICE_API_KEY=your_secure_venice_api_key
NEXT_PUBLIC_1SHOT_RELAYER_URL=[https://relayer.1shotapi.com/relayers](https://relayer.1shotapi.com/relayers)
```

### 2. Monorepo Installation
Execute a clean dependency map lock optimization via `pnpm`:

```bash
# Clean high-performance workspace package installation
pnpm install
```

### 3. Running the Multi-Service Stack (3 Terminals Matrix)

#### Option A: Automatic Dev Orchestration (Recommended)
If you have **Tilt** installed on your Native Linux/Ubuntu environment, spin up all three servers with full telemetry logging using a single execution command:
```bash
tilt up
```

#### Option B: Manual Monorepo Execution
Alternatively, open three parallel terminal instances to securely segment runtime loops:

* **Terminal 1 (Frontend):** Run the web client interface
  ```bash
  pnpm --filter @vortex/web-app dev
  ```
* **Terminal 2 (X402 Server):** Run the core transaction server execution bridge
  ```bash
  pnpm --filter @vortex/x402-server dev
  ```
* **Terminal 3 (Venice Agent):** Spin up the privacy-first autonomous AI orchestration module
  ```bash
  pnpm --filter @vortex/venice-agent dev
  ```

---

## 🐳 Production Sandboxing (Docker Build)

The server runtime runs inside an isolated container with minimal privileges to mitigate breakout vulnerabilities.

### Build and Launch Production Container Layer Mesh
```bash
docker-compose up --build
```
The node engine and apps boot securely inside a isolated container bridge matrix mapped natively.

---

## 💎 Core Integration Walkthrough

### 1. Smart Account & 1Shot Capabilities Initialization
Before transaction submission, Vortex requests network configuration targets dynamically to ensure permission safety boundaries:

```typescript
// Fetching dynamic capabilities to pick non-hardcoded payment token collectors
const response = await fetch("[https://relayer.1shotapi.com/relayers](https://relayer.1shotapi.com/relayers)", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    jsonrpc: "2.0",
    id: 1,
    method: "relayer_getCapabilities",
    params: ["8453"] // Base Mainnet/Sepolia dynamic matching
  })
});
```

### 2. Privacy Inference via Venice AI Gateway
The system leverages Venice AI’s text-to-action layer to interpret prompt intentions into structured on-chain transaction logs without leaving data crumbs:

```typescript
import OpenAI from "openai";

const venice = new OpenAI({
  apiKey: process.env.VENICE_API_KEY,
  baseURL: "[https://api.venice.ai/api/v1](https://api.venice.ai/api/v1)",
});

const executionIntent = await venice.chat.completions.create({
  model: "zai-org-glm-5",
  messages: [{ role: "user", content: "Optimize and route treasury balance across 1Shot payload" }],
  venice_parameters: {
    enable_web_search: "auto" // Real-time data sync for on-chain optimization
  }
});
```

---

## 🛡️ Security Posture & Hardening Matrix

* **Least Privilege Delegations:** Budget limits enforced via `ERC-20 Periodic Transfer Permissions` restrict our agent from draining user assets, enforcing safety boundaries even if an LLM hallucination occurs.
* **Hardened Execution Context:** The deployment image strips out the native package manager layer post-build and transfers operational execution to the `nextjs:nodejs` internal non-root Linux group ecosystem.

---
**Engineered and Hardened by [Shah Wali (shahwali-dev)](https://github.com/shahwali-dev) for MetaMask x 1Shot x Venice Dev Cook Off Hackathon.**
