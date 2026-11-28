# Phases

`03-phases.md`: numbered phases, each with numbered steps. A step is small enough to
implement and check on its own. Steps are numbered `{phase}.{step}` because other
skills address them by number. Only `design` and `revise` edit this file.

```markdown
# Phases: {title}

## Phase 1: {name}
1.1 {step}
1.2 {step}

## Phase 2: {name}
2.1 {step}
```
End each phase with a step for its tests. If it needs none, say why.

## Parts
A part names phases or steps. `update` takes one.

| Part | Means |
|---|---|
| `all` | every phase, in order |
| `1` | every step in phase 1 |
| `1.2` | phase 1, step 2 only |
| `1.2-1.4` | phase 1, steps 2 to 4 |
| `1-3` | phases 1 to 3, every step |
| `1.2-3.1` | from phase 1 step 2 through phase 3 step 1 |
| `1.2-3` | from phase 1 step 2 to the end of phase 3 |
| `2-3.2` | from the start of phase 2 through phase 3 step 2 |
| `1,3` | a list: phases 1 and 3, skipping phase 2 |

1. A range is `A-B`, where each end is a phase (`N`) or a step (`N.M`).
   - A bare phase is its first step before the dash, its last step after it
   - The start can't come after the end
2. A list is parts separated by commas, spaces allowed: `1.2, 3, 5.1-5.3`.
   - Steps run in the order of `03-phases.md`, each once
3. Wording works too: `phase 4` is `4`, and `phases 1 to 3` is `1-3`.
4. An argument is the part if it matches this pattern.
   - A folder name starts with a date, so `261125` also looks like a phase
   - It names a missing phase and prefixes a folder: it is the work item
5. A phase or step that doesn't exist: `error: no phase {n}`, then `valid: {phases}`.
6. Steps with status `skip` or `defer` are left out of a part, and the report says so
   (flow/content/status.md).
