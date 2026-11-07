<div align="center">
<h1>
  <img src="./assets/kiit-flow-banner.svg" alt="kiit-flow" align="center" />
</h1>

**A fast or structured multi-project agentic skills framework for SDLC**

A fast or structured multi-project agentic skills framework and spec-driven development (SDD) approach for AI coding assistants.

[![License](https://img.shields.io/github/license/kiitdev/kiit-flow)](./LICENSE)

Part of [Kiit](https://www.kiit.dev)

</div>

<!-- Overview diagram goes here: ./assets/kiit-flow-overview.png -->

## 📚 Table of Contents

| # | | Topic | Description |
|---:|:---:|---|---|
| 1 | 💡 | [Why](#why) | The problems flow addresses, and the approach it takes |
| 2 | 🚀 | [Start](#start) | Install, set up the config, and create a first work item |
| 3 | ⌨️ | [Commands](#commands) | The skills you run, and what is planned |
| 4 | 📁 | [Work Item](#work-item) | The folder of plain markdown files that holds one change |
| 5 | ⚙️ | [Configuration](#configuration) | Ticket systems, projects, and resources in `kiit.json` |
| 6 | 📋 | [Requirements](#requirements) | What flow needs to run |
| 7 | 🤝 | [Contributing](#contributing) | How to write or change a skill |
| 8 | 📄 | [License](#license) | Apache 2.0 license terms |

## Why

Work with an AI coding assistant tends to go wrong in a few repeatable ways:

| # | Problem | Description |
|---:|---|---|
| 1 | **Lost context** | A session ends and the requirements, plan, and progress go with it. |
| 2 | **Unreviewed plans** | Code is written before anyone has read the design. |
| 3 | **Drift** | The design and the code diverge, and nothing records why. |
| 4 | **Unclear done** | There is no checklist to say when the change is finished. |

**kiit-flow keeps each change in a folder of plain markdown files.**

A short set of commands moves the change through its stages: requirements, design, review, implementation, and checks. Every command reads what the earlier ones wrote, so a session can stop at any point and another can pick up from the files.

## Start

**Install** into a workspace, the folder that holds your project repos:

```sh
git clone https://github.com/kiitdev/kiit-flow.git
cd kiit-flow
./install.sh /path/to/workspace
```

**Configure** by editing `.claude/kiit/kiit.json` in the workspace. Install creates it from the example, and running install again never overwrites it.

**Run** from the workspace, after restarting your assistant so it loads the skills:

```text
/kiit-flow-help                                           # list the commands
/kiit-flow-begin https://github.com/acme/app/issues/12    # create the work item
/kiit-flow-design                                         # write the design and phases
/kiit-flow-review                                         # optional: review the plan
/kiit-flow-revise                                         # change the design, or apply the review
/kiit-flow-update                                         # implement the phases
/kiit-flow-verify                                         # lint, tests, security, docs
```

`begin` reads the ticket, fills in the project and type, asks you to confirm, and creates the work item.

## Commands

Every command prints its own usage with `--help`, for example `/kiit-flow-begin --help`.

The commands are listed in workflow order. `review`, `revise`, and `update` can repeat in a loop until the work is right. After `verify`, `review code` checks the finished code.

For a small change, `go` skips the design and does it in one pass.

| # | Command | Description |
|---:|---|---|
| 1 | `/kiit-flow-begin` | Create a work item from a ticket or a description. |
| 2 | `/kiit-flow-go` | Do a small change in one pass, without a design. |
| 3 | `/kiit-flow-design` | Write the design, phases, and status for a work item. |
| 4 | `/kiit-flow-review` | Review the plan or the code, and write a verdict. |
| 5 | `/kiit-flow-revise` | Revise the design from your text, a review, or a blocked step. |
| 6 | `/kiit-flow-update` | Implement all phases, a phase, a step, or a range. |
| 7 | `/kiit-flow-resume` | Pick up a work item where it stopped and continue. |
| 8 | `/kiit-flow-verify` | Run the project's own lint, tests, security, and docs checks. |
| 9 | `/kiit-flow-recent` | List work items, newest first, one line each. |
| 10 | `/kiit-flow-help` | Show the commands, or the usage of one. |

## Work Item

A work item is one folder per change. Work items live in `_kiit/flow/` at the workspace root, next to `.claude/` and your project repos:

```text
workspace/
├── .claude/
├── _kiit/flow/
│   └── 260928-kiit-codes-fix-1234/
│       ├── 01-change.md
│       ├── 02-design.md
│       ├── 03-phases.md
│       ├── 04-review.md
│       ├── _status.md
│       └── _history.md
└── kiit-codes/
```

The folder name is the date, project, type, and ticket. Files appear as the commands run, so a new work item has only `01-change.md` and `_history.md`. `go` writes just those two.

| # | File | Purpose | Written by |
|---:|---|---|---|
| 1 | `01-change.md` | The change: requirements, acceptance criteria, notes, and open questions | `begin` and `go`. `design` and `revise` add answers to the open questions |
| 2 | `02-design.md` | The design: approach, files, reuse, constraints, and how to test it | `design` and `revise` |
| 3 | `03-phases.md` | The plan: numbered phases and steps | `design` and `revise` |
| 4 | `04-review.md` | The latest review: its stage, verdict, findings, and the response to them | `review`. `revise` adds the response |
| 5 | `_status.md` | Where each step stands: `todo`, `done`, `blocked`, or `skip` | `design` and `revise` create and change it. `update` and `resume` update it |
| 6 | `_history.md` | An append-only log of what ran and when | every command except `help` and `recent` |

The numbered files are stage artifacts, written in order. The files that start with an underscore change as the work goes on.

The `flow.work_items` setting in `kiit.json` changes the location. The full layout and the file formats are in [`shared/shared.md`](./shared/shared.md).

## Configuration

Flow reads `.claude/kiit/kiit.json` in your workspace. It lists the ticket systems, the projects, and any named resources, and has a section for flow's own settings.

Flow works from a workspace that holds one or more projects. For a single project, list it with a path of `.`.

[`shared/kiit.example.json`](./shared/kiit.example.json) shows the shape. Each key is described in [`shared/shared.md`](./shared/shared.md#workspace-and-config).

## Requirements

- An AI coding assistant that runs skills. Flow is written for Claude Code
- `git`, and a POSIX shell for `install.sh`
- The [GitHub CLI](https://cli.github.com) (`gh`), to read GitHub tickets

## Contributing

Contributions and design feedback are welcome. See [CONVENTIONS.md](./CONVENTIONS.md) for how a skill is written.

## License

[Apache License 2.0](./LICENSE)

---

<div align="center">

**kiit-flow** is one group of skills in [Kiit](https://www.kiit.dev).

</div>
