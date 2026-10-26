# Engineering Case Study: Pure Subdomain & Sovereign Zero-Server Architecture

> **Studio Showcase & Technical Retrospective**  
> **Author**: Lunar Paradox Core Engineering  
> **Date**: 26 October 2026  
> **Target Displays**: `studio.lunarparadox.com`, Public Case Studies, Technical Manifesto

---

## Executive Summary

Lunar Paradox transitioned its multi-surface web platform from a nested single-page application (SPA) hash-router into a **Pure Subdomain & Sovereign Zero-Server Architecture**. 

This migration eliminated routing redundancies ("URL stutter" such as `products.lunarparadox.com/#/products`), flattened complex tool hierarchies (`/tools/pbr-synth` → `/pbr-synth`), established clean edge redirects, and adopted a **"Zero-Server Sovereign"** product philosophy that avoids commercial `/free` URL pollution while highlighting 100% on-device compute.

```
                    ┌──────────────────────────────┐
                    │      lunarparadox.com        │
                    │   Flagship Syzygy Rift Core   │
                    └──────────────┬───────────────┘
                                   │
         ┌─────────────────────────┼─────────────────────────┐
         ▼                         ▼                         ▼
┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐
│ products.       │       │ labs.           │       │ studio.         │
│ lunarparadox.com│       │ lunarparadox.com│       │ lunarparadox.com│
│ Pure Root /     │       │ Pure Root /     │       │ Pure Root /     │
│ (Zero-Server)   │       │ (Prototypes)    │       │ (Commissions)   │
└────────┬────────┘       └─────────────────┘       └─────────────────┘
         │ Direct Edge Routes
         ├─► /pbr-synth
         ├─► /optim-compressor
         ├─► /resonance-dsp
         └─► /cipher-workbench
```

---

## 1. The Problems We Solved

### A. The "URL Stutter" & Hash Clutter Problem
* **The Symptom**: Visiting `https://products.lunarparadox.com` would either rewrite or append `/#/products` to the address bar, or lead to URLs like `products.lunarparadox.com/products`.
* **The Root Cause**: Legacy SPA routers blindly assumed a single global origin where sub-views required path or hash demarcations (`#/<catalogue>`). When mapped to dedicated subdomains, the naming duplicated: `products.` + `/products`.
* **The Impact**: Degraded user trust. It felt like an unpolished SPA hack wrapped in an iframe or redirect loop, rather than a bespoke digital instrument.

### B. The Buried Tool Hierarchy
* **The Symptom**: Specialized software was hidden three levels deep: `https://products.lunarparadox.com/tools/pbr-synth`.
* **The Conflict**: It created ambiguity. *Are these mini-tools, accessories, or standalone software products?*
* **The Impact**: Friction when sharing software links, reduced organic visibility, and unnecessary mental load for engineers and artists wanting to quickly launch an instrument.

### C. The Commercial `/free` Trap
* **The Dilemma**: Many software platforms organize unmonetized tools under paths like `/free` or `/free/<product-name>`.
* **The Problem**: 
  1. **Brand Degradation**: In high-end creative, procedural, and scientific software, `/free` cheapens perception, invoking images of ad-supported freeware or stripped-down demos.
  2. **Pricing Lock-in**: Baking monetization tiers into routing creates catastrophic legacy redirects if a desktop build, commercial license, or enterprise binary is ever released.
  3. **Misleading Framing**: It misrepresents the innovation. The tools aren't just "free of charge"—they are **free of servers**, running with zero data telemetry, zero cloud tracking, and zero latency.

### D. Stale Edge Deployments & Desyncs
* **The Symptom**: Multiple concurrent preview and staging deployments on Vercel created edge routing collisions where DNS aliases pointed to outdated builds.
* **The Impact**: Inconsistent client state, cache poisoning, and unpredictable edge header resolution.

---

## 2. The Architectural Solution

### 1. Pure Subdomain Root Resolution
Subdomains now function as their own autonomous surface roots:
- `products.lunarparadox.com` → Renders the complete catalogue immediately at `/`. No hash fragment (`#`) or pathname suffix is added.
- `labs.lunarparadox.com` → Renders the experimental research catalogue cleanly at `/`.
- `studio.lunarparadox.com` → Renders the studio overview and commission portal at `/` via edge rewrites to `studio.html`.
- `lunarparadox.com` → Renders the central Syzygy 3D real-time fracture simulation.

