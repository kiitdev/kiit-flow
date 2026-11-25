# Pull requests

The body and the ticket link of a pull request. Two skills follow it.
The title is in core/content/formats.md.

## Body
Write the body from the template below, to a file, so code fences survive.
1. Simple words, little jargon, numbered points.
2. Each point starts with a bold word or two.
3. Points are about 100 characters or fewer.
4. Leave a section with nothing to say empty.

## Ticket link
A bare link only mentions an issue. A closing keyword closes it on merge.
1. Find the ticket, in this order:
   - The `issue-{n}` ref in the branch name, for an issue of this repo
   - An issue link in the commit messages
2. A GitHub issue of this repo: `Fixes #{n}`. Of another repo: `Fixes {owner}/{repo}#{n}`.
3. Several issues: one `Fixes` line each.
4. No issue, or another system such as `ABC-123`: write the link as given, no `Fixes`.

## Create
`gh pr create --base {base} --title "{title}" --body-file {file}`, with `--draft` when asked.
A pull request exists for the branch (`gh pr list --head {branch}`): print its URL, stop.

## Template
```markdown
## Overview
<!-- What the PR does, in a few lines -->

## Ticket(s)
<!-- Fixes #n, or the link -->

## Links
<!-- Relevant links -->

## Examples
<!-- Relevant examples -->

## Dependencies
<!-- What this depends on -->

## Design
<!-- High-level design and changes -->

## Notes
<!-- Anything a reviewer should know -->

## Pending
<!-- What is not done -->

## Tests
<!-- Tests added or changed -->
```
