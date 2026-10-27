# Lunar Paradox — product journey and private operations

26 October 2026. Local implementation; no live deployment or production migration performed. A complete hosted build and whitespace/syntax checks passed.

## Public journey

Astrolabe remains the live environment. The collection is visible without relying on the curved selector: browser tools and engineering libraries have plain names and concise purposes. Selecting an entry reveals its use and one primary action. Browser tools open their actual workspace in the same tab; repositories open their code/documentation. The duplicate description-page / embedded-app route was removed. Legacy browser-tool detail links forward to the workspace.

Workspaces share a restrained visual system, contextual instructions, compatibility notes, privacy explanations and feedback. The validated same-origin return link preserves the selected product and filters. A short-lived browser-session record restores catalogue scroll position on return. Repository landing pages also use the shared help/feedback shell. Generated tool pages now have an explicit hosted asset base so clean production URLs can resolve their scripts and styles.

Existing product descriptions, repositories, algorithms and performance claims were not independently audited. No new benchmark, customer rating or verified-use claim was invented.

## Private operations

`/operations` is a non-indexed frontend for the existing MFA-protected API. No private data is embedded in HTML. The local owner-key fallback is offered only on loopback; production retains existing administrator authentication, roles and CSRF enforcement. Local keys exist in memory only. Inactivity locks the screen; sign-out clears private DOM content.

- Accepted applications link to explicitly created projects.
- Projects pass through draft, scoped, awaiting deposit, funded, active, review, accepted and handed over. Scope requires an agreed fee, required deposit and reference. Funding requires recorded cleared receipts meeting that deposit. Client acceptance and handover remain explicit human changes.
- Invoices, expenses, tasks, research, releases and responsibility records share IDs, timestamps, revision checks and audit entries. Money edits and research budgets require the finance role; release/feedback publication requires the publishing role.
- Currency totals cover all saved records and stay separate. The editor lists the latest 300 records with an explicit count when truncated; the attention list shows up to 200 current flags. Recorded customer receipts, outstanding invoices and paid expenses are operational records, not a bank feed or audited accounting ledger.
- Approved research expenses cannot exceed the programme cap. The cap cannot be reduced below committed costs. Approved financial values cannot be silently rewritten.
- Reminders and overdue/blocked-work flags are computed automatically from saved records, with UTC date comparison. They do not approve applications, send messages, spend money, sign agreements, publish releases or grant accounts.
- People records assign responsibilities only. They are not payroll, employment records or access provisioning.
- Idempotent create requests and optimistic revisions prevent duplicate retries and lost updates. Foreign keys protect linked applications and programmes against accidental deletion.

## Genuine feedback

The public submission endpoint stores permissioned feedback as pending. Public reads return published text/name/date/version only, never email. Private moderation requires human approval. There are no fabricated stars or automatic verification badges. The private desk supports approval, rejection and hold/unpublish. Public reviews and operations tables have RLS enabled and no anonymous/authenticated direct grants.

## Activate in production

1. Review `database/migrations/006_operations_reviews.sql`. Take the normal database backup using the established private backup process.
2. Run `npm run db:migrate` from an environment with a valid, privately configured PostgreSQL migration URL. Do not put credentials in chat or tracked files. No usable SQL URL or management token was available locally during this work.
3. Run `npm test`, then a full `npm run build -- --hosted-only` before release so all three exports and CSP hashes agree. Include the changed Vercel rules and all new public assets in the deployment.
4. Verify `/operations` using the actual named administrator and their own MFA factor. Do not use the disposable test key. Confirm roles for other staff before access.
5. Exercise one synthetic application/project and a consented feedback submission in staging, including the unauthenticated, insufficient-role, duplicate-retry and stale-edit paths. Keep fixtures out of public production feedback.
6. Deploy through the existing release process. Confirm direct product URLs, workspace assets, return links and feedback failure states on each domain and actual supported browsers/devices.

No bank/payment webhook, invoice delivery, accounting package, payroll, SAP integration, email scheduler or production review-retention policy is connected by this change. Financial transfers and client commitments remain manual. Existing production retention should not be enabled against active business records without a reviewed closure/retention policy; linked application deletion now fails rather than orphaning operations.

## Reproduce local checks

- `npm test`: 93 checks passed at this implementation checkpoint, including an embedded PostgreSQL instance applying every migration and exercising workflow/permission/feedback rules. This is not a live Supabase migration test.
- `node tools/preview-api.mjs --port 8837`: generated files plus the actual Node API handler; requires a real configured database for backend features.
- `node tools/preview-operations-disposable.mjs`: loopback-only ephemeral PostgreSQL test process on port 8840. The fixed local test key in that script is a synthetic fixture and must never be configured in production. Closing the process discards its data.

Browser evidence in `evidence/journey-operations-2026-10-26/` covers collection discovery, direct tool opening, contextual help, return selection, a synthetic local feedback submission pending moderation, and a synthetic research record remaining proposed, decimal currency entry preserving £100.50, allowed next-state choices, and sign-out clearing private records. The disposable test process was stopped and its fixtures discarded. A 390×844 collection sample had document width 390. These are bounded checks, not exhaustive cross-browser/device/performance acceptance.
