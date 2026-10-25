#!/usr/bin/env python3
"""Local Lunar Paradox server: private SQLite settings and scene snapshots."""
import argparse
import secrets
import hashlib
import hmac
import tempfile
import re
import os
from contextlib import contextmanager
from datetime import datetime, timezone
import functools
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
import json
import math
from pathlib import Path
import sqlite3
import sys
import threading
import time
from urllib.parse import urlsplit, parse_qs, unquote
import uuid
import webbrowser

SCENES = ('syzygy', 'gravity', 'astrolabe')
DEFAULTS = {'quality': 'ultra', 'volume': .35, 'speed': 1., 'paused': False}
ROUTES = {'syzygy': ('realms', 'mission', 'data', 'simulation'),
          'gravity': ('explore', 'observatory', 'telemetry', 'archive', 'simulation'),
          'astrolabe': ('explore', 'astrolabe', 'simulation', 'data', 'archive')}


def clean_content(value):
    if not isinstance(value, dict) or set(value) != {'revision', 'experiments', 'products', 'contactEmail'}:
        raise ValueError('Expected revision, experiments, products and contactEmail')
    if type(value['revision']) is not int or value['revision'] < 0:
        raise ValueError('Invalid revision')
    email=value['contactEmail']
    if not isinstance(email,str) or len(email)>254 or (email and ('@' not in email or any(c.isspace() for c in email))):
        raise ValueError('Enter a valid contact email or leave it blank')
    result={'revision':value['revision'],'contactEmail':email.strip()}
    for kind in ('experiments','products'):
        entries=value[kind]
        if not isinstance(entries,list) or len(entries)>100:
            raise ValueError('Collection must contain at most 100 records')
        cleaned=[]; identifiers=set()
        limits={'id':80,'title':120,'summary':300,'body':6000,'category':60,'image':500,'actionUrl':500,'actionLabel':60,'stage':40,'status':20}
        for entry in entries:
            if not isinstance(entry,dict) or set(entry)!=set(limits):raise ValueError('Invalid record fields')
            record={}
            for field,limit in limits.items():
                v=entry[field]
                if not isinstance(v,str) or len(v)>limit:raise ValueError('Invalid '+field)
                record[field]=v.strip()
            if not record['id'] or record['id'] in identifiers or not all(c.isalnum() or c in '-_' for c in record['id']):raise ValueError('Record IDs must be unique and URL safe')
            identifiers.add(record['id'])
            if record['status'] not in ('draft','published','archived'):raise ValueError('Unknown publishing status')
            if record['status']=='published' and (not record['title'] or not record['summary'] or not record['body']):raise ValueError('Publishing requires title, summary and content')
            for field in ('image','actionUrl'):
                url=record[field]
                if url and not (url.startswith('https://') and urlsplit(url).netloc and not any(c.isspace() for c in url)):
                    raise ValueError(field+' must be a complete HTTPS URL or blank')
            if bool(record['actionUrl'])!=bool(record['actionLabel']):raise ValueError('An action needs both its label and URL')
            cleaned.append(record)
        result[kind]=cleaned
    return result


def clean_state(value):
    if not isinstance(value, dict):
        raise ValueError('Scene state must be an object')
    clean = {}
    for key, item in value.items():
        if key in ('scene', 'platform'):
            continue
        if key == 'quality':
            if item not in ('ultra', 'high', 'balanced'):
                raise ValueError('Unknown graphics quality')
        elif key == 'route':
            if not isinstance(item, str) or item not in {route for routes in ROUTES.values() for route in routes}:
                raise ValueError('Unknown experience route')
        elif key in ('paused', 'sound'):
            if type(item) is not bool:
                raise ValueError(key + ' must be boolean')
        elif key == 'camera':
            if not isinstance(item, dict) or set(item) != {'azimuth', 'elevation', 'distance'}:
                raise ValueError('Camera requires azimuth, elevation and distance')
            for axis, limits in {'azimuth': (-10000, 10000), 'elevation': (-math.pi / 2, math.pi / 2), 'distance': (.1, 100)}.items():
                number = item[axis]
                if type(number) not in (int, float) or not math.isfinite(number) or not limits[0] <= number <= limits[1]:
                    raise ValueError('Invalid camera ' + axis)
            item = dict(item)
        elif key in ('volume', 'paradox', 'speed', 'timeline', 'phase', 'focusedNode', 'simulationTime', 'dissolve'):
            limits = {'volume': (0, 1), 'paradox': (0, 1), 'speed': (.1, 5), 'timeline': (0, 600), 'phase': (1, 4), 'focusedNode': (0, 6), 'simulationTime': (0, 1e9), 'dissolve': (-2, 2)}
            if type(item) not in (int, float) or not math.isfinite(item) or not limits[key][0] <= item <= limits[key][1]:
                raise ValueError('Invalid ' + key)
            if key in ('phase', 'focusedNode') and item != int(item):
                raise ValueError(key + ' must be a whole number')
        else:
            raise ValueError('Unknown scene field: ' + key)
        clean[key] = item
    return clean


