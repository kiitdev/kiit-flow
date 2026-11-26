#!/bin/sh
# Export a diagram template to an SVG with headless Chrome, with its font embedded.
# usage: ./banner.sh <group>/<template>.html <group>/<out>.svg ['{"accent":"#14B8A6"}']
# The optional JSON changes theme settings for this run. The settings are in kiit-svg.js.
# Set CHROME to the browser binary if it is not the macOS default.
set -eu

if { [ $# -ne 2 ] && [ $# -ne 3 ]; } || [ ! -f "$1" ]; then
  echo "usage: ./banner.sh <group>/<template>.html <group>/<out>.svg ['{\"accent\":\"#14B8A6\"}']" >&2
  exit 1
fi

here="$(cd "$(dirname "$0")" && pwd)"
chrome="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"
html="$(cd "$(dirname "$1")" && pwd)/$(basename "$1")"

# the theme JSON goes after #theme= in the address, where kiit-svg.js reads it
frag=""
if [ $# -eq 3 ]; then
  frag=$(python3 -I -c 'import json, sys, urllib.parse; json.loads(sys.argv[1]); print("#theme=" + urllib.parse.quote(sys.argv[1], safe=""))' "$3" 2>/dev/null) || {
    echo "error: the theme is not valid JSON: $3" >&2
    exit 1
  }
fi

"$chrome" --headless=new --disable-gpu --dump-dom "file://$html$frag" 2>/dev/null |
  PYTHONIOENCODING=utf-8 python3 -I "$here/extract-svg.py" "$here" > "$2"

echo "wrote $2"
