# kiit.json

The workspace config for the kiit plugin, at `.claude/kiit/kiit.json`. A full example is in
[`kiit.example.json`](kiit.example.json). This page is the schema of the keys the workspace
owns: `tickets`, `resources` and `projects`. The rules skills follow are in
`plugins/kiit/groups/core/content/config.md`.

| Key | Type | Required | Holds |
|---|---|---|---|
| `version` | number | yes | The file format. Currently `1` |
| `tickets` | list | no | Ticket systems |
| `resources` | list | no | Named files, folders and links |
| `projects` | list | yes | The repos or folders that work is done in |
| `standards` | object | no | Overrides of what is correct. One object per area, such as `vcs` |
| `groups` | object | no | Overrides of how skills behave. One object per group, such as `flow` |

`standards` and `groups` are not described here. Their defaults are in each group's
`standards.json` and `settings.json`, in the plugin. `kiit.json` holds only what differs:
a key there replaces the default for that key, whole, one level below
`standards.{area}` and `groups.{group}`. There is no merging.

## tickets
A ticket system is an account (a GitHub organization, a GitLab group, a Jira site), with
an optional default project under it. Each entry needs a unique `name`.

| Field | Type | Required | Default | Description | Example |
|---|---|---|---|---|---|
| `name` | string | yes | none | What `projects[].tickets` refers to. Unique in the list | `"oss"` |
| `type` | string | yes | none | `github`, `gitlab`, `jira`, `linear` or `other` | `"github"` |
| `owner` | string | `github`, `gitlab` | none | The user, organization or group. A GitLab group can be nested | `"acme/platform"` |
| `url` | string | `jira`, `linear`, `other` | `https://gitlab.com` for `gitlab` | `gitlab`: the host. The rest: the base link that an id is added to | `"https://acme.atlassian.net/browse"` |
| `project` | string | no | none | The default issue project: a repo, or a Jira or Linear key. A kiit project can override it with `ticketProject` | `"BILL"` |

A ticket link:

| `type` | Link |
|---|---|
| `github` | `https://github.com/{owner}/{project}/issues/{id}` |
| `gitlab` | `{url}/{owner}/{project}/-/issues/{id}` |
| `jira`, `linear` | `{url}/{KEY}-{n}`. A bare number `n` takes `KEY` from the issue project |
| `other` | `{url}/{id}`. `project` is ignored |

A full key such as `BILL-123`, or an issue URL, is used as given.

## resources
A named pointer to something a skill may read. Skills ask for a resource by name, such as
`standards`. A missing resource is not an error. A `url` holds no token.

| Field | Type | Required | Default | Description | Example |
|---|---|---|---|---|---|
| `name` | string | yes | none | What skills ask for. Unique in the list | `"standards"` |
| `path` | string | one of `path`, `url` | none | A file or folder, relative to the workspace root | `"./docs/standards"` |
| `url` | string | one of `path`, `url` | none | A link to a page or board | `"https://github.com/orgs/acme/projects/1"` |
| `purpose` | string | yes | none | One line on what it is for | `"Engineering standards for all repos"` |

## projects
A kiit project is a repo or folder that work is done in. It is not the same as a ticket
system's project: `projects[]` here is a kiit project, `tickets[].project` is an issue project.

| Field | Type | Required | Default | Description | Example |
|---|---|---|---|---|---|
| `name` | string | yes | none | The project name, used in work item folder names. Unique | `"api"` |
| `path` | string | yes | none | The project folder, relative to the workspace root | `"./api"` |
| `aliases` | list of strings | no | none | Short names that can be typed instead of `name` | `["backend"]` |
| `tickets` | string | with two or more ticket entries | the only entry | The `name` of a ticket system | `"work"` |
| `ticketProject` | string | no | the entry's `project`, else `name` | The issue project, when it differs from the entry's | `"billing-api"` |
| `baseBranch` | string | no | `standards.vcs.baseBranch`, then `auto` | This project's base branch | `"develop"` |

The issue project for a bare ticket number is `ticketProject`, else the entry's `project`,
else the project's `name`. The `name` step applies to `github` and `gitlab` only. A `jira`,
`linear` or `other` entry with no `project` and no `ticketProject` is an error.

## Errors
| When | Error |
|---|---|
| A name or alias used twice in a list | `error: duplicate {list} name '{x}'` |
| `tickets` missing, with two or more entries | `error: project '{p}' has no tickets` |
| `tickets` names no entry | `error: unknown tickets name '{x}'` |
| No issue project for a bare number | `error: no ticket project for '{p}' in '{t}'` |
| A resource with both or neither of `path` and `url` | `error: resource '{x}' has both path and url`, or `has no path or url` |
| A resource with no `purpose` | `error: resource '{x}' has no purpose` |

## Known gaps
- The `vcs` skills (`vcs-branch`, `vcs-pr`) work with GitHub only. A `gitlab` ticket can
  be read, but the merge request step is not ported yet.
