---
description: Create a work item from a ticket or a description.
argument-hint: "[project] [type] {ticket|description}"
order: 1
disable-model-invocation: true
---

# flow-begin

Create a work item: its folder, `01-change.md` and `_history.md`. Designs and implements nothing.

Read `.claude/kiit/flow/shared.md` first.

## Usage
```
USAGE: /flow-begin [project] [type] {ticket|description}

  Create a work item: a folder with 01-change.md and _history.md.


ARGUMENTS:
  [project]     : Optional : a project name or alias. Needed with a description
  [type]        : Optional : feat fix build chore ci docs perf refactor revert style
                             test (feature = feat, tests = test)
                             Needed with a description
  {ticket}      : Required : 1234, #1234, ABC-123 or an issue URL (GitHub, Jira, ...)
  {description} : Required : used when there is no ticket: the requirements


EXAMPLES:
  /flow-begin https://github.com/kiitdev/kiit-codes/issues/12
  /flow-begin kiit-inputs feat port the service id to typescript
```

## Steps
1. Read the config (shared.md). Read the leading arguments.
   - A project name or alias is the project. A type word after it is the type
   - Either can be missing. The rest is the ticket or description
2. Decide what the rest is.
   - A ticket is one token: `1234`, `#1234`, `ABC-123` or an issue URL
   - For a URL the id is the last path segment. Anything else is a description
3. Read the ticket (shared.md) when the project or type is missing and it has a link.
   - A bare number needs a project: the one given, else the one you are in
   - Nothing could be read: infer nothing
4. Infer what is missing. Arguments always win.
   - Project: the one whose repo matches a GitHub URL, else the one you are in
   - Else the project the ticket names, as a project name or alias
   - Type: a title prefix like `fix:` or `feat(api):`, else the label or type
   - Labels: bug = fix, enhancement or feature = feat, documentation = docs
5. Project or type still missing: `error: cannot infer {project|type}`.
   - Then `valid: {choices}`, and stop
6. Confirm what was inferred.
   - Show each value and its source, such as `type: fix (label: bug)`
   - Ask the user to confirm or correct it, and wait
   - Skip this for a GitHub issue of the project the working directory is in
7. Check the project path exists.
8. Name the folder (shared.md), with today's date.
   - Folder exists: `error: {name} already exists`. Never overwrite
9. Create the folder with `_files/input/` and `_files/output/`.
10. Write `01-change.md` from the template.
    - Title: the ticket title, else the description in short, else `ticket {id}`
    - Ticket: the URL, or the system's link for the id. Link it, don't copy it
    - Description: the requirements as given, tidied, with no new scope
    - Anything unclear goes under Open questions
11. Write `_history.md` (shared.md) with its first row.
    - Note: `created from ticket {id}` or `created from description`
12. Print the folder name, the project path, and the next step, `/flow-design`.

## Template
```markdown
# {type}: {title}

- **Project:** {project}
- **Path:** {project path}
- **Type:** {type}
- **Ticket:** {link, or none}
- **Created:** {YYYY-MM-DD}

## Requirements
<!-- Description: the full requirements. Ticket: leave empty, the ticket is the source of truth. -->

## Acceptance criteria
<!-- How we know it is done. One checkable statement per line. -->

## Notes
<!-- Context that is not in the ticket -->

## Open questions
<!-- Anything unclear -->
```

## Rules
1. Create files only inside the new work item folder.
2. Read tickets only. Use `gh` and page fetches to read, never to change anything.
