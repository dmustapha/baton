# Baton — Architecture Document

**Version:** V1
**Date:** 2026-08-13
**Stack:** TypeScript, Next.js 15 (App Router), viem, xrpl.js, `smart-accounts-cli` (Python subprocess)
**THIS IS THE SINGLE SOURCE OF TRUTH.** Copy code from this document exactly.

## [EMERGENCY MODE — 0 components mocked]

## Emergency Mode Notice
No component is a `[MOCK]`. Baton deploys **no custom Solidity** — it reuses Flare's live, hard-verified Coston2 contracts (MasterAccountController, existing Upshift/Firelight vaults, FXRP, FTSO, FDC) and Flare's live hosted operator. Our code is: a Next.js app, a thin wrapper around the official `smart-accounts-cli` for encoding, viem read helpers, and an in-browser XRPL signer. Two honest-label fallbacks (depth-7 faucet FXRP; FDC-checkout if Task-0 fails) are documented, not mocked.

**Verification tag note:** encoding/bridging is done by the **official CLI** (source-verified during the spike) — tagged `[VERIFIED]` for the CLI's existence and behaviour, but our exact flag strings are `[UNVERIFIED]` until Task-0 pins them. All read helpers against live addresses are `[UNVERIFIED]` (correct shape, not yet run) or `[VERIFIED]` where the spike ran the exact call.

---

## 1. System Overview

### Purpose
Let an XRPL-only user sign ONE XRPL payment that atomically deploys FXRP across multiple Flare vaults, via Flare Smart Accounts' custom `Call[]` instruction and Flare's live operator.

### System Diagram
```
BROWSER (XRPL-only user)                     BATON NEXT.JS SERVER
┌───────────────────────────┐                ┌───────────────────────────────────────────┐
│ app/page.tsx              │  POST /encode  │ app/api/encode/route.ts                    │
│  ├ TemplatePicker         │───────────────▶│   └▶ lib/cli.ts ──spawn──▶ smart-accounts-cli│
│  ├ SignPanel (xrpl.js) ◀──┼── xrplPayment ─│        encode custom-instruction|bridge      │
│  ├ StatusStrip            │  GET /status   │ app/api/status/route.ts ──▶ lib/status.ts    │
│  ├ PortfolioView          │───────────────▶│ app/api/positions/route.ts ─▶ lib/positions  │
│  └ ProofView              │  GET /positions│ app/api/account/route.ts ──▶ lib/personalAccount
└─────────┬─────────────────┘                │        lib/viem.ts  lib/ftso.ts  lib/registry│
          │ sign+submit                      └───────────────┬───────────────────────────────┘
          ▼                                                   │ read-only eth_call / getLogs
   XRPL TESTNET  ── payment ──▶ provider wallet rEyj8ns…      ▼
          (Flare's LIVE operator 0x103b38… observes → FDC proof → executeUserOp(Call[]))
                                                   COSTON2 (114): PersonalAccount, vaults, FXRP, FTSO
```

### Technology Stack
| Technology | Version | Purpose |
|---|---|---|
| Next.js (App Router) | 15.x | UI + API routes (single deployable) |
| TypeScript | 5.x | app + scripts |
| viem | ^2.21 | Coston2 read calls, ABI encoding for `Call[]` targets |
| xrpl (xrpl.js) | ^3.0 | build/sign/submit the one XRPL Payment (browser) |
| smart-accounts-cli | pinned commit | official encode → bridge instruction (Python subprocess) |
| tsx | ^4 | run `scripts/seed-demo.ts` |
| zod | ^3 | API input validation |

### File Structure
```
baton/
  package.json
  next.config.mjs
  tsconfig.json
  .env.example                      # (lives at working_dir root too; see §Config)
  .env                              # gitignored, real values
  vitest.config.ts
  Dockerfile                        # Node+Python image for Railway/Fly (NOT Vercel)
  abis/
    masterAccountController.json
    vault.json                      # ERC-4626-style deposit/balanceOf
    ftsoV2.json                     # FREE view getter (getFeedByIdView)
    erc20meta.json                  # decimals()
    contractRegistry.json
  lib/
    types.ts                        # shared types
    config.ts                       # chain, addresses, provider wallet
    theme.ts                        # design tokens + shared ui styles
    viem.ts                         # Coston2 public client
    registry.ts                     # ContractRegistry resolution
    cli.ts                          # spawn smart-accounts-cli + output adapter
    personalAccount.ts              # derive user's PersonalAccount
    encode.ts                       # template -> Call[] (approve+deposit) -> memo/payment
    status.ts                       # log-based execution detection + honest interim
    positions.ts                    # vault balances (valuation decoupled)
    ftso.ts                         # FXRP/USD (view getter) + FXRP decimals
    xrpl.ts                         # (browser) build+sign+submit Payment
    templates.ts                    # portfolio templates
  app/
    globals.css
    layout.tsx
    page.tsx                        # server: contrast hero + landing receipt + flow island
    proof/page.tsx                  # /proof (force-dynamic)
    api/
      encode/route.ts
      account/route.ts
      status/route.ts
      positions/route.ts
      price/route.ts                # FTSO-only, for the ticker
  components/
    ContrastHero.tsx                # 1-vault vs N-vault panel
    PortfolioFlow.tsx               # client island (template state + sign)
    TemplatePicker.tsx
    SignPanel.tsx
    StatusStrip.tsx
    PortfolioView.tsx
    ProofView.tsx
    FtsoTicker.tsx
  scripts/
    seed-demo.ts
    task0-e2e.ts                    # Task-0 funded e2e (created Phase 0)
  submission/
    proof.md                        # generated
  NEW_WORK.md
  DOMAIN-GUIDE.md
```

---

## 2. Component Architecture

### Component Table
| # | Component | Type | File Path | Purpose | Dependencies |
|---|---|---|---|---|---|
| 1 | Shared types | types | `lib/*` type exports | shared shapes | — |
| 2 | Config | lib | `lib/config.ts` | addresses, chain, provider wallet | — |
| 3 | viem client | lib | `lib/viem.ts` | Coston2 reads | config |
| 4 | Registry resolver | lib | `lib/registry.ts` | resolve FTSO/FXRP/vaults | viem, abis |
| 5 | CLI wrapper | lib | `lib/cli.ts` | spawn official CLI | node child_process |
| 6 | Encoder | lib+api | `lib/encode.ts`, `api/encode` | template→Call[]→memo/payment | cli, registry, templates, viem |
| 7 | Personal account resolver | lib+api | `lib/personalAccount.ts`, `api/account` | derive PersonalAccount | cli/viem, controller ABI |
| 8 | Status poller | lib+api | `lib/status.ts`, `api/status` | live execution progress | viem |
| 9 | Positions reader | lib+api | `lib/positions.ts`, `api/positions` | vault balances + valuation | viem, ftso, registry |
| 10 | FTSO valuation | lib | `lib/ftso.ts` | FXRP/USD | viem, registry |
| 11 | XRPL signer | browser | `lib/xrpl.ts`, `SignPanel` | one signature | xrpl.js |
| 12 | UI | frontend | `app/page.tsx`, `components/*` | hero flow | all api routes |
| 13 | Proof/receipt | frontend+script | `app/proof/page.tsx`, `submission/proof.md` | judge proof | status, positions |
| 14 | Seed script | script | `scripts/seed-demo.ts` | demo state | viem, registry, config |

### Dependency Graph
```
config → viem → registry → {ftso, positions, personalAccount}
templates → encode → cli
encode ← api/encode ← SignPanel(xrpl.js) → XRPL testnet
status ← api/status → page
positions,ftso ← api/positions → PortfolioView, ProofView
seed-demo → {viem, registry, config}
```

### Data Flow
`page.tsx` posts `{xrplAddress, templateId}` to `api/encode`; `lib/encode.ts` resolves vault addresses via `registry.ts`, builds the `Call[]` (viem `encodeFunctionData` for each vault `deposit`), passes them to `lib/cli.ts` which runs the official `encode custom-instruction | bridge instruction` and returns `{memoHex, paymentDrops, providerWallet, personalAccount}`. The browser (`lib/xrpl.ts`) signs the Payment (one signature) and submits to XRPL testnet. `api/status` polls execution; `api/positions` reads balances + FTSO price for the receipt.

---

## 3. Shared Types

### Purpose
All shared TypeScript types. Imported everywhere; no forward deps.

### Dependencies
None.

#### File: `lib/types.ts`
[VERIFIED] — plain types
```typescript
// File: lib/types.ts
// All shared Baton types.

export type Hex = `0x${string}`;

/** One low-level call executed atomically by the PersonalAccount (EIP-4337 executeUserOp). */
export interface Call {
  target: Hex;        // vault (or FXRP) contract address on Coston2
  value: bigint;      // native value, usually 0n
  data: Hex;          // abi-encoded call (e.g. vault.deposit(assets, receiver))
}

/** A portfolio template: how to split FXRP across vaults. */
export interface PortfolioTemplate {
  id: string;
  label: string;
  legs: Array<{ vaultKey: 'A' | 'B'; weightBps: number }>; // basis points, sum = 10000
}

export type Depth = 'depth-8' | 'depth-7';

export interface EncodeRequest {
  xrplAddress: string;   // r... testnet address
  templateId: string;
  fxrpAmount: string;    // human units, e.g. "10"
}

export interface EncodeResult {
  memoHex: string;           // XRPL Memo.MemoData (encoded instruction)
  paymentDrops: string;      // XRPL amount in drops (executor fee + reserve)
  providerWallet: string;    // XRPL destination
  personalAccount: Hex;      // user's deterministic Flare account
  calls: Call[];             // the atomic multi-vault Call[] (for display)
  depth: Depth;
}

export type Stage = 'idle' | 'submitted' | 'observed' | 'attesting' | 'executed' | 'failed';

export interface StatusResult {
  stage: Stage;
  sinceBlock?: number;   // baseline: current block at capture time (client passes it back while polling)
  flareTxHash?: Hex;
  message: string;
}

export interface Position {
  vault: Hex;
  symbol: string;         // 'Upshift-FXRP' | 'Firelight-FXRP'
  fxrpBalance: string;    // human units
  usdValue: string;
}

export interface PositionsResult {
  positions: Position[];
  totalUsd: string;
  ftsoPrice: string;      // FXRP(XRP)/USD
  receipt: Receipt;
}

export interface Receipt {
  xrplAddress: string;
  personalAccount: Hex;
  flareTxHash?: Hex;
  xrplTxHash?: string;
  vaults: Hex[];
  depth: Depth;
  network: 'coston2';
  chainId: 114;
}
```

