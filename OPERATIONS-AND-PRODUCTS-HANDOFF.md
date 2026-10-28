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

## Products exhibition — 27 October 2026

The old persistent sidebar catalogue has been replaced by a feature stage: large selected-product typography, the live Astrolabe background, one interactive specimen, a horizontal collection and a separate full directory. The curved rail remains a secondary selector with keyboard support. Exploration is explicit; catalogue scrolling and camera scrolling do not share control. Opening a browser tool still navigates directly into its workspace with a validated return destination.

The specimens perform local calculations: Sobel normals and interactive lighting, actual PNG/WebP encodes, WebCrypto SHA-256, explicit opt-in oscillator sound, queue operations, projected geometry and CPU cloth constraints. The engineering-library samples are labelled as reference studies, not executions or benchmarks of the published libraries. The neural entry explicitly states that it is not a neural-model preview. One specimen is mounted at a time; leaving it cancels animation/listeners and closes its audio context. Sound is suspended when the document becomes hidden. No reviews, customer outcomes or performance numbers were invented.

Directory filters now keep the directory open and retain control focus. The modal temporarily makes background controls inert, traps Tab, closes on Escape and restores the Browse control. Filter reset remains in the directory; zero matches show a useful recovery message and result count.

Validation: 97 Node tests passed; full hosted build and subsequent Astrolabe export/install passed; `git diff --check` passed. Browser checks cover actual SHA-256 of the sample text "hello", PNG/WebP byte output, direct Cipher workspace opening and selected-product return, audio enable and muted reset after exploration, rail End-key selection, directory filtering/reset/zero results/Escape, and a 390×844 layout with document width 390. These are bounded local checks, not physical-phone, full accessibility, sustained GPU or cross-browser acceptance. Audio UI/state was checked; listening quality was not independently assessed.

Evidence: `evidence/exhibition-2026-10-27/desktop.png`, `mobile.png`, and `directory.png`. Local preview: `http://127.0.0.1:8837/products/`. The preview was restarted as an independent local process after its original terminal session stopped. No production deployment, Supabase migration or database credential change occurred. Production activation requirements above still apply.

### Foreground revision — 27 October 2026

This supersedes the always-visible sample panel described above. The default catalogue now leaves the eclipse and rings clear: selected-product information is a smaller left-hand instrument caption, the collection strip uses a quieter hierarchy, and the foreground uses restrained gold/violet rules rather than a large pasted preview rectangle. Samples open through an explicit Try sample action in a native modal dialog. They are not imported or mounted on arrival; close/Escape cancels the specimen, removes its DOM and restores trigger focus. Catalogue keyboard navigation is disabled while the sample is open.

Validation: 97 tests passed; Astrolabe build/install and whitespace checks passed. Browser checks confirm a 390px-wide document, no mounted sample canvas before opening or after closing, native modal isolation, Page Down remaining inside the sample, Escape return and trigger focus. Evidence: `evidence/foreground-2026-10-27/`. The actual scene materials and geometry are preserved. This visual revision is local and has not been deployed.

### Material maps workspace — 27 October 2026

The PBR tool itself now has a dedicated workbench layout and local typeface. Source/presets and collapsible normal/height/roughness/occlusion groups sit beside a bounded inspection stage. The previous wrapping toolbar and promotional cross-sell footer are removed. Six small map previews are drawn from the actual generated canvases, with keyboard-selectable map tabs, explicit lit-material geometry controls and a persistent export area on normal desktop heights. Narrow screens use a single page with direct source/settings and preview jumps; short landscape windows retain native page scrolling.

Adjustments coalesce pending slider changes, reset restores parameter defaults, source decode errors are shown beside the source, and export encoding errors/status appear beside the actions. Canvas inspection has arrow-key rotation and +/- zoom, respects initial reduced motion for automatic rotation, uses frame time for rotation and skips rendering in hidden tabs. ResizeObserver tracks the actual stage size. The shared product guide now has a close control and Escape/focus return; PBR opens it as a contextual floating panel rather than pushing the workbench below the viewport. Existing processing kernels and the direct catalogue return contract remain in place. The material preview's fill light was adjusted from cyan to violet; no photographic-realism or measured GPU-throughput claim is made.

Validation: 97 tests passed; full hosted build, final Astrolabe export/install, syntax and whitespace checks passed. Browser checks cover Carbon preset selection, normal-strength change and reset, keyboard Normal-to-Height selection, cube selection and keyboard rotation pausing auto-rotation, guide dismissal, narrow-screen source/preview jumps, and real downloads. The downloaded individual PNG is 1024×1024. The downloaded ZIP passes its CRC checks and contains six valid 1024×1024 PNGs plus manifest.txt. Tests used generated preset data only. This does not establish exhaustive device/browser or performance acceptance. No production deployment or database change occurred.
