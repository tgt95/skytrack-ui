# Collapsible

> A single expandable section for secondary information or settings.

- Package version: `0.1.5`
- Public export: `skytrack-ui/collapsible`
- Implementation: [`src/components/ui/collapsible.tsx`](../../src/components/ui/collapsible.tsx)
- Public type declaration: [`dist-lib/components/ui/collapsible.d.ts`](../../dist-lib/components/ui/collapsible.d.ts)
- Showcase demo id: `collapsible`
- Closest demo: [`src/demos/collapsible.demo.tsx`](../../src/demos/collapsible.demo.tsx)
- Official guidance: [W3C WAI ARIA Disclosure Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/)

## Usage

Use Collapsible when users need to progressively disclose a single isolated section of advanced parameters or optional details without leaving the current view.

- **Fit:** A single secondary section, such as “Advanced settings”, “Additional details”, or “Activity history”.
- **Avoid:** Multiple stacked disclosure items (use Accordion), or top-level workspace views (use Tabs). Never bury mandatory safety-critical parameters behind collapsed panels.
- **Best alternative:** For multiple stacked sections with coordinated open/close states, use Accordion.

**Live demo variant:** `Default`

## Types

Collapsible reveals or hides one related block of secondary content.

- **Inline Disclosure:** Placed inside forms or cards to tuck away advanced or infrequently used inputs.
- **Findable content:** Keep section labels descriptive so people can identify the information they can reveal.

**Live demo variant:** `Default`

## Behavior

Clicking the trigger toggles panel visibility with a smooth vertical height animation.

- **Chevron indicator:** The disclosure icon rotates 180 degrees to indicate open state.
- **Initial state:** Keep content open when people need it to complete the current task; collapse it when it is secondary.

| Do                                                                                      | Don't                                                 | Why                                                                         |
| --------------------------------------------------------------------------------------- | ----------------------------------------------------- | --------------------------------------------------------------------------- |
| Default secondary or advanced settings to collapsed so the main task remains scannable. | Hide required access fields inside a collapsed panel. | Hiding mandatory fields causes form submission errors and frustrates users. |

**Live demo variant:** `Hidden until found`

## Layout

Collapsible typically resides inside a card, settings pane, or inspection sidebar.

- **Padding:** Give revealed content 12–16px of vertical breathing room.
- **Trigger alignment:** Triggers can span the full container width with a trailing chevron or align as a standalone text button with an adjacent chevron icon.
- **Mobile:** Stacks cleanly within single-column mobile viewports without horizontal clipping.

**Live demo variant:** `Default`

## Accessibility

Make open and closed states clear and associate each control with the content it reveals. Enter or Space toggles the section; use a visual cue beyond color.

**Live demo variant:** `Default`

## Content

Trigger labels should clearly announce what will be revealed (e.g., “Show advanced settings”, “Hide activity details”).

- **Tone:** Use concise, informative sentence case.
- **State verbs:** You may use dynamic verbs ("Show advanced" / "Hide advanced") or a stable noun phrase paired with a rotating chevron ("Advanced parameters").

**Live demo variant:** `Hidden until found`
