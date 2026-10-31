# Base UI API audit — 2026-10-29

## Scope

Audited `skytrack-ui` against the latest stable `@base-ui/react` 1.9.0 and its official component Markdown pages. Registry and installed versions both report 1.9.0. The source has 39 files importing Base UI packages/hooks; 37 correspond to official component pages. `breadcrumb` and `inline-edit` use Base UI's `use-render` utility rather than a component page.

All 37 official pages were fetched from `https://base-ui.com/react/components/<slug>.md`. Every page contains Anatomy and API reference sections. Local wrappers primarily derive prop types from the Base UI component itself (`React.ComponentProps<typeof Base...>` or the component's exported `.Props`) and spread remaining props through. The full source and demo typecheck against installed 1.9.0, excluding a pre-existing unused import warning documented below.

## Findings fixed

1. **Stateful `className` was dropped by wrappers.** Base UI documents `className` as a string or state callback across component parts. Wrappers passed callback values into `cn`, whose previous `clsx` handling discarded functions. Removed `className as string` casts and updated `cn` to defer merging until Base UI supplies state. All 37 Markdown pages document `className`; a source search now finds no `className as string` in `src/components/ui`.
2. **Closable Tabs had nested buttons.** Base UI Tabs renders a native button by default, while the demo nested a close button inside it. Changed the tab render element to `<div />` and set `nativeButton={false}` as the current Tabs docs require for non-button render elements. Orca DOM inspection confirms `div[role=tab]` with a separate close button.
3. **Adorned Input misrouted stateful className.** When an adornment was present, `Input` put the Base UI Input's `className` callback on a native wrapper `<span>`. It now preserves string classes on that wrapper for existing layout use, while passing callback classes to `BaseInput` where Base UI supplies state.
4. **TabsTab dropped stateful style callbacks.** Vertical tab alignment merged `style` as an object, so Base UI's documented callback form was spread as an object. It now composes object and callback styles while retaining vertical alignment overrides.
5. **Checkbox Group examples skipped Field composition.** The three labeled checkbox group examples now use `Field.Root` and `Field.Item`, with `Field.Label` for item labels. Group headings render as `div` through `Field.Label` and are connected to `CheckboxGroup` using `aria-labelledby`; this keeps the group name accessible without creating an unassociated HTML `<label>`. `Field.Control` is not used because a checkbox group is a multi-value group, not a single field control.

## Component coverage

The following official component pages were checked against the corresponding wrappers and demos: Accordion, Alert Dialog, Autocomplete, Avatar, Button, Checkbox, Checkbox Group, Collapsible, Combobox, Context Menu, Dialog, Drawer, Field, Fieldset, Form, Input, Menu, Menubar, Meter, Navigation Menu, Number Field, OTP Field, Popover, Preview Card, Progress, Radio Group, Scroll Area, Select, Separator, Slider, Switch, Tabs, Toast, Toggle, Toggle Group, Toolbar, Tooltip.

The component API surface typechecks against 1.9.0. The wrappers preserve Base UI props and use documented parts; component-specific design choices remain local to SkyTrack. This audit does not claim exhaustive manual interaction testing of every demo or every browser/accessibility state.

## Demo field labels

All 43 `src/demos/*.demo.tsx` files were scanned for native labels and field controls. Labeled Input, Autocomplete, Combobox input, Checkbox, Radio, Switch, Number Field, OTP Field, and dialog/drawer text areas now use `Field.Root` with the relevant `Field.Label`, `Field.Control`, or `Field.Item` parts. `Field.Control` is omitted for Base UI input components that integrate with `Field` directly; text areas use `Field.Control render={<textarea />}`.

Trigger-based labels follow Base UI's component-specific guidance: Select uses `Select.Label`; trigger and input-inside-popup Combobox examples use `Combobox.Label`; sliders use `Slider.Label`; meters use `Meter.Label`. Labeled Select and Slider examples are also enclosed by `Field.Root`. Controls without a visible label keep an `aria-label` on the control itself. No native `<label>` elements remain in demo JSX (the remaining search match is an explanatory OTP comment).

Orca DOM inspection at `http://localhost:5174/?view=components#combobox` found all 16 labeled Combobox/Autocomplete inputs with matching `label[for]` and input IDs; no broken `for` targets, unassociated label elements, or `Field.Item` nodes outside a `Field.Root` were found. Visible Select labels are inside Field roots. This is DOM evidence, not a full keyboard or screen-reader audit. See the official [Base UI forms labeling guidance](https://base-ui.com/react/handbook/forms), [Field docs](https://base-ui.com/react/components/field), and [Combobox docs](https://base-ui.com/react/components/combobox).

## Validation

- `npx tsc -p tsconfig.json --noEmit --noUnusedLocals false` — PASS.
- `npm run typecheck` — PASS after removing the unused `SelectLabel` import from `src/showcase/overview-style.tsx`.
- `npm run typecheck` — PASS after the demo labeling audit and fixes; `npx prettier --write` on the 15 changed demo files — PASS.
- `npx prettier --check src/components/ui src/lib/utils.ts src/demos/tabs.demo.tsx` — PASS. The pre-existing showcase file is excluded because it has unrelated formatting differences.
- `git diff --check` — PASS.
- Orca Browser `http://localhost:5174/#field` — showcase renders; required Field submit sets `data-invalid` and callback class; Tabs DOM uses a `div[role=tab]` around the independent close button.
- Orca Browser `http://localhost:5174/#checkbox-group` — all three labeled examples expose `role="group"` with `aria-labelledby`, and each option uses a `Field.Item` with an associated `Field.Label`.
- Orca Browser `http://localhost:5174/?view=components#combobox` — all 16 visible Combobox/Autocomplete field labels match their input IDs; no broken label targets, unassociated labels, or orphan Field.Items. Visible Select labels are nested under Field roots.
- No build run under `UI-QC-LIGHT`.
