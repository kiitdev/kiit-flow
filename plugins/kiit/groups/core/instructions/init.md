# init

Create `.claude/kiit/kiit.json` for a workspace from the git repos in it.
It writes `tickets` and `projects` only, after the user confirms. It never pushes.

Read first:
- core/content/cli.md
- core/content/config.md
- core/content/shell.md
- core/content/remotes.md
- core/content/setup.md

## Usage
```
USAGE: /kiit:init

  Find the git repos in this folder and write .claude/kiit/kiit.json for them.
  Run it from the workspace folder: the folder that holds the repos.
```

## Steps
1. Help check: print Usage and stop (core/content/cli.md).
2. The current folder is the workspace. Never look in a parent folder.
   - Read `.claude/kiit/kiit.json` here. No file is fine: it is a new file
3. Find the repos (core/content/remotes.md): `ls -d */.git`, as one call.
   - None: `error: no git repos found in this folder`, then say to run it from
     the folder that holds the repos, and stop
4. For each repo, in order (core/content/shell.md):
   - `cd {repo}` as its own call
   - `git remote get-url origin`
   - `git remote show origin`, for the `HEAD branch` line
   - A call that fails leaves that part out. Say which, and go on
5. Build the proposal (core/content/remotes.md): ticket systems, then projects.
   - A repo with no usable remote gets a project and no ticket system
6. Check it against core/content/config.md and the Errors table in `shared/README.md`.
   - A name or alias used twice, a missing or unknown `tickets`, a missing field
   - Fix what can be fixed. Ask the user about the rest in step 9
7. A file exists: keep what is in it.
   - Add the projects and ticket systems it lacks, by `path` and by `name`
   - A change to an entry it has is shown as a difference, and needs its own yes
   - Write back every other key as it is: `resources`, `standards`, `groups`
   - A top-level `flow` key: say `flow is the old shape and is not migrated`
8. Print what it found and the result: the file, or the difference.
   - Notes: Jira, Linear or other systems need a base URL and a default project
   - Notes: a repo with no usable remote, and a read that failed
   - `_kiit/`, the folder `init` creates itself, when it is missing
   - Find group setups: `ls {groups folder}/*/instructions/setup.md`, one call
   - List what each setup creates, from its `## Creates` (core/content/setup.md)
9. Ask the user to confirm or correct it, and wait.
   - Nothing is written before a yes
   - Two or more ticket systems and a project with none: ask which one it uses
10. Write the file with the Write tool. The folders are created with it.
   - Pretty print: 2-space indent, one key per line, and a newline at the end
   - Keep the key order: `version`, `tickets`, `projects`, then any other keys
   - A change after the proposal is checked again (step 6)
11. Create `_kiit/` when it is missing: `ls -ld _kiit`, then `mkdir -p _kiit`.
   - One call each
   - It exists as a file: `error: _kiit is a file`, and stop
   - Report it as `core   _kiit   created` or `exists`
12. Run the group setups, in order, as listed in step 8 (core/content/setup.md).
   - Only what is missing is created. The yes in step 9 covers it
   - A setup that stops with an error does not undo the file written in step 10
13. Report what was written and what was left out. Nothing changed: say so.
   - Include one line per setup item: `created` or `exists`
   - Next: run any kiit skill, such as `/kiit:vcs-branch`

## Rules
1. Write only `tickets` and `projects`. No `resources`, defaults, `standards` or `groups`.
   - Besides the file, only `_kiit/` (step 11) and what a group setup creates (step 12)
2. Never replace a file or an entry without the user's yes.
3. No secrets in the file, including a `url`.
4. Git is read-only. Never push, commit or change a repo.
5. Never guess a ticket system from an unknown host or a base URL.
6. Print the proposal in the same pretty-printed form that is written.