class Store:
    def __init__(self, path):
        self.path = Path(path)
        self.path.parent.mkdir(parents=True, exist_ok=True)
        self.path.parent.chmod(0o700)
        owner_file=self.path.parent/'commission-owner.key'
        if not owner_file.exists():
            fd,temporary=tempfile.mkstemp(prefix='.owner-',dir=self.path.parent)
            try:
                with os.fdopen(fd,'w') as stream:
                    stream.write(secrets.token_urlsafe(32));stream.flush();os.fsync(stream.fileno())
                try:os.link(temporary,owner_file)
                except FileExistsError:pass
            finally:Path(temporary).unlink(missing_ok=True)
        if owner_file.is_symlink() or not owner_file.is_file() or owner_file.stat().st_size>512:
            raise ValueError('Invalid owner key file. Restore or explicitly rotate the private key before starting.')
        owner_file.chmod(0o600)
        self.owner_key=owner_file.read_text().strip()
        if not self.owner_key.isascii() or len(self.owner_key)<32:
            raise ValueError('Invalid owner key file. Restore or explicitly rotate the private key before starting.')
        with self.connect() as db:
            db.execute('CREATE TABLE IF NOT EXISTS company_content (id INTEGER PRIMARY KEY CHECK(id=1), revision INTEGER NOT NULL, document TEXT NOT NULL)')
            db.execute('CREATE TABLE IF NOT EXISTS company_briefs (id TEXT PRIMARY KEY, created TEXT NOT NULL, document TEXT NOT NULL)')
            db.execute('CREATE TABLE IF NOT EXISTS applications (id TEXT PRIMARY KEY, created TEXT NOT NULL, status TEXT NOT NULL, token TEXT NOT NULL, document TEXT NOT NULL, note TEXT NOT NULL)')
            if 'request_hash' not in {row[1] for row in db.execute('PRAGMA table_info(applications)')}:db.execute('ALTER TABLE applications ADD COLUMN request_hash TEXT')
            db.execute('CREATE UNIQUE INDEX IF NOT EXISTS application_requests ON applications(request_hash)')
            db.execute('CREATE TABLE IF NOT EXISTS commissioning_pricing (id INTEGER PRIMARY KEY CHECK(id=1), document TEXT NOT NULL)')
            db.execute('CREATE TABLE IF NOT EXISTS commissioning_estimates (id TEXT PRIMARY KEY, application_id TEXT NOT NULL, document TEXT NOT NULL)')
            db.execute('CREATE TABLE IF NOT EXISTS settings (scene TEXT PRIMARY KEY, state TEXT NOT NULL)')
            db.execute('CREATE TABLE IF NOT EXISTS snapshots (id TEXT PRIMARY KEY, scene TEXT NOT NULL, name TEXT NOT NULL, created TEXT NOT NULL, state TEXT NOT NULL)')
            if 'deleted' not in {row[1] for row in db.execute('PRAGMA table_info(snapshots)')}:
                db.execute('ALTER TABLE snapshots ADD COLUMN deleted INTEGER NOT NULL DEFAULT 0')

        self.path.chmod(0o600)

    def content(self, public=False):
        with self.connect() as db:
            row=db.execute('SELECT revision,document FROM company_content WHERE id=1').fetchone()
        value=json.loads(row[1]) if row else {'revision':0,'experiments':[],'products':[],'contactEmail':''}
        if public:
            for kind in ('experiments','products'):value[kind]=[r for r in value[kind] if r['status']=='published']
        return value

    def save_content(self, value):
        clean=clean_content(value)
        with self.connect() as db:
            db.execute('BEGIN IMMEDIATE')
            row=db.execute('SELECT revision FROM company_content WHERE id=1').fetchone()
            if clean['revision']!=(row[0] if row else 0):raise ValueError('Publisher changed in another tab. Reload before saving.')
            clean['revision']+=1
            db.execute('INSERT INTO company_content VALUES(1,?,?) ON CONFLICT(id) DO UPDATE SET revision=excluded.revision,document=excluded.document',(clean['revision'],json.dumps(clean)))
        return clean

    def briefs(self):
        with self.connect() as db:rows=db.execute('SELECT id,created,document FROM company_briefs ORDER BY created DESC LIMIT 100').fetchall()
        return [{'id':r[0],'created':r[1],**json.loads(r[2])} for r in rows]

    def save_brief(self, value):
        if not isinstance(value,dict) or set(value)!={'name','email','type','goal','timing','budget'}:raise ValueError('Invalid brief fields')
        limits={'name':120,'email':254,'type':30,'goal':6000,'timing':200,'budget':200}
        for field,limit in limits.items():
            if not isinstance(value[field],str) or len(value[field])>limit:raise ValueError('Invalid '+field)
        if not value['name'].strip() or not value['goal'].strip() or '@' not in value['email'] or any(c.isspace() for c in value['email']):raise ValueError('Name, email and project goal are required')
        if value['type'] not in ('commission','collaboration','research'):raise ValueError('Unknown enquiry type')
        identifier=str(uuid.uuid4());created=datetime.now(timezone.utc).isoformat()
        with self.connect() as db:db.execute('INSERT INTO company_briefs VALUES(?,?,?)',(identifier,created,json.dumps(value)))
        return {'id':identifier,'created':created}

    def create_application(self, value, request_token=None):
        fields={'name':120,'email':254,'type':30,'goal':6000,'timing':200,'budget':200}
        if not isinstance(value,dict) or set(value)!=set(fields):raise ValueError('Invalid application fields')
        if any(not isinstance(value[k],str) or len(value[k])>n for k,n in fields.items()):raise ValueError('Application field too long')
        value={k:v.strip() for k,v in value.items()}
        if not value['name'] or not value['goal'] or not re.fullmatch(r'[^\s@]+@[^\s@]+\.[^\s@]+',value['email']):raise ValueError('Name, valid email and project goal are required')
        if value['type'] not in ('commission','collaboration','research'):raise ValueError('Unknown application type')
        if request_token is not None and (not isinstance(request_token,str) or not re.fullmatch(r'[a-zA-Z0-9_-]{32,128}',request_token)):raise ValueError('Invalid submission token')
        request_hash=hashlib.sha256(request_token.encode()).hexdigest() if request_token else None
        token=hmac.new(self.owner_key.encode(),('application-access-v1:'+request_token).encode(),hashlib.sha256).hexdigest() if request_token else secrets.token_urlsafe(32)
        identifier=str(uuid.uuid4());created=datetime.now(timezone.utc).isoformat()
        with self.connect() as db:
            db.execute('BEGIN IMMEDIATE')
            previous=db.execute('SELECT id,created,status,document,token FROM applications WHERE request_hash=?',(request_hash,)).fetchone() if request_hash else None
            if previous:
                if json.loads(previous[3])!=value or previous[4]!=hashlib.sha256(token.encode()).hexdigest():raise ValueError('Submission token already used for another application')
                return {'id':previous[0],'created':previous[1],'status':previous[2],'accessKey':token}
            db.execute('INSERT INTO applications(id,created,status,token,document,note,request_hash) VALUES(?,?,?,?,?,?,?)',(identifier,created,'pending',hashlib.sha256(token.encode()).hexdigest(),json.dumps(value),'',request_hash))
        return {'id':identifier,'accessKey':token,'status':'pending','created':created}

    def application(self, value):
        if not isinstance(value,dict) or not isinstance(value.get('id'),str) or not isinstance(value.get('accessKey'),str):raise PermissionError('Application ID and access key required')
        with self.connect() as db:row=db.execute('SELECT id,created,status,token,document,note FROM applications WHERE id=?',(value['id'],)).fetchone()
        if not row or not secrets.compare_digest(row[3],hashlib.sha256(value['accessKey'].encode()).hexdigest()):raise PermissionError('Application ID or access key is incorrect')
        return {'id':row[0],'created':row[1],'status':row[2],**json.loads(row[4]),'note':row[5]}

    def applications(self):
        with self.connect() as db:rows=db.execute('SELECT id,created,status,document,note FROM applications ORDER BY created DESC LIMIT 200').fetchall()
        return [{'id':r[0],'created':r[1],'status':r[2],**json.loads(r[3]),'note':r[4]} for r in rows]

    def commission_estimates(self):
        with self.connect() as db:rows=db.execute('SELECT document FROM commissioning_estimates ORDER BY rowid DESC LIMIT 200').fetchall()
        return [json.loads(r[0]) for r in rows]

    def review_application(self, value):
        if not isinstance(value,dict) or set(value)!={'id','status','note'} or value['status'] not in ('pending','accepted','declined'):raise ValueError('Invalid application decision')
        if not isinstance(value['id'],str) or not isinstance(value['note'],str) or len(value['note'])>1000:raise ValueError('Invalid application note')
        with self.connect() as db:
            cursor=db.execute('UPDATE applications SET status=?,note=? WHERE id=?',(value['status'],value['note'].strip(),value['id']))
            if not cursor.rowcount:raise ValueError('Application not found')
        return {'saved':True}

    def pricing(self):
        with self.connect() as db:row=db.execute('SELECT document FROM commissioning_pricing WHERE id=1').fetchone()
        return json.loads(row[0]) if row else {'revision':0,'currency':'GBP','items':[]}

    def save_pricing(self, value):
        if not isinstance(value,dict) or set(value)!={'revision','currency','items'} or type(value['revision']) is not int or value['currency'] not in ('GBP','USD','EUR','INR') or not isinstance(value['items'],list) or len(value['items'])>50:raise ValueError('Invalid rate card')
        ids=set()
        for item in value['items']:
            if not isinstance(item,dict) or set(item)!={'id','label','unit','low','high'}:raise ValueError('Invalid rate item')
            if any(not isinstance(item[k],str) or not item[k].strip() or len(item[k])>100 for k in ('id','label','unit')) or not re.fullmatch(r'[-\w]+',item['id']) or item['id'] in ids:raise ValueError('Rate items need unique IDs, labels and units')
            if any(type(item[k]) is not int for k in ('low','high')) or not 0<item['low']<=item['high']<=100000000:raise ValueError('Enter positive price ranges in minor currency units')
            ids.add(item['id'])
        with self.connect() as db:
            db.execute('BEGIN IMMEDIATE');row=db.execute('SELECT document FROM commissioning_pricing WHERE id=1').fetchone();revision=json.loads(row[0])['revision'] if row else 0
            if value['revision']!=revision:raise ValueError('Pricing changed. Reload before saving.')
            value={**value,'revision':revision+1};db.execute('INSERT INTO commissioning_pricing VALUES(1,?) ON CONFLICT(id) DO UPDATE SET document=excluded.document',(json.dumps(value),))
        return value

    def estimate(self, value):
        # Approval and prices are always checked on the server, never trusted from DOM.
        with self.connect() as db:
            db.execute('BEGIN IMMEDIATE')
            app=self.application(value)
            if app['status']!='accepted':raise PermissionError('An accepted application is required before estimating')
            pricing=self.pricing();available={r['id']:r for r in pricing['items']};selection=value.get('selection')
            if not isinstance(selection,list) or not 1<=len(selection)<=50:raise ValueError('Select at least one service')
            lines=[];seen=set()
            for choice in selection:
                if not isinstance(choice,dict) or set(choice)!={'id','quantity'} or not isinstance(choice['id'],str) or choice['id'] not in available or choice['id'] in seen or type(choice['quantity']) is not int or not 1<=choice['quantity']<=100:raise ValueError('Invalid selection or quantity')
                item=available[choice['id']];seen.add(item['id']);q=choice['quantity'];lines.append({**item,'quantity':q,'lowTotal':item['low']*q,'highTotal':item['high']*q})
            result={'id':str(uuid.uuid4()),'created':datetime.now(timezone.utc).isoformat(),'applicationId':app['id'],'pricingRevision':pricing['revision'],'currency':pricing['currency'],'lines':lines,'low':sum(x['lowTotal'] for x in lines),'high':sum(x['highTotal'] for x in lines),'terms':'Indicative estimate only. Scope, availability, third-party costs and applicable taxes require a final written quote. No booking or payment is made.'}
            db.execute('INSERT INTO commissioning_estimates VALUES(?,?,?)',(result['id'],app['id'],json.dumps(result)))
        return result

    @contextmanager
    def connect(self):
        db = sqlite3.connect(self.path, timeout=5)
        try:
            with db:
                yield db
        finally:
            db.close()

    def settings(self, scene):
        with self.connect() as db:
            row = db.execute('SELECT state FROM settings WHERE scene=?', (scene,)).fetchone()
        defaults = {**DEFAULTS, 'speed': 2.3 if scene == 'astrolabe' else 1.}
        return {**defaults, **(json.loads(row[0]) if row else {})}

    def save_settings(self, scene, state):
        patch = clean_state(state)
        if patch.get('route', ROUTES[scene][0]) not in ROUTES[scene]:
            raise ValueError('Route belongs to another platform')
        # Hold SQLite's write reservation across read/merge/write so simultaneous
        # tabs cannot erase each other's independent preference changes.
        with self.connect() as db:
            db.execute('BEGIN IMMEDIATE')
            row = db.execute('SELECT state FROM settings WHERE scene=?', (scene,)).fetchone()
            defaults = {**DEFAULTS, 'speed': 2.3 if scene == 'astrolabe' else 1.}
            current = {**defaults, **(json.loads(row[0]) if row else {}), **patch}
            db.execute('INSERT INTO settings(scene,state) VALUES(?,?) ON CONFLICT(scene) DO UPDATE SET state=excluded.state', (scene, json.dumps(current)))
        return current

    def save_snapshot(self, scene, name, state):
        if not isinstance(name, str) or not 1 <= len(name.strip()) <= 80:
            raise ValueError('Snapshot name must contain 1–80 characters')
        item = {'id': str(uuid.uuid4()), 'scene': scene, 'name': name.strip(), 'created': datetime.now(timezone.utc).isoformat(), 'state': clean_state(state)}
        if item['state'].get('route', ROUTES[scene][0]) not in ROUTES[scene]:
            raise ValueError('Route belongs to another platform')
        with self.connect() as db:
            db.execute('INSERT INTO snapshots(id,scene,name,created,state) VALUES(?,?,?,?,?)', (item['id'], scene, item['name'], item['created'], json.dumps(item['state'])))
        return item

    def snapshots(self, scene):
        with self.connect() as db:
            rows = db.execute('SELECT id,name,created,state FROM snapshots WHERE scene=? AND deleted=0 ORDER BY created DESC LIMIT 30', (scene,)).fetchall()
        return [{'id': r[0], 'name': r[1], 'created': r[2], 'state': json.loads(r[3])} for r in rows]

    def set_snapshot_deleted(self, scene, identifier, deleted):
        with self.connect() as db:
            cursor = db.execute('UPDATE snapshots SET deleted=? WHERE id=? AND scene=?', (int(deleted), identifier, scene))
            return cursor.rowcount > 0


