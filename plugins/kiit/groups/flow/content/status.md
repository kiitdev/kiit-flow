# Status

`_status.md`: the mode, and where each step stands. `design` creates it. `update` and
`resume` move steps from `todo` to `done` or `blocked`.

## Format
One line per step, under the phase headings of `03-phases.md` (flow/content/phases.md):

```markdown
# Status: {title}

- **Mode:** flow

## Phase 1: {name}
1.1 done | Move sinks to kiit.logs.sinks
1.2 todo | Move policies to kiit.logs.policies
1.3 blocked | Move internals | Console expect doesn't exist in commonMain
1.4 skip | Add trace methods | superseded by 2.3

## Phase 2: {name} | defer | waits on the API change
2.1 todo | Add the client
```
`{N.M} {status} | {short title}`, plus a reason as a third field for `blocked`, `skip`
and `defer`.
1. Step numbers match `03-phases.md` exactly.
2. Short titles, about 60 characters at most, with no history notes.

## Statuses
| Status | Meaning |
|---|---|
| `todo` | not done yet |
| `done` | implemented, and its check passed or none was found |
| `blocked` | can't be done as designed. The reason says what happened and what was assumed |
| `skip` | deliberately not done. The reason says why. It counts as finished |
| `defer` | not done now, on purpose. The reason says why. It is not finished |

1. A `skip` or `defer` step is never run and is never a gap.
2. A phase heading can carry a status and a reason:
   `## Phase 2: {name} | defer | {reason}`. Every step in that phase has that status. A step's own status wins.
   - Only `skip` and `defer` go on a heading
3. Every report lists the `defer` steps and phases, such as `2 deferred`.
4. Only the user, or `/kiit:flow-revise`, sets `skip` or `defer`. `update` and `resume`
   never do. Say it in the report when one is found.
5. No skill changes a `done` step.

## Mode
The Mode line is `flow` or `focus`. A file with no Mode line counts as `flow`.
1. `design` writes it. `research`, `review` and `revise` switch `flow` to `focus`.
   - Say so in the report
2. Talking about a design, or adjusting it in the same session, never changes the mode.
3. Switching back to `flow` is a request to `revise`. Nothing else does it.
