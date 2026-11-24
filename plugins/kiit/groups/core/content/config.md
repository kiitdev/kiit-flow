# Workspace and config

## Where
The workspace root is the nearest folder, from the working directory upward, that
contains `.claude/kiit/kiit.json`. Paths in the file are relative to that root.
No file: `error: .claude/kiit/kiit.json not found`, and suggest `/kiit:flow-init`.

## Keys
| Key | Meaning |
|---|---|
| `version` | Config format. Currently `1`. |
| `tickets` | Ticket systems. The first one is the default. |
| `resources` | Named files, folders or links, such as `standards`. |
| `projects` | The repos or folders that work is done in. |
| `standards` | What is correct, one object per area, such as `standards.vcs`. |
| `groups` | How a group's skills behave, one object per group, such as `groups.flow`. |

## Settings order
A skill takes a setting from the command line, then `kiit.json`, then the group's
defaults: `settings.json` for `groups`, `standards.json` for `standards`.
A key missing from all of them is not an error.

## Effective value
The value a skill uses is the effective one: the group's default, with `kiit.json`
applied on top by the rules below. Steps say "effective `standards.vcs`" for it, and name
`kiit.json` only where a user writes or looks for a setting.

## Overrides
`kiit.json` holds only what differs from the default.
1. A scalar replaces the default.
2. A list replaces the default, or is changed with `{ "add": [...], "remove": [...] }`.
3. An object is merged key by key.

## tickets
| Field | Meaning |
|---|---|
| `type` | `github`, `jira`, `linear` or `other`. |
| `owner` | GitHub only. The user or organization that owns the repos. |
| `url` | Other systems. The base link that a ticket id is added to. |

A ticket link is `https://github.com/{owner}/{repo}/issues/{id}` for GitHub, and
`{url}/{id}` for the rest.

## projects
| Field | Meaning |
|---|---|
| `name` | The project name, used in work item folder names. |
| `path` | The project folder. |
| `aliases` | Short names that can be typed instead of `name`. |
| `tickets` | The ticket system to use. Defaults to the first. |
| `repo` | The GitHub repo name. Defaults to `name`. |
| `baseBranch` | This project's base branch. Overrides `standards.vcs.baseBranch`. |

A name or alias used twice in a list: `error: duplicate {list} name '{x}'`.
