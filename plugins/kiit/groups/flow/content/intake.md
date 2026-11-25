# Intake

How `begin` and `go` identify the change. The arguments are `[project] [type] {ticket|description}`.

1. Read the leading arguments (core/content/cli.md).
   - A project name or alias from `kiit.json` `projects[]` is the project
   - A type word after it is the type. A type goes through the `aliases` first
   - Either can be missing. The rest is the ticket or description
2. Decide what the rest is (core/content/tickets.md): one ticket token, or a description.
3. Read the ticket when the project or type is missing and it has a link.
   - A bare number needs a project: the one given, else the one you are in
   - Nothing could be read: infer nothing
4. Infer what is missing. Arguments always win.
   - Project: the one whose ticket system and repo match the URL, else the one you are in,
     which is the project whose `path` holds the working directory
   - Else the project the ticket names, as a project name or alias
   - Type: from the ticket (core/content/tickets.md, infer the type)
5. The type list and aliases are the effective `standards.vcs` `types` and `aliases`.
   A flow skill reads them as data, and never reads the vcs instructions.
6. The project is not in `kiit.json`: `error: project '{p}' is not in kiit.json`, then
   `/kiit:init`, and stop.
7. Project or type still missing: `error: cannot infer {project|type}`, then
   `valid: {choices}`, and stop.
8. Confirm what was inferred.
   - Show each value and its source, such as `type: fix (label: bug)`
   - Ask the user to confirm or correct it, and wait
   - Skip this for a GitHub issue of the project the working directory is in
9. Check the project path exists: `ls -d {path}` as one call, from the workspace root.
