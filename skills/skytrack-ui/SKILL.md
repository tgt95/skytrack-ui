---
name: skytrack-ui
description: Use SkyTrack UI components and design-system expertise in this repository. Trigger for component selection, package APIs, supported compositions, styles, tokens, accessibility, or SkyTrack UI implementation gates; this skill supplies library expertise, not a product team's end-to-end design pipeline.
---

# SkyTrack UI expertise

This skill routes to the shared package's canonical rules and component knowledge. It does not impose a product-design sequence, task role model, approval cadence, or release workflow. A consuming workspace may provide its own pipeline.

## Route by decision

- Start with [`references/README.md`](references/README.md) for the local rule router.
- For component selection, read [`references/knowledge/COMPONENT_ROUTING.md`](references/knowledge/COMPONENT_ROUTING.md), then verify only shortlisted component guides against the installed package and closest demo.
- For task/page pattern selection, read [`references/knowledge/PATTERN_ROUTING.md`](references/knowledge/PATTERN_ROUTING.md), then read the selected guide in [`references/knowledge/patterns/`](references/knowledge/patterns/README.md). Check its linked catalog entry and primary source when provenance matters. Pattern entries route decisions; they do not establish component API support.
- For package implementation gates and evidence, read [`references/implementation-gates.md`](references/implementation-gates.md).
- For supported API, component composition, types, styles, or tokens, read only the relevant sections in [`references/implementation.md`](references/implementation.md), [`references/UI_RULES.md`](references/UI_RULES.md), and [`references/AGENT_GUIDE.md`](references/AGENT_GUIDE.md).
- For component purpose, states, and accessibility, use the matching guide in [`references/knowledge/designer/`](references/knowledge/designer/).
- For reference-led creative expertise, use only relevant pages in [`references/knowledge/creative/`](references/knowledge/creative/).
- Use package scripts only when the relevant local gate calls for them. Read logging stays off unless `DEBUG=true` exactly.

Use the package's installed exports, types, runtime source, and demos as evidence of API support. Do not copy a consumer workspace's pipeline, task contract, product-specific assumptions, or release policy into this skill.
