# Card

> A content surface for one distinct module, state, or set of related actions.

## Usage

Use Card when a group of content needs its own visual boundary and its own title or actions. Keep the page's main information visible; do not turn every label or subgroup into a nested card. Use headings, lists, tables, or `Fieldset` when they express the relationship without another surface.

- **Fit:** A standalone report section, summary, output, or independent work area.
- **Avoid:** A wrapper around every small group, a clickable tile with no clear destination, or a substitute for page navigation.
- **Best alternative:** Use `Page Header` for page identity and page-level actions; use `Fieldset` for related form controls; use `Empty` for a region with no content.

## Layout

Card uses a fixed 40px heading row with the title left and optional toolbar right. The description sits below and clamps to one line. In `lg` Cards the description uses `text-base` and toolbar buttons are 40px high; `sm` and `md` descriptions use `text-sm`. The toolbar remains on one row and scrolls horizontally when needed.

Choose Card padding by density and nesting:

- `sm`: 12px for compact modules.
- `md`: 16px for the standard surface.
- `lg`: 24px for a spacious, prominent section.

Size changes outer padding only. Keep the internal spacing and header height consistent. Use the smaller sizes for nested cards only when the nested surface communicates a real layer of information.

## Accessibility

Use a meaningful heading level for the document outline. Name a semantic Card section with `aria-labelledby` and the ID of its title. Give a toolbar group an accessible name when its actions need context. Do not rely on visual truncation to hide required information; the full text remains in the DOM.

## Content

Write concise sentence-case titles. Use descriptions only when they add context that the title cannot provide. Put direct action labels in the toolbar and keep controls usable by keyboard.
