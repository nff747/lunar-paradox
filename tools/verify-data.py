"""Verify custody against the private baseline without printing user data."""
from pathlib import Path
import hashlib
import json
import sqlite3

ROOT = Path(__file__).resolve().parents[1]
receipts = sorted((ROOT / 'evidence' / 'F001').glob('baseline-*.json'))
receipt = json.loads(receipts[-1].read_text())
backup = Path(receipt['privateBackup']) / 'runtime'
live = ROOT / 'offline-platforms' / '.lunar-data'


def logical_digest(filename):
    with sqlite3.connect(f'file:{filename}?mode=ro', uri=True) as db:
        assert db.execute('pragma integrity_check').fetchone()[0] == 'ok'
        tables = [row[0] for row in db.execute("select name from sqlite_master where type='table' order by name")]
        digest = hashlib.sha256()
        for table in tables:
            # Names originate from the owned SQLite schema; quote identifiers.
            quoted = '"' + table.replace('"', '""') + '"'
            rows = sorted(repr(row) for row in db.execute('select * from ' + quoted))
            digest.update(table.encode())
            for row in rows:
                digest.update(row.encode())
        return digest.hexdigest()


results = []
for saved in backup.iterdir():
    current = live / saved.name
    if saved.suffix == '.sqlite3':
        match = logical_digest(saved) == logical_digest(current)
    else:
        match = saved.read_bytes() == current.read_bytes()
    results.append({'filename': saved.name, 'baselineMatchesCurrent': match})
output = {'scope': 'Private backup integrity and current logical record/key preservation; no user records or secret hashes disclosed', 'results': results}
destination = ROOT / 'evidence' / 'F003'
destination.mkdir(parents=True, exist_ok=True)
(destination / 'data-preservation.json').write_text(json.dumps(output, indent=2) + '\n')
print(json.dumps(output, indent=2))
assert all(item['baselineMatchesCurrent'] for item in results), 'Runtime data changed; investigate without overwriting newer records.'
