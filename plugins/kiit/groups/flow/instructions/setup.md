# flow setup

Prepare the workspace for the flow skills: the folders for work items and the state file.

Read first:
- core/content/setup.md

## Creates
1. `_kiit/flow/`, a folder
2. `_kiit/flow/items/`, a folder. Work items are created inside it
3. `_kiit/flow/state.json`, a file. It is created holding `{}`

## Conditions
- `_kiit` is missing: `error: _kiit not found`, then `/kiit:init`. This setup creates only what is inside `_kiit/flow/`
- `_kiit/flow` or `_kiit/flow/items` exists and is a file: `error: {path} is a file`, and stop
- `_kiit/flow/state.json` exists and is a folder: `error: {path} is a folder`, and stop

## Done when
All three exist. A second run prints `nothing to do`.
