# Editable source and build custody

20 October 2026. The Downloads Git repository is the canonical production source.

- Edit each `offline-platforms/lunar-<scene>/scene-source.html` and its adjacent JS/CSS/assets/vendor files.
- `offline-platforms/lunar-<scene>/index.html` is a previously generated standalone delivery. Do not author scene changes in it.
- The root `index.html` and root adjacent assets/modules are legacy deployment copies. Their current differences are preserved until the new hosted output is accepted; they must eventually be generated from canonical source rather than edited independently.
- The old Codex `outputs/lunar-*/dist` and `work/runtime` trees are historical/tooling reference. Do not run their packaging scripts to overwrite these newer sources.
- `npm ci --offline` uses pinned cached dependencies if available; `npm ci` may be used on a connected clean machine. `npm run build` generates `build/hosted/lunar-<scene>/index.html` and `build/offline/lunar-<scene>/index.html`. `npm run build -- --scene syzygy --hosted-only` rebuilds only that development scene.
- `npm run dev` serves only `build/hosted` on loopback. It deliberately has no company API. Use the existing local HTTP/SQLite launcher only for explicitly local persistence, with disposable data for QA. Hosted services are still incomplete.
- `tools/build-scene.mjs` is the imported standalone bundler. It now reads the adjacent bridge and scene source, no longer requires Codex files, excludes fonts from the texture transport map and omits a nondeterministic build timestamp.
- Per-scene company modules currently differ; those differences remain explicit until reconciled under P004. Do not overwrite Gravity/Products modules with the newer Syzygy commercial copy: that copy contains unsupported release/research claims requiring removal.
- `.local-backups/` contains private point-in-time source/runtime recovery material and is excluded from Git/deployment. Existing archives and live `.lunar-data` are preserved. `evidence/F001` contains redacted custody receipts only.

No remote deployment is performed by these build commands. Stage and test the generated artifacts before replacing any working offline delivery or external deployment.