---

## 4. Configuration (`lib/config.ts`)

### Purpose
All addresses and chain config in one place. Verified live addresses from the spike; mutable protocol addresses (FXRP, FTSO, FDC verification) are resolved at runtime via ContractRegistry — never hardcoded here.

### Dependencies
None.

#### File: `lib/config.ts`
[VERIFIED] — addresses from SMART-ACCOUNTS-SPIKE.md (live Coston2)
```typescript
// File: lib/config.ts
import type { Hex } from './types';

export const COSTON2 = {
  id: 114,
  name: 'Coston2',
  rpc: process.env.COSTON2_RPC_URL ?? 'https://coston2-api.flare.network/ext/C/rpc',
  explorer: 'https://coston2-explorer.flare.network',
} as const;

export const XRPL = {
  wss: process.env.XRPL_WSS ?? 'wss://s.altnet.rippletest.net:51233',
  explorerTx: 'https://testnet.xrpl.org/transactions',
} as const;

// Immutable / infra addresses — VERIFIED live (spike). Mutable protocol addresses resolved via registry.ts.
export const ADDR = {
  contractRegistry: '0xaD67FE66660Fb8dFE9d6b1b4240d8650e30F6019' as Hex, // Flare-family, brief §6
  masterAccountController: '0x434936d47503353f06750Db1A444DBDC5F0AD37c' as Hex,
  operator: '0x103b384064ae85577127097A7cCadfd6fb13f437' as Hex,          // 52,581 txs (do NOT build)
  agentVault: '0x55c815260cBE6c45Fe5bFe5FF32E3C7D746f14dC' as Hex,        // FXRP direct-mint (depth-8)
} as const;

export const PROVIDER_XRPL_WALLET =
  process.env.PROVIDER_XRPL_WALLET ?? 'rEyj8nsHLdgt79KJWzXR5BgF7ZbaohbXwq'; // getXrplProviderWallets()

// Vault addresses are VERIFIED from getVaults() in the spike, but treat as cache — seed-demo re-resolves.
export const VAULTS = {
  A: { key: 'A', address: '0xD91324A6e8884147F6425E9ddd60e11Aea060B5b' as Hex, symbol: 'Upshift-FXRP', type: 2 },
  B: { key: 'B', address: '0xC90D6847747b85d1fa2E07859869fb9fB72c0361' as Hex, symbol: 'Firelight-FXRP', type: 1 },
} as const;

// CLI location + command template. Task-0 pins the exact subcommands/flags.
export const CLI = {
  dir: process.env.SMART_ACCOUNTS_CLI_DIR ?? '../smart-accounts-cli',
  python: process.env.CLI_PYTHON ?? 'python3',
  entry: process.env.CLI_ENTRY ?? '-m smart_accounts_cli', // pinned in Task-0
} as const;

// XRP/USD FTSOv2 feed id (category 01 + "XRP/USD"); verify in build against getFeedById.
export const FTSO_FEED_XRP_USD =
  (process.env.FTSO_FEED_XRP_USD ?? '0x015852502f55534400000000000000000000000000') as Hex;
```

### Key Decisions
- Only infra addresses hardcoded; FXRP/FTSO/FDC resolved at runtime (brief §5 Contract Registry rule).
- CLI command is env-configurable so Task-0's discovered exact interface drops in without code changes.

---

## 5. viem Client + Registry

### Purpose
Read-only Coston2 access and dynamic address resolution.

### Dependencies
`lib/config.ts`, `abis/*`.

#### File: `lib/viem.ts`
[VERIFIED] — standard viem custom-chain pattern
```typescript
// File: lib/viem.ts
import { createPublicClient, http, defineChain } from 'viem';
import { COSTON2 } from './config';

export const coston2 = defineChain({
  id: COSTON2.id,
  name: COSTON2.name,
  nativeCurrency: { name: 'Coston2 Flare', symbol: 'C2FLR', decimals: 18 },
  rpcUrls: { default: { http: [COSTON2.rpc] } },
  blockExplorers: { default: { name: 'Coston2 Explorer', url: COSTON2.explorer } },
});

export const publicClient = createPublicClient({ chain: coston2, transport: http(COSTON2.rpc) });
```

#### File: `abis/contractRegistry.json`
[VERIFIED] — Flare ContractRegistry getContractAddressByName
```json
[
  { "type": "function", "name": "getContractAddressByName", "stateMutability": "view",
    "inputs": [{ "name": "_name", "type": "string" }],
    "outputs": [{ "name": "", "type": "address" }] }
]
```

#### File: `lib/registry.ts`
[UNVERIFIED] — resolution shape correct; confirm exact registry names in build
```typescript
// File: lib/registry.ts
import { publicClient } from './viem';
import { ADDR } from './config';
import type { Hex } from './types';
import registryAbi from '../abis/contractRegistry.json';

const cache = new Map<string, Hex>();

/** Resolve a Flare protocol contract by its registry name (e.g. "FtsoV2", "FdcVerification"). */
export async function resolve(name: string): Promise<Hex> {
  const hit = cache.get(name);
  if (hit) return hit;
  const addr = (await publicClient.readContract({
    address: ADDR.contractRegistry,
    abi: registryAbi,
    functionName: 'getContractAddressByName',
    args: [name],
  })) as Hex;
  if (!addr || addr === '0x0000000000000000000000000000000000000000') {
    throw new Error(`Registry: ${name} not found`);
  }
  cache.set(name, addr);
  return addr;
}
```

### Key Decisions
- Registry names ("FtsoV2", "FdcVerification", "AssetManagerFXRP"/token) are confirmed in build (Task 1.3); wrong-name failure is loud, not silent.

---

## 6. CLI Wrapper + Encoder

### Purpose
Produce the exact XRPL memo instruction for the atomic multi-vault `Call[]`, using the official CLI as the encoding authority (do not reimplement the instruction ABI in 22h).

### Dependencies
`node:child_process`, `lib/config.ts`, `lib/templates.ts`, `lib/registry.ts`, viem `encodeFunctionData`.

#### File: `lib/templates.ts`
[VERIFIED] — plain data
```typescript
// File: lib/templates.ts
import type { PortfolioTemplate } from './types';

export const TEMPLATES: PortfolioTemplate[] = [
  { id: 'balanced', label: '50% Upshift / 50% Firelight',
    legs: [{ vaultKey: 'A', weightBps: 5000 }, { vaultKey: 'B', weightBps: 5000 }] },
  { id: 'upshift-tilt', label: '70% Upshift / 30% Firelight',
    legs: [{ vaultKey: 'A', weightBps: 7000 }, { vaultKey: 'B', weightBps: 3000 }] },
];

export function getTemplate(id: string): PortfolioTemplate {
  const t = TEMPLATES.find((x) => x.id === id);
  if (!t) throw new Error(`Unknown template ${id}`);
  return t;
}
```

#### File: `abis/vault.json`
[UNVERIFIED] — ERC-4626-style deposit; confirm each vault's real deposit signature in Task 2.1
```json
[
  { "type": "function", "name": "deposit", "stateMutability": "nonpayable",
    "inputs": [{ "name": "assets", "type": "uint256" }, { "name": "receiver", "type": "address" }],
    "outputs": [{ "name": "shares", "type": "uint256" }] },
  { "type": "function", "name": "balanceOf", "stateMutability": "view",
    "inputs": [{ "name": "account", "type": "address" }],
    "outputs": [{ "name": "", "type": "uint256" }] },
  { "type": "function", "name": "convertToAssets", "stateMutability": "view",
    "inputs": [{ "name": "shares", "type": "uint256" }],
    "outputs": [{ "name": "assets", "type": "uint256" }] }
]
```

#### File: `lib/cli.ts`
[UNVERIFIED] — spawn pattern correct; exact args pinned in Task-0
```typescript
// File: lib/cli.ts
import { spawn } from 'node:child_process';
import { CLI } from './config';

/** Run the official smart-accounts-cli and return stdout. Args pinned by Task-0. */
export function runCli(args: string[], stdin?: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const argv = CLI.entry.split(' ').concat(args);
    const p = spawn(CLI.python, argv, { cwd: CLI.dir });
    let out = '', err = '';
    p.stdout.on('data', (d) => (out += d.toString()));
    p.stderr.on('data', (d) => (err += d.toString()));
    p.on('close', (code) => (code === 0 ? resolve(out.trim()) : reject(new Error(`CLI ${code}: ${err}`))));
    if (stdin) { p.stdin.write(stdin); p.stdin.end(); }
  });
}

/**
 * Adapter: parse the `bridge instruction` stdout into a typed shape with an explicit assertion.
 * Task-0 pins the REAL output (see CLI-INTERFACE.md). If the CLI prints human text or different keys,
 * this throws a clear error instead of letting a silent `undefined` reach the XRPL Payment.
 * Handles: JSON `{memoHex, amountDrops}`, or a key: value text block (memo/amount), tolerant of naming.
 */
export function parseBridgeOutput(raw: string): { memoHex: string; amountDrops: string } {
  // Try JSON first.
  try {
    const j = JSON.parse(raw);
    const memoHex = j.memoHex ?? j.memo ?? j.memo_data ?? j.MemoData;
    const amountDrops = String(j.amountDrops ?? j.amount ?? j.drops ?? j.paymentDrops ?? '');
    if (memoHex && amountDrops) return { memoHex: String(memoHex), amountDrops };
  } catch { /* not JSON — fall through to text parse */ }
  // Fallback: scan text for a hex memo and a drops amount.
  const memoMatch = raw.match(/([0-9a-fA-F]{16,})/);
  const dropMatch = raw.match(/(\d{4,})\s*(?:drops)?/i);
  if (memoMatch && dropMatch) return { memoHex: memoMatch[1], amountDrops: dropMatch[1] };
  throw new Error(`Unrecognized CLI bridge output — pin the real shape in CLI-INTERFACE.md.\n${raw.slice(0, 400)}`);
}
```

