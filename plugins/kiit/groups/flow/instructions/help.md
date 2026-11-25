# flow-help

Lists the flow skills. It keeps no help text of its own.

Read first:
- core/content/cli.md
- core/content/config.md
- core/content/shell.md

## Usage
```
USAGE: /kiit:flow-help

  List the flow skills, in order, each with its description and arguments.
```

## Steps
1. Help check: print Usage and stop (core/content/cli.md).
2. Find the workspace and read `.claude/kiit/kiit.json` (core/content/config.md).
   - Missing: `error: .claude/kiit/kiit.json not found`, then `/kiit:init`, and stop
3. Check the group folder: `ls -d _kiit/flow`, as one call from the workspace root.
   - Missing: `error: _kiit/flow not found`, then `/kiit:init`, and stop
4. List the folders `flow-*` under `skills/` in the plugin, except `flow-help`.
   - One `ls` call on the `skills/` folder, with no loop or `cd`
5. Read each one's `SKILL.md` with the Read tool, one call each. Take `description`,
   `argument-hint` and `order` from the frontmatter at the top.
6. Print them by `order`: `/kiit:{skill} {argument-hint}`, then the description.
7. End with: `Run /kiit:{skill} --help for details.`

## Rules
1. Read only. Print what the files say, and nothing added.
