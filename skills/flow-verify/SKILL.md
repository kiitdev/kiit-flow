---
description: Run the project's own checks on a work item: lint, tests, security, docs.
argument-hint: "[work-item] [check...]"
order: 7
disable-model-invocation: true
---

# flow-verify

Run the project's local checks on the changes of a work item and report each result. Changes no code and fixes nothing.

Read `.claude/kiit/flow/shared.md` first.

## Usage
```
USAGE: /flow-verify [work-item] [check...]

  Run the project's own checks on a work item's changes and report each result.


ARGUMENTS:
  [work-item] : Optional : a folder name or a unique prefix. Omit for the most recent
  [check]     : Optional : one or more of lint tests security docs. Omit to run all


EXAMPLES:
  /flow-verify
  /flow-verify lint tests
```

## Steps
1. Resolve the work item and project (shared.md). Tell the user which.
   - Names like `lint` are checks. The first other argument is the work item
2. Find the changed files in the project (Changed files, shared.md).
3. Run each check below that was asked for, all by default.
   - Run every check even when an earlier one fails
   - Save the output to `_files/output/verify.log`
4. Report each check as `pass`, `fail` or `skipped`, with the reason for the last two.
   - No command in the project: `skipped`. Never invent a command
5. Add a row to `_history.md` (shared.md) with the results.
6. Print the report, then the next step.
   - Nothing failed: the work is ready for a PR
   - Failed: suggest `/flow-update` or `/flow-resume`, then verify again

## Checks
The project's own setup is the source of truth. Run its commands from the folder that holds them.

| Check | Where the command comes from |
|---|---|
| `lint` | npm: the nearest `lint` script. Gradle: `ktlintCheck` and `detekt`, if the task exists |
| `tests` | npm: the nearest `test` script. Gradle: `allTests` for multiplatform, else `test` |
| `security` | A scan of the changed files, plus an audit if the project defines one |
| `docs` | A read of the README, docs and examples the change touches |

1. Find the commands in the project's own files.
   - npm: the nearest `package.json` above each changed file
   - Gradle: the root build. List its tasks with `./gradlew tasks --all`
2. Security always scans the changed files for committed secrets.
   - Keys, tokens, passwords and private key blocks
   - Report the file and line only. Never print the secret
3. Security runs an audit only if the project defines one.
   - An `audit` script in `package.json`, or a Gradle dependency-check task
4. Docs is `fail` only when a doc the change touched is now wrong. Otherwise `pass`.

## Rules
1. Write only `_files/output/verify.log` and a row in `_history.md`.
2. Never change project code or fix a failure. That is for `/flow-update`.
3. Never print a secret, in the report or in the log.
