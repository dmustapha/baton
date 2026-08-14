// File: lib/encode.ts
import { encodeFunctionData, parseUnits, erc20Abi } from 'viem';
import { runCli, parseBridgeOutput } from './cli';
import { getTemplate } from './templates';
import { VAULTS, PROVIDER_XRPL_WALLET, CLI } from './config';
import { resolveFxrp } from './registry';
import { getFxrpDecimals } from './ftso';
import { derivePersonalAccount } from './personalAccount';
import type { Call, CustomCallJson, EncodeRequest, EncodeResult, Depth, Hex } from './types';
import vaultAbi from '../abis/vault.json';

/**
 * Build the atomic multi-vault Call[] from a template.
 * CRITICAL: each vault deposit is preceded by an FXRP `approve(vault, assets)` in the SAME atomic
 * instruction — an ERC-4626 `deposit` does `transferFrom` and reverts without allowance. Order per
 * leg: [approve, deposit]. FXRP address is resolved via ContractRegistry → AssetManagerFXRP.fAsset()
 * (DEV-003), never hardcoded. Both Upshift and Firelight are ERC-4626: deposit(uint256 assets, address).
 */
export async function buildCalls(templateId: string, fxrpAmount: string, receiver: Hex): Promise<Call[]> {
  const t = getTemplate(templateId);
  const decimals = await getFxrpDecimals();
  const fxrp = await resolveFxrp();
  const total = parseUnits(fxrpAmount, decimals);
  const calls: Call[] = [];
  for (const leg of t.legs) {
    const vault = leg.vaultKey === 'A' ? VAULTS.A : VAULTS.B;
    const assets = (total * BigInt(leg.weightBps)) / 10000n;
    calls.push({
      target: fxrp,
      value: 0n,
      data: encodeFunctionData({
        abi: erc20Abi,
        functionName: 'approve',
        args: [vault.address, assets],
      }),
    });
    calls.push({
      target: vault.address,
      value: 0n,
      data: encodeFunctionData({
        abi: vaultAbi,
        functionName: 'deposit',
        args: [assets, receiver],
      }),
    });
  }
  return calls;
}

/** Serialize viem Call[] to the CLI's on-the-wire `CustomInstructions.CustomCall[]` JSON shape. */
export function callsToJson(calls: Call[]): string {
  const wire: CustomCallJson[] = calls.map((c) => ({
    targetContract: c.target,
    value: c.value.toString(),
    data: c.data,
  }));
  return JSON.stringify(wire);
}

/**
 * Turn a request into a signed XRPL Payment via the official CLI's real 3-step flow (DEV-002):
 *   1. `custom register '<calls-json>'`            → 30-byte call-hash (backend infra Flare tx; idempotent)
 *   2. `encode custom-instruction -w 248 -c <hash>` → 32-byte instruction hex
 *   3. `bridge instruction -` (stdin = hex)         → XRPL tx hash (the single USER signature)
 *
 * depth-8 seam: the real FXRP direct-mint first leg (`encode fxrp-cr`) is proven separately (Task-0) and
 * is prepended by `mintLeg` when present. Phase 1 exercises the approve+deposit legs; the live mint is
 * not composed into buildCalls here (it is a separate CR-type instruction, not a CustomCall).
 */
export async function encode(
  req: EncodeRequest,
  depth: Depth,
  mintLeg?: Call,
): Promise<EncodeResult> {
  const personalAccount = await derivePersonalAccount(req.xrplAddress);
  const legCalls = await buildCalls(req.templateId, req.fxrpAmount, personalAccount);
  const calls = mintLeg ? [mintLeg, ...legCalls] : legCalls;

  const callsJson = callsToJson(calls);
  const callHash = await runCli(['custom', 'register', callsJson]);
  const instructionHex = await runCli([
    'encode',
    'custom-instruction',
    '-w',
    CLI.walletId,
    '-c',
    callHash,
  ]);
  const bridged = await runCli(['bridge', 'instruction', '-'], instructionHex);
  const { xrplTxHash } = parseBridgeOutput(bridged);

  return {
    memoHex: instructionHex,
    paymentDrops: '', // the CLI's `bridge instruction` sends the Payment (fee computed on-chain), so no client-side drops
    providerWallet: PROVIDER_XRPL_WALLET,
    personalAccount,
    calls,
    depth,
    callHash,
    xrplTxHash,
  };
}
