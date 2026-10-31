# Field

> A layout for a control, its label, supporting text, and validation feedback.

- Package version: `0.1.5`
- Public export: `skytrack-ui/field`
- Implementation: [`src/components/ui/field.tsx`](../../src/components/ui/field.tsx)
- Public type declaration: [`dist-lib/components/ui/field.d.ts`](../../dist-lib/components/ui/field.d.ts)
- Showcase demo id: `field`
- Closest demo: [`src/demos/field.demo.tsx`](../../src/demos/field.demo.tsx)
- Official guidance: [Fluent 2 Field Usage](https://fluent2.microsoft.design/components/web/react/core/field/usage)

## Usage

Use Field to keep a control’s visible label, supporting instructions, and validation message together.

- **Fit:** Every labeled form control in screens.
- **Avoid:** Controls whose labels, instructions, or errors are visually detached from the control.
- **Best alternative:** For grouping multiple related fields under a common heading, use Fieldset.

**Live demo variant:** `Default`

## Types

A field brings together the control, its label, and any supporting or error text:

- **Field group:** Keeps the label, control, and messages together.
- **Label:** Names the value people should enter or choose.
- **Control:** The input or choice the person interacts with.
- **Supporting text:** Explains the expected value or choice.
- **Error message:** Explains what needs to be corrected.
- **Choice item:** Keeps an option and its label together.

**Live demo variant:** `With Input`

## Behavior

Field coordinates validation states dynamically:

- **Validation timing:** Show feedback when people can act on it, such as after they leave a field or submit the form.
- **Error display:** Place a clear error message beside the field and make the affected control visually distinct.
- **Disabled state:** Make unavailable controls visibly distinct and explain why they cannot be changed when that information is useful.

| Do                                                                              | Don't                                                                                     | Why                                                                                         |
| ------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| Show specific, actionable error messages immediately below the invalid control. | Show a generic page-level banner without marking which specific fields failed validation. | Placing errors directly adjacent to fields helps users quickly locate and correct mistakes. |

**Live demo variant:** `Custom validation (onChange, debounced)`

## Layout

Separate fields by 16px so labels, controls, and supporting text remain easy to scan.

- **Multi-column grids:** On desktop, fields arrange in 1-column or 2-column grids (up to 4 columns for compact peer fields like coordinates).
- **Secondary labels:** Place a short supporting hint below the field label in a quieter text style.
- **Mobile viewports:** Forms collapse to a single column with 16px gaps, keeping labels positioned above inputs.

**Live demo variant:** `Field.Item`

## Accessibility

Keep labels, instructions, and errors close to the control they describe. Explain invalid input in text and do not rely on color alone.

**Live demo variant:** `Disabled`

## Content

Labels should be concise noun phrases in sentence case (e.g., “Email address”, “Maximum quantity”).

- **Required indicator:** Indicate mandatory fields clearly (e.g. Red asterisk or "(required)").
- **Error messaging:** Error copy should state what was wrong and how to fix it (e.g., “Value must be between 50 and 400”).

**Live demo variant:** `Validity`
