# Badge

> A compact label for status, category, or a small count.

- Package version: `0.1.5`
- Public export: `skytrack-ui/badge`
- Implementation: [`src/components/ui/badge.tsx`](../../src/components/ui/badge.tsx)
- Public type declaration: [`dist-lib/components/ui/badge.d.ts`](../../dist-lib/components/ui/badge.d.ts)
- Showcase demo id: `badge`
- Closest demo: [`src/demos/badge.demo.tsx`](../../src/demos/badge.demo.tsx)
- Official guidance: [Fluent 2 Badge Usage](https://fluent2.microsoft.design/components/web/react/core/badge/usage)

## Usage

Use Badge to communicate a brief status (“In progress”, “Scheduled”, “Complete”), highlight unread notifications with a count, or identify a category in a table or card.

- **Fit:** Status indicators, numeric counts, and metadata category pills.
- **Avoid:** Clickable action buttons (use Button), or multi-sentence descriptions.
- **Best alternative:** For interactive triggers, use Button. For detailed messages, use Alert.

**Live demo variant:** `Basic`

## Types

Badge supports two primary presentations:

- **Status:** A short label that communicates a known state, such as “Ready”, “In progress”, or “Needs attention”.
- **Anchored Badges:** Overlaying notification icons or avatars at the top-right corner.
- **Dot Badges:** Minimal circular pulse indicators for subtle presence or state.

**Live demo variant:** `Sizes`

## Behavior

Abbreviate very large counts (for example, “99+”) when the exact total is available elsewhere.

- **Zero counts:** Show zero when the absence of items is meaningful; otherwise avoid adding a redundant badge.
- **Dot:** Use a dot only when the state is clear from nearby text or context.
- **Interaction:** Badge is a visual indicator. Put interactive behavior on the surrounding control.

| Do                                                                             | Don't                                             | Why                                                                                     |
| ------------------------------------------------------------------------------ | ------------------------------------------------- | --------------------------------------------------------------------------------------- |
| Abbreviate a large count when the exact total is available in the destination. | Let a long count crowd nearby labels or controls. | A compact count preserves the layout while keeping the exact value available on demand. |

**Live demo variant:** `Overflow`

## Layout

Badges occupy a subtle tier in visual hierarchy, placed immediately adjacent to entity titles or right-aligned in table cells.

- **Mobile viewports:** Badges remain compact and inline, defaulting to short abbreviations or status dots in tight tables.

**Live demo variant:** `Standalone`

## Accessibility

Keep badge text readable against its background. When a count accompanies an icon-only action, include the count in the action’s accessible name.

**Live demo variant:** `Dot`

## Content

Labels should be concise and familiar (e.g., “Ready”, “In progress”, “Needs review”).

- **Formatting:** Keep labels free of punctuation. Numbers must be integers with no decimals.

**Live demo variant:** `Basic`
