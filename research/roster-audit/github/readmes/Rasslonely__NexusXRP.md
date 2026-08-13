# NexusXRP — Flare Cross-Chain Non-Custodial Vault & Direct FXRP Clearing Protocol

> Built for the **Flare Network Hackathon 2026**.

NexusXRP enables native XRPL accounts to deposit XRP directly into EVM-compatible ERC-4626 vault yield strategies on Flare Network without requiring FLR tokens for gas or complex wallet setups.

---

## Technical Specifications & System Architecture

Detailed system documentation is located in the `Resources/` directory:

- **[Architecture Specification](Resources/ARCHITECTURE.md)** — Core design rules, trust boundaries, state machine & 0xFE/0xFF/0xE0/0xE1 memo layouts.
- **[Full Architecture & Dataflow Diagrams](Docs/architecture_diagram.md)** — Detailed Mermaid topology, end-to-end execution sequence, and state machine userflow diagrams.
- **[System Interfaces & API Spec](Resources/SYSTEM_INTERFACES.md)** — Fastify REST API routes, SSE event streaming schema, and FDC 13-rule verification policy.
- **[DevOps & Infrastructure Bill of Materials](Resources/DEVOPS_BOM.md)** — Docker multi-stage images, compose services, CI workflows, and live deployment configuration.
- **[Environment Variable Registry](Resources/ENV_REGISTRY.md)** — Strict environment variable validation rules and runtime safety controls.

---

## Codebase & Developer Quickstart

The full monorepo implementation (Next.js web UI, Fastify service API, worker engine, Prisma database layer, and Solidity smart contracts) is located in the **[`2_codebase/`](2_codebase/)** directory.

To run NexusXRP locally in under 5 minutes:

```bash
cd 2_codebase
pnpm install
cp .env.example .env
pnpm db:generate
pnpm db:migrate
pnpm tsx scripts/seed-network-config.ts
pnpm dev
```

For full instructions, testnet faucet links, and CLI commands, see **[2_codebase/README.md](2_codebase/README.md)**.
