# Popover

> A small panel anchored to a control for related choices or brief tasks.

- Package version: `0.1.5`
- Public export: `skytrack-ui/popover`
- Implementation: [`src/components/ui/popover.tsx`](../../../../../src/components/ui/popover.tsx)
- Public type declaration: [`dist-lib/components/ui/popover.d.ts`](../../../../../dist-lib/components/ui/popover.d.ts)
- Showcase demo id: `popover`
- Closest demo: [`src/demos/popover.demo.tsx`](../../../../../src/demos/popover.demo.tsx)
- Official guidance: [Carbon Design System Popover Usage](https://carbondesignsystem.com/components/popover/usage/)

## Usage

Use Popover for a small, non-blocking panel connected to a control, such as filters, date ranges, or a few related settings.

Avoid Popover for simple non-interactive text hints (use Tooltip), blocking confirmation dialogs (use Alert Dialog), or simple action command menus (use Menu).

The best alternative for lightweight text tips on hover is Tooltip. For critical blocking confirmation flows, choose Dialog.

**Live demo variant:** `Default`

## Behavior

Popover opens on click (or hover when configured). Opening moves focus into the popover content.

Clicking outside the popover boundary dismisses it. Pressing `Escape` closes the popover immediately and restores focus to the triggering element.

**Live demo variant:** `Animating the Popover`

## Layout

Popover renders as a floating surface directly anchored to its trigger button with an optional visual pointer arrow. Maintain an 8px offset from the trigger.

Keep the panel wide enough for its content and give it 16px internal padding. Keep it within the screen; on mobile, place it where the content is easy to reach.

| Do                                                                                                                 | Don't                                                                                          | Why                                                                                                          |
| ------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| Include a visible close button or explicit "Apply" / "Done" action inside complex popovers containing form fields. | Open interactive form-bearing popovers purely on hover without requiring an intentional click. | Hover-triggered popovers close unexpectedly when the cursor drifts, causing lost input and user frustration. |

**Live demo variant:** `Position and Size`

## Accessibility

Make the trigger’s purpose clear. Escape closes the panel and returns focus to its trigger; all controls inside remain keyboard accessible.

**Live demo variant:** `Opening on hover`

## Content

Content inside the popover should follow standard form hierarchy with concise labels, clear descriptions, and actionable button controls.

Give the popover a clear title when it contains several controls (e.g., “Filter projects”, “Notification settings”).

**Live demo variant:** `Content`
