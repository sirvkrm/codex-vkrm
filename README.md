# Codex CLI for Termux

> Built from upstream OpenAI Codex and packaged for Android Termux.

[![npm termux](https://img.shields.io/npm/v/@sirvkrm/codex-cli-termux?style=flat-square&logo=npm)](https://www.npmjs.org/package/@sirvkrm/codex-cli-termux)

![Codex Termux Header](./docs/assets/codex-termux-header.jpg)

## About

This repository packages the upstream OpenAI Codex Rust CLI for Android Termux.

GitHub: https://github.com/sirvkrm/codex-vkrm

It is a Termux-focused wrapper:

- Android only
- `arm64` and `armv7` supported
- minimal compatibility patches only
- no deliberate behavior changes beyond making it run on Termux

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

## Package Behavior

- The npm wrapper auto-detects `arm64` vs `armv7` on Android.
- It selects the matching bundled native binary at runtime.
- It sets `LD_LIBRARY_PATH` so the packaged `libc++_shared.so` is found automatically.

## Build From Source

See [BUILDING.md](/root/codex-termux/BUILDING.md).

The Rust workspace lives in [codex-rs](/root/codex-termux/codex-rs) and the npm wrapper lives in [npm-package](/root/codex-termux/npm-package).

## Documentation

- [docs/installation.md](/root/codex-termux/docs/installation.md)
- [docs/testing.md](/root/codex-termux/docs/testing.md)
- [docs/termux-upgrade-checks.md](/root/codex-termux/docs/termux-upgrade-checks.md)
- [patches/README.md](/root/codex-termux/patches/README.md)

## Maintenance

This is a community-maintained Termux packaging repo for upstream Codex. The goal is to keep the package usable on Termux while staying close to upstream.

## License

Apache-2.0.

Original project: OpenAI Codex  
Termux packaging: community-maintained
