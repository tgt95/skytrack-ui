# Select

> A field for choosing one or more values from a predefined list.

- Package version: `0.1.5`
- Public export: `skytrack-ui/select`
- Implementation: [`src/components/ui/select.tsx`](../../../../../src/components/ui/select.tsx)
- Public type declaration: [`dist-lib/components/ui/select.d.ts`](../../../../../dist-lib/components/ui/select.d.ts)
- Showcase demo id: `select`
- Closest demo: [`src/demos/select.demo.tsx`](../../../../../src/demos/select.demo.tsx)
- Official guidance: [Carbon Design System Select Usage](https://carbondesignsystem.com/components/select/usage/)

## Usage

Use Select when people need to choose from a compact, predefined list of options (e.g., account type, notification frequency, or export format). Single selection is the default.

SkyTrack UI's Select supports multiple selection (`multiple` prop) as a local component capability. Official Carbon Select is strictly single-select (Carbon provides a separate Multiselect component for multiple values), but SkyTrack allows multi-selection directly in Select when space is constrained.

When choosing between selection components:
- **Radio Group vs. Single Select:** Use Radio Group when a short set of mutually exclusive options fits comfortably and benefits from being visible at once. Use single Select when space is limited or people need to choose from a longer list.
- **Checkbox Group vs. Multi-Select:** Use Checkbox Group when the choices fit comfortably together and people benefit from comparing them without opening a dropdown. Use multi-select Select when space constraints make a visible group impractical.
- **Combobox vs. Select:** Use Combobox (or Autocomplete for single-item lookups) when the list is long, dynamic, or requires keyword search and filtering. Select does not provide built-in search.

**Live demo variant:** `Default`

## Types

Select supports single selection (default) and multiple selection (`multiple` mode). Group options by category only when that structure helps users scan and navigate related choices.

**Live demo variant:** `Multiple selection`

## Behavior

Clicking the trigger opens the popup menu. Moving the cursor or using arrow keys highlights options.

In single-select mode, selecting an option updates the trigger value immediately and dismisses the menu. In multi-select mode, the menu stays open to allow batch selections until dismissed. Pressing `Escape` closes the menu and returns focus to the trigger.

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

Option labels should be concise, scannable noun phrases written in sentence case (e.g., “Standard quality”, “High quality”).

Placeholder copy should state the action (e.g., “Choose an account type”).

**Live demo variant:** `Placeholder values`
