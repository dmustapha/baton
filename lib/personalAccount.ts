// File: lib/personalAccount.ts
import { publicClient } from './viem';
import { ADDR } from './config';
import type { Hex } from './types';
import controllerAbi from '../abis/masterAccountController.json';

const ZERO = '0x0000000000000000000000000000000000000000';

/**
 * Derive the PersonalAccount address from an XRPL classic address via the on-chain controller.
 * PersonalAccount getter is `MasterAccountController.getPersonalAccount(string)` (NOT `getAccountAddress`,
 * which does not exist — the ARCHITECTURE §7 assumption was wrong → DEV-005). Verified live:
 * `rwLtfA6cn57VYjzaDetfCQi2z4cDgeNi8b` → `0x27fBb63780AB83aE7CEcd69291AAbb0A769071f7`.
 */
export async function derivePersonalAccount(xrplAddress: string): Promise<Hex> {
  const addr = (await publicClient.readContract({
    address: ADDR.masterAccountController,
    abi: controllerAbi,
    functionName: 'getPersonalAccount',
    args: [xrplAddress],
  })) as Hex;
  if (!addr || addr === ZERO) {
    throw new Error(`Could not derive PersonalAccount for ${xrplAddress}`);
  }
  return addr;
}
