# Attachment

> Show a file or image with metadata, upload state, and actions.

- Package version: `0.1.5`
- Public export: `skytrack-ui/attachment`
- Implementation: [`src/components/ui/attachment.tsx`](../../../../src/components/ui/attachment.tsx)
- Public type declaration: [`dist-lib/components/ui/attachment.d.ts`](../../../../dist-lib/components/ui/attachment.d.ts) (matches source version `0.1.5`)
- Showcase demo id: `attachment`
- Closest demo: [`src/demos/attachment.demo.tsx`](../../../../src/demos/attachment.demo.tsx)

## Overview

The Attachment component displays an uploaded file or media asset with its metadata, lifecycle state, and contextual actions. It represents file tokens inside forms, message threads, or document management panels, providing immediate feedback during upload, processing, completion, or transfer failures.

**Live demo variant:** `Default`

```tsx
import { FileIcon, XIcon } from '@phosphor-icons/react'
import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentMedia,
  AttachmentTitle
} from '@/components/ui/attachment'

export function AttachmentDemo() {
  return (
    <Attachment state='done' size='default' orientation='horizontal'>
      <AttachmentMedia variant='icon'>
        <FileIcon />
      </AttachmentMedia>
      <AttachmentContent>
        <AttachmentTitle>flight-manifest.pdf</AttachmentTitle>
        <AttachmentDescription>PDF · 1.8 MB</AttachmentDescription>
      </AttachmentContent>
      <AttachmentActions>
        <AttachmentAction aria-label='Remove file'>
          <XIcon />
        </AttachmentAction>
      </AttachmentActions>
    </Attachment>
  )
}
```

## Usage

Use Attachment when displaying individual uploaded files, preview cards for attachments, or pending uploads within a form or chat stream. Do not use Attachment as an interactive drop target or file browser dialog; pair it with Dropzone or a file input instead. For raw images without file metadata or actions, use an image container or Avatar rather than Attachment. Avoid placing destructive actions in Attachment without an explicit confirmation or undo mechanism.

**Live demo variant:** `Default`

## Anatomy

Attachment consists of the following exported elements in render order:

1. `Attachment` (Root container providing context, state, size, and layout styling)
2. `AttachmentTrigger` (Optional full-surface button overlay for interactive attachment opening)
3. `AttachmentMedia` (Media thumbnail wrapper, supporting icon or image variants)
4. `AttachmentContent` (Flexible column holding title and description metadata)
5. `AttachmentTitle` (Filename or primary label, automatically pulses during upload/processing)
6. `AttachmentDescription` (Auxiliary metadata such as file size, format, or error details)
7. `AttachmentActions` (Container holding secondary action buttons)
8. `AttachmentAction` (Icon button trigger based on Button with ghost styling)
9. `AttachmentGroup` (Optional horizontal scrollable container with snap points for multiple items)

The smallest valid composition requires `Attachment`, `AttachmentContent`, and `AttachmentTitle`.

**Live demo variant:** `Default`

## Variants & states

Supported variants include:

- `size`: `default` (min-h-16, padding 12px), `sm` (min-h-14, padding 10px), and `xs` (min-h-11, padding 8px).
- `orientation`: `horizontal` (row layout) and `vertical` (column layout).
- `state`: `idle` (neutral border), `uploading` (accent border with pulsating title), `processing` (accent border with pulsating title), `error` (destructive border and red text), and `done` (neutral border).
- `AttachmentMedia.variant`: `icon` (fixed square with centered icon) or `image` (aspect-square with cover image fit).

**Live demo variant:** `Upload states`

## Accessibility

Attachment renders native semantic HTML elements (`div`, `p`, and `button`). When interactive, `AttachmentTrigger` or `AttachmentAction` components must include an explicit `aria-label` or accessible name. Action buttons are kept outside the click path of `AttachmentTrigger` via z-index layering (`z-20` over `z-0`). In error states, the error text is exposed within `AttachmentDescription`; parent forms should link the attachment list via `aria-describedby` when reporting validation errors.

**Live demo variant:** `Default`

## API & examples

Import components directly from `skytrack-ui/attachment` or the internal alias `@/components/ui/attachment`. The primary root props are `size`, `orientation`, and `state`. The title and description components inherit context to automatically adjust font sizes and apply error styles without redundant prop drilling. Multiple attachments can be rendered sequentially or wrapped in `AttachmentGroup` for mobile-friendly horizontal swipe strips.

**Live demo variant:** `Sizes`

## Evidence and limits

- Package/version checked: `0.1.5`.
- Export: [`package.json`](../../../../package.json) — `./attachment`.
- Source, public declarations, and closest demo: linked above.
- Limits or unverified behavior: Attachment does not perform file uploads or network requests internally; upload progress percentages and cancellation aborts must be orchestrated by the consuming application.
