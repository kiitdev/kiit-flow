#!/bin/sh
# Install the kiit-flow skills into a workspace.
# usage: ./install.sh <workspace-dir>
set -eu

if [ $# -ne 1 ] || [ ! -d "$1" ]; then
  echo "usage: ./install.sh <workspace-dir>" >&2
  exit 1
fi

src=$(cd "$(dirname "$0")" && pwd)
dest=$(cd "$1" && pwd)

# skills/flow-x becomes .claude/skills/kiit-flow-x, and /flow- references become /kiit-flow-
rewrite='s#(^|[[:space:]`(])/flow-#\1/kiit-flow-#g'
for dir in "$src"/skills/flow-*/; do
  name=$(basename "$dir")
  out="$dest/.claude/skills/kiit-$name"
  mkdir -p "$out"
  for f in "$dir"*; do
    sed -E "$rewrite" "$f" > "$out/$(basename "$f")"
  done
  echo "installed kiit-$name"
done

# shared files, when there are any: markdown gets the same rewrite, the rest is copied
if [ -d "$src/shared" ]; then
  mkdir -p "$dest/.claude/kiit/flow"
  for f in "$src"/shared/*; do
    case "$f" in
      *.md) sed -E "$rewrite" "$f" > "$dest/.claude/kiit/flow/$(basename "$f")" ;;
      *) cp "$f" "$dest/.claude/kiit/flow/" ;;
    esac
  done
  echo "installed shared files"
fi

# the config is yours: /kiit-flow-init writes it, and install never touches it
if [ -f "$dest/.claude/kiit/kiit.json" ]; then
  echo "kept existing .claude/kiit/kiit.json"
else
  echo "next: restart Claude Code in $dest, then run /kiit-flow-init"
fi
