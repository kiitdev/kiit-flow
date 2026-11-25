# Work item

One folder per unit of work, in `_kiit/flow/items/`. `go` and `begin` create it. The
other flow skills read it.

## Layout
```
{folder name}/
├── 01-change.md   # the change as asked
├── 02-design.md   # the design
├── 03-phases.md   # numbered phases and steps
├── 04-review.md   # findings, verdict and stage, optional
├── _status.md     # the mode, and where each step stands
├── _history.md    # append-only table of what happened
├── _research.md   # what was looked into, optional
└── _files/
    ├── input/
    └── output/
```
Numbered files are stage artifacts, written in order. Underscore files are updated as
work goes on. `begin` and `go` write `01-change.md` and `_history.md`.

## Folder name
`{yymmdd}-{nnn}-{project}-{type}-{ticket|short-name}`, such as `261125-003-kiit-flow-feat-24`.
1. `{yymmdd}`: today, from `date +%y%m%d`.
2. `{nnn}`: a three-digit counter that starts at `001` each day.
   - List `_kiit/flow/items` with one `ls` call. Take the folders that start with today's date
   - The counter is the highest one plus 1. Never store it
   - Past `999`: `error: too many work items today`
3. `{ticket}` is the ticket id. With a description, `{short-name}` is lowercase letters,
   digits and `-`, four words ideally and five at most.
   - Keep the key nouns and verbs. Drop filler like "the", "to", "like", "in"
4. The project is also in `01-change.md` (`Project` and `Path`). Project names can contain
   hyphens, so never parse the folder name.

## Find the item of a ticket
By name, never by recency. From the same `ls` call, take the folders that end with
`-{project}-{type}-{ticket|short-name}`.
1. None: there is no item for it.
2. Several: the one with the larger `{yymmdd}-{nnn}`.

## Create
Used by `begin` and `go`, after the change is identified (flow/content/intake.md).
1. Name the folder, with today's date and the next counter.
2. Create it with `_files/input/` and `_files/output/`: `mkdir -p`, one call.
3. Write `01-change.md` (flow/content/templates.md) and `_history.md`.
   - First row: `created from ticket {id}` or `created from description`
4. Set `recent` in `state.json`.

## _history.md
An append-only table. Every skill that runs on a work item adds one row, including a run
that stops, fails or hands off. Not `help`.
1. Time is local: `date '+%Y-%m-%d %H:%M'`.
2. Skill is the command's short name, such as `begin` or `go`.
3. The note is one short line: what ran and the outcome. Write `|` in a note as `/`.
4. Rows are never edited or removed. A later row corrects a mistake.
5. Add a row with the Read and Write tools: read the file, write it back with the row.

## state.json
`_kiit/flow/state.json` has one key, `recent`: the folder name of the work item last worked on.
1. `begin` and `go` set it after the item is made, with the Write tool, as a whole file:
   `{ "recent": "{folder name}" }`, 2-space indent, and a newline at the end.
2. Read it only when a skill takes an optional work item. A missing key means no state.

## Hand-off
`go` hands a change to `/kiit:flow-design` when any of these is true:
1. It needs a design choice, or the requirements are unclear.
2. It is risky: auth or secrets, data or migrations, build or release, or a breaking
   change to a public API.
3. A matched item already holds `02-design.md`. Then print `/kiit:flow-revise` instead.
On a hand-off: add a `_history.md` row (`not one-pass, handed to Flow`), print
`go: this change needs a design or a review` and the command, change no code, and stop.
