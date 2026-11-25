---
description: Create .claude/kiit/kiit.json for a workspace from its git repos.
argument-hint: ""
order: 1
disable-model-invocation: true
allowed-tools: Read(/${CLAUDE_PLUGIN_ROOT}/groups/**), Bash(ls:*), Bash(git remote get-url:*), Bash(git remote show:*), Bash(git rev-parse:*)
---
Groups folder: ${CLAUDE_PLUGIN_ROOT}/groups
Follow core/instructions/init.md
