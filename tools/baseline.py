"""Record source custody and preserve local data without exposing its contents."""
from pathlib import Path
from datetime import datetime, timezone
import hashlib
import json
import os
import shutil
import sqlite3
import subprocess

ROOT = Path(__file__).resolve().parents[1]
STAMP = datetime.now(timezone.utc).strftime('%Y%m%dT%H%M%SZ')
PRIVATE = ROOT / '.local-backups' / STAMP
PRIVATE.mkdir(parents=True, mode=0o700)
PRIVATE.parent.chmod(0o700)
source_files = [ROOT / 'index.html', ROOT / 'company.js', ROOT / 'vercel.json']
for scene in ('syzygy', 'gravity', 'astrolabe'):
    folder = ROOT / 'offline-platforms' / f'lunar-{scene}'
    source_files.extend(p for p in folder.iterdir() if p.is_file() and p.suffix in ('.html', '.js', '.css', '.json'))
manifest = {}
for original in source_files:
    relative = original.relative_to(ROOT)
    saved = PRIVATE / 'source' / relative
    saved.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(original, saved)
    saved.chmod(0o600)
    manifest[str(relative)] = hashlib.sha256(original.read_bytes()).hexdigest()
data = ROOT / 'offline-platforms' / '.lunar-data'
preserved = []
if data.exists():
    for original in data.iterdir():
        if not original.is_file() or original.name.endswith(('-wal', '-shm')):
            continue
        saved = PRIVATE / 'runtime' / original.name
        saved.parent.mkdir(mode=0o700, parents=True, exist_ok=True)
        if original.suffix == '.sqlite3':
            with sqlite3.connect(f'file:{original}?mode=ro', uri=True) as src, sqlite3.connect(saved) as dst:
                src.backup(dst)
                assert dst.execute('pragma integrity_check').fetchone()[0] == 'ok'
        else:
            shutil.copy2(original, saved)
        saved.chmod(0o600)
        preserved.append(original.name)
receipt = {
    'recordedAtUTC': STAMP,
    'root': str(ROOT),
    'commit': subprocess.check_output(['git', 'rev-parse', 'HEAD'], cwd=ROOT, text=True).strip(),
    'status': subprocess.check_output(['git', 'status', '--short'], cwd=ROOT, text=True).splitlines(),
    'sourceHashes': manifest,
    'privateBackup': str(PRIVATE),
    'preservedRuntimeFilenames': preserved,
    'limits': 'No secret values or user records are included in this receipt. Existing archives preserved unchanged.'
}
evidence = ROOT / 'evidence' / 'F001'
evidence.mkdir(parents=True, exist_ok=True)
(evidence / f'baseline-{STAMP}.json').write_text(json.dumps(receipt, indent=2) + '\n')
print(json.dumps({'sourceFilesPreserved': len(manifest), 'runtimeFilesPreserved': len(preserved), 'receipt': str(evidence / f'baseline-{STAMP}.json')}, indent=2))