### 2. Edge-Level Canonical Redirect Matrix
To permanently eliminate path clutter, Vercel edge configuration (`vercel.json`) enforces instant `308 Permanent Redirects` back to the root:
```json
{
  "has": [{ "type": "host", "value": "products.lunarparadox.com" }],
  "source": "/products/:path*",
  "destination": "/:path*",
  "permanent": true
}
```
Any visit to `products.lunarparadox.com/products` or `labs.lunarparadox.com/labs` is immediately cleaned before hitting client scripts.

### 3. Flattened, Direct Tool Routing
Each tool is elevated to a first-class product path directly off the subdomain:
* `https://products.lunarparadox.com/pbr-synth` — Procedural PBR texture synthesizer (Three.js, ORM packing, bilateral normal filter).
* `https://products.lunarparadox.com/optim-compressor` — Visual perceptual image compression (Structural Similarity Index Measure / SSIM, dual loupe).
* `https://products.lunarparadox.com/resonance-dsp` — Zero-latency stereophonic audio synthesizer (Haas widener, hard-knee limiter).
* `https://products.lunarparadox.com/cipher-workbench` — Sovereign client-side cryptographic matrix (WebCrypto, CSPRNG, air-gap CLI exporter).

*(All legacy `/tools/<id>` paths are transparently rewritten for full backward compatibility).*

### 4. "Zero-Server Sovereign" Product Framing
Instead of using `/free`, products are labeled:
> **`Zero-Server · v1.0`**

This communicates:
* **Zero Telemetry**: All computation occurs inside the visitor's browser thread or GPU (WebGPU/WebGL/WebAudio/WebCrypto). No data leaves the device.
* **Zero Infrastructure Cost**: The entire platform scales infinitely with static CDN caching. Server bill = \$0.
* **Air-Gap Capability**: Software works completely offline and unmetered.

### 5. Strict Single-Deployment Hygiene
The CI/CD workflow mandates strictly **1 active production deployment** in Vercel at all times. Older deployments are pruned immediately after atomic DNS aliasing, guaranteeing deterministic CDN edge caches worldwide.

---

## 3. Before vs. After Matrix

| Metric / Attribute | Legacy Architecture | Sovereign Subdomain Architecture |
| :--- | :--- | :--- |
| **Products Entry URL** | `products.lunarparadox.com/#/products` | `products.lunarparadox.com/` |
| **Tool Route Depth** | `.../tools/pbr-synth` (Nested) | `.../pbr-synth` (Direct) |
| **URL Cleanliness** | Duplicate words, hash mutations | Clean, memorable, canonical |
| **Social / OpenGraph Embeds** | Bot crawler confusion on hashes | Edge-served 200 OK HTML metadata |
| **Product Positioning** | Uncategorized utility script | Standalone sovereign instrument |
| **Pricing Nomenclature** | Temptation of `/free` paths | `Zero-Server · v1.0` luxury badge |
| **Deployment State** | 3+ active Vercel instances | Strictly 1 unified production deployment |
| **Server Footprint** | Dynamic API fallback dependencies | 100% Client-side compute, static edge CDN |

---

## 4. Verification & Hardening

* **Test Coverage**: 79 automated tests passing with zero failures (`node --test tests/*.test.mjs`).
* **Security & CSP**: Strict Content Security Policy (`script-src 'self' blob: 'sha256-...'`), `HSTS: max-age=63072000; includeSubDomains; preload`, `X-Content-Type-Options: nosniff`.
* **Zero CDN Leaks**: Zero remote script dependencies or third-party tracking scripts.
* **Edge Latency**: All domain roots resolve in `< 40ms` via Cloudflare/Vercel edge networks.

---

## 5. Copy for Future Studio Display

*When showcasing this milestone on `studio.lunarparadox.com` or in pitch decks, use the following narrative:*

> ### "Engineering Sovereignty: How We Streamlined Lunar Paradox"
> 
> *A web platform shouldn't feel like a tangle of redirects and URL hashes. We dismantled legacy single-page application routing in favor of an uncompromising, pure subdomain architecture.*
> 
> *Every subdomain—from `products.` to `labs.`—now stands as an autonomous, beautifully resolved digital workspace. Our creative instruments are no longer hidden beneath arbitrary `/tools/` or cheapened by `/free` prefixes. They live directly at the surface—as fast, air-gapped, zero-server software that runs entirely within your device's memory.*
> 
> *Zero latency. Zero telemetry. Pure design integrity.*
