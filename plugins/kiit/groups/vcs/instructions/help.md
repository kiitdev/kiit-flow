# vcs-help

Lists the vcs skills. It keeps no help text of its own.

## Usage
```
USAGE: /kiit:vcs-help

  List the vcs skills, in order, each with its description and arguments.
```

## Steps
1. List the folders `vcs-*` under `skills/` in the plugin, except `vcs-help`.
2. Read each one's `SKILL.md` frontmatter: `description`, `argument-hint` and `order`.
3. Print them by `order`: `/kiit:{skill} {argument-hint}`, then the description.
4. End with: `Run /kiit:{skill} --help for details.`

## Rules
1. Read only. Print what the files say, and nothing added.
