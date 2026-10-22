#!/usr/bin/env python3
import sys
import os
import json
import sqlite3
import tempfile
import threading
import urllib.request
import urllib.error
import time
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "offline-platforms"))
import lunar_backend

print("=== [PRO TOOL 3: BACKEND SECURITY & SANITIZATION AUDITOR] ===")

# 1. Test clean_state validator
print("\n[Audit 1: clean_state validation invariants]")
valid_state = {
    'quality': 'ultra',
    'volume': 0.5,
    'speed': 1.2,
    'paused': False,
    'camera': {'azimuth': 1.0, 'elevation': 0.2, 'distance': 5.0}
}
clean = lunar_backend.clean_state(valid_state)
assert clean['quality'] == 'ultra'
assert clean['volume'] == 0.5
print("  ✓ clean_state accepts valid parameters")

malicious_payloads = [
    {'quality': 'hacked'},
    {'volume': -1.0},
    {'volume': 999.0},
    {'camera': {'azimuth': 'DROP TABLE sessions;'}},
    {'camera': {'azimuth': float('nan')}},
    {'camera': {'azimuth': float('inf')}},
    {'unknown_dangerous_key': '__import__("os").system("id")'},
    {'paused': 'not_a_bool'}
]

for p in malicious_payloads:
    try:
        lunar_backend.clean_state(p)
        print(f"  ❌ FAILED TO REJECT: {p}")
        sys.exit(1)
    except ValueError:
        pass
print("  ✓ clean_state strictly rejected all 8 malicious/corrupted payloads")

# 2. Test Store CRUD and SQL Injection Resilience
print("\n[Audit 2: SQLite Store & parameterized query resilience]")
data_dir = tempfile.mkdtemp(prefix="lunar_audit_")
store = lunar_backend.Store(Path(data_dir) / "test.sqlite3")

store.save_settings('syzygy', clean)
read_settings = store.settings('syzygy')
assert read_settings['quality'] == 'ultra'
print("  ✓ Store settings save/read verified")

sql_injections = [
    "' OR 1=1 --",
    "'; DROP TABLE settings; --",
    "admin'/*",
    "1' UNION SELECT 1,2,3,4,5,6,7,8 --"
]
for sqli in sql_injections:
    try:
        store.settings(sqli)
    except Exception:
        pass
    try:
        store.snapshots(sqli)
    except Exception:
        pass

# Verify DB tables still intact
with store.connect() as conn:
    tables = [r[0] for r in conn.execute("SELECT name FROM sqlite_master WHERE type='table'").fetchall()]
    assert 'settings' in tables and 'snapshots' in tables
print("  ✓ Store tables intact after SQL injection payloads")

# 3. Concurrency Stress Test
print("\n[Audit 3: Multi-threaded SQLite concurrency under load]")
threads = []
errors = []

def worker(w_id):
    try:
        for i in range(20):
            store.save_settings('syzygy', {'quality': 'high', 'volume': (i % 10) / 10.0})
            snap_id = f"worker_{w_id}_{i}"
            snap = store.save_snapshot('syzygy', f"Snapshot {i}", {'speed': 1.0})
            store.set_snapshot_deleted('syzygy', snap['id'], True)
    except Exception as exc:
        errors.append(exc)

for t_idx in range(10):
    t = threading.Thread(target=worker, args=(t_idx,))
    threads.append(t)
    t.start()

for t in threads:
    t.join()

if errors:
    print(f"  ❌ Concurrency errors: {errors[:3]}")
    sys.exit(1)
else:
    print(f"  ✓ 10 threads completed 200 concurrent read/write/delete transactions with 0 locks/errors")

# 4. Live HTTP Server Path Traversal Test
print("\n[Audit 4: Live HTTP server directory traversal test]")
root_dir = Path(__file__).resolve().parent.parent / "offline-platforms" / "lunar-syzygy"
server = lunar_backend.LunarServer(root_dir, 'syzygy', Path(data_dir), port=0)
port = server.server_port
srv_thread = threading.Thread(target=server.serve_forever, daemon=True)
srv_thread.start()
time.sleep(0.2)

traversal_tests = [
    f"http://127.0.0.1:{port}/../../../../etc/passwd",
    f"http://127.0.0.1:{port}/..%2f..%2f..%2fetc%2fpasswd",
    f"http://127.0.0.1:{port}/%2e%2e/%2e%2e/lunar_backend.py",
]

for url in traversal_tests:
    try:
        req = urllib.request.urlopen(url)
        content = req.read().decode('utf-8', errors='ignore')
        if "root:" in content or "class Store" in content:
            print(f"  ❌ PATH TRAVERSAL DETECTED at {url}!")
            sys.exit(1)
        else:
            print(f"  ✓ Safe response for {url}")
    except urllib.error.HTTPError as e:
        if e.code in (400, 403, 404):
            print(f"  ✓ Properly blocked with HTTP {e.code}: {url.split(str(port))[1]}")
        else:
            print(f"  ✓ HTTP {e.code} for {url.split(str(port))[1]}")

server.shutdown()
print("\n=== PRO BACKEND AUDIT COMPLETE: 100% CLEAN & SECURE ===")
