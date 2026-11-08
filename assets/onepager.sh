#!/bin/sh
# Export the one-pager (onepager.html) to a PNG with headless Chrome.
# usage: ./onepager.sh out.png [scale]     scale defaults to 2
# Set CHROME to the browser binary if it is not the macOS default.
set -eu

if [ $# -lt 1 ] || [ $# -gt 2 ]; then
  echo "usage: ./onepager.sh out.png [scale]" >&2
  exit 1
fi

chrome="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"
dir="$(cd "$(dirname "$0")" && pwd)"
scale="${2:-2}"
out="$(cd "$(dirname "$1")" && pwd)/$(basename "$1")"

# the page is the three images stacked, with 40px around and 28px between
size=$(python3 -I - "$dir" <<'PY'
import re, sys
w = h = 0
for name in ("kiit-flow-banner", "kiit-flow-diagram", "kiit-flow-work-item"):
    head = open(f"{sys.argv[1]}/{name}.svg").read(400)
    m = re.search(r'width="(\d+)" height="(\d+)"', head)
    w, h = max(w, int(m.group(1))), h + int(m.group(2))
print(w + 80, h + 80 + 2 * 28)
PY
)
set -- $size

"$chrome" --headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor="$scale" \
  --virtual-time-budget=3000 --window-size="$1,$2" --screenshot="$out" "file://$dir/onepager.html" >/dev/null 2>&1
echo "wrote $out ($1 x $2 at ${scale}x)"
