# CLI rules

How every skill takes arguments and reports.

## Arguments
1. `{x}` is required and `[x]` is optional.
2. Flags are long: `--name`, or `--name <value>`. They can appear anywhere on the line.
   - Take declared flags out before reading the positionals
   - Anything else that starts with `--` is part of the text
   - A near miss of a declared flag gets one question: `did you mean --auto?`
3. Arguments always win over anything inferred.

## Help
`help`, `-h`, `-help` or `--help` as the whole argument: print the skill's
`## Usage` block in a code block, and stop. Read nothing else first.

## Errors
Print `error: {what is wrong}`. When the answers are a fixed set, print
`valid: {the choices}` next. Then stop.

## Report
A skill that changes or checks something ends with a short report of what happened,
including a run that stops or fails. Name the next command only when one is natural.
