# Empty

> A placeholder for a region with no records, results, or content, with optional media and actions.

- Package version: `0.1.5`
- Public export: `skytrack-ui/empty`
- Implementation: [`src/components/ui/empty.tsx`](../../../../../src/components/ui/empty.tsx)
- Public type declaration: [`dist-lib/components/ui/empty.d.ts`](../../../../../dist-lib/components/ui/empty.d.ts)
- Showcase demo id: `empty`
- Closest demo: [`src/demos/empty.demo.tsx`](../../../../../src/demos/empty.demo.tsx)

## Overview

Empty explains why a region has nothing to show and offers the next useful action. It is a compound composition: a container with an optional media slot, a short title, supporting description, and an action row. The default media is a decorative neutral mark; supply your own illustration or icon as `EmptyMedia` children when the context needs a specific visual.

It replaces ad-hoc “No data” paragraphs inside tables, panels, cards, search results, and first-run states while keeping spacing and typography consistent across the product.

**Live demo variant:** `With actions`

```tsx
import { Button } from '@/components/ui/button'
import { Empty, EmptyContent, EmptyDescription, EmptyMedia, EmptyTitle } from '@/components/ui/empty'

export function EmptyExample() {
  return (
    <Empty className='max-w-md'>
      <EmptyMedia />
      <EmptyTitle>No missions scheduled</EmptyTitle>
      <EmptyDescription>Create a mission or import an existing flight plan to start planning.</EmptyDescription>
      <EmptyContent>
        <Button size='sm'>New mission</Button>
      </EmptyContent>
    </Empty>
  )
}
```

## Usage

Use Empty whenever a region that normally holds content has none and people need to understand the state or act on it. Typical cases: an empty result set after filtering, a first-run list with no records, a panel waiting for a connection, or a table body with zero rows.

Do not use Empty for a failed request or validation error — use `skytrack-ui/alert` so the failure and recovery path stay explicit. Do not use it as a loading placeholder; render a skeleton or progress treatment instead. For adding files, use `skytrack-ui/dropzone`; Empty describes the absence of content, it does not accept input itself.

- Keep one message per region; nest Empty only when a card and its inner list are genuinely separate regions.
- Omit `EmptyContent` when there is no authorized or useful next step. A dead-end empty state should be honest rather than invent an action.
- Omit `EmptyMedia` when space is tight; the text and actions carry the meaning.

**Live demo variant:** `Inline in panel`

## Anatomy

### Composition Tree

```text
<Empty variant='default|simple' size='sm|default|lg'>
├─ <EmptyMedia />            (optional; built-in mark, or custom children)
├─ <EmptyTitle />            (optional)
├─ <EmptyDescription />      (optional)
└─ <EmptyContent>            (optional action row)
   └─ <Button /> / <a />
```

Render order is media, title, description, then actions. Every part is optional; a bare `<Empty />` renders an empty centred container, so include at least a title or description.

1. `Empty`: Centred flex container (`data-slot='empty'`) that provides `size` and `variant` to its parts through context and exposes them as `data-size` and `data-variant`.
2. `EmptyMedia`: Visual slot (`data-slot='empty-media'`). With no children it renders a decorative `FolderDashedIcon` mark (or the component passed via the `icon` prop) and is hidden from assistive technology. With children it becomes an unstyled flex wrapper, so a custom icon or image keeps its own size and alt text.
3. `EmptyTitle`: Styled container (`data-slot='empty-title'`) for the headline. It renders a `<div>`; add `role='heading'` with `aria-level` only when the surrounding outline needs a heading.
4. `EmptyDescription`: Supporting text (`data-slot='empty-description'`) in `text-muted-foreground`, sized by the root `size`.
5. `EmptyContent`: Wrapping flex row (`data-slot='empty-content'`) for actions, typically SkyTrack Buttons or links.

**Live demo variant:** `Custom media`

## Variants & states

`variant` controls the media treatment only:

- `default`: the media mark sits in a bordered, muted tile — appropriate for a page-level or panel-level empty state.
- `simple`: the tile is removed and the bare mark is larger, for compact or low-emphasis regions.

`size` scales spacing, the media mark, and the copy:

| Size      | Root padding | Gap | Default media | Title      | Description |
| --------- | ------------ | --- | ------------- | ---------- | ----------- |
| `sm`      | 16px         | 8px | 20px mark     | `text-sm`  | `text-xs`   |
| `default` | 24px         | 16px (media-title), 8px (title-description) | 24px mark | `text-sm` | `text-sm` |
| `lg`      | 40px         | 16px| 28px mark     | `text-base`| `text-sm`   |

Empty has no interactive states of its own. Actions inside `EmptyContent` keep their own focus, hover, and disabled states. There is no loading, error, or selected state; those belong to the component or region that owns the data.

**Live demo variant:** `Sizes`

## Accessibility

- Empty is static content with no role, live region, or keyboard behavior. When it replaces results after a filter or search, announce the change with the surrounding component's status region rather than adding `aria-live` to every empty state.
- The built-in media mark is decorative and `aria-hidden`. Custom media must carry its own semantics: give an informative image a meaningful `alt`, and keep an accompanying icon `aria-hidden` when the title already states the message.
- `EmptyTitle` renders a `<div>`, not a heading. If assistive-technology users need to navigate to the state in the document outline, pass `role='heading'` and `aria-level` appropriate for the page, or render a real heading element alongside.
- Actions remain in normal tab order. Keep every action reachable by keyboard and visible on focus; do not place essential actions only in hover-revealed UI.
- Copy and icons use semantic theme tokens. The component does not measure contrast; verify text and icon contrast in both supported themes.

**Live demo variant:** `With actions`

## API & examples

Import named parts from `skytrack-ui/empty` (or `@/components/ui/empty` locally):
`Empty`, `EmptyMedia`, `EmptyTitle`, `EmptyDescription`, `EmptyContent`, `emptyVariants`.

| Prop        | Target          | Type                              | Default     |
| ----------- | --------------- | --------------------------------- | ----------- |
| `variant`   | `Empty`         | `'default' \| 'simple'`           | `'default'` |
| `size`      | `Empty`         | `'sm' \| 'default' \| 'lg'`       | `'default'` |
| `className` | All parts       | `string`                          | `undefined` |
| `children`  | `EmptyMedia`    | `React.ReactNode`                 | built-in mark |
| `icon`      | `EmptyMedia`    | `React.ComponentType<{ className?: string }>` | `FolderDashedIcon` |
| `children`  | `EmptyContent`  | `React.ReactNode`                 | `undefined` |

`Empty` and every part accept standard `div` props, so `id`, `role`, `aria-*`, and data attributes pass through. Parts read the root context; used outside `Empty`, they fall back to `variant='default'` and `size='default'`. Use `emptyVariants` only when you need the root's class recipe on another element.

Unlike Ant Design's Empty, there is no `image`, `imageStyle`, or `description` prop: place custom media inside `EmptyMedia`, and write `EmptyDescription` only when a description is needed. This keeps composition explicit and lets each part be styled or omitted independently.

**Live demo variant:** `Simple`

## Evidence and limits

- Package/version checked: `0.1.5`.
- Export: [`package.json`](../../../../../package.json) — `./empty`.
- Source, public declarations, and closest demo: linked above.
- Limits or unverified behavior: the default mark is a single Phosphor `FolderDashedIcon` (overridable via the `icon` prop); richer illustrations must be supplied as `EmptyMedia` children and are not sized by the component. `EmptyTitle` and `EmptyDescription` render `div` elements, so heading semantics remain a consumer decision. The package does not measure theme contrast or announce empty-state transitions.
