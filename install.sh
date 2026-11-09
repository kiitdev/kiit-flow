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

# shared rules, with the same rewrite. kiit.example.json stays in the repo, it is not installed
if [ -d "$src/shared" ]; then
  mkdir -p "$dest/.claude/kiit/flow"
  for f in "$src"/shared/*.md; do
    sed -E "$rewrite" "$f" > "$dest/.claude/kiit/flow/$(basename "$f")"
  done
  echo "installed shared files"
fi

# the config is yours: /kiit-flow-init writes it, and install never touches it
if [ -f "$dest/.claude/kiit/kiit.json" ]; then
  echo "kept existing .claude/kiit/kiit.json"
else
  echo "next: restart Claude Code in $dest, then run /kiit-flow-init"
fi
