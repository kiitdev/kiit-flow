# Run steps

How `update` and `resume` carry out steps, after the gates.
Shell calls follow core/content/shell.md.

## Gates
Apply the blocked gate and the review gate first (flow/content/gates.md).

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
