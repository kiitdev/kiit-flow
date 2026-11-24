# vcs-branch

Create a branch from a ticket or a name, off an up-to-date base. It never pushes.

Read first:
- core/content/cli.md
- core/content/config.md
- core/content/shell.md
- vcs/content/formats.md
- vcs/standards.json

## Usage
```
USAGE: /kiit:vcs-branch {ticket|name} [type] [--base-branch <branch>]

  Create a branch named by the team's branch format, off the up-to-date base branch.


ARGUMENTS:
  {ticket}       : Required : 1234, #1234, ABC-123 or an issue URL
  {name}         : Required : used when there is no ticket: what the branch is for
  [type]         : Optional : feat fix build chore ci docs perf refactor revert style test
                              Inferred from the ticket or name when missing


FLAGS:
  [--base-branch <branch>]  : Optional : the branch to start from, for this run only


EXAMPLES:
  /kiit:vcs-branch https://github.com/kiitdev/kiit-flow/issues/19
  /kiit:vcs-branch fix null pointer in the parser
```

## Steps
1. Help check: print Usage and stop (core/content/cli.md).
2. Find the workspace, and read effective `standards.vcs` (core/content/config.md).
3. Read the arguments (core/content/cli.md): type, ticket or name, `--base-branch`.
4. Infer a missing type from the ticket, else from the name.
   - A ticket: read `core/content/tickets.md` first
   - Print what was inferred: `type: fix (label: bug)`
   - Nothing fits: `error: cannot infer type`, then `valid: {types}`, and stop
5. Pick the base branch (vcs/content/formats.md).
6. Name the branch (vcs/content/formats.md), with `branch.fallback` if no ticket.
   - A ticket and no name: use the ticket title (core/content/tickets.md)
   - Check it with `vcs/scripts/check-format.sh`. It fails: print its line, stop
7. A branch of that name exists: ask before going on. Never overwrite it.
8. Fetch the base: `git fetch origin {base}`.
9. Create it: `git checkout -b {name} --no-track origin/{base}`.
   - `--no-track` stops a plain `git push` from sending the branch to the base
10. Print the branch name and its base. The first push is `git push -u origin {name}`.

## Rules
1. Create and check out the branch locally. Never push, commit or reset.
2. Branch from `origin/{base}`, never from a possibly stale local copy.
3. Never create over an existing branch without the user's answer.
