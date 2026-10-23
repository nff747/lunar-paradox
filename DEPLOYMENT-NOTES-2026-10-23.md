# Lunar Paradox — deployment notes

Prepared 23 October 2026. This is a handoff, not a deployment receipt. No deployment, database change, Git commit or push was performed while preparing these notes.

## Release scope and status

Canonical project: `/home/n1khy/Downloads/lunar paradox`.
Git remote: `https://github.com/nff747/lunar-paradox.git`.
Vercel project: `lunar-paradox`, project ID `prj_vpgS7PLHD30OyQqLkJJH9yaYDuKp`.
Configured runtime: Node 24.x. Build: `npm run build -- --hosted-only`. Output: `build/hosted`.

The latest moon-colour adjustment is LOCAL ONLY:
- Syzygy left hemisphere: warmer gold/ochre with white-gold rim light.
- Right hemisphere: charcoal-violet, brighter thin violet faults and purple edge light.
- This colour adjustment preserves the approved animation, geometry and camera choreography.
- Canonical shader: `offline-platforms/lunar-syzygy/scene-source.html`.
- Offline entry and root entry have been rebuilt and installed.

The working tree also contains earlier uncommitted backend, commissioning, camera, materials, audio, cache and routing improvements. Deploying this folder ships those changes too. Review the complete diff; do not describe this as a colour-only deployment. New modules, CSS, migration 004 and build helpers must travel with their callers.

## Evidence available locally

- Latest local automated run: 59 tests passed, zero failures.
- Latest Syzygy browser run: joined/open render, hold latch, explicit rejoin, inspection movement, reduced-motion pause and 390px layout passed; no page errors and no remote requests in the offline run.
- That short AMD Radeon 780M sample measured 1,904ms startup and 180 frames with median/p95 16.7ms and no frames above 50ms. This is not a cross-device performance guarantee.
- Receipt: `evidence/syzygy-experience/browser-check.json`.
- Colour screenshot: `evidence/syzygy-experience/joined.png`.
- Earlier staged backend receipt: `evidence/experience-release/hosted-backend.json`, recorded 23 October at 05:30 UTC. It passed health, private access, submission retry, approval and synthetic-record cleanup on that deployment. It does not prove the latest local build is live.

## Important unresolved release check: host routing

Earlier public checks found Labs and Products roots serving Syzygy. The local `vercel.json` now has explicit host-root rewrites and prefixed asset rewrites, but the final public fix has NOT been verified.

Required identities:
- `https://lunarparadox.com/` → Syzygy / Brand and Studio commissions.
- `https://labs.lunarparadox.com/` → Gravity / Labs.
- `https://products.lunarparadox.com/` → Astrolabe / Products.

Keep all three independent. Verify actual rendered scene and `body[data-scene]`, not just HTTP 200. Test `/labs/` and `/products/` asset bases for missing or wrongly rewritten modules. Keep the API rewrite ahead of scene catch-all rules. Stop or roll back if either subdomain renders the wrong scene.

## Before uploading

1. Review `git status --short`, `git diff --stat`, `git diff` and the untracked files. Preserve unrelated work. Make a reviewed release commit before shipping so rollback has an identifiable revision.
2. Keep `.env*`, `.lunar-data/`, owner keys, sessions, database files, recovery archives and private applicant data out of Git and the upload. Never put database/service keys in browser code. Check both `.gitignore` and `.vercelignore`.
3. Verify the project link in `.vercel/project.json` and the intended Vercel account. Record the current production deployment URL as the rollback target before promoting anything.
4. Run from the canonical project:

```sh
npm ci
npm test
npm run build -- --hosted-only
node tools/verify-syzygy-browser.mjs
```

The browser checker uses this machine's bundled Playwright path; set `PLAYWRIGHT_MODULE` to a valid Playwright module on another machine. It opens the installed offline build. If source changed, rebuild/install it first:

```sh
npm run build -- --scene syzygy
node tools/install-local.mjs --scene syzygy
```

Do not deploy the self-contained offline HTML as the hosted build. Do not manually patch generated HTML or `BUILD.json`.

## Database and secrets

Production uses Supabase PostgreSQL through the server-only backend. Preserve certificate-verified TLS and its bundled CA. Production credentials are protected Vercel environment variables; do not copy them into notes, chat, committed files or browser bundles.