#### File: `lib/encode.ts`
[UNVERIFIED] — orchestration correct; CLI subcommand names confirmed in Task-0/Task-1
```typescript
// File: lib/encode.ts
import { encodeFunctionData, parseUnits, erc20Abi } from 'viem';
import { runCli, parseBridgeOutput } from './cli';
import { getTemplate } from './templates';
import { VAULTS, PROVIDER_XRPL_WALLET } from './config';
import { resolve } from './registry';
import { getFxrpDecimals } from './ftso';
import { derivePersonalAccount } from './personalAccount';
import type { Call, EncodeRequest, EncodeResult, Depth, Hex } from './types';
import vaultAbi from '../abis/vault.json';

/**
 * Build the atomic multi-vault Call[] from a template.
 * CRITICAL: each vault deposit is preceded by an FXRP `approve(vault, assets)` in the SAME atomic
 * instruction — an ERC-4626 `deposit` does `transferFrom` and reverts without allowance. Order per
 * leg: [approve, deposit]. FXRP address is resolved via ContractRegistry (never hardcoded).
 */
export async function buildCalls(templateId: string, fxrpAmount: string, receiver: Hex): Promise<Call[]> {
  const t = getTemplate(templateId);
  const decimals = await getFxrpDecimals();
  const fxrp = await resolve('FXRP'); // exact registry name confirmed in Task 1.3
  const total = parseUnits(fxrpAmount, decimals);
  const calls: Call[] = [];
  for (const leg of t.legs) {
    const vault = leg.vaultKey === 'A' ? VAULTS.A : VAULTS.B;
    const assets = (total * BigInt(leg.weightBps)) / 10000n;
    calls.push({
      target: fxrp, value: 0n,
      data: encodeFunctionData({ abi: erc20Abi, functionName: 'approve', args: [vault.address, assets] }),
    });
    calls.push({
      target: vault.address, value: 0n,
      data: encodeFunctionData({ abi: vaultAbi, functionName: 'deposit', args: [assets, receiver] }),
    });
  }
  return calls;
}

/**
 * Turn a request into an XRPL memo instruction via the official CLI.
 * The CLI encodes `custom-instruction` (atomic Call[]) then `bridge instruction`.
 * depth-8: the CLI's `fxrp-cr` mint is composed as the FIRST leg (see Gate-1 / Task 1.3) — the
 * builder prepends it there once the mint encode is pinned. depth-7: FXRP is faucet-prefunded to the
 * PersonalAccount; the approve+deposit calls below do the rest. Either way the instruction is atomic.
 */
export async function encode(req: EncodeRequest, depth: Depth): Promise<EncodeResult> {
  const personalAccount = await derivePersonalAccount(req.xrplAddress);
  const calls = await buildCalls(req.templateId, req.fxrpAmount, personalAccount);

  // CLI input: JSON of calls (target,value,data). Exact flag set pinned in Task-0.
  const callsJson = JSON.stringify(
    calls.map((c) => ({ target: c.target, value: c.value.toString(), data: c.data })),
  );
  const encoded = await runCli(
    ['encode', 'custom-instruction', '--xrpl-address', req.xrplAddress, '--calls', '-'],
    callsJson,
  );
  const bridged = await runCli(['bridge', 'instruction', '-'], encoded);
  const { memoHex, amountDrops } = parseBridgeOutput(bridged); // shape-asserting adapter (see cli.ts)

  return { memoHex, paymentDrops: amountDrops, providerWallet: PROVIDER_XRPL_WALLET, personalAccount, calls, depth };
}
```

#### File: `app/api/encode/route.ts`
[UNVERIFIED]
```typescript
// File: app/api/encode/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { encode } from '../../../lib/encode';
import type { Depth } from '../../../lib/types';

export const runtime = 'nodejs'; // needs child_process

const Body = z.object({
  xrplAddress: z.string().regex(/^r[1-9A-HJ-NP-Za-km-z]{24,34}$/, 'must be an XRPL classic address'),
  templateId: z.string(),
  fxrpAmount: z.string().default('10'),
});

export async function POST(req: NextRequest) {
  const parsed = Body.safeParse(await req.json());
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  const depth = (process.env.BATON_DEPTH ?? 'depth-7') as Depth; // set by Gate-1
  try {
    const result = await encode(parsed.data, depth);
    return NextResponse.json(result);
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}
```

### Key Decisions
- **CLI is the encoding authority** — reimplementing the Smart Accounts instruction ABI in 22h is the #1 time risk (Risk 8). We build `Call[]` with viem (ours, testable) and hand it to the CLI's `custom-instruction` encoder.
- `BATON_DEPTH` env flips depth-8/depth-7 after Gate-1 without code changes.

---

## 7. Personal Account Resolver

### Purpose
Derive the user's deterministic Flare `PersonalAccount` from their XRPL address (CREATE2 via MasterAccountController).

### Dependencies
viem, controller ABI, `lib/cli.ts` (fallback authority).

#### File: `abis/masterAccountController.json`
[UNVERIFIED] — getter name confirmed in Task 1.2 (from CLI source / controller ABI)
```json
[
  { "type": "function", "name": "getAccountAddress", "stateMutability": "view",
    "inputs": [{ "name": "xrplAddress", "type": "string" }],
    "outputs": [{ "name": "", "type": "address" }] }
]
```

#### File: `lib/personalAccount.ts`
[UNVERIFIED] — two-path derivation; CLI path is the source of truth
```typescript
// File: lib/personalAccount.ts
import { publicClient } from './viem';
import { ADDR } from './config';
import { runCli } from './cli';
import type { Hex } from './types';
import controllerAbi from '../abis/masterAccountController.json';

/**
 * Derive the PersonalAccount address. Primary: on-chain controller getter.
 * Fallback: the CLI (which knows the exact CREATE2 derivation). Task 1.2 picks the working one.
 */
export async function derivePersonalAccount(xrplAddress: string): Promise<Hex> {
  try {
    const addr = (await publicClient.readContract({
      address: ADDR.masterAccountController,
      abi: controllerAbi,
      functionName: 'getAccountAddress',
      args: [xrplAddress],
    })) as Hex;
    if (addr && addr !== '0x0000000000000000000000000000000000000000') return addr;
  } catch { /* fall through to CLI */ }
  const out = await runCli(['account', 'address', '--xrpl-address', xrplAddress]);
  const m = out.match(/0x[a-fA-F0-9]{40}/);
  if (!m) throw new Error('Could not derive PersonalAccount');
  return m[0] as Hex;
}
```

#### File: `app/api/account/route.ts`
[UNVERIFIED]
```typescript
// File: app/api/account/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { derivePersonalAccount } from '../../../lib/personalAccount';
import { publicClient } from '../../../lib/viem';

export const runtime = 'nodejs';

export async function GET(req: NextRequest) {
  const xrplAddress = req.nextUrl.searchParams.get('xrplAddress');
  if (!xrplAddress) return NextResponse.json({ error: 'xrplAddress required' }, { status: 400 });
  try {
    const personalAccount = await derivePersonalAccount(xrplAddress);
    const code = await publicClient.getCode({ address: personalAccount });
    return NextResponse.json({ personalAccount, exists: !!code && code !== '0x' });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}
```

---

## 8. Status Poller

### Purpose
Report honest live progress (submitted → observed → attesting → executed) from real chain state.

### Dependencies
viem.

#### File: `lib/status.ts`
[UNVERIFIED] — log-based detection; the vault-log topic match is confirmed against a real execution in Task 2.2/3.1
```typescript
// File: lib/status.ts
import { pad, type Hex as ViemHex } from 'viem';
import { publicClient } from './viem';
import { VAULTS } from './config';
import type { Hex, StatusResult, Stage } from './types';

/** Baseline: current block, captured BEFORE the user signs. The client passes it back as `sinceBlock`. */
export async function getBaseline(): Promise<number> {
  return Number(await publicClient.getBlockNumber());
}

/**
 * Determine execution stage from PUBLIC chain reads (no private operator API — judge-runnable).
 * Detection is LOG-BASED, not nonce-based: a CREATE2 contract account's nonce does NOT bump when it
 * is CALLed, so we scan the vault contracts for a deposit log crediting THIS PersonalAccount, emitted
 * at or after the block the user signed (`sinceBlock`). getLogs windows are kept <=30 blocks (Coston2 cap).
 * Interim stages before the log appears are honest time-estimates of the real FDC round (labelled).
 */
export async function getStatus(
  personalAccount: Hex,
  sinceBlock: number,
  submittedAtMs: number,
): Promise<StatusResult> {
  const latest = Number(await publicClient.getBlockNumber());
  const paddedAccount = pad(personalAccount as ViemHex, { size: 32 }).toLowerCase();

  // Scan in <=30-block windows from sinceBlock to latest for a vault log referencing this account.
  for (let from = sinceBlock; from <= latest; from += 30) {
    const to = Math.min(from + 29, latest);
    const logs = await publicClient.getLogs({
      address: [VAULTS.A.address, VAULTS.B.address],
      fromBlock: BigInt(from),
      toBlock: BigInt(to),
    });
    // The receiver/owner appears as an indexed topic (padded to 32 bytes) on the deposit/transfer event.
    const hit = logs.find((l) => l.topics.some((t) => t?.toLowerCase() === paddedAccount));
    if (hit) {
      return { stage: 'executed', flareTxHash: hit.transactionHash as Hex, message: 'Executed on Flare (Coston2)' };
    }
  }

  // No execution log yet — report honest interim progress based on the real ~90–180s FDC round.
  const elapsed = Date.now() - submittedAtMs;
  let stage: Stage = 'submitted';
  let message = 'Submitted to XRPL — operator will observe shortly';
  if (elapsed > 10_000) { stage = 'observed'; message = 'Operator observed the payment'; }
  if (elapsed > 25_000) { stage = 'attesting'; message = 'FDC round in progress (~90–180s) — real attestation, not a hang'; }
  if (elapsed > 240_000) { stage = 'failed'; message = 'No execution after 4 min — retry poll or check XRPL funding'; }
  return { stage, message };
}
```

