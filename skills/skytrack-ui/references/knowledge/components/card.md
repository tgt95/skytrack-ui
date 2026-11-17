# Card

> A reusable content surface with a consistent heading row, optional toolbar, and size-based padding.

- Public export: `skytrack-ui/card`
- Implementation: [`src/components/ui/card.tsx`](../../../../../src/components/ui/card.tsx)
- Showcase demo id: `card`
- Closest demo: [`src/demos/card.demo.tsx`](../../../../../src/demos/card.demo.tsx)

## Overview

Use Card to group a distinct content module, state, or independent action. Keep related content in one card; use semantic headings or fieldsets for groups that do not need a separate surface. Nested surfaces should use the package's semantic surface tokens.

## Anatomy

```text
<Card>
├─ <CardHeader>
│  ├─ <CardHeading>
│  │  ├─ <CardTitle />
│  │  └─ <CardToolbar />?
│  └─ <CardDescription />?
├─ <CardContent />
└─ <CardFooter />?
```

`Card` renders a semantic `<section>` by default and accepts `as="div" | "section" | "article"`. Add `aria-labelledby` pointing to `CardTitle` when the section needs a programmatic name. `CardTitle` defaults to `<h2>` and supports `as="h1"` through `as="h6"` to match the document outline.

`CardHeading` is a fixed 40px row with the title on the left and optional toolbar on the right. `CardDescription` sits below that row and clamps visually to one line. Use the full text in the DOM; do not rely on truncation to convey required information. `CardToolbar` keeps controls on one row and scrolls horizontally when needed. In an `lg` Card, descriptions use `text-base` and toolbar buttons render 40px high; `sm` and `md` descriptions use `text-sm`.

## Sizes

| `size`         | Padding | Description | Toolbar button height |
| -------------- | ------: | ----------- | --------------------: |
| `sm`           |    12px | `text-sm`   |                  32px |
| `md` (default) |    16px | `text-sm`   |                  32px |
| `lg`           |    24px | `text-base` |                  40px |

Size controls Card padding, description type size, and toolbar button height. The title/toolbar row stays 40px; the header description follows below it.

## API

- `Card`: native section props, `className`, `size` (`sm | md | lg`), and `as` (`div | section | article`; default `section`).
- `CardHeader`, `CardHeading`, `CardDescription`, `CardToolbar`, `CardContent`, `CardFooter`: native props for their rendered HTML element and `className`.
- `CardTitle`: native heading props, `className`, and `as` (`h1` through `h6`; default `h2`).

Import the named parts from `skytrack-ui/card` or `@/components/ui/card`.

## Accessibility

- Set `aria-labelledby` on Card and point it to the title ID when the Card represents a named section.
- Choose the heading level from the surrounding page outline; the default `h2` is only a default.
- `CardToolbar` is a named group. Give it an accessible name when its actions need context, for example `aria-label="Mission actions"`.
- Keep actions keyboard-operable and preserve visible focus styles from their child controls.

## Example

```tsx
import { Button } from 'skytrack-ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardHeading, CardTitle, CardToolbar } from 'skytrack-ui/card'

;<Card size='md' aria-labelledby='mission-title'>
  <CardHeader>
    <CardHeading>
      <CardTitle id='mission-title'>Mission result</CardTitle>
      <CardToolbar aria-label='Mission actions'>
        <Button size='sm' variant='outline'>
          Export
        </Button>
      </CardToolbar>
    </CardHeading>
    <CardDescription>Latest completed mission summary</CardDescription>
  </CardHeader>
  <CardContent>{/* content */}</CardContent>
</Card>
```
