---
description: Review a work item's plan or code and write 04-review.md with a verdict.
argument-hint: "[work-item] [stage] [resource]"
order: 5
disable-model-invocation: true
allowed-tools: Read(/${CLAUDE_PLUGIN_ROOT}/groups/**), Bash(ls:*), Bash(date:*), Bash(cd:*), Bash(gh issue view:*), Bash(git status:*), Bash(git diff:*), Bash(git ls-files:*), Bash(git rev-parse:*), Bash(git merge-base:*), Bash(git remote show:*), Bash(git log:*), Edit, Write, Agent
---
Groups folder: ${CLAUDE_PLUGIN_ROOT}/groups
Follow flow/instructions/review.md
