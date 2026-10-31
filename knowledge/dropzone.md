# Dropzone

> Choose files with the button or drag them into the drop area.

- Package version: `0.1.5`
- Public export: `skytrack-ui/dropzone`
- Implementation: [`src/components/ui/dropzone.tsx`](../src/components/ui/dropzone.tsx)
- Public type declaration: [`dist-lib/components/ui/dropzone.d.ts`](../dist-lib/components/ui/dropzone.d.ts) (matches source version `0.1.5`)
- Showcase demo id: `dropzone`
- Closest demo: [`src/demos/dropzone.demo.tsx`](../src/demos/dropzone.demo.tsx)

## Overview

The Dropzone component provides a stylized drag-and-drop file target integrated with a fallback native file picker button. It manages drag enter/leave state transitions, handles file filtering via `accept` attributes, and dispatches normalized file arrays to consumers.

**Live demo variant:** `Default`

```tsx
import { Dropzone } from '@/components/ui/dropzone'

export function DropzoneDemo() {
  return (
    <Dropzone
      accept='image/*,.pdf'
      multiple={false}
      hint='Choose an image or PDF, or drag it here to upload.'
      buttonLabel='Select file'
      className='w-full max-w-md'
      onFilesSelected={(files) => {
        console.log('Selected files:', files)
      }}
    />
  )
}
```

## Usage

Use Dropzone when users need to upload one or more files from disk by either dragging them into the browser window or selecting them from the system file picker dialog. Once files are accepted, pair Dropzone with `Attachment` cards to display upload progress, file sizes, or deletion triggers. Avoid using Dropzone for simple inline avatar uploads where a small button or clickable avatar suffices.

**Live demo variant:** `Multiple files`

## Anatomy

Dropzone encapsulates drag-and-drop interaction within a unified container:

1. `div[data-slot='dropzone']` (Dashed border drop area with drag and hover visual cues)
2. `UploadSimpleIcon` (Visual icon cue from Phosphor Icons)
3. Prompt text and hint message (Referenced by `aria-describedby`)
4. Native `Button` trigger (Invokes hidden `<input type='file'>`)
5. Hidden HTML `<input type='file'>` (Accessible to keyboard and native file browsers)

**Live demo variant:** `Default`

## Variants & states

Supported states and props:

- `data-dragging`: Applied when active dragover events occur over the target surface, transitioning to accent borders and background tints.
- `multiple`: Boolean determining whether single or multiple files can be selected or dropped.
- `disabled`: Disables file inputs, prevents drag-over visual activations, and applies `opacity-50 pointer-events-none`.
- `buttonLabel` and `hint`: Configurable text prompts for instructions and supported formats.

**Live demo variant:** `Disabled`

## Accessibility

Renders with `role='group'` and `aria-label='File upload'`. The descriptive hint text is linked via `aria-describedby`. The hidden `<input type='file'>` maintains proper tab sequence via the visible `Button` trigger, ensuring full keyboard operation (`Enter` and `Space` activate the system file browser dialog).

**Live demo variant:** `Upload failure (field error)`

## API & examples

Import `Dropzone` and type `DropzoneProps` from `skytrack-ui/dropzone` or `@/components/ui/dropzone`. Primary props: `accept`, `multiple`, `disabled`, `hint`, `buttonLabel`, and `onFilesSelected: (files: File[]) => void`.

**Live demo variant:** `Selected files`

## Evidence and limits

- Package/version checked: `0.1.5`.
- Export: [`package.json`](../package.json) — `./dropzone`.
- Source, public declarations, and closest demo: linked above.
- Limits or unverified behavior: Dropzone does not execute network uploads; it receives `File` objects from drag events or native file dialogs and forwards them to `onFilesSelected`.
