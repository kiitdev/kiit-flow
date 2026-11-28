# Gates

Checks `update` and `resume` apply before they run steps. Apply the blocked gate, then
the review gate. Wait if either asks. `revise` writes the review `## Response`
(flow/content/review.md).

## Blocked gate
Applies when `_status.md` has a `blocked` step. For each one, show the step and its
reason. Ask whether the blocker is resolved, and wait. The answer is one of:
1. Run `/kiit:flow-revise` with the new information.
2. Continue with a deviation the user states.
3. Continue because it is already fixed.

For 2 and 3, set the step back to `todo` and add a history row with the step and the answer.

## Review gate
Applies in two cases:
1. `04-review.md` exists and its verdict is `NEEDS_CHANGES`.
2. `_status.md` says `Mode: focus`, and there is no `04-review.md`.

In case 1 the review is open while any blocker or major finding is missing from its
`## Response` section, or is marked `open` there. When every one is `applied` or
`declined`, it is closed.
1. Closed: say so and go on.
2. Open: tell the user, and ask whether to continue or run `/kiit:flow-revise`. Wait.

Case 2 is a notice, never a wait. Say in one line that the plan has not been reviewed,
and that `/kiit:flow-review` is available. Go on, and add that to the history row.
A work item moved to Focus by `revise` or `research` is never held for a review.

An `APPROVE` verdict needs no gate. With no `04-review.md` and a `flow` mode, no gate either.
