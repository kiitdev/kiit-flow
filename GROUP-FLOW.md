# Flow group

Standards for the `flow` group only: the work item records, the modes and the escalation rules. Other groups do not use them. They are part of the skill standards, kept in their own file. `SKILL-STANDARDS.md` has the layout, naming and style rules every skill follows. The modes and enforcement items are direction from `update-1.md` to `updates-4-tasks.md`, and none of it is built yet.

## Status

The same key as `SKILL-STANDARDS.md`. Every item starts as `todo`.

| Status | Meaning |
|---|---|
| `todo` | Not yet assessed |
| `in-review` | Being assessed. It conflicts with another item, is unproven, or is waiting on a decision |
| `decided` | Assessed and agreed. The text here is the rule |
| `complete` | Decided, and now followed by the skills |

## Work items and modes

```
_kiit/flow/261115-api-fix-1234/
|-- 01-change.md      the change as asked
|-- 02-design.md      the design
|-- 03-phases.md      numbered phases and steps
|-- 04-review.md      findings and verdict, optional
|-- _status.md        the mode, and where each step stands
|-- _history.md       append-only table of what happened
|-- _research.md      what was looked into
`-- _files/input, output
```

```
A change touches api/auth/login.kt, and a rule matches:

  "groups": { "flow": { "escalate": [ { "name": "auth", "paths": ["**/auth/**"], "to": "focus" } ] } }

  flow: mode focus (rule: auth)
  go --force:  _history.md  forced, skipped escalation: auth
```

| # | Lede | Status | Description | Example |
|---|---|---|---|---|
| F1 | Work item layout | todo | Numbered stage artifacts, underscore files for living records, and a dated folder name. | `261115-api-fix-1234/01-change.md`, `_history.md` |
| F2 | Purpose of the record | todo | It keeps intent and status, not every change. Git holds the code history. | no per-edit log in `_history.md` |
| F3 | History row per run | todo | One append-only row per run, including runs that stop or fail. `help`, `recent` and `init` are exempt. | `\| 2026-10-02 14:05 \| begin \| created from ticket 1234 \|` |
| F4 | Blocked-step protocol | todo | Stop, record the reason, never edit the design, never work around it. | `1.3 blocked \| Move internals \| Console expect missing` |
| F5 | Modes follow rules | todo | The mode is the higher of what was asked and what the escalation rules require, checked at intake, after design and in `verify`. | `**/auth/**` forces Focus |
| F6 | Safety floor | todo | The secret scan, the git-write ban and a recorded override apply even under `--force`. | history row `forced, skipped escalation: auth` |
| F7 | Flag semantics | todo | `--force` is per-run only and never a config default. `--auto` may default in config and stops on failure. | `"groups": { "flow": { "go": { "auto": true } } }` |
| F8 | Forced work is tracked debt | todo | A forced change is marked `forced, unreviewed` until it is reviewed. | line in `_status.md`, shown by `recent` |