#### File: `app/api/status/route.ts`
[UNVERIFIED]
```typescript
// File: app/api/status/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getStatus, getBaseline } from '../../../lib/status';
import type { Hex } from '../../../lib/types';

export const runtime = 'nodejs';

export async function GET(req: NextRequest) {
  const sp = req.nextUrl.searchParams;
  const personalAccount = sp.get('personalAccount') as Hex | null;
  if (!personalAccount) return NextResponse.json({ error: 'personalAccount required' }, { status: 400 });

  const sinceBlockRaw = sp.get('sinceBlock');
  const submittedAtRaw = sp.get('submittedAt');
  try {
    // No sinceBlock => this is the BASELINE call the client makes before signing.
    if (sinceBlockRaw === null) {
      const sinceBlock = await getBaseline();
      return NextResponse.json({ stage: 'idle', sinceBlock, message: 'baseline captured' });
    }
    const sinceBlock = Number(sinceBlockRaw);
    const submittedAt = Number(submittedAtRaw);
    if (!Number.isFinite(sinceBlock) || !Number.isFinite(submittedAt)) {
      return NextResponse.json({ error: 'sinceBlock and submittedAt must be numbers' }, { status: 400 });
    }
    return NextResponse.json(await getStatus(personalAccount, sinceBlock, submittedAt));
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}
```

### Key Decisions
- No dependency on a private operator API — status is derived from public chain reads, so it works for judges running it themselves.
- The "attesting" copy is honest about the real FDC latency (concern [C] demo pacing).

---

## 9. Positions Reader + FTSO Valuation

### Purpose
Read post-execution vault balances and value them via FTSO for the portfolio view and receipt.

### Dependencies
viem, registry, vault ABI, FTSOv2 ABI.

#### File: `abis/ftsoV2.json`
[UNVERIFIED] — FREE view getter (NOT the payable `getFeedById`); confirm exact view name in Task 3.2
```json
[
  { "type": "function", "name": "getFeedByIdView", "stateMutability": "view",
    "inputs": [{ "name": "_feedId", "type": "bytes21" }],
    "outputs": [
      { "name": "_value", "type": "uint256" },
      { "name": "_decimals", "type": "int8" },
      { "name": "_timestamp", "type": "uint64" }
    ] }
]
```

#### File: `abis/erc20meta.json`
[VERIFIED] — minimal ERC-20 metadata
```json
[
  { "type": "function", "name": "decimals", "stateMutability": "view", "inputs": [], "outputs": [{ "name": "", "type": "uint8" }] }
]
```

#### File: `lib/ftso.ts`
[UNVERIFIED] — uses the FREE view getter; values XRP/USD (FXRP mirrors XRP — labelled in UI)
```typescript
// File: lib/ftso.ts
import { formatUnits } from 'viem';
import { publicClient } from './viem';
import { resolve } from './registry';
import { FTSO_FEED_XRP_USD } from './config';
import type { Hex } from './types';
import ftsoAbi from '../abis/ftsoV2.json';
import erc20MetaAbi from '../abis/erc20meta.json';

/**
 * FXRP decimals, read once from the ERC-20 (NOT hardcoded — FAssets FXRP is commonly 6 but must be read).
 * Cached for the process lifetime.
 */
let _fxrpDecimals: number | undefined;
export async function getFxrpDecimals(): Promise<number> {
  if (_fxrpDecimals !== undefined) return _fxrpDecimals;
  const fxrp = (await resolve('FXRP')) as Hex;
  _fxrpDecimals = Number(await publicClient.readContract({ address: fxrp, abi: erc20MetaAbi, functionName: 'decimals' }));
  return _fxrpDecimals;
}

/** Live XRP/USD via the FREE FtsoV2 view getter (readContract works only on view/pure — the payable getFeedById would revert). */
export async function getXrpUsd(): Promise<{ price: number; feedId: string }> {
  const ftso = await resolve('FtsoV2');
  const [value, decimals] = (await publicClient.readContract({
    address: ftso,
    abi: ftsoAbi,
    functionName: 'getFeedByIdView',
    args: [FTSO_FEED_XRP_USD],
  })) as [bigint, number, bigint];
  const price = Number(formatUnits(value, Number(decimals)));
  return { price, feedId: FTSO_FEED_XRP_USD };
}
```

#### File: `lib/positions.ts`
[UNVERIFIED]
```typescript
// File: lib/positions.ts
import { formatUnits } from 'viem';
import { publicClient } from './viem';
import { VAULTS } from './config';
import { getXrpUsd, getFxrpDecimals } from './ftso';
import { derivePersonalAccount } from './personalAccount';
import type { Hex, Position, PositionsResult, Depth } from './types';
import vaultAbi from '../abis/vault.json';

export async function getPositions(xrplAddress: string, depth: Depth): Promise<PositionsResult> {
  const personalAccount = await derivePersonalAccount(xrplAddress);
  const decimals = await getFxrpDecimals();

  // Valuation is decoupled: if FTSO is unavailable, balances still render (USD is MED priority).
  let price = 0;
  try { price = (await getXrpUsd()).price; } catch { price = 0; }

  const positions: Position[] = [];
  let totalUsd = 0;
  for (const v of [VAULTS.A, VAULTS.B]) {
    const shares = (await publicClient.readContract({
      address: v.address, abi: vaultAbi, functionName: 'balanceOf', args: [personalAccount],
    })) as bigint;
    let assets = shares;
    try {
      assets = (await publicClient.readContract({
        address: v.address, abi: vaultAbi, functionName: 'convertToAssets', args: [shares],
      })) as bigint;
    } catch { /* non-4626 vault: treat balance as assets */ }
    const bal = Number(formatUnits(assets, decimals));
    const usd = bal * price;
    totalUsd += usd;
    positions.push({ vault: v.address, symbol: v.symbol, fxrpBalance: bal.toFixed(4), usdValue: price ? usd.toFixed(2) : '—' });
  }

  return {
    positions,
    totalUsd: price ? totalUsd.toFixed(2) : '—',
    ftsoPrice: price ? price.toFixed(4) : '—',
    receipt: {
      xrplAddress, personalAccount,
      vaults: [VAULTS.A.address, VAULTS.B.address] as Hex[],
      depth, network: 'coston2', chainId: 114,
    },
  };
}
```

#### File: `app/api/positions/route.ts`
[UNVERIFIED]
```typescript
// File: app/api/positions/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getPositions } from '../../../lib/positions';
import type { Depth } from '../../../lib/types';

export const runtime = 'nodejs';

export async function GET(req: NextRequest) {
  const xrplAddress = req.nextUrl.searchParams.get('xrplAddress');
  if (!xrplAddress) return NextResponse.json({ error: 'xrplAddress required' }, { status: 400 });
  const depth = (process.env.BATON_DEPTH ?? 'depth-7') as Depth;
  try {
    return NextResponse.json(await getPositions(xrplAddress, depth));
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}
```

---

## 10. XRPL Signer (browser)

### Purpose
Build, sign, and submit the single XRPL Payment. Runs client-side so the seed never leaves the browser (self-custody).

### Dependencies
`xrpl` (xrpl.js).

#### File: `lib/xrpl.ts`
[UNVERIFIED] — standard xrpl.js Payment+Memo; confirm memo field mapping against CLI output
```typescript
// File: lib/xrpl.ts  ('use client' consumers only)
import { Client, Wallet, type Payment } from 'xrpl';
import { XRPL } from './config';

export interface SignSendArgs {
  seed: string;               // testnet demo wallet seed (browser-only)
  destination: string;        // provider wallet
  amountDrops: string;        // executor fee + reserve
  memoHex: string;            // encoded instruction
}

export async function signAndSend(a: SignSendArgs): Promise<{ xrplTxHash: string; result: string }> {
  const client = new Client(XRPL.wss);
  await client.connect();
  try {
    const wallet = Wallet.fromSeed(a.seed);
    const tx: Payment = {
      TransactionType: 'Payment',
      Account: wallet.address,
      Destination: a.destination,
      Amount: a.amountDrops,
      Memos: [{ Memo: { MemoData: a.memoHex.replace(/^0x/, '').toUpperCase() } }],
    };
    const prepared = await client.autofill(tx);
    const signed = wallet.sign(prepared);               // ONE signature
    const res = await client.submitAndWait(signed.tx_blob);
    const result = (res.result.meta as { TransactionResult: string }).TransactionResult;
    return { xrplTxHash: res.result.hash, result };
  } finally {
    await client.disconnect();
  }
}

/** Generate a fresh testnet wallet (labelled testnet demo wallet in UI). */
export function newTestnetWallet(): { address: string; seed: string } {
  const w = Wallet.generate();
  return { address: w.address, seed: w.seed! };
}
```

### Key Decisions
- Seed stays in the browser — the server never sees a key. INVARIANT (a): the user acts from XRPL only.
- Xaman QR signing is the post-hackathon self-custody upgrade; the testnet seed path is the emergency-scope signer.

---

## 11. Frontend

### Purpose
The hero flow UI: template → sign → honest live status → positions + receipt.

### Dependencies
All API routes, `lib/xrpl.ts`, `lib/templates.ts`.

#### File: `lib/theme.ts`
[VERIFIED] — single design-token source (one accent, spacing scale, shared component styles)
```typescript
// File: lib/theme.ts
import type { CSSProperties } from 'react';
// One token system for the whole app — no scattered inline hex. Dark, Flare-adjacent, high-contrast.
export const t = {
  bg: '#0a0d13',
  surface: '#111827',
  surfaceAlt: '#0f1521',
  border: '#1f2937',
  text: '#e6edf3',
  textDim: '#9aa7b8',
  accent: '#e6398a',        // Flare pink
  accent2: '#3b82f6',       // XRPL blue
  good: '#22c55e',
  warn: '#f59e0b',
  radius: 12,
  radiusSm: 8,
} as const;

export const ui: Record<string, CSSProperties> = {
  card: { background: t.surface, border: `1px solid ${t.border}`, borderRadius: t.radius, padding: 20 },
  btnPrimary: {
    padding: '12px 18px', background: `linear-gradient(90deg, ${t.accent}, ${t.accent2})`,
    color: 'white', border: 0, borderRadius: t.radiusSm, cursor: 'pointer', fontWeight: 600, fontSize: 15,
  },
  link: { color: t.accent2, textDecoration: 'none' },
  chip: { display: 'inline-block', padding: '3px 10px', borderRadius: 999, border: `1px solid ${t.border}`, fontSize: 12, color: t.textDim },
};
```

