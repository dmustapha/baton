// File: lib/jobs.ts
// Fire-and-forget deposit runner + live status. The cr-deposit flow (mint + vault deposit) takes
// ~90-180s (FAssets collateral-reservation + FDC round), too long to hold an HTTP request open.
// So /api/deposit spawns the CLI flow detached and writes progress to a per-account log; /api/status
// reads that log AND the chain (vault shares) to report honest live stage.
import { spawn } from 'node:child_process';
import { readFileSync, existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { publicClient } from './viem';
import { derivePersonalAccount } from './personalAccount';
import { STRATEGIES, type Strategy } from './deposit';
import vaultAbi from '../abis/vault.json';
import type { Hex, Stage } from './types';

const APP_ROOT = process.cwd();
const logPath = (pa: string) => join(tmpdir(), `baton-${pa.toLowerCase()}.log`);

export interface StartResult {
  personalAccount: Hex;
  vault: Hex;
  strategy: Strategy;
  logFile: string;
}

/** Start the cr-deposit flow (mint FXRP + deposit into vault) as a detached background job. */
export async function startDeposit(xrplAddress: string, strategy: Strategy, lots: string): Promise<StartResult> {
  const pa = await derivePersonalAccount(xrplAddress);
  const s = STRATEGIES[strategy];
  const out = logPath(pa);
  const fs = await import('node:fs');
  const fd = fs.openSync(out, 'w');
  const script = resolve(APP_ROOT, 'scripts/one-sig-deposit.mjs');
  const child = spawn(process.execPath, [script, strategy, lots], {
    cwd: APP_ROOT,
    detached: true,
    stdio: ['ignore', fd, fd],
  });
  child.unref();
  return { personalAccount: pa, vault: s.vaultAddress, strategy, logFile: out };
}

export interface StatusView {
  stage: Stage;
  message: string;
  personalAccount: Hex;
  vault: Hex;
  shares: string;
  xrplCrTx?: string;
  xrplMintTx?: string;
  flareTxHash?: Hex;
}

function readLog(pa: string): { cr?: string; mint?: string } {
  const p = logPath(pa);
  if (!existsSync(p)) return {};
  const txt = readFileSync(p, 'utf8');
  const cr = txt.match(/XRPL_CR=([0-9A-Fa-f]{64})/)?.[1] ?? txt.match(/mint\+deposit request\): ([0-9A-Fa-f]{64})/)?.[1];
  const mint = txt.match(/XRPL_MINT=([0-9A-Fa-f]{64})/)?.[1];
  return { cr, mint };
}

/** Honest live status: reads the job log (XRPL hashes / stage) and the chain (vault shares). */
export async function getStatus(xrplAddress: string, strategy: Strategy, baselineShares: string): Promise<StatusView> {
  const pa = await derivePersonalAccount(xrplAddress);
  const s = STRATEGIES[strategy];
  const shares = (await publicClient.readContract({
    address: s.vaultAddress, abi: vaultAbi, functionName: 'balanceOf', args: [pa],
  })) as bigint;
  const { cr, mint } = readLog(pa);
  const base = BigInt(baselineShares || '0');

  let stage: Stage = 'idle';
  let message = 'Ready.';
  if (shares > base) { stage = 'executed'; message = 'Deposited into the vault on Flare.'; }
  else if (mint) { stage = 'attesting'; message = 'Minting FXRP and depositing (operator FDC round, ~1-2 min)...'; }
  else if (cr) { stage = 'observed'; message = 'Collateral reserved on Flare. Minting...'; }
  else { stage = 'submitted'; message = 'Signature submitted to XRPL. Waiting for the Flare operator...'; }

  return {
    stage, message, personalAccount: pa, vault: s.vaultAddress, shares: shares.toString(),
    xrplCrTx: cr, xrplMintTx: mint,
  };
}
