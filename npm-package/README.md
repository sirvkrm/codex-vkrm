# Codex CLI for Termux

> A Termux-first fork of OpenAI Codex `rust-v0.106.0` with architecture-specific Android native packages for every common Termux CPU architecture.

This npm package is the lightweight wrapper package. It installs and launches the matching native Codex Rust package for Termux on Android and supports:

- `arm64`
- `armv7`
- `x86_64`
- `x86`

It is intended for Termux only, not desktop Linux distributions.

Source repository: https://github.com/sirvkrm/codex-vkrm

This package is a community-maintained fork of [OpenAI Codex](https://github.com/openai/codex) and is inspired by [DioNanos](https://github.com/DioNanos).

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

The launcher auto-selects the correct native dependency for your device architecture and sets `LD_LIBRARY_PATH` so the packaged `libc++_shared.so` is found automatically.

## Maintainer Notes

To publish a new version from this repo:

```bash
cd npm-package
npm pack --dry-run
npm publish --access public
```

Before publishing, make sure the matching architecture packages are published first, then publish this wrapper package last so its optional dependency versions resolve.

## License

Apache-2.0. Original project by OpenAI.
