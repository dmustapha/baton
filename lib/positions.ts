// File: lib/positions.ts
// Read the user's live Flare yield positions: vault shares -> FXRP assets -> USD (FTSO, decoupled).
import { formatUnits } from 'viem';
import { publicClient } from './viem';
import { derivePersonalAccount } from './personalAccount';
import { getFxrpDecimals, getXrpUsd } from './ftso';
import { STRATEGIES, type Strategy } from './deposit';
import vaultAbi from '../abis/vault.json';
import type { Hex, Position } from './types';

async function vaultShares(vault: Hex, who: Hex): Promise<bigint> {
  return publicClient.readContract({ address: vault, abi: vaultAbi, functionName: 'balanceOf', args: [who] }) as Promise<bigint>;
}
async function sharesToAssets(vault: Hex, shares: bigint): Promise<bigint> {
  if (shares === 0n) return 0n;
  try {
    return (await publicClient.readContract({ address: vault, abi: vaultAbi, functionName: 'convertToAssets', args: [shares] })) as bigint;
  } catch {
    return shares; // fallback 1:1 if the vault lacks convertToAssets
  }
}

export interface PortfolioView {
  personalAccount: Hex;
  positions: Position[];
  totalFxrp: string;
  totalUsd: string;
  ftsoPrice: string;
}

export async function getPortfolio(xrplAddress: string): Promise<PortfolioView> {
  const pa = await derivePersonalAccount(xrplAddress);
  const decimals = await getFxrpDecimals();

  let price = 0;
  try {
    price = (await getXrpUsd()).price;
  } catch {
    price = 0; // FTSO decoupled — balances still render
  }

  const positions: Position[] = [];
  let totalFxrp = 0n;
  for (const key of Object.keys(STRATEGIES) as Strategy[]) {
    const s = STRATEGIES[key];
    const shares = await vaultShares(s.vaultAddress, pa);
    const assets = await sharesToAssets(s.vaultAddress, shares);
    totalFxrp += assets;
    const fxrpHuman = formatUnits(assets, decimals);
    const usd = price > 0 ? (Number(fxrpHuman) * price).toFixed(2) : '—';
    positions.push({ vault: s.vaultAddress, symbol: `${s.label}-FXRP`, fxrpBalance: fxrpHuman, usdValue: usd });
  }

  const totalFxrpHuman = formatUnits(totalFxrp, decimals);
  const totalUsd = price > 0 ? (Number(totalFxrpHuman) * price).toFixed(2) : '—';
  return {
    personalAccount: pa,
    positions,
    totalFxrp: totalFxrpHuman,
    totalUsd,
    ftsoPrice: price > 0 ? price.toFixed(4) : '—',
  };
}
