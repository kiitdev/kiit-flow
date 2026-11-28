# Design template

`02-design.md`, written by `design`, changed by `revise`. Write the chosen approach only.
Keep each section short. Leave a section empty when it has nothing to say.

```markdown
# Design: {title}

## Context
<!-- Why this change, and what it should do. Two or three lines. -->

## Assumptions
<!-- One line each: the choice made, and why. Not the Questions of 01-change.md. -->

## Approach
<!-- The chosen approach only. No alternatives. -->

## Files
<!-- Files to create or change, relative to the project. Describe a repeated pattern once. -->

## Reuse
<!-- Existing code and utilities to use, with paths. -->

## Constraints
<!-- Standards, compatibility and dependency rules that apply. -->

## Verification
<!-- How to test it end to end, and the tests to add. -->

## Changes
<!-- Revisions only: what changed and why. -->
```

## Rules
1. Name the `_research.md` section behind a choice that rests on it.
2. Standards from the `standards` resource are constraints, not suggestions.
3. Reuse comes before new code: look for an existing utility or pattern first.
4. Add no scope beyond `01-change.md`.
