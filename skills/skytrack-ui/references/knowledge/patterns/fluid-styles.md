# Fluid styles

> Alternative fluid presentations for familiar controls, containers, and forms alongside default styles.

- Pattern ID: `fluid-styles`
- Catalog group: Core
- Source status: **Additional local topic**
- Primary source: [maintained reference](../../../../../docs/carbon-ds-reference/patterns/fluid-styles/index.md)
- Catalog entry: [catalog.ts](../../../../../src/showcase/pattern-library/catalog.ts)
- Page copy, source citations, and demo map: [page-content.ts](../../../../../src/showcase/pattern-library/page-content.ts)
- Local interaction implementation: [demos.tsx](../../../../../src/showcase/pattern-library/demos.tsx)

## Decision summary

**Use when:** Use a fluid treatment when the page context calls for a more expressive surface, and use default styling for dense productive work.

**User outcome:** Controls fit their parent layout without forcing every task into the same width.

### Design decisions

- Apply fluid styles intentionally to related controls instead of mixing them without hierarchy.
- Check alignment, sizing, placement, and accessibility when a fluid control spans its container.
- Use responsive layout rules so fluid forms remain readable at narrow widths.

### SkyTrack UI implementation route

- Use the installed component variants and responsive Tailwind layout utilities.
- Treat this as presentation guidance; do not introduce a second control API.
- Compare full-width and default-width actions within the same local example.

**Candidate components:** `Button`, `Input`, `Field`. Verify each API against [component routing](../COMPONENT_ROUTING.md) and installed source.

## Source limits

- Catalog topic limit: Fluid styles exists in the maintained local pattern directory but is omitted from the 14-item Universal overview index.
- Component readiness limit: referenced button guidelines note that full-span fluid and hanging fluid buttons are not yet GA without custom styling overrides.
- SkyTrack UI package constraint: SkyTrack UI does not ship a 64px internal-label fluid Input primitive; local demos preserve visible external labels while demonstrating flush grouping and container-width matching.

## Guidance reference

### Overview

Rather than merely expanding width to 100%, fluid components bleed flush to at least one edge of a parent container and depend on their compound housing—never floating alone.

#### Key terms

| Dimension      | Productive / Default                                              | Expressive / Fluid                                            |
| -------------- | ----------------------------------------------------------------- | ------------------------------------------------------------- |
| Style intent   | Compact, high-density operational workflows with external spacing | Expressive architectural blocks bleeding to container edges   |
| Width behavior | Fixed width stays constant regardless of viewport width           | Fluid width adapts across responsive grid columns or % widths |

#### When to use fluid styles

Apply fluid components selectively inside short, concise forms, focused dialogs, side panels, or expressive entry experiences (such as sign-in cards) where clean architectural alignment strengthens focus.

#### When not to use fluid styles

Avoid fluid styling on complex multi-section forms that rely on generous white space and clear section groupings—and never embed fluid controls inside accordions or sectioned containers where flush shared edges blur parent-child hierarchy.

### Types of fluid components

Coordinate inputs, buttons, containers, and form layouts carefully—mixing default top-labeled fields with fluid bottom actions is a valid common hybrid, whereas mixing adjacent edge styles haphazardly breaks alignment.

#### Fluid inputs

In the reference component architecture, a fluid input fixes height at 64px, embeds its field label cleanly inside the box aligned to input text, and shifts all helper text into an interactive info tooltip because no bottom helper slot exists.

> **Source limit:** SkyTrack package note: SkyTrack UI ships standard top-labeled Input fields and does not expose a 64px internal-label fluid Input variant.

**Examples:** `fluid-styles-edge-form`.

#### Fluid buttons

True fluid buttons attach flush to a container’s bottom edge at 25%, 50%, or 100% spans and never sit mid-flow. Omit tertiary button styles inside fluid compositions; separate adjacent buttons with a crisp divider border.

> **Source limit:** Reference readiness limit: full-span fluid buttons and hanging fluid buttons remain marked unavailable for out-of-the-box production without styling overrides.

**Examples:** `fluid-styles-align-actions`.

##### Fluid-width default buttons

Distinct from edge-attached fluid buttons, fluid-width default buttons remain floating inside the grid and expand proportionally across column spans (preferred over fixed-padding 16px/64px default buttons when balancing spacious layouts, keeping paired non-ghost buttons equal width).

**Examples:** `fluid-styles-match-width`.

#### Fluid containers

Fluid containers—such as responsive modals—expand across grid columns or viewport percentages as screen width grows, whereas fixed containers—such as side panels—hold constant pixel widths independent of the underlying layout grid.

**Examples:** `fluid-styles-container-vs-fixed`.

#### Fluid forms

Fluid forms stack orthogonal inputs edge-to-edge using 0px gaps (or hairline 1px borders in condensed multi-column grids) for concise workflows only; complex workflows retain default forms with 32px wide gutters and external column-flush labels.

**Examples:** `fluid-styles-form-width`.

