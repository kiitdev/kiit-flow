# Review

`04-review.md`, written by `review`. A new review replaces the file, including a
`## Response` that `revise` added.

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

## Verdict
1. Severities are `blocker`, `major`, `minor` and `nit`.
2. A blocker or major finding makes the verdict `NEEDS_CHANGES`. Otherwise `APPROVE`.
3. A finding marked `disputed` has a one-line reason, and is not applied.

## Response
`revise` adds this at the end of the file (flow/content/revise-inputs.md).
```markdown
## Response
| # | Result | Note |
|---|---|---|
| 1 | applied | Approach in 02-design.md rewritten, step 2.4 added |
| 2 | declined | Disputed, the current approach stays |
| 3 | open | Needs a decision on the database choice |
```
A result is `applied`, `declined` (with the reason) or `open` (waiting on the user).
`declined` for a blocker or major only if `disputed` or the user chose it. Open and closed
reviews are defined by the review gate (flow/content/gates.md).

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
1. Start one subagent (Agent tool, `Plan`, which has no Edit or Write) on another model.
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
design and `01-change.md`. Read only. Return findings, each with a severity
(blocker, major, minor, nit) and a location.
```
