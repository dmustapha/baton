// File: lib/encode.test.ts
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { decodeFunctionData, erc20Abi, parseUnits } from 'viem';
import vaultAbi from '../abis/vault.json';
import type { Call, Hex } from './types';

// --- Mocks: no live chain, no Python subprocess in the unit test ---
const FXRP = '0x0b6A3645c240605887a5532109323A3E12273dc7' as Hex; // AssetManagerFXRP.fAsset() on Coston2
const VAULT_A = '0xD91324A6e8884147F6425E9ddd60e11Aea060B5b' as Hex; // Upshift
const VAULT_B = '0xC90D6847747b85d1fa2E07859869fb9fB72c0361' as Hex; // Firelight
const RECEIVER = '0x27fBb63780AB83aE7CEcd69291AAbb0A769071f7' as Hex; // demo PersonalAccount
const FXRP_DECIMALS = 6;

vi.mock('./registry', () => ({
  resolveFxrp: vi.fn(async () => FXRP),
  resolve: vi.fn(async (name: string) => name),
}));
vi.mock('./ftso', () => ({
  getFxrpDecimals: vi.fn(async () => FXRP_DECIMALS),
}));
vi.mock('./personalAccount', () => ({
  derivePersonalAccount: vi.fn(async () => RECEIVER),
}));

const runCli = vi.fn();
const parseBridgeOutput = vi.fn(() => ({ xrplTxHash: 'A'.repeat(64) }));
vi.mock('./cli', () => ({
  runCli: (...a: unknown[]) => runCli(...a),
  parseBridgeOutput: () => parseBridgeOutput(),
}));

import { buildCalls, callsToJson, encode } from './encode';

/** Assert a Call is FXRP.approve(spender, value). */
function expectApprove(call: Call, spender: Hex, value: bigint) {
  expect(call.target.toLowerCase()).toBe(FXRP.toLowerCase());
  expect(call.value).toBe(0n);
  const { functionName, args } = decodeFunctionData({ abi: erc20Abi, data: call.data });
  expect(functionName).toBe('approve');
  expect((args[0] as string).toLowerCase()).toBe(spender.toLowerCase());
  expect(args[1]).toBe(value);
}

/** Assert a Call is vault.deposit(assets, receiver). */
function expectDeposit(call: Call, vault: Hex, assets: bigint) {
  expect(call.target.toLowerCase()).toBe(vault.toLowerCase());
  expect(call.value).toBe(0n);
  const { functionName, args = [] } = decodeFunctionData({ abi: vaultAbi, data: call.data });
  expect(functionName).toBe('deposit');
  expect(args[0]).toBe(assets);
  expect((args[1] as string).toLowerCase()).toBe(RECEIVER.toLowerCase());
}

describe('buildCalls', () => {
  it('respects FXRP decimals = 6 when scaling the amount', async () => {
    const total = parseUnits('10', FXRP_DECIMALS);
    expect(total).toBe(10_000_000n); // 10 FXRP at 6 decimals
    const calls = await buildCalls('balanced', '10', RECEIVER);
    // First leg deposit assets should be half of total.
    expectDeposit(calls[1], VAULT_A, total / 2n);
  });

  it('balanced (5000/5000): emits [approve,deposit] per leg with a 50/50 split', async () => {
    const calls = await buildCalls('balanced', '10', RECEIVER);
    expect(calls).toHaveLength(4); // 2 legs × [approve, deposit]

    const total = parseUnits('10', FXRP_DECIMALS);
    const half = total / 2n; // 5,000,000

    expectApprove(calls[0], VAULT_A, half);
    expectDeposit(calls[1], VAULT_A, half);
    expectApprove(calls[2], VAULT_B, half);
    expectDeposit(calls[3], VAULT_B, half);

    // Weight conservation: leg assets sum to the total.
    expect(half + half).toBe(total);
  });

  it('upshift-tilt (7000/3000): splits assets 70/30 across the two vaults', async () => {
    const calls = await buildCalls('upshift-tilt', '10', RECEIVER);
    expect(calls).toHaveLength(4);

    const total = parseUnits('10', FXRP_DECIMALS);
    const a = (total * 7000n) / 10000n; // 7,000,000
    const b = (total * 3000n) / 10000n; // 3,000,000

    expectApprove(calls[0], VAULT_A, a);
    expectDeposit(calls[1], VAULT_A, a);
    expectApprove(calls[2], VAULT_B, b);
    expectDeposit(calls[3], VAULT_B, b);

    expect(a + b).toBe(total);
  });

  it('rejects an unknown template', async () => {
    await expect(buildCalls('nope', '10', RECEIVER)).rejects.toThrow(/Unknown template/);
  });
});