Required server configuration includes `DATABASE_URL` (or the configured supported database URL), `LUNAR_OWNER_KEY` and `LUNAR_RATE_LIMIT_SECRET`. Preserve existing values. Rotating the rate-limit secret changes deterministic retry access-key derivation; do not rotate it casually during a retry rollout.

Current API requires schema migration version 4. Ensure `database/migrations/004_application_idempotency.sql` is applied before routing requests to this API revision. Migrations are transaction/advisory-lock protected. The normal `vercel.json` build command does NOT apply them automatically.

If authorized production SQL access is available, run `npm run db:migrate` using securely supplied server credentials. If Sensitive credentials are available only inside Vercel, use a reviewed isolated release copy with the build command `node scripts/migrate-production-db.mjs && npm run build -- --hosted-only`; verify migration success in its build log before promotion. Do not weaken secret protection to download the password. Even a deployment without domain assignment can mutate the production database when it uses Production credentials.

Do not restore or delete historical database tables as part of a visual release. Do not put test service prices or synthetic products into production.

## Stage, verify, then promote

Use the existing linked project and an installed, authenticated Vercel CLI. A regular Preview deployment uses Preview configuration: it must have its own configured secrets/database for meaningful backend tests.

For an explicitly authorized production-configured candidate without assigning production domains, the previously used CLI flow is:

```sh
vercel deploy --prod --skip-domain --yes
# Save the returned candidate deployment URL.
vercel inspect DEPLOYMENT_URL
```

Run those commands from the reviewed release directory. Verify the CLI supports these flags before use. A successful upload/build alone is not acceptance.

On the candidate:
- Check all three scene entries, actual WebGL rendering, shader compile errors, fonts, textures and versioned JS/CSS requests.
- Check warm-gold/violet colours in both joined and open states. Confirm hold latch, explicit rejoin and independent ENTER action.
- Check Studio application, private receipt, pending restriction, owner acceptance and real configured estimate totals. Use only disposable synthetic records and delete them afterwards.
- `/api/health` must return 200 and ready/Postgres; unauthenticated owner APIs must return 401.
- Optional existing checker: `node tools/verify-hosted-backend.mjs DEPLOYMENT_URL`. It writes a synthetic application, approves it, then removes it. It requires the private local owner key and Vercel CLI; never print the key.
- Check keyboard focus, reduced motion, touch layout, sound toggle and audio suspension when hidden.

Only after acceptance:

```sh
vercel promote DEPLOYMENT_URL --yes
```

## Immediately after promotion

- Recheck the THREE real public origins and their actual scene identities. Candidate URLs do not reproduce production host-based routing by themselves.
- Confirm all assets and APIs load without 404, redirect loops, mixed content, CORS or JavaScript errors.
- Verify `www` redirects to the apex; verify intended legacy URL redirects and canonical tags.
- Check `/robots.txt`, `/sitemap.xml`, titles, descriptions and robots directives. Labs/Products remain intentionally noindex until genuine published content warrants indexing. Do not accidentally index duplicate internal scene paths.
- Check in a fresh browser session to catch stale modules. JS/CSS code versions are generated by `tools/hosted-assets.mjs`; do not hardcode or reuse old version strings.
- Record commit SHA, candidate URL, promoted deployment URL, UTC time, migration versions, health result and screenshots for each origin. State explicitly whether GitHub was pushed; CLI deployment and Git push are separate operations.

## Rollback

If rendering, host routing, application access or backend readiness fails, promote the recorded previous known-good deployment using `vercel promote PREVIOUS_DEPLOYMENT_URL --yes`, then verify all public origins again. If using the Vercel dashboard's rollback action instead, verify the selected deployment and environment first. Code rollback does not reverse database migrations; retain additive migration 004 and all real data. Do not wipe or restore a database merely to undo a shader change.

## Still not established by these checks

- Latest colour update publicly deployed and public host routing fixed.
- Sustained performance across supported real phones and multiple browser/device combinations.
- Transactional email delivery, approved real service pricing, named staff/MFA, operational backup/restore and retention procedures.
- Search Console ownership/submission and actual indexing.
- Final client acceptance or guaranteed frame rate/photographic reference matching.

Older handoff sections are historical. Use current source and fresh deployment evidence where these notes or old receipts disagree; never treat a plan or HTTP 200 as proof of a successful scene release.
