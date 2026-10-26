# EDGE DNS & CANONICAL ROUTING SPECIFICATION (P0 BRAND DEFENSE)

## 1. Domain Governance Architecture
To neutralize the orthographic split (double-"r" typo vs single-"r" canonical root) and recover traffic from dead endpoints:

```
[ User / Crawler / Scraper ]
           │
           ├──► lunarparradox.com (Typo Root) ──────────┐
           ├──► *.lunarparradox.com (Typo Subdomains) ──┤
           │                                            ▼
           │                                 [ Edge Cloudflare / DNS ]
           │                                 HTTP 301 Permanent Redirect
           │                                 (Path & Query Preserving, HSTS)
           │                                            │
           ▼                                            ▼
[ lunarparadox.com (Canonical Root & Studio) ] ◄─────────────────┘
     │
     ├──► labs.lunarparadox.com    ──► maps to offline-platforms/lunar-gravity (Labs)
     └──► products.lunarparadox.com ──► maps to offline-platforms/lunar-astrolabe (Products & Tools)
```

## 2. Cloudflare Page Rule / Redirect Worker (Cost: $0 / Free Tier)
Deploy a serverless edge redirect rule for `*lunarparradox.com/*`:
- **Status:** 301 Moved Permanently
- **Destination:** `https://lunarparadox.com/$2`
- **Security Headers:**
  - `Strict-Transport-Security: max-age=31536000; includeSubDomains; preload`
  - `X-Content-Type-Options: nosniff`
  - `X-Frame-Options: SAMEORIGIN`

## 3. Host Mapping to Existing Codebase
- **`lunarparadox.com`:** Serves the cohesive fracture WebGL studio build & services (`offline-platforms/lunar-syzygy/`).
- **`labs.lunarparadox.com`:** Serves the hydrodynamic inverted mercury lab (`offline-platforms/lunar-gravity/`).
- **`products.lunarparadox.com`:** Serves celestial mechanics, products, and zero-server tools (`offline-platforms/lunar-astrolabe/`).
