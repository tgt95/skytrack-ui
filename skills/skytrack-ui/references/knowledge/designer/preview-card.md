# Preview Card

> A brief preview of a linked item that helps people decide whether to open it.

- Package version: `0.1.5`
- Public export: `skytrack-ui/preview-card`
- Implementation: [`src/components/ui/preview-card.tsx`](../../../../../src/components/ui/preview-card.tsx)
- Public type declaration: [`dist-lib/components/ui/preview-card.d.ts`](../../../../../dist-lib/components/ui/preview-card.d.ts)
- Showcase demo id: `preview-card`
- Closest demo: [`src/demos/preview-card.demo.tsx`](../../../../../src/demos/preview-card.demo.tsx)
- Official guidance: [Fluent 2 Card Usage](https://fluent2.microsoft.design/components/web/react/core/card/usage)

## Usage

Use Preview Card to display an informational summary or visual snapshot of a linked entity upon hover or focus (e.g. customer profile, project summary, or document preview) before navigating.

Avoid Preview Card when the card itself requires complex form interaction, deep sub-links, or action buttons (use Popover or navigate directly to the target page).

The best alternative for interactive floating panels with form inputs is Popover. For simple text-only descriptions, choose Tooltip.

**Live demo variant:** `Default`

## Behavior

Hovering over or focusing the trigger opens the preview. Keep it open while people move the pointer from the trigger into the card.

Moving the cursor away from both trigger and card closes the popup smoothly. Clicking the trigger link executes standard navigation directly to the target entity page.

**Live demo variant:** `Animating the Preview Card`

## Layout

Show Preview Card as a distinct surface above nearby content.

Keep the card compact, with enough room for its summary and a clear relationship to the trigger. Keep it within the viewport. On touchscreens where hover is unavailable, navigate directly on tap.

| Do                                                                                                      | Don't                                                                            | Why                                                                                                                          |
| ------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| Provide concise, glanceable summary facts (avatar, title, status badge, primary metric) in the preview. | Place heavy interactive form controls or nested sub-menus inside a preview card. | Preview cards disappear when the pointer leaves the boundary; requiring complex interaction leads to frustrating dismissals. |

**Live demo variant:** `Position and Size`

## Accessibility

Keep the underlying link usable by keyboard and assistive technology without needing the preview. Escape dismisses an open preview.

**Live demo variant:** `Multiple triggers`

## Content

Content should be concise and scannable: an avatar or icon, entity name, status badge, and only the key metrics needed to identify the linked item.

Avoid long paragraphs or fine print in the card body.

**Live demo variant:** `Content`
