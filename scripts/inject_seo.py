import re

configs = {
    "offline-platforms/lunar-syzygy/index.html": {
        "title": "Lunar Paradox — Syzygy",
        "canonical": "https://lunarparadox.com/",
        "description": "Applied technology laboratory and product studio exploring AI, computing, interactive systems, real-time 3D, and spatial design.",
        "og_title": "Lunar Paradox — Applied Technology Studio & Lab",
        "url": "https://lunarparadox.com/"
    },
    "offline-platforms/lunar-gravity/index.html": {
        "title": "Lunar Paradox — Gravity Anomaly",
        "canonical": "https://labs.lunarparadox.com/",
        "description": "Lunar Paradox Labs: Suspended hydrodynamic mercury chasm and inverted gravitational potential exploration.",
        "og_title": "Lunar Paradox Labs — Gravity Anomaly",
        "url": "https://labs.lunarparadox.com/"
    },
    "offline-platforms/lunar-astrolabe/index.html": {
        "title": "LUNAR PARADOX — The Ouroboros Astrolabe",
        "canonical": "https://products.lunarparadox.com/",
        "description": "Lunar Paradox Products: Celestial armillary geometry, precision instrumentation, and volumetric extinction optics.",
        "og_title": "Lunar Paradox Products — Ouroboros Astrolabe",
        "url": "https://products.lunarparadox.com/"
    }
}

for path, cfg in configs.items():
    with open(path, "r", errors="ignore") as f:
        html = f.read()
    
    # Check if already injected
    if 'name="description"' in html:
        print(f"Skipping {path}, already has description")
        continue
        
    seo_tags = f"""<meta name="description" content="{cfg['description']}">
<link rel="canonical" href="{cfg['canonical']}">
<meta name="robots" content="index, follow">
<meta property="og:type" content="website">
<meta property="og:title" content="{cfg['og_title']}">
<meta property="og:description" content="{cfg['description']}">
<meta property="og:url" content="{cfg['url']}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="{cfg['og_title']}">
<meta name="twitter:description" content="{cfg['description']}">"""

    # Inject right after <title>...</title>
    pattern = re.compile(r'(<title>[^<]*</title>)', re.IGNORECASE)
    if pattern.search(html):
        html = pattern.sub(r'\1\n' + seo_tags, html, count=1)
        with open(path, "w") as f:
            f.write(html)
        print(f"Injected SEO into {path}")
    else:
        print(f"Could not find title tag in {path}")
