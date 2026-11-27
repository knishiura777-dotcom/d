#!/usr/bin/env python3
"""Web App Library v6.0: rebuild catalog data without changing the page design.
Run in the directory containing index.html, students.html, and webapps.json.
Usage: python generate_catalog.py [ROOT] [--dry-run]
Optional: python -m pip install "qrcode[pil]" for embedded QR codes.
"""
import argparse
import base64
import collections
import html
import io
import json
import re
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import quote

ROOT_URL = "https://knishiura777-dotcom.github.io/d/"
PORTAL = "psycho-arcade-2026/index.html"
NAVIGATION = {"index.html", "students.html", "index.htm", "students.htm"}
SKIP = {".git", ".github", "node_modules", "__pycache__", "venv", ".venv",
        "qr", "assets", "static", "dist", "build"}

def classify(path, declared="", teachers=()):
    p = path.lower()
    if p in NAVIGATION:
        return "navigation"
    if p == PORTAL:
        return "portal"
    if p.startswith(("psycho-arcade-2026/games/", "students/")):
        return "student"
    if path in teachers:
        return "general"
    if declared == "student":
        return "student"
    return "general"

class Head(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.meta = {}
        self.title = []
        self.in_title = False
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == "title":
            self.in_title = True
        elif tag == "meta":
            key = a.get("name") or a.get("property")
            if key and a.get("content"):
                self.meta[key.lower()] = a["content"]
    def handle_endtag(self, tag):
        if tag == "title":
            self.in_title = False
    def handle_data(self, text):
        if self.in_title:
            self.title.append(text)

def metadata(file):
    with file.open(encoding="utf-8-sig", errors="replace") as stream:
        text = stream.read(262144)
    # Most metadata is in the first few lines; never parse embedded megabytes.
    text = re.split(r"</head\s*>|<body(?:\s|>)", text, maxsplit=1, flags=re.I)[0]
    parser = Head()
    parser.feed(text)
    return " ".join(" ".join(parser.title).split()), parser.meta

def qr(path):
    try:
        import qrcode
        code = qrcode.QRCode(box_size=6, border=4,
                            error_correction=qrcode.constants.ERROR_CORRECT_M)
        code.add_data(ROOT_URL + quote(path, safe="/"))
        code.make(fit=True)
        b = io.BytesIO()
        code.make_image().save(b, format="PNG")
        return "data:image/png;base64," + base64.b64encode(b.getvalue()).decode("ascii")
    except ImportError:
        return ""  # The existing browser QR fallback remains available.

def tag_pattern(id):
    return re.compile(r'(<script type="application/json" id="' +
                      re.escape(id) + r'">)(.*?)(</script>)', re.S)

def read_tag(page, id):
    m = tag_pattern(id).search(page)
    if not m:
        raise ValueError("Required catalog tag missing: " + id)
    return json.loads(m.group(2))

def replace_tag(page, id, value):
    payload = json.dumps(value, ensure_ascii=False, separators=(",", ":"))
    payload = payload.replace("<", "\\u003c").replace(">", "\\u003e").replace("&", "\\u0026")
    updated, n = tag_pattern(id).subn(lambda m: m.group(1) + payload + m.group(3), page)
    if n != 1:
        raise ValueError("Required catalog tag must occur exactly once: " + id)
    return updated

def discover(root, previous):
    paths = {}
    for f in sorted(root.rglob("*")):
        if not f.is_file() or f.suffix.lower() not in {".html", ".htm"}:
            continue
        rel = f.relative_to(root)
        path = rel.as_posix()
        if any(part.startswith(".") or part.lower() in SKIP for part in rel.parts[:-1]):
            continue
        if path.lower() in NAVIGATION:
            continue
        # Preserve registered entrypoints and the student portal. Other nested
        # index pages are not auto-registered, matching the existing GitHub scan.
        if len(rel.parts) > 1 and f.name.lower() in {"index.html", "index.htm"}:
            if path.lower() != PORTAL and path not in previous:
                print("[SKIP nested index] " + path)
                continue
        paths[path] = f
    return paths

def rebuild(root, dry_run=False):
    index = (root / "index.html").read_text(encoding="utf-8-sig")
    students = (root / "students.html").read_text(encoding="utf-8-sig")
    old = json.loads((root / "webapps.json").read_text(encoding="utf-8-sig"))
    if not isinstance(old, list):
        raise ValueError("webapps.json must be a list.")
    previous = {a["path"]: a for a in old}
    teachers = list(dict.fromkeys(read_tag(index, "teacher-files") +
                                  read_tag(students, "teacher-files")))
    paths = discover(root, previous)
    if not paths:
        raise ValueError("No apps found. Check the root directory; no files changed.")
    result = []
    # New works first, followed by existing curated order.
    order = [path for path in paths if path not in previous] + [path for path in previous if path in paths]
    for path in order:
        f = paths[path]
        old_entry = previous.get(path, {})
        a = dict(old_entry)
        try:
            title, meta = metadata(f)
        except (OSError, ValueError) as exc:
            print("[READ WARNING] " + path + " : " + str(exc))
            title, meta = "", {}
        declared = meta.get("app-collection", old_entry.get("collection", ""))
        collection = classify(path, declared, teachers)
        a.update(path=path, url=quote(path, safe="/"), collection=collection)
        a["title"] = a.get("title") or title or f.stem.replace("_", " ").replace("-", " ")
        old_collection = old_entry.get("collection")
        default_category = "学生制作ゲーム" if collection == "student" else ("学生ゲームセンター" if collection == "portal" else "デザイン・ツール")
        if old_collection != collection and a.get("category") == "学生制作ゲーム":
            a["category"] = default_category
        a["category"] = a.get("category") or meta.get("app-category") or default_category
        a["description"] = a.get("description") or meta.get("description") or meta.get("og:description") or "ブラウザで体験するWebアプリ。"
        version = meta.get("app-version", "").strip()
        a["version"] = a.get("version") or (("Ver." + version) if version and not version.lower().startswith("v") else version)
        a["art"] = a.get("art") or "orbit"
        a["updated"] = a.get("updated", "")
        if not a.get("qrData"):
            a["qrData"] = qr(path)
        result.append(a)
        label = "NEW" if not old_entry else ("MOVED" if old_collection != collection else "OK")
        print(f"[{label} {collection}] {path}")
        if collection == "general" and path not in teachers:
            teachers.append(path)
    for path in previous:
        if path not in paths:
            print("[MISSING / removed from catalog] " + path)
    counts = collections.Counter(a["collection"] for a in result)
    # Validate both templates before writing anything.
    pages = {}
    for name, page in (("index.html", index), ("students.html", students)):
        pages[name] = replace_tag(replace_tag(page, "catalog-data", result), "teacher-files", teachers)
    if not dry_run:
        payloads = {"webapps.json": json.dumps(result, ensure_ascii=False, indent=2) + "\n", **pages}
        # Stage all files before replacing them, so malformed templates do not cause partial writes.
        for name, body in payloads.items():
            (root / (name + ".tmp")).write_text(body, encoding="utf-8")
        for name in payloads:
            (root / (name + ".tmp")).replace(root / name)
    print(f"Faculty: {counts['general']} Student: {counts['student']} Portal: {counts['portal']}")
    if dry_run:
        print("Dry run: no files changed.")
    return result

if __name__ == "__main__":
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument("root", nargs="?", default=".")
    p.add_argument("--dry-run", action="store_true")
    args = p.parse_args()
    try:
        rebuild(Path(args.root).resolve(), args.dry_run)
    except (OSError, ValueError, KeyError, TypeError) as exc:
        p.exit(1, f"Catalog error: {exc}\n")
