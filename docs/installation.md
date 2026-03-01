# Installation

## Termux

This package targets Android Termux only.

Supported CPU architectures:

- `arm64`
- `armv7`
- `x86_64`
- `x86`

## Install

```bash
pkg update && pkg upgrade -y
pkg install nodejs-lts -y

npm install -g @sirvkrm/codex-cli-termux
```

## Verify

```bash
codex --version
codex-exec --help
codex login
```

## Troubleshooting

Package database issues:

```bash
pkg update && pkg upgrade -y
```

Node.js missing:

```bash
pkg install nodejs-lts -y
```

Command not found after install:

```bash
hash -r
command -v codex
command -v codex-exec
```

## Notes

- The npm wrapper auto-selects the correct architecture-specific native package for `arm64`, `armv7`, `x86_64`, or `x86`.
- `libc++_shared.so` is bundled and loaded automatically by the launcher.

## Links

- npm: https://www.npmjs.org/package/@sirvkrm/codex-cli-termux
- Upstream: https://github.com/openai/codex
- Fork: https://github.com/sirvkrm/codex-vkrm
