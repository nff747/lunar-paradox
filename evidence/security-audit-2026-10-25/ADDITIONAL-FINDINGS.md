# Additional findings — local and live

25 October 2026. Follow-up to REPORT.md and LIVE-SITE-REPORT.md. No fixes, production writes or real staff/applicant data were used.

## LP-08 — Medium: locking the review desk does not cancel pending private results

**Confirmed in both local and live UI.** With synthetic API responses intercepted in Chromium:
1. Unlock the review desk with a dummy key (never delivered to the server).
2. Start another review request and hold its response.
3. Click LOCK REVIEW DESK. The private panel disappears.
4. Release the held response. The review data and controls return.

Root cause: review() renders after awaiting Promise.all without checking an authentication epoch; locking clears the DOM and key but does not invalidate that pending work. This exposes information from an already-started authorized request after locking. It does not demonstrate the ability to fetch real records without a backend owner key.

Fix: use an owner-session epoch and AbortController, reject stale responses before rendering, and clear all private state. Acceptance: every outstanding request released after locking leaves the panel locked and empty. Repeat for failed authentication, rapid navigation and overlapping requests.

Evidence: owner-lock-race.json; tools/pentest-owner-lock-race.mjs.

## LP-09 — Medium: an empty local owner-key file makes authentication ineffective

**Confirmed in an isolated local launcher.** An existing zero-byte commission-owner.key is accepted at startup. An anonymous GET /api/applications then returns 200 because the expected key and absent header are both empty strings.

Prerequisite: the key file must be empty or whitespace. The normal generator creates a strong key. No real key was emptied; the test used a temporary directory. Hosted authentication checks minimum secret length and does not share this failure.

Fix: validate the key at startup and in require_owner(), fail closed when invalid, and use atomic key initialization. Do not silently replace a valid existing key. Acceptance: empty, whitespace and too-short key files cannot start an authenticated service or authorize any owner request.

Evidence: empty-owner-key.json.

## Live resilience gap: Gravity has uneven WebGL failure handling

With WebGL context creation deliberately disabled in Chromium, Gravity produced an uncaught 'Error creating WebGL context.' and offered no clear rendering-recovery explanation. Syzygy displayed a rendering error and Products supplied a WebGL availability message. All three retained visible links into commissioning/company navigation, so this was not a total loss of the commercial journey.

Fix: catch renderer initialization errors in Gravity and present the same calm accessible recovery state across the three platforms, while retaining usable HTML content. This is a resilience/UX defect, not a security exploit. Also test real context loss after successful startup and texture/network failures; those cases were not covered here.

Evidence: failure-states.json; tools/pentest-failure-states.mjs. Every API request in this test was intercepted with synthetic public content.

## Further work not established by these tests

- Named admin identities, MFA, role separation and per-session revocation: still absent from the application's shared-key design.
- Application-level review/publishing/deletion audit records: no corresponding audit-write path found in the reviewed API. External Vercel/Supabase logging and its retention were not verified.
- Scheduled applicant-data retention and verified restore drills: not established; do not describe them as operational until demonstrated.
- IP-spoofing resistance at actual Vercel ingress: still unproven. The earlier bypass is a local-handler proof.
- Repeated/failed submissions in the offline backend: hosted idempotency exists, but equivalent offline retry guarantees have not been demonstrated.
- Real phone/browser, long-session, network-loss, concurrency and full Git-history secret testing remain incomplete.

Security finding count now: 2 high, 5 medium and 2 low, with their original scope/prerequisites preserved. Gravity's recovery inconsistency and the live www/canonical defects are tracked separately as operational issues. Nothing has been fixed or deployed in this audit.
