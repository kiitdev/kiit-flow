# Engineering standards

Ideas about how a team's engineering standards are applied and enforced by the skills, as opposed to the conventions for writing the skills themselves, which are in `SKILL-STANDARDS.md`. This is where Kiit differs from other skill packs, so it is worked out separately. It comes from `updates-4`, `updates-5`, `updates-8` and `updates-9` in `drafts/261115-updates/`. Nothing here is built yet.

## Status

The same key as `SKILL-STANDARDS.md`. Every item starts as `todo`.

| Status | Meaning |
|---|---|
| `todo` | Not yet assessed |
| `in-review` | Being assessed. It conflicts with another item, is unproven, or is waiting on a decision |
| `decided` | Assessed and agreed. The text here is the rule |
| `complete` | Decided, and now followed by the skills |

## The kinds of standard

```
format rule      branch name {type}/{date}-{ref}     a script checks it
source of truth  OpenAPI spec                        generated, checked for freshness
judgment         "does the design fit the code"      the model reviews it
```

| # | Lede | Status | Description | Example |
|---|---|---|---|---|
| E1 | Three kinds of standard | todo | Format rules are script-checked, source-of-truth data is generated and freshness-checked, judgment guidance is model-reviewed. | branch format, OpenAPI spec, "does the design fit" |
| E2 | Defaults first | todo | Solid defaults first, then the team's own. The defaults ship in each group's `settings.json`, and `kiit.json` holds only the team's overrides. | a new user gets a valid branch name with no config edits |
| E3 | Scaffold standard | todo | Templates produce compliant code from the first commit. The model proposes and a script applies. | `template-apply` runs a copy script |
| E4 | Mechanism public, content private | todo | The plugin provides the mechanism and the team's repo holds the content. | templates stay in the team's own repo |
| E5 | Capture excludes secrets | todo | `.env*`, keys and keystores never enter a template. | `template-capture` skips `*.pem` |
| E6 | Generated files | todo | Docs and specs are generated from metadata, record what they were built from, and are never hand-edited. | `api-check` flags a stale spec |
| E7 | Neutral inventory | todo | Extractors emit a versioned inventory, and everything downstream reads only that. | `inventory.json` with `"version": 1` |
| E8 | Wrap, don't build | todo | Use existing generators and detect tool dependencies instead of bundling them. | `api-sdk` calls an existing generator |

Related items in `SKILL-STANDARDS.md`: the Config section (defaults and overrides), and the script and hook rules in `SECURITY.md` (S5).

## Open points

1. **Structured standards.** Today `standards` is a path to docs the model reads. Whether it gets a structured form with rule ids and check types (`script` or `review`) is open (`update-1.md`).
2. **Which group owns a standard.** A standard may span groups, for example docs metadata feeding the MR body (`updates-4`).
3. **Which groups exist.** `template`, `api` and `docs` are planned groups, and none is built.
