# Run steps

How `update` and `resume` carry out steps, and the two gates they apply first.
Shell calls follow core/content/shell.md.

## Gates
Apply the blocked gate, then the review gate. Wait if either asks.

### Blocked gate
Applies when `_status.md` has a `blocked` step. For each one, show the step and its
reason. Ask whether the blocker is resolved, and wait. The answer is one of:
1. Run `/kiit:flow-revise` with the new information.
2. Continue with a deviation the user states.
3. Continue because it is already fixed.

For 2 and 3, set the step back to `todo` and add a history row with the step and the answer.

### Review gate
Applies in two cases:
1. `04-review.md` exists and its verdict is `NEEDS_CHANGES`.
2. `_status.md` says `Mode: focus`, and there is no `04-review.md`.

In case 1 the review is open while any blocker or major finding is missing from its
`## Response` section, or is marked `open` there. When every one is `applied` or
`declined`, it is closed.
1. Closed: say so and go on.
2. Open: tell the user, and ask whether to continue or run `/kiit:flow-revise`. Wait.

In case 2, say the plan has not been reviewed. Ask whether to run `/kiit:flow-review` or
to continue without one. Wait. To continue, add a history row that says the review was skipped.

An `APPROVE` verdict needs no gate. With no `04-review.md` and a `flow` mode, no gate either.

## Run the steps
For each step, in order. Leave `done`, `skip` and `defer` steps alone, and say so.
1. Implement it in the project repo, following the design and the project's conventions.
   - The design names a `_research.md` section for it: read that section first
2. Run the narrowest check that covers it (flow/content/checks.md, Narrow check).
   - None found: that is `no check found`, never a pass
3. Set it to `done` in `_status.md` after the check passes, or when none was found.
   - None found: say so in the `_history.md` row and in the final report

## When to stop
Stop right away if any of these happens:
1. The design doesn't match the code (a file, API or assumption isn't there).
2. A step can't be done as written.
3. A check fails and the fix isn't clearly inside the step.

Then:
1. Set the step to `blocked` in `_status.md`, with a reason.
   - Say what happened and what the design assumed
   - `1.3 blocked | Move internals | Console expect missing in commonMain`
2. Add a history row with the step and the reason.
3. Tell the user, and ask what to do: run `/kiit:flow-revise` with the new information,
   or approve a specific deviation.
   - The blocker is a fact nobody checked: suggest `/kiit:flow-research` first
4. Never edit `02-design.md` or `03-phases.md`, and never work around a blocker.

## Report
Short: the steps done, left alone, deferred and left, then the next step. No restating
of the code that changed.
