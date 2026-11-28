# flow-design

Turn the change into a design, numbered phases and a status list. Plans only, changes
no code.

Read first:
- core/content/cli.md
- core/content/config.md
- core/content/shell.md
- core/content/tickets.md
- flow/content/work-item.md
- flow/content/design.md
- flow/content/phases.md
- flow/content/status.md

## Usage
```
USAGE: /kiit:flow-design [work-item] [mode] [--fresh]

  Write 02-design.md, 03-phases.md and _status.md for a work item.


ARGUMENTS:
  [work-item] : Optional : a folder name or a unique prefix. Omit for the most recent
  [mode]      : Optional : flow or focus. Omit for flow


FLAGS:
  [--fresh]   : Optional : start over, replacing an existing design


EXAMPLES:
  /kiit:flow-design
  /kiit:flow-design focus
```

## Steps
1. Help check: print Usage and stop (core/content/cli.md).
2. Find the workspace and read `kiit.json` (core/content/config.md). Take the flags out.
3. Check the group folder: `ls -d _kiit/flow/items`, as one call from the root.
   - Missing: `error: _kiit/flow/items not found`, then `/kiit:init`, and stop
4. Resolve the work item and tell the user which (flow/content/work-item.md).
   - `flow` or `focus` is the mode. The first other argument is the work item
   - No `01-change.md`: `error: no 01-change.md`, then `/kiit:flow-begin`
5. Check for an existing design.
   - Any of the three files exists: `error: already designed`, and stop
   - Suggest `/kiit:flow-revise`, or `--fresh` to start over
   - `--fresh` replaces the three files
   - With a `done` step: `error: steps are done`
6. Read the inputs.
   - `01-change.md`, and the ticket it links (core/content/tickets.md)
   - Anything in `_files/input/`, and `_research.md` if it exists
   - The `standards` resource, if `kiit.json` has one: treat it as constraints
7. Read the project repo: its `CLAUDE.md`, the code the change touches, and how similar
   code is done. Reuse existing utilities and patterns before proposing new ones.
8. Pick the mode: the one given, else `focus` if `_research.md` exists, else `flow`.
   - Don't decide it from the risk. The user can move up to Focus later
9. Settle anything unclear yourself. Don't stop to ask.
   - Take the simplest reading that fits `01-change.md`
   - Write the answer under each question in `01-change.md` as `- Answer:`
   - Write other assumptions under `## Assumptions` in `02-design.md`
10. Write `02-design.md` (flow/content/design.md), `03-phases.md` (flow/content/phases.md)
    and `_status.md` (flow/content/status.md), with every step `todo`.
11. Add a `_history.md` row with the mode and the phase and step counts
    (flow/content/work-item.md).
12. Print a short report, at most 8 lines (core/content/cli.md).
    - The files, the mode, the counts and the assumptions, one line each
    - Next: discuss or adjust it, `/kiit:flow-update`, or `/kiit:flow-review`
    - An assumption nobody checked: suggest `/kiit:flow-research`

## Rules
1. Write only inside the work item folder. The only change to `01-change.md` is an
   `- Answer:` under a question.
2. Add no scope beyond `01-change.md`.
3. After the report the user can discuss the design. Changes they ask for in the
   same session go straight into the three files.
   - The mode never changes. Add a `_history.md` row, `adjusted design`
   - Only `review` and `revise` move `flow` to `focus` (flow/content/status.md)
4. Never create group folders or write `kiit.json`.
