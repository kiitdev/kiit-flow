# Skill standards

The standards for writing kiit skills, collected from `CONVENTIONS.md`, `drafts/principles.md`, `shared/shared.md` and the `drafts/261115-updates/` files. This is the working index. Standards for one skill group are in `GROUP-{GROUP}.md`, such as `GROUP-FLOW.md`. Security rules are in `SECURITY.md`, and how a team's standards are applied is in `ENGINEERING-STANDARDS.md`. The schema of the shared `kiit.json` keys is in `shared/README.md`. Where a standard is settled, `CONVENTIONS.md` stays the rule text until this file replaces it.

## Contents
1. [Status](#status)
2. [What we are building](#what-we-are-building)
3. [Structure](#structure)
4. [Skill shape](#skill-shape)
5. [Config](#config)
6. [CLI feel](#cli-feel)
7. [Writing style](#writing-style)
8. [Shared versus specific](#shared-versus-specific)
9. [Behavior](#behavior)
10. [Branding and wording](#branding-and-wording)
11. [Ideas for later](#ideas-for-later)

## Status

| Status | Meaning |
|---|---|
| `todo` | Not yet assessed |
| `in-review` | Being assessed. It conflicts with another item, is unproven, or is waiting on a decision |
| `decided` | Assessed and agreed. The text here is the rule, and `CONVENTIONS.md` and the skills follow it later |
| `complete` | Decided, and now written in `CONVENTIONS.md` and followed by the skills |

The order is the order an item moves through: `todo`, `in-review`, `decided`, `complete`.

Every item starts as `todo`. Each one is assessed and moved on from there.

## What we are building

We are building a **Claude Code plugin**. It is named `kiit` for now, and the name can change later. Every other standard in this file assumes this, so these terms are used the same way throughout.

```
/kiit:flow-go
  |    |    '-- name    go
  |    '------- group   flow
  '------------ plugin  kiit
```

| Term | Meaning | Example |
|---|---|---|
| Plugin | The installed package. It holds all the skills, and its name is the prefix of every command. | `kiit` |
| Skill | One command inside the plugin. It is a folder with a `SKILL.md`. | `flow-go` |
| Skill group | A set of skills for one area of work. Claude Code does not know about groups. | the `flow` skills |
| Group | The first word of a skill name. It names the skill group. | `flow` |
| Name | The second word of a skill name. It says what the skill does in its group. | `go` |
| Skill name | `{group}-{name}`, and the skill's folder name. | `flow-go` |
| Skill command | `/{plugin}:{group}-{name}`. This is what a user types. | `/kiit:flow-go` |

## Structure

How the plugin is laid out, and the rules for naming its skills and groups.

```
plugins/kiit/                      the plugin (item 9)
├── .claude-plugin/plugin.json     plugin name: kiit
├── skills/                        entry points only: frontmatter and a pointer
│   ├── help/SKILL.md              /kiit:help            global
│   ├── flow-help/SKILL.md         /kiit:flow-help       group: flow, name: help
│   ├── flow-go/SKILL.md           /kiit:flow-go         group: flow, name: go
│   ├── work-recent/SKILL.md       /kiit:work-recent     group: work, name: recent
│   └── vcs-branch/SKILL.md        /kiit:vcs-branch      group: vcs,  name: branch
└── groups/                        everything a group needs, in one folder
    ├── core/                      used by two or more groups
    │   ├── instructions/help.md   the global help
    │   ├── content/               tickets.md, projects.md, types.md, ...
    │   └── scripts/               secret-scan.sh
    ├── flow/
    │   ├── settings.json          default settings, overridden by kiit.json
    │   ├── instructions/          go.md, verify.md, ...  one instructions file per skill
    │   ├── content/               work-item.md, status.md, ...  shared by flow skills
    │   └── scripts/               find-work-item.sh
    ├── work/
    └── vcs/
        ├── settings.json
        ├── instructions/          branch.md, pr.md
        ├── content/               formats.md
        └── scripts/               branch-name.sh
```

| # | Lede | Status | Description | Example |
|---|---|---|---|---|
| 1 | Skill folder | decided | Each skill is a folder `skills/{skill name}/` with a `SKILL.md`. | `skills/flow-verify/SKILL.md` |
| 2 | Command form | decided | The command is `/{plugin}:{group}-{name}`. It comes from the plugin name and the skill name, and is never set by hand. | `/kiit:flow-verify` |
| 3 | Group naming | decided | A group is one lowercase word for an area of work, singular or plural, whichever is the natural word. A group exists when it has its own skills and shared files. Current groups: `flow` (the change lifecycle), `work` (across work items, such as `recent`), `vcs` (branches and merge requests). `core` is reserved. | `flow-go`, `work-recent`, `vcs-branch` |
| 4 | Cross-reference form | decided | A skill refers to another skill by its full skill command. Nothing is rewritten at install, so `install.sh` and its `sed` rewrite are retired. | `Run /kiit:flow-design next` |
| 5 | One plugin | decided | All groups ship in one plugin, so they share one prefix. | `/kiit:flow-go` and `/kiit:vcs-branch` from one install |
| 6 | Help skills | decided | Every group has a `{group}-help` skill, even a group with one skill. It lists the group's skills in `order`, read from each skill's `description` and `order` from its frontmatter and the `## Usage` block in its instructions when it runs. It keeps no help text of its own, so it cannot go stale. `help` is reserved as a name in every group. One global `help` skill lists the groups the same way, and points to each group's help. It finds them as a group help finds its skills: one `ls` of `skills/` for the `*-help` folders, then a Read of each `SKILL.md`, taking the group from the folder name and the description from the frontmatter. `help` and `init` are the only skills without a group. | `/kiit:flow-help`, `/kiit:vcs-help`, `/kiit:help`, `/kiit:init` |
| 7 | Group folder | decided | Each group has a folder `groups/{group}/` at the plugin root. It holds `instructions/` (one instructions file per skill), `content/` (text its skills share), `scripts/` (scripts its skills run) and `settings.json` (the group's default settings). A file used by two or more groups goes in `core`. Anything else stays in its group, even if only one skill reads it. There is no rule yet about which groups may read which. | `groups/flow/content/work-item.md`, `groups/flow/scripts/find-work-item.sh` |
| 8 | Core group | decided | `groups/core/` holds the content and scripts that two or more groups use, or that document a key every group shares in `kiit.json`. `core` is not a skill group. Its instructions files are the global `help` and `init`. Any skill may read it. Content: `rules.md` (behavior rules for every skill), `cli.md` (help, errors, argument grammar), `config.md` (where `kiit.json` is, shared keys, group objects), `tickets.md`, `projects.md`, `types.md`. | `core/content/tickets.md` |
| 9 | Plugin root | decided | Each plugin lives in `plugins/{name}/`, so only what runs is installed. Its manifest is `plugins/{name}/.claude-plugin/plugin.json`. The repo root keeps the README, license, drafts, assets and `.claude-plugin/marketplace.json`, which lists each plugin with a `source` of `./plugins/{name}`. There is one plugin for now, `kiit`. | `plugins/kiit/skills/vcs-branch/SKILL.md`, with the marketplace file at the repo root |
| 10 | Scripts | decided | Scripts that skills run live in `groups/{group}/scripts/`. Scripts used by two or more groups live in `groups/core/scripts/`. A skill calls a script by its path under `groups/`, joined with the groups folder (item 37). | `core/scripts/secret-scan.sh` |
| 11 | Skill entry point | decided | `skills/{skill name}/SKILL.md` is only the entry point Claude Code needs. It holds the frontmatter, including `allowed-tools`, and a line that points to the skill's instructions. The instructions are `groups/{group}/instructions/{name}.md`. | `vcs-branch/SKILL.md` has `Groups folder: ${CLAUDE_PLUGIN_ROOT}/groups` and `Follow vcs/instructions/branch.md` |

## Skill shape

A skill is two files: an entry point that Claude Code loads, and an instructions file in its group. These items cover what each one holds, and the order of its parts.

```
skills/flow-go/SKILL.md                  the entry point Claude Code loads
---
description: Do a clear, low-risk change in one pass: no design, just implement and check.
argument-hint: "[project] [type] {ticket|description}"
order: 1
disable-model-invocation: true
---
Groups folder: ${CLAUDE_PLUGIN_ROOT}/groups
Follow flow/instructions/go.md

groups/flow/instructions/go.md           the instructions, no frontmatter
# flow-go
The fast path for a clear, low-risk change. It writes no design, phases or status.

Read first:
- core/content/cli.md
- flow/content/intake.md

## Usage
USAGE: /kiit:flow-go [project] [type] {ticket|description}
...

## Steps
1. Help check: print Usage and stop.
2. Identify the change (intake.md).
...

## Rules
1. Change only the project repo and the new work item folder.
```

| # | Lede | Status | Description | Example |
|---|---|---|---|---|
| 12 | Instructions order | decided | The instructions file `groups/{group}/instructions/{name}.md` has no frontmatter. Its parts come in this order: title and one-line purpose, `Read first:`, `## Usage`, `## Steps`, `## Rules`. `Read first:` is a list of files, one path per line, as paths under `groups/`. Step 1 is the help check, which prints Usage and stops without reading anything. After it, the model reads every file in the `Read first:` list before the next step. | `# vcs-branch`, then `Read first:`, then `- core/content/cli.md` and `- vcs/content/formats.md` on separate lines, then `## Usage` |
| 13 | Frontmatter fields | decided | Fields are in the entry point `SKILL.md` only. Required: `description`, `argument-hint` (the arguments part of the Usage line, kept to match it by hand), `order` (position in its group) and `disable-model-invocation: true` (only the user can start the skill, Claude cannot). Optional: `allowed-tools`, a Claude Code field that skips the prompt for a single command that matches a listed rule. In testing it did not cover `cd` before git, `git -C`, loops or `$(...)`, or reads outside the working directory. Other commands may prompt too. It is documented to apply only to the turn that runs the skill (not tested here). Use it for read-only commands and the plugin's own scripts. It does not block anything. | `order: 1`, `allowed-tools: Bash(git diff:*)` |
| 14 | Purpose versus Usage line | decided | The purpose line is for file readers. The Usage line is what `--help` prints. | purpose: "Designs and implements nothing." Usage: "Create a work item." |
| 15 | Template section | decided | A skill that is the only one to write a file puts `## Template` in its instructions, between Steps and Rules. A template that two or more skills write goes in the group's `content/`, and those skills list it under `Read first:`. | `_research.md`: only `research` writes it, so `## Template` in `groups/flow/instructions/research.md`. `01-change.md`: `begin` and `go` write it, so `groups/flow/content/templates.md` |
| 16 | Named extra sections | decided | Extra sections go after Steps, and Steps must point to each one. | `## Checks` in `flow-verify`, referenced from step 3 |

## Config

How `kiit.json` is structured. It is the one settings file in the user's workspace. It has two kinds of group content: `standards`, what is correct (formats, rules, vocabularies), and `groups`, how a group's skills behave (paths, flags, automation). The keys every group shares are described in `groups/core/content/config.md`, and their fields in `shared/README.md`.

```json
{
  "version": 1,
  "tickets":  [ { "name": "gh", "type": "github", "owner": "acme" } ],
  "projects": [ { "name": "api", "path": "./api" } ],
  "standards": {
    "vcs": { "types": ["feat", "fix", "docs", "hotfix"] }
  },
  "groups": {
    "flow": { "work_items": "docs/work" }
  }
}
```

Two places hold settings, and they do different jobs:

| | `groups/{group}/` (`settings.json`, `standards.json`) | `.claude/kiit/kiit.json` |
|---|---|---|
| Holds | the group's default settings and default standards | the workspace's own settings: the shared lists, plus overrides of defaults |
| Lives in | the plugin | the user's workspace |
| One per | group | workspace |
| Written by | the plugin author | `init` for `tickets` and `projects`, the user for the rest |
| Changes when | the plugin is updated | the user edits it |
| Contains | every setting and standard the group has | only what differs from the default |

A skill finds a setting or standard in this order and stops at the first match: the command line, then `kiit.json`, then the group's `settings.json` or `standards.json`.

```
groups/flow/settings.json                     { "work_items": "_kiit/flow", "review": { "baseline": "standards" } }
kiit.json  groups.flow                        { "work_items": "docs/work" }
                                              ────────────────────────────────────────────────
what the flow skills use                      work_items = "docs/work"          (from kiit.json)
                                              review.baseline = "standards"     (from settings.json)
```

| # | Lede | Status | Description | Example |
|---|---|---|---|---|
| 17 | File location | decided | The file is `.claude/kiit/kiit.json`. The workspace root is the nearest folder, from the working directory upward, that contains it. Paths in the file are relative to that root. The lookup reads one folder at a time with the Read tool and no shell, so a parent folder outside the working directory can prompt for permission, which is accepted. A skill that finds no file stops with an error that suggests `init`. | `error: .claude/kiit/kiit.json not found` |
| 18 | Top-level shape | decided | `.claude/kiit/kiit.json` has `version`, then the keys shared by every group (`tickets`, `projects`, `resources`), then `standards` and `groups`. `standards` holds what is correct, one object per area, such as `vcs`. `groups` holds how skills behave, one object per group. A name can never collide with a shared key. An area or group with nothing to override has no object. | `{ "tickets": [...], "standards": { "vcs": { ... } }, "groups": { "flow": { "work_items": "_kiit/flow" } } }` |
| 19 | Format version | decided | `version` is the number of the file format, currently `1`. | `"version": 1` |
| 20 | Shared keys | decided | `tickets`, `projects` and `resources` are shared by every group. Each is a list of named entries with no plugin default. `init` writes `tickets` and `projects`, and `resources` are added by hand. `tickets[]` has a required unique `name`, a `type` (`github`, `gitlab`, `jira`, `linear`, `other`), `owner`, `url` and a default `project`. `projects[]` names its ticket system in `tickets` and its issue project in `ticketProject`. For a bare ticket number the issue project is `ticketProject`, else the entry's `project`, else the project `name` (`github` and `gitlab` only). `tickets` may be left out with one ticket entry and is required with two or more. `resources[]` needs `name`, one of `path` or `url`, and `purpose`. `projects[].baseBranch` beats `standards.vcs.baseBranch`. The fields, defaults and examples are in `shared/README.md`, and the rules skills follow are in `groups/core/content/config.md`. | `"projects": [ { "name": "api", "path": "./api", "tickets": "work", "ticketProject": "billing" } ]` |
| 21 | Overrides | decided | `groups.{group}` and `standards.{area}` in `kiit.json` override the defaults in `groups/{group}/settings.json` and `groups/{group}/standards.json`. Same shape as the default file, and only the keys the workspace changes are written. The rest keep their defaults. A skill does not read another group's `groups.*` object. `standards.*` can be read across groups. | `"standards": { "vcs": { "types": ["feat", "fix", "docs", "hotfix"] } }` replaces the default type list |
| 22 | Defaults | decided | Defaults are in `groups/{group}/settings.json` (behavior) and `groups/{group}/standards.json` (what is correct), in the same shape as their objects in `kiit.json`. `kiit.json` holds only overrides. A key there replaces the default for that key, whole, one level below `standards.{area}` or `groups.{group}`: a scalar, a list or an object. A key that is missing takes the default. A skill takes a value from the command line first, then `kiit.json`, then the plugin default, and lists the default file under `Read first:` when it reads it. Every key except the shared lists is optional, so a skill never fails for a missing optional key. | `kiit.json` sets `types`, and every other `vcs` key, such as `branch`, comes from `groups/vcs/standards.json` |
| 23 | Who writes it | decided | `init` is a global skill with its instructions in `core`. It writes `tickets` and `projects`, and no `resources` or defaults. It infers what it can, such as projects from the git repos and a ticket system's type and owner from the remote (read-only git), and asks only for a confirmation, or for the ticket system of a project that has none. Resources are added by users. Developers edit `kiit.json` themselves to change their own settings, now and then. Every other skill only reads it. | `init` adds a project, and a developer sets `groups.flow.work_items` by hand |
| 24 | No secrets | decided | `kiit.json` holds no tokens or passwords, because it can be committed. It names where a secret comes from, never the secret. This covers every `url`. | a ticket system entry has a `url`, not a token |

## CLI feel

Skills read like command-line tools: a man-page Usage block, predictable arguments and errors.

```
USAGE: /kiit:flow-go [project] [type] {ticket|description} [--auto]

  Do a clear, low-risk change in one pass: create a work item, implement it, and check it.

ARGUMENTS:
  [project]      : Optional : a project name or alias. Needed with a description
  [type]         : Optional : feat fix build chore ci docs perf refactor revert style test
  {ticket}       : Required : 1234, #1234, ABC-123 or an issue URL
  {description}  : Required : used when there is no ticket: the change to make
  [--auto]       : Optional : do not ask, record what was assumed

EXAMPLES:
  /kiit:flow-go https://github.com/acme/api/issues/12
  /kiit:flow-go api docs fix a typo in the status code table --auto
```

An error, and the end of a run:

```
error: cannot infer type
valid: feat fix build chore ci docs perf refactor revert style test

Changed 2 files. Tests pass.
Next: /kiit:flow-verify
```

| # | Lede | Status | Description | Example |
|---|---|---|---|---|
| 25 | Man-page Usage block | decided | Caps headers, two blank lines between sections, colons aligned. | `USAGE:`, `ARGUMENTS:`, `EXAMPLES:` |
| 26 | Argument notation | decided | `{x}` is required and `[x]` is optional. Each line reads `name : Required\|Optional : description`. It documents the arguments for people and for `help`, and is not a strict parser, since the model also reads the user's wording. | `[type]  : Optional : feat fix build ...` |
| 27 | Help handling | decided | `help`, `-h`, `-help` and `--help` print the Usage block and stop. The check is step 1 of every skill (item 12), so nothing else is read first. | `/kiit:flow-go --help` |
| 28 | Error format | decided | `error: {what}`, then `valid: {choices}` when the set is fixed. | `error: cannot infer type` / `valid: feat fix ...` |
| 29 | Report ending | decided | A skill that changes or checks something ends with a short report of what happened, including a run that stops or fails. It names the next command only when there is a natural next step. Skills that only print, such as the help skills, end with their output. | `verify` ends with `Next: /kiit:flow-update`, `vcs-branch` ends with the branch name and no next step |
| 30 | Flag style | decided | Flags are long, never a single dash. `--name` is a switch, and `--name <value>` is a flag with a value. A skill's declared flags are recognized anywhere on the line, and are taken out before the positionals are read. | `--fresh`, `--auto`, `--base <branch>`, as in `/kiit:flow-go fix the typo --auto` |
| 31 | Unknown input | decided | Only the flags a skill declares count as flags. Anything else that starts with `--` is part of the text. A near miss of a declared flag gets one question, such as `did you mean --auto?`, and is never guessed. A hard error is for what cannot be inferred, such as a missing required value, and uses the `error:` and `valid:` format. | `/kiit:flow-go add a --verbose flag to the cli` treats `--verbose` as text. `--atuo` asks `did you mean --auto?` |

## Writing style

How the text of a skill is written, so it stays short and skimmable.

```
Good:
1. Identify the change (intake.md): the project, the type, and the ticket or description.
   - A ticket is one token: `1234`, `#1234`, `ABC-123` or an issue URL
   - Anything else is a description

Not:
1. In the past this step read the config first, but it now identifies the change, which
   covers the project, and also the type, and then the ticket or the description if any.
```

| # | Lede | Status | Description | Example |
|---|---|---|---|---|
| 32 | Line limits | decided | In an instructions file, numbered lines are 90 characters or fewer and child lines 80 or fewer. Code, tables and templates are exempt. | a 90-character step, an 80-character child line |
| 33 | Plain steps | decided | One idea per line, start with a verb, no history notes. | `Create the work item (work-item.md).` |
| 34 | File size | decided | An instructions file or a content file is about 100 lines, excluding frontmatter. Aim for fewer. | `flow-go` is 66 lines. `flow-review` is 111, so it needs trimming or splitting |

## Shared versus specific

Where a fact lives, so it is written once, and so a skill loads only what it uses.

```
groups/core/content/tickets.md        two or more groups use it    flow intake, vcs-branch
groups/flow/content/work-item.md      several flow skills use it   begin, go, resume
groups/flow/instructions/verify.md    one skill uses it            the checks are written in verify

before   every flow skill read shared.md, 418 lines, and used a small part of it
after    flow-go reads the few small files in its Read first: list
```

| # | Lede | Status | Description | Example |
|---|---|---|---|---|
| 35 | Write a fact once | decided | A fact used by two or more skills of a group goes in that group's `content/`. A fact used by two or more groups goes in `core`. A fact used by one skill stays in that skill's instructions. A skill never copies a fact, and never reads another skill's instructions file. | the work item layout is in `flow/content/work-item.md`, and a step says `Create the work item (work-item.md)` |
| 36 | Keep content light | decided | A content file holds one concept and stays within the file size limit (item 34), so a skill that reads it loads little it does not use. There is no large catch-all file. A skill lists under `Read first:` only the files it needs on every run. A file needed only on some paths is not listed, and the step that needs it reads it there. | `go` lists `intake.md` and `work-item.md`. It reads `gates.md` only if it hands off |
| 37 | Content path | decided | Only the entry point `SKILL.md` uses `${CLAUDE_PLUGIN_ROOT}`, because Claude Code substitutes it only in the skill body. The entry point states the groups folder once. Instructions and content refer to files by their path under `groups/`, and the model joins that with the groups folder. There are no `..` paths. | entry point: `Groups folder: ${CLAUDE_PLUGIN_ROOT}/groups`. Instructions: `Read core/content/tickets.md` |

## Behavior

How a skill treats the user, whatever its job. Rules that keep a skill from doing harm are in `SECURITY.md`.

```
verify: lint pass
        tests skipped: no test command found
        security pass
```

| # | Lede | Status | Description | Example |
|---|---|---|---|---|
| 38 | Decide or ask | todo | Decide when the choice is reversible and inside the change. Ask when it changes the result or cannot be undone. Whatever a skill decides, it prints in one line, so the user can step in. A skill that is told not to ask records the assumption instead. | `project: api, type: fix, anchor: ...` is printed. An ambiguous project is asked |
| 39 | Honest reporting | todo | A failed check is failed, a skipped check is skipped, and "no check found" is never a pass. | `no check found` |
| 43 | Shell calls | decided | A skill runs one command per call where it can, and avoids what prompted in testing: `git -C`, loops and `$(...)`. `cd` goes in its own call. Files are read with the Read tool. The rules are in `core/content/shell.md`. | `cd {project path}`, then `git branch --list ...` as a separate call |

## Branding and wording

How Kiit and its skills are described in text.

```
Kiit: engineering standards for AI coding agents.
Start with solid defaults, make them yours.
```

| # | Lede | Status | Description | Example |
|---|---|---|---|---|
| 40 | Never show "Kiit" bare | todo | Always include the descriptor. | "Kiit: engineering standards for AI coding agents" |
| 41 | Don't overclaim enforcement | todo | Say "standards that tighten as risk rises", not "enforces your standards". | README headline |
| 42 | Tone | todo | "Your team's standards", never authoritative. No `claude` in the name. | "Start with solid defaults, make them yours" |

## Known conflicts

| Items | Conflict |
|---|---|
| S1 in `SECURITY.md` and `update-1` item 6 | No git writes, against a `vcs` group that creates branches |
| 38 and `update-1` item 5 | Decide or ask, against `flow-design` step 7 saying not to ask |
| 2, 4 and 5 | Cross-reference rewriting and the `/kiit-flow-*` form go away once the plugin ships |

## Ideas for later

Not part of the standards yet. None of these are needed now.

| Idea | What it is | Why it might help |
|---|---|---|
| Skill linter | A shell script in a `scripts/` folder at the repo root, not installed with the plugin. It checks the skills against this file: the instructions parts and their order, required frontmatter, `argument-hint` matching the Usage line, paths in `Read first:` and steps existing under `groups/`, `/kiit:` references pointing at real skills, and the line limits. | Rules that nothing checks drift. It would also catch a skill that points at a content file that was renamed. |
| Instructions in `SKILL.md` | A fallback to the thin entry point (item 11). `SKILL.md` holds the frontmatter and the instructions, and only the shared content is read from `groups/{group}/content/`. The `Read first:` list then uses `${CLAUDE_PLUGIN_ROOT}/groups/...` paths directly, and `groups/{group}/instructions/` goes away. | It saves one read per run, so there is one less permission prompt or skipped read to worry about. Use it if the plugin test shows the extra read is a problem. It gives up the thin entry point, so porting to another agent means copying the instructions. |