def clean_runtime(value, scene):
    if not isinstance(value, dict) or set(value) - {'fps', 'drawCalls', 'triangles', 'pixelRatio', 'renderedFrames', 'snapshot'}:
        raise ValueError('Invalid runtime observation')
    result = {}
    for key, maximum in {'fps': 1000, 'drawCalls': 1000000, 'triangles': 1000000000, 'pixelRatio': 8, 'renderedFrames': 10**15}.items():
        number = value.get(key, 0)
        if type(number) not in (int, float) or not math.isfinite(number) or not 0 <= number <= maximum:
            raise ValueError('Invalid runtime ' + key)
        result[key] = number
    result['snapshot'] = clean_state(value.get('snapshot', {}))
    if result['snapshot'].get('route', ROUTES[scene][0]) not in ROUTES[scene]:
        raise ValueError('Route belongs to another platform')
    return result


class LunarServer(ThreadingHTTPServer):
    daemon_threads = True

    def __init__(self, root, scene, data_dir, port=0):
        self.scene = scene
        self.root = Path(root).resolve()
        self.runtimes = {}
        self.sequences = {}
        self.store = Store(Path(data_dir) / 'sessions.sqlite3')
        snapshot=self.root/'published-content.js'
        if snapshot.is_file() and self.store.content()['revision']==0:
            raw=snapshot.read_text().split('window.LUNAR_PUBLISHED_CONTENT=',1)[1].strip().removesuffix(';')
            published=clean_content(json.loads(raw))
            if any(r['status']!='published' for k in ('experiments','products') for r in published[k]):
                raise ValueError('Public snapshot must not contain drafts or archived records')
            if published['experiments'] or published['products'] or published['contactEmail']:
                published['revision']=0
                self.store.save_content(published)
        self.started = time.monotonic()
        self.runtime_lock = threading.Lock()
        self.runtime = None
        self.runtime_sequence = 0
        self.stopping = threading.Event()
        super().__init__(('127.0.0.1', port), functools.partial(LunarHandler, directory=str(root)))

    def shutdown(self):
        self.stopping.set()
        return super().shutdown()

    def server_close(self):
        self.stopping.set()
        return super().server_close()

    def observation(self, scene=None):
        scene=scene or self.scene
        with self.runtime_lock:
            current=self.runtimes.get(scene)
            observation = dict(current) if current else None
            sequence = self.sequences.get(scene,0)
        return {'scene': scene, 'connected': True, 'source': 'local-browser-observation',
                'uptimeSeconds': round(time.monotonic() - self.started, 2),
                'sessionCount': len(self.store.snapshots(scene)), 'sequence': sequence,
                'observation': observation,
                'ageSeconds': round(time.time() - observation['receivedAt'], 3) if observation else None}

    def handle_error(self, request, client_address):
        # Navigation can cancel an autosave or a large embedded HTML response.
        # A disconnected peer is normal; preserve diagnostics for other faults.
        if isinstance(sys.exc_info()[1], (BrokenPipeError, ConnectionResetError)):
            return
        super().handle_error(request, client_address)


