"""Read a rendered template page on stdin and print its SVG, with the fonts embedded.

usage: chrome ... --dump-dom page.html | python3 extract-svg.py <assets folder>

The page lists its fonts (kiit-svg.js does that), and the font files are read from the
assets folder. Each one goes into the SVG as a base64 @font-face rule, so the text looks the
same on any machine. Ligatures are turned off. The font's copyright and licence notice goes
in as a comment, because the font's licence asks that it travels with the font.
"""
import base64
import html
import json
import os
import re
import sys

sys.stdin.reconfigure(encoding="utf-8")
sys.stdout.reconfigure(encoding="utf-8")
page = sys.stdin.read()
svg_match = re.search(r'<pre id="svg"[^>]*>(.*?)</pre>', page, re.S)
if not svg_match:
    sys.exit("error: no svg found in the page")
svg = html.unescape(svg_match.group(1)).strip()

fonts_match = re.search(r'<pre id="fonts"[^>]*>(.*?)</pre>', page, re.S)
if fonts_match:
    spec = json.loads(html.unescape(fonts_match.group(1)))
    rules = []
    for weight, name in spec["faces"]:
        path = os.path.join(sys.argv[1], spec["dir"], name)
        if not os.path.isfile(path):
            sys.exit(f"error: font file not found: {path}")
        data = base64.b64encode(open(path, "rb").read()).decode()
        rules.append(f"@font-face{{font-family:'{spec['family']}';font-weight:{weight};"
                     f"src:url(data:font/woff2;base64,{data}) format('woff2')}}")
    style = "<style>" + "".join(rules) + "text{font-variant-ligatures:none}</style>"
    notice = spec.get("notice", "").replace("--", "-")   # two hyphens are not allowed in a comment
    comment = f"<!-- {notice} -->\n  " if notice else ""
    svg, count = re.subn(r"(<svg\b[^>]*>)", lambda m: m.group(1) + "\n  " + comment + style, svg, count=1)
    if count != 1:
        sys.exit("error: no <svg> tag in the page")

sys.stdout.write(svg + "\n")
