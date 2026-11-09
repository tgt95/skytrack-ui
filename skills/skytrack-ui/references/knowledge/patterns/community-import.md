# Import

> Transferring data or objects from an external source into a system.

- Pattern ID: `community-import`
- Catalog group: Community
- Source status: **Community maintained**
- Primary source: [maintained reference](../../../../../docs/carbon-ds-reference/community/patterns/import-pattern/index.md)
- Catalog entry: [catalog.ts](../../../../../src/showcase/pattern-library/catalog.ts)
- Page copy, source citations, and demo map: [page-content.ts](../../../../../src/showcase/pattern-library/page-content.ts)
- Local interaction implementation: [demos.tsx](../../../../../src/showcase/pattern-library/demos.tsx)

## Decision summary

**Use when:** Use import when users bring in a file or supported remote source; select modal, side panel, or full-page flow by complexity.

**User outcome:** People can check a source and correct file problems before data is transferred.

### Design decisions

- Explain accepted formats, file count, and limits before file selection.
- Keep selected files visible and report validation errors at the field.
- Define duplicate handling for the product before import; the available example leaves conflict policy open.
- Make focus and keyboard behavior clear before and after selection.

### SkyTrack UI implementation route

- Compose Field, Dropzone, and Attachment for a local file-selection example.
- Keep selected File objects in component memory; do not upload or send them.
- Show invalid selections with FieldError and successful sample state with a clear status.

**Candidate components:** `Field`, `Dropzone`, `Attachment`. Verify each API against [component routing](../COMPONENT_ROUTING.md) and installed source.

> **Local example limit:** Community pattern; the example illustrates a supported file-selection flow.

## Source limits

- Duplicate-file handling, conflict resolution, and byte-size limits are unspecified in the maintained community reference and must be defined at the product level.

## Guidance reference

### Choose a file (modal)

Use an import modal only when uploading a single file that needs no follow-up actions. Offer both drag-and-drop and local file browsing, plus optional external-resource URL entry when supported. Whenever multiple files can be added or extra tasks such as entering metadata are required, do not use a modal—move to a side panel or full page instead.

**Examples:** `import-single-file-modal`.

#### Import from a URL (modal)

When your product supports remote source imports inside a single-file modal, include a URL field alongside the file uploader.

### Choose a file (full page or side-panel)

In full-page and side-panel flows, provide drag-and-drop and local file browsing restricted to supported file types, displaying clear loading and loaded states as items arrive. Perform extra actions—such as adding metadata or destination details—separately from file upload and before the import completes, either in a subsequent step or in a distinct on-screen section when space allows.

**Examples:** `import-multiple-files-or-url`, `import-metadata-side-panel`.

#### Import from a URL (full page or side-panel)

Provide URL import controls inside the full-page or side-panel layout whenever remote source imports are supported.

### Accessibility

Keyboard navigation and focus return behavior differ significantly depending on whether an operator imports one file or multiple files:

#### Single file uploads and imports

Applies to any single-file upload or import interaction, typically presented inside a modal:

##### Trigger

1. Move to the Import trigger via Tab (or Up/Down arrows inside an overflow menu).
2. Confirm visible focus on the trigger.
3. Press Enter to launch the import flow.

##### Focus

1. On opening, focus lands on the drag-and-drop uploader area.
2. Tab moves to the URL input field if present; pressing Return in the URL field (or tabbing to Add file and pressing Return) imports the URL with optional loading feedback.
3. Tab moves to the primary button (Import, Save, or Next) only once enabled—keep the Import button disabled until a file is chosen.
4. Tab moves to Cancel.

##### Once the file is selected

1. Move focus automatically to the remove icon on the chosen file; pressing Return clears the file and restores the empty state.
2. Tab moves to the now-enabled Import button.
3. Tab moves to Cancel.

#### Multiple file uploads and imports

> **dont:** Never use a modal when multiple files may be selected.

##### Focus

1. First Tab into the import section lands on the file uploader.
2. Next Tab moves to the optional URL input field.
3. Return activates the chosen input method; pressing Return inside the URL input (or on Add file) fetches with optional loading state.

##### When (some) files are selected

- Return focus to whichever selection method was just used (for example, keep focus in the URL field so another URL can be added right away).
- If the file uploader was used, Tab moves next to the URL field.
- Subsequent Tab presses walk through the remove icon of each selected file.

##### On reaching the maximum number of added files

1. Disable both the file uploader and URL selection controls once the maximum allowed file count is reached.
2. Place returning focus onto the uploaded files’ remove actions.
3. Let Tab advance through each file’s remove icon and onward to the next page section.

## Interactive and visual examples

### Choose multiple mission files or a source URL

- Example ID: `import-multiple-files-or-url`
- Type: **Interactive**
- Source mapping: partial-divergent — `choose-file-full-or-panel`
- Scenario: A full-page or side-panel workflow can accept several supported JSON or GeoJSON files and show validation or selection status.
- What it teaches: Multi-file imports use a full page or side panel—never a modal—and restrict selection to supported file types.
- Decision shown: Use side-panel or full-page flows whenever users can add multiple files or optional remote URLs; disable upload and URL inputs once the maximum file cap is reached.
- Consider: Show loading and loaded states, let Tab walk each file’s remove action, and define duplicate-file conflict policy in your product because the community reference leaves it open.
- Boundary or simplification: Divergences in `demos.tsx:3844-3942`: (1) `Attachment` items lack remove buttons; (2) URL input has no `Return`/`Enter` submit shortcut; (3) no file-count cap disables selection controls; (4) no transient file loading state is shown.

### Import one file or URL in a focused modal

- Example ID: `import-single-file-modal`
- Type: **Interactive**
- Source mapping: partial-divergent — `choose-file-modal`
- Scenario: For one item with no extra metadata, choose a local file or a URL; keep Import disabled until the chosen source is valid.
- What it teaches: A compact modal fits only single-file imports that require zero extra metadata or follow-up steps.
- Decision shown: Keep the primary Import action disabled until a valid file or URL is selected; open focus onto the dropzone, support Return inside the URL input, and move focus to the file’s remove control once selected.
- Consider: Move immediately to a side panel or full page if requirements grow to multiple files or metadata.
- Boundary or simplification: Live demo (`demos.tsx:3944-4049`) properly disables "Import file" until selection, but omits a remove button on the chosen file, `Enter` submit in the URL input, and automatic initial/selected focus transitions.

### Add metadata in a side panel after file selection

- Example ID: `import-metadata-side-panel`
- Type: **Interactive**
- Source mapping: mapped — `choose-file-full-or-panel`
- Scenario: When an import needs a name or destination, keep the selection step distinct and collect the extra information in a side panel.
- What it teaches: Additional import actions such as naming or assigning metadata stay distinct from file selection and finish before import runs.
- Decision shown: Use a side panel or full page whenever metadata is needed, placing those inputs in a follow-up step or separate panel section before final import.
- Consider: Define duplicate and conflict handling at the product level before shipping.
- Boundary or simplification: Live demo (`demos.tsx:4051-4081`) illustrates the separate post-selection metadata Drawer cleanly; product duplicate-conflict handling remains intentionally unspecified per source.

## Maintenance rule

Treat the catalog as the source for status, summary, component shortlist, and design decisions. Treat page content as the source for section guidance and demo teaching. Treat the rendered demo as evidence only for the behavior it visibly implements. Update this guide and [pattern routing](../PATTERN_ROUTING.md) when the pattern changes. Never treat local examples as production services or operational policy.
