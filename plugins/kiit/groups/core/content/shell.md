# Shell calls

How every skill runs commands. A chained line matches no `allowed-tools` rule, so it
prompts the user even when each part is allowed.

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
4. Run a script by its full path, as its own call (vcs/content/formats.md, Checking).
5. Calls that do not depend on each other go in the same turn, as separate calls.
