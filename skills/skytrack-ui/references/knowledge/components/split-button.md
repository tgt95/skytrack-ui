# Split Button

> A primary action paired with a menu of related actions that share one control.

- Package version: `0.1.6`
- Public export: `skytrack-ui/split-button`
- Implementation: [`src/components/ui/split-button.tsx`](../../../../../src/components/ui/split-button.tsx)
- Public type declaration: [`dist-lib/components/ui/split-button.d.ts`](../../../../../dist-lib/components/ui/split-button.d.ts)
- Showcase demo id: `split-button`
- Closest demo: [`src/demos/split-button.demo.tsx`](../../../../../src/demos/split-button.demo.tsx)

## Overview

Split Button joins one dominant action with a menu of related actions. The action runs immediately; the caret opens a menu owned by `skytrack-ui/menu`.

It joins the two halves with shared rounding and a 1 px overlap, so the pair reads as one control while still showing two targets. Variants without a border of their own (`default`, `destructive`, `secondary`, `ghost`) also draw a 20% `currentColor` divider; `outline` relies on its own `border-input` edge. `variant` and `size` are derived from `buttonVariants`, so every Button variant and control height is available here automatically. The menu trigger is a square Button at the same height as the action, so font size, padding, gap, icon sizing, and focus ring all come from the same shared configuration.

Use it when the dominant action is obvious and the menu holds variants of that action, such as **Save** with *Save as draft* and *Save and close*. For actions of equal weight, use separate Buttons or `skytrack-ui/toolbar` instead; a split button implies a hierarchy that does not exist then.

**Live demo variant:** `Default`

```tsx
import { SplitButton, SplitButtonAction, SplitButtonTrigger } from '@/components/ui/split-button'
import { Menu, MenuItem, MenuPopup, MenuPortal, MenuPositioner, MenuTrigger } from '@/components/ui/menu'

export function SplitButtonExample() {
  return (
    <SplitButton>
      <SplitButtonAction>Save mission</SplitButtonAction>
      <Menu>
        <MenuTrigger render={<SplitButtonTrigger aria-label='More actions' />} />
        <MenuPortal>
          <MenuPositioner side='bottom' align='end' sideOffset={4}>
            <MenuPopup>
              <MenuItem>Duplicate</MenuItem>
              <MenuItem>Rename</MenuItem>
            </MenuPopup>
          </MenuPositioner>
        </MenuPortal>
      </Menu>
    </SplitButton>
  )
}
```

## Usage

- Keep one dominant action on the left. If no action is clearly primary, this is the wrong control.
- Put only closely related actions in the menu. Unrelated commands belong in the page's own menu or toolbar.
- Use `SplitButtonTrigger` only through `MenuTrigger render={...}` so `aria-haspopup`, `aria-expanded`, focus return, and keyboard handling stay owned by `skytrack-ui/menu`.
- Disable the action with `disabled` on `SplitButtonAction` when the action is temporarily unavailable but the menu still helps, for example when the person can duplicate but not publish.
- Do not use Split Button for navigation, filters, or toggles; Button, Toggle, and Toggle Group own those roles.

**Live demo variant:** `Default`

## Anatomy

### Composition Tree

```text
<SplitButton variant='default|destructive|outline|secondary|ghost|link' size='xs|sm|default|lg'>
├─ <SplitButtonAction />      (Button, primary action)
└─ <Menu>
   ├─ <MenuTrigger render={<SplitButtonTrigger aria-label='More actions' />} />
   └─ <MenuPortal> <MenuPositioner> <MenuPopup> …
```

1. `SplitButton`: Group container (`data-slot='split-button'`, `role='group'`) that provides `variant`, `size`, and `disabled` to its parts and exposes `data-variant` and `data-size`.
2. `SplitButtonAction`: A `Button` with the inherited variant and size (`data-split-button-part='action'`). Keeps its own className, render target, and disabled state.
3. `SplitButtonTrigger`: A square `Button` (`data-split-button-part='trigger'`, `size='icon'` family) with the inherited variant. It maps the shared control size to the matching square width, so it is always as tall as the action. `aria-label` is required.
4. `Menu`: Owns the popup, keyboard behavior, and outside-click handling. Compose `MenuTrigger` with `render={<SplitButtonTrigger />}`.

