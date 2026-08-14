// Phase 2 — THE THESIS: one XRPL signature -> one atomic Coston2 tx -> two vault deposits.
// Uses the real FXRP already minted to the demo PersonalAccount (Task-0). Builds the atomic
// multi-vault Call[] (approve+deposit per vault), registers it, and submits ONE XRPL Payment.
// Then verifies BOTH vault balances increased. No mintLeg — the FXRP is already on Flare.
//
//   node_modules/.bin/tsx scripts/atomic-multivault.ts [fxrpAmount=4] [templateId=balanced]

import { encode } from '../lib/encode';
import { publicClient } from '../lib/viem';
import { VAULTS } from '../lib/config';
import { derivePersonalAccount } from '../lib/personalAccount';
import vaultAbi from '../abis/vault.json';
import type { Hex } from '../lib/types';

const DEMO_XRPL = process.env.DEMO_XRPL_ADDRESS ?? 'rwLtfA6cn57VYjzaDetfCQi2z4cDgeNi8b';
const amount = process.argv[2] ?? '4';
const templateId = process.argv[3] ?? 'balanced';

const bal = (v: Hex, who: Hex) =>
  publicClient.readContract({ address: v, abi: vaultAbi, functionName: 'balanceOf', args: [who] }) as Promise<bigint>;

async function main() {
  const pa = (await derivePersonalAccount(DEMO_XRPL)) as Hex;
  console.log(`PersonalAccount: ${pa}`);
  const a0 = await bal(VAULTS.A.address as Hex, pa);
  const b0 = await bal(VAULTS.B.address as Hex, pa);
  console.log(`Before: VaultA(${VAULTS.A.symbol})=${a0}  VaultB(${VAULTS.B.symbol})=${b0}`);

  console.log(`\nEncoding + registering atomic ${templateId} Call[] for ${amount} FXRP (approve+deposit x2) ...`);
  const res = await encode({ xrplAddress: DEMO_XRPL, templateId, fxrpAmount: amount }, 'depth-8');
  console.log(`callHash:  ${res.callHash}`);
  console.log(`calls:     ${res.calls.length} (${res.calls.length / 2} vaults x [approve,deposit])`);
  console.log(`XRPL tx (the single user signature): ${res.xrplTxHash}`);

  console.log(`\nWaiting for operator executeUserOp on Coston2 (both balances must rise) ...`);
  const deadline = Date.now() + 300_000;
  let a1 = a0, b1 = b0;
  while (Date.now() < deadline) {
    a1 = await bal(VAULTS.A.address as Hex, pa);
    b1 = await bal(VAULTS.B.address as Hex, pa);
    if (a1 > a0 && b1 > b0) break;
    await new Promise((r) => setTimeout(r, 8000));
  }
  console.log(`After:  VaultA=${a1}  VaultB=${b1}`);

  if (a1 > a0 && b1 > b0) {
    console.log(`\nPASS — one XRPL signature deposited into BOTH vaults. delta A=${a1 - a0} B=${b1 - b0}`);
    console.log(`XRPL_TX=${res.xrplTxHash}`);
    console.log(`PERSONAL_ACCOUNT=${pa}`);
  } else {
    console.log(`\nFAIL — not both vault balances increased within 5min (A ${a1 > a0}, B ${b1 > b0}).`);
    process.exit(2);
  }
}

main().catch((e) => {
  console.error('atomic-multivault error:', e);
  process.exit(1);
});
