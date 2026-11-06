# Dropzone

> A file selection area that supports dropping files or opening a file picker.

- Package version: `0.1.5`
- Public export: `skytrack-ui/dropzone`
- Implementation: [`src/components/ui/dropzone.tsx`](../../../../../src/components/ui/dropzone.tsx)
- Public type declaration: [`dist-lib/components/ui/dropzone.d.ts`](../../../../../dist-lib/components/ui/dropzone.d.ts)
- Showcase demo id: `dropzone`
- Closest demo: [`src/demos/dropzone.demo.tsx`](../../../../../src/demos/dropzone.demo.tsx)
- Official guidance: [Carbon Design System File Uploader Usage](https://carbondesignsystem.com/components/file-uploader/usage/)

## Usage

Use Dropzone when people need to add files from their device, especially when dragging files is a useful shortcut.

- **Fit:** Interactive drag-and-drop file ingestion areas paired with fallback file browser buttons.
- **Avoid:** Representing individual uploaded files that are already received (use Attachment).
- **Best alternative:** For displaying uploaded files after selection, use Attachment.

**Live demo variant:** `Default`

## Types

Choose single-file or multi-file intake based on the task and make selected files reviewable before upload.

## Behavior

Dragging files over the dropzone activates high-contrast border and background highlight tokens.

- **Drop behavior:** Check file type and size as soon as people choose or drop files.
- **Error handling:** Incompatible file types or files exceeding size limits immediately display clear validation error messages.

| Do                                                                                       | Don't                                                                                  | Why                                                                              |
| ---------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| Explain file type and size limits before upload and identify rejected files immediately. | Accept incompatible files silently and report the problem only after the upload fails. | Immediate feedback helps people understand what to fix and avoids wasted effort. |

**Live demo variant:** `Upload failure (field error)`

## Layout

Give the drop area enough width to display file requirements and the main selection action clearly.

- **Internal spacing:** Leave enough space around the instruction and selection action so the drop area is easy to recognize.
- **Selected files:** Show chosen files in a list directly below the drop area.
- **Mobile viewports:** Provide a prominent “Browse files” button since drag-and-drop is rarely supported on mobile touch screens.

**Live demo variant:** `Selected files`

## Accessibility

Support file selection by keyboard as well as drag and drop. Explain rejected files and show drag state with cues beyond color.

**Live demo variant:** `Disabled`

## Content

Provide explicit instructions on supported formats and maximum file sizes (e.g., "Drop CSV, PDF, or image files here, or choose files. Maximum size: 50 MB.").

- **Button label:** Use a direct action label (e.g., “Choose files”).
- **Error copy:** State exact rejection causes clearly (e.g., "File 'report.exe' is not supported. Choose a CSV or PDF file.").

**Live demo variant:** `Upload success (center toast)`
