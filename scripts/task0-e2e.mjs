#!/usr/bin/env node
// Task-0 go/no-go: funded XRPL -> Coston2 e2e.
// Proves Flare's live hosted operator executes an instruction we sent from a funded XRPL
// testnet Payment (no EVM wallet, no FLR gas in the user path). Doubles as the depth-8
// Gate-1 proof: it mints REAL FXRP (fxrp-cr) into the derived PersonalAccount.
//
// Reproducible wrapper around the official smart-accounts-cli (the encoding + bridge authority):
//   encode fxrp-cr -w <wallet-id> -v <lots> -a <agent-vault-id>
//     | bridge instruction -        (single XRPL user signature; operator reserves collateral)
//     | bridge mint-tx -w -          (waits for operator CollateralReserved, sends mint payment)
//
// Plain Node (no build step) so it runs before the Next.js app is scaffolded.
// Usage: node scripts/task0-e2e.mjs [lots]   (env from ../smart-accounts-cli/.env + this .env)

import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const APP_ROOT = resolve(__dirname, '..');

// minimal .env loader (no dependency)
function loadEnv(p) {
  try {
    for (const line of readFileSync(p, 'utf8').split('\n')) {
      const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
      if (m && !(m[1] in process.env)) process.env[m[1]] = m[2];
    }
  } catch { /* ignore */ }
}
loadEnv(join(APP_ROOT, '.env'));

const LOTS = process.argv[2] ?? '1';
const CLI_DIR = resolve(APP_ROOT, process.env.SMART_ACCOUNTS_CLI_DIR ?? '../smart-accounts-cli');
const PY = resolve(APP_ROOT, process.env.CLI_PYTHON ?? '../smart-accounts-cli/venv/bin/python');
const ENTRY = process.env.CLI_ENTRY ?? 'smart_accounts.py';
const WALLET_ID = process.env.CLI_WALLET_ID ?? '248';
const AGENT_ID = process.env.AGENT_VAULT_ID ?? '1';

function cli(args, input) {
  const r = spawnSync(PY, [ENTRY, ...args], { cwd: CLI_DIR, input, encoding: 'utf8' });
  if (r.status !== 0) throw new Error(`CLI ${args.join(' ')} failed (${r.status}): ${r.stderr || r.stdout}`);
  return r.stdout.trim();
}

console.log(`[task0] encoding fxrp-cr (lots=${LOTS}, agent=${AGENT_ID}) ...`);
const instr = cli(['encode', 'fxrp-cr', '-w', WALLET_ID, '-v', LOTS, '-a', AGENT_ID]);
console.log(`[task0] instruction: ${instr}`);

console.log('[task0] bridge instruction (real XRPL Payment — the single user signature) ...');
const crHash = cli(['bridge', 'instruction', '-'], instr);
console.log(`[task0] XRPL CR request tx: ${crHash}`);

console.log('[task0] bridge mint-tx -w (waiting for operator CollateralReserved on Coston2) ...');
const mintHash = cli(['bridge', 'mint-tx', '-w', '-'], crHash);
console.log(`[task0] XRPL mint tx: ${mintHash}`);

console.log('\n[task0] GO — operator executed our instruction from a funded XRPL payment.');
console.log(`  PersonalAccount: ${process.env.DEMO_PERSONAL_ACCOUNT}`);
console.log(`  XRPL CR tx:  ${crHash}`);
console.log(`  XRPL mint tx: ${mintHash}`);
console.log('  Verify FXRP balance + the Coston2 execution on the explorer, then record in submission/proof.md.');
