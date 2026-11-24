---
description: Create a branch from a ticket or a name, using the team's branch format.
argument-hint: "{ticket|name} [type] [--base-branch <branch>]"
order: 1
disable-model-invocation: true
allowed-tools: Read(/${CLAUDE_PLUGIN_ROOT}/groups/**), Bash(git fetch:*), Bash(git checkout -b:*), Bash(git remote show:*), Bash(git branch:*), Bash(git rev-parse:*), Bash(gh issue view:*), Bash(date:*), Bash(${CLAUDE_PLUGIN_ROOT}/groups/vcs/scripts/check-format.sh:*), Bash(git -C * fetch:*), Bash(git -C * checkout -b:*), Bash(git -C * remote show:*), Bash(git -C * branch:*), Bash(git -C * rev-parse:*)
---
Groups folder: ${CLAUDE_PLUGIN_ROOT}/groups
Follow vcs/instructions/branch.md
