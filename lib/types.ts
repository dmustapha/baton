// File: lib/types.ts
// All shared Baton types.

export type Hex = `0x${string}`;

/** One low-level call executed atomically by the PersonalAccount (EIP-4337 executeUserOp). */
export interface Call {
  target: Hex; // vault (or FXRP) contract address on Coston2
  value: bigint; // native value, usually 0n
  data: Hex; // abi-encoded call (e.g. vault.deposit(assets, receiver))
}

/**
 * The CLI's on-the-wire Call shape. The contract `CustomInstructions.CustomCall` struct is
 * `(address targetContract, uint256 value, bytes data)` — value is a decimal string (wei) in JSON.
 * See smart-accounts-cli artifacts/IMasterAccountController.json.
 */
export interface CustomCallJson {
  targetContract: Hex;
  value: string;
  data: Hex;
}

/** A portfolio template: how to split FXRP across vaults. */
export interface PortfolioTemplate {
  id: string;
  label: string;
  legs: Array<{ vaultKey: 'A' | 'B'; weightBps: number }>; // basis points, sum = 10000
}

export type Depth = 'depth-8' | 'depth-7';

export interface EncodeRequest {
  xrplAddress: string; // r... testnet address
  templateId: string;
  fxrpAmount: string; // human units, e.g. "10"
}

export interface EncodeResult {
  memoHex: string; // XRPL Memo.MemoData (encoded instruction hex)
  paymentDrops: string; // XRPL amount in drops (empty when the CLI's `bridge instruction` sends the Payment itself)
  providerWallet: string; // XRPL destination
  personalAccount: Hex; // user's deterministic Flare account
  calls: Call[]; // the atomic multi-vault Call[] (for display)
  depth: Depth;
  callHash?: string; // 30-byte registered CustomCall[] hash (from `custom register`)
  xrplTxHash?: string; // XRPL Payment hash returned by `bridge instruction` (the user-signature step)
}

export type Stage = 'idle' | 'submitted' | 'observed' | 'attesting' | 'executed' | 'failed';

export interface StatusResult {
  stage: Stage;
  sinceBlock?: number; // baseline: current block at capture time (client passes it back while polling)
  flareTxHash?: Hex;
  message: string;
}

export interface Position {
  vault: Hex;
  symbol: string; // 'Upshift-FXRP' | 'Firelight-FXRP'
  fxrpBalance: string; // human units
  usdValue: string;
}

export interface PositionsResult {
  positions: Position[];
  totalUsd: string;
  ftsoPrice: string; // FXRP(XRP)/USD
  receipt: Receipt;
}

export interface Receipt {
  xrplAddress: string;
  personalAccount: Hex;
  flareTxHash?: Hex;
  xrplTxHash?: string;
  vaults: Hex[];
  depth: Depth;
  network: 'coston2';
  chainId: 114;
}