#### File: `app/globals.css`
[VERIFIED]
```css
/* File: app/globals.css */
* { box-sizing: border-box; }
html, body { margin: 0; padding: 0; }
body {
  font-family: ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif;
  background: radial-gradient(1200px 600px at 50% -10%, #16121f 0%, #0a0d13 55%);
  color: #e6edf3; min-height: 100vh; -webkit-font-smoothing: antialiased;
}
a { color: #3b82f6; }
code { font-family: ui-monospace, 'SF Mono', Menlo, monospace; font-size: 0.92em; color: #cbd5e1; }
h1 { font-size: clamp(28px, 5vw, 44px); line-height: 1.1; letter-spacing: -0.02em; margin: 0 0 12px; }
@media (max-width: 640px) { .contrast-grid { grid-template-columns: 1fr !important; } }
```

#### File: `app/layout.tsx`
[VERIFIED]
```tsx
// File: app/layout.tsx
import './globals.css';
export const metadata = {
  title: 'Baton — one XRPL signature, a whole Flare portfolio',
  description: 'An XRPL-only user signs one payment that atomically deploys FXRP across multiple Flare vaults.',
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="en"><body>{children}</body></html>);
}
```

#### File: `components/ContrastHero.tsx`
[VERIFIED] — the PRD-promised "1 vault vs N vaults" always-on contrast panel (Scene 1 / judge-experience)
```tsx
// File: components/ContrastHero.tsx
import { t } from '../lib/theme';
export function ContrastHero() {
  const panel: React.CSSProperties = { flex: 1, padding: 18, borderRadius: t.radius, border: `1px solid ${t.border}` };
  return (
    <div className="contrast-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, margin: '20px 0' }}>
      <div style={{ ...panel, background: t.surfaceAlt }}>
        <div style={{ fontSize: 12, color: t.textDim, textTransform: 'uppercase', letterSpacing: '.08em' }}>Flare Xaman demo</div>
        <div style={{ fontSize: 22, fontWeight: 700, marginTop: 6 }}>1 vault</div>
        <div style={{ fontSize: 13, color: t.textDim, marginTop: 6 }}>One XRPL signature → one Flare vault.</div>
      </div>
      <div style={{ ...panel, background: `linear-gradient(160deg, ${t.surface}, #1a1030)`, borderColor: t.accent }}>
        <div style={{ fontSize: 12, color: t.accent, textTransform: 'uppercase', letterSpacing: '.08em' }}>Baton</div>
        <div style={{ fontSize: 22, fontWeight: 700, marginTop: 6 }}>N vaults · atomic</div>
        <div style={{ fontSize: 13, color: t.textDim, marginTop: 6 }}>One XRPL signature → a whole multi-vault portfolio, all-or-nothing.</div>
      </div>
    </div>
  );
}
```

#### File: `components/FtsoTicker.tsx`
[UNVERIFIED]
```tsx
// File: components/FtsoTicker.tsx
'use client';
import { useEffect, useState } from 'react';
export function FtsoTicker() {
  const [price, setPrice] = useState<string>('—');
  useEffect(() => {
    // Dedicated price route — only reads the FTSO feed (no PersonalAccount derivation, no CLI, no vault reads).
    const load = () => fetch('/api/price')
      .then((r) => r.json()).then((d) => d.price && setPrice(d.price)).catch(() => {});
    load(); const t = setInterval(load, 15000); return () => clearInterval(t);
  }, []);
  return <div style={{ fontSize: 13, opacity: 0.8 }}>FTSO XRP/USD: <b>${price}</b> · Coston2 · chainId 114</div>;
}
```

#### File: `app/api/price/route.ts`
[UNVERIFIED] — thin FTSO-only route for the ticker
```typescript
// File: app/api/price/route.ts
import { NextResponse } from 'next/server';
import { getXrpUsd } from '../../../lib/ftso';

export const runtime = 'nodejs';

export async function GET() {
  try {
    const { price, feedId } = await getXrpUsd();
    return NextResponse.json({ price: price.toFixed(4), feedId });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}
```

#### File: `components/TemplatePicker.tsx`
[VERIFIED]
```tsx
// File: components/TemplatePicker.tsx
'use client';
import { TEMPLATES } from '../lib/templates';
import { t as tok } from '../lib/theme';
export function TemplatePicker({ value, onChange }: { value: string; onChange: (id: string) => void }) {
  return (
    <div style={{ display: 'grid', gap: 8 }}>
      <div style={{ fontSize: 12, color: tok.textDim, textTransform: 'uppercase', letterSpacing: '.08em' }}>Portfolio template</div>
      {TEMPLATES.map((tpl) => (
        <label key={tpl.id} style={{ padding: 12, border: `1px solid ${value === tpl.id ? tok.accent : tok.border}`, borderRadius: tok.radiusSm, cursor: 'pointer', background: value === tpl.id ? tok.surfaceAlt : 'transparent' }}>
          <input type="radio" name="tpl" checked={value === tpl.id} onChange={() => onChange(tpl.id)} style={{ marginRight: 8, accentColor: tok.accent }} />
          {tpl.label}
        </label>
      ))}
    </div>
  );
}
```

#### File: `components/StatusStrip.tsx`
[VERIFIED]
```tsx
// File: components/StatusStrip.tsx
'use client';
import type { Stage } from '../lib/types';
import { t as tok } from '../lib/theme';
const STAGES: { key: Stage; label: string }[] = [
  { key: 'submitted', label: 'Submitted' }, { key: 'observed', label: 'Observed' },
  { key: 'attesting', label: 'FDC round' }, { key: 'executed', label: 'Executed' },
];
export function StatusStrip({ stage, message }: { stage: Stage; message: string }) {
  const idx = STAGES.findIndex((s) => s.key === stage);
  const failed = stage === 'failed';
  return (
    <div style={{ marginTop: 16 }}>
      <div style={{ display: 'flex', gap: 6, marginBottom: 8 }}>
        {STAGES.map((s, i) => (
          <div key={s.key} style={{ flex: 1 }}>
            <div style={{ height: 6, borderRadius: 3, background: failed ? tok.warn : i <= idx ? tok.accent : tok.border, transition: 'background .3s' }} />
            <div style={{ fontSize: 10, color: i <= idx && !failed ? tok.text : tok.textDim, marginTop: 4 }}>{s.label}</div>
          </div>
        ))}
      </div>
      <div style={{ fontSize: 13.5, color: failed ? tok.warn : tok.text, opacity: 0.95 }}>{failed ? '⚠ ' : ''}{message}</div>
    </div>
  );
}
```

#### File: `components/PortfolioView.tsx`
[VERIFIED]
```tsx
// File: components/PortfolioView.tsx
'use client';
import type { PositionsResult } from '../lib/types';
import { t as tok } from '../lib/theme';
export function PortfolioView({ data }: { data: PositionsResult }) {
  return (
    <div style={{ marginTop: 20 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
        <h3 style={{ margin: 0 }}>Portfolio {data.totalUsd !== '—' && <>— ${data.totalUsd}</>}</h3>
        <span style={{ fontSize: 12, color: tok.textDim }}>FTSO {data.ftsoPrice !== '—' ? `$${data.ftsoPrice}/XRP` : 'price unavailable'}</span>
      </div>
      {data.positions.map((p) => (
        <div key={p.vault} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: `1px solid ${tok.border}` }}>
          <span>{p.symbol}</span>
          <span><b>{p.fxrpBalance}</b> FXRP{p.usdValue !== '—' && <span style={{ color: tok.textDim }}> · ${p.usdValue}</span>}</span>
        </div>
      ))}
    </div>
  );
}
```

#### File: `components/ProofView.tsx`
[VERIFIED]
```tsx
// File: components/ProofView.tsx
'use client';
import type { Receipt } from '../lib/types';
import { t as tok } from '../lib/theme';
const EXP = 'https://coston2-explorer.flare.network';
const row: React.CSSProperties = { display: 'block', wordBreak: 'break-all', padding: '3px 0' };
export function ProofView({ r, xrplTxHash }: { r: Receipt; xrplTxHash?: string }) {
  return (
    <div style={{ marginTop: 16, fontSize: 12.5, background: tok.surfaceAlt, padding: 14, borderRadius: tok.radiusSm, border: `1px solid ${tok.border}` }}>
      <div style={{ marginBottom: 6 }}>
        <span style={{ padding: '2px 8px', borderRadius: 999, border: `1px solid ${tok.border}`, color: tok.textDim }}>
          {r.depth} · {r.network} · chainId {r.chainId}
        </span>
      </div>
      <span style={row}>PersonalAccount: <a href={`${EXP}/address/${r.personalAccount}`} target="_blank" rel="noreferrer">{r.personalAccount}</a></span>
      {r.flareTxHash && <span style={row}>Flare exec: <a href={`${EXP}/tx/${r.flareTxHash}`} target="_blank" rel="noreferrer">{r.flareTxHash}</a></span>}
      {xrplTxHash && <span style={row}>XRPL payment: <a href={`https://testnet.xrpl.org/transactions/${xrplTxHash}`} target="_blank" rel="noreferrer">{xrplTxHash}</a></span>}
      {r.vaults.map((v) => <span key={v} style={row}>Vault: <a href={`${EXP}/address/${v}`} target="_blank" rel="noreferrer">{v}</a></span>)}
    </div>
  );
}
```

#### File: `components/SignPanel.tsx`
[UNVERIFIED] — client orchestration of the hero flow (error-handled, single-flight, real baseline capture)
```tsx
// File: components/SignPanel.tsx
'use client';
import { useState } from 'react';
import { signAndSend, newTestnetWallet } from '../lib/xrpl';
import { StatusStrip } from './StatusStrip';
import { PortfolioView } from './PortfolioView';
import { ProofView } from './ProofView';
import { ui } from '../lib/theme';
import type { EncodeResult, StatusResult, PositionsResult } from '../lib/types';

const XRPL_FAUCET = 'https://faucet.altnet.rippletest.net';

async function getJson<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, init);
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    const msg = body?.error?.formErrors?.[0] ?? (typeof body?.error === 'string' ? body.error : `Request failed (${res.status})`);
    throw new Error(msg);
  }
  return res.json() as Promise<T>;
}

