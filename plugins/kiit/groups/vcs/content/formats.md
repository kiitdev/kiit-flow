# VCS formats

The rules for branch names and PR titles. The values are in `standards.vcs`: the
plugin default is `groups/vcs/standards.json`, and `kiit.json` overrides it (config.md).

## Types
`types` is the one list for branches and PR titles.
1. A type typed by the user goes through `aliases` first: `feature` is `feat`.
2. Not in the list after that: `error: unknown type '{x}'`, then `valid: {types}`.

## Base branch
The branch a new branch starts from, and a PR merges into. The first that is set wins:
1. `--base-branch`, for this run only.
2. `baseBranch` on the project in `kiit.json` `projects[]`.
3. `standards.vcs.baseBranch`.
`auto` is the repo's default branch: `git remote show origin`, the `HEAD branch` line.
That fails: `main`. The chosen branch is printed in one line.

## Branch
Pattern `branch.pattern`, by default `{type}/{ref}/{name}`. A branch with
no ticket uses `branch.fallback`, by default `{type}/{name}`.
1. `{type}`: a type, lowercase.
2. `{ref}`: the ticket, lowercase.
   - GitHub issue: `issue-{number}`
   - Other ticket id: the id lowercased, such as `abc-123`
3. `{name}`: lowercase words joined by `-`, at most `branch.maxWords` words.
   - From the user's name, else from the ticket title
   - Drop filler like "the", "to" and "in"
4. `{date}` is also available: today as `YYMMDD`, from `date +%y%m%d`. It is not in
   the default pattern.
5. A ref is always followed by a name. Branches are paths, so `fix/19` and `fix/19/x`
   cannot both exist.

Examples: `fix/issue-19/plugin-layout`, `fix/null-pointer-parser` (no ticket)

## PR title
Pattern `pr.title`, by default `{TYPE}: {description}`.
1. `{TYPE}` is the type in uppercase, from the branch and the changes.
2. The whole title is at most `pr.titleMaxLength` characters.

Example: `FEAT: Added support for detekt`

## Checking
Run `check-format.sh` on the result before using it, with the pattern that was used. Call it by its full path under
`groups/`, as its own command, with no `sh` in front and nothing chained to it:
`{groups folder}/vcs/scripts/check-format.sh {pattern} "{types}" {max length} "{value}"`
It prints `ok:` or `fail:` and one reason. Quote that line in the report. Never
re-derive the answer. For a branch the max length is 100.
