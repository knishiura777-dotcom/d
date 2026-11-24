"""Refresh the V5 catalog without changing its layout or application files.
Run from the repository root: python generate_catalog.py
Optional: pip install qrcode[pil] for offline QR codes on newly added apps.
"""
from pathlib import Path
from html.parser import HTMLParser
import base64, io, json, re
from urllib.parse import quote

ROOT = Path(__file__).resolve().parent
PUBLIC = 'https://knishiura777-dotcom.github.io/d/'
DATA = re.compile(r'(<script type="application/json" id="catalog-data">)[\s\S]*?(</script>)')
TEACHER = re.compile(r'<script type="application/json" id="teacher-files">([\s\S]*?)</script>')

class Info(HTMLParser):
    def __init__(self):
        super().__init__(); self.title = ''; self.description = ''; self.in_title = False
    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == 'title': self.in_title = True
        if tag == 'meta' and attrs.get('name', '').lower() == 'description': self.description = attrs.get('content', '')
    def handle_endtag(self, tag):
        if tag == 'title': self.in_title = False
    def handle_data(self, data):
        if self.in_title: self.title += data

def make_qr(path):
    try:
        import qrcode
        image = qrcode.make(PUBLIC + quote(path, safe='/'), box_size=5, border=4)
        buf = io.BytesIO(); image.save(buf, format='PNG')
        return 'data:image/png;base64,' + base64.b64encode(buf.getvalue()).decode()
    except ImportError:
        return ''

pages = {name: (ROOT/name).read_text(encoding='utf-8') for name in ['index.html','students.html']}
if not all(DATA.search(s) and TEACHER.search(s) and '2026-11-24-v5.0' in s for s in pages.values()):
    raise SystemExit('V5 catalog pages were not found. Install both V5 pages before regenerating.')
teacher = set(json.loads(TEACHER.search(pages['index.html']).group(1)))
old = json.loads((ROOT/'webapps.json').read_text(encoding='utf-8'))
old_map = {a.get('path', a.get('url')): a for a in old}
paths = []
for f in ROOT.rglob('*'):
    if not f.is_file() or f.suffix.lower() not in {'.html','.htm'}: continue
    path = f.relative_to(ROOT).as_posix()
    if any(part.startswith('.') for part in f.relative_to(ROOT).parts): continue
    if path.lower() in {'index.html','students.html'}: continue
    if '/' in path and f.name.lower() in {'index.html','index.htm'} and path != 'psycho-arcade-2026/index.html': continue
    paths.append(path)
if not paths:
    raise SystemExit('No app files found. Copy these catalog files into the original app repository first.')
paths = sorted(set(paths),key=lambda p: (list(old_map).index(p) if p in old_map else len(old_map), p))
rows=[]
for path in paths:
    a=dict(old_map.get(path,{})); a['path']=a['url']=path
    if path == 'psycho-arcade-2026/index.html': c='portal'
    elif path.startswith('psycho-arcade-2026/games/'): c='student'
    elif path in teacher or a.get('collection')=='general': c='general'
    else: c='student'
    a['collection']=c
    if not a.get('title') or not a.get('description'):
        info=Info();info.feed((ROOT/path).read_text(encoding='utf-8',errors='replace')[:250000])
        a['title']=a.get('title') or info.title.strip() or Path(path).stem
        a['description']=a.get('description') or info.description.strip() or 'ブラウザで体験するWebアプリ。'
    a.setdefault('category','学生制作ゲーム' if c=='student' else '学生ゲームセンター' if c=='portal' else 'デザイン・ツール')
    a.setdefault('art','orbit');a.setdefault('updated','')
    if not a.get('qrData'): a['qrData']=make_qr(path)
    rows.append(a)
encoded=json.dumps(rows,ensure_ascii=False,separators=(',',':')).replace('<','\\u003c')
for name,html in pages.items():
    html=DATA.sub(lambda m:m.group(1)+encoded+m.group(2),html,count=1)
    (ROOT/name).write_text(html,encoding='utf-8')
(ROOT/'webapps.json').write_text(json.dumps(rows,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print('Faculty:',sum(a['collection']=='general' for a in rows),'Student:',sum(a['collection']=='student' for a in rows),'Portal:',sum(a['collection']=='portal' for a in rows))
