# flow-update

Implement the design in the project repo and track each step in `_status.md`. Adds no
scope beyond the steps.

Read first:
- core/content/cli.md
- core/content/config.md
- core/content/shell.md
- flow/content/work-item.md
- flow/content/phases.md
- flow/content/status.md
- flow/content/gates.md
- flow/content/run-steps.md
- flow/content/checks.md

## Usage
```
USAGE: /kiit:flow-update [work-item] [part]

  Implement the design: all phases, a phase, a step, a range, or a list.


ARGUMENTS:
  [work-item] : Optional : a folder name or a unique prefix. Omit for the most recent
  [part]      : Optional : all, 1, 1.2, 1.2-1.4, 1-3, 1.2-3.1 or 1,3. Omit for all


EXAMPLES:
  /kiit:flow-update 1
  /kiit:flow-update 261125-003-kiit-codes-fix-1234 1.2-1.4
```

## Steps
1. Help check: print Usage and stop (core/content/cli.md).
2. Find the workspace and read `kiit.json` (core/content/config.md).
3. Check the group folder: `ls -d _kiit/flow/items`, as one call from the root.
   - Missing: `error: _kiit/flow/items not found`, then `/kiit:init`, and stop
4. Resolve the work item and tell the user which (flow/content/work-item.md).
   - The part is the argument that matches a part (flow/content/phases.md)
   - The other argument is the work item
5. Read `02-design.md`, `03-phases.md` and `_status.md`.
   - Any missing: `error: no design yet`, then `/kiit:flow-design`, and stop
6. Apply the blocked gate and the review gate (flow/content/gates.md).
7. Resolve the part to a list of steps. No part, or `all`: every phase.
8. Leave `done`, `skip` and `defer` steps alone, and say so.
   - An earlier step left `todo` or `blocked`: ask before going on
9. Run the steps (flow/content/run-steps.md).
   - A part across phases runs straight through. It stops only on a blocker
10. Add a `_history.md` row with the steps done and any blocked.
11. Print the report (flow/content/run-steps.md), then the next step.
    - Steps remain: `/kiit:flow-update` or `/kiit:flow-resume`
    - All done: `/kiit:flow-verify`, then `/kiit:flow-review code`

## Rules
1. Change only the project repo and `_status.md`, and add rows to `_history.md`.
2. Never edit `02-design.md` or `03-phases.md`. If the design is wrong, stop and say so.
3. Add no scope beyond the step.
4. Read-only git. Never stage, commit or push.
