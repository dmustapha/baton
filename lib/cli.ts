// File: lib/cli.ts
import { spawn } from 'node:child_process';
import { CLI } from './config';

/**
 * Run the official smart-accounts-cli and return trimmed stdout.
 * DEV-001: invoke `[python, smart_accounts.py, ...args]` with cwd = the CLI repo dir. The entry is a
 * script file (NOT `-m smart_accounts_cli`), and python MUST be the repo venv (system python lacks the
 * web3/xrpl wheels). Both are read from env via lib/config.ts.
 */
export function runCli(args: string[], stdin?: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const argv = [CLI.entry, ...args];
    const p = spawn(CLI.python, argv, { cwd: CLI.dir });
    let out = '';
    let err = '';
    p.stdout.on('data', (d) => (out += d.toString()));
    p.stderr.on('data', (d) => (err += d.toString()));
    p.on('error', (e) => reject(new Error(`CLI spawn failed: ${e.message}`)));
    p.on('close', (code) =>
      code === 0 ? resolve(out.trim()) : reject(new Error(`CLI exited ${code}: ${err.trim() || out.trim()}`)),
    );
    if (stdin !== undefined) {
      p.stdin.write(stdin);
      p.stdin.end();
    }
  });
}

/**
 * Parse the `bridge instruction` stdout. The real CLI prints a human line to stderr and the XRPL tx
 * hash (64 hex chars) as the sole stdout line (see baton/CLI-INTERFACE.md, src/handlers/bridge.py).
 * runCli already strips stderr, so `raw` is normally just the hash; be tolerant of extra lines.
 */
export function parseBridgeOutput(raw: string): { xrplTxHash: string } {
  const lines = raw
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean);
  // The XRPL tx hash is a 64-char uppercase hex string.
  const hash = [...lines].reverse().find((l) => /^[0-9a-fA-F]{64}$/.test(l));
  if (!hash) {
    throw new Error(`Unrecognized CLI bridge output — expected a 64-char XRPL tx hash.\n${raw.slice(0, 400)}`);
  }
  return { xrplTxHash: hash };
}
