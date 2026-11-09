---
description: Set up a workspace: find the projects and write the config.
argument-hint: ""
order: 0
disable-model-invocation: true
---

# flow-init

Set up a workspace from what is already there: find the projects, read their remotes, and write `.claude/kiit/kiit.json` and the work item folder. Changes no project.

Read `.claude/kiit/flow/shared.md` first. Its workspace rule doesn't apply: init creates the config.

## Usage
```
USAGE: /flow-init

  Set up the workspace: find the projects and write kiit.json.


ARGUMENTS:
  none


EXAMPLES:
  /flow-init
```

## Steps
1. Use the working directory as the workspace root.
   - A `.claude/kiit/kiit.json` here or above: use that folder, and update it
2. Find the projects. Each immediate subfolder that is a git repository is one.
   - Skip hidden folders and the work item folder
   - Name it by its folder, with the path `./{folder}`
   - The workspace is itself a repository: one project, with the path `.`
   - None found: `error: no git repositories found`, and stop
3. Read each project's `origin` remote to find its ticket system.
   - `git -C {path} remote get-url origin`. Both https and ssh forms count
   - A GitHub remote gives a `github` system with its `owner`, one per owner
   - Two or more owners: name each system by its owner, and set `tickets` on the
     projects. Put the owner with the most projects first
   - The repo name differs from the folder name: set `repo`
   - No system at all: write `"tickets": []`
4. Look for a folder of standards: `standards`, or `standards` one level down.
   - Found: include it as the `standards` resource
5. A `github` system is set and `gh` isn't installed: warn that tickets need it.
6. Show what was found and what will be written, then ask once.
   - The projects, ticket systems, standards folder and work item folder
   - Ask: `Write this? Say yes, or what to change`, such as adding Jira
   - A change in the reply is applied. Don't ask again
   - An existing file: add what is missing, and keep every value it has
   - Change an existing value only when the reply says to
7. Write `.claude/kiit/kiit.json`, and create the `flow.work_items` folder.
   - `flow.work_items` is `_kiit/flow` unless the file sets it
8. Print what was set up, then the next step.
   - `/flow-begin {project} {type} {description}`, with a real project name
   - The workspace is a repository: suggest `_kiit/` in `.gitignore`, no edit

## Rules
1. Write only `.claude/kiit/kiit.json` and the work item folder.
2. No git write commands. Reading a remote is fine.
3. It is the one skill that runs without a `kiit.json`.
4. Running it again is safe. It asks before any change.
