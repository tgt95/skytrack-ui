# Checkbox Group

> A group of related choices where people may select more than one option.

- Package version: `0.1.5`
- Public export: `skytrack-ui/checkbox-group`
- Implementation: [`src/components/ui/checkbox-group.tsx`](../../src/components/ui/checkbox-group.tsx)
- Public type declaration: [`dist-lib/components/ui/checkbox-group.d.ts`](../../dist-lib/components/ui/checkbox-group.d.ts)
- Showcase demo id: `checkbox-group`
- Closest demo: [`src/demos/checkbox-group.demo.tsx`](../../src/demos/checkbox-group.demo.tsx)
- Official guidance: [W3C WAI ARIA Checkbox Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/)

## Usage

Use Checkbox Group when people can choose several related options, such as selecting notification types, filtering activity by status, or completing a checklist.

- **Fit:** Multi-select options within a cohesive group (e.g. "Select alert channels: Email, SMS, Radio").
- **Avoid:** Mutually exclusive choices where only one option is permitted (use Radio Group), or standalone binary toggles (use Checkbox or Switch).
- **Best alternative:** For mutually exclusive choices, use Radio Group.

**Live demo variant:** `Default`

## Types

Checkbox Group presents related choices together. A select-all choice can represent the group, including when only some options are selected.

- **Standard group:** Uniform list of checkboxes with a shared group label.
- **Select all:** A group-level choice can select or clear all options and indicate when only some are selected.

**Live demo variant:** `Labeling a checkbox group`

## Behavior

Selecting an option changes its state. The select-all choice can select or clear all options in the group.

- **Partial selection:** Make it clear when some, but not all, options are selected.
- **Disabled state:** Disable only choices that are unavailable, and explain the reason when people need it to make a decision.

| Do                                                                                                                       | Don't                                                                              | Why                                                                                        |
| ------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| Offer a select-all choice when people need to select many related options at once, and show when only some are selected. | Make people select many options one at a time when they commonly need all of them. | A select-all choice speeds up repeated selection and still communicates partial selection. |

**Live demo variant:** `Parent checkbox`

## Layout

Stack choices vertically with 12–16px between them so each label is easy to scan.

- **Horizontal layout:** Only use horizontal layouts when choices are few (2–3 items) and labels are short.
- **Form placement:** Give the group a visible label and add supporting or error text when it helps people make or correct a choice.
- **Mobile:** Keep vertical stacking on mobile viewports to provide clear, uninterrupted 44px tap targets.

**Live demo variant:** `Nested parent checkbox`

## Accessibility

Give the group a clear label. Users can reach each choice with Tab and toggle it with Space. Show mixed selection with a cue beyond color.

**Live demo variant:** `Disabled group`

## Content

Provide a clear group-level label (e.g., “Notification types”, “Report sections”) indicating whether selection is optional or required.

- **Item labels:** Keep individual checkbox labels concise (1–4 words) in sentence case.
- **Helper text:** Put any supporting detail beside the choice it explains, using a quieter text style.

**Live demo variant:** `Form integration`
