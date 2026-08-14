// File: lib/ftso.ts
import { formatUnits } from 'viem';
import { publicClient } from './viem';
import { resolve, resolveFxrp } from './registry';
import { FTSO_FEED_XRP_USD } from './config';
import ftsoAbi from '../abis/ftsoV2.json';
import erc20MetaAbi from '../abis/erc20meta.json';

/**
 * FXRP decimals, read once from the ERC-20 (NOT hardcoded — FAssets FXRP is 6 on Coston2 but must be read).
 * Cached for the process lifetime. DEV-003: FXRP token resolved via AssetManagerFXRP.fAsset().
 */
let _fxrpDecimals: number | undefined;
export async function getFxrpDecimals(): Promise<number> {
  if (_fxrpDecimals !== undefined) return _fxrpDecimals;
  const fxrp = await resolveFxrp();
  _fxrpDecimals = Number(
    await publicClient.readContract({ address: fxrp, abi: erc20MetaAbi, functionName: 'decimals' }),
  );
  return _fxrpDecimals;
}

/**
 * Live XRP/USD via FtsoV2.
 * DEV-004: use `getFeedById(bytes21)`. Although its ABI is `payable`, an `eth_call` (readContract) with
 * no value works read-only and returns `(uint256 value, int8 decimals, uint64 timestamp)`. The `view`
 * variant `getFeedByIdView` REVERTS ("no data") on Coston2 — do not use it.
 */
export async function getXrpUsd(): Promise<{ price: number; feedId: string }> {
  const ftso = await resolve('FtsoV2');
  const [value, decimals] = (await publicClient.readContract({
    address: ftso,
    abi: ftsoAbi,
    functionName: 'getFeedById',
    args: [FTSO_FEED_XRP_USD],
  })) as [bigint, number, bigint];
  const price = Number(formatUnits(value, Number(decimals)));
  return { price, feedId: FTSO_FEED_XRP_USD };
}
