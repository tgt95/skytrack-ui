# Number Field

> A field for entering a number and adjusting it in controlled increments.

- Package version: `0.1.5`
- Public export: `skytrack-ui/number-field`
- Implementation: [`src/components/ui/number-field.tsx`](../../src/components/ui/number-field.tsx)
- Public type declaration: [`dist-lib/components/ui/number-field.d.ts`](../../dist-lib/components/ui/number-field.d.ts)
- Showcase demo id: `number-field`
- Closest demo: [`src/demos/number-field.demo.tsx`](../../src/demos/number-field.demo.tsx)
- Official guidance: [Carbon Design System Number Input Usage](https://carbondesignsystem.com/components/number-input/usage/)

## Usage

Use Number Field when people need to enter or fine-tune an exact numeric value within known limits, such as quantity, duration, or percentage.

Avoid Number Field for numeric strings that do not represent arithmetic quantities, such as credit card numbers, telephone numbers, postal codes, or passcodes (use standard Input or OTP Field).

Use Slider for approximate values across a broad range. Use Input for values that are not quantities.

**Live demo variant:** `Demo`

## Types

Number Field supports standardized control sizes aligned with buttons and inputs:

- **Compact:** Use in dense tables or short inline controls.
- **Small:** Use in compact forms.
- **Standard:** Use in common forms and dialogs.
- **Large:** Use when the input is prominent or needs a larger touch target.

**Live demo variant:** `Button-aligned sizes`

## Behavior

Number Field allows direct numeric text typing as well as incremental adjustments via the stepper buttons.

Values snap to configured `step` increments. When `min` or `max` bounds are reached, the corresponding stepper button disables automatically.

**Live demo variant:** `Min, max and step`

## Layout

Give the field a visible label and add instructions when they help people enter a valid value. Keep 16px between fields.

Align the field with nearby controls. Use a compact size in dense layouts only when the value remains easy to read and change.

| Do                                                                                                                    | Don't                                                                                                  | Why                                                                        |
| --------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------- |
| Enforce sensible min, max, and step increments (e.g. a percentage step of 5) and display valid limits in helper text. | Allow users to type values outside safe operating limits without immediate visual warning or clamping. | Values outside a meaningful range can cause errors or unintended outcomes. |

**Live demo variant:** `Form integration`

## Accessibility

Label the value and unit. Make current and allowed values clear. Arrow keys adjust the value; PageUp and PageDown make larger changes.

**Live demo variant:** `Disabled`

## Content

Labels should state the attribute name clearly with units indicated in the label or adornment (e.g., “Monthly limit (%)”, “Response time (seconds)”).

Use concise helper descriptions to explain recommended operating bounds (e.g. "Legal ceiling is 120m AGL").

**Live demo variant:** `Controlled`
