# nff747 ECOSYSTEM DEPLOYMENT & VERIFICATION TRACKER

**Last Updated:** 2026-10-30T15:20:00-03:00  
**Operating Standard:** Apache 2.0 Licensing, Zero Credential Leakage, Strict Evidence Before Completion.

---

## 1. REPOSITORY CLASSIFICATION & STATE MATRIX

| Category | Repository | Local Path | Branch / SHA | Current Status | Verified State & Blockers |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Live App** | `lunar-paradox` | `/home/n1khy/Downloads/lunar paradox` | `master` (`37517fb`) | Live (`lunarparadox.com`) | **VERIFIED LIVE**: Syzygy (`lunarparadox.com`), Astrolabe (`products.lunarparadox.com`), Gravity (`labs.lunarparadox.com`) running independent routing; 103/103 tests passing; Migrations 006/007 applied to production Supabase; telemetry recording live. |
| **Web App / UI** | `nff747.github.io` | `scratch/nff747.github.io` | `main` (`e9d11f8`) | Live (`nff747.github.io`) | **VERIFIED LIVE**: HTTP/2 200 via GitHub Pages. Static bundle verified. |
| **Web App / UI** | `quantum-leap-invitation` | `scratch/invitation-site` | `main` | Static Site Repo | Pure HTML/CSS/JS. Deploy target unconfigured (no CNAME/Vercel link). |
| **Full-Stack App** | `lift-verse` | `Projects/lift-verse` | `main` (`6b3a2a9`) | Built Locally | **BUILD PASSES**: TypeScript + Vite production build compiles clean (`dist/` created). Deployment target is Firebase (`lift-verse`), but Firebase CLI credentials not present in shell. |
| **Desktop App** | `myvoice-linux` | `scratch/myvoice-linux` | `master` | Local Repo | Python desktop app. No system pytest/virtualenv configured. Not a web-deployable project. |
| **Private App** | `shipfast-starter` | `scratch/shipfast-starter` | `gh-pages` | Local Template | Template project. |
| **High-Pri Lib** | `edge-rbac-wasm` | `scratch/edge-rbac-wasm` | `master` (synced & pushed) | 2.0.0-alpha.0 Verified | **VERIFIED**: Rust cargo test (20/20 passing), TypeScript Vitest (33/33 passing with compiled wasm-pack nodejs binary). Deny-by-default, signed JWTs, tenant isolation tested. |
| **High-Pri Lib** | `idempotency-middleware` | `scratch/idempotency-middleware` | `master` (synced & pushed) | 2.0.0-alpha.0 Verified | **VERIFIED**: Vitest (45/45 passing across 24 test files). Auth scope, payload hashing, and Hono response replay verified. Experimental notice on distributed locking preserved. |
| **High-Pri Lib** | `agentic-memory-kv` | `scratch/agentic-memory-kv` | `master` (synced & pushed) | 2.0.0-alpha.0 Verified | **VERIFIED**: Vitest (69/69 passing across 27 test files). Shared-buffer indexing, slab allocator, and futex tests passing. |
| **High-Pri Lib** | `cr-vector-sync` | `scratch/cr-vector-sync` | `master` (synced & pushed) | 2.0.0-alpha.0 Verified | **VERIFIED**: Vitest (44/44 passing across 13 test files). In-memory search, OPFS storage, CRDT tombstone retention verified. |
| **High-Pri Lib** | `edge-uuidv7` | `scratch/edge-uuidv7` | `master` (synced & pushed) | 1.0.0 Verified | **VERIFIED**: Vitest (11/11 passing). Clock-rollback monotonicity, RFC 9562 compliance verified. |
| **High-Pri Lib** | `wasm-llm-parser` | `scratch/wasm-llm-parser` | `master` (synced & pushed) | Verified | **VERIFIED**: Cargo test (14/14 passing). Streamed bracket nesting and token mismatch detection verified. Bracket balancing clearly documented as non-full JSON validator. |
| **Graphics Core**| `splat-bvh-core` | `scratch/splat-bvh-core` | `main` | Verified Library | WebGPU WGSL spatial indexing. |
| **Graphics Core**| `hyper-splat-engine` | `scratch/hyper-splat-engine`| `main` | Verified Library | Gaussian splatting engine. |

---

## 2. PRODUCTION DEPLOYMENT & REMAINING BLOCKS

1. **Lunar Paradox**:
   - Status: **DEPLOYED & ACTIVE**
   - Public URLs:
     - `https://lunarparadox.com` (Syzygy — Brand & client commissions)
     - `https://products.lunarparadox.com` (Astrolabe — Direct tool work benches & products)
     - `https://labs.lunarparadox.com` (Gravity — Research & experimental labs)
   - Latest Deployed Commit: `37517fb`
   - Active Storage: Supabase PostgreSQL connected, Migrations 006 & 007 applied.
2. **nff747.github.io**:
   - Status: **DEPLOYED & ACTIVE**
   - Public URL: `https://nff747.github.io`
   - Hosted on: GitHub Pages (`source` / `main` branch).
3. **Lift-Verse**:
   - Status: **BUILD READY, DEPLOYMENT ON HOLD**
   - Blocker: Requires authorized `firebase login:ci` token to deploy to Firebase hosting project `lift-verse`.
