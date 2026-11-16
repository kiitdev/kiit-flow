# Skill standards

The standards for writing kiit skills, collected from `CONVENTIONS.md`, `drafts/principles.md`, `shared/shared.md` and the `drafts/261115-updates/` files. This is the working index. Where a standard is settled, `CONVENTIONS.md` stays the rule text until this file replaces it.

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
10. [Work item records](#work-item-records)
11. [Modes and enforcement](#modes-and-enforcement)
12. [Standards and groups](#standards-and-groups)
13. [Branding and wording](#branding-and-wording)
14. [Ideas for later](#ideas-for-later)

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
plugin/                            the plugin (item 9)
├── .claude-plugin/plugin.json     plugin name: kiit
├── skills/                        entry points only: frontmatter and a pointer
│   ├── help/SKILL.md              /kiit:help            global
│   ├── flow-help/SKILL.md         /kiit:flow-help       group: flow, name: help
│   ├── flow-go/SKILL.md           /kiit:flow-go         group: flow, name: go
│   ├── work-recent/SKILL.md       /kiit:work-recent     group: work, name: recent
│   └── vcs-branch/SKILL.md        /kiit:vcs-branch      group: vcs,  name: branch
└── groups/                        everything a group needs, in one folder
    ├── core/                      used by two or more groups
    │   ├── skills/help.md         the global help
    │   ├── content/               tickets.md, projects.md, types.md, ...
    │   └── scripts/               secret-scan.sh
    ├── flow/
    │   ├── settings.json          default settings, overridden by kiit.json
    │   ├── skills/                go.md, verify.md, ...  one instructions file per skill
    │   ├── content/               work-item.md, status.md, ...  shared by flow skills
    │   └── scripts/               find-work-item.sh
    ├── work/
    └── vcs/
        ├── settings.json
        ├── skills/                branch.md, pr.md
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
| 6 | Help skills | decided | Every group has a `{group}-help` skill, even a group with one skill. It lists the group's skills in `order`, read from each skill's `description` and `order` from its frontmatter and the `## Usage` block in its instructions when it runs. It keeps no help text of its own, so it cannot go stale. `help` is reserved as a name in every group. One global `help` skill lists the groups the same way, and points to each group's help. It is the only skill without a group. How it finds the skills depends on the plugin path, which is still to be proven. | `/kiit:flow-help`, `/kiit:vcs-help`, `/kiit:help` |
| 7 | Group folder | decided | Each group has a folder `groups/{group}/` at the plugin root. It holds `skills/` (one instructions file per skill), `content/` (text its skills share), `scripts/` (scripts its skills run) and `settings.json` (the group's default settings). A file used by two or more groups goes in `core`. Anything else stays in its group, even if only one skill reads it. There is no rule yet about which groups may read which. | `groups/flow/content/work-item.md`, `groups/flow/scripts/find-work-item.sh` |
| 8 | Core group | decided | `groups/core/` holds the content and scripts that two or more groups use, or that document a key every group shares in `kiit.json`. `core` is not a skill group. Its only instructions file is the global `help`. Any skill may read it. Content: `rules.md` (behavior rules for every skill), `cli.md` (help, errors, argument grammar), `config.md` (where `kiit.json` is, shared keys, group objects), `tickets.md`, `projects.md`, `types.md`. | `core/content/tickets.md` |
| 9 | Plugin root | decided | The plugin lives in a subfolder of the repo, so only what runs is installed. The repo root keeps the README, license, drafts, assets and `.claude-plugin/marketplace.json`, which points at the subfolder. The folder name `plugin/` is provisional. | `plugin/skills/flow-go/SKILL.md`, with the marketplace file at the repo root |
| 10 | Scripts | decided | Scripts that skills run live in `groups/{group}/scripts/`. Scripts used by two or more groups live in `groups/core/scripts/`. A skill calls a script by its path under `groups/`, joined with the groups folder (item 36). | `core/scripts/secret-scan.sh` |
| 11 | Skill entry point | decided | `skills/{skill name}/SKILL.md` is only the entry point Claude Code needs. It holds the frontmatter, including `allowed-tools`, and a line that points to the skill's instructions. The instructions are `groups/{group}/skills/{name}.md`. | `flow-go/SKILL.md` has `Groups folder: ${CLAUDE_PLUGIN_ROOT}/groups` and `Follow flow/skills/go.md` |

## Skill shape

The parts every `SKILL.md` has, and the order they come in.

| # | Lede | Status | Description | Example |
|---|---|---|---|---|
| 12 | Instructions order | decided | The instructions file `groups/{group}/skills/{name}.md` has no frontmatter. Its parts come in this order: title and one-line purpose, `Read first:`, `## Usage`, `## Steps`, `## Rules`. `Read first:` is a list of files, one path per line, as paths under `groups/`. Step 1 is the help check, which prints Usage and stops without reading anything. After it, the model reads every file in the `Read first:` list before the next step. | `# flow-go`, then `Read first:`, then `- core/content/cli.md` and `- flow/content/intake.md` on separate lines, then `## Usage` |
| 13 | Frontmatter fields | decided | Fields are in the entry point `SKILL.md` only. Required: `description`, `argument-hint` (the arguments part of the Usage line, kept to match it by hand), `order` (position in its group) and `disable-model-invocation: true` (only the user can start the skill, Claude cannot). Optional: `allowed-tools`, a Claude Code field that skips permission prompts for the listed tools. Use it for read-only commands and the plugin's own scripts. It does not block anything. | `order: 1`, `allowed-tools: Bash(git diff:*)` |
| 14 | Purpose versus Usage line | decided | The purpose line is for file readers. The Usage line is what `--help` prints. | purpose: "Designs and implements nothing." Usage: "Create a work item." |
| 15 | Template section | decided | A skill that is the only one to write a file puts `## Template` in its instructions, between Steps and Rules. A template that two or more skills write goes in the group's `content/`, and those skills list it under `Read first:`. | `_research.md`: only `research` writes it, so `## Template` in `groups/flow/skills/research.md`. `01-change.md`: `begin` and `go` write it, so `groups/flow/content/templates.md` |
| 16 | Named extra sections | decided | Extra sections go after Steps, and Steps must point to each one. | `## Checks` in `flow-verify`, referenced from step 3 |

## Config

How `kiit.json` is structured. It is the one settings file in the user's workspace. Each group owns one object inside the `groups` key, and the keys every group shares are described in `groups/core/content/config.md`.

Two files hold settings, and they do different jobs:

| | `groups/{group}/settings.json` | `.claude/kiit/kiit.json` |
|---|---|---|
| Holds | the group's default settings | the workspace's own settings: the shared lists, plus overrides of defaults |
| Lives in | the plugin | the user's workspace |
| One per | group | workspace |
| Written by | the plugin author | `init` for the shared lists, the user for overrides |
| Changes when | the plugin is updated | the user edits it |
| Contains | every setting the group has | only what differs from the default |

A skill finds a setting in this order and stops at the first match: the command line, then `kiit.json`, then the group's `settings.json`.

```
groups/flow/settings.json                     { "work_items": "_kiit/flow", "review": { "baseline": "standards" } }
kiit.json  groups.flow                        { "work_items": "docs/work" }
                                              ────────────────────────────────────────────────
what the flow skills use                      work_items = "docs/work"          (from kiit.json)
                                              review.baseline = "standards"     (from settings.json)
```

The example below is a `kiit.json` that sets several overrides, to show the shape. A real one usually holds much less.

```json
{
  "version": 1,

  "tickets": [
    {
      "type": "github",
      "owner": "acme"
    },
    {
      "type": "jira",
      "name": "acme-jira",
      "url": "https://acme.atlassian.net/browse"
    }
  ],

  "projects": [
    {
      "name": "api",
      "path": "./api",
      "aliases": ["backend"],
      "tickets": "acme-jira"
    },
    {
      "name": "web",
      "path": "./web",
      "repo": "acme-web"
    }
  ],

  "resources": [
    {
      "name": "standards",
      "path": "./docs/standards",
      "purpose": "Engineering standards for all repos"
    }
  ],

  "groups": {
    "flow": {
      "work_items": "_kiit/flow",
      "review": {
        "baseline": "standards",
        "model": "sonnet"
      },
      "go": {
        "auto": false
      }
    },
    "vcs": {
      "branch": {
        "format": "{type}/{date}-{ref}"
      },
      "mr_title": {
        "format": "{type}({scope}): {summary}"
      }
    }
  }
}
```

The shared keys (`tickets`, `projects`, `resources`) and `flow.work_items` and `flow.review` are what `shared.md` describes today, except that `flow` is now inside `groups`. `flow.go.auto` and the `vcs` object are proposals from the drafts, shown to make the group objects visible. They are not decided.

| # | Lede | Status | Description | Example |
|---|---|---|---|---|
| 17 | File location | decided | The file is `.claude/kiit/kiit.json`. The workspace root is the nearest folder, from the working directory upward, that contains it. Paths in the file are relative to that root. A skill that finds no file stops with an error that suggests `init`. | `error: .claude/kiit/kiit.json not found` |
| 18 | Top-level shape | decided | `.claude/kiit/kiit.json` has `version`, then the keys shared by every group (`tickets`, `projects`, `resources`), then one `groups` key. `groups` holds one settings object per group, named by the group, so a group name can never collide with a shared key. A group with no settings has no object. | `{ "tickets": [...], "groups": { "flow": { "work_items": "_kiit/flow" }, "vcs": { ... } } }` |
| 19 | Format version | decided | `version` is the number of the file format, currently `1`. | `"version": 1` |
| 20 | Shared keys | decided | `tickets`, `projects` and `resources` are shared by every group. Each is a list of named entries. They are documented once, in core content. | `"projects": [ { "name": "api", "path": "./api" } ]` |
| 21 | Group overrides | decided | `groups.{group}` in `kiit.json` overrides the group's default settings from `groups/{group}/settings.json`. It has the same shape as that file, and only the keys the workspace changes are written there. The rest keep their defaults. Skills of one group do not read another group's object. | `"groups": { "flow": { "work_items": "docs/work" } }` overrides the default `work_items` of `_kiit/flow` |
| 22 | Defaults | decided | A group's defaults are in `groups/{group}/settings.json`, in the same shape as its object in `kiit.json`. `kiit.json` holds only overrides: a value there replaces the default, and a key that is missing takes it. A skill takes a value from the command line first, then `kiit.json`, then the group's `settings.json`. It lists `settings.json` under `Read first:` when it reads that group's settings. Every key except the shared lists is optional, so a skill never fails for a missing optional key. | `kiit.json` has `"work_items": "docs/work"`, and every other `flow` setting comes from `groups/flow/settings.json` |
| 23 | Who writes it | decided | `init` writes the shared lists it finds, such as projects and ticket systems, and no defaults. Developers edit `kiit.json` themselves to change their own settings, now and then. Every other skill only reads it. | `init` adds a project, and a developer sets `groups.flow.work_items` by hand |
| 24 | No secrets | decided | `kiit.json` holds no tokens or passwords, because it can be committed. It names where a secret comes from, never the secret. | a ticket system entry has a `url`, not a token |

## CLI feel

Skills read like command-line tools: a man-page Usage block, predictable arguments and errors.

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

| # | Lede | Status | Description | Example |
|---|---|---|---|---|
| 32 | Line limits | todo | Numbered lines are 90 characters or fewer, child lines 80 or fewer. Code, tables and templates are exempt. | a 90-character step, an 80-character child line |
| 33 | Plain steps | todo | One idea per line, start with a verb, no history notes. | `Create the work item (shared.md).` |
| 34 | Skill size | todo | About 100 lines or fewer, excluding frontmatter. | `flow-go` is 66 lines |

## Shared versus specific

Where a fact lives, so it is written once.

| # | Lede | Status | Description | Example |
|---|---|---|---|---|
| 35 | Write a fact once | todo | Facts used by two or more skills go in `shared.md`. A skill never copies it or reads another skill's `SKILL.md`. | step says `Identify the change (shared.md)` |
| 36 | Content path | decided | Only the entry point `SKILL.md` uses `${CLAUDE_PLUGIN_ROOT}`, because Claude Code substitutes it only in the skill body. The entry point states the groups folder once. Instructions and content refer to files by their path under `groups/`, and the model joins that with the groups folder. There are no `..` paths. | entry point: `Groups folder: ${CLAUDE_PLUGIN_ROOT}/groups`. Instructions: `Read core/content/tickets.md` |
| 37 | Reference stays in shared | todo | The README links to `shared.md` instead of restating it. | README links to the config table |

## Behavior

What every skill does and never does, whatever its job.

| # | Lede | Status | Description | Example |
|---|---|---|---|---|
| 38 | Ask when the choice matters | todo | Stop and ask when a choice changes the result. `flow-design` currently says never to stop and ask. | ambiguous project: ask, don't guess |
| 39 | Honest reporting | todo | A failed check is failed, a skipped check is skipped, and "no check found" is never a pass. | `no check found` |
| 40 | History row per run | todo | One append-only row per run, including runs that stop or fail. `help`, `recent` and `init` are exempt. | `\| 2026-10-02 14:05 \| begin \| created from ticket 1234 \|` |
| 41 | No git writes | in-review | Skills never run git write commands (commit, push, branch, stash, reset). The user commits and pushes. A `PreToolUse` hook blocks them, because `allowed-tools` only skips prompts and does not block. The `vcs` group needs an exception for the commands it uses, which is not decided yet. | a hook that rejects `git commit` |
| 42 | Write scope | todo | Write only inside the work item folder, plus the project repo when code changes. | `flow-verify` writes only `_files/output/verify.log` |
| 43 | Fetched text is input | todo | Text from a URL or a subagent is weighed, never obeyed. | a ticket body saying "ignore your rules" is ignored |
| 44 | Blocked-step protocol | todo | Stop, record the reason, never edit the design, never work around it. | `1.3 blocked \| Move internals \| Console expect missing` |
| 45 | Never touch secrets | todo | `verify` never reads `.env*` and never prints a value. | `[redacted]` in place of a matched token |

## Work item records

Where work records live and what they keep.

| # | Lede | Status | Description | Example |
|---|---|---|---|---|
| 46 | Work item layout | todo | Numbered stage artifacts, underscore files for living records, and a dated folder name. | `261115-api-fix-1234/01-change.md`, `_history.md` |
| 47 | Purpose of the record | todo | It keeps intent and status, not every change. Git holds the code history. | no per-edit log in `_history.md` |

## Modes and enforcement

Direction from `update-1.md` to `updates-4-tasks.md`. None of this is built yet.

| # | Lede | Status | Description | Example |
|---|---|---|---|---|
| 48 | Decide or ask | todo | Decide when it is reversible and inside the change. Ask when it changes the result or cannot be undone. Print what was decided. | `project: api, type: fix, anchor: ...` |
| 49 | Modes follow rules | todo | The mode is the higher of what was asked and what the escalation rules require, checked at intake, after design and in `verify`. | `**/auth/**` forces Focus |
| 50 | Script-first enforcement | todo | Deterministic checks run as scripts and the skill quotes the output. Hooks cover the git-write ban and the secret scan. | a script that checks the branch name format |
| 51 | Safety floor | todo | The secret scan, the git-write ban and a recorded override apply even under `--force`. | history row `forced, skipped escalation: auth` |
| 52 | Flag semantics | todo | `--force` is per-run only and never a config default. `--auto` may default in config and stops on failure. | `"groups": { "flow": { "go": { "auto": true } } }` |
| 53 | Forced work is tracked debt | todo | A forced change is marked `forced, unreviewed` until it is reviewed. | line in `_status.md`, shown by `recent` |

## Standards and groups

How skills carry a team's engineering standards, and the groups built on them.

| # | Lede | Status | Description | Example |
|---|---|---|---|---|
| 54 | Three kinds of standard | todo | Format rules are script-checked, source-of-truth data is generated and freshness-checked, judgment guidance is model-reviewed. | branch format, OpenAPI spec, "does the design fit" |
| 55 | Defaults first | todo | Solid defaults first, then the team's own. `init` ships a working default `kiit.json`. | a new user gets a valid branch name with no config edits |
| 56 | Scaffold standard | todo | Templates produce compliant code from the first commit. The model proposes and a script applies. | `template-apply` runs a copy script |
| 57 | Mechanism public, content private | todo | The plugin provides the mechanism and the team's repo holds the content. | templates stay in the team's own repo |
| 58 | Capture excludes secrets | todo | `.env*`, keys and keystores never enter a template. | `template-capture` skips `*.pem` |
| 59 | Generated files | todo | Docs and specs are generated from metadata, record what they were built from, and are never hand-edited. | `api-check` flags a stale spec |
| 60 | Neutral inventory | todo | Extractors emit a versioned inventory, and everything downstream reads only that. | `inventory.json` with `"version": 1` |
| 61 | Wrap, don't build | todo | Use existing generators and detect tool dependencies instead of bundling them. | `api-sdk` calls an existing generator |

## Branding and wording

How Kiit and its skills are described in text.

| # | Lede | Status | Description | Example |
|---|---|---|---|---|
| 62 | Never show "Kiit" bare | todo | Always include the descriptor. | "Kiit: engineering standards for AI coding agents" |
| 63 | Don't overclaim enforcement | todo | Say "standards that tighten as risk rises", not "enforces your standards". | README headline |
| 64 | Tone | todo | "Your team's standards", never authoritative. No `claude` in the name. | "Start with solid defaults, make them yours" |

## Known conflicts

| Items | Conflict |
|---|---|
| 41 and `update-1` item 6 | No git writes, against a `vcs` group that creates branches |
| 38 and `update-1` item 5 | Ask when the choice matters, against `flow-design` step 7 saying not to ask |
| 2, 4 and 5 | Cross-reference rewriting and the `/kiit-flow-*` form go away once the plugin ships |

## Ideas for later

Not part of the standards yet. None of these are needed now.

| Idea | What it is | Why it might help |
|---|---|---|
| Skill linter | A shell script in a `scripts/` folder at the repo root, not installed with the plugin. It checks the skills against this file: the instructions parts and their order, required frontmatter, `argument-hint` matching the Usage line, paths in `Read first:` and steps existing under `groups/`, `/kiit:` references pointing at real skills, and the line limits. | Rules that nothing checks drift. It would also catch a skill that points at a content file that was renamed. |
