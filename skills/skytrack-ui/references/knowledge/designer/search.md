# Search

## Usage

Use Search to find or filter content when a query is more efficient than browsing. For a short, fixed set of choices, use a selection control instead.

**Live demo variant:** `DEFAULT WITH CLEAR`

## Types

- **Default:** compact search for page and component toolbars.
- **Fluid:** taller search for contained contexts where the field needs more visual room.
- **Disabled:** unavailable state when the parent flow cannot search.

The Search examples use the default and fluid widths supported by the component while retaining shared SkyTrack input styling.

**Live demo variant:** `FLUID`

## Behavior

Typing updates the query. A clear action appears when the field contains text. The component does not decide how results are filtered or submitted; connect `onValueChange` to the relevant result set.

**Live demo variant:** `DEFAULT WITH CLEAR`

## Layout

Use a width that reflects the expected query and available toolbar space. In a table toolbar, keep Search on the left and related actions on the right when space allows. Let the controls wrap on narrow viewports.

**Live demo variant:** `FLUID`

## Accessibility

Provide an accessible name with `FieldLabel` or `aria-label`. The clear button has its own accessible label and is keyboard-operable. Do not rely on placeholder text as the only label.

**Live demo variant:** `DISABLED`

## Content

Use short, specific placeholder text that names the searchable content, such as “Search workspaces”. Keep helper text outside the placeholder when users need an instruction.

**Live demo variant:** `DEFAULT WITH CLEAR`
