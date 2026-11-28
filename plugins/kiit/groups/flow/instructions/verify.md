# flow-verify

Check the changes of a work item against its criteria, then run the project's own
checks, and report each result. Changes no code and fixes nothing.

Read first:
- core/content/cli.md
- core/content/config.md
- core/content/shell.md
- core/content/tickets.md
- flow/content/work-item.md
- flow/content/checks.md
- flow/content/verify-checks.md

## Usage
```
USAGE: /kiit:flow-verify [work-item] [check...]

  Check a work item's changes against its criteria and the project's own checks.


ARGUMENTS:
  [work-item] : Optional : a folder name or a unique prefix. Omit for the most recent
  [check]     : Optional : one or more of criteria lint tests security docs. Omit to run all


EXAMPLES:
  /kiit:flow-verify
  /kiit:flow-verify criteria tests
```

## Steps
1. Help check: print Usage and stop (core/content/cli.md).
2. Find the workspace and read `kiit.json` (core/content/config.md).
3. Check the group folder: `ls -d _kiit/flow/items`, as one call from the root.
   - Missing: `error: _kiit/flow/items not found`, then `/kiit:init`, and stop
4. Resolve the work item and tell the user which (flow/content/work-item.md).
   - Names like `lint` are checks. The first other argument is the work item
5. Find the changed files in the project (flow/content/verify-checks.md).
6. Run each check asked for, all by default, even when an earlier one fails.
   - Save to `_files/output/verify.log`: each command, its status, what failed
7. Report each check as `pass`, `fail` or `skipped`, with the reason for the last two.
8. Add a `_history.md` row with the results.
9. Print the report, then the next step.
   - Nothing failed or skipped: the work is ready for a PR
   - Nothing failed but a check was skipped: `ready, but {check} was skipped`
   - Steps are `defer` in `_status.md`: add `{n} deferred` to the same line
   - Tests found no test for the change: add that to the same line
   - Failed: `/kiit:flow-update` or `/kiit:flow-resume`, then verify again

## Rules
1. Write only `_files/output/verify.log`, and a row in `_history.md`.
2. Never change project code or fix a failure. That is for `/kiit:flow-update`.
3. Never print or log a secret, a config value or an env file.
   - Don't read `.env*`, `local.properties` or keystores
   - Never run `env` or `printenv`
   - Replace anything that matches the secret scan patterns with `[redacted]`
4. Lint and tests run the project's own commands, which may prompt for permission.
   That is accepted.
5. Read-only git.
