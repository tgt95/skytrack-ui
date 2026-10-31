# Avatar

> A high-quality, unstyled React avatar component that is easy to customize.

- Package version: `0.1.5`
- Public export: `skytrack-ui/avatar`
- Implementation: [`src/components/ui/avatar.tsx`](../src/components/ui/avatar.tsx)
- Public type declaration: [`dist-lib/components/ui/avatar.d.ts`](../dist-lib/components/ui/avatar.d.ts)
- Showcase demo id: `avatar`
- Closest demo: [`src/demos/avatar.demo.tsx`](../src/demos/avatar.demo.tsx)

## Overview

The Avatar component represents a user, pilot, or drone asset with an image, initials, or fallback icon. It handles loading delays, missing images, and network errors gracefully by displaying an accessible fallback surface without layout shifts.

Avatars are commonly used in mission collaboration lists, fleet operator rosters, account menus, and timeline audit logs.

**Live demo variant:** `Image and fallback`

```tsx
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'

export function AvatarExample() {
  return (
    <Avatar className='size-10'>
      <AvatarImage
        src='https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=96&h=96&fit=crop'
        alt='Sarah Connor'
      />
      <AvatarFallback>SC</AvatarFallback>
    </Avatar>
  )
}
```

## Usage

Use Avatar whenever identifying a person, autonomous drone unit, or organizational team within headers, comment feeds, tables, or cards.

Do not use Avatar for general photographic content, product thumbnails, or icons that do not represent an identity (use standard image elements or icon wrappers). Always provide a 2-character initials string or generic icon fallback so missing or delayed network images do not render blank gaps.

**Live demo variant:** `Sizes`

## Anatomy

Render in strict nested order:

1. `Avatar`: Outer circular boundary (`data-slot='avatar'`), providing overflow clipping, rounded shape (`rounded-full`), and background tinting.
2. `AvatarImage`: Image element (`data-slot='avatar-image'`) with aspect-square object fitting.
3. `AvatarFallback`: Fallback container (`data-slot='avatar-fallback'`) styled with `bg-muted` and `text-muted-foreground` that renders when the image is absent, loading, or fails to load.

**Live demo variant:** `Image and fallback`

## Variants & states

The `size` prop provides built-in sizing tokens:

- `xs`: 24px (`size-6`) container with fallback typography `text-[10px]`.
- `sm`: 32px (`size-8`) container with fallback typography `text-xs`.
- `default` (default): 36px (`size-9`) container with standard typography `text-sm`.
- `lg`: 40px (`size-10`) container with fallback typography `text-base`.

Custom sizing or non-standard dimensions can also be applied via utility classes (e.g. `size-12`, `size-16`).

Component states:

- Loading: Shows `AvatarFallback` until the image resource finishes downloading.
- Loaded: Fades in `AvatarImage` and unmounts or hides fallback content.
- Error: Displays `AvatarFallback` indefinitely if image resolution fails.
- Fallback content: Supports 1-2 character initials, pilot callsigns, or SVG icons.

**Live demo variant:** `Sizes`

## Accessibility

Built upon `@base-ui/react/avatar`:

- `AvatarImage` requires an informative `alt` attribute naming the individual or asset.
- When `Avatar` is purely decorative beside visible text (e.g. an operator name label), set `alt=''` or apply `aria-hidden='true'` to prevent duplicate screen reader announcements.
- `AvatarFallback` text is accessible to assistive technology when the image is unavailable.

**Live demo variant:** `Image and fallback`

## API & examples

Import named parts from `skytrack-ui/avatar` (or `@/components/ui/avatar` locally): `Avatar`, `AvatarImage`, `AvatarFallback`.

| Part / Prop | Target           | Type                                | Default     | Description                                             |
| ----------- | ---------------- | ----------------------------------- | ----------- | ------------------------------------------------------- |
| `size`      | `Avatar`         | `'xs' \| 'sm' \| 'default' \| 'lg'` | `'default'` | Built-in size scaling container and fallback typography |
| `className` | All parts        | `string`                            | `undefined` | Custom styling overrides                                |
| `delay`     | `AvatarFallback` | `number`                            | `undefined` | Delay in ms before rendering fallback                   |

Theme tokens: Uses `--muted` and `--muted-foreground` for fallback backgrounds and glyphs.

**Live demo variant:** `Sizes`

## Evidence and limits

- Package/version checked: `0.1.5`.
- Export: [`package.json`](../package.json) — `./avatar`.
- Source, public declarations, and closest demo: linked above.
- Limits or unverified behavior: None found in inspected source. Built-in sizes (`xs`, `sm`, `default`, `lg`) are supported via the `size` prop; arbitrary dimensions can be supplied via `className`.
