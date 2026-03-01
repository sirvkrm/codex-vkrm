#!/usr/bin/env node

import { spawn } from 'child_process';
import { createRequire } from 'module';
import { dirname, join } from 'path';

const require = createRequire(import.meta.url);

function resolvePlatformPackage() {
  if (process.platform !== 'android') {
    console.error('This package is for Termux on Android only.');
    process.exit(1);
  }

  switch (process.arch) {
    case 'arm64':
      return '@sirvkrm/codex-cli-termux-android-arm64';
    case 'arm':
      return '@sirvkrm/codex-cli-termux-android-armv7';
    case 'x64':
      return '@sirvkrm/codex-cli-termux-android-x86-64';
    case 'ia32':
      return '@sirvkrm/codex-cli-termux-android-x86';
    default:
      console.error(`Unsupported Android architecture: ${process.arch}`);
      process.exit(1);
  }
}

function resolveAbiDir() {
  const platformPackage = resolvePlatformPackage();

  try {
    const manifestPath = require.resolve(`${platformPackage}/package.json`);
    return join(dirname(manifestPath), 'bin');
  } catch {
    console.error(`Missing native package for ${process.arch}. Reinstall without --no-optional and make sure optional dependencies are enabled.`);
    process.exit(1);
  }
}

const abiDir = resolveAbiDir();
const binaryPath = join(abiDir, 'codex');

// Default behavior:
// - `codex` (no args) starts to TUI
// - `codex <prompt>` runs `codex exec <prompt>` for convenience
// - `codex <known-subcommand|--flag>` passes args through unchanged
const knownSubcommands = new Set([
  'exec',
  'review',
  'login',
  'logout',
  'mcp',
  'mcp-server',
  'app-server',
  'completion',
  'sandbox',
  'execpolicy',
  'apply',
  'resume',
  'cloud',
  'responses-api-proxy',
  'stdio-to-uds',
  'features',
  'tui'
]);

const args = process.argv.slice(2);
const first = args[0];
const isOption = first?.startsWith('-');
const isKnownSubcommand = first && knownSubcommands.has(first);

const finalArgs =
  args.length === 0 ? [] : isOption || isKnownSubcommand ? args : ['exec', ...args];

const env = { ...process.env, CODEX_MANAGED_BY_NPM: '1' };
if (process.env.LD_LIBRARY_PATH) {
  env.LD_LIBRARY_PATH = `${abiDir}:${process.env.LD_LIBRARY_PATH}`;
} else {
  env.LD_LIBRARY_PATH = abiDir;
}

const child = spawn(binaryPath, finalArgs, {
  stdio: 'inherit',
  env
});

child.on('exit', (code) => {
  process.exit(code);
});
