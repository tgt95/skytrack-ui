# Separator

> A visual divider that distinguishes related content groups.

- Package version: `0.1.5`
- Public export: `skytrack-ui/separator`
- Implementation: [`src/components/ui/separator.tsx`](../../../../../src/components/ui/separator.tsx)
- Public type declaration: [`dist-lib/components/ui/separator.d.ts`](../../../../../dist-lib/components/ui/separator.d.ts)
- Showcase demo id: `separator`
- Closest demo: [`src/demos/separator.demo.tsx`](../../../../../src/demos/separator.demo.tsx)
- Official guidance: [W3C WAI ARIA Separator Role](https://www.w3.org/TR/wai-aria-1.2/#separator)

## Usage

Use Separator to establish clear, subtle visual or semantic boundaries between distinct sections of content, clusters of toolbar actions, or metadata items in a header.

Avoid Separator as a routine replacement for proper whitespace—prefer using standard 16px or 24px layout gaps before introducing visual divider lines. Avoid placing separators between every single paragraph or table row.

Use Fieldset to group related form controls. In a menu, add a divider only when it clarifies separate action groups.

**Live demo variant:** `Horizontal`

## Types

Match divider direction to the layout: horizontal for stacked groups and vertical for adjacent groups.

## Layout

Use horizontal separators between major content blocks, card sections, or list groupings. Use vertical separators inside horizontal toolbars, navigation bars, or metadata rows between button groups.

Leave 8–16px around a divider. Keep it subtle so spacing, rather than the line, remains the primary way to group content.

| Do                                                                                                                        | Don't                                                                                                  | Why                                                                                                  |
| ------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------- |
| Use separators purposefully to delineate changes in task context or action clusters (e.g. edit tools vs. delete actions). | Overuse separators between every single text paragraph or input row, creating heavy visual grid noise. | Excessive dividing lines clutter the screen, compete with content, and disrupt natural reading flow. |

**Live demo variant:** `Horizontal`

## Accessibility

Use a divider only when it clarifies grouping. Decorative dividers should not add noise for assistive technology; maintain enough contrast to see meaningful boundaries.

**Live demo variant:** `Vertical`
