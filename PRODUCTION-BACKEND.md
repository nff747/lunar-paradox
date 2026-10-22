# Production API and database

This project now has a Vercel Node Function at `api/[...path].js` backed by PostgreSQL. Supabase and standard PostgreSQL use the `pg` TCP driver with verified TLS; Neon hosts retain the Neon serverless transport. The existing offline Python/SQLite launcher remains separate and unchanged. The static preview command (`npm run dev`) is not an API emulator; use Vercel’s local runtime to exercise hosted functions. Shared code and migration files live outside the Vercel `api/` directory so they do not become accidental public function routes.

## Included API

- `GET /api/health` verifies the database connection and schema migration.
- `POST /api/apply`, `POST /api/application-access`, and `POST /api/estimate` implement application, private-key status checks, and server-calculated estimates. Pending or declined applicants cannot estimate. Estimate creation locks the application row and pricing row in one database transaction.
- `GET/PUT /api/applications` and `GET/PUT /api/pricing` provide the private review desk and revision-protected rate card.
- `GET /api/content` returns published records only. Owner-key-protected `GET/PUT /api/publisher` manages drafts and published company content.
- `POST /api/briefs` stores project briefs; owner-key-protected `GET /api/briefs` reads them.
- Owner-key-protected `DELETE /api/applications/:id` and `/api/briefs/:id` support removal requests; deleting an application also removes its estimate records.

The API applies strict input schemas, JSON body limits, same-origin checks, database-backed request limits, short-lived hashed network identifiers, no-store responses and parameterized SQL. Applicant access keys are generated with cryptographic randomness and only their SHA-256 hashes are stored. The server never accepts client-supplied prices.

## Required Vercel configuration

1. Supabase is now connected to the Vercel Production environment. Runtime accepts the pooled `POSTGRES_URL` or `DATABASE_URL`. Migration prefers `DATABASE_MIGRATION_URL`, then `POSTGRES_URL_NON_POOLING`, then the runtime URL. Use the provider's supplied pooler URI for Vercel functions and a reachable direct/session URI for migration. The local CLI cannot retrieve production values marked Sensitive.
2. Add separate Production and Preview environment values for `LUNAR_OWNER_KEY` and `LUNAR_RATE_LIMIT_SECRET`. Each must be a unique random value with at least 32 characters. Keep both only in the hosting secret manager. Do not put them in `.env.local` tracked files or browser bundles.
3. Use Node.js 22 or newer. `vercel.json` routes the catch-all API to a 15-second Node Function while the existing static build continues to publish `build/hosted`.
4. Apply all numbered migrations using the migration runner (which also handles legacy compatibility) in `database/migrations/` to the intended database before sending traffic. Put `DATABASE_URL` in the gitignored `.env.database.local` file (private permissions: `chmod 600 .env.database.local`), then run `node --env-file=.env.database.local scripts/migrate-production-db.mjs`. Never paste credentials into chat or commit them. Migration uses one pinned connection and an advisory lock. It is additive/idempotent and enables RLS while revoking browser-role access to API tables. Then verify `GET /api/health` returns `200` and `{"status":"ready","storage":"postgres"}`.
5. Run the hosted build and tests, then test a Preview deployment before Production. Submit a synthetic application, verify its pending state, accept it in the owner desk, set a test rate card, calculate an estimate, and verify rate-card totals and database persistence. Delete all synthetic records before real submissions.

For local Vercel Function testing use `vercel dev` with Preview-only environment variables and a non-production database. `npm run dev` serves the static preview and intentionally returns `503` for `/api/*`.

## Still required before accepting real public applications

- No transactional email is connected. Applicants receive a one-time access key to save/download, and currently need to return to the site to check their status. The API does not send a receipt, acceptance, or deletion confirmation.
- The publisher and review desks use a shared high-entropy owner secret rather than named staff accounts, MFA, or an audit log. Rotate the secret after suspected exposure.
- Retention is not automated. An operator can delete an individual application or brief through the authenticated API, but there is no retention schedule, scheduled purge, export workflow, or backup/restore runbook yet.
- Publish an accurate privacy notice, identify the data controller and lawful basis, set a retention period, and provide a working contact route before enabling collection. The company’s legal identity and privacy details must come from the owner; they are intentionally not invented here.
- Confirm Supabase/Neon/Vercel region, access, backup, spend and availability settings with the account owner. Check the provider’s current data-processing terms and configure production and preview databases separately.
- Payment collection, contract signing and booking are not implemented. An estimate remains indicative and creates no booking.

