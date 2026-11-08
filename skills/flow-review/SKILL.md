---
description: Review a work item's plan or code and write 04-review.md with a verdict.
argument-hint: "[work-item] [stage] [resource]"
order: 5
disable-model-invocation: true
---

# flow-review

Review the plan, or the code written for it, and write `04-review.md`. Reads everything, changes nothing else. Findings are applied by `/flow-revise`.

Read `.claude/kiit/flow/shared.md` first.

## Usage
```
USAGE: /flow-review [work-item] [stage] [resource]

  Review a work item's plan or code against a baseline and write 04-review.md.


ARGUMENTS:
  [work-item] : Optional : a folder name or a unique prefix. Omit for the most recent
  [stage]     : Optional : plan or code. Omit for plan until a step is done, then code
  [resource]  : Optional : standards (default), a resource name, a path, a URL, independent


EXAMPLES:
  /flow-review
  /flow-review code independent
```

## Steps
1. Resolve the work item and project (shared.md). Tell the user which.
   - `plan` or `code` is the stage. A resource is `independent`, a URL or a path
   - The first other argument is the work item
2. Pick the stage if none was given: `plan` if no step is `done`, else `code`.
3. Read `01-change.md`, `02-design.md`, `03-phases.md` and `_status.md`.
   - No design or phases: `error: no design yet`, and suggest `/flow-design`
   - Stage `code`: also read the changed files (Changed files, shared.md)
   - `_research.md` too, if it exists
4. Review against the baseline.
   - Plan: are the requirements clear, the design sound, and the phases in order
   - Plan: does each phase have tests, and can each criterion be checked
   - Plan: does the design agree with what `_research.md` found
   - Code: does the code match the design, and is each acceptance criterion met
   - `independent`: see below. Otherwise name the rule behind each finding
5. Write `04-review.md` from the template. It replaces any earlier one.
   - Switch the mode in `_status.md` (shared.md)
6. Add a row to `_history.md` (shared.md) with the stage, the verdict and the baseline.
7. Print the verdict and the top findings, then the next step.
   - `NEEDS_CHANGES`: suggest `/flow-revise`, which applies the findings
   - A finding needs facts nobody looked up: suggest `/flow-research`
   - `APPROVE` on a plan: suggest `/flow-update`. On code: it is ready for a PR

## Baseline
The resource defaults to `flow.review.baseline`, which defaults to `standards`.

| Resource | What the review checks against |
|---|---|
| `standards` | The `standards` resource. If there is none, the project's `CLAUDE.md` |
| a resource name | That resource from `kiit.json`. A folder means the docs in it |
| a file path | That file |
| a URL | The fetched page, such as a blog post or a reference |
| `independent` | No baseline. Another model reads the work cold |

## Independent
1. Start one subagent (Agent tool, `general-purpose`) on another model.
   - `flow.review.model` if set, else a model other than this session's
2. Give it no session context. Its prompt has only these:
   - Absolute paths to `01`-`03`, `_status.md`, any `_research.md`, the project
   - Stage `code`: the list of changed files
   - The brief below, as written
3. Don't pass your own opinions or conclusions to it.
4. Merge its findings into the review.
   - Drop duplicates
   - A finding you disagree with is marked `disputed`, with a one-line reason

The brief:
```text
Review these as a fresh reader. Find gaps in the requirements, design flaws, missing
or badly ordered steps, risks, and simpler options. For code, check it against the
design and the acceptance criteria. Read only. Return findings, each with a severity
(blocker, major, minor, nit) and a location.
```

## Template
```markdown
# Review: {title}

- **Verdict:** APPROVE | NEEDS_CHANGES
- **Stage:** plan | code
- **Baseline:** {standards | resource name | path | URL | independent (model)}
- **Reviewed:** {the files read}
- **Date:** {YYYY-MM-DD}

## Findings
| # | Severity | Where | Finding | Source |
|---|---|---|---|---|
| 1 | blocker | 02-design.md, Approach | ... | {rule or passage, or independent} |

## Notes
<!-- Anything that does not fit a finding -->
```

A blocker or major finding makes the verdict `NEEDS_CHANGES`. Otherwise it is `APPROVE`.

## Rules
1. Write only `04-review.md` and a row in `_history.md`.
   - The one other change is switching the Mode line in `_status.md`
   - Don't edit the other artifacts or the project code
2. A new review replaces the file, including a `## Response` that revise added.
