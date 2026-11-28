# Revise inputs

What `revise` applies besides the user's text. Writes only inside the work item folder.

## Review findings
1. Read `04-review.md`, including any `## Response`. Skip findings already `applied`.
2. Blocker and major: apply to `02-design.md`, `03-phases.md` and `_status.md`.
   - Needs a decision: ask the user
3. Minor and nit: apply the ones where the fix is small and clearly right.
   - Say why the others were left
4. Marked `disputed`: don't apply. Mention them in the report.
5. About code that is already written: the design can't undo a `done` step.
   - Add new `todo` steps (a new phase if there are several) that make the fix
   - Leave the `done` steps alone
6. Record what happened.
   - A line under `## Changes` in `02-design.md`: finding numbers, what changed
   - A `## Response` at the end of `04-review.md` (flow/content/review.md)

## Blocked steps
`update` and `resume` mark a step `blocked`, with a reason. For each blocked step:
1. Check the claim against the project code. The reason is a report, not something seen.
   - Read the files the step touches
2. The design is wrong: fix `02-design.md` and `03-phases.md`, then `_status.md`.
   - Reword the step in place and set it back to `todo`
   - Renumber nothing that is `done` or referred to by other steps
   - Add new steps at the end of that phase, or in a new phase
3. It needs a decision: ask the user, and leave the step `blocked` until then.
4. Not a design problem (environment, tool, unrelated test): leave the design alone.
   - Say so in the report and leave the step `blocked`
5. A step that goes back to `todo` gets a line under `## Changes` in `02-design.md`.

## Research
Findings in `_research.md` that the design does not reflect yet are inputs too.
`_research.md` is read only here. New research is `/kiit:flow-research`.
