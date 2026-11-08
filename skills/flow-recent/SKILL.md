---
description: List work items, newest first, with a one-line description of each.
argument-hint: "[count]"
order: 10
disable-model-invocation: true
---

# flow-recent

List the work items, newest first, one numbered line each. Writes nothing.

Read `.claude/kiit/flow/shared.md` first.

## Usage
```
USAGE: /flow-recent [count]

  List work items, newest first, one line each: number, folder name, description.


ARGUMENTS:
  [count] : Optional : how many to list. Omit for all


EXAMPLES:
  /flow-recent
  /flow-recent 5
```

## Steps
1. List the work items with the command in Resolve the work item (shared.md).
2. A count was given: keep that many lines from the top.
3. Load every work item first. Take its description from `01-change.md`, first line.
   - The line is `# {type}: {title}`. Use the title
   - The title is `ticket {id}`: read the ticket (shared.md) and use its title
   - The ticket can't be read: leave `ticket {id}` as it is
4. Print one code block, nothing else, with one line per item:
   - `{number}. {folder name} : {description}`
   - Pad the names to the longest one, so the colons line up
   - Right-align the numbers, and cut a description at 80 characters
5. No work items: `error: no work items`, and suggest `/flow-begin`.

## Example
```
  1. 260928-kiit-codes-fix-1234              : Missing date validation in status codes
  2. 260927-kiit-inputs-feat-port-service-id : Port the service id to TypeScript
```

## Rules
1. Read-only. Write no file, and add no row to any `_history.md`.
