// File: lib/config.ts
import type { Hex } from './types';

export const COSTON2 = {
  id: 114,
  name: 'Coston2',
  rpc: process.env.COSTON2_RPC_URL ?? 'https://coston2-api.flare.network/ext/C/rpc',
  explorer: 'https://coston2-explorer.flare.network',
} as const;

export const XRPL = {
  wss: process.env.XRPL_WSS ?? 'wss://s.altnet.rippletest.net:51233',
  explorerTx: 'https://testnet.xrpl.org/transactions',
} as const;

// Immutable / infra addresses — VERIFIED live (spike). Mutable protocol addresses resolved via registry.ts.
export const ADDR = {
  contractRegistry: '0xaD67FE66660Fb8dFE9d6b1b4240d8650e30F6019' as Hex, // Flare-family, brief §6
  masterAccountController: (process.env.MASTER_ACCOUNT_CONTROLLER ??
    '0x434936d47503353f06750Db1A444DBDC5F0AD37c') as Hex,
  operator: '0x103b384064ae85577127097A7cCadfd6fb13f437' as Hex, // 52,581 txs (do NOT build)
  agentVault: (process.env.AGENT_VAULT_ADDRESS ??
    '0x55c815260cBE6c45Fe5bFe5FF32E3C7D746f14dC') as Hex, // FXRP direct-mint (depth-8)
} as const;

export const PROVIDER_XRPL_WALLET =
  process.env.PROVIDER_XRPL_WALLET ?? 'rEyj8nsHLdgt79KJWzXR5BgF7ZbaohbXwq'; // getXrplProviderWallets()

// Vault addresses are VERIFIED from getVaults() in the spike, but treat as cache — seed-demo re-resolves.
export const VAULTS = {
  A: {
    key: 'A',
    address: (process.env.VAULT_A_ADDRESS ??
      '0xD91324A6e8884147F6425E9ddd60e11Aea060B5b') as Hex,
    symbol: 'Upshift-FXRP',
    type: 2,
  },
  B: {
    key: 'B',
    address: (process.env.VAULT_B_ADDRESS ??
      '0xC90D6847747b85d1fa2E07859869fb9fB72c0361') as Hex,
    symbol: 'Firelight-FXRP',
    type: 1,
  },
} as const;

// CLI location + command template. Pinned by build Task 0.1 (see baton/CLI-INTERFACE.md).
// DEV-001: entry is `smart_accounts.py` (NOT `-m smart_accounts_cli`); python MUST be the repo venv.
export const CLI = {
  dir: process.env.SMART_ACCOUNTS_CLI_DIR ?? '../smart-accounts-cli',
  python: process.env.CLI_PYTHON ?? '../smart-accounts-cli/venv/bin/python',
  entry: process.env.CLI_ENTRY ?? 'smart_accounts.py',
  walletId: process.env.CLI_WALLET_ID ?? '248', // Coston2 wallet_id (handler overrides, but argparse requires it)
} as const;

// XRP/USD FTSOv2 feed id (category 01 + "XRP/USD"); confirmed live via getFeedById.
export const FTSO_FEED_XRP_USD = (process.env.FTSO_FEED_XRP_USD ??
  '0x015852502f55534400000000000000000000000000') as Hex;
