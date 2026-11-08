---
description: Look into the unknowns of a work item and add them to _research.md.
argument-hint: "[work-item] [topic...]"
order: 4
disable-model-invocation: true
---

# flow-research

Look into what a work item leaves unknown, risky or assumed, and add what is found to `_research.md`. Reads widely, writes only that file. Decides nothing about the design.

Read `.claude/kiit/flow/shared.md` first.

## Usage
```
USAGE: /flow-research [work-item] [topic...]

  Look into a topic, or into what the work item leaves unknown, and add it to
  _research.md.


ARGUMENTS:
  [work-item] : Optional : a folder name or a unique prefix. Omit for the most recent
  [topic]     : Optional : what to look into, in your words. Omit to let it choose


EXAMPLES:
  /flow-research how does the token refresh work
  /flow-research 260928-kiit-codes-fix-1234
```

## Steps
1. Resolve the work item and project (shared.md). Tell the user which.
   - The first argument is the work item if it matches one. The rest is text
2. Read what the work item has.
   - The change, design, phases, review and status files, whichever exist
   - `_research.md`, so earlier answers are not looked up again
3. Decide what to look into.
   - A topic: use it
   - No topic: pick from the open questions, the assumptions, review findings
     that need facts, and blocked steps
   - Print the questions you chose, one line each, and go on
   - Nothing is unknown: say so, and stop
4. Look into it. Read only.
   - The project code, the resources in `kiit.json`, the ticket, and URLs
   - Stop when the question is answered. Don't survey more than it needs
5. Add to `_research.md` (shared.md). Create it if it is missing.
6. Add a row to `_history.md` (shared.md) with the topic and the outcome.
7. Print a short summary and the next step.
   - What was found, and what is still open
   - No design yet: suggest `/flow-design`
   - A finding changes the design: suggest `/flow-revise`

## Rules
1. Write only `_research.md` and `_history.md`. Change no code and no other file.
2. Never edit or remove text already in `_research.md`.
3. Say where each finding came from. Mark your own reasoning as inferred.
4. A question only the user can answer goes under open. Don't guess it.
5. Don't decide the design. Report what was found, and let `design` or `revise` use it.
