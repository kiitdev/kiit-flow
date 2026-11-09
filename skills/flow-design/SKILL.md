---
description: Write the design, phases and status for a work item.
argument-hint: "[work-item] [mode] [--fresh]"
order: 3
disable-model-invocation: true
---

# flow-design

Turn the change into a design, numbered phases and a status list. The first run only: later changes are `/flow-revise`. Plans only, changes no code.

Read `.claude/kiit/flow/shared.md` first.

## Usage
```
USAGE: /flow-design [work-item] [mode] [--fresh]

  Write 02-design.md, 03-phases.md and _status.md. To change them later, use /flow-revise.


ARGUMENTS:
  [work-item] : Optional : a folder name or a unique prefix. Omit for the most recent
  [mode]      : Optional : flow or focus. Omit for flow
  [--fresh]   : Optional : start over, replacing an existing design


EXAMPLES:
  /flow-design
  /flow-design focus
```

## Steps
1. Resolve the work item and project (shared.md). Tell the user which.
   - `flow` or `focus` is the mode. The first other argument is the work item
   - No `01-change.md`: `error: no 01-change.md`, and suggest `/flow-begin`
2. Check for an existing design.
   - Any of the three files exists: `error: already designed`
   - Then suggest `/flow-revise`, or `/flow-design --fresh` to start over
   - With `--fresh`, the three files are replaced
   - `--fresh` and a `done` step: `error: steps are done`, use `/flow-revise`
3. Read the inputs.
   - `01-change.md`, and the ticket it links (Read a ticket, shared.md)
   - Anything in `_files/input/`
   - `_research.md`, if it exists. Use what it found, and don't look it up again
4. Read the `standards` resource, if the config has one, before designing anything.
   - Treat the standards as constraints on the design
5. Read the project repo.
   - Its `CLAUDE.md`, the code the change touches, and how similar code is done
   - Reuse existing utilities and patterns before proposing new ones
6. Pick the mode. Use the one given.
   - None given: `focus` if `_research.md` exists, else `flow`
   - Don't decide it from the risk. The user can move up to Focus later
7. Don't stop to ask the user. Settle anything unclear yourself.
   - Take the simplest reading that fits `01-change.md`
   - Write the answer under each question in `01-change.md` as `- Answer:`
   - Write other assumptions under `## Assumptions` in `02-design.md`
8. Write `02-design.md`, `03-phases.md` and `_status.md` (all in shared.md).
   - End each phase with a step for its tests. If it needs none, say why
   - `_status.md` starts with the Mode line, then every step as `todo`
   - Name the `_research.md` section behind a choice that rests on it
9. Add a row to `_history.md` (shared.md) with the mode and the phase and step counts.
10. Print a short summary, the mode, the assumptions made, and the next step.
   - Ask the user to review the files and discuss
   - An assumption rests on a fact nobody checked: suggest `/flow-research`
   - To change them, suggest `/flow-revise`. For a second view, `/flow-review`
   - Or `/flow-update` to start implementing
   - Mode `flow`: `/flow-review` or `/flow-revise` switches it to Focus
   - Mode `focus`: `update` asks for a review first (Review gate, shared.md)

## Rules
1. Write only inside the work item folder.
   - The only change to `01-change.md` is an `- Answer:` under a question
2. Add no scope beyond `01-change.md`.
