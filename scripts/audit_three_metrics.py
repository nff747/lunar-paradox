import urllib.request
import re
import os

print("=== AUDITING THREE.JS ASSETS & DISPOSAL HYGIENE ===")

platforms = [
    ("Syzygy (Studio)", "offline-platforms/lunar-syzygy"),
    ("Gravity (Labs)", "offline-platforms/lunar-gravity"),
    ("Astrolabe (Products)", "offline-platforms/lunar-astrolabe"),
]

for name, base_path in platforms:
    print(f"\n--- Platform: {name} ---")
    js_files = [os.path.join(r, f) for r, _, fs in os.walk(base_path) for f in fs if f.endswith('.js')]
    disposals = 0
    render_calls = 0
    textures = 0
    geometries = 0
    materials = 0

    for jf in js_files:
        with open(jf, 'r', encoding='utf-8', errors='ignore') as f:
            code = f.read()
            disposals += len(re.findall(r'\.dispose\(\)', code))
            render_calls += len(re.findall(r'\.render\(', code))
            textures += len(re.findall(r'TextureLoader|THREE\.Texture', code))
            geometries += len(re.findall(r'Geometry\(', code))
            materials += len(re.findall(r'Material\(', code))

    print(f"Total JS Files Analyzed: {len(js_files)}")
    print(f"Allocations -> Geometries: {geometries}, Materials: {materials}, Texture Loaders: {textures}")
    print(f"Lifecycle -> Render loops: {render_calls}, Explicit .dispose() calls: {disposals}")

print("\n=== AUDITING ASSET HTTP CODES (TEXTURES & AUDIO) ===")
critical_assets = [
    "https://lunarparadox.com/textures/moon_1024.jpg",
    "https://lunarparadox.com/labs/textures/earth_atmos_2048.jpg",
    "https://lunarparadox.com/products/textures/astrolabe_gold.jpg",
]

for asset in critical_assets:
    req = urllib.request.Request(asset, headers={"User-Agent": "Mozilla/5.0"}, method="HEAD")
    try:
        with urllib.request.urlopen(req) as resp:
            print(f"[PASS] {resp.status} : {asset}")
    except Exception as e:
        print(f"[CHECK] {asset} -> {e}")

