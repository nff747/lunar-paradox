# Company infrastructure — local/offline edition

## Destinations

- Syzygy starts at `#/realms`. ENTER opens `#/home`; Studio is `#/studio`; commissioning/collaboration is `#/commission`.
- Gravity starts at `#/labs`. Only published experiment records appear. Interest browsing appears when the actual collection has multiple categories.
- Astrolabe starts at `#/products`. Only published product records appear.
- The SCENE menu opens existing scene-specific controls, measurements, saved viewpoints and View / Sound.
- The brand link returns to Syzygy. Normal links connect the three independently loaded renderers. There is no forced unified story.

## Publishing

For offline publishing, run the local launcher and open SCENE → Local publisher, or `#/manage`. For hosted publishing, open `#/manage` on Syzygy and authenticate with the configured production owner key. The hosted publisher writes to Neon/Postgres through the Vercel API; it is available only after database and environment setup described in `PRODUCTION-BACKEND.md`.
Choose Experiments or Products. NEW RECORD opens an empty editor. Save as draft, preview privately, then set the state to published and save. Published entries receive detail routes. Archive withdraws the entry while retaining it for editing and republication.

A published record needs title, summary and content. Optional preview imagery and actions require complete HTTPS URLs; an action needs both its label and URL. Content is plain text, escaped before display. No scripts or HTML are accepted as rich content.

The local launcher persists the registry in SQLite alongside existing settings, without replacing saved scene observations. The hosted publisher persists it in Postgres. Both use revision checks to prevent a stale tab overwriting a newer document. Each scene's local settings and telemetry remain isolated by scene.

EXPORT CONTENT saves a JSON backup including drafts. MERGE BACKUP restores previously absent IDs without overwriting existing records. For public distribution, EXPORT PUBLIC SNAPSHOT downloads `published-content.js` containing only published entries and the configured public contact email. Replace the matching source file in each intended platform and rebuild the standalone exports. The file is bundled into HTML. On a fresh local database, the launcher imports that public snapshot; it never overwrites an existing local registry. Keep private JSON backups outside public website assets.

Public collection templates do not invent experiments, products, project counts, customer claims or research metrics. Empty sections show one short message. No search/filter scaffold is displayed over an empty collection.

## Commissioning

Application-first workflow replaces the brief-only form. Applicants submit for review; only accepted applications unlock configured service selection and a server-calculated estimate. SCENE → Applications & pricing opens owner-key-protected review and rate configuration. The hosted review desk uses the environment owner key and Postgres. See `COMMISSIONING.md` and root `PRODUCTION-BACKEND.md` for operation and deployment boundaries. No automatic email or payment is configured.

## Offline navigation

The full offline-platforms folder contains all three platforms. Normal company links work through any launcher using local `/platforms/<scene>/` mounts, while each renderer is loaded as its own page. File-mode links use sibling folders. An individual platform ZIP runs independently, but cross-platform links require the other platform folders beside it. Settings API calls identify the scene, preventing the selected launcher's default scene from being applied to a different platform.

## Verification

Browser QA uses synthetic entries in a separate QA database, never the delivered user's database. The delivered published snapshots remain empty. Evidence is in work/company-build; source is outputs/lunar-*/dist. No original scene geometry, textures, physical model or shader was replaced in this change. Existing visual fidelity/performance limits still apply.
