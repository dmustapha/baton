// File: lib/deposit.ts
// Pivoted thesis (DEV-007): custom multi-vault Call[] is not deployed on Coston2.
// The live, operator-executed primitive is the single-vault deposit:
//   one XRPL signature -> deposit FXRP into a live Flare yield vault (Upshift or Firelight).
// `{strategy}-deposit` deposits EXISTING FXRP (one XRPL Payment, true single signature).
// `{strategy}-cr-deposit` mints AND deposits (the XRP on-ramp; CR flow = 2 XRPL payments).
import { runCli, parseBridgeOutput } from './cli';
import { CLI } from './config';
import { derivePersonalAccount } from './personalAccount';
import { getFxrpDecimals } from './ftso';
import { parseUnits } from 'viem';
import type { Hex } from './types';

export type Strategy = 'upshift' | 'firelight';

export interface StrategyInfo {
  key: Strategy;
  label: string;
  vaultAddress: Hex;
  vaultId: string;
  blurb: string;
}

export const STRATEGIES: Record<Strategy, StrategyInfo> = {
  upshift: {
    key: 'upshift',
    label: 'Upshift',
    vaultAddress: (process.env.VAULT_A_ADDRESS ?? '0xD91324A6e8884147F6425E9ddd60e11Aea060B5b') as Hex,
    vaultId: process.env.VAULT_A_ID ?? '4',
    blurb: 'Institutional lending vault — steady FXRP yield.',
  },
  firelight: {
    key: 'firelight',
    label: 'Firelight',
    vaultAddress: (process.env.VAULT_B_ADDRESS ?? '0xC90D6847747b85d1fa2E07859869fb9fB72c0361') as Hex,
    vaultId: process.env.VAULT_B_ID ?? '1',
    blurb: 'Higher-yield strategy vault — active FXRP allocation.',
  },
};

export interface DepositResult {
  strategy: Strategy;
  vaultAddress: Hex;
  personalAccount: Hex;
  instructionHex: string;
  xrplTxHash: string;
  drops: string;
  providerWallet: string;
}

const AGENT_VAULT_ID = process.env.AGENT_VAULT_ID ?? '1';
const PROVIDER = process.env.PROVIDER_XRPL_WALLET ?? 'rEyj8nsHLdgt79KJWzXR5BgF7ZbaohbXwq';

/**
 * ONE XRPL signature: deposit existing FXRP into the chosen live Flare vault.
 * Encodes `{strategy}-deposit -w <wid> -v <drops> -a <vaultId>` then submits the single XRPL
 * Payment via `bridge instruction`. No EVM wallet, no FLR gas — the operator executes on Flare.
 */
export async function depositExisting(
  xrplAddress: string,
  strategy: Strategy,
  fxrpAmount: string,
): Promise<DepositResult> {
  const s = STRATEGIES[strategy];
  const personalAccount = await derivePersonalAccount(xrplAddress);
  const decimals = await getFxrpDecimals();
  const drops = parseUnits(fxrpAmount, decimals).toString();

  const instructionHex = await runCli([
    'encode',
    `${strategy}-deposit`,
    '-w',
    CLI.walletId,
    '-v',
    drops,
    '-a',
    s.vaultId,
  ]);
  const bridged = await runCli(['bridge', 'instruction', '-'], instructionHex);
  const { xrplTxHash } = parseBridgeOutput(bridged);

  return {
    strategy,
    vaultAddress: s.vaultAddress,
    personalAccount,
    instructionHex,
    xrplTxHash,
    drops,
    providerWallet: PROVIDER,
  };
}

/**
 * The XRP on-ramp: mint FXRP AND deposit into the vault (`{strategy}-cr-deposit`).
 * This is the FAssets collateral-reservation flow (CR request + mint payment), proven in Task-0.
 * Returned instruction is submitted by the caller through the CR + mint-tx steps.
 */
export function encodeCrDeposit(strategy: Strategy, lots: string): Promise<string> {
  const s = STRATEGIES[strategy];
  return runCli([
    'encode',
    `${strategy}-cr-deposit`,
    '-w',
    CLI.walletId,
    '-v',
    lots,
    '-a',
    AGENT_VAULT_ID,
    '-u',
    s.vaultId,
  ]);
}
