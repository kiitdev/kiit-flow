---
description: Create a pull request from the current branch, with a title in the team's format.
argument-hint: "[type] [--base-branch <branch>] [--draft]"
order: 2
disable-model-invocation: true
allowed-tools: Read(/${CLAUDE_PLUGIN_ROOT}/groups/**), Bash(git status:*), Bash(git log:*), Bash(git diff:*), Bash(git branch:*), Bash(git rev-parse:*), Bash(git remote show:*), Bash(gh pr create:*), Bash(gh pr list:*), Bash(gh issue view:*), Bash(${CLAUDE_PLUGIN_ROOT}/groups/core/scripts/check-format.sh:*)
---
Groups folder: ${CLAUDE_PLUGIN_ROOT}/groups
Follow vcs/instructions/pr.md
