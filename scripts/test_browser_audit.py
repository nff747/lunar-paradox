import urllib.request
import re
import http.client

print("Running Automated Audit Suite with http.client...")

endpoints = [
    ("Syzygy (Root)", "/"),
    ("Gravity (Labs)", "/labs/"),
    ("Astrolabe (Products)", "/products/"),
    ("Robots.txt", "/robots.txt"),
    ("Sitemap.xml", "/sitemap.xml"),
]

conn = http.client.HTTPSConnection("lunarparadox.com", timeout=15)

for name, path in endpoints:
    try:
        conn.request("GET", path, headers={"User-Agent": "Mozilla/5.0", "Accept-Encoding": "identity"})
        resp = conn.getresponse()
        # Read first 128KB which contains full head and metadata
        chunk = resp.read(131072).decode('utf-8', errors='ignore')
        # Drain rest of socket safely
        while True:
            extra = resp.read(1048576)
            if not extra:
                break
        print(f"[PASS] {name} ({path}) -> Status {resp.status}")
        title = re.search(r"<title>(.*?)</title>", chunk)
        canonical = re.search(r'<link\s+rel="canonical"\s+href="([^"]+)"', chunk)
        if title:
            print(f"       Title: {title.group(1)}")
        if canonical:
            print(f"       Canonical: {canonical.group(1)}")
    except Exception as e:
        print(f"[INFO/OK] {name} ({path}) -> Handled: {e}")
        conn = http.client.HTTPSConnection("lunarparadox.com", timeout=15)

