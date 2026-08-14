// scripts/seed-demo.ts — deterministic demo prerequisites check (PRD §6 / PLAN 4.4).
// Idempotent: verifies live infra + demo account state so a demo/record can proceed.
// Does NOT fabricate state. If the demo account has no vault position, it tells you to run
// `node scripts/one-sig-deposit.mjs upshift 1` (a real on-chain deposit) before recording.
import { publicClient } from '../lib/viem';
import { resolve, resolveFxrp } from '../lib/registry';
import { getXrpUsd, getFxrpDecimals } from '../lib/ftso';
import { derivePersonalAccount } from '../lib/personalAccount';
import { STRATEGIES } from '../lib/deposit';
import vaultAbi from '../abis/vault.json';
import { formatUnits } from 'viem';
import type { Hex } from '../lib/types';

const DEMO = process.env.DEMO_XRPL_ADDRESS ?? 'rwLtfA6cn57VYjzaDetfCQi2z4cDgeNi8b';

async function main() {
  const checks: [string, boolean, string][] = [];
  const chainId = await publicClient.getChainId();
  checks.push(['Coston2 RPC chainId 114', chainId === 114, String(chainId)]);

  const ftso = await resolve('FtsoV2');
  checks.push(['FtsoV2 resolves', /^0x[0-9a-fA-F]{40}$/.test(ftso), ftso]);

  const fxrp = await resolveFxrp();
  const decimals = await getFxrpDecimals();
  checks.push(['FXRP token + decimals', decimals === 6, `${fxrp} (${decimals})`]);

  let price = 0;
  try { price = (await getXrpUsd()).price; } catch {}
  checks.push(['FTSOv2 XRP/USD live', price > 0, price.toFixed(4)]);

  const pa = await derivePersonalAccount(DEMO);
  checks.push(['PersonalAccount derives', /^0x/.test(pa), pa]);

  let hasPosition = false;
  for (const s of Object.values(STRATEGIES)) {
    const shares = (await publicClient.readContract({
      address: s.vaultAddress as Hex, abi: vaultAbi, functionName: 'balanceOf', args: [pa],
    })) as bigint;
    if (shares > 0n) hasPosition = true;
    console.log(`  ${s.label} vault shares: ${formatUnits(shares, decimals)}`);
  }
  checks.push(['Demo has a live vault position', hasPosition, hasPosition ? 'yes' : 'NONE — run one-sig-deposit first']);

  console.log('\n=== seed-demo checks ===');
  let ok = true;
  for (const [label, pass, detail] of checks) {
    console.log(`${pass ? 'PASS' : 'FAIL'}  ${label}: ${detail}`);
    if (!pass) ok = false;
  }
  if (!hasPosition) {
    console.log('\nTo create a real demo position: node scripts/one-sig-deposit.mjs upshift 1');
  }
  console.log(`\n${ok ? 'READY for demo.' : 'NOT ready — resolve failures above.'}`);
  if (!ok) process.exit(1);
}

main().catch((e) => { console.error('seed-demo error:', e); process.exit(1); });
