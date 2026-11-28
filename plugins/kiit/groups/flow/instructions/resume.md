# flow-resume

Cold start: read the whole work item, find where it stopped, and run the steps that are
left. Adds no scope beyond them.

Read first:
- core/content/cli.md
- core/content/config.md
- core/content/shell.md
- flow/content/work-item.md
- flow/content/status.md
- flow/content/run-steps.md
- flow/content/checks.md

## Usage
```
USAGE: /kiit:flow-resume [work-item] [scope]

  Read the whole work item, find where it stopped, and run the steps that are left.


ARGUMENTS:
  [work-item] : Optional : a folder name or a unique prefix. Omit for the most recent
  [scope]     : Optional : next, phase or all. Omit for phase


EXAMPLES:
  /kiit:flow-resume
  /kiit:flow-resume 261125-003-kiit-codes-fix-1234 all
```

## Steps
1. Help check: print Usage and stop (core/content/cli.md).
2. Find the workspace and read `kiit.json` (core/content/config.md).
3. Check the group folder: `ls -d _kiit/flow/items`, as one call from the root.
   - Missing: `error: _kiit/flow/items not found`, then `/kiit:init`, and stop
4. Resolve the work item and tell the user which (flow/content/work-item.md).
   - `next`, `phase` or `all` is the scope. The first other one is the work item
5. Read the work item from the start.
   - `01-change.md`, `02-design.md` and `03-phases.md`
   - `04-review.md` if it exists: every finding
   - `_research.md` if it exists: the Log
   - No design or phases: `error: no design yet`, then `/kiit:flow-design`
6. Read `_status.md`, then the last 10 rows of `_history.md`.
   - No `_status.md`: `error: no status yet`, then `/kiit:flow-design`, and stop
7. Find where things stand.
   - Last done: the last `done` step, or all of them if several sit together
   - Resume point: the first `todo` or `blocked` step, not `skip` or `defer`
   - A `todo` before a `done` step is a gap: start at the `todo`, and say so
8. Nothing `todo` or `blocked`: say it is complete, add a history row, and stop.
   - Suggest `/kiit:flow-verify`, then `/kiit:flow-review code`
9. Apply the blocked gate and the review gate (flow/content/run-steps.md).
10. Tell the user where things stand, in a few lines.
    - How many steps are done, left, skipped and deferred
    - The last history row, and the steps about to run
11. Check the resume point for half-done work before writing.
    - Read the files it touches. `git status` and `git diff` are fine
    - Finish what is there. Don't redo or duplicate it
12. Run the steps (flow/content/run-steps.md), up to the scope.
    - `next`: the resume point only
    - `phase`: to the end of the resume point's phase
    - `all`: every `todo` or `blocked` step
13. Add a `_history.md` row, and print the report.
    - Steps remain: `/kiit:flow-resume`
    - All done: `/kiit:flow-verify`, then `/kiit:flow-review code`

## Rules
1. Change only the project repo and `_status.md`, and add rows to `_history.md`.
2. Never edit `02-design.md` or `03-phases.md`. If the design is wrong, stop and say so.
3. The resume point is the first `todo` or `blocked` step in `_status.md`. Don't guess it.
4. Read-only git. Never stage, commit or push.
