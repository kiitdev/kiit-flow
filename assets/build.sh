#!/bin/sh
# Regenerate every diagram from its template, writing the SVG next to it.
# usage: ./build.sh ['{"accent":"#14B8A6"}']
# The optional JSON changes theme settings for this run. The settings are in kiit-svg.js.
# The one-pager is not a diagram template, so it is skipped.
set -eu

dir="$(cd "$(dirname "$0")" && pwd)"
for html in "$dir"/core/*.html "$dir"/flow/*.html "$dir"/vcs/*.html; do
  [ -f "$html" ] || continue
  [ "$(basename "$html")" = "onepager.html" ] && continue
  "$dir/banner.sh" "$html" "${html%.html}.svg" ${1:+"$1"}
done