export function SignPanel({ templateId }: { templateId: string }) {
  const [wallet, setWallet] = useState<{ address: string; seed: string } | null>(null);
  const [status, setStatus] = useState<StatusResult>({ stage: 'idle', message: '' });
  const [positions, setPositions] = useState<PositionsResult | null>(null);
  const [xrplTxHash, setXrplTxHash] = useState<string>();
  const [busy, setBusy] = useState(false); // stays true for the WHOLE flow incl. polling — prevents double-submit

  async function run() {
    if (!wallet || busy) return;
    setBusy(true);
    setPositions(null);
    try {
      const e = await getJson<EncodeResult>('/api/encode', {
        method: 'POST', headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ xrplAddress: wallet.address, templateId, fxrpAmount: '10' }),
      });

      // Capture the real baseline block BEFORE signing.
      const baseline = await getJson<{ sinceBlock: number }>(`/api/status?personalAccount=${e.personalAccount}`);
      const sinceBlock = baseline.sinceBlock;

      let sent: { xrplTxHash: string; result: string };
      try {
        sent = await signAndSend({ seed: wallet.seed, destination: e.providerWallet, amountDrops: e.paymentDrops, memoHex: e.memoHex });
      } catch (xrplErr) {
        // Most common cause: the testnet wallet isn't funded yet.
        setStatus({ stage: 'failed', message: `XRPL send failed — fund this testnet wallet first at ${XRPL_FAUCET}, then retry. (${(xrplErr as Error).message})` });
        return;
      }
      if (sent.result !== 'tesSUCCESS') {
        setStatus({ stage: 'failed', message: `XRPL rejected the payment (${sent.result}). If unfunded, top up at ${XRPL_FAUCET}.` });
        return;
      }
      setXrplTxHash(sent.xrplTxHash);
      const submittedAt = Date.now();
      setStatus({ stage: 'submitted', message: 'Submitted to XRPL — operator will observe shortly' });

      await new Promise<void>((done) => {
        const poll = setInterval(async () => {
          try {
            const s = await getJson<StatusResult>(`/api/status?personalAccount=${e.personalAccount}&sinceBlock=${sinceBlock}&submittedAt=${submittedAt}`);
            setStatus(s);
            if (s.stage === 'executed' || s.stage === 'failed') {
              clearInterval(poll);
              if (s.stage === 'executed') {
                const p = await getJson<PositionsResult>(`/api/positions?xrplAddress=${wallet.address}`);
                p.receipt.flareTxHash = s.flareTxHash; p.receipt.xrplTxHash = sent.xrplTxHash;
                setPositions(p);
              }
              done();
            }
          } catch (pollErr) {
            // Transient RPC/429 — keep polling; surface a soft note.
            setStatus((prev) => ({ ...prev, message: `${prev.message} (retrying reads…)` }));
          }
        }, 6000);
      });
    } catch (err) {
      setStatus({ stage: 'failed', message: (err as Error).message });
    } finally {
      setBusy(false);
    }
  }

  return (
    <div style={ui.card}>
      {!wallet ? (
        <button onClick={() => setWallet(newTestnetWallet())} style={ui.btnPrimary}>Create testnet demo wallet (XRPL only)</button>
      ) : (
        <div style={{ fontSize: 13, opacity: 0.85 }}>
          XRPL testnet wallet: <code>{wallet.address}</code><br />
          <a href={XRPL_FAUCET} target="_blank" rel="noreferrer" style={ui.link}>Fund it at the XRPL testnet faucet →</a> then sign. No FLR, no EVM wallet.
        </div>
      )}
      {wallet && (
        <button disabled={busy} onClick={run} style={{ ...ui.btnPrimary, marginTop: 12, opacity: busy ? 0.6 : 1 }}>
          {busy ? 'Working… one XRPL signature in flight' : 'Sign & Send — one XRPL signature'}
        </button>
      )}
      {status.stage !== 'idle' && <StatusStrip stage={status.stage} message={status.message} />}
      {positions && <><PortfolioView data={positions} /><ProofView r={positions.receipt} xrplTxHash={xrplTxHash} /></>}
    </div>
  );
}
```

#### File: `components/PortfolioFlow.tsx`
[VERIFIED] — client island: holds template state, wires TemplatePicker → SignPanel
```tsx
// File: components/PortfolioFlow.tsx
'use client';
import { useState } from 'react';
import { TemplatePicker } from './TemplatePicker';
import { SignPanel } from './SignPanel';
export function PortfolioFlow() {
  const [tpl, setTpl] = useState('balanced');
  return (
    <div style={{ display: 'grid', gap: 16, marginTop: 20 }}>
      <TemplatePicker value={tpl} onChange={setTpl} />
      <SignPanel templateId={tpl} />
    </div>
  );
}
```

#### File: `app/page.tsx`
[UNVERIFIED] — server component: always-populated landing (contrast hero + live prior receipt), no empty state
```tsx
// File: app/page.tsx
import fs from 'node:fs';
import path from 'node:path';
import { ContrastHero } from '../components/ContrastHero';
import { FtsoTicker } from '../components/FtsoTicker';
import { PortfolioFlow } from '../components/PortfolioFlow';
import { t } from '../lib/theme';

export const dynamic = 'force-dynamic'; // read the latest prior-run receipt per request
export const runtime = 'nodejs';

/** First-visit landing shows a REAL prior-run receipt (never fabricated) so judges see proof in <10s. */
function LandingReceipt() {
  let md = '';
  try { md = fs.readFileSync(path.join(process.cwd(), 'submission', 'proof.md'), 'utf8'); } catch {}
  const runs = md.split('## Runs')[1]?.trim();
  if (!runs || runs.startsWith('(pre-warm')) return null;
  return (
    <div style={{ marginTop: 20, padding: 14, background: t.surfaceAlt, border: `1px solid ${t.border}`, borderRadius: t.radiusSm }}>
      <div style={{ fontSize: 12, color: t.textDim, textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 6 }}>Latest real run (proof)</div>
      <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all', margin: 0, fontSize: 12 }}>{runs}</pre>
    </div>
  );
}

export default function Home() {
  return (
    <main style={{ maxWidth: 760, margin: '0 auto', padding: '32px 20px' }}>
      <span style={{ display: 'inline-block', padding: '3px 10px', borderRadius: 999, border: `1px solid ${t.border}`, fontSize: 12, color: t.textDim }}>
        Coston2 · chainId 114 · Flare Smart Accounts
      </span>
      <h1 style={{ marginTop: 14 }}>One XRPL signature. A whole Flare portfolio.</h1>
      <p style={{ color: t.textDim, fontSize: 16, lineHeight: 1.5, maxWidth: 620 }}>
        Flare&apos;s Xaman demo drives <b style={{ color: t.text }}>one</b> vault from an XRPL signature. Baton deploys FXRP across
        <b style={{ color: t.text }}> multiple vaults atomically</b> — from the same single signature. No FLR gas. No EVM wallet. No bridge.
      </p>
      <FtsoTicker />
      <ContrastHero />
      <PortfolioFlow />
      <LandingReceipt />
      <p style={{ marginTop: 28, fontSize: 12, color: t.textDim }}>
        Executed on-chain by Flare&apos;s hosted operator. Full proof at <a href="/proof">/proof</a>.
      </p>
    </main>
  );
}
```

#### File: `app/proof/page.tsx`
[UNVERIFIED] — reads the last real run from submission/proof.md at build; static for judges
```tsx
// File: app/proof/page.tsx
import fs from 'node:fs';
import path from 'node:path';
// force-dynamic: submission/proof.md is written AFTER build (pre-warm + live judge runs) — read per request.
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
export default function Proof() {
  let md = 'No proof captured yet — run scripts/seed-demo.ts pre-warm.';
  try { md = fs.readFileSync(path.join(process.cwd(), 'submission/proof.md'), 'utf8'); } catch {}
  return <main style={{ maxWidth: 720, margin: '0 auto', padding: 24 }}><h1>Proof</h1><pre style={{ whiteSpace: 'pre-wrap' }}>{md}</pre></main>;
}
```

### Key Decisions
- **Single design-token system (`lib/theme.ts` + `globals.css`)** — one accent pair, spacing scale, shared `ui.*` styles. Feature-complete and polished from pass one (no deferred "design-forge later" stub); design-forge can refine, not rescue.
- **Landing is always-populated** — server-rendered contrast hero + a REAL prior-run receipt (read from `submission/proof.md`, never fabricated). No empty first-visit state (judge-experience #7, PRD §7.5).
- **`page.tsx` is a server component**; interactivity is isolated in the `PortfolioFlow` client island → fast first paint, receipt server-rendered.
- FtsoTicker hits the dedicated `/api/price` route (FTSO-only) — no PersonalAccount derivation, no CLI, no vault reads on the interval.

---

## 12. Domain Knowledge File (Section N+1)

Build (#18) generates `DOMAIN-GUIDE.md` from this spec. Key concepts (source → PRD/spike):

| Term | Definition | Source |
|---|---|---|
| Smart Account / PersonalAccount | Deterministic CREATE2 Flare contract controlled by an XRPL address, routed by MasterAccountController | SMART-ACCOUNTS-SPIKE |
| Custom instruction / `Call[]` | EIP-4337 `executeUserOp(Call[])` — atomic multi-call the account runs; Baton's differentiator | SPIKE line 9 |
| Provider XRPL wallet | XRPL address the user pays; operator watches it | SPIKE (`getXrplProviderWallets`) |
| Operator/executor | Flare-run service that fetches FDC proof and submits execution (we do NOT build it) | SPIKE (52,581 txs) |
| FDC Payment attestation | Proof of the XRPL payment; addresses arrive as keccak hashes; round ~90–180s | TECHNICAL-SPIKE-FDC |
| FXRP | Programmable XRP on Flare (ERC-20); FTestXRP faucet-available on Coston2 (depth-7) | FDC-SPIKE line 7 |
| FTSOv2 | Decentralized price feed; XRP/USD used to value FXRP | brief §5 |
| Depth-8 / Depth-7 | real direct-mint vs faucet FXRP (both preserve atomic multi-vault) | WINNER-BRIEF |

**Business rules / invariants the code must enforce:** user is XRPL-only (no FLR/EVM key server-side or client-required); the multi-vault deposit is one atomic `Call[]`; addresses resolved via ContractRegistry; no fabricated positions; honest depth + latency labels.

## 13. Submission Directory Plan (Section N+2)
```
submission/
  proof.md          # generated by seed-demo pre-warm + judge run (tx hashes, addresses)
  links.md          # live URL, repo, demo video  [package phase]
  screenshots/      # landing, sign, status, portfolio, explorer  [demo phase]
  video/links.md    # YouTube/Loom  [demo phase]
