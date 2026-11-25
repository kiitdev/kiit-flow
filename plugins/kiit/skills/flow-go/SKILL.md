---
description: "Do a clear, low-risk change in one pass: no design, just implement and check."
argument-hint: "[project] [type] {ticket|description} [--check] [--auto]"
order: 1
disable-model-invocation: true
allowed-tools: Read(/${CLAUDE_PLUGIN_ROOT}/groups/**), Edit, Write, Bash(ls:*), Bash(mkdir -p:*), Bash(date:*), Bash(cd:*), Bash(gh issue view:*), Bash(git status:*), Bash(git diff:*), Bash(git ls-files:*), Bash(git rev-parse:*), Bash(git add:*), Bash(git commit:*), Bash(git push -u origin:*), Bash(git fetch:*), Bash(git checkout -b:*), Bash(git remote show:*), Bash(git branch:*), Bash(git log:*), Bash(gh pr create:*), Bash(gh pr list:*), Bash(${CLAUDE_PLUGIN_ROOT}/groups/core/scripts/check-format.sh:*)
---
Groups folder: ${CLAUDE_PLUGIN_ROOT}/groups
Follow flow/instructions/go.md
