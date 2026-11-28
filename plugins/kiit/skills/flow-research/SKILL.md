---
description: Look into the unknowns of a work item and add them to _research.md.
argument-hint: "[work-item] [topic...]"
order: 4
disable-model-invocation: true
allowed-tools: Read(/${CLAUDE_PLUGIN_ROOT}/groups/**), Bash(ls:*), Bash(date:*), Bash(cd:*), Bash(gh issue view:*), Bash(git status:*), Bash(git diff:*), Bash(git ls-files:*), Bash(git rev-parse:*), Bash(git merge-base:*), Bash(git remote show:*), Bash(git log:*), Edit, Write
---
Groups folder: ${CLAUDE_PLUGIN_ROOT}/groups
Follow flow/instructions/research.md
