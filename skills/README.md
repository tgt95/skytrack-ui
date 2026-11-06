# Repository Skills

Keep package expertise separate from consumer-owned delivery procedures. `skytrack-ui/` is the installable skill entrypoint and owns all active package knowledge under `references/`. The former knowledge-only directory is marked archived at `archive/skytrack-ui/`; no duplicate knowledge is kept there. This repository does not define a consuming team's end-to-end product pipeline.

| Directory | Owner and purpose |
|---|---|
| [`skytrack-ui/`](skytrack-ui/SKILL.md) | Installable package-expertise skill with canonical rules, component knowledge, and tools in `references/`. |
| [`archive/skytrack-ui/`](archive/skytrack-ui/README.md) | Archive marker for the former knowledge-only directory. |

Use [`../AGENTS.md`](../AGENTS.md) as the package router. Start with [`skytrack-ui/SKILL.md`](skytrack-ui/SKILL.md), then open only decision-specific files in [`skytrack-ui/references/`](skytrack-ui/references/) that it routes to.
