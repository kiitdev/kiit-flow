# Checks

What `go` runs after it implements a change. The same checks serve `flow-verify` later.
Shell calls follow core/content/shell.md.

## Narrow check
The smallest check that covers what `01-change.md` asks.
1. Find the project's commands in its `CLAUDE.md` or `AGENTS.md`, else its build files.
2. Run the test that covers the change, with the project's own command. Add a test when
   the behavior is new.
3. No check can be found: report `no check found`. It is never a pass.
4. It fails and the fix is not clearly inside the change: stop and report it.

## Lint and tests
Only with `--check`, after the narrow check. Run the project's own lint, then its unit tests.
1. Find the commands the same way as the narrow check, such as a `lint` or `test` task.
2. Run each as its own call, in the project folder (`cd {path}` first, as its own call).
3. Nothing found for one: report it as `skipped`, never a pass.
4. A failure stops the run. Report the command and the first failing line.

## Secret scan
Always runs, with or without a flag, on the files the change added or changed.
1. List them with read-only git: `git diff --name-only`, then `git ls-files --others
   --exclude-standard` for new files. Each is its own call.
2. Read each file with the Read tool. Look for:
   - a private key block (`-----BEGIN ... PRIVATE KEY-----`)
   - a token or key pattern: `ghp_`, `github_pat_`, `sk-`, `AKIA`, `xox`
   - an assignment of a literal to a name like `password`, `secret`, `token` or `api_key`
3. A finding stops the run. Report the file and line, never the value.
4. Skip binary files and say how many. No files changed: say `nothing to scan`.

## Report
One line per check: `narrow check: passed|failed|no check found`, `lint: ...`,
`tests: ...`, `secret scan: clean|{n} findings|nothing to scan`.
