> Current database status (22 October 2026): LIVE and verified. `/api/health` returns 200/ready/postgres. Earlier setup-blocker notes below are historical; see the superseding LIVE update and PRODUCTION-BACKEND.md.

# Lunar Paradox — Local-to-Live Handoff

This note is for whoever maintains and promotes the project. The user confirms that **v0.5 is already launched** at [lunarparadox.com](https://lunarparadox.com/). The local changes described below are not confirmed to be part of that launch.

## Current state

- Working project: `/home/n1khy/Downloads/lunar paradox`.
- Live v0.5: `https://lunarparadox.com/` returned HTTP 200 from Vercel when checked on 2026-10-21. This confirms the domain serves a live site; it does not identify which local commit produced v0.5 or whether the current local work is deployed.
- Intended production domain: `lunarparadox.com` (with `www.lunarparadox.com` configured to redirect to the apex domain in the local Vercel configuration). The live redirects and domain ownership were not verified in this check.
- The current project copy has a local Git repository on branch `master`, but `git remote -v` returned no remote. It is not connected to GitHub from this checkout.
- Vercel settings in `vercel.json` describe the intended build for the **current local copy**. Do not assume that configuration matches the live v0.5 deployment.
- Local hosted build and tests passed: `npm run build -- --hosted-only`, `npm test` (39 tests), and `python3 -m unittest discover -s tests -p 'test_*.py' -v` (3 tests). The hosted output is `build/hosted/`; the self-contained offline pages remain in `offline-platforms/lunar-*/index.html`.
- `robots.txt`, `sitemap.xml`, canonical metadata and redirects are local project files. Search Console ownership, DNS, production crawling and indexing have not been verified.
- Labs and Products are intentionally `noindex` and excluded from the sitemap until real experiment/product content is approved and published.
- **Build-input fix made locally:** `.vercelignore` no longer excludes `tools/`, allowing Vercel's configured build to access `tools/build.mjs` and `tools/build-scene.mjs`. This was validated with the hosted build locally, but still needs a Vercel preview build.
- **Hosted backend implementation added locally:** `api/[...path].js` provides Vercel Functions for applications, owner review, estimates, company publishing, project briefs and deletion, backed by Neon/Postgres. `database/migrations/001_initial.sql` defines durable tables and `npm run db:migrate` applies the schema. Production and Preview secrets/database are not configured, and no Vercel Function or live Postgres deployment has been verified. `npm run dev` remains a static preview that returns HTTP 503 for `/api/*`; use `vercel dev` with non-production secrets/database for hosted integration testing. See `PRODUCTION-BACKEND.md` for setup and remaining legal/operations gates.
- **Backend checks added:** five hosted API tests cover validation and fail-closed behavior without database secrets; three isolated Python tests and a temporary loopback smoke check cover the offline SQLite backend. No tests touched delivered local runtime data. There is not yet a live Postgres transaction or browser integration test.
- Keep `.env.local`, credentials, local databases/keys, personal runtime data, and recovery archives out of Git. `.gitignore` has exclusions, but verify every staged file yourself before the first push.

## Publish checklist

1. **Establish the v0.5 source of truth.** Find the repository, Vercel project and commit that produced the live v0.5 site. Compare them with this local copy before choosing which version to promote; do not overwrite or roll back the live version by assuming this checkout is newer.
2. **Make a recoverable copy.** Keep the current local folder and its recovery archives unchanged. Confirm a fresh local build and test pass before editing deployment settings.
3. **Prepare Git safely.** Review `git status --short`; run `git check-ignore -v .env.local` and check that no `.key`, `.sqlite3`, `.tar`, `.tar.gz`, `.zip`, or private local data is staged. Connect the verified source to its intended private GitHub repository (or create one only if needed), review the diff and initial commit, then push the intended branch. Do not push secrets or recovery bundles.
4. **Verify the Vercel build input in preview.** `.vercelignore` now preserves the build scripts locally. Confirm the actual Vercel deployment receives `tools/build.mjs`, `tools/build-scene.mjs`, `package.json`, and `package-lock.json`, uses the repository root, installs with `npm ci`, runs the configured build command, and publishes `build/hosted` as configured in `vercel.json`.
5. **Configure and test the hosted backend before promoting public forms.** The Vercel API, Neon/Postgres schema and migration are implemented in this checkout, but no database or secrets are configured. Provision Neon through Vercel or connect an existing database, add unique `DATABASE_URL`, `LUNAR_OWNER_KEY` and `LUNAR_RATE_LIMIT_SECRET` values to Preview and Production, apply the migration, then verify all application/review/estimate and publisher journeys on Preview. Publish a truthful privacy notice and determine retention, backup, staff access and notification operations before collecting real applicant data.
6. **Deploy a preview first.** Verify all pages, scene assets, fonts, mobile layout, controls, API calls, and browser console/network errors. Confirm `/`, `/studio`, `/labs`, and `/products` return the intended pages; `/index.html`, `/studio.html`, `/gravity`, and `/astrolabe` redirect once to their canonical destinations; old aliases do not form redirect loops.
7. **Preserve or deliberately update the live domain.** Confirm the existing Vercel project and DNS before changing them. If the local copy is approved to replace v0.5, attach `lunarparadox.com` and any intended `www`, `labs`, `studio`, and `products` hostnames, configure DNS using Vercel's exact values, and verify HTTPS and redirects before announcing the release.
8. **Check production SEO endpoints.** From the live domain, inspect `/robots.txt`, `/sitemap.xml`, page titles/descriptions, canonical tags and robots directives. Ensure the sitemap contains only final, indexable URLs. Keep Labs/Products out until their `noindex` is deliberately removed and their actual content is ready.
9. **Set up search monitoring.** Verify the domain property in Google Search Console using DNS, submit `https://lunarparadox.com/sitemap.xml`, inspect the home and Studio URLs, and monitor crawl/index coverage. Requesting indexing does not guarantee or immediately produce indexing or rankings.
10. **Measure real performance.** Record cold-load transfer, texture decode time, first rendered frame and sustained frame pacing on the supported desktop and phone tiers. The current asset sources are large; the small HTML shell is not the total download. Do not claim guaranteed 60 FPS or fast startup without measurements. Consider KTX2/Basis compression and progressive low-resolution-first texture loading after capturing a baseline.
11. **Close the release gate.** Confirm backend behavior, redirects, HTTPS, accessibility, mobile rendering, browser coverage, privacy/legal copy, error monitoring, backups and rollback. Keep the production deploy and its commit/revision recorded.

## Commands to run from the project folder

```sh
npm ci
npm run build -- --hosted-only
npm test
python3 -m unittest discover -s tests -p 'test_*.py' -v
```

These commands validate the local build and tests only. They do **not** publish to GitHub or Vercel. The Python tests check local backend logic with temporary databases; run the `offline-platforms/start.py` launcher separately for local end-to-end HTTP/browser checks.

## Database update — 22 October 2026

Supabase is connected in Vercel Production, but live health still reports a missing migration. Local code now supports Supabase through `pg`, includes migration 002 for RLS/private API access, and passes eight real PostgreSQL integration checks plus 54 automated tests. Production database credentials cannot be pulled because they are Sensitive. Both server-only owner/rate-limit secrets are now configured as Sensitive Production variables; redeployment is required to activate them. See PRODUCTION-BACKEND.md for the precise remaining migration/deployment gate. No production data/schema or deployment was changed in this pass.

## LIVE database/backend superseding update — 22 October 2026

Earlier statements in this document that no production database/migration was verified are now historical. Migrations 1–3 have been applied inside a staged Vercel build using existing protected Supabase credentials. The tested backend was promoted, and `https://lunarparadox.com/api/health` returns 200/ready/postgres. Nine main-domain workflow checks passed and all synthetic test records were removed. The production rate card is empty; no prices or products were fabricated. Supabase TLS remains certificate- and hostname-verified using its official CA. Existing legacy tables are retained privately. See PRODUCTION-BACKEND.md and evidence/database-readiness/ for current receipts and remaining operational work. Uncommitted visual changes were not deployed.
