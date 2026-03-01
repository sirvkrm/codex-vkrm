#!/usr/bin/env node

import { spawn } from 'child_process';
import { existsSync, lstatSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function resolveAbiDir() {
  if (process.platform !== 'android') {
    console.error('This package is for Termux on Android only.');
    process.exit(1);
  }

  switch (process.arch) {
    case 'arm64':
      return join(__dirname, 'android-arm64');
    case 'arm':
      return join(__dirname, 'android-armv7');
    default:
      console.error(`Unsupported Android architecture: ${process.arch}`);
      process.exit(1);
  }
}

const abiDir = resolveAbiDir();
const execBinaryPath = join(abiDir, 'codex-exec');
const codexBinaryPath = join(abiDir, 'codex');

const hasDedicatedExecBinary =
  existsSync(execBinaryPath) && !lstatSync(execBinaryPath).isSymbolicLink();

const binaryPath = hasDedicatedExecBinary ? execBinaryPath : codexBinaryPath;
const args = hasDedicatedExecBinary
  ? process.argv.slice(2)
  : ['exec', ...process.argv.slice(2)];

const env = { ...process.env };
if (process.env.LD_LIBRARY_PATH) {
  env.LD_LIBRARY_PATH = `${abiDir}:${process.env.LD_LIBRARY_PATH}`;
} else {
  env.LD_LIBRARY_PATH = abiDir;
}

const child = spawn(binaryPath, args, {
  stdio: 'inherit',
  env
});

child.on('exit', (code) => {
  process.exit(code);
});
