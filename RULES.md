# Rules

Decisions that every kiit skill follows. A rule is written here when it is settled,
then moved into `SKILL-STANDARDS.md` and the group files that apply it.

kiit and kiit-flow are not stable yet. These rules hold as of now and can change while
the design is open. Once the project is stable, a change to a rule needs a very high bar.

Sections: `## Core` holds what is global or shared by every group. `## {Group}` holds
what only that group's skills follow. A rule about one part of a section is a subsection.

## Core

### Setup

1. Only `/kiit:init` writes `.claude/kiit/kiit.json`. Every other skill reads it.
2. `init` is a hard requirement for every skill except a `--help` check.
   - `kiit.json` is missing: `error: .claude/kiit/kiit.json not found`, then `/kiit:init`
   - The project is not in `kiit.json`: `error`, then `/kiit:init`
   - A group folder is missing: `error`, then `/kiit:init`
3. `help` skills, such as `flow-help`, also need `kiit.json`. Only `--help` skips the
   config read, because the help check is step 1.
4. A group's folders and files are created only by that group's `instructions/setup.md`,
   which `init` runs. No skill creates or repairs a group folder or file.
   - A deleted folder is repaired by running `/kiit:init` again
5. A skill writes only inside a work item, and to its own group's `state.json`
   (Group state).
6. A group's stored files live in `_kiit/{group}/`. The name `_kiit` is fixed.
7. A group has a `settings.json` or `standards.json` only when one of its skills reads it.
   - A file that exists and is empty (`{}`) is valid
   - A missing file counts as empty, and a missing key is not an error

### Group state

1. A group may have `_kiit/{group}/state.json` for state its skills share. It is not
   `settings.json` or `standards.json`.

   | | `settings.json`, `standards.json` | `kiit.json` | `state.json` |
   |---|---|---|---|
   | Lives in | the plugin | `.claude/kiit/` | `_kiit/{group}/` |
   | Holds | defaults | the workspace's choices and overrides | what the skills last did |
   | Written by | the plugin author | `init` and the user | the group's skills |

2. Only the group's own skills read or write it. State two groups share goes in
   `_kiit/core/`.
3. It is created by the group's `setup.md`, as `{}`. A skill rewrites the whole file with
   the Write tool, pretty printed with a 2-space indent.
4. The work item folders and files are the source of truth. State is a shortcut.
   - A missing file or key is not an error. It means no state
   - A value that no longer matches, such as a folder that was moved, is ignored and
     the skill says so
5. No secrets. It is small and holds no copies of work item content.
6. Whether `_kiit/` is committed is the user's choice. A skill never edits `.gitignore`.

### Group dependencies

1. A group's files refer only to files of the same group or of `core`. `core` refers to
   no group. Groups never depend on each other, so there can be no cycle.
2. What two or more groups use lives in `core`.
3. One exception: a group may read another group's `standards.json`, or its effective
   `standards.{area}`, as data. Never its instructions, content, scripts or `settings.json`.
4. The check is a search. In every file under `groups/{g}/`, each path in `Read first:`
   and each `Follow` line starts with `{g}/` or `core/`. Run it from the repo root, once
   per group. It prints nothing when the rule holds:

   ```sh
   grep -rEn '^(- |Follow )[a-z]+/' plugins/kiit/groups/vcs --include='*.md' \
     | grep -vE ':(- |Follow )(vcs|core)/|standards\.json$'
   grep -rn '^Follow' plugins/kiit/skills/vcs-*/SKILL.md | grep -v 'Follow vcs/'
   ```

   Replace `vcs` with the group name.

### Git

1. Skills use read-only git, except `/kiit:flow-go --auto` (Flow, Go).
2. No skill pushes to the base branch or force-pushes.
3. Branch protection on the base branch is the backstop, set by the user. A skill never
   depends on it.

## Flow

### Setup

1. Flow work items live in `_kiit/flow/items/`. `groups/flow/instructions/setup.md`
   lists `_kiit/flow/`, `_kiit/flow/items/` and `_kiit/flow/state.json` under
   `## Creates`.
2. There is no migration of work items from an earlier layout. The user moves them.

### Work item names

1. A folder is named `{yymmdd}-{nnn}-{project}-{type}-{ticket|short-name}`, such as
   `261125-003-kiit-flow-feat-24`.
2. `{nnn}` is a counter that starts at `001` each day, with three digits so the names sort
   in creation order. Autonomous runs can create more than 99 a day.
   - Past `999`: `error: too many work items today`
3. The counter is derived, never stored. `begin` lists the folders with today's date and
   uses the highest counter plus 1.
   - Two sessions can pick the same counter. The folders still differ, so nothing is
     overwritten