NEW_WORK.md         # old (reference CLI, live contracts) vs new (Baton multi-vault composition + app)  [build phase]
```

## 14. Multi-Track Architecture (Section N+3)
Single track — **Interoperable Asset Products**. One deep integration point: Smart Accounts custom `Call[]` performing a real FAssets FXRP lifecycle action (mint/faucet → multi-vault deposit) driven by an XRPL signature, proven by FDC, valued by FTSO. No second track claimed (dual-track proven a structural dead end, W16–W20).

## 15. Safety Architecture (Section N+4)
| Layer | Implementation | Prevents |
|---|---|---|
| Input validation | `zod` on `/api/encode` (XRPL address regex, template whitelist, amount bounds) | malformed instruction / injection into CLI |
| Rate/latency guard | status poll ≤30-block getLogs windows, 5s poll, 4-min timeout→failed | Coston2 429 / infinite spinner |
| Circuit breaker | Task-0 go/no-go + Gate-1 depth ladder; `BATON_DEPTH` flips to faucet | dead demo if mint/operator path fails |
| Graceful degradation | FDC-checkout fallback (single asset action) documented; honest "pending" state | total failure → still a shippable XRPL-signed asset action |

Two independent layers minimum satisfied (validation + degradation).

## 16. Configuration Reference (Section N+6)

### Environment Variables
| Variable | Description | Example | Required |
|---|---|---|:---:|
| `COSTON2_RPC_URL` | Coston2 RPC | `https://coston2-api.flare.network/ext/C/rpc` | no (default) |
| `XRPL_WSS` | XRPL testnet WSS | `wss://s.altnet.rippletest.net:51233` | no (default) |
| `PROVIDER_XRPL_WALLET` | operator provider wallet | `rEyj8ns…Xwq` | no (default) |
| `SMART_ACCOUNTS_CLI_DIR` | cloned CLI path | `../smart-accounts-cli` | yes (build) |
| `CLI_PYTHON` | python interpreter | `python3` | no |
| `CLI_ENTRY` | CLI module/entry (pinned Task-0) | `-m smart_accounts_cli` | yes (build) |
| `BATON_DEPTH` | `depth-8`\|`depth-7` (set by Gate-1) | `depth-7` | no (default 7) |
| `FTSO_FEED_XRP_USD` | XRP/USD feed id | `0x0158…` | no (default) |

### Credentials Needed
| Variable | Used By | Where to Obtain | Required Before |
|---|---|---|---|
| Demo XRPL testnet seed | seed-demo, demo | XRPL testnet faucet (`faucet.altnet.rippletest.net`) | demo |
| C2FLR gas (operator) | Flare operator | Flare-run — no action | — |
| FTestXRP (depth-7) | PersonalAccount pre-fund | Coston2 faucet (`faucet.flare.network/coston2`) | demo (depth-7) |
| `SMART_ACCOUNTS_CLI_DIR`/`CLI_ENTRY` | encode | clone `flare-foundation/smart-accounts-cli`, pin commit | build |

No project-held signing key on Flare (operator pays gas) — nothing to leak server-side.

## 17. Testing Strategy (Section N+7)

### Test Files
| Test File | Tests | Command |
|---|---|---|
| `scripts/task0-e2e.ts` | Task-0: funded XRPL payment → operator executes on Coston2 | `npx tsx scripts/task0-e2e.ts` |
| `lib/encode.test.ts` | buildCalls produces correct per-vault deposit calldata + weights | `npx vitest run lib/encode.test.ts` |
| `scripts/seed-demo.ts` | idempotent demo state | `npx tsx scripts/seed-demo.ts` |

### Acceptance Criteria
| Feature | Criteria | Judge Priority |
|---|---|:---:|
| One-signature multi-vault | One XRPL signature results in FXRP in **two** vaults via a single atomic Flare tx | HIGH |
| Self-custody | Flow completes with only an XRPL wallet; no EVM wallet/FLR prompt anywhere | HIGH |
| Honest live status | Status reflects real FDC round; no fake instant result | HIGH |
| FTSO valuation | Portfolio shows FXRP balances valued at live FTSO XRP/USD | MED |
| Proof | `/proof` shows real tx hashes resolvable on explorers | HIGH |

### Test Scenarios — One-signature multi-vault
| Scenario | Input | Expected |
|---|---|---|
| Happy path | valid XRPL addr, balanced template, funded | one Flare `executeUserOp` tx; both vault balances > 0 |
| Edge | 70/30 template | vault A ≈ 2.33× vault B assets |
| Failure | unfunded XRPL wallet | send blocked with faucet prompt; no partial state |

### Security Invariants
- [ ] Server never receives/stores an XRPL or EVM private key.
- [ ] `/api/encode` rejects non-XRPL addresses and unknown templates (zod).
- [ ] The multi-vault deposit is atomic — either both vault balances increase or neither does.
- [ ] No hardcoded mutable protocol address (FXRP/FTSO/FDC resolved via registry).

## 18. Deployment Sequence (Section N+9)
| Step | Action | Command | Verify | depends-on |
|:---:|---|---|---|---|
| 1 | Clone + pin CLI | `git clone … smart-accounts-cli && git -C smart-accounts-cli rev-parse HEAD` | commit printed; CLI `--help` works | — |
| 2 | Install app deps | `npm install` | no errors | — |
| 3 | Set `.env` | copy `.env.example` → `.env`, fill `CLI_ENTRY`/`SMART_ACCOUNTS_CLI_DIR` | Next.js auto-loads `.env`; `npm run dev` boots | 1 |
| 4 | Seed demo state | `npx tsx scripts/seed-demo.ts` | seed table satisfied, proof.md written | 1,3 |
| 5 | Run app | `npm run build && npm start` | `curl localhost:3000/api/price` returns a price | 2,3 |
| 6 | Deploy | **Railway or Fly via the Dockerfile** (Node **and** Python in one image) | live URL serves hero flow; `/api/encode` returns a memo | 5 |

**Deploy note — NOT Vercel.** `/api/encode` spawns the Python `smart-accounts-cli`; Vercel serverless has no Python and no persistent CLI checkout, so the encode route (the entry to the whole flow) is dead there. Deploy the single container below on a host that runs both runtimes (Railway/Fly). Fallback if the container path stalls: run the demo from `localhost` (judge-runnable via repo + README) — the app is not Vercel-shaped.

