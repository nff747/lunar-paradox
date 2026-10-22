# Production API and database

This project now has a Vercel Node Function at `api/[...path].js` backed by PostgreSQL through Neon’s serverless driver. The existing offline Python/SQLite launcher remains separate and unchanged. The static preview command (`npm run dev`) is not an API emulator; use Vercel’s local runtime to exercise hosted functions. Shared code and migration files live outside the Vercel `api/` directory so they do not become accidental public function routes.

## Included API

- `GET /api/health` verifies the database connection and schema migration.
- `POST /api/apply`, `POST /api/application-access`, and `POST /api/estimate` implement application, private-key status checks, and server-calculated estimates. Pending or declined applicants cannot estimate. Estimate creation locks the application row and pricing row in one database transaction.
- `GET/PUT /api/applications` and `GET/PUT /api/pricing` provide the private review desk and revision-protected rate card.
- `GET /api/content` returns published records only. Owner-key-protected `GET/PUT /api/publisher` manages drafts and published company content.
- `POST /api/briefs` stores project briefs; owner-key-protected `GET /api/briefs` reads them.
- Owner-key-protected `DELETE /api/applications/:id` and `/api/briefs/:id` support removal requests; deleting an application also removes its estimate records.

The API applies strict input schemas, JSON body limits, same-origin checks, database-backed request limits, short-lived hashed network identifiers, no-store responses and parameterized SQL. Applicant access keys are generated with cryptographic randomness and only their SHA-256 hashes are stored. The server never accepts client-supplied prices.

## Required Vercel configuration

1. Link a Neon Postgres database through Vercel Marketplace or connect an existing Neon project. Provide a pooled PostgreSQL URL as `DATABASE_URL` (or `POSTGRES_URL`). Vercel/Neon integration setup is not present in this checkout.
2. Add separate Production and Preview environment values for `LUNAR_OWNER_KEY` and `LUNAR_RATE_LIMIT_SECRET`. Each must be a unique random value with at least 32 characters. Keep both only in the hosting secret manager. Do not put them in `.env.local` tracked files or browser bundles.
3. Use Node.js 22 or newer. `vercel.json` routes the catch-all API to a 15-second Node Function while the existing static build continues to publish `build/hosted`.
4. Apply `database/migrations/001_initial.sql` to the intended database before sending traffic. With `DATABASE_URL` securely present in the migration shell, run `npm run db:migrate`. The migration is idempotent. Then verify `GET /api/health` returns `200` and `{"status":"ready","storage":"postgres"}`.
5. Run the hosted build and tests, then test a Preview deployment before Production. Submit a synthetic application, verify its pending state, accept it in the owner desk, set a test rate card, calculate an estimate, and verify rate-card totals and database persistence. Delete all synthetic records before real submissions.

For local Vercel Function testing use `vercel dev` with Preview-only environment variables and a non-production database. `npm run dev` serves the static preview and intentionally returns `503` for `/api/*`.

## Still required before accepting real public applications

- No transactional email is connected. Applicants receive a one-time access key to save/download, and currently need to return to the site to check their status. The API does not send a receipt, acceptance, or deletion confirmation.
- The publisher and review desks use a shared high-entropy owner secret rather than named staff accounts, MFA, or an audit log. Rotate the secret after suspected exposure.
- Retention is not automated. An operator can delete an individual application or brief through the authenticated API, but there is no retention schedule, scheduled purge, export workflow, or backup/restore runbook yet.
- Publish an accurate privacy notice, identify the data controller and lawful basis, set a retention period, and provide a working contact route before enabling collection. The company’s legal identity and privacy details must come from the owner; they are intentionally not invented here.
- Confirm Neon/Vercel region, access, backup, spend and availability settings with the account owner. Check the provider’s current data-processing terms and configure production and preview databases separately.
- Payment collection, contract signing and booking are not implemented. An estimate remains indicative and creates no booking.

## Verification status

The API’s validation and missing-database fail-closed behavior are covered by `tests/production-api.test.mjs`. The static package can build without production secrets. Live PostgreSQL transactions, Vercel Function execution, managed database provisioning, and a Preview/Production deployment cannot be verified until the owner connects the database and configures secrets. No live site or live database was changed as part of implementation.
