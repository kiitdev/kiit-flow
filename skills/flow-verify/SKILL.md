---
description: Check a work item: its criteria, then the project's lint, tests, security and docs.
argument-hint: "[work-item] [check...]"
order: 9
disable-model-invocation: true
---

# flow-verify

Check the changes of a work item against its criteria, then run the project's own checks, and report each result. Changes no code and fixes nothing.

Read `.claude/kiit/flow/shared.md` first.

## Usage
```
USAGE: /flow-verify [work-item] [check...]

  Check a work item's changes against its criteria and the project's own checks.


ARGUMENTS:
  [work-item] : Optional : a folder name or a unique prefix. Omit for the most recent
  [check]     : Optional : one or more of criteria lint tests security docs. Omit to run all


EXAMPLES:
  /flow-verify
  /flow-verify criteria tests
```

## Steps
1. Resolve the work item and project (shared.md). Tell the user which.
   - Names like `lint` are checks. The first other argument is the work item
2. Find the changed files in the project (Changed files, shared.md).
3. Run each check asked for, all by default, even when an earlier one fails.
   - Save to `_files/output/verify.log`: each command, its status, what failed
4. Report each check as `pass`, `fail` or `skipped`, with the reason for the last two.
5. Add a row to `_history.md` (shared.md) with the results.
6. Print the report, then the next step.
   - Nothing failed or skipped: the work is ready for a PR
   - Nothing failed but a check was skipped: `ready, but {check} was skipped`
   - Tests found no test for the change: add that to the same line
   - Failed: suggest `/flow-update` or `/flow-resume`, then verify again

## Checks
| Check | What it does |
|---|---|
| `criteria` | The changes against `01-change.md`: criteria, Scope, Constraints |
| `lint` | The project's own lint, inferred from the project |
| `tests` | The project's own tests, inferred from the project |
| `security` | A scan of added and modified files for leaks, and the project's audit if it has one |
| `docs` | `fail` only when a doc the change touched is now wrong. Otherwise `pass` |

### Criteria
1. Read Acceptance criteria, Scope and Constraints in `01-change.md`.
   - A ticket with none written: use the ticket's (Read a ticket, shared.md)
   - None anywhere: `skipped`, with `no acceptance criteria`
2. Mark each criterion `met` (name the file or test), `not met` or `not checked`.
   - `not checked`: code can't show it, such as a manual or runtime check
3. The check is `fail` if a criterion or a Constraint is `not met`.
4. A changed file outside Scope is a note, `outside scope: {file}`. It never fails.
5. The report lists the `not checked` ones and the notes.

### Lint and tests
Lint and tests are the minimum. Infer how the project runs each. Don't assume a tool.
1. Work out the build system from the build files nearest the changed files.
   - A command named in `CLAUDE.md` or `AGENTS.md` wins
2. Use the project's own commands. Never invent one. List what the build offers first.
   - Several modules: run those that hold the changed files
   - Nothing found: `skipped`, with the reason
3. Tests also reports coverage, and never asks for new tests.
   - `covered by new tests`, or `covered by existing tests: {file}`
   - `no test found for the change`. Coverage never changes `pass` or `fail`

### Security
1. Scan the files the change added or modified, not the deleted ones.
   - `git diff --name-only --diff-filter=ACMR <base>...HEAD`, plus uncommitted
   - Untracked files: `git ls-files --others --exclude-standard`
2. Look for these.
   - Private key blocks, and token prefixes (`AKIA`, `ghp_`, `github_pat_`)
   - A password, secret, token or key set to a literal value
   - A URL with a username and password
   - Files that shouldn't be committed: `.env*`, `*.pem`, `*.p12`, `*.jks`,
     `*.keystore`, `local.properties`, `id_rsa*`
3. A finding is `fail`. Report the file, line and kind only.

## Rules
1. Write only `_files/output/verify.log` and a row in `_history.md`.
2. Never change project code or fix a failure. That is for `/flow-update`.
3. Never print or log a secret, a config value or an env file.
   - Don't read `.env*`, `local.properties` or keystores
   - Never run `env` or `printenv`
   - Replace anything that matches the Security patterns with `[redacted]`
