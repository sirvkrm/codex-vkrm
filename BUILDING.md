# Building Codex CLI (Termux fork)

This repository packages a Termux-focused fork of the OpenAI Codex CLI for Android. The published npm setup uses a lightweight wrapper package plus architecture-specific native packages for `arm64`, `armv7`, `x86_64`, and `x86`, and most users should install the wrapper directly:

```bash
npm install -g @sirvkrm/codex-cli-termux
```

If you want or need to build the binary yourself, follow the steps below.

---

## 1. Prerequisites (Termux)

On a Termux environment:

```bash
pkg update && pkg upgrade -y
pkg install git clang lld rust pkg-config openssl openssl-tool -y
```

You will also need Node.js if you plan to build and test the npm package:

```bash
pkg install nodejs-lts -y
```

---

## 2. Clone this fork

```bash
git clone https://github.com/sirvkrm/codex-vkrm.git
cd codex-termux
```

The Rust workspace lives in `codex-rs/` and the npm wrapper in `npm-package/`.

---

## 3. Build the Rust binary

From the workspace root:

```bash
cd codex-rs
cargo build --release -p codex-cli -p codex-exec
```

Termux-specific optimizations are already baked into `codex-rs/Cargo.toml`:

- `lto = false`
- `codegen-units = 16`

These settings are tuned so that the build can complete on RAM‑constrained devices while keeping good runtime performance.

The resulting binaries will be:

```bash
codex-rs/target/release/codex
codex-rs/target/release/codex-exec
```

You can run it directly:

```bash
./target/release/codex --version
./target/release/codex-exec --help
```

---

## 4. Use the binary with the npm wrapper (optional)

If you want to test the same layout used by a single native package on the device you built on:

```bash
cd ../npm-package
mkdir -p bin/android-arm64
cp ../codex-rs/target/release/codex bin/android-arm64/codex
cp ../codex-rs/target/release/codex-exec bin/android-arm64/codex-exec
cp /data/data/com.termux/files/usr/lib/libc++_shared.so bin/android-arm64/libc++_shared.so
chmod +x bin/android-arm64/codex bin/android-arm64/codex-exec
```

After this, from inside `npm-package/` you can run:

```bash
node bin/codex.js --version
```

This uses the Node.js launchers (`bin/codex.js` / `bin/codex-exec.js`) together with your locally built binaries.

---

## 5. Maintainer notes (release workflow)

For maintainers who publish `@sirvkrm/codex-cli-termux`:

1. **Sync with upstream** in your local clone (fetch and merge the relevant `rust-v*` tag from `openai/codex` into this fork).
2. **Update versions**:
   - `codex-rs/Cargo.toml` → `[workspace.package] version`
   - `npm-package/package.json` → `"version": "<same>-termux"`
3. **Build the Termux binaries** for the Android architectures you publish (`arm64`, `armv7`, `x86_64`, and `x86`).
4. **Publish the four native architecture packages first** (`android-arm64`, `android-armv7`, `android-x86_64`, and `android-x86`).
5. **Publish the wrapper package last** so its `optionalDependencies` point at packages that already exist.
6. **Publish** from `npm-package/` (for authorized maintainers only):

   ```bash
   npm publish --access public
   ```

This matches the automated pipeline used in the private build scripts, while keeping all steps reproducible from this public repository.
