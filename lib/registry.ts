// File: lib/registry.ts
import { publicClient } from './viem';
import { ADDR } from './config';
import type { Hex } from './types';
import registryAbi from '../abis/contractRegistry.json';

const ZERO = '0x0000000000000000000000000000000000000000';
const cache = new Map<string, Hex>();

/**
 * Resolve a Flare protocol contract by its registry name (e.g. "FtsoV2", "AssetManagerFXRP").
 * DEV-003: there is NO "FXRP" registry name — use `resolveFxrp()` for the FXRP token.
 */
export async function resolve(name: string): Promise<Hex> {
  const hit = cache.get(name);
  if (hit) return hit;
  const addr = (await publicClient.readContract({
    address: ADDR.contractRegistry,
    abi: registryAbi,
    functionName: 'getContractAddressByName',
    args: [name],
  })) as Hex;
  if (!addr || addr === ZERO) {
    throw new Error(`Registry: ${name} not found`);
  }
  cache.set(name, addr);
  return addr;
}

const fAssetAbi = [
  {
    type: 'function',
    name: 'fAsset',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ name: '', type: 'address' }],
  },
] as const;

let _fxrp: Hex | undefined;

/**
 * Resolve the FXRP ERC-20 token address.
 * DEV-003: FXRP is NOT a registry name. Resolve `AssetManagerFXRP` from the registry, then read its
 * `fAsset()` getter (= 0x0b6A3645c240605887a5532109323A3E12273dc7 on Coston2, decimals 6).
 */
export async function resolveFxrp(): Promise<Hex> {
  if (_fxrp) return _fxrp;
  const assetManager = await resolve('AssetManagerFXRP');
  const fxrp = (await publicClient.readContract({
    address: assetManager,
    abi: fAssetAbi,
    functionName: 'fAsset',
  })) as Hex;
  if (!fxrp || fxrp === ZERO) {
    throw new Error('AssetManagerFXRP.fAsset() returned no FXRP token address');
  }
  _fxrp = fxrp;
  return fxrp;
}
