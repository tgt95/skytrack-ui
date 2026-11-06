# skytrack-ui Agent Router

This repository owns its reusable design-system rules and component knowledge. Start with [`skills/README.md`](skills/README.md), then read only the route needed for the task. Do not depend on rules stored in the parent SkyTrack workspace.

## Package expertise router

This repository owns reusable SkyTrack UI expertise, component knowledge, and package-specific gates. It does not prescribe a consuming team's full product-design pipeline, task roles, or release process. Start with the installable expertise entrypoint [`skills/skytrack-ui/SKILL.md`](skills/skytrack-ui/SKILL.md); it routes to the canonical [`skills/skytrack-ui/references/README.md`](skills/skytrack-ui/references/README.md), mandatory [`implementation-gates.md`](skills/skytrack-ui/references/implementation-gates.md), `UI_RULES.md`, component guides, and scripts.

For component implementation, verify each distinct UI need against the exact installed API, types, runtime source, and closest demo before selecting a fallback. Use only relevant sections from `implementation.md` and `AGENT_GUIDE.md`. Do not load every component page. A consuming workspace supplies its own end-to-end design and delivery workflow.
