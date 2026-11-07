#!/bin/sh
# Export the banner from banner.html to an SVG with headless Chrome.
# usage: ./banner.sh banner.html out.svg
# Set CHROME to the browser binary if it is not the macOS default.
set -eu

if [ $# -ne 2 ] || [ ! -f "$1" ]; then
  echo "usage: ./banner.sh banner.html out.svg" >&2
  exit 1
fi

chrome="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"
html="$(cd "$(dirname "$1")" && pwd)/$(basename "$1")"

"$chrome" --headless=new --disable-gpu --dump-dom "file://$html" 2>/dev/null |
  PYTHONIOENCODING=utf-8 python3 -c '
import html, re, sys
m = re.search(r"<pre id=\"svg\"[^>]*>(.*?)</pre>", sys.stdin.read(), re.S)
if not m:
    sys.exit("error: no svg found in the page")
sys.stdout.write(html.unescape(m.group(1)).strip() + "\n")
' > "$2"

echo "wrote $2"
