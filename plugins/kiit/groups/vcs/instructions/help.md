# vcs-help

Lists the vcs skills. It keeps no help text of its own.

Read first:
- core/content/shell.md

## Usage
```
USAGE: /kiit:vcs-help

  List the vcs skills, in order, each with its description and arguments.
```

## Steps
1. List the folders `vcs-*` under `skills/` in the plugin, except `vcs-help`.
   - One `ls` call on the `skills/` folder, with no loop or `cd`
2. Read each one's `SKILL.md` with the Read tool, one call each. Take `description`,
   `argument-hint` and `order` from the frontmatter at the top.
3. Print them by `order`: `/kiit:{skill} {argument-hint}`, then the description.
4. End with: `Run /kiit:{skill} --help for details.`

## Rules
1. Read only. Print what the files say, and nothing added.
