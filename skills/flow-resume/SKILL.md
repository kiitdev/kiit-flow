---
description: Cold-start a work item and continue its implementation where it stopped.
argument-hint: "[work-item] [scope]"
order: 8
disable-model-invocation: true
---

# flow-resume

Cold start: read the whole work item, find where it stopped, and run the steps that are left. Adds no scope beyond them.

Read `.claude/kiit/flow/shared.md` first.

## Usage
```
USAGE: /flow-resume [work-item] [scope]

  Read the whole work item, find where it stopped, and run the steps that are left.


ARGUMENTS:
  [work-item] : Optional : a folder name or a unique prefix. Omit for the most recent
  [scope]     : Optional : next, phase or all. Omit for phase


EXAMPLES:
  /flow-resume
  /flow-resume 260928-kiit-codes-fix-1234 all
```

## Steps
1. Resolve the work item and project (shared.md). Tell the user which.
   - `next`, `phase` or `all` is the scope. The first other one is the work item
   - No such work item: suggest `/flow-begin`
2. Read the work item from the start.
   - `01-change.md`, `02-design.md` and `03-phases.md`
   - `04-review.md`, if it exists, every finding
   - `_research.md`, if it exists: the Log table
   - No design or phases: `error: no design yet`, and suggest `/flow-design`
3. Read `_status.md`, then the last 10 rows of `_history.md`.
   - No `_status.md`: `error: no status yet`, and suggest `/flow-design`
4. Find where things stand.
   - Last done: the last `done` step, or all of them if several sit together
   - Resume point: the first `todo` or `blocked` step, ignoring `skip`
   - A `todo` before a `done` step is a gap: start at the `todo`, and say so
5. Nothing `todo` or `blocked`: say it is complete, add a history row, and stop.
   - Suggest `/flow-verify`, then `/flow-review code`
6. Apply the blocked gate and the review gate (shared.md). Wait if either asks.
7. Tell the user where things stand, in a few lines.
   - What the change is, and how many steps are done, left and skipped
   - The last history row, and the steps about to run
8. Check the resume point for half-done work before writing.
   - Read the files it touches (`git status` and `git diff` are fine)
   - Finish what is there. Don't redo or duplicate it
9. Run the steps (Run steps, shared.md), up to the scope.
   - `next`: the resume point only
   - `phase`: to the end of the resume point's phase
   - `all`: every `todo` or `blocked` step
10. Add a row to `_history.md`, and report what is done, left alone and left.
    - Steps remain: suggest `/flow-resume`
    - All done: suggest `/flow-verify`, then `/flow-review code`

## Rules
1. Change only the project repo and `_status.md`, and add rows to `_history.md`.
2. Never edit `02-design.md` or `03-phases.md`. If the design is wrong, stop and say so.
3. The resume point is the first `todo` or `blocked` step in `_status.md`. Don't guess it.
