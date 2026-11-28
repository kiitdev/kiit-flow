# Remotes to projects

How `init` turns a repo and its remote into `tickets` and `projects` entries.
The fields are in core/content/kiit-json.md, and the rules are in `core/content/config.md`.

## Repos
A repo is a subfolder of the workspace with a `.git` entry: `ls -d */.git`.
`.git` may be a file, as in a worktree or a submodule. Deeper folders are not searched.

## Remote
`git remote get-url origin` gives one of these forms:
- `git@{host}:{path}.git`
- `https://{host}/{path}` with or without `.git`
- `ssh://git@{host}/{path}`

The last segment of `{path}` is the repo name. The rest is the owner.
No `origin`, or a form not listed here: no ticket system for that repo.

## Ticket system
| Host | `type` | `owner` | `url` |
|---|---|---|---|
| `github.com` | `github` | the owner | not written |
| `gitlab.com` | `gitlab` | the group, with `/` if nested | not written |
| `gitlab.{x}` or the host starts with `gitlab.` | `gitlab` | the group | `https://{host}` |
| any other host | none | none | none |

1. A host that is not in the table is not guessed. The repo gets a project and no
   `tickets` entry, and `init` says so.
2. Repos with the same `type`, `owner` and `url` share one entry.
3. The entry `name` is the last segment of `owner`. A clash with another entry adds the
   type: `acme-gitlab`.
4. Jira, Linear and `other` cannot come from a remote. `init` only says that a base URL
   and a default project are needed. It does not ask for them or write them.
5. No token or password goes in the file, including in a `url`. A remote that has
   credentials in it, such as `https://user:token@host/...`, is read without them.

## Project
| Field | Value |
|---|---|
| `name` | the folder name |
| `path` | `./{folder}` |
| `aliases` | see Aliases. Left out when there are none |
| `tickets` | the entry `name`. Written only when there are two or more entries |
| `ticketProject` | the repo name, only when it differs from `name` |
| `baseBranch` | see Base branch. Left out when not needed |

With two or more ticket entries, a project with no ticket system needs one. `init`
asks which one in the confirmation step. It never writes a project that fails
`error: project '{p}' has no tickets`.

## Aliases
1. Every project name starts with the same word and a hyphen, such as `kiit-`:
   the rest of the name is the alias. `kiit-flow` gets `flow`.
2. Otherwise no alias is proposed.
3. An alias that repeats a project name or another alias is left out.
4. The user can change aliases in the proposal.

## Base branch
1. Read each repo's default branch: `git remote show origin`, the `HEAD branch` line.
   A call that fails, or says `(unknown)`, leaves that repo out of this step.
2. The most common branch is the baseline. A repo that differs gets `baseBranch`.
3. A tie, or fewer than two repos read, writes no `baseBranch`.
4. `standards.vcs.baseBranch: auto` already follows each repo's default branch.
   `baseBranch` is written here so the team can see the difference.

## Order
Entries are written in the order found: `tickets` by first use, `projects` by folder name.
