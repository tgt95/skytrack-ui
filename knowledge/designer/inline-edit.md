# Inline Edit

> A way to change a value in place while keeping it within its surrounding context.

- Package version: `0.1.5`
- Public export: `skytrack-ui/inline-edit`
- Implementation: [`src/components/ui/inline-edit.tsx`](../../src/components/ui/inline-edit.tsx)
- Public type declaration: [`dist-lib/components/ui/inline-edit.d.ts`](../../dist-lib/components/ui/inline-edit.d.ts)
- Showcase demo id: `inline-edit`
- Closest demo: [`src/demos/inline-edit.demo.tsx`](../../src/demos/inline-edit.demo.tsx)
- Official guidance: [Carbon Design System Text Input & Inline Edit](https://carbondesignsystem.com/components/text-input/usage/)

## Usage

Use Inline Edit when users need to make quick, in-place corrections to names, labels, or project titles without opening a modal dialog or leaving the current screen context.

Avoid Inline Edit for initial record creation or complex multi-field entities requiring batch validation; use a dedicated form sheet or Form instead.

The best alternative for read-only text paired with an explicit action button is standard typography with a standalone Button variant `ghost`.

**Live demo variant:** `Headless trigger`

## Behavior

Inline Edit alternates between a static display state and an active editing input. The transition occurs on click, Enter, or Space.

Committing changes occurs on Enter or blur, while Escape reverts the field to its previous value without saving. When invalid, keep focus inside the field and present inline error feedback.

**Live demo variant:** `Headless trigger`

## Layout

In layout, the trigger element should inherit surrounding typography (such as an `h3` heading or table cell) without causing layout shift when transitioning to an input.

Give the edit affordance enough surrounding space to discover and activate. On touch screens, make the target at least 44px tall.

| Do                                                                                            | Don't                                                                        | Why                                                                      |
| --------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| Provide visual hover cues (like a subtle background tint or edit icon) to signal editability. | Conceal editable text as plain static copy without discoverable affordances. | Users cannot guess which text elements are editable without visual cues. |

**Live demo variant:** `Custom trigger via render`

## Accessibility

Give the edit action a clear name. Move focus into the field when editing starts; Enter saves and Escape cancels. Make viewing and editing states distinct.

**Live demo variant:** `Headless trigger`

## Content

Display the committed value or an empty placeholder hint (e.g., "Add project name..."). Use sentence case for placeholder copy.

Keep editable strings concise (under 40 characters). For longer narrative copy or notes, use a dedicated textarea or sheet.

**Live demo variant:** `Custom trigger via render`