Render exactly two Button-based children directly inside `SplitButton`. Rounding, the 1 px overlap, and the divider are applied to the parts through `data-split-button-part`, so an extra wrapper element breaks the joined appearance and the seam stops matching. The divider is a `currentColor` border at 20% opacity and is applied only to `default`, `destructive`, `secondary`, and `ghost`; `outline` already draws a 1 px `border-input` edge, and `link` has no seam. The selectors target only the two parts, so unrelated siblings inserted by a composed menu cannot change the control's width.

**Live demo variant:** `Sizes`

## Variants & states

`variant` accepts the six Button variants: `default`, `destructive`, `outline`, `secondary`, `ghost`, `link`. `size` accepts the four control sizes and maps to the matching square trigger:

| Size      | Height | Action font | Trigger width | Trigger icon |
| --------- | ------ | ----------- | ------------- | ------------ |
| `xs`      | 24px   | `text-xs`   | 24px          | 14px         |
| `sm`      | 32px   | `text-sm`   | 32px          | 16px         |
| `default` | 40px   | `text-sm`   | 40px          | 16px         |
| `lg`      | 48px   | `text-base` | 48px          | 20px         |

Interactive states belong to the inner Buttons: hover, `focus-visible`, `disabled`, and the menu's open state. Focusing either half raises it (`z-10`) so the shared 3px focus ring is never covered by the adjacent button. Opening the menu does not change the action button's appearance.

**Live demo variant:** `Variants`

## Accessibility

- `SplitButton` renders `role='group'`. Give the group an `aria-label` when the page has more than one split button.
- The two halves are separate tab stops; Tab moves from the action to the caret, and Shift+Tab reverses it.
- `SplitButtonTrigger` requires `aria-label`, because the caret icon alone has no accessible name. Do not pass a visible text label to the trigger.
- The caret is decorative (`aria-hidden`) and inherits its size from the Button control size.
- The menu provides `aria-haspopup='menu'`, `aria-expanded`, arrow-key navigation, Escape to close, and focus return. Do not reimplement these.
- A disabled action is exposed as disabled; it is skipped by keyboard and click. Keep the menu trigger enabled when its items are still valid.
- Verify the focus ring on both halves in both themes; the ring is 3px and extends beyond the button edge.

**Live demo variant:** `Default`

## API & examples

Import named parts from `skytrack-ui/split-button` (or `@/components/ui/split-button` locally):
`SplitButton`, `SplitButtonAction`, `SplitButtonTrigger`.

| Prop          | Target                | Type                                                         | Default     |
| ------------- | --------------------- | ------------------------------------------------------------ | ----------- |
| `variant`     | `SplitButton`         | `'default' \| 'destructive' \| 'outline' \| 'secondary' \| 'ghost' \| 'link'` | `'default'` |
| `size`        | `SplitButton`         | `'xs' \| 'sm' \| 'default' \| 'lg'`                           | `'default'` |
| `disabled`    | `SplitButton`         | `boolean`                                                     | `false`     |
| `disabled`    | `SplitButtonAction`   | `boolean`                                                     | inherited   |
| `aria-label`  | `SplitButtonTrigger`  | `string` (required)                                           | —           |
| `children`    | `SplitButtonTrigger`  | `React.ReactNode`                                             | caret icon  |
| `className`   | All parts             | `string`                                                      | `undefined` |

`SplitButton` accepts standard `div` props; both parts accept `Button` props except `variant` and `size`, which come from the root so the halves cannot drift. Parts used outside `SplitButton` fall back to `variant='default'`, `size='default'`, and `disabled=false`.

Type helpers:

- `SplitButtonVariant` — derived from `buttonVariants`, so it stays in sync with Button.
- `SplitButtonSize` — the shared `ControlSize`.

**Live demo variant:** `Sizes`

## Evidence and limits

- Package/version checked: `0.1.6`.
- Export: [`package.json`](../../../../../package.json) — `./split-button`.
- Source, public declarations, and closest demo: linked above.
- Limits or unverified behavior: the menu is always on the trailing side and there is no vertical or leading-menu arrangement. The component does not wrap or truncate a long action label; set a max width on the action. The joined seam relies on direct Button children, so a custom wrapper element opts out of the shared rounding. The package does not measure theme contrast.
