# Workspace and config

## Where
The workspace root is the nearest folder, from the working directory upward, that
contains `.claude/kiit/kiit.json`. Paths in the file are relative to that root.
Look one folder at a time: Read `{folder}/.claude/kiit/kiit.json` for the working
directory, then its parent, and so on. No loop, no shell (core/content/shell.md).
A Read outside the working directory can prompt for permission. That is accepted.
No file: `error: .claude/kiit/kiit.json not found`, and suggest `/kiit:init`.

## Keys
| Key | Meaning |
|---|---|
| `version` | Config format. Currently `1`. |
| `tickets` | Ticket systems, with an optional default issue project. |
| `resources` | Named files, folders or links, such as `standards`. |
| `projects` | The repos or folders that work is done in. |
| `standards` | What is correct, one object per area, such as `standards.vcs`. |
| `groups` | How a group's skills behave, one object per group, such as `groups.flow`. |

`tickets`, `resources` and `projects` are the workspace's own lists. They have no plugin
default. The fields, defaults and examples are in core/content/kiit-json.md.

## Settings order
A skill takes a setting from the command line, then `kiit.json`, then the group's
defaults: `settings.json` for `groups`, `standards.json` for `standards`.
A key missing from all of them is not an error.

## Effective value
The value a skill uses is the effective one: the group's default, with `kiit.json`
applied on top by the rule below. Steps say "effective `standards.vcs`" for it, and name
`kiit.json` only where a user writes or looks for a setting.

## Overrides
`kiit.json` holds only what differs from the default.
1. A key replaces the default for that key, whole: a scalar, a list or an object.
2. The keys are the ones directly under `standards.{area}` and `groups.{group}`.
3. A key that is missing keeps its default.

A skill may read another group's `standards.*`, never its `groups.*`.

## tickets
| Field | Meaning |
|---|---|
| `name` | Required, unique. What `projects[].tickets` refers to. |
| `type` | `github`, `gitlab`, `jira`, `linear` or `other`. |
| `owner` | `github`, `gitlab`: the user, organization or group, such as `acme/platform`. |
| `url` | `gitlab`: the host, default `https://gitlab.com`. Others: the base link. |
| `project` | Optional default issue project: a repo, or a Jira or Linear key. |

A ticket link is:
- `github`: `https://github.com/{owner}/{project}/issues/{id}`
- `gitlab`: `{url}/{owner}/{project}/-/issues/{id}`
- `jira`, `linear`: `{url}/{KEY}-{n}`. A bare `n` takes `KEY` from the issue project
- `other`: `{url}/{id}`. `project` is ignored

A full key such as `BILL-123`, or an issue URL, is used as given.

## projects
| Field | Meaning |
|---|---|
| `name` | The project name, used in work item folder names. |
| `path` | The project folder. |
| `aliases` | Short names that can be typed instead of `name`. |
| `tickets` | The ticket system's `name`. |
| `ticketProject` | The issue project, when it differs from the entry's `project`. |
| `baseBranch` | This project's base branch. Overrides `standards.vcs.baseBranch`. |

1. `tickets` may be left out with one ticket entry. With two or more it is required:
   `error: project '{p}' has no tickets`, then `valid: {names}`.
2. A `tickets` name that is not an entry: `error: unknown tickets name '{x}'`,
   then `valid: {names}`.
3. The issue project for a bare number is `ticketProject`, else the entry's `project`,
   else the project `name`, for `github` and `gitlab` only.
4. No issue project: `error: no ticket project for '{p}' in '{t}'`, then
   `valid: set ticketProject on the project, or project on the entry`.

## resources
| Field | Meaning |
|---|---|
| `name` | Required, unique. What skills ask for, such as `standards`. |
| `path` or `url` | Exactly one. A file or folder under the root, or a link. |
| `purpose` | Required. One line on what it is for. |

A missing resource is not an error. `url` holds no token.

## Errors
A name used twice in a list: `error: duplicate {list} name '{x}'`.
A resource with both or neither of `path` and `url`: `error: resource '{x}' has both path
and url` or `has no path or url`. With no `purpose`: `error: resource '{x}' has no purpose`.
