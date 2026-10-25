# Lunar Paradox — live-site follow-up

25 October 2026. The request spelled lunarparadox.xom; this check used the established owner domain lunarparadox.com and its Labs/Products subdomains. Read-only GET/HEAD requests and ordinary desktop Chromium page loads only. No forms submitted, owner keys used, data changed, load attacks or deployment.

## Confirmed live problems

### 1. www hostname sends visitors to Vercel authentication

Both HEAD and GET to https://www.lunarparadox.com/ returned HTTP 302 to https://vercel.com/sso-api, rather than redirecting to https://lunarparadox.com/. This is a public availability/deployment configuration problem, not proof of unauthorized data access.

Priority: fix before sending links to visitors. Verify the www hostname is attached to the intended public production project/deployment, correct any deployment-protection mismatch, then require a single permanent redirect to the apex. Do not disable protection on private preview deployments. Acceptance: an anonymous fresh session reaches the public apex with no Vercel login.

### 2. Labs/Products canonicals disagree with their actual navigation origins

The rendered Labs page sets canonical to https://lunarparadox.com/labs; Products sets it to https://lunarparadox.com/products. Primary navigation sends visitors to https://labs.lunarparadox.com/ and https://products.lunarparadox.com/ instead. Both pages currently have noindex,follow, reducing the immediate indexing effect. This is a canonical-URL consistency defect, not a security exploit.

Choose the established independent subdomain roots as canonical destinations and consistently redirect duplicate landing aliases. Verify static metadata and metadata after client navigation. Retain noindex until real approved content is ready.

### 3. No Content Security Policy

Confirmed again on live pages. HSTS, X-Content-Type-Options: nosniff and X-Frame-Options: SAMEORIGIN are present. Introduce Report-Only CSP, then enforce a policy tested with the actual Three.js/import-map/worker pipeline. This repeats LP-07 from the security report; it is not an additional distinct vulnerability.

## Live checks that passed

- All three domains returned HTTP 200 and rendered the correct actual WebGL scenes: Syzygy at the apex, Gravity at Labs and Astrolabe at Products. Final screenshots were visually inspected.
- The earlier subdomain root-shadowing problem was not reproduced in these current public browser checks.
- No page exceptions, same-site failed HTTP resources or horizontal overflow were recorded in the sampled 1440×900 desktop view.
- A six-second early sample caught incomplete subdomain rendering; the final check waited for each scene's debug API and a further five-second settle. Early blank screenshots were replaced with fully rendered screenshots. These runs are not calibrated performance benchmarks or proof of sustained FPS.
- Navigation points LABS and PRODUCTS to their proper independent subdomains, and STUDIO to /studio.
- Main home and /studio have correct page-specific titles, apex canonicals and index,follow directives.
- /robots.txt and /sitemap.xml returned 200. Sitemap lists the home and Studio URLs only.
- HTTP apex redirects to HTTPS. /index.html redirects to /. /gravity redirects to /labs; /astrolabe redirects to /products. Subdomain /labs and /products aliases redirect to their corresponding roots.
- Sampled sensitive paths returned 404: /.env, /.env.local, /.git/config, /package.json, /.lunar-data/production-owner.key and /offline-platforms/.lunar-data/sessions.sqlite3. No sensitive-file signature was detected in those responses. This bounded path sample is not proof that every possible deployment file is protected.
- Unknown API and page URLs returned 404.
- The preceding public owner checks returned 401 for /api/applications, /api/pricing, /api/publisher and /api/briefs; all three /api/health endpoints returned 200. No authentication bypass of the public admin API was demonstrated.

## Evidence

- live-site-checks.json — bounded HTTP/header, redirect, SEO and exposed-file probes. Transient Vercel SSO parameters omitted.
- live-browser.json — final browser run and scene identities. sampleElapsedMs includes a mandatory 5-second settle and must not be presented as time-to-first-frame.
- live-syzygy.png, live-gravity.png, live-astrolabe.png — final public screenshots.
- tools/pentest-public-readonly.py and tools/pentest-public-browser.mjs — repeatable checks, no writes or authentication.

Existing LP-01 through LP-06 findings retain their original scope: local launcher, isolated-handler proofs or design risks. Do not relabel them as demonstrated live Internet exploits. No fixes were applied during this follow-up.