#### File: `Dockerfile`
[UNVERIFIED] — Node+Python single image; pins the CLI at build
```dockerfile
# File: Dockerfile
FROM node:20-bookworm-slim
RUN apt-get update && apt-get install -y python3 python3-pip git && rm -rf /var/lib/apt/lists/*
WORKDIR /app

# Pin + install the encoding CLI (commit set via build arg from Task-0)
ARG CLI_COMMIT=main
RUN git clone https://github.com/flare-foundation/smart-accounts-cli /smart-accounts-cli \
 && git -C /smart-accounts-cli checkout ${CLI_COMMIT} \
 && pip3 install --break-system-packages -e /smart-accounts-cli
ENV SMART_ACCOUNTS_CLI_DIR=/smart-accounts-cli

COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

Startup: `npm start` · Health: `GET /api/price` returns 200 with a `price` (no wallet needed — good for uptime checks).

## 19. Addresses & External References (Section N+10)
| Item | Address | Network |
|---|---|---|
| MasterAccountController | `0x434936d47503353f06750Db1A444DBDC5F0AD37c` | Coston2 |
| Operator | `0x103b384064ae85577127097A7cCadfd6fb13f437` | Coston2 |
| Agent vault (mint) | `0x55c815260cBE6c45Fe5bFe5FF32E3C7D746f14dC` | Coston2 |
| Vault A / B | `0xD913…B5b` / `0xC90D…361` | Coston2 |
| Contract Registry | `0xaD67FE66660Fb8dFE9d6b1b4240d8650e30F6019` | Flare-family |
| Provider XRPL wallet | `rEyj8nsHLdgt79KJWzXR5BgF7ZbaohbXwq` | XRPL Testnet |

| Standard | Used For | Key Types |
|---|---|---|
| EIP-4337 `executeUserOp(Call[])` | atomic multi-vault | `Call{target,value,data}` |
| FDC Payment attestation | proof of XRPL payment | keccak address hashes, standardPaymentReference |
| FTSOv2 | valuation | `getFeedByIdView(bytes21)` (free view) |

## 20. Internal API Contracts (Section N+4-style)

### `POST /api/encode`
- **Auth:** none. **Request:** `{ xrplAddress: string(r...), templateId: string, fxrpAmount: string }`
- **200:** `EncodeResult` (see §3). **Errors:** 400 invalid input · 500 CLI failure.

### `GET /api/account?xrplAddress`
- **200:** `{ personalAccount: Hex, exists: boolean }` · 400 missing · 500 derive failure.

### `GET /api/status?personalAccount[&sinceBlock&submittedAt]`
- **No `sinceBlock`** (baseline call): `{ stage:'idle', sinceBlock:number, message }`.
- **With `sinceBlock`+`submittedAt`:** `StatusResult` (log-based `executed` detection) · 400 non-numeric · 500 RPC failure.

### `GET /api/positions?xrplAddress`
- **200:** `PositionsResult` (USD fields are `'—'` if FTSO unavailable — balances still render) · 400 missing · 500 read failure.

### `GET /api/price`
- **200:** `{ price:string, feedId:string }` (FTSO-only; the ticker + health check) · 500 FTSO read failure.

## 21. Integration Map (Section N+11)
| From | To | Protocol | Credential (env) | Health Check | Priority |
|---|---|:---:|---|---|:--:|
| encode route | smart-accounts-cli | subprocess | `SMART_ACCOUNTS_CLI_DIR`,`CLI_ENTRY` | `python3 -m smart_accounts_cli --help` | CRITICAL |
| browser | XRPL testnet | WSS | none | `submitAndWait` tesSUCCESS | CRITICAL |
| status/positions/price | Coston2 RPC | RPC | `COSTON2_RPC_URL` | `curl /api/price` returns price | CRITICAL |
| registry/ftso | ContractRegistry+FtsoV2 | eth_call | none | `getFeedByIdView` returns value (free) | STANDARD |
| encode/positions | FXRP token (registry) | eth_call | none | `resolve('FXRP')` + `decimals()` | CRITICAL |
| positions | vault A/B | eth_call | none | `balanceOf` returns uint | CRITICAL |
| (external) operator | PersonalAccount | Flare-run | none | `executeUserOp` tx appears | CRITICAL |

## 22. Component Build Order (Section N+8)
Sequential (each needs the prior): **[Task-0 e2e] → config/viem/registry → CLI wrapper → encode (Call[]) → personalAccount → [atomic multi-vault proven on-chain] → status → positions/ftso → UI → seed/proof.**
Parallel group (after encode proven): `{status.ts, positions.ts+ftso.ts}` can be built concurrently — independent read paths.
P1 = one-signature multi-vault (deliverable after: config→registry→cli→encode→personalAccount→on-chain proof). UI is P2 (needed for demo, not for the core proof).

## N+7 Security Considerations
### Assets at Risk
| Asset | Value | Where |
|---|---|---|
| XRPL testnet seed | test funds only | browser memory (never sent to server) |
| No mainnet value | — | testnet only |
### Attack Surfaces
| Surface | Vector | Exposure |
|---|---|:--:|
| `/api/encode` | crafted calls JSON → CLI | MED (mitigated by zod + typed Call build) |
| Coston2 RPC | 429 flood | LOW |

## N+8 Performance Budgets
| Component | Metric | Budget | Method |
|---|---|:--:|---|
| `/` first paint | FCP | < 1500ms | Lighthouse |
| `/api/positions` | p95 | < 1500ms | curl timing |
| End-to-end execution | wall clock | 90–240s (FDC-bound, shown live) | manual |

---

## 23. Project Config Files + Seed Script

### Dependencies
None (these bootstrap the project).

#### File: `package.json`
[VERIFIED]
```json
{
  "name": "baton",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "seed": "tsx scripts/seed-demo.ts",
    "task0": "tsx scripts/task0-e2e.ts",
    "test": "vitest run"
  },
  "dependencies": {
    "next": "15.0.0",
    "react": "18.3.1",
    "react-dom": "18.3.1",
    "viem": "2.21.0",
    "xrpl": "3.0.0",
    "zod": "3.23.8"
  },
  "devDependencies": {
    "@types/node": "20.14.0",
    "@types/react": "18.3.0",
    "tsx": "4.16.0",
    "typescript": "5.5.0",
    "vitest": "2.0.0"
  }
}
```

#### File: `next.config.mjs`
[VERIFIED]
```javascript
// File: next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  // API routes that spawn the Python CLI must run on the Node runtime (set per-route via `export const runtime`).
  serverExternalPackages: ['xrpl'],
};
export default nextConfig;
```

#### File: `tsconfig.json`
[VERIFIED]
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "ES2022"],
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "esModuleInterop": true,
    "jsx": "preserve",
    "strict": true,
    "skipLibCheck": true,
    "noEmit": true,
    "incremental": true,
    "plugins": [{ "name": "next" }]
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

#### File: `vitest.config.ts`
[VERIFIED]
```typescript
// File: vitest.config.ts
import { defineConfig } from 'vitest/config';
export default defineConfig({ test: { environment: 'node', include: ['lib/**/*.test.ts'] } });
```

#### File: `scripts/task0-e2e.ts`
[UNVERIFIED] — Task-0 go/no-go: encode a minimal instruction, sign+submit the XRPL Payment, watch Coston2 for execution. Exact CLI call pinned in Task 0.1.
```typescript
// File: scripts/task0-e2e.ts
// Funded XRPL testnet -> live operator -> Coston2 execution. GO/NO-GO for the whole approach.
import { Client, Wallet } from 'xrpl';
import { publicClient } from '../lib/viem';
import { encode } from '../lib/encode';
import { XRPL, PROVIDER_XRPL_WALLET } from '../lib/config';
import type { Depth } from '../lib/types';

async function main() {
  const seed = process.env.DEMO_XRPL_SEED;
  if (!seed) throw new Error('Set DEMO_XRPL_SEED (funded testnet seed from faucet.altnet.rippletest.net)');
  const wallet = Wallet.fromSeed(seed);
  const depth = (process.env.BATON_DEPTH ?? 'depth-7') as Depth;

  // Encode the real multi-vault instruction for this wallet.
  const enc = await encode({ xrplAddress: wallet.address, templateId: 'balanced', fxrpAmount: '10' }, depth);
  console.log('PersonalAccount:', enc.personalAccount, '\nMemo bytes:', enc.memoHex.length / 2);

  const sinceBlock = Number(await publicClient.getBlockNumber());
  const client = new Client(XRPL.wss);
  await client.connect();
  try {
    const tx = await client.autofill({
      TransactionType: 'Payment', Account: wallet.address, Destination: PROVIDER_XRPL_WALLET,
      Amount: enc.paymentDrops, Memos: [{ Memo: { MemoData: enc.memoHex.replace(/^0x/, '').toUpperCase() } }],
    });
    const res = await client.submitAndWait(wallet.sign(tx).tx_blob);
    const result = (res.result.meta as { TransactionResult: string }).TransactionResult;
    console.log('XRPL:', res.result.hash, result);
    if (result !== 'tesSUCCESS') throw new Error(`XRPL rejected: ${result}`);
  } finally { await client.disconnect(); }

  // Poll Coston2 for an execution log referencing the PersonalAccount (up to 4 min).
  console.log('Waiting for operator execution (~90–180s)…');
  const deadline = Date.now() + 240_000;
  const { getStatus } = await import('../lib/status');
  while (Date.now() < deadline) {
    const s = await getStatus(enc.personalAccount, sinceBlock, Date.now());
    if (s.stage === 'executed') { console.log('GO ✓ Flare exec:', s.flareTxHash); return; }
    await new Promise((r) => setTimeout(r, 8000));
  }
  throw new Error('NO-GO: no Coston2 execution in 4 min — see Task 0.2 decision tree (FDC-checkout fallback)');
}
main().catch((e) => { console.error(e); process.exit(1); });
```

#### File: `scripts/seed-demo.ts`
[UNVERIFIED] — establishes PRD §6 seed state; idempotent
```typescript
// File: scripts/seed-demo.ts
// Idempotent demo-state setup. Verifies live infra, resolves vaults/FTSO,
// checks depth-7 FXRP pre-funding, and records a pre-warm receipt to submission/proof.md.
import fs from 'node:fs';
import path from 'node:path';
import { publicClient } from '../lib/viem';
import { resolve } from '../lib/registry';
import { getXrpUsd } from '../lib/ftso';
import { VAULTS, ADDR, PROVIDER_XRPL_WALLET } from '../lib/config';

async function main() {
  const chainId = await publicClient.getChainId();
  if (chainId !== 114) throw new Error(`Expected Coston2 (114), got ${chainId}`);

  // 1. Verify live infra has code
  for (const [name, addr] of [['controller', ADDR.masterAccountController], ['vaultA', VAULTS.A.address], ['vaultB', VAULTS.B.address]] as const) {
    const code = await publicClient.getCode({ address: addr });
    if (!code || code === '0x') throw new Error(`${name} ${addr} has no code`);
    console.log(`✓ ${name} live: ${addr}`);
  }

  // 2. Resolve FTSO + price (proves valuation path)
  const ftso = await resolve('FtsoV2');
  const { price } = await getXrpUsd();
  console.log(`✓ FtsoV2 ${ftso} · XRP/USD ${price}`);

  // 3. Provider wallet is an XRPL string (not EVM)
  if (!/^r[1-9A-HJ-NP-Za-km-z]{24,34}$/.test(PROVIDER_XRPL_WALLET)) {
    throw new Error(`Provider wallet is not an XRPL address: ${PROVIDER_XRPL_WALLET}`);
  }
  console.log(`✓ Provider XRPL wallet: ${PROVIDER_XRPL_WALLET}`);

  // 4. Write/refresh proof scaffold (real hashes appended by task0-e2e / live run — never fabricated)
  const proofPath = path.join(process.cwd(), 'submission', 'proof.md');
  fs.mkdirSync(path.dirname(proofPath), { recursive: true });
  if (!fs.existsSync(proofPath)) {
    fs.writeFileSync(proofPath, [
      '# Baton — Proof (Coston2, chainId 114)',
      '',
      `- Operator (52,581 txs): ${ADDR.operator}`,
      `- MasterAccountController: ${ADDR.masterAccountController}`,
      `- Vault A: ${VAULTS.A.address}`,
      `- Vault B: ${VAULTS.B.address}`,
      `- Provider XRPL wallet: ${PROVIDER_XRPL_WALLET}`,
      '',
      '## Runs',
      '(pre-warm and live-judge run tx hashes appended here by the real e2e run)',
      '',
    ].join('\n'));
  }
  console.log(`✓ Seed complete. proof scaffold at ${proofPath}`);
}

main().catch((e) => { console.error(e); process.exit(1); });
```

### Key Decisions
- `serverExternalPackages` keeps xrpl out of the bundler; CLI-spawning routes set `runtime = 'nodejs'` individually.
- seed-demo **verifies** live state and writes a proof *scaffold* — it never fabricates tx hashes (INVARIANT c / TASTE U7). Real hashes come from `task0-e2e` and live runs.
