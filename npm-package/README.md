# Codex CLI for Termux

> Built from upstream OpenAI Codex `rust-v0.106.0`, packaged for Android Termux.

This npm package ships the native Codex Rust binaries for Termux on Android and supports:

- `arm64`
- `armv7`

It is intended for Termux only, not desktop Linux distributions.

Source repository: https://github.com/sirvkrm/codex-vkrm

## Install

```bash
pkg update && pkg upgrade -y
pkg install nodejs-lts -y

npm install -g @sirvkrm/codex-cli-termux
```

## Verify

```bash
codex --version
codex login
```

## Included Commands

- `codex`
- `codex-exec`

The launcher auto-selects the correct bundled binary for your device architecture and sets `LD_LIBRARY_PATH` so the packaged `libc++_shared.so` is found automatically.

## Maintainer Notes

To publish a new version from this repo:

```bash
cd npm-package
npm pack --dry-run
npm publish --access public
```

Before publishing, make sure the staged binaries under `bin/android-arm64/` and `bin/android-armv7/` are up to date.

## License

Apache-2.0. Original project by OpenAI.
