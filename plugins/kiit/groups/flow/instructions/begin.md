# flow-begin

Create a work item: its folder, `01-change.md` and `_history.md`. It designs and
implements nothing.

Read first:
- core/content/cli.md
- core/content/config.md
- core/content/shell.md
- core/content/tickets.md
- flow/content/intake.md
- flow/content/work-item.md
- flow/content/templates.md

## Usage
```
USAGE: /kiit:flow-begin [project] [type] {ticket|description}

  Create a work item: a folder with 01-change.md and _history.md.


ARGUMENTS:
  [project]     : Optional : a project name or alias. Needed with a description
  [type]        : Optional : feat fix build chore ci docs perf refactor revert style test
                             (feature = feat, tests = test). Needed with a description
  {ticket}      : Required : 1234, #1234, ABC-123 or an issue URL (GitHub, Jira, ...)
  {description} : Required : used when there is no ticket: the requirements


EXAMPLES:
  /kiit:flow-begin https://github.com/kiitdev/kiit-flow/issues/24
  /kiit:flow-begin kiit-inputs feat port the service id to typescript
```

## Steps
1. Help check: print Usage and stop (core/content/cli.md).
2. Find the workspace and read `kiit.json` (core/content/config.md).
3. Check the group folder: `ls -d _kiit/flow/items`, as one call from the root.
   - Missing: `error: _kiit/flow/items not found`, then `/kiit:init`, and stop
4. Identify the change: project, type, and ticket or description (flow/content/intake.md).
5. Look for an item of the same ticket (flow/content/work-item.md).
   - One exists: `error: {name} already exists`, and stop. Never make a second item
6. Create the work item (flow/content/work-item.md): folder, files and `recent`.
7. Print the folder name, the project path, and the next step, `/kiit:flow-design`.
   - It is not ported yet: print the command and do not run it

## Rules
1. Create files only inside the new work item folder, and set `recent` in `state.json`.
2. Read tickets only. Use `gh` and page fetches to read, never to change anything.
3. Never create `_kiit/flow` or `items/`. That is `/kiit:init`.
4. Never write `kiit.json`. A project not in it is an `error:`, then `/kiit:init`.
