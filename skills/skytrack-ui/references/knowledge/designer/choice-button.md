# Choice Button

> A single-choice question answered with chip-like options; exactly one is checked.

- Package version: `0.1.6`
- Public export: `skytrack-ui/choice-button`
- Implementation: [`src/components/ui/choice-button.tsx`](../../../../../src/components/ui/choice-button.tsx)
- Public type declaration: `src/components/ui/choice-button.tsx` (the dist-lib declaration appears on the next lib build; no build ran for this task)
- Showcase demo id: `choice-button`
- Closest demo: [`src/demos/choice-button.demo.tsx`](../../../../../src/demos/choice-button.demo.tsx)

## Usage

Use Choice Button when a short set of mutually exclusive options should read as compact, tappable chips. The checked option uses primary fill and shows a checkmark by default; the others stay outlined. `selectedVariant='subtle'` gives checked options a secondary fill with a primary border, and `showCheckmark={false}` hides the decorative icon.

- **Fit:** One answer from two to five short options, shown inline in a form, toolbar, or settings panel.
- **Avoid:** Multi-select answers (use Checkbox Group), one dominant action (use Button), and long lists that need search (use Select or Combobox).
- **Best alternative:** Radio Group for the classic dot treatment and longer labels.

**Live demo variant:** `Default`

## Types

The default selected treatment fills with the primary surface and shows a checkmark. The subtle treatment uses a secondary surface with a primary border. The group arranges horizontally by default and stacks vertically when labels are longer than one line.

**Live demo variant:** `Vertical group`

## Behavior

Choices behave as radios: clicking a chip selects it, arrow keys move the selection within the group, and Space or Enter confirms the focused choice. A checked choice stays checked until another is selected; there is no unselect.

- **Selection is immediate:** The value changes as soon as a choice is selected; do not add a separate Apply step for low-stakes choices.
- **Disabled choices:** Keep unavailable options visible but disabled so the full set of answers stays legible.
- **Defaults:** Preselect the most common answer with `defaultValue`; leave all unchecked only when no default is honest.
- **Option labels:** Keep each option to one or two words because chips compare poorly when their widths differ substantially.
- **Default choice:** Preselect the dominant answer when a safe default exists; an empty radio group can block downstream steps.

**Live demo variant:** `Default value`

## Layout

Give the group its question as a visible label above it, and keep the chips on one row when space allows. Horizontal groups read fastest; switch to a stacked column when labels wrap or viewport space is tight.

- **Spacing:** Chips sit 8 px apart; keep the group away from unrelated controls so the choices read as one question.
- **Mobile viewports:** Chips use shared `Button` sizes (`xs`, `sm`, `default`, `lg`) and wrap; a vertical column avoids two-line labels.

**Live demo variant:** `Vertical group`

## Accessibility

The group uses real radio semantics: one tab stop for the group, arrow keys to move between choices, and the checked state announced by `aria-checked`.

- **Group name:** Provide `aria-label` or a visible label tied through `aria-labelledby`; the question must be reachable without reading the chips.
- **Checkmark:** The icon is decorative; screen readers hear the checked state. It shows by default and can be hidden with `showCheckmark={false}`.
- **Touch targets:** Use `default` or `lg` size for touch-first layouts; keep chips separated so touch selection does not hit a neighbor.

**Live demo variant:** `Disabled choice`

## Content

Option labels are the answers themselves, in sentence case, kept short: “Low”, “Normal”, “High”. The group label is the question: “Mission priority”. Avoid double negatives and overlapping categories.

- **Ordering:** Order choices by the natural order of the value, not alphabetically by accident.
- **Disabled labels:** Keep the real label so the disabled option still reads as part of the set.
