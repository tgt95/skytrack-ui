# Input

> A single-line field for entering or searching text.

- Package version: `0.1.5`
- Public export: `skytrack-ui/input`
- Implementation: [`src/components/ui/input.tsx`](../../src/components/ui/input.tsx)
- Public type declaration: [`dist-lib/components/ui/input.d.ts`](../../dist-lib/components/ui/input.d.ts)
- Showcase demo id: `input`
- Closest demo: [`src/demos/input.demo.tsx`](../../src/demos/input.demo.tsx)
- Official guidance: [Carbon Design System Text Input Usage](https://carbondesignsystem.com/components/text-input/usage/)

## Usage

Use Input for single-line freeform alphanumeric data entry, such as account identifiers, names, or keyword searches.

Avoid Input for strictly bounded numbers (use Number Field), multi-line text (use a multi-line text field), verification codes (use OTP Field), or selecting from predefined lists (use Select or Combobox).

The best alternative for selectable options is Combobox. For formatted numbers with stepper controls, choose Number Field.

**Live demo variant:** `Default`

## Types

Choose control size and value type to match the expected entry and surrounding form.

## Behavior

Input responds immediately to keystrokes. When focused, show a clear, high-contrast indicator so people can identify the active field.

When invalid, the border shifts to destructive color, accompanied by a paired error message. Disabled inputs appear visually muted and reject focus.

**Live demo variant:** `States`

## Layout

Place a visible label above the input and add supporting text when it clarifies the expected value. Keep 16px between form fields.

Match the input width to the expected answer: keep short codes compact and give longer names room to read. On mobile, use the available width and provide a touch target of at least 44px.

| Do                                                                                          | Don't                                                                             | Why                                                                                      |
| ------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| Pair every text input with a permanent visible field label placed directly above the input. | Rely on placeholder text as the sole label or replacement for field instructions. | Placeholders disappear when typing starts, removing context and error recovery guidance. |

**Live demo variant:** `Adornment`

## Accessibility

Provide a visible label and connect supporting instructions and errors to the field. Show invalid state with text or an icon as well as color.

**Live demo variant:** `States`

## Content

Field labels should be concise noun phrases in sentence case (e.g., “Account number”, “Project name”).

Placeholders should provide a representative formatting example (e.g., “e.g., AC-12345” or “name@example.com”), never mandatory instructions. Error messages must explain how to resolve the issue directly.

**Live demo variant:** `Types`