### Designing with fluid

#### Visual guidance

##### Alignment and zero-gap stacking

Stack fluid controls flush against one another and their enclosing box using 0px internal gutters; do not insert standard form gaps between truly fluid controls.

##### Placement

Anchor fluid controls firmly against container perimeters and attach fluid action bars along the bottom edge rather than floating mid-form.

##### Sizing

Constrain fluid-width default buttons with practical minimum and maximum bounds across breakpoints so lines never become absurdly narrow or ultra-wide.

##### Accessibility contrast on shared borders

Because stacked fluid controls share borders with 0px gaps, every boundary between adjacent buttons or fields must achieve at least 3:1 visual color contrast so users clearly tell separate controls apart.

#### Best practices

Do not confuse fluid components with forcing 100% width globally. A proven architectural pattern is a hybrid composition: default top-labeled form inputs with comfortable internal breathing room paired with flush 50%/50% fluid footer buttons anchored along the bottom of a dialog or side panel.

### Related components, patterns, and guidelines

**Related:** Button, Text inputs & Dropdowns, Dialogs, Forms, Spacing & Color contrast guidelines.

## Interactive and visual examples

### Match action width to the task

- Example ID: `fluid-styles-match-width`
- Type: **Visual reference**
- Source mapping: mapped — `types-fluid-width-default-buttons`
- Scenario: Contrast standard content-sized actions for dense tables against column-spanning actions in expressive areas.
- What it teaches: Fluid-width default buttons follow grid columns cleanly in expressive areas while compact buttons suit dense work.
- Decision shown: Use fluid-width default buttons with min/max bounds for expressive sections and bottom-attached fluid buttons inside modals or panels; keep default fixed sizing inside dense toolbars.
- Consider: Note referenced full-span fluid buttons are marked not production-ready without custom overrides.

### Align related actions in a compact panel

- Example ID: `fluid-styles-align-actions`
- Type: **Visual reference**
- Source mapping: partial-divergent — `types-fluid-buttons`
- Scenario: Attach related actions to a panel footer so they share its full width instead of floating in the content area.
- What it teaches: Fluid buttons attach related actions to a compound container instead of floating in its content area.
- Decision shown: Use them for grouped actions at a container edge, such as a panel footer; keep ordinary buttons separated in the content area.
- Consider: Make each action distinct and keep shared borders visible enough to separate the choices.
- Boundary or simplification: The visual now shows a shared panel footer with equal-width, adjacent actions and a contrasting divider; it remains a static anatomy reference.

### Let a fluid form follow its available width

- Example ID: `fluid-styles-form-width`
- Type: **Visual reference**
- Source mapping: mapped — `types-fluid-forms`
- Scenario: Size a short form to an enclosing container width while avoiding over-stretched complex or accordion forms.
- What it teaches: Fluid form structure uses flush container edges for simple short tasks rather than unbounded full-width stretching.
- Decision shown: Use fluid layout only for concise simple workflows; retain default 32px-gutter spacing for complex forms and never place fluid controls inside accordions.
- Consider: Check line lengths across wide viewports and consider hybrid default inputs paired with flush footer buttons.

### Attach a simple form to its container edges

- Example ID: `fluid-styles-edge-form`
- Type: **Visual reference**
- Source mapping: partial-divergent — `types-fluid-inputs`
- Scenario: A quick workspace invite uses a compact, stacked group inside one border; keep each field label visible and reserve flush fluid inputs for implementations that support them.
- What it teaches: Fluid inputs stack edge-to-edge inside a container with 0px internal gaps and 3:1 shared borders.
- Decision shown: In reference designs, fluid inputs fix 64px height with internal labels and tooltip-only help; when built with standard external-label inputs, preserve visible labels.
- Consider: Do not treat fluid styling as a universal full-width rule. Keep labels visible; use zero-gap stacking only when the field implementation supports that anatomy.
- Boundary or simplification: The static card keeps external labels visible and explicitly identifies itself as a compact approximation; exact zero-gap fluid fields require a dedicated implementation.

### Choose a fluid container or fixed side panel

- Example ID: `fluid-styles-container-vs-fixed`
- Type: **Visual reference**
- Source mapping: mapped — `types-fluid-containers`
- Scenario: Compare a grid-responsive fluid container against a constant-width side panel.
- What it teaches: Fluid containers adapt width by grid column spans or percentages, whereas fixed containers hold steady pixel measures independent of grid resizing.
- Decision shown: Choose fluid containers when proportional scaling helps content fill available columns cleanly; choose a fixed panel when stable form scanning matters most.
- Consider: Test responsive breakpoints so narrow panes preserve readable control labels.

## Maintenance rule

Treat the catalog as the source for status, summary, component shortlist, and design decisions. Treat page content as the source for section guidance and demo teaching. Treat the rendered demo as evidence only for the behavior it visibly implements. Update this guide and [pattern routing](../PATTERN_ROUTING.md) when the pattern changes. Never treat local examples as production services or operational policy.
