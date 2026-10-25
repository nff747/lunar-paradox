> Remediated release: see [REMEDIATION.md](REMEDIATION.md) and [final-live-verification.json](final-live-verification.json). Original findings below describe the pre-fix state. The named administrator must still enroll their own authenticator; production backup scheduling and retention approval remain operational tasks.

> Additional results: [ADDITIONAL-FINDINGS.md](ADDITIONAL-FINDINGS.md) — review-lock race in local/live UI, empty-key fail-open in the isolated launcher, and live WebGL recovery checks. Total security findings: 2 high, 5 medium, 2 low.

> Live-site follow-up: [LIVE-SITE-REPORT.md](LIVE-SITE-REPORT.md). Current browser checks confirm all three correct scenes render; www sends visitors to Vercel sign-in and the subdomain canonical metadata is inconsistent.

# Lunar Paradox — penetration-test findings

25 October 2026. Scope: current local checkout, offline SQLite launcher, hosted API against disposable loopback PostgreSQL, synthetic browser responses, and ten read-only requests to the three public origins. No production submissions, owner logins, database changes, stress testing, deployment or application-code fixes were performed.

## Verdict

Two high-severity access-control failures exist in the OFFLINE launcher. These are reachable from localhost, not evidence that public Vercel admin endpoints are open. Public anonymous owner requests returned 401. The initial three medium findings concerned IP trust, administrative throttling and the shared administrative credential model. Follow-up reproduced two further medium findings (LP-08 and LP-09); see ADDITIONAL-FINDINGS.md. Two low findings concern conditional static-file exposure and missing CSP. Severity reflects the stated prerequisites, not an assumed Internet compromise.

## LP-01 — High: Offline publisher has no owner authentication

- Status: Reproduced locally.
- Source: `offline-platforms/lunar_backend.py:408,450`.
- Evidence: GET /api/publisher returned the synthetic private draft; PUT /api/publisher with no owner key replaced the publisher document and returned 200.
- Impact: A process or another local account able to reach the loopback port can read unpublished content and modify the public content snapshot served by the launcher. This is not a demonstrated remote Internet exploit.
- Remediation: Require require_owner() for GET and PUT publisher. Update local company.js to send the owner key rather than exempting localhost. Retain origin/Host checks as additional controls.
- Receipt: `local-exploits.json`.

## LP-02 — High: Offline briefs inbox exposes private enquiries without an owner key

- Status: Reproduced locally.
- Source: `offline-platforms/lunar_backend.py:408`.
- Evidence: An unauthenticated GET /api/briefs returned the synthetic private brief, including name, email, goal and budget fields.
- Impact: Any caller able to access the loopback service can retrieve local commissioning enquiries. Normal remote websites are constrained by the existing origin/Host checks and browser same-origin policy.
- Remediation: Require owner authentication for the inbox; change the local UI to authenticate too. Test that public content remains readable while briefs and drafts do not.
- Receipt: `local-exploits.json`.

## LP-03 — Medium: Submission throttling trusts request IP headers without a proxy boundary

- Status: Local handler bypass confirmed; live exploitability unproven.
- Source: `api/[...path].js:89`.
- Evidence: Same socket and x-real-ip produced [201,201,201,201,201,429]. Changing x-real-ip produced seven further 201 responses against real disposable PostgreSQL.
- Impact: A direct or incorrectly proxied deployment can evade application limits and generate spam or database costs. Vercel may replace these headers; that ingress behavior was not tested.
- Remediation: Define and verify the trusted hosting ingress, reject unsupported direct ingress, and use the hosting platform trusted client-address contract. Add a global submission budget and abuse controls so limits do not rely only on IP.
- Receipt: `hosted-local-probes.json`.

## LP-04 — Medium: Unauthenticated requests consume the valid owner request budget

- Status: Reproduced locally.
- Source: `api/[...path].js:190`.
- Evidence: 120 anonymous owner-endpoint requests consumed the shared owner-api/IP window. A subsequent request with the correct owner key received 429.
- Impact: A caller sharing the owner’s egress IP can temporarily block the review/publishing desk; spoofable identity would expand the impact. No production flooding was performed.
- Remediation: Separate unauthenticated failure limits from authenticated owner traffic; retain a pre-auth abuse cap while applying a distinct authenticated principal budget.
- Receipt: `hosted-local-probes.json`.

## LP-05 — Medium: One long-lived owner key grants all administrative powers

- Status: Design risk confirmed by source; no credential theft demonstrated.
- Source: `api/[...path].js:77; offline-platforms/lunar-syzygy/company.js:8,59`.
- Evidence: Owner authentication uses a single environment secret with no user identity, role split or expiry. The publisher retains it in sessionStorage.
- Impact: A stolen key grants review, pricing, publishing and deletion powers. Individual staff cannot be revoked independently; a same-origin script compromise could read the publisher key.
- Remediation: Use named admin identities, MFA, role-limited authorization, expiring server sessions in secure HttpOnly cookies, revocation and an audit trail. Add CSRF protection when introducing cookie authentication. Keep applicant access keys separate.
- Receipt: `Source review; not an exploit receipt`.

