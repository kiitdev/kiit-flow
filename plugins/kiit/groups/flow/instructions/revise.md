# flow-revise

Change an existing design: apply your text, review findings and blocked steps, and talk
it through when needed. Plans only, changes no code.

Read first:
- core/content/cli.md
- core/content/config.md
- core/content/shell.md
- flow/content/work-item.md
- flow/content/design.md
- flow/content/phases.md
- flow/content/status.md
- flow/content/review.md
- flow/content/revise-inputs.md

## Usage
```
USAGE: /kiit:flow-revise [work-item] [text...]

  Revise 02-design.md, 03-phases.md and _status.md from your text, a review, or a
  blocked step.


ARGUMENTS:
  [work-item] : Optional : a folder name or a unique prefix. Omit for the most recent
  [text]      : Optional : what to change, or a question, in your words


EXAMPLES:
  /kiit:flow-revise make phase 2 smaller
  /kiit:flow-revise 261125-003-kiit-codes-fix-1234 should the rollback be its own phase?
```

## Steps
1. Help check: print Usage and stop (core/content/cli.md).
2. Find the workspace and read `kiit.json` (core/content/config.md).
3. Check the group folder: `ls -d _kiit/flow/items`, as one call from the root.
   - Missing: `error: _kiit/flow/items not found`, then `/kiit:init`, and stop
4. Resolve the work item and tell the user which (flow/content/work-item.md).
   - The first argument is the work item if it matches one. The rest is text
   - No design yet: `error: no design yet`, then `/kiit:flow-design`, and stop
5. Read the work item: `01-change.md`, `02-design.md`, `03-phases.md`, `_status.md`,
   and `04-review.md` and `_research.md` if they exist.
   - The `standards` resource, if `kiit.json` has one. The design respects it
6. Work out what to apply (flow/content/revise-inputs.md). Use each input that is there.
   - Your text, review findings, `blocked` steps, and research the design lacks
   - None of these: say there is nothing to revise, and stop
7. Talk it through when it helps. Ask the user, and wait for the answer.
   - Your text is a question: answer it, and edit only if the answer needs it
8. Update `02-design.md`, `03-phases.md` and `_status.md` in place.
   - Keep `done` steps `done`, and `skip` and `defer` steps as they are
   - Leave the mode as it is (flow/content/status.md)
   - Set it to `flow` only when your text asks
   - Renumber nothing that is `done` or referred to by other steps
   - Add new steps at the end of a phase, or in a new phase
   - Drop a `todo` or `blocked` step by setting it to `skip`, with a reason
   - A `done` step can't be dropped: add a step that undoes it
   - Add a line under `## Changes` in `02-design.md`: what changed and why
9. Add a `_history.md` row with what changed (flow/content/work-item.md).
10. Print a short report: what changed, what is still open, and the next step.
    - `/kiit:flow-review` to confirm, or `/kiit:flow-update` or `/kiit:flow-resume`

## Rules
1. Write only inside the work item folder.
   - The only change to `01-change.md` is an `- Answer:` under a question
   - The only change to `04-review.md` is its `## Response`
   - `_research.md` is read only here. New research is `/kiit:flow-research`
2. Add no scope beyond what the text, the review or the blocked step asks for.
3. Revising never requires a review. `update` only notes that none was done.
