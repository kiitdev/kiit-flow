# Flow templates

The files `begin` and `go` write when they create a work item.

## 01-change.md
Fill the sections from what was given, tidied, with no new scope.
1. Title: the ticket title, else the description in short, else `ticket {id}`.
2. Ticket: the URL, or the system's link for the id (core/content/config.md).
   Link it, don't copy it.
3. Keep every limit (no X, must Y, don't change Z) in the user's words.
4. A section with nothing given stays empty. Its comment says what it holds.
5. Anything unclear goes under Questions.

```markdown
# {type}: {title}

- **Project:** {project}
- **Path:** {project path}
- **Type:** {type}
- **Ticket:** {link, or none}
- **Created:** {YYYY-MM-DD}

## Requirements
<!-- Description: the full requirements, with constraints in the user's words. Ticket: leave empty, the ticket is the source of truth. -->

## Acceptance criteria
<!-- How we know it is done. One checkable statement per line. A description with none given: write one to three from it. -->

## References
<!-- Existing code or docs to follow, one per line: the path, and why. -->

## Scope
<!-- Where the change may go: files and modules, and what stays untouched. -->

## Constraints
<!-- How the result must behave or be built: no X, must Y. -->

## Examples
<!-- Sample input and output the change must match. -->

## Questions
<!-- Anything unclear -->

## Notes
<!-- Context that is not in the ticket. Build and test commands and conventions come from CLAUDE.md or AGENTS.md -->
```

## _history.md
The first row is written with the file. Later rows are in flow/content/work-item.md.

```markdown
# History: {title}

| Time | Skill | Note |
|---|---|---|
| 2026-10-02 14:05 | begin | created from ticket 1234 |
```
