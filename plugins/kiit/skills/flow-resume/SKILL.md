---
description: Cold-start a work item and continue its implementation where it stopped.
argument-hint: "[work-item] [scope]"
order: 8
disable-model-invocation: true
allowed-tools: Read(/${CLAUDE_PLUGIN_ROOT}/groups/**), Bash(ls:*), Bash(date:*), Bash(cd:*), Bash(gh issue view:*), Bash(git status:*), Bash(git diff:*), Bash(git ls-files:*), Bash(git rev-parse:*), Bash(git merge-base:*), Bash(git remote show:*), Bash(git log:*), Edit, Write
---
Groups folder: ${CLAUDE_PLUGIN_ROOT}/groups
Follow flow/instructions/resume.md
