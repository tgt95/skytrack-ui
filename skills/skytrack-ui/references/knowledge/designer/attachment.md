# Attachment

> A file item that shows its name, status, preview, and available actions.

- Package version: `0.1.5`
- Public export: `skytrack-ui/attachment`
- Implementation: [`src/components/ui/attachment.tsx`](../../../../../src/components/ui/attachment.tsx)
- Public type declaration: [`dist-lib/components/ui/attachment.d.ts`](../../../../../dist-lib/components/ui/attachment.d.ts)
- Showcase demo id: `attachment`
- Closest demo: [`src/demos/attachment.demo.tsx`](../../../../../src/demos/attachment.demo.tsx)
- Official guidance: [Carbon Design System File Uploader Usage](https://carbondesignsystem.com/components/file-uploader/usage/)

## Usage

Use Attachment to represent individual uploaded files, documents, images, or reports with metadata and contextual actions.

- **Fit:** Displaying uploaded files, monitoring progress, and managing attached documents.
- **Avoid:** The drag-and-drop target itself (use Dropzone), or simple download links.
- **Best alternative:** For the initial file selection area, use Dropzone. For compact format tags, use Badge.

**Live demo variant:** `Default`

## Types

Choose file size and grouping to balance density with the amount of file detail people need.

## Behavior

Set the attachment state to match the file's upload lifecycle:

- **Uploading or processing:** The title pulses. Compose Progress or status text separately when people need more detail.
- **Done:** Compose file metadata and available actions as content; Attachment does not generate them automatically.
- **Error:** The root uses destructive styling. Add a clear failure message and a retry action when retry is supported.

| Do                                                                                      | Don't                                                                                   | Why                                                                                                                  |
| --------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| Provide explicit error messaging and a retry button directly on items that fail upload. | Leave a failed file card stuck indefinitely with only a red outline and no explanation. | Clear error feedback allows users to immediately replace or re-attempt uploads without aborting the entire workflow. |

**Live demo variant:** `Upload states`

## Layout

Place attachment items beneath file dropzones or inside inspection cards.

- **Grouping:** Keep related files together with 8–12px between items.
- **Mobile viewports:** Cards stretch to full width; thumbnails remain fixed while action buttons retain 44px tap targets.

**Live demo variant:** `Group`

## Accessibility

Give icon-only actions clear names. Show upload progress and outcomes in text as well as color, and announce completion or failure.

**Live demo variant:** `Upload states`

## Content

Keep file names recognizable when space is limited; preserve enough of the name and extension to distinguish similar files.

- **Metadata:** Show relevant details such as file size and date in a visually secondary style.

**Live demo variant:** `Default`
