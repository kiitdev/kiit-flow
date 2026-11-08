---
description: Revise the design and phases from your text, a review, or a blocked step.
argument-hint: "[work-item] [text...]"
order: 6
disable-model-invocation: true
---

# flow-revise

Change an existing design: apply your text, review findings and blocked steps, and talk it through when needed. Plans only, changes no code.

Read `.claude/kiit/flow/shared.md` first.

## Usage
```
USAGE: /flow-revise [work-item] [text...]

  Revise 02-design.md, 03-phases.md and _status.md from your text, a review, or a
  blocked step.


ARGUMENTS:
  [work-item] : Optional : a folder name or a unique prefix. Omit for the most recent
  [text]      : Optional : what to change, or a question, in your words


EXAMPLES:
  /flow-revise make phase 2 smaller
  /flow-revise 260928-kiit-codes-fix-1234 should the rollback be its own phase?
```

## Steps
1. Resolve the work item and project (shared.md). Tell the user which.
   - The first argument is the work item if it matches one. The rest is text
   - No design yet: `error: no design yet`, and suggest `/flow-design`
2. Read the work item.
   - `01-change.md`, `02-design.md`, `03-phases.md` and `_status.md`
   - `04-review.md`, if it exists
   - `_research.md`, if it exists
   - The `standards` resource, if the config has one. The design must respect it
3. Work out what to apply. Use each input that is there.
   - Your text
   - Findings in `04-review.md` that are not `applied` (Review findings)
   - `blocked` steps in `_status.md` (Blocked steps)
   - Findings in `_research.md` that the design does not reflect yet
   - None of these: say there is nothing to revise, and stop
4. Talk it through when it helps. Ask the user, and wait for the answer.
   - Your text is a question: answer it, and edit only if the answer needs it
   - A choice changes the design, or a finding needs a decision
5. Update `02-design.md`, `03-phases.md` and `_status.md` in place.
   - Keep `done` steps `done`, and `skip` steps `skip`
   - Renumber nothing that is `done` or referred to by other steps
   - Add new steps at the end of a phase, or in a new phase
   - Drop a `todo` or `blocked` step by setting it to `skip`, with a reason
   - A `done` step can't be dropped: add a step that undoes it
   - Add a line under `## Changes` in `02-design.md`: what changed and why
6. Add a row to `_history.md` (shared.md) with what changed.
7. Print a short summary and the next step.
   - What changed, and what is still open
   - Suggest `/flow-review` to confirm, or `/flow-update` or `/flow-resume`

## Review findings
1. Read `04-review.md`, including any `## Response`. Skip findings already `applied`.
2. Blocker and major: apply to `02-design.md`, `03-phases.md` and `_status.md`.
   - Needs a decision: ask the user (step 4)
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

## Blocked steps
`update` and `resume` mark a step `blocked`, with a reason. For each blocked step:

1. Check the claim against the project code. The reason is a report, not something seen.
   - Read the files the step touches
2. The design is wrong: fix `02-design.md` and `03-phases.md`, then `_status.md`.
   - Reword the step in place and set it back to `todo`
   - Renumber nothing that is `done` or referred to by other steps
   - Add new steps at the end of that phase, or in a new phase
3. It needs a decision: ask the user (step 4), and leave the step `blocked` until then.
4. Not a design problem (environment, tool, unrelated test): leave the design alone.
   - Say so in the report and leave the step `blocked`
5. A step that goes back to `todo` gets a line under `## Changes` in `02-design.md`.

## Rules
1. Write only inside the work item folder.
   - The only change to `01-change.md` is an `- Answer:` under an open question
   - The only change to `04-review.md` is its `## Response`
   - `_research.md` is read only here. New research is `/flow-research`
2. Add no scope beyond what the text, the review or the blocked step asks for.
