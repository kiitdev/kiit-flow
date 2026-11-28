# Research

`_research.md`: an append-only log of what was looked into, with sections that group the
detail. `research` creates it. Other skills read it when it exists. The shape is loose.
Keep the log, and add sections as the work needs them.

```markdown
# Research: {title}

## Log
| Date | Section | Summary |
|---|---|---|
| 2026-11-07 | Auth | token refresh is in the SDK, no retry on a 401 |

## Auth
- 2026-11-07: Does the client retry on a 401? No (`TokenClient.kt:88`).
  Open: whether the server allows a longer token life
```

1. Every run adds one row at the end of the Log: the date, the section, one short line.
   - Date is `date '+%Y-%m-%d'`
   - Write `|` in a summary as `/`
2. The detail goes at the end of the section the row names.
   - A new topic is a new section at the end of the file
   - Name a section for what it covers: a question, a component, a decision
3. Start an entry with its date. Say where each finding came from, and what is open.
   - A source is a file, a link or a command. No source: `inferred`
4. Nothing already written is edited or removed. A later entry corrects a mistake.
5. A question only the user can answer goes under open. Don't guess it.
