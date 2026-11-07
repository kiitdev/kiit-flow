# Skill conventions

Rules for writing and changing the skills in `skills/`. Read this before adding one.

## Contents
1. [Names](#names)
2. [Shape](#shape)
3. [Usage block](#usage-block)
4. [Writing style](#writing-style)
5. [Shared or specific](#shared-or-specific)
6. [Behavior](#behavior)
7. [Checklist](#checklist)

## Names
1. A skill lives in `skills/flow-{name}/SKILL.md`. The name is one lowercase word.
   - Installed as `kiit-flow-{name}`, so the command is `/kiit-flow-{name}`
   - As a plugin it will be `/kiit:flow-{name}`
2. Refer to other skills as `/flow-{name}`. `install.sh` rewrites it for the install.
3. The only path a skill names is `.claude/kiit/flow/shared.md`, once, near the top.

## Shape
Every `SKILL.md` has the same parts, in this order, and nothing else unless needed.

1. Frontmatter
2. Title and a one-line purpose
3. `Read .claude/kiit/flow/shared.md first.` (not in `flow-help`)
4. `## Usage`
5. `## Steps`
6. `## Rules`

A skill that writes a file adds `## Template` between Steps and Rules.

A skill may add named sections after Steps, such as `## Re-runs`. Steps must point to each one.

The purpose line and the Usage line are different on purpose.
1. The purpose line is for someone reading the skill file.
   - It says what the skill does, and what it does not do
2. The Usage line is a short summary for the command line.
   - It is what `--help` prints

| Frontmatter | Value |
|---|---|
| `description` | One line. `flow-help` shows it. |
| `argument-hint` | The arguments, as in the USAGE line. |
| `order` | Position in `flow-help`. Lifecycle order. |
| `disable-model-invocation` | `true`. Skills run only when typed. |

## Usage block
The `## Usage` block is the only help text. `flow-help` and `--help` print it.

```
USAGE: /flow-begin [project] [type] {ticket|description}

  Create a work item: a folder with 01-change.md and _history.md.


ARGUMENTS:
  [project]     : Optional : a key in projects. Needed with a description
  [type]        : Optional : feat fix build chore ci docs perf refactor revert style
                             test (feature = feat, tests = test)
                             Needed with a description
  {ticket}      : Required : 1234, #1234, ABC-123 or an issue URL (GitHub, Jira, ...)
  {description} : Required : used when there is no ticket: the requirements


EXAMPLES:
  /flow-begin https://github.com/kiitdev/kiit-codes/issues/12
  /flow-begin kiit-inputs feat port the service id to typescript
```

1. Section headers are in caps: `USAGE:`, `ARGUMENTS:`, `EXAMPLES:`.
2. Leave two blank lines before each header after the first.
3. `{x}` is required and `[x]` is optional.
4. Each argument line is `name : Required|Optional : description`, colons aligned.
   - An Optional one that is sometimes needed says when, in its description
5. One or two examples.
6. Handling `help`, `-h`, `-help` and `--help` is in `shared.md`. Don't repeat it.

## Writing style
1. Numbered lines are 90 characters or fewer. Child lines are 80 or fewer.
   - Code blocks, tables and templates are exempt
2. One idea per line. Plain words. Start steps with a verb.
3. No history notes, no "previously" or "now".
4. Errors are `error: {what}`, then `valid: {choices}` when there is a fixed set.
5. Every run ends with a short report and the next command to run.

## Shared or specific
1. A fact used by two or more skills goes in `shared.md`. Write it once.
2. A fact used by one skill stays in that skill.
3. A skill never copies `shared.md`. It says `(shared.md)` and moves on.
4. A skill never reads another skill's `SKILL.md`. Move the shared part to `shared.md`.

## Behavior
1. Stop and ask when a choice changes the result. Don't guess.
2. Report outcomes as they are. A skipped check is skipped, a failed one is failed.
3. Add one row to `_history.md` per run, except `help` and `recent`.
4. Never run git write commands. The user commits and pushes.
5. Write only inside the work item folder, plus the project repo when code changes.

## Checklist
1. The parts are in the order under Shape.
2. Headers in the Usage block are in caps and `argument-hint` matches the USAGE line.
3. No line is over the limits under Writing style.
4. Nothing is repeated from `shared.md` or another skill.
5. References to other skills are written `/flow-{name}`.
6. `./install.sh .`, restart, and run it. Then `/kiit-flow-help` lists it correctly.
