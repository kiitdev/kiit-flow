---
description: Do a clear, low-risk change in one pass: no design, just implement and check.
argument-hint: "[project] [type] {ticket|description}"
order: 2
disable-model-invocation: true
---

# flow-go

The fast path for a clear, low-risk change: create a minimal work item, implement it, and check it. It writes no design, phases or status. Hands off to `/flow-design` if the change needs a design or is risky.

Read `.claude/kiit/flow/shared.md` first.

## Usage
```
USAGE: /flow-go [project] [type] {ticket|description}

  Do a clear, low-risk change in one pass: create a work item, implement it, and check it.


ARGUMENTS:
  [project]      : Optional : a project name or alias. Needed with a description
  [type]         : Optional : feat fix build chore ci docs perf refactor revert style
                              test (feature = feat, tests = test)
                              Needed with a description
  {ticket}       : Required : 1234, #1234, ABC-123 or an issue URL (GitHub, Jira, ...)
  {description}  : Required : used when there is no ticket: the change to make


EXAMPLES:
  /flow-go https://github.com/kiitdev/kiit-codes/issues/12
  /flow-go kiit-codes docs fix a typo in the status code table
```

## Steps
1. Identify the change (shared.md): the project, the type, and the ticket or description.
2. Read what the change needs.
   - The `standards` resource, if the config has one
   - The project's `CLAUDE.md`, and `AGENTS.md` if it points there
   - The code the change touches
   - The build, test and lint commands, from those files
3. Create the work item (shared.md).
   - Write the acceptance criteria and keep every constraint, as shared.md says
4. Find an anchor. References is empty: find one existing example of the same kind.
   - Add its path and why under References
   - None exists: leave References empty
5. Check before editing. If it needs a design choice, is unclear or is risky, hand off.
   - Risky: auth or secrets, data or migrations, build or release,
     or a breaking change to a public API
   - Add a row to `_history.md` (shared.md): `not one-pass, handed to Flow`
   - Print `go: this change needs a design or a review`, then `/flow-design`
   - Change no code, and stop
6. Implement the change in the project repo, following its conventions.
   - Follow References, and keep to Scope and Constraints
   - Do what the request asks and no more
   - The change needs more than Scope allows: stop and report it
7. Run the narrowest check that covers the acceptance criteria.
   - Use the project's own test command. Add a test when the behavior is new
   - No check can be found: report `no check found`. Don't call it passed
   - It fails and the fix isn't clearly inside the change: stop and report it
8. Add a row to `_history.md` (shared.md) with what changed and the check result.
9. Print the files changed and the check result, then the next step.
   - Suggest `/flow-verify` for the full set of checks

## Rules
1. Change only the project repo and the new work item folder.
2. On a hand-off, write only the work item. Change no code.
3. Write no design, phases or status. To grow the change, run `/flow-design` on it.
