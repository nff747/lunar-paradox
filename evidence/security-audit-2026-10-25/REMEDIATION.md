# Security remediation — 25 October 2026

## Implemented and verified locally

- LP-01/02: offline publisher reads/writes and briefs inbox now require the owner key. All three local publisher interfaces send it. Public content remains public and excludes drafts.
- LP-03: direct deployments ignore caller IP/proxy headers. Vercel runtime uses its platform-overwritten client-IP header only; malformed values fall back to the peer. Submission limits also have an independent global budget. Actual edge normalization is based on Vercel's documented contract, not a claim that production was flooded.
- LP-04: anonymous owner failures and authenticated-principal traffic have separate budgets. A real PostgreSQL test confirmed anonymous failures cannot spend the named administrator's budget.
- LP-05: hosted administration uses provider-verified identity, required AAL2 MFA, host-only HttpOnly Secure SameSite sessions, CSRF tokens, expiry, idle expiry, server-side revocation and role checks. Only hello@lunarparadox.com is approved by default. Legacy shared-key access is disabled in production unless an explicit emergency override is configured. The owner's actual authenticator enrollment is still required.
- LP-06: static targets are resolved and confined to the allowed public root; private filenames, directory listings and outside-root symlinks are denied. Host/Origin checks now also protect settings, snapshots, runtime and static reads against untrusted-host requests.
- LP-07: the hosted build generates exact inline-script CSP hashes. Builds fail in Vercel if the committed policy is stale. All three scenes passed an actual HTTP/CSP browser run with no policy violations. Unused automatic Firebase analytics was disabled rather than opening the policy to unconsented external scripts.
- LP-08: locking aborts owner requests and invalidates their response epoch. The delayed-response reproduction now leaves the desk empty and locked.
- LP-09: empty, whitespace and short local owner-key files fail closed. New keys are initialized atomically without replacing valid existing keys.
- Offline submissions now have idempotent retry behavior; changed payloads with the same token are rejected.
- Gravity renderer initialization now has an accessible recovery state without an uncaught error. Static and client canonical metadata point Labs/Products to their actual subdomain roots.

## Database and operator controls

Migration 005 adds private administrator sessions and audit records. Administrative changes and their success audit records are committed together. This was tested on disposable PostgreSQL and applied in the candidate build.

An encrypted backup/restore drill passed on disposable PostgreSQL, including altered-ciphertext rejection. Retention dry-run and explicit deletion were tested only against disposable expired fixtures. No production backup was downloaded and no production retention deletion was performed.

## Live configuration already repaired

www.lunarparadox.com was a deployment alias without a production project-domain entry. It was registered on the existing project with a permanent apex redirect. A fresh anonymous HTTP check returned 308 to https://lunarparadox.com/.

## Evidence and verification limits

- fixed-api.json: eight real PostgreSQL session/abuse/CSRF/role/audit checks.
- fixed-browser.json: all three scenes under CSP, synthetic MFA UI flow without token/password storage, Gravity failure recovery.
- owner-lock-fixed.json: delayed private results no longer reappear after locking.
- backup-restore-drill.json and retention-drill.json: disposable-data operations only.
- candidate-auth.json: the real Supabase password step accepted the approved account and required MFA enrollment; no administrator session was issued before MFA.
- candidate-browser.json: protected release browser checks. Consult its deployment URL rather than assuming any candidate is promoted.

The existing JavaScript suite has 62 passing tests; Python has 6 passing tests. The original hosted workflow also passed nine disposable PostgreSQL checks. These are bounded tests, not a claim of exhaustive penetration resistance or locked frame rates on every device.

## Remaining owner/operations actions

1. Complete authenticator enrollment on your own device at the review desk, then perform a real MFA sign-in. The account's generated initial password is in the private ignored `.lunar-data/admin-initial-password.key` file; no password is printed in these notes. No email was sent.
2. Choose and provision the production encrypted-backup destination, independent key custody, schedule, failure alerts and an isolated restore environment. The successful disposable drill is not a scheduled production backup.
3. Approve a data-retention policy before enabling any production deletion. The tool defaults to dry-run and requires two explicit apply flags.
4. Configure actual hosting/database alert delivery and test real phones/cross-browser and longer sessions. Those account/device operations are not established by source changes.

See SECURITY-OPERATIONS.md for exact configuration and procedures, and final-live-verification.json for the eventual deployment result. No security finding is considered live-fixed merely because this document says its code is implemented.

## Promoted release

The tested final candidate was promoted to the existing production project: https://lunar-paradox-myo0uhy9f-nff747s-projects.vercel.app. All three public domains rendered correctly afterward; CSP and canonical fixes were present. Final production health/authentication results are in final-live-verification.json. The one-time bootstrap variable and its temporary candidate deployment were removed; no enrollment email was sent.
