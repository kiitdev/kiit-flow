<div align="center">
<h1>
  <img src="./assets/kiit-flow-banner.svg" alt="kiit-flow" align="center" />
</h1>

**A skills framework with three modes: Fast, Flow, and Focus**

Skills for Claude Code that take a change from a ticket to a pull request, in one of three ways. **Fast** does a clear, low-risk change in one pass. **Flow** designs first, then implements and verifies. **Focus** is for deep work, risky or unclear changes, with research and a review loop. Every change lives in plain markdown files, so a session can stop and another can pick up from the files, in one repo or across several.

[![License](https://img.shields.io/github/license/kiitdev/kiit-flow)](./LICENSE)

Part of [Kiit](https://www.kiit.dev)

</div>

![A change takes Fast, Flow, or Focus, then verify](./assets/kiit-flow-diagram.svg)

## 📚 Table of Contents

| # | | Topic | Description |
|---:|:---:|---|---|
| 1 | 💡 | [Why](#why) | What flow adds on top of Claude Code |
| 2 | 🧭 | [Modes](#modes) | Fast, Flow, or Focus: how to choose for a change |
| 3 | 🚀 | [Start](#start) | Install, set up the config, and create a first work item |
| 4 | ⌨️ | [Commands](#commands) | The skills you run, in workflow order |
| 5 | 📁 | [Work Item](#work-item) | The folder of plain markdown files that holds one change |
| 6 | ⚙️ | [Configuration](#configuration) | Ticket systems, projects, and resources in `kiit.json` |
| 7 | 🔜 | [Coming soon](#coming-soon) | Planned next: skills, resources, and extras |
| 8 | 📋 | [Requirements](#requirements) | What flow needs to run |
| 9 | 🤝 | [Contributing](#contributing) | How to write or change a skill |
| 10 | 📄 | [License](#license) | Apache 2.0 license terms |

## Why

![What Claude Code gives you and what kiit-flow adds, for five goals. Multi-project: one config for many projects, work items kept outside the repos, project inferred from the ticket, works for one project or many. Organized: one work item per change, criteria and a check per step, reads the ticket and CLAUDE.md, code is the truth with no spec. Saved: markdown files per change, resume in any new session, every run logged, blocked steps stop the run. Modes: Fast, Flow, and Focus, risk moves a change up, start small and move up as needed. Reviewed: plan review first in Focus, another model can review, a verdict in 04-review.md, verify checks the criteria and runs the project's checks](./assets/kiit-flow-why.svg)

## Modes

Pick the mode by the scope, effort, and time the change needs. Risk or unclear requirements move it up a level.

![Choose Fast, Flow, or Focus: when to use each, and the commands and files each one uses](./assets/kiit-flow-weights.svg)

1. `go` hands off to `design` when it finds the change needs a design or is risky.
2. `design` writes the mode to `_status.md`. It is Flow unless you run `/kiit-flow-design focus`.
3. `research`, `review`, and `revise` switch a Flow work item to Focus, so you can start in Flow and move up.
4. In Focus, `update` and `resume` ask for a review first.

## Start

**Install** into a workspace, the folder that holds your project repos:

```sh
git clone https://github.com/kiitdev/kiit-flow.git
cd kiit-flow
./install.sh /path/to/workspace
```

**Set up** by restarting Claude Code in the workspace and running `/kiit-flow-init`. It finds your repos and their ticket systems, and writes `.claude/kiit/kiit.json` after you confirm. Install never creates or overwrites that file.

**Run** from the workspace:

![The first commands to run: init, help, begin with a ticket link, design, update, and verify, each with a short comment](./assets/kiit-flow-start.svg)

That is Flow. `begin` reads the ticket, fills in the project and type, asks you to confirm, and creates the work item.

For a clear, low-risk change, run `/kiit-flow-go` instead (Fast). For risky or unclear work (Focus), add `/kiit-flow-review` and `/kiit-flow-revise` between `design` and `update`.

## Commands

Every command prints its own usage with `--help`, for example `/kiit-flow-begin --help`.

The commands are listed in workflow order. In Focus, `review`, `revise`, and `update` form a loop that iterates and corrects until the work is right. After `verify`, `review code` checks the finished code.

![The 12 commands in workflow order: init, go, begin, design, research, review, revise, update, resume, verify, recent, and help, colored by mode, with the files each one writes](./assets/kiit-flow-commands.svg)

## Work Item

A work item is one folder per change. Work items live in `_kiit/flow/` at the workspace root, next to `.claude/` and your project repos.

![The workspace holds .claude, your project repos, and _kiit/flow with one folder per change, such as 260928-kiit-codes-fix-1234. Inside that work item: its files, what each is for, and which commands write it](./assets/kiit-flow-work-item.svg)

The folder name is `{YYMMDD}-{project}-{type}-{ticket|short-name}`: the date, the project, the type, and the ticket id, or a short name when there is only a description. Files appear as the commands run, so a new work item has only `01-change.md` and `_history.md`. `go` writes just those two. `_research.md` is written by `research`.

The numbered files are stage artifacts, written in order. The files that start with an underscore change as the work goes on.

The `flow.work_items` setting in `kiit.json` changes the location. The full layout and the file formats are in [`shared/shared.md`](./shared/shared.md).

## Configuration

Flow reads `.claude/kiit/kiit.json` in your workspace. It lists the ticket systems, the projects, and any named resources, and has a section for flow's own settings.

Flow works from a workspace that holds one or more projects. For a single project, list it with a path of `.`.

`/kiit-flow-init` writes the file for you. [`shared/kiit.example.json`](./shared/kiit.example.json) shows the shape. Each key is described in [`shared/shared.md`](./shared/shared.md#workspace-and-config).

## Coming soon

![What is planned next, in no set order. Each item is a skill you run, a resource skills use, or a feature of kiit. Skills: Docs, where a metadata.json holds a project's facts as structured fields and a standard README.md is generated from it. Diagrams, where architecture is kept as structured metadata and diagrams and other outputs are generated from it. Recipes, grouped recipes for specific tasks that take in standards and patterns to generate code. Resources: Standards you write and control, for databases, API design, and more, applied to every project or to one. Patterns, established design and architecture patterns to use. Templates, downloadable templates for apps, APIs, jobs, and more, used to create new apps and components. Features: Extendible, where people can enhance kiit with extras, with the details still being worked out](./assets/kiit-flow-coming-soon.svg)

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
