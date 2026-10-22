# Lunar Paradox public URL and search policy

Canonical host configured in the deployment: `https://lunarparadox.com`.
Canonical public pages for this release: `/` (brand/home) and `/studio` (services and commissioning context). Both use self-canonical URLs and are listed in `sitemap.xml`.

`/labs` and `/products` remain reachable canonical platform routes, but are `noindex,follow` and excluded from the sitemap while their published experiment and product collections are empty. Remove `noindex` and add a page to the sitemap only when it contains approved, useful, genuinely published content. Drafts, application review, estimates and local publisher routes must stay out of search results. Search Console ownership, DNS, public deployment, crawl discovery and indexing are not yet verified.

`robots.txt` identifies the sitemap and keeps source/offline workspace paths out of crawling. It is not used as a substitute for canonicalization. Permanent redirects consolidate `www`, the configured Labs/Studio/Products subdomains, `/index.html`, `/studio.html`, `/gravity` and `/astrolabe` onto their chosen URLs. Hash fragments are not sitemap URLs; main company navigation uses clean canonical paths.

## Search language to use in real page content

- Brand/home: Lunar Paradox; applied technology studio; interactive technology; WebGL experiences.
- Studio: product engineering; AI systems; interactive 3D; creative technology; commissioned digital experiences.
- Labs (future public collection): use the actual published experiment title, problem, method and result. Do not publish speculative categories or synthetic status claims.
- Products (future public collection): use the real product name, audience, function and availability. Do not index empty product cards or hypothetical products.

No `meta keywords` tag is emitted. Google Search does not use that tag for ranking; clear page titles, descriptions, visible headings and useful approved content are the keyword strategy. Social cards have titles/descriptions; no invented preview image is configured.
