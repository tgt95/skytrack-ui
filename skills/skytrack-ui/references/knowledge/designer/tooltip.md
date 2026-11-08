# Tooltip

> A brief hint that appears when someone points to or focuses on a control.

- Package version: `0.1.5`
- Public export: `skytrack-ui/tooltip`
- Implementation: [`src/components/ui/tooltip.tsx`](../../../../../src/components/ui/tooltip.tsx)
- Public type declaration: [`dist-lib/components/ui/tooltip.d.ts`](../../../../../dist-lib/components/ui/tooltip.d.ts)
- Showcase demo id: `tooltip`
- Closest demo: [`src/demos/tooltip.demo.tsx`](../../../../../src/demos/tooltip.demo.tsx)

## Usage

Use Tooltip to add a brief clarification when people hover over or focus a control whose purpose may otherwise be unclear.

Avoid Tooltip for critical information required to complete a primary task, for multi-sentence instructions, or for content containing interactive links or buttons (use Popover or visible inline copy instead).

The best alternative for rich content containing interactive elements or multiple paragraphs is Popover. For rich entity destination previews, choose Preview Card.

**Live demo variant:** `Default`

## Behavior

Tooltip transitions smoothly between closed, opening delay, visible, and closing states. It appears automatically on hover or keyboard focus.

Pressing `Escape` must immediately dismiss the tooltip without shifting keyboard focus away from the trigger element. Moving the pointer off the trigger closes the bubble smoothly.

**Live demo variant:** `Animating the Tooltip`

## Layout

Place the tooltip close to the control it describes, with enough contrast to read clearly.

Keep tooltip text brief and narrow enough to scan. Do not cover the control it describes or hide an essential label behind a tooltip, especially on touch screens.

| Do                                                                                 | Don't                                                                                         | Why                                                                                                        |
| ---------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| Keep tooltip text brief and useful (e.g. “Show details” for an unlabeled control). | Place interactive links, buttons, or lengthy multi-paragraph manuals inside a tooltip bubble. | Tooltips disappear when the pointer leaves the trigger, making interactive content completely unreachable. |

**Live demo variant:** `Position and Size`

## Accessibility

Keep the trigger understandable without the tooltip. Escape dismisses the hint without moving focus away from its trigger.

**Live demo variant:** `Multiple triggers`

## Content

Text should be written in sentence case and stay brief enough to scan quickly.

For actions, include the keyboard shortcut in parentheses (e.g. "Zoom in (Z)") when relevant and concise.

**Live demo variant:** `Content`
