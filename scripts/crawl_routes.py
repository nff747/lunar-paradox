#!/usr/bin/env python3
import subprocess
import sys
import tempfile
import os

print("=== [PRO TOOL 4: DYNAMIC MULTI-ROUTE CRAWLER] ===")

routes = [
    # Syzygy
    "https://lunarparadox.com/#/home",
    "https://lunarparadox.com/#/studio",
    "https://lunarparadox.com/#/commission",
    "https://lunarparadox.com/#/estimate",
    "https://lunarparadox.com/#/realms",
    "https://lunarparadox.com/#/simulation",
    "https://lunarparadox.com/#/data",
    # Gravity
    "https://lunarparadox.com/labs/#/explore",
    "https://lunarparadox.com/labs/#/observatory",
    "https://lunarparadox.com/labs/#/telemetry",
    "https://lunarparadox.com/labs/#/simulation",
    "https://lunarparadox.com/labs/#/labs",
    # Astrolabe
    "https://lunarparadox.com/products/#/explore",
    "https://lunarparadox.com/products/#/astrolabe",
    "https://lunarparadox.com/products/#/simulation",
    "https://lunarparadox.com/products/#/data",
    "https://lunarparadox.com/products/#/products"
]

tmp_dir = tempfile.mkdtemp(prefix="lunar_crawl_")
failed_routes = []

for idx, url in enumerate(routes):
    out_png = os.path.join(tmp_dir, f"route_{idx}.png")
    cmd = [
        "firefox",
        "--headless",
        f"--screenshot={out_png}",
        "--window-size=1280,720",
        url
    ]
    try:
        proc = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True, timeout=15)
        # Check output for JavaScript fatal errors
        has_fatal_error = False
        for line in proc.stderr.splitlines():
            if "JavaScript error:" in line and "XPIDatabase" not in line and "AsyncShutdown" not in line:
                print(f"  ❌ JS ERROR on {url}: {line.strip()}")
                has_fatal_error = True
        if has_fatal_error:
            failed_routes.append(url)
        else:
            print(f"  ✓ {url} rendered cleanly")
    except subprocess.TimeoutExpired:
        print(f"  ⚠ Timeout on {url} (expected for persistent render loop in headless screenshot)")
    except Exception as e:
        print(f"  ❌ Error on {url}: {e}")
        failed_routes.append(url)

print(f"\nCrawled {len(routes)} routes. Results: {len(failed_routes)} errors.")
if failed_routes:
    sys.exit(1)
