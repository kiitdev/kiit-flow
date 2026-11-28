# Verify checks

The checks `flow-verify` runs. Lint, tests and the secret scan are in
flow/content/checks.md. Shell calls follow core/content/shell.md.

| Check | What it does |
|---|---|
| `criteria` | The changes against what `01-change.md` asks and limits |
| `lint` | The project's own lint, inferred from the project |
| `tests` | The project's own tests, inferred from the project |
| `security` | The secret scan (flow/content/checks.md), and the project's audit if it has one |
| `docs` | `fail` only when a doc the change touched is now wrong. Otherwise `pass` |

## Changed files
The files the work item changed in its project, found with read-only git.
1. `git diff --name-only {base}...HEAD`, then `git diff --name-only` for uncommitted
   changes, then `git ls-files --others --exclude-standard` for new files. Each is its own call.
2. `{base}` is the merge base with the remote's default branch: `git merge-base HEAD
   origin/{default}`. No remote: the uncommitted and new files only.

## Criteria
1. Read `01-change.md`: what must be true, and what the change must not do.
   - A ticket: also use the ticket's own (core/content/tickets.md)
   - Nothing to check against: `skipped`, with `nothing to check against`
2. Mark each point `met` (name the file or test), `not met` or `not checked`.
   - `not checked`: code can't show it, such as a manual or runtime check
3. The check is `fail` if a point is `not met`.
4. A changed file the change doesn't call for is a note, `unrelated: {file}`.
   - It never fails the check
5. The report lists the `not checked` points and the notes.

## Lint and tests
These are the minimum. Infer how the project runs each. Don't assume a tool.
1. Work out the build system from the build files nearest the changed files.
   - A command named in `CLAUDE.md` or `AGENTS.md` wins
2. Use the project's own commands. Never invent one. List what the build offers first.
   - Several modules: run those that hold the changed files
   - Nothing found: `skipped`, with the reason
3. Run each command as its own call, in the project folder.
4. Tests also report coverage, and never ask for new tests.
   - `covered by new tests`, or `covered by existing tests: {file}`
   - `no test found for the change`. Coverage never changes `pass` or `fail`

## Security
1. Run the secret scan (flow/content/checks.md) on the files the change added or
   modified, not the deleted ones. A finding is `fail`.
2. Files that shouldn't be committed are also a finding: `.env*`, `*.pem`, `*.p12`,
   `*.jks`, `*.keystore`, `local.properties`, `id_rsa*`.
3. Report the file, line and kind only. Never print the value.
