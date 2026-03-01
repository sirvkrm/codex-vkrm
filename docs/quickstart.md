# 2-Minute Quickstart / 2分钟快速开始

Get a first Termux session running fast.
快速完成首次运行。

## Install

```bash
pkg update && pkg upgrade -y
pkg install nodejs-lts -y
npm install -g @sirvkrm/codex-cli-termux
```

## Path 1 — OpenAI

```bash
codex login
codex
```

## Path 2 — OpenAI-Compatible Gateways

If you use an OpenAI-compatible endpoint, configure it in `~/.codex/config.toml` and then launch Codex normally.

```bash
codex
```

See [openrouter-quickstart.md](/root/codex-termux/docs/openrouter-quickstart.md) for an example provider setup.

## Verify

```bash
codex --version
codex-exec --help
```
