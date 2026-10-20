import urllib.request

assets = [
    "https://lunarparadox.com/assets/moon.jpg",
    "https://lunarparadox.com/assets/moon-relief-4k.png",
    "https://lunarparadox.com/labs/assets/basalt-color-4k.jpg",
    "https://lunarparadox.com/products/assets/basalt-micro-normal.jpg",
]

for url in assets:
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"}, method="HEAD")
    try:
        with urllib.request.urlopen(req) as resp:
            print(f"[PASS] {resp.status} : {resp.headers.get('Content-Length')} bytes : {url}")
    except Exception as e:
        print(f"[FAIL] {url} -> {e}")

