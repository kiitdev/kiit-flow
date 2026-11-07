---
description: Implement the design for all phases, a phase, a step or a range.
argument-hint: "[work-item] [part]"
order: 6
disable-model-invocation: true
---

# flow-update

Implement the design in the project repo and track each step in `_status.md`. Adds no scope beyond the steps.

Read `.claude/kiit/flow/shared.md` first.

## Usage
```
USAGE: /flow-update [work-item] [part]

  Implement the design: all phases, a phase, a step, a range, or a list.


ARGUMENTS:
  [work-item] : Optional : a folder name or a unique prefix. Omit for the most recent
  [part]      : Optional : all, 1, 1.2, 1.2-1.4, 1-3, 1.2-3.1 or 1,3. Omit for all


EXAMPLES:
  /flow-update 1
  /flow-update 260928-kiit-codes-fix-1234 1.2-1.4
```

## Steps
1. Resolve the work item and project (shared.md). Tell the user which.
   - The part is the argument that matches a part (Parts, shared.md)
   - The other argument is the work item
2. Read `02-design.md`, `03-phases.md` and `_status.md`.
   - Any missing: `error: no design yet`, and suggest `/flow-design`
3. Apply the review gate and the blocked gate (shared.md). Wait if either asks.
4. Resolve the part to a list of steps. No part, or `all`: every phase.
5. Leave `done` and `skip` steps alone, and say so.
   - An earlier step left `todo` or `blocked`: ask before going on
6. Run the steps (Run steps, shared.md).
   - A part across phases runs straight through. It stops only on a blocker
7. Add a row to `_history.md` (shared.md) with the steps done and any blocked.
8. Print what is done, left alone and left, then the next step.
   - Steps remain: suggest `/flow-update` or `/flow-resume`
   - All done: suggest `/flow-verify`, then `/flow-review code`

## Rules
1. Change only the project repo and `_status.md`, and add rows to `_history.md`.
2. Never edit `02-design.md` or `03-phases.md`. If the design is wrong, stop and say so.
3. Add no scope beyond the step.
