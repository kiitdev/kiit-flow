---
description: Create a work item from a ticket or a description.
argument-hint: "[project] [type] {ticket|description}"
order: 2
disable-model-invocation: true
allowed-tools: Read(/${CLAUDE_PLUGIN_ROOT}/groups/**), Write(/_kiit/flow/**), Bash(ls:*), Bash(mkdir -p:*), Bash(date:*), Bash(gh issue view:*)
---
Groups folder: ${CLAUDE_PLUGIN_ROOT}/groups
Follow flow/instructions/begin.md
