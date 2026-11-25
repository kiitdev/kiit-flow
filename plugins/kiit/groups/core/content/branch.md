# Branches

How a skill creates a branch. Two skills follow it. It never pushes.
Shell calls follow core/content/shell.md, and names core/content/formats.md.

## Steps
1. Pick the base branch (core/content/formats.md).
2. Name the branch (core/content/formats.md), with `branch.fallback` if no ticket.
   - A ticket and no name: use the ticket title (core/content/tickets.md)
   - Check it with `core/scripts/check-format.sh`. It fails: print its line, stop
3. A branch of that name exists: ask before going on. Never overwrite it.
4. Fetch the base: `git fetch origin {base}`.
5. Create it: `git checkout -b {name} --no-track origin/{base}`.
   - `--no-track` stops a plain `git push` from sending the branch to the base

## Rules
1. Create and check out the branch locally. Never push, commit or reset here.
2. Branch from `origin/{base}`, never from a possibly stale local copy.
3. Never create over an existing branch without the user's answer.
