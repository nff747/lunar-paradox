import sys,tempfile,threading,json,urllib.request,urllib.error,unittest
from pathlib import Path
sys.path.insert(0,str(Path(__file__).resolve().parents[1]/'offline-platforms'))
from lunar_backend import Store,LunarServer
class SecurityTests(unittest.TestCase):
 def test_bad_key_files_fail_closed(self):
  for key in ['', '   ', 'short']:
   with tempfile.TemporaryDirectory() as d:
    (Path(d)/'commission-owner.key').write_text(key)
    with self.assertRaises(ValueError):Store(Path(d)/'sessions.sqlite3')
 def test_idempotent_offline_submission(self):
  with tempfile.TemporaryDirectory() as d:
   store=Store(Path(d)/'sessions.sqlite3');brief={'name':'Synthetic','email':'audit@example.test','type':'commission','goal':'Test','timing':'','budget':''}
   a=store.create_application(brief,'a'*40);b=store.create_application(brief,'a'*40);self.assertEqual(a,b);self.assertEqual(len(store.applications()),1)
   with self.assertRaises(ValueError):store.create_application({**brief,'goal':'Different'},'a'*40)
 def test_private_routes_and_static_root(self):
  with tempfile.TemporaryDirectory() as d:
   root=Path(d)/'public';root.mkdir();(root/'index.html').write_text('test');outside=Path(d)/'marker';outside.write_text('private');(root/'link').symlink_to(outside);(root/'folder').mkdir()
   server=LunarServer(root,'syzygy',Path(d)/'private');thread=threading.Thread(target=server.serve_forever,daemon=True);thread.start()
   def req(path,method='GET',owner=False,body=None):
    request=urllib.request.Request(f'http://127.0.0.1:{server.server_port}'+path,method=method,data=json.dumps(body).encode() if body is not None else None,headers={'Content-Type':'application/json',**({'X-Lunar-Owner':server.store.owner_key} if owner else {})})
    try:
     with urllib.request.urlopen(request) as r:return r.status
    except urllib.error.HTTPError as e:
     status=e.code;e.close();return status
   try:
    for route in ['/api/publisher','/api/briefs','/api/applications','/api/pricing']:self.assertEqual(req(route),403);self.assertEqual(req(route,owner=True),200)
    self.assertEqual(req('/api/publisher','PUT',body={}),403);self.assertEqual(req('/link'),404);self.assertEqual(req('/folder/'),404);self.assertEqual(req('/api/content'),200)
    hostile=urllib.request.Request(f'http://127.0.0.1:{server.server_port}/api/settings',headers={'Host':'attacker.example'})
    with self.assertRaises(urllib.error.HTTPError) as denied:urllib.request.urlopen(hostile)
    self.assertEqual(denied.exception.code,403);denied.exception.close()
   finally:server.shutdown();server.server_close();thread.join()
