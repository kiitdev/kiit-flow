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
for dir in "$src"/skills/flow-*/; do
  name=$(basename "$dir")
  out="$dest/.claude/skills/kiit-$name"
  mkdir -p "$out"
  for f in "$dir"*; do
    sed -E 's#(^|[[:space:]`(])/flow-#\1/kiit-flow-#g' "$f" > "$out/$(basename "$f")"
  done
  echo "installed kiit-$name"
done

# shared files, when there are any
if [ -d "$src/shared" ]; then
  mkdir -p "$dest/.claude/kiit/flow"
  cp -R "$src"/shared/. "$dest/.claude/kiit/flow/"
  echo "installed shared files"
fi

# the config is yours: create it from the example once, never overwrite it
config="$dest/.claude/kiit/kiit.json"
if [ -f "$config" ]; then
  echo "kept existing .claude/kiit/kiit.json"
else
  cp "$src/shared/kiit.example.json" "$config"
  echo "created .claude/kiit/kiit.json, edit it for your tickets and projects"
fi