describe('callsToJson', () => {
  it('serializes to the CLI CustomCall shape (targetContract/value/data, value as string)', async () => {
    const calls = await buildCalls('balanced', '10', RECEIVER);
    const wire = JSON.parse(callsToJson(calls));
    expect(wire).toHaveLength(4);
    for (const c of wire) {
      expect(Object.keys(c).sort()).toEqual(['data', 'targetContract', 'value']);
      expect(typeof c.value).toBe('string');
      expect(c.value).toBe('0');
      expect(c.data.startsWith('0x')).toBe(true);
    }
    expect(wire[0].targetContract.toLowerCase()).toBe(FXRP.toLowerCase());
  });
});

describe('encode (CLI mocked)', () => {
  beforeEach(() => {
    runCli.mockReset();
    parseBridgeOutput.mockReturnValue({ xrplTxHash: 'A'.repeat(64) });
  });

  it('runs the 3-step flow (custom register → encode custom-instruction → bridge instruction)', async () => {
    const CALL_HASH = '0x' + '11'.repeat(30); // 30-byte hash from `custom register`
    const INSTR = '0x' + 'ff'.repeat(32); // 32-byte instruction hex
    runCli
      .mockResolvedValueOnce(CALL_HASH) // custom register
      .mockResolvedValueOnce(INSTR) // encode custom-instruction
      .mockResolvedValueOnce('B'.repeat(64)); // bridge instruction

    const result = await encode(
      { xrplAddress: 'rwLtfA6cn57VYjzaDetfCQi2z4cDgeNi8b', templateId: 'balanced', fxrpAmount: '10' },
      'depth-8',
    );

    // Step 1: custom register with the calls JSON.
    expect(runCli.mock.calls[0][0]).toEqual(['custom', 'register', expect.any(String)]);
    const registered = JSON.parse(runCli.mock.calls[0][0][2]);
    expect(registered).toHaveLength(4);

    // Step 2: encode custom-instruction -w 248 -c <call-hash>.
    expect(runCli.mock.calls[1][0]).toEqual([
      'encode',
      'custom-instruction',
      '-w',
      '248',
      '-c',
      CALL_HASH,
    ]);

    // Step 3: bridge instruction - with the instruction hex on stdin.
    expect(runCli.mock.calls[2][0]).toEqual(['bridge', 'instruction', '-']);
    expect(runCli.mock.calls[2][1]).toBe(INSTR);

    expect(result.personalAccount.toLowerCase()).toBe(RECEIVER.toLowerCase());
    expect(result.memoHex).toBe(INSTR);
    expect(result.callHash).toBe(CALL_HASH);
    expect(result.xrplTxHash).toBe('A'.repeat(64));
    expect(result.depth).toBe('depth-8');
    expect(result.calls).toHaveLength(4);
  });

  it('prepends a mintLeg when provided (depth-8 seam)', async () => {
    runCli
      .mockResolvedValueOnce('0x' + '22'.repeat(30))
      .mockResolvedValueOnce('0x' + 'ab'.repeat(32))
      .mockResolvedValueOnce('C'.repeat(64));

    const mintLeg: Call = { target: FXRP, value: 0n, data: '0xdeadbeef' };
    const result = await encode(
      { xrplAddress: 'rwLtfA6cn57VYjzaDetfCQi2z4cDgeNi8b', templateId: 'balanced', fxrpAmount: '10' },
      'depth-8',
      mintLeg,
    );

    expect(result.calls).toHaveLength(5); // mintLeg + 4 approve/deposit calls
    expect(result.calls[0]).toEqual(mintLeg);
    const registered = JSON.parse(runCli.mock.calls[0][0][2]);
    expect(registered[0]).toEqual({ targetContract: FXRP, value: '0', data: '0xdeadbeef' });
  });
});
