# Select

> A field for choosing one value from a predefined list.

- Package version: `0.1.5`
- Public export: `skytrack-ui/select`
- Implementation: [`src/components/ui/select.tsx`](../../src/components/ui/select.tsx)
- Public type declaration: [`dist-lib/components/ui/select.d.ts`](../../dist-lib/components/ui/select.d.ts)
- Showcase demo id: `select`
- Closest demo: [`src/demos/select.demo.tsx`](../../src/demos/select.demo.tsx)
- Official guidance: [Carbon Design System Select Usage](https://carbondesignsystem.com/components/select/usage/)

## Usage

Use Select when people need to choose one value from a short, known list (e.g., account type, notification frequency, or date format).

Keep a short list visible with Radio Group or Toggle Group. Use Combobox or Autocomplete when people need to search a long list.

The best alternative for small sets of 2 to 4 visible choices is Radio Group. For large, searchable option lists (like national airport registries), choose Combobox.

**Live demo variant:** `Default`

## Types

Select supports three control heights matching standard form inputs:

- **Compact:** Use in dense filters when the selected value remains readable.
- **Standard:** Use for common forms and dialogs.
- **Large:** Use when a larger touch target or greater prominence is needed.

Group options under concise headings when categories help people scan the list.

**Live demo variant:** `Sizes`

## Behavior

Clicking the trigger opens the popup menu. Moving the cursor or using arrow keys highlights options.

Selecting an option updates the trigger value immediately and dismisses the menu. Pressing `Escape` closes the menu and returns focus to the trigger.

**Live demo variant:** `Default`

## Layout

Give Select a visible label and add supporting text when it helps people choose. Keep 16px between form fields.

Align Select with nearby controls. In long lists, organize choices into clear categories.

| Do                                                       | Don't                                   | Why                                                                                                       |
| -------------------------------------------------------- | --------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| Use a brief prompt when no option has been selected yet. | Use placeholder text as the only label. | Once a selection is made, the placeholder disappears, leaving users unable to identify the field purpose. |

**Live demo variant:** `Grouped`

## Accessibility

Label the field and make its open and selected states clear. Enter, Space, or ArrowDown opens it; arrow keys move through choices; Enter selects and Escape closes.

**Live demo variant:** `Disabled`

## Content

Option labels should be concise, scannable noun phrases written in sentence case (e.g., "Optical Zoom (4K)", "Thermal Infrared Radiometric").

Placeholder copy should state the action (e.g., “Choose an account type”).

**Live demo variant:** `Placeholder values`
