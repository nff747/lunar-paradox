# Security release and operations — 25 October 2026

## Administrator access

Approved owner: hello@lunarparadox.com. Hosted review/publishing uses Supabase password + TOTP verification and a short-lived, server-revocable HttpOnly session. Identity tokens/passwords/TOTP setup secrets are not persisted in browser storage. The session expires after at most 30 minutes and after 15 minutes without administrator API activity. Mutations also require a session-bound CSRF token. Cookies are Secure, SameSite=Strict and host-only in production.

Open `https://lunarparadox.com/#/applications` or `#/manage`, choose SIGN IN WITH MFA, sign in and enroll an authenticator on your own device. Initial enrollment and a real sign-in on that device must be completed by the owner; automated synthetic tests do not prove that step.

The optional deployment bootstrap creates hello@lunarparadox.com only if it does not exist; it never resets an existing password or sends email. Its generated initial password is stored only in the ignored private `.lunar-data/admin-initial-password.key` on this machine and temporarily as a Sensitive build variable. Delete the temporary Vercel variable after bootstrap. If the provider account already exists, use its existing password; the newly generated local file will not be its password. Keep that file out of commits/uploads/messages.

Production legacy owner-key access is disabled by default. `LUNAR_ALLOW_LEGACY_OWNER=true` is an explicit emergency override, not a normal configuration. The local launcher still uses its private key, now validated and atomically initialized. Do not copy local keys to browsers on public sites.

`LUNAR_ADMIN_EMAILS` is an optional comma-separated allowlist; default is the approved owner above. `LUNAR_ADMIN_ROLES` can be an explicit JSON object mapping an approved email to any subset of `review`, `pricing`, `publish`, `delete`. Only the approved owner gets all roles by default; merely adding another email grants no default privileges. Removing an email/role takes effect at the next API request. Logout deletes the current session server-side. Emergency full revocation can delete that principal's rows from lunar_admin_sessions through a privileged operator connection.

## Release requirements

Migration 005 creates private session/audit tables with RLS and no browser-role access. Apply it before promoting this API revision. Use an isolated production-configured candidate to run migrations and optional account bootstrap without exporting protected database/service credentials. Normal builds do not run migrations.

Full local builds update CSP script hashes in vercel.json. Include that generated configuration in the release. Vercel builds verify it and fail if stale. All three scenes must render under the enforced policy before promotion. Unused automatic Firebase analytics is disabled; a later analytics integration needs deliberate consent and policy configuration.

The www production-domain registration/redirect was repaired through Vercel. Verify it after each domain/deployment change; private previews should remain protected.

## Audit evidence

lunar_admin_audit records administrative access attempts and successful mutations without logging brief text, notes, passwords or session tokens. Mutation success records are committed with the corresponding database change. These records are privileged server-side data, not public API content. Platform logs and alert routing are separate controls and must be configured in the actual hosting accounts.

## Backup and restore

`scripts/backup-encrypted.mjs --output PRIVATE_PATH --key-file PRIVATE_KEY_PATH` runs pg_dump and writes only an AES-256-GCM authenticated encrypted custom-format dump. The key file must contain 64 hex characters and have mode 0600. Keep the key in a separate secured location from the backup. The command refuses to overwrite an existing backup. A compatible pg_dump must be available; remote database TLS is verified.

A disposable restore drill passed: encrypted export, decryption/authentication, restore into a different disposable database, exact synthetic-marker match, and rejection of altered ciphertext. See evidence/security-audit-2026-10-25/backup-restore-drill.json. That is not proof that production backups are scheduled, offsite, retained or restorable.

Before declaring production backup operations active: select an approved retention period and storage destination, schedule the command with protected server credentials, alert on failure, retain independent encryption keys, and perform an actual production-backup restore into an isolated recovery environment. Never restore over production to test recovery. No production database dump was downloaded in this work.

## Data retention

`scripts/retention.mjs --days APPROVED_DAYS` is a count-only dry run. No policy duration is invented by default. Applying it requires BOTH `--apply` and `--confirm-delete-expired`, after an approved policy and verified backup. It deletes expired applications/briefs and application-dependent estimates, and removes expired admin sessions. Legal/contract records and accepted-project obligations must be considered before approving a scope or duration. No production retention deletion has been run or scheduled.

## Verified locally

- 62 JavaScript regression/security tests and 6 Python tests.
- Nine original real PostgreSQL workflow checks on the disposable database.
- Eight additional real PostgreSQL checks: named session access, CSRF denial/acceptance, independent owner budget, direct-header spoofing resistance, role restrictions, logout revocation and audit records.
- Three browser-rendered scenes under the CSP with no policy blocks; synthetic MFA UI flow without password/token storage; Gravity renderer-failure recovery; review-lock race fixed.

See release receipts for later live verification. Do not treat this document itself as deployment evidence.

## Platform references

Trusted Vercel header contract: https://vercel.com/docs/headers/request-headers. Supabase MFA assurance levels and enrollment: https://supabase.com/docs/guides/auth/auth-mfa. These contracts support the implementation; they do not replace actual deployment and owner-device verification.
