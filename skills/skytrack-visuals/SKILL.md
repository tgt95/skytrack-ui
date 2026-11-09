---
name: skytrack-visuals
description: Apply the SkyTrack product design source to UI, slides, PDFs, documents, diagrams and visual artifacts. Use for SkyTrack visual work; preserve other products' branding when the task is explicitly for another product.
---

# SkyTrack visual source

Use [the product theme](../../src/index.css), component source and [generated tokens](../../design/tokens.json) as the design authority. Read token values before building; do not reuse the old brand token v4 or Control Room palette/fonts from memory.

- Product UI: read [AGENT_GUIDE.md](../../AGENT_GUIDE.md) and actual component exports/types; use the React library where the target supports it.
- Presentations and other non-React artifacts: read [presentation guidance](../../docs/PRESENTATIONS.md) and [the adaptation preset](../../design/presentation-preset.json). Carry the same color/font/shape identity into the medium, scaling typography for readability.
- Generate or verify exports with `npm run build:lib` then `npm run export:design`; `--check` compares against the built source. See the presentation guide for browser setup and external snapshot output.

Follow the user's explicit reference and theme. Preserve actual logos, real evidence and editable content. Render the final format before claiming appearance or compatibility. The known dark-primary contrast issue remains a source concern; use existing suitable text/surface roles or correct the shared source, rather than inventing a parallel palette.
