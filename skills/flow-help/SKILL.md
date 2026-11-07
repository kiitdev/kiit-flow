---
description: Show the flow commands, or the usage of one command.
argument-hint: "[command]"
order: 9
disable-model-invocation: true
---

# flow-help

Print the usage of the flow commands. It keeps no help text of its own: everything comes from the other skills' `## Usage` blocks.

## Usage
```
USAGE: /flow-help [command]

  Show the flow commands, or the full usage of one.


ARGUMENTS:
  [command] : Optional : a command name such as begin or update. Omit to list all


EXAMPLES:
  /flow-help
  /flow-help update
```

## Steps
1. Find the flow skills: `.claude/skills/kiit-flow-*/SKILL.md`, here or in a parent.
   - None found: `error: no flow skills found`
2. From each skill, take its `description`, its `order` and its `USAGE:` line.
3. Treat `-h`, `-help` and `--help` as `help`.
4. No argument: print the list below in one code block, nothing else.
   - Sort by `order` (none last, then by name) and number from 1
   - Line 1: number, command, arguments. Line 2: description under the arguments
   - Indent two spaces, pad commands to the longest, blank line between entries
5. A command: print that skill's `## Usage` block in a code block, nothing else.
   - Unknown: `error: unknown command '{x}'` then `valid: {names}`

## Example
```
flow: take a change from idea to PR, one work item at a time

COMMANDS:
  1. /flow-begin  {project} {type} {ticket|description}
                  Create a work item from a ticket or a description.

  2. /flow-help   [command]
                  Show the flow commands, or the usage of one command.

Run /flow-help <command> for arguments and examples.
```

## Rules
1. Read-only. Write no file.
2. No git write commands.
