# <Component name>

> <One-sentence purpose, matching the package demo description.>

- Package version: `0.1.5`
- Public export: `skytrack-ui/<slug>`
- Implementation: `src/components/ui/<source>.tsx`
- Public type declaration: check the component's `types` target in [`package.json`](../../../../package.json) and verify it exists in this checkout. Link the generated declaration only when it exists and matches the source version. If absent or stale, say so and link the exact exported type declaration in `src/`; never imply the package artifact was verified.
- Showcase demo id: `<slug>`
- Closest demo: `src/demos/<demo-id>.demo.tsx`; if the component has no dedicated demo, name the closest composition and say that no dedicated demo exists.

## Overview

State the component's user-facing purpose and mental model. Give the primary supported use and one verified example. End with an exact live demo variant name so the showcase can pair the guide with compiled JSX. Put one complete canonical example here; the showcase reuses this verified snippet in each tab and changes the live demo variant per tab.

**Live demo variant:** `<exact variant name from DemoMeta>`

```tsx
// Minimal source-verified example for this component. Replace this comment with working JSX.
```

## Usage

Explain when to use it, when not to use it, what to choose instead, user task/content guidance, and common mistakes. Base every decision on the actual supported API and component intent.

**Live demo variant:** `<exact variant name from DemoMeta>`

## Anatomy

List only exported parts and supported nesting, in render order. State semantics, portal, and layer requirements only when verified. Include the smallest valid composition and explain which elements are optional.

**Live demo variant:** `<exact variant name from DemoMeta>`

## Variants & states

Document only implemented variants, prop values, defaults, controlled/uncontrolled behavior, and interaction states. Explain what changes visually and behaviorally. Include loading, disabled, empty, error, or selected states only where supported or composed by the application.

**Live demo variant:** `<exact variant name from DemoMeta>`

## Accessibility

Document verified semantic output, accessible-name and description requirements, keyboard behavior, focus and announcements, touch/responsive behavior, and reduced motion where applicable. Distinguish library behavior from consumer responsibilities.

**Live demo variant:** `<exact variant name from DemoMeta>`

## API & examples

Show the canonical import path and a complete, copyable minimal JSX example. Summarize only the props that materially affect use; link to the full source/types for the rest. Include token/theming/density guidance where the component has visual responsibilities, related components, and verified limitations.

**Live demo variant:** `<exact variant name from DemoMeta>`

Summarize its canonical import path and the example above. The overview snippet is the only JSX code block in this file and must compile when copied with the named import.

## Evidence and limits

- Package/version checked: `0.1.5` (update if the source version differs).
- Export: [`package.json`](../../../../package.json) — `./<slug>`.
- Source, public declarations, and closest demo: linked above.
- Limits or unverified behavior: state concretely; write `None found in inspected source` only after checking.

The showcase Markdown subset includes headings, paragraphs, unordered/ordered lists, tables, inline
code and links, and fenced JSX. Do not rely on raw HTML or unsupported Markdown extensions.
