# Scroll Area

> A bounded region for content that needs its own scrolling.

- Package version: `0.1.5`
- Public export: `skytrack-ui/scroll-area`
- Implementation: [`src/components/ui/scroll-area.tsx`](../../src/components/ui/scroll-area.tsx)
- Public type declaration: [`dist-lib/components/ui/scroll-area.d.ts`](../../dist-lib/components/ui/scroll-area.d.ts)
- Showcase demo id: `scroll-area`
- Closest demo: [`src/demos/scroll-area.demo.tsx`](../../src/demos/scroll-area.demo.tsx)
- Official guidance: [W3C WAI ARIA Scrollable Region Example](https://www.w3.org/WAI/ARIA/apg/patterns/landmarks/examples/region.html)

## Usage

Use Scroll Area when content exceeds the available vertical or horizontal viewport space within a bounded panel (e.g. sidebar navigation lists, live activity data console feeds, dropdown option lists, dense tab panels) and you need consistent, theme-aware scrollbar styling across all browsers.

Avoid Scroll Area for the main page or for deeply nested scrollable regions that make it difficult to move through the content.

Use page-level scrolling for the main content. Use Pagination when a long collection is easier to browse in smaller sets.

**Live demo variant:** `Demo`

## Behavior

Scrollbars appear smoothly when content overflows and the user hovers over the container or scrolls via trackpad or mouse wheel.

Dragging the scrollbar thumb scrolls content proportionally. Gradient scroll fades smoothly transition as content reaches container boundaries.

**Live demo variant:** `Both scrollbars`

## Layout

Use Scroll Area when a section has a defined space and its content can extend beyond that space.

Ensure internal content has appropriate padding (12–16px) so that text and clickable controls do not abut the scrollbar thumb. Use gradient scroll fades at top and bottom boundaries to visually indicate hidden overflowing content.

| Do                                                         | Don't                                                  | Why                                              |
| ---------------------------------------------------------- | ------------------------------------------------------ | ------------------------------------------------ |
| Make it clear when more content is available by scrolling. | Hide every scroll cue so the section appears complete. | People may miss content that is not visible yet. |

**Live demo variant:** `Gradient scroll fade`

## Accessibility

Give a bounded scroll region a clear name when it contains distinct content. Make it keyboard accessible and show that more content is available.

**Live demo variant:** `Combining with Tabs`

## Content

Content inside the scroll area should be organized with logical heading structures and scannable list groupings.

Avoid nesting large headings inside tiny scroll containers.

**Live demo variant:** `Demo`
