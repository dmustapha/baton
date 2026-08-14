#!/usr/bin/env node
// Phase 2 (pivoted thesis): ONE XRPL signature -> mint FXRP + deposit into a live Flare yield vault.
// Uses the CLI's *-cr-deposit instruction (mint + deposit atomically, operator-executed).
// No EVM wallet, no FLR gas in the user path. Proves the "XRP working on Flare in one signature" claim.
//
//   node scripts/one-sig-deposit.mjs <upshift|firelight> [lots=1]
// env from ../smart-accounts-cli/.env (XRPL seed) + this .env (vault ids).

import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { dirname, resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const APP = resolve(dirname(fileURLToPath(import.meta.url)), '..');
for (const line of readFileSync(join(APP, '.env'), 'utf8').split('\n')) {
  const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
  if (m && !(m[1] in process.env)) process.env[m[1]] = m[2];
}
const CLI_DIR = resolve(APP, process.env.SMART_ACCOUNTS_CLI_DIR ?? '../smart-accounts-cli');
const PY = resolve(APP, process.env.CLI_PYTHON ?? '../smart-accounts-cli/venv/bin/python');
const ENTRY = process.env.CLI_ENTRY ?? 'smart_accounts.py';
const WID = process.env.CLI_WALLET_ID ?? '248';
const AGENT = process.env.AGENT_VAULT_ID ?? '1';

const strat = (process.argv[2] ?? 'upshift').toLowerCase();
const lots = process.argv[3] ?? '1';
const sub = strat === 'firelight' ? 'firelight-cr-deposit' : 'upshift-cr-deposit';
const vaultId = strat === 'firelight' ? (process.env.VAULT_B_ID ?? '1') : (process.env.VAULT_A_ID ?? '4');
const vaultAddr = strat === 'firelight' ? process.env.VAULT_B_ADDRESS : process.env.VAULT_A_ADDRESS;

function cli(args, input) {
  const r = spawnSync(PY, [ENTRY, ...args], { cwd: CLI_DIR, input, encoding: 'utf8' });
  if (r.status !== 0) throw new Error(`CLI ${args.join(' ')} failed (${r.status}): ${r.stderr || r.stdout}`);
  return r.stdout.trim();
}

console.log(`[one-sig] strategy=${strat} vault=${vaultAddr} (id ${vaultId}) lots=${lots}`);
const instr = cli(['encode', sub, '-w', WID, '-v', lots, '-a', AGENT, '-u', vaultId]);
console.log(`[one-sig] instruction: ${instr}`);
const crHash = cli(['bridge', 'instruction', '-'], instr);
console.log(`[one-sig] XRPL signature tx (mint+deposit request): ${crHash}`);
console.log('[one-sig] bridge mint-tx -w (waiting for operator reserveCollateral, then mint+deposit)...');
const mintHash = cli(['bridge', 'mint-tx', '-w', '-'], crHash);
console.log(`[one-sig] XRPL mint tx: ${mintHash}`);
console.log(`\n[one-sig] submitted. Vault=${vaultAddr}. Verify vault balanceOf(PersonalAccount) rises (operator FDC round ~90-180s).`);
console.log(`XRPL_CR=${crHash}`);
console.log(`XRPL_MINT=${mintHash}`);
console.log(`VAULT=${vaultAddr}`);
