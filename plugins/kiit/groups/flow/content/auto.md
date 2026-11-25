# go --auto

What `/kiit:flow-go --auto` adds: a branch, a commit, a push and a pull request. It asks
nothing. Only `flow-go` writes with git (RULES.md, Core, Git). GitHub only.

Read first:
- core/content/formats.md
- core/content/branch.md
- core/content/pull-request.md

## Before the edit
After the hand-off check, and before any edit:
1. Read effective `standards.vcs` (core/content/config.md).
2. Not a GitHub project, or `gh` missing: `error: --auto needs GitHub and gh`, and stop.
3. Create the branch (core/content/branch.md), in the branch format, off the base branch.
   - The branch exists: `error: branch {name} exists`, and stop. Nothing is asked
   - Never edit on the base branch

## After the checks
Only when the narrow check passed or found none, and the secret scan is clean. A failed
check, a finding or a hand-off stops the run here: nothing is committed.
1. Stage only the files the change touched, one `git add {path}` per call.
   - Never `git add -A` or `git add .`
2. Commit: `git commit -m "{type}: {description}"`, with the ticket ref on the next line,
   such as `Refs #24`. `{description}` is the work item's short title.
3. Push the new branch: `git push -u origin {branch}`. Never the base, never `--force`.
4. A pull request exists for the branch: print its URL, and stop.
5. Create the pull request (core/content/pull-request.md).
   - Title: core/content/formats.md, checked with `core/scripts/check-format.sh`
   - Fill `## Tests` from this run's results: what ran, or `no tests found` when the
     change has code and no check was found, or `not applicable` when it has no code to
     test, such as docs
   - `--check` is separate: `--auto` does not imply it

## Report
The branch, the commit, the push and the pull request URL, each on one line. A step that
stopped the run says which step, and what is left as it was.
