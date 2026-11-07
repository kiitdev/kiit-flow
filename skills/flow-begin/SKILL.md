---
description: Create a work item from a ticket or a description.
argument-hint: "[project] [type] {ticket|description}"
order: 1
disable-model-invocation: true
---

# flow-begin

Create a work item: its folder, `01-change.md` and `_history.md`. Designs and implements nothing.

Read `.claude/kiit/flow/shared.md` first.

## Usage
```
USAGE: /flow-begin [project] [type] {ticket|description}

  Create a work item: a folder with 01-change.md and _history.md.


ARGUMENTS:
  [project]     : Optional : a project name or alias. Needed with a description
  [type]        : Optional : feat fix build chore ci docs perf refactor revert style
                             test (feature = feat, tests = test)
                             Needed with a description
  {ticket}      : Required : 1234, #1234, ABC-123 or an issue URL (GitHub, Jira, ...)
  {description} : Required : used when there is no ticket: the requirements


EXAMPLES:
  /flow-begin https://github.com/kiitdev/kiit-codes/issues/12
  /flow-begin kiit-inputs feat port the service id to typescript
```

## Steps
1. Identify the change (shared.md): the project, the type, and the ticket or description.
2. Create the work item (shared.md).
3. Print the folder name, the project path, and the next step, `/flow-design`.

## Rules
1. Create files only inside the new work item folder.
2. Read tickets only. Use `gh` and page fetches to read, never to change anything.
