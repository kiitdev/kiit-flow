---
description: Write or update the design, phases and status for a work item.
argument-hint: "[work-item] [feedback...]"
order: 2
disable-model-invocation: true
---

# flow-design

Turn the change into a design, numbered phases and a status list. Plans only, changes no code.

Read `.claude/kiit/flow/shared.md` first.

## Usage
```
USAGE: /flow-design [work-item] [feedback...]

  Write 02-design.md, 03-phases.md and _status.md. Run it again to revise them with
  your feedback, a review, or a blocked step.


ARGUMENTS:
  [work-item] : Optional : a folder name or a unique prefix. Omit for the most recent
  [feedback]  : Optional : on a re-run, what to change, in your words


EXAMPLES:
  /flow-design
  /flow-design 260928-kiit-codes-fix-1234 make phase 2 smaller
```

## Steps
1. Resolve the work item and project (shared.md). Tell the user which.
   - The first argument is the work item if it matches one. The rest is feedback
   - No `01-change.md`: `error: no 01-change.md`, and suggest `/flow-begin`
2. Read the inputs.
   - `01-change.md`, and the ticket it links (Read a ticket, shared.md)
   - Anything in `_files/input/`
   - `04-review.md` and `_status.md`, if they exist
3. Read the `standards` resource, if the config has one, before designing anything.
   - Treat the standards as constraints on the design
4. Read the project repo.
   - Its `CLAUDE.md`, the code the change touches, and how similar code is done
   - Reuse existing utilities and patterns before proposing new ones
5. Don't stop to ask the user. Settle anything unclear yourself.
   - Take the simplest reading that fits `01-change.md`
   - Write the answer under each Open question in `01-change.md` as `- Answer:`
   - Leave an answer that is already there alone
   - Write other assumptions under `## Assumptions` in `02-design.md`
6. Write the three files below. If they exist this is a re-run: apply Re-runs first.
   - Update the files in place
   - End each phase with a step for its tests. If it needs none, say why
   - Keep `done` steps `done`, and `skip` steps `skip`
   - Add a line under `## Changes` in `02-design.md` saying what changed and why
7. Add a row to `_history.md` (shared.md).
   - First run: the phase and step counts. Re-run: what changed
8. Print a short summary, the assumptions made, and the next step.
   - Ask the user to review the files and discuss. Run it again to revise
   - Review findings applied: say which, and suggest `/flow-review` to confirm
   - Blocked steps resolved: say which, then `/flow-update` or `/flow-resume`
   - Otherwise suggest `/flow-review`, or `/flow-update` to skip the review

## Re-runs
A re-run has up to three inputs. Apply each one that is there.

### Your feedback
1. The text after the work item is feedback. Apply it to the design and the phases.
   - Do what it asks and no more
2. Say what changed under `## Changes` in `02-design.md`.

### Review findings
1. Read `04-review.md`, including any `## Response`. Skip findings already `applied`.
2. Blocker and major: apply to `02-design.md`, `03-phases.md` and `_status.md`.
   - Needs a decision: leave it unapplied, mark it `open`, and report it
3. Minor and nit: apply the ones where the fix is small and clearly right.
   - Say why the others were left
4. Marked `disputed`: don't apply. Mention them in the report.
5. About code that is already written: the design can't undo a `done` step.
   - Add new `todo` steps (a new phase if there are several) that make the fix
   - Leave the `done` steps alone
6. Record what happened.
   - A line under `## Changes` in `02-design.md`: finding numbers, what changed
   - A `## Response` at the end of `04-review.md`, as below
7. A result is `applied`, `declined` (with the reason) or `open` (waiting on the user).
   - `declined` for a blocker or major only if `disputed` or the user chose it
   - Open and closed reviews are defined by the Review gate (shared.md)
   - A new `/flow-review` replaces the file and starts clean

```markdown
## Response
| # | Result | Note |
|---|---|---|
| 1 | applied | Approach in 02-design.md rewritten, step 2.4 added |
| 2 | declined | Disputed, the current approach stays |
| 3 | open | Needs a decision on the database choice |
```

### Blocked steps
`update` and `resume` mark a step `blocked`, with a reason. For each blocked step:

1. Check the claim against the project code. The reason is a report, not something seen.
   - Read the files the step touches
2. The design is wrong: fix `02-design.md` and `03-phases.md`, then `_status.md`.
   - Reword the step in place and set it back to `todo`
   - Renumber nothing that is `done` or referred to by other steps
   - Add new steps at the end of that phase, or in a new phase
3. It needs a decision: leave the step `blocked`, and say what is needed.
4. Not a design problem (environment, tool, unrelated test): leave the design alone.
   - Say so in the report and leave the step `blocked`
5. A step that goes back to `todo` gets a line under `## Changes` in `02-design.md`.

## Template
`03-phases.md` and `_status.md` have their formats in shared.md. This is `02-design.md`:

```markdown
# Design: {title}

## Context
<!-- Why this change, what it should do -->

## Assumptions
<!-- Choices made without asking, other than the Open questions in 01-change.md -->

## Approach
<!-- The chosen approach only, not the alternatives -->

## Files
<!-- Files to create or change, relative to the project. Describe repeated patterns once. -->

## Reuse
<!-- Existing code and utilities to use, with paths -->

## Constraints
<!-- Standards, compatibility, dependency rules that apply -->

## Verification
<!-- How to test this end to end, and the tests to add -->

## Changes
<!-- Re-runs only: what changed and why -->
```

## Rules
1. Write only inside the work item folder.
   - The only change to `01-change.md` is an `- Answer:` under an open question
   - The only change to `04-review.md` is its `## Response`
2. Add no scope beyond `01-change.md`.
