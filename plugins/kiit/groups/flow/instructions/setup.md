# flow setup

Prepare the workspace for the flow skills: the folder that holds work items.

Read first:
- core/content/setup.md

## Creates
1. `_kiit/flow/`, a folder. Work items are created inside it

## Conditions
- `_kiit/flow` exists and is a file: `error: _kiit/flow is a file`, and stop

## Done when
`_kiit/flow/` exists. A second run prints `nothing to do`.
