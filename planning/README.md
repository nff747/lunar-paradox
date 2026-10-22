# Checklist maintenance

The authoritative plan is `../FINAL-PRODUCT-CHECKLIST.md`. The HTML, JSON and Codex Canvas are generated read-only views.

Record implementation progress and evidence beside its stable task ID in the master. Use `[x]` only after that task's acceptance is verified on the identified build. Keep blocked and explicitly excluded work visible; exclusions are not verified passes.

From this repository, regenerate the views using:

```sh
node planning/build-checklist.mjs
```

The renderer currently writes the requested Downloads and Documents/plans locations and the existing Codex Canvas location for this user's machine. Adapt those constants deliberately if moving the planning artifact elsewhere. It does not modify scene/runtime code or execute any implementation task.

The original planning drafts and inspection receipts are retained under `/home/n1khy/Documents/Codex/2026-10-16/so/work/final-product-plan`. The `--assemble` option was for initial construction only and refuses to overwrite the existing master. Do not regenerate the master from old drafts after work begins; edit the master and regenerate its views instead.

This planning material includes internal operational information. It is not part of the public website's document root or a public marketing artifact.