class LunarHandler(SimpleHTTPRequestHandler):
    server_version = 'LunarParadoxLocal/2'

    @property
    def request_scene(self):
        scene=parse_qs(urlsplit(self.path).query).get('scene',[self.server.scene])[0]
        return scene if scene in SCENES else self.server.scene

    def translate_path(self, path):
        route=unquote(urlsplit(path).path)
        if route.startswith('/platforms/'):
            parts=route.split('/')
            if len(parts)>=4 and parts[2] in SCENES:
                root=self.server.root
                base=(root.parent.parent/('lunar-'+parts[2])/'dist') if root.name=='dist' else root.parent/('lunar-'+parts[2])
                target=(base/'/'.join(parts[3:])).resolve()
                if base.is_dir() and target.is_relative_to(base.resolve()) and not any(part.startswith('.') or part.endswith(('.key','.sqlite3','.sqlite3-wal','.sqlite3-shm')) for part in target.relative_to(base.resolve()).parts):return str(target)
            return str(self.server.root/'__unavailable_platform__')
        target=Path(super().translate_path(path)).resolve()
        if not target.is_relative_to(self.server.root):return str(self.server.root/'__denied__')
        parts=target.relative_to(self.server.root).parts
        if any(part.startswith('.') or part.endswith(('.key','.sqlite3','.sqlite3-wal','.sqlite3-shm')) for part in parts):return str(self.server.root/'__denied__')
        return str(target)

    def list_directory(self, path):
        self.send_error(404)
        return None

    def log_message(self, format, *args):
        pass

    def end_headers(self):
        self.send_header('Cache-Control', 'no-store')
        self.send_header('X-Content-Type-Options', 'nosniff')
        super().end_headers()

    def json_response(self, status, value):
        payload = json.dumps(value, ensure_ascii=False).encode('utf8')
        self.send_response(status)
        self.send_header('Content-Type', 'application/json; charset=utf-8')
        self.send_header('Content-Length', str(len(payload)))
        self.end_headers()
        self.wfile.write(payload)

    def allowed_origin(self):
        origin = self.headers.get('Origin')
        host = self.headers.get('Host', '')
        expected = {f'127.0.0.1:{self.server.server_port}', f'localhost:{self.server.server_port}'}
        return host in expected and (not origin or origin in {f'http://{value}' for value in expected})

    def read_json(self, limit=16384):
        if not self.allowed_origin():
            raise PermissionError('Use this server from its localhost page')
        if self.headers.get('Content-Type', '').split(';')[0] != 'application/json':
            raise ValueError('Use application/json')
        length = int(self.headers.get('Content-Length', '0'))
        if not 0 < length <= limit:
            raise ValueError('Invalid request size')
        return json.loads(self.rfile.read(length))

    def require_owner(self):
        if len(self.server.store.owner_key)<32 or not self.allowed_origin() or not self.headers.get('X-Lunar-Owner','').isascii() or not secrets.compare_digest(self.headers.get('X-Lunar-Owner',''),self.server.store.owner_key):raise PermissionError('Owner key required')

    def do_HEAD(self):
        if not self.allowed_origin():return self.json_response(403,{'error':'Use the local launcher'})
        return super().do_HEAD()

    def do_GET(self):
        if not self.allowed_origin():return self.json_response(403,{'error':'Use the local launcher'})
        route = urlsplit(self.path).path
        if route in ('/api/applications','/api/pricing'):
            try:
                self.require_owner()
                return self.json_response(200,{'applications':self.server.store.applications(),'estimates':self.server.store.commission_estimates()} if route=='/api/applications' else self.server.store.pricing())
            except PermissionError as error:return self.json_response(403,{'error':str(error)})
        if route in ('/api/content','/api/publisher','/api/briefs'):
            if route!='/api/content':
                try:self.require_owner()
                except PermissionError as error:return self.json_response(403,{'error':str(error)})
            if not self.allowed_origin():return self.json_response(403, {'error':'Use the local launcher'})
            return self.json_response(200, {'briefs':self.server.store.briefs()} if route=='/api/briefs' else self.server.store.content(public=route=='/api/content'))
        if route == '/api/health':
            return self.json_response(200, {'status': 'ready', 'scene': self.request_scene, 'storage': 'sqlite', 'uptimeSeconds': round(time.monotonic() - self.server.started, 2)})
        if route == '/api/settings':
            return self.json_response(200, {'settings': self.server.store.settings(self.request_scene)})
        if route == '/api/sessions':
            return self.json_response(200, {'sessions': self.server.store.snapshots(self.request_scene)})
        if route == '/api/runtime':
            return self.json_response(200, self.server.observation(self.request_scene))
        if route == '/api/events':
            if not self.allowed_origin():
                return self.json_response(403, {'error': 'Use this server from its localhost page'})
            self.send_response(200)
            self.send_header('Content-Type', 'text/event-stream')
            self.send_header('Connection', 'close')
            self.end_headers()
            try:
                # Reconnect periodically; no unbounded per-client event history.
                for _ in range(300):
                    if self.server.stopping.is_set():
                        break
                    payload = json.dumps(self.server.observation(self.request_scene), allow_nan=False)
                    self.wfile.write(('event: runtime\ndata: ' + payload + '\n\n').encode())
                    self.wfile.flush()
                    if self.server.stopping.wait(1):
                        break
            except (BrokenPipeError, ConnectionResetError, sqlite3.Error):
                pass
            return
        if route.startswith('/api/'):
            return self.json_response(404, {'error': 'Unknown API route'})
        return super().do_GET()

    def do_PUT(self):
        route=urlsplit(self.path).path
        if route in ('/api/applications','/api/pricing'):
            try:
                self.require_owner();value=self.read_json()
                return self.json_response(200,self.server.store.review_application(value) if route=='/api/applications' else self.server.store.save_pricing(value))
            except PermissionError as error:return self.json_response(403,{'error':str(error)})
            except (ValueError,TypeError,KeyError,json.JSONDecodeError) as error:return self.json_response(400,{'error':str(error)})
        if urlsplit(self.path).path=='/api/publisher':
            try:
                self.require_owner()
                return self.json_response(200,self.server.store.save_content(self.read_json(262144)))
            except PermissionError as error:return self.json_response(403,{'error':str(error)})
            except (ValueError,TypeError,json.JSONDecodeError) as error:return self.json_response(400,{'error':str(error)})
        self.mutate('settings')

    def do_POST(self):
        route = urlsplit(self.path).path
        if route in ('/api/apply','/api/application-access','/api/estimate'):
            try:
                value=self.read_json()
                if route=='/api/apply':return self.json_response(201,self.server.store.create_application(value,self.headers.get('Idempotency-Key')))
                if route=='/api/estimate':return self.json_response(201,self.server.store.estimate(value))
                app=self.server.store.application(value);result={'application':app}
                if app['status']=='accepted':result['pricing']=self.server.store.pricing()
                return self.json_response(200,result)
            except PermissionError as error:return self.json_response(403,{'error':str(error)})
            except (ValueError,TypeError,KeyError,json.JSONDecodeError) as error:return self.json_response(400,{'error':str(error)})
        if route == '/api/briefs':
            try:return self.json_response(201,self.server.store.save_brief(self.read_json()))
            except PermissionError as error:return self.json_response(403,{'error':str(error)})
            except (ValueError,TypeError,json.JSONDecodeError) as error:return self.json_response(400,{'error':str(error)})
        if route == '/api/runtime':
            try:
                observation = clean_runtime(self.read_json(), self.request_scene)
                observation['receivedAt'] = time.time()
                with self.server.runtime_lock:
                    self.server.runtimes[self.request_scene] = observation
                    self.server.sequences[self.request_scene] = self.server.sequences.get(self.request_scene,0)+1
                    self.server.runtime = observation
                    self.server.runtime_sequence += 1
                return self.json_response(200, {'accepted': True, 'sequence': self.server.sequences[self.request_scene]})
            except PermissionError as error:
                return self.json_response(403, {'error': str(error)})
            except (ValueError, TypeError, json.JSONDecodeError) as error:
                return self.json_response(400, {'error': str(error)})
        if route.startswith('/api/sessions/') and route.endswith('/restore') and len(route.split('/')) == 5:
            return self.change_snapshot(route.split('/')[-2], False)
        self.mutate('sessions')

    def do_DELETE(self):
        route = urlsplit(self.path).path
        if route.startswith('/api/sessions/') and len(route.split('/')) == 4:
            return self.change_snapshot(route.split('/')[-1], True)
        return self.json_response(404, {'error': 'Unknown API route'})

    def change_snapshot(self, identifier, deleted):
        try:
            self.read_json()
            uuid.UUID(identifier)
            found = self.server.store.set_snapshot_deleted(self.request_scene, identifier, deleted)
            return self.json_response(200 if found else 404, {'updated': found, 'deleted': deleted})
        except PermissionError as error:
            return self.json_response(403, {'error': str(error)})
        except (ValueError, TypeError, json.JSONDecodeError) as error:
            return self.json_response(400, {'error': str(error)})

    def mutate(self, kind):
        if urlsplit(self.path).path != '/api/' + kind:
            return self.json_response(404, {'error': 'Unknown API route'})
        try:
            value = self.read_json()
            if not isinstance(value, dict):
                raise ValueError('Expected JSON object')
            if kind == 'settings':
                result = {'settings': self.server.store.save_settings(self.request_scene, value)}
            else:
                result = {'session': self.server.store.save_snapshot(self.request_scene, value.get('name', ''), value.get('state', {}))}
            return self.json_response(200 if kind == 'settings' else 201, result)
        except PermissionError as error:
            return self.json_response(403, {'error': str(error)})
        except (ValueError, TypeError, json.JSONDecodeError) as error:
            return self.json_response(400, {'error': str(error)})
        except sqlite3.Error:
            return self.json_response(503, {'error': 'Local session storage is unavailable'})


def serve(root, scene, data_dir, port=0, no_browser=False):
    with LunarServer(root, scene, data_dir, port) as server:
        url = f'http://127.0.0.1:{server.server_port}/'
        print(f'Lunar Paradox / {scene}\n{url}\nCommissioning owner key file: {server.store.path.parent / "commission-owner.key"}\nLocal SQLite backend ready. Keep this terminal open; Ctrl+C stops it.', flush=True)
        if not no_browser:
            threading.Timer(.3, webbrowser.open, args=(url,)).start()
        try:
            server.serve_forever()
        except KeyboardInterrupt:
            print('\nLocal server stopped.')


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('scene', choices=SCENES)
    parser.add_argument('--root', type=Path, required=True)
    parser.add_argument('--data-dir', type=Path, default=Path(__file__).parent / '.lunar-data')
    parser.add_argument('--port', type=int, default=0)
    parser.add_argument('--no-browser', action='store_true')
    args = parser.parse_args()
    serve(args.root.resolve(), args.scene, args.data_dir, args.port, args.no_browser)
