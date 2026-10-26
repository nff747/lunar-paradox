# Lunar Paradox public URL and search policy

Canonical hosts configured in the deployment:
- `https://lunarparadox.com` (Root & Studio: applied technology studio, services, interactive 3D WebGL runtime)
- `https://products.lunarparadox.com` (Products: zero-server browser tools and open-source engines)
- `https://labs.lunarparadox.com` (Labs: hydrodynamic research, mechanics and physics telemetry)

There are no `/studio`, `/labs`, or `/products` subpath URLs on `lunarparadox.com`, and no `studio.lunarparadox.com` subdomain. Requests to `/studio` redirect to `/`; requests to `/labs` redirect to `https://labs.lunarparadox.com`; requests to `/products` redirect to `https://products.lunarparadox.com`. Any requests hitting `studio.lunarparadox.com` are permanently redirected to `https://lunarparadox.com`.

`robots.txt` identifies the 3 XML sitemaps:
- `https://lunarparadox.com/sitemap.xml`
- `https://products.lunarparadox.com/sitemap.xml`
- `https://labs.lunarparadox.com/sitemap.xml`

## Search language to use in real page content

- Brand/home: Lunar Paradox; applied technology studio; interactive technology; WebGL experiences.
- Studio: product engineering; AI systems; interactive 3D; creative technology; commissioned digital experiences.
- Labs (future public collection): use the actual published experiment title, problem, method and result. Do not publish speculative categories or synthetic status claims.
- Products (future public collection): use the real product name, audience, function and availability. Do not index empty product cards or hypothetical products.

No `meta keywords` tag is emitted. Google Search does not use that tag for ranking; clear page titles, descriptions, visible headings and useful approved content are the keyword strategy. Social cards have titles/descriptions; no invented preview image is configured.
