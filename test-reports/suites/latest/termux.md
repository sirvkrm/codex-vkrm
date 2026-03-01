# Latest Test Suite (Termux / Android arm64 + armv7)

Purpose: validate the current Termux package (`@sirvkrm/codex-cli-termux`) using
the global `codex` and `codex-exec` commands.

WARNING: Run this suite before relying on a fresh release in production.

## Install Guard (Required)

Confirm you are testing the Termux package:

```bash
npm ls -g --depth=0 @sirvkrm/codex-cli-termux || true
```

Expected: installed version ends with `-termux`.

Confirm the commands you are running are the global ones:

```bash
command -v codex
command -v codex-exec
ls -la "$(command -v codex)" "$(command -v codex-exec)"
```

## Version Guard (Required)

```bash
codex --version
codex-exec --version
```

## Core Tests

Workspace:

```bash
rm -rf ~/codex-test-workspace
mkdir -p ~/codex-test-workspace
cd ~/codex-test-workspace
```

Help:

```bash
codex --help
codex exec --help
codex-exec --help
```

Non-interactive sanity:

```bash
codex-exec --sandbox workspace-write --skip-git-repo-check --json "print current directory and list files"
codex-exec --sandbox workspace-write --skip-git-repo-check --json "create hello.txt with content 'hello' and then read it"
```

## Binary Layout Guard

```bash
PKG_ROOT="$(npm root -g)/@sirvkrm/codex-cli-termux/bin"
case "$(uname -m)" in
  aarch64|arm64) ABI_DIR="android-arm64" ;;
  armv7l|armv8l|arm) ABI_DIR="android-armv7" ;;
  *) echo "Unsupported test architecture: $(uname -m)" ; exit 1 ;;
esac

file "$PKG_ROOT/$ABI_DIR/codex"
file "$PKG_ROOT/$ABI_DIR/codex-exec"
```

Expected:

- both binaries are Android ELF files
- architecture matches the current device (`AArch64` or `ARM`)

## Network-Path Smoke

```bash
codex-exec --sandbox workspace-write --skip-git-repo-check --json \
  "run one network check with curl -I https://www.google.com and report the first HTTP status line only"
```

Expected:

- no crash or panic
- graceful success or graceful policy failure

## Termux Checks

```bash
uname -a
echo "$PREFIX"
node --version
npm --version
command -v termux-open-url || true
```
