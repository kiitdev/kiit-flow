# Group setup

How a skill group prepares the workspace for its skills. Every group's setup follows
these rules. The group's own file says only what that group needs.

## Where
1. A group's stored files live in `{workspace}/_kiit/{group}/`, named after the group.
   - `{workspace}` is the workspace root (core/content/config.md)
   - The name `_kiit` is fixed. There is no setting and no per-group path
2. A group owns only its own folder. It never writes into another group's folder.
3. A thing two groups share goes in `_kiit/core/`.
4. A group's setup is `groups/{group}/instructions/setup.md`.
   - The file is the registration. A group with nothing to prepare has no file
   - `setup` is a reserved name: no group has a skill called `setup`

## The file
A group's `setup.md` has no frontmatter and no Usage block. Its parts, in order:
1. Title and one line on what it prepares
2. `Read first:`, which lists this file
3. `## Creates`: what it makes, one item per line, as a path under the workspace
4. `## Conditions`: optional. A case that changes what it does, and what to do
5. `## Done when`: a check the user can run

## Rules
1. Create only what is missing. Never overwrite, move or delete anything.
2. Git is read-only. No secrets are read, written or printed.
3. The only actions are `mkdir -p` for a folder, and Write for a file that is missing.
   - Anything else needs the user's yes first
4. Every path is inside the workspace. A path that is not: `error: {path} is outside
   the workspace`, and stop.
5. Stop on the first error. Say what was created before it.
6. A second run changes nothing, and says so.

## Procedure
For each item in `## Creates`, in order:
1. Apply `## Conditions`. A condition that stops the run prints `error: {what}`.
2. Check it, with one call per item: `ls -ld {path}`. A leading `d` is a folder.
   - It exists as the right kind (a folder for a folder): `exists`, go on
   - It exists as the wrong kind: `error: {path} is a {file|folder}`, and stop
3. Create it when missing, as one call: `mkdir -p {path}`, or Write for a file.
4. Report one line per item:
```
flow   _kiit/flow   created
flow   _kiit/flow   exists
```
Every item existed: print `nothing to do`.

## Order
1. Groups run in alphabetical order.
2. A setup that needs another group's folder says so in its own file, and runs that
   group's setup first. A cycle is `error: setup order cycle {a} -> {b}`.

## Who runs it
1. `init` runs the setup of every group that has one, after it writes `kiit.json`.
   - It lists each setup's `## Creates` in its proposal, so the user's yes covers them
2. A group's skill runs its own setup when `_kiit/{group}/` is missing.
   - It checks with `ls -d _kiit/{group}`, as one call from the root
   - A skill reads only its own group's `setup.md`
3. Both follow this file. They never copy its rules.
