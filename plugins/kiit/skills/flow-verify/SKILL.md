---
description: Check a work item: its criteria, then the project's lint, tests, security and docs.
argument-hint: "[work-item] [check...]"
order: 9
disable-model-invocation: true
allowed-tools: Read(/${CLAUDE_PLUGIN_ROOT}/groups/**), Bash(ls:*), Bash(date:*), Bash(cd:*), Bash(gh issue view:*), Bash(git status:*), Bash(git diff:*), Bash(git ls-files:*), Bash(git rev-parse:*), Bash(git merge-base:*), Bash(git remote show:*), Bash(git log:*), Write
---
Groups folder: ${CLAUDE_PLUGIN_ROOT}/groups
Follow flow/instructions/verify.md
