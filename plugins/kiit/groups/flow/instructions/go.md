# flow-go

The fast path for a clear, low-risk change: make a minimal work item, implement it, check
it. It writes no design, phases or status. A change that needs a design is handed off.

Read first:
- core/content/cli.md
- core/content/config.md
- core/content/shell.md
- core/content/tickets.md
- flow/content/intake.md
- flow/content/work-item.md
- flow/content/checks.md

## Usage
```
USAGE: /kiit:flow-go [project] [type] {ticket|description} [--check] [--auto]

  Do a clear, low-risk change in one pass: create a work item, implement it, check it.


ARGUMENTS:
  [project]     : Optional : a project name or alias. Needed with a description
  [type]        : Optional : feat fix build chore ci docs perf refactor revert style test
                             (feature = feat, tests = test). Needed with a description
  {ticket}      : Required : 1234, #1234, ABC-123 or an issue URL (GitHub, Jira, ...)
  {description} : Required : used when there is no ticket: the change to make


FLAGS:
  [--check]     : Optional : also run the project's lint and unit tests
  [--auto]      : Optional : branch, commit, push and open a pull request


EXAMPLES:
  /kiit:flow-go https://github.com/kiitdev/kiit-codes/issues/12
  /kiit:flow-go kiit-codes docs fix a typo in the status code table --check
```

## Steps
1. Help check: print Usage and stop (core/content/cli.md).
2. Find the workspace and read `kiit.json` (core/content/config.md). Take the flags out.
3. Check the group folder: `ls -d _kiit/flow/items`, as one call from the root.
   - Missing: `error: _kiit/flow/items not found`, then `/kiit:init`, stop
4. Identify the change: project, type, and ticket or description (flow/content/intake.md).
5. Find the work item of the ticket by name (flow/content/work-item.md).
   - None: create it (flow/content/work-item.md), and read flow/content/templates.md
   - A match with only `01-change.md` and `_history.md`: reuse it, and say which
   - A match with `02-design.md`: hand off (flow/content/work-item.md)
   - A bare `go` after a `begin` finds that item this way
6. Read what the change needs: the project's `CLAUDE.md` and `AGENTS.md`, the code it
   touches, and the build, test and lint commands.
7. Find an anchor if `01-change.md` names none: one existing example of the kind.
   - Add its path and why to `01-change.md`. None exists: skip this
8. Hand off if the change needs a design choice, is unclear or is risky
   (flow/content/work-item.md). Change no code, and stop.
9. Implement the change in the project repo, following its conventions.
   - Do what `01-change.md` asks and no more. It needs more than it allows: stop and report
10. Run the narrow check, then the secret scan (flow/content/checks.md).
    - `--check`: then lint and unit tests
    - A failed check or finding stops the run: report it and add its history row
    - `--auto`: then follow the After the checks part of flow/content/auto.md
11. Add a `_history.md` row with what changed and the check results.
12. Set `recent` (flow/content/work-item.md).
13. Print the files changed and each check result, then the next step.
    - Print `/kiit:flow-verify` for the full set of checks

## Rules
1. Change only the project repo and the work item, and set `recent` in `state.json`.
2. On a hand-off, write only the work item. Change no code.
3. Write no design, phases or status. To grow the change, run `/kiit:flow-design` on it.
4. Never create group folders or write `kiit.json`.
5. Read-only git. Only `--auto` stages, commits, pushes and opens a pull request.