## Production verification — 22 October 2026

The database/backend deployment is live on **https://lunarparadox.com**. `GET /api/health` returns HTTP 200 with `{"status":"ready","storage":"postgres"}`.

### What changed

- Supabase is connected using verified TLS and its official public CA. Remote build execution used Vercel's existing Sensitive secrets; the database password was never downloaded, printed or embedded into browser code.
- Migrations 1, 2 and 3 are applied. Original legacy application/estimate/pricing tables are retained in the private `lunar_legacy` schema. Compatible records are imported into the new API layout; applicant access keys become SHA-256 hashes. A version marker prevents deleted legacy records being resurrected by subsequent runs. Production contained zero legacy applications at migration time.
- API tables have RLS enabled and anonymous/browser-role privileges revoked. Legacy session/settings tables, when present, are also private. The old anonymous browser-wide cloud-sync bridge is disabled; local scene saves remain available. Per-user authenticated cloud sync is not implemented.
- `LUNAR_OWNER_KEY` and `LUNAR_RATE_LIMIT_SECRET` are Sensitive production-only Vercel variables. The private owner key is saved locally at `.lunar-data/production-owner.key` with 0600 permissions. Never publish that file.
- Pricing/publisher first-save races are serialized using transaction advisory locks.
- Raw Vercel request URLs and nested API paths now dispatch correctly. All `/api/:path*` URLs explicitly rewrite to the catch-all Node function.

### Release and evidence

Tested staged deployment, then promoted:
https://lunar-paradox-18zixcre3-nff747s-projects.vercel.app

The release was assembled from production commit `e54b0b2eddc80a11a16289cb95920b1f3220459f` plus backend/security changes. Twelve scene/interface source files were checked byte-for-byte against that commit; uncommitted visual changes were not deployed. See `evidence/database-readiness/release-source-check.json`.

Nine workflow checks passed on the public domain: health/protection readiness, interrupted-test cleanup, public content, anonymous-owner denial, application/private-access/approval gate, owner acceptance and rate-card access, publisher authentication, brief persistence, and final cleanup. All temporary verification applications/briefs/estimates were removed. Existing customer records were not modified. Receipt: `evidence/database-readiness/hosted-api-verification.json`.

Eight additional end-to-end checks passed on isolated PostgreSQL 17, including concurrent writes, server-calculated estimate totals, cascade deletion and database RLS privileges. A legacy-layout fixture was migrated successfully, original rows remained in the archive, and a repeat migration did not resurrect a deleted application. Unit/regression suite: 56 tests passed.

### Deliberately not claimed complete

- The live rate card has no configured service items. Positive estimate calculation was verified on isolated PostgreSQL, not against invented Production prices. Add actual services/ranges through the private owner desk before offering estimates.
- No transactional email, named staff accounts/MFA, payment collection, contract signing, retention automation or backup/restore acceptance test is provided by this deployment. Those remain separate operational work.
- Production privacy/controller/contact details and actual company content must be supplied by the owner. No fictional rates, products, customers or case studies were added.

### Future migrations

The staged release ran `node scripts/migrate-production-db.mjs` inside Vercel's remote production build before building the site. This allowed secure access to protected secrets without exporting them. The local `vercel.json` keeps its normal build command; future schema changes must explicitly run migrations using the intended environment before deployment. If migrating locally, use an untracked private `.env.database.local` and `node --env-file=.env.database.local scripts/migrate-production-db.mjs`.

### Repeat isolated integration verification

Use a disposable local PostgreSQL database named `lunar_backend_test`, with `anon` and `authenticated` roles available. Set its `DATABASE_URL` and `LUNAR_DATABASE_TEST=disposable` in a private environment file. Run migrations, then `node --env-file=/path/to/test.env scripts/verify-database.mjs`. The verifier refuses non-local/differently named databases and clears only disposable test tables. Never point it at Production.
