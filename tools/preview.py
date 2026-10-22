"""Allowlisted loopback static preview of generated scenes; no production API."""
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlsplit, unquote
import argparse
import json

ROOT = Path(__file__).resolve().parents[1] / 'build' / 'hosted'
SCENES = {'syzygy', 'gravity', 'astrolabe'}


class Preview(SimpleHTTPRequestHandler):
    def translate_path(self, url):
        parts = unquote(urlsplit(url).path).strip('/').split('/')
        if parts == ['']:
            parts = ['index.html']
        elif parts == ['studio']:
            parts = ['studio.html']
        elif parts == ['studio.html']:
            parts = ['studio.html']
        elif parts[0] == 'platforms' and len(parts) >= 2 and parts[1] in SCENES:
            parts = ['lunar-' + parts[1], *parts[2:]]
        elif parts[0] in {'labs', 'products'}:
            parts = ['lunar-' + ('gravity' if parts[0] == 'labs' else 'astrolabe'), *parts[1:]]
        if len(parts) == 1 and parts[0].startswith('lunar-'):
            parts.append('index.html')
        if any(part in ('.', '..') or part.startswith('.') for part in parts):
            return str(ROOT / '__denied__')
        target = ROOT.joinpath(*parts).resolve()
        if not target.is_relative_to(ROOT.resolve()):
            return str(ROOT / '__denied__')
        return str(target)

    def do_GET(self):
        path = urlsplit(self.path).path.rstrip('/') or '/'
        aliases = {'/gravity': '/labs', '/astrolabe': '/products', '/index.html': '/', '/studio.html': '/studio'}
        alias = aliases.get(path)
        if alias is None:
            for old, new in (('/gravity/', '/labs/'), ('/astrolabe/', '/products/')):
                if path.startswith(old):
                    alias = new + path[len(old):]
                    break
        if alias:
            self.send_response(308)
            self.send_header('Location', alias)
            self.end_headers()
            return
        if urlsplit(self.path).path.startswith('/api/'):
            payload = json.dumps({'error': 'Static preview: local API is not connected.'}).encode()
            self.send_response(503)
            self.send_header('Content-Type', 'application/json')
            self.send_header('Content-Length', str(len(payload)))
            self.end_headers()
            self.wfile.write(payload)
            return
        super().do_GET()

    def list_directory(self, path):
        self.send_error(404)
        return None

    def end_headers(self):
        self.send_header('Cache-Control', 'no-store')
        super().end_headers()


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--port', type=int, default=0)
    args = parser.parse_args()
    server = ThreadingHTTPServer(('127.0.0.1', args.port), Preview)
    print(f'http://127.0.0.1:{server.server_port}/#/realms', flush=True)
    server.serve_forever()
