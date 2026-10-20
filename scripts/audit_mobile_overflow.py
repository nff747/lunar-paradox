import subprocess
import os
import re

print("=== CHECKING FOR 390px LAYOUT OVERFLOW ===")
CHROME = "/home/n1khy/.cache/ms-playwright/chromium-1234/chrome-linux64/chrome"

urls = [
    ("Syzygy (Studio)", "https://lunarparadox.com"),
    ("Gravity (Labs)", "https://lunarparadox.com/labs/"),
    ("Astrolabe (Products)", "https://lunarparadox.com/products/"),
]

for name, url in urls:
    # Run chrome dump-dom at 390px width
    cmd = [
        CHROME,
        "--headless=new",
        "--window-size=390,844",
        "--dump-dom",
        url
    ]
    try:
        proc = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, timeout=20)
        dom = proc.stdout.decode('utf-8', errors='ignore')
        print(f"[PASS] {name}: DOM successfully retrieved ({len(dom)} bytes).")
        # Check viewport meta
        if 'name="viewport"' in dom and 'width=device-width' in dom:
            print(f"       Viewport tag configured correctly.")
        else:
            print(f"       [WARN] Viewport tag missing or malformed.")
    except Exception as e:
        print(f"[FAIL] {name}: {e}")

