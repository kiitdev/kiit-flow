# Shell calls

How every skill runs commands. `allowed-tools` skips the prompt for a single command
that matches a rule. In testing these prompted: `cd` before git, `git -C`, a loop
with `$(...)`, and reads outside the working directory. Other commands may prompt too.
The rules below keep a skill to the commands that were seen to run without a prompt.

## Rules
1. One command per Bash call.
   - No `;`, `&&`, `||`, pipes, `$(...)`, or loops
   - `cd` is allowed only as its own call (rule 2)
   - Run in the working directory. Never `git -C`: no rule allows it
2. The working directory is not a git repo, such as a workspace root with repos in
   subfolders: `cd {project path}` as its own call, then run the commands there.
   - `{project path}` is `path` from `projects[]` in `kiit.json` (core/content/config.md)
   - To check for a repo, run `git rev-parse --is-inside-work-tree`, not `git status`
3. Read files with the Read tool.
4. Run a script by its full path, as its own call (core/content/formats.md, Checking).
5. Calls that do not depend on each other go in the same turn, as separate calls.