## LP-06 — Low: Offline static handler follows symlinks outside the public root

- Status: Reproduced with synthetic marker.
- Source: `offline-platforms/lunar_backend.py:353,363`.
- Evidence: A symlink placed in the temporary served directory pointed to an outside marker file; GET returned that marker with 200.
- Impact: If a public-root symlink points to private data, that target is readable through the launcher. This requires an existing symlink or filesystem write access; no traversal to arbitrary host files was demonstrated.
- Remediation: Resolve every static target and enforce containment within an explicit public root. Deny private filenames and directory listings; test the cross-platform asset path separately.
- Receipt: `local-exploits.json`.

## LP-07 — Low: Public responses have no Content Security Policy

- Status: Confirmed by read-only public response headers.
- Source: `vercel.json headers`.
- Evidence: All three public origins returned no Content-Security-Policy header in sampled root and health responses. HSTS, nosniff and SAMEORIGIN were present.
- Impact: There is less containment if an injection or compromised script is introduced. Missing CSP alone does not prove an XSS vulnerability.
- Remediation: Deploy a tested Report-Only policy first, then enforce a nonce/hash-based policy compatible with Three.js workers, shaders and assets. Include object-src, base-uri and frame-ancestors restrictions; do not break the current import map with an untested blanket policy.
- Receipt: `public-readonly.json`.

## Controls that resisted the tested attacks

- Hosted owner endpoints rejected anonymous requests: applications, pricing, publisher and briefs, both in the isolated handler and the four public main-domain checks.
- Wrong applicant key and unknown application UUID returned 403; a pending applicant could not create an estimate.
- A foreign Origin was rejected with 403; oversized JSON returned 413.
- All seven API tables had RLS enabled and denied SELECT to the isolated anon role. This tests the migration on disposable PostgreSQL, not every privilege of the live Supabase instance.
- Applicant access credentials were stored as hashes rather than plaintext in the sampled database row.
- Browser probes containing img/onerror and svg/onload stayed literal text in the review desk and applicant-status screen; no injected elements or payload execution occurred. These two surfaces are not an exhaustive XSS proof.
- npm audit reported zero known advisories among 43 dependency entries on this date. Vendored scripts and unknown vulnerabilities are not covered by that result.
- No tracked .env, .key, .sqlite3 or tar recovery files were found by the filename check. Full Git-history secret scanning was not performed.
- Existing regression suites passed: 59 JavaScript tests and 3 Python tests.

## Fix order and acceptance tests

1. Authenticate offline publisher reads/writes and briefs reads; update all three local frontends. Acceptance: anonymous requests fail; correct owner succeeds; public content excludes drafts.
2. Establish trusted ingress identity and split owner success/failure budgets. Acceptance: arbitrary client header changes cannot change the rate-limit identity at the supported ingress; anonymous failures cannot spend the authenticated owner budget.
3. Replace the shared owner key before giving multiple staff accounts access. Acceptance: per-user MFA, role restrictions, revocation, session expiry and auditable changes.
4. Confine static file resolution and add browser policy gradually. Acceptance: outside-root symlink is denied; all three real 3D scenes and their workers/assets function under the enforced policy.
5. Repeat the security tests after changes, deploy a reviewed candidate, and retest the real supported ingress without production flooding or real applicant records.

## Reproduction and boundaries

- `local-exploits.json`: actual HTTP requests against a temporary SQLite launcher. All private content was synthetic. The temporary directory was removed.
- `hosted-local-probes.json`: actual HTTP handler and real PostgreSQL. SQL and rate-limit probes touched only the disposable loopback database.
- `browser-injection.json`: Chromium with mocked synthetic API responses; actual commissions.js rendering executed.
- `public-readonly.json`: three root pages, three health requests and four unauthenticated owner GETs. All roots/health returned 200; the receipt does not establish rendered WebGL scene identity.
- `npm-audit.json`, `tracked-files.json`: dependency advisory and tracked-filename checks.
- Probe scripts: `tools/pentest-hosted-local.mjs` and `tools/pentest-commission-dom.mjs`. The hosted-local probe requires a fresh local database named lunar_backend_test and private runtime configuration at the path documented in the script; it intentionally has no production URL mode. It is not safe to point at a reused database because it creates roles and test rows.

Not tested: stolen production sessions, social engineering, network/driver exploits, destructive denial of service, third-party account penetration, full historical secret detection, actual mobile/browser matrix, cloud firewall/header normalization, restore drills, or exhaustive concurrency/fuzzing. No guarantee of absence of vulnerabilities follows from passing these samples.

No fixes or deployment were made in this audit. Findings remain open.