4. A skill finds the work item of a ticket by name, not by recency:
   `[0-9][0-9][0-9][0-9][0-9][0-9]-[0-9][0-9][0-9]-{project}-{type}-{ticket}`.
   - Several matches: the one with the larger `{yymmdd}-{nnn}`

### State

1. `_kiit/flow/state.json` has one key, `recent`: the folder name of the work item last
   worked on.
2. `begin`, `go` and every skill that adds a `_history.md` row set it, except `help`.

### Go

1. `go` runs the narrow check, then a secret scan of the files it added or changed (the
   Security check of `flow-verify`). Both always run, with or without a flag.
2. A failed check or scan stops `go`. It reports and commits nothing. Smarter recovery
   comes later.
3. `--check` also runs the project's own lint and unit tests, found the way `flow-verify`
   finds them. Nothing found is `skipped`, never a pass.
   - It is opt-in, because a change can be only docs or a cleanup
   - `--auto` does not imply it. The flags are separate
4. `--auto` asks nothing, and goes on to commit, push and open a pull request. In order:
   1. Create a branch before any edit, in the branch format. Never work on the base branch
   2. Implement, run the checks and the scan. A hand-off, a failed check or a finding
      stops it before the commit
   3. Stage only the files the change touched, never `git add -A`, then commit
   4. Push the new branch with `git push -u origin {branch}`
   5. Open the pull request. A pull request that exists for the branch: print its URL and stop
   - `no check found` does not stop `--auto`. The pull request's `## Tests` section says
     `not applicable` when the change has no code to test, such as docs, or
     `no tests found` when it has code and no check was found
5. The commit message is `{type}: {description}`, with the ticket ref. It is defined for
   `--auto` only and is not part of `standards.vcs`.
6. Only `flow-go` lists `git add`, `git commit`, `git push` and `gh pr create` in its
   `allowed-tools`.
7. `--auto` works with GitHub only. GitLab is a separate ticket.

### Status

1. `_status.md` steps are `todo`, `done`, `blocked`, `skip` or `defer`
   (`groups/flow/content/status.md`). `skip` counts as finished. `defer` does not.
2. A phase heading can carry `skip` or `defer` and a reason. Its steps take that status,
   and a step's own status wins.
3. Only the user or `revise` sets `skip` or `defer`. `update` and `resume` never do, and
   every report lists the deferred steps.
4. Discussing or adjusting a design in the same session never changes the mode. Only
   `research`, `review` and `revise` move `flow` to `focus`.
5. Every skill that adds a `_history.md` row sets `recent`, except `help`.

### Direction (not settled)

Direction for the flow group from `update-1.md` to `updates-4-tasks.md`. None of it is
built, and none of it is a rule yet. It moves up into the sections above when it is
decided. The status key is the one in `SKILL-STANDARDS.md`: `todo` (not yet assessed),
`in-review` (conflicts with another item, is unproven, or waits on a decision), `decided`
(agreed, and the text is the rule) and `complete` (decided, and followed by the skills).

```
A change touches api/auth/login.kt, and a rule matches:

  "groups": { "flow": { "escalate": [ { "name": "auth", "paths": ["**/auth/**"], "to": "focus" } ] } }

  flow: mode focus (rule: auth)
  go --force:  _history.md  forced, skipped escalation: auth
```

| # | Lede | Status | Description | Example |
|---|---|---|---|---|
| F1 | Work item layout | todo | Numbered stage artifacts, underscore files for living records, and a dated folder name. | `261115-api-fix-1234/01-change.md`, `_history.md` |
| F2 | Purpose of the record | todo | It keeps intent and status, not every change. Git holds the code history. | no per-edit log in `_history.md` |
| F3 | History row per run | todo | One append-only row per run, including runs that stop or fail. `help`, `recent` and `init` are exempt. | `\| 2026-10-02 14:05 \| begin \| created from ticket 1234 \|` |
| F4 | Blocked-step protocol | todo | Stop, record the reason, never edit the design, never work around it. | `1.3 blocked \| Move internals \| Console expect missing` |
| F5 | Modes follow rules | todo | The mode is the higher of what was asked and what the escalation rules require, checked at intake, after design and in `verify`. | `**/auth/**` forces Focus |
| F6 | Safety floor | todo | The secret scan, the git-write ban and a recorded override apply even under `--force`. | history row `forced, skipped escalation: auth` |
| F7 | Flag semantics | todo | `--force` is per-run only and never a config default. `--auto` may default in config and stops on failure. | `"groups": { "flow": { "go": { "auto": true } } }` |
| F8 | Forced work is tracked debt | todo | A forced change is marked `forced, unreviewed` until it is reviewed. | line in `_status.md`, shown by `recent` |
