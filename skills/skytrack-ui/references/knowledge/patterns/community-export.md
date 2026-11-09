# Export

> Saving a resource externally, with an option to change its format; downloading preserves the format.

- Pattern ID: `community-export`
- Catalog group: Community
- Source status: **Community maintained**
- Primary source: [maintained reference](../../../../../docs/carbon-ds-reference/community/patterns/export-pattern/index.md)
- Catalog entry: [catalog.ts](../../../../../src/showcase/pattern-library/catalog.ts)
- Page copy, source citations, and demo map: [page-content.ts](../../../../../src/showcase/pattern-library/page-content.ts)
- Local interaction implementation: [demos.tsx](../../../../../src/showcase/pattern-library/demos.tsx)

## Decision summary

**Use when:** Use Export when a user needs an external copy in a different format; use Download when moving a remote resource to the user’s device without changing its format.

**User outcome:** A useful default keeps routine exports quick, while meaningful format choices and completion remain clear.

### Design decisions

- Provide a sensible default name and let users edit it when naming matters.
- Name the destination and resulting format before starting work so people know where the exported copy will go.
- Offer format or destination choices only when the task needs them.
- Present 2–5 mutually exclusive formats with a preselected default and concise guidance for each option.
- In a dialog, focus the first required field when input is needed; when defaults are ready, make Export the initial focus.
- Show progress, success, and error feedback without suggesting a file was saved before it was.

### SkyTrack UI implementation route

- Use the RadioGroup for 2–5 mutually exclusive format choices and show concise guidance beside each option.
- Use a dialog for required name/format choices and show extension validation before preparing the export.
- Explain that the browser handles save location for downloads; do not imitate a system picker with in-page buttons.
- Do not claim to create or download a file in this example.
- Keep format conversion distinct from an unchanged download.

**Candidate components:** `Dialog`, `Field`, `Input`, `Fieldset`, `RadioGroup`, `RadioRoot`, `Button`, `Progress`, `Toast`. Verify each API against [component routing](../COMPONENT_ROUTING.md) and installed source.

> **Local example limit:** Community pattern; export and download are distinct actions in the local reference.

## Source limits

- Export and Download share most rules in the community reference, with explicit exceptions for hidden extensions on Download and native browser save-location handoff.

## Guidance reference

### Intuitive default name

When a resource already carries an intuitive default file name and the user does not need to select an export format or save destination, start the export or download immediately upon clicking the button with no intermediate dialog.

**Examples:** `export-intuitive-download`.

### Editable name

When users may rename the file before exporting or downloading, open a dialog with a textbox pre-populated with the default name. Hide the file extension when downloading unchanged files; when exporting, validate that the edited name retains a valid extension and show an active "Exporting..." loading indicator while the file prepares.

**Examples:** `export-customize`.

### Optional extras

#### Specify the export or download location

When users can specify where a downloaded file goes, activating the primary Download control invokes the browser’s native save-location dialog; the transfer begins once they choose a folder and confirm Save.

#### Choosing export format

When two to five export formats are available, present them as a radio-button group with a sensible default pre-selected and concise guidance explaining when each format fits best.

#### Passive success modal

Optionally present a passive success modal once an export finishes cleanly.

**Examples:** `export-confirm-completion`.

#### Errors and failures

If an export or server operation fails, report the error clearly inside the modal rather than silently closing or implying success.

**Examples:** `export-progress-and-error`.

#### Success notification

Optionally trigger a brief toast notification to confirm that the export completed.

### Accessibility

Follow standard modal keyboard and focus-management guarantees across triggers, configuration forms, and passive status dialogs:

#### Trigger

1. Navigate to the Export button with Tab (or move across overflow menu items using Up and Down arrows).
2. Ensure the button or menu item receives visible focus.
3. Press Enter to open the Export modal.

#### Focus

Initial modal focus and subsequent Tab order depend on whether the user must supply input before running:

##### If the user must complete fields first

1. Open focus lands on the first input field accepting user entry.
2. Tab advances through any additional input controls.
3. Tab moves to Export.
4. Tab moves to Cancel.

##### If a sensible default value is provided

1. Open focus lands directly on the Export button.
2. Tab moves to Cancel.
3. Tab enters the first editable input (following standard radio or text-input keyboard controls).
4. Tab continues through any remaining inputs.

#### Success & Failure modals

When opening a passive modal to announce export completion or failure, apply initial keyboard focus directly to the modal’s close (×) button.

## Interactive and visual examples

### Download a standard report with its intuitive name

- Example ID: `export-intuitive-download`
- Type: **Interactive**
- Source mapping: mapped — `intuitive-default-name`
- Scenario: When the user needs the default report and no format or destination choice, offer a direct download action without an extra form.
- What it teaches: Direct download transfers an unchanged resource immediately when a sensible name already exists.
- Decision shown: Skip dialogs whenever no filename edits, format switches, or destination inputs are needed; keep Download distinct from format-converting Export.
- Consider: Never claim a file was saved or downloaded until the transfer actually occurs.

### Customize a report before export

- Example ID: `export-customize`
- Type: **Interactive**
- Source mapping: partial-divergent — `editable-name`
- Scenario: When users can change the filename, format, or destination, show a focused configuration flow with a sensible default.
- What it teaches: An export dialog collects filename edits, format choices, or destination handoffs only when the task requires them.
- Decision shown: Validate that the edited filename extension matches the selected format, offer concise use-case guidance for CSV/JSON/GeoJSON radio choices, and explain that the browser Save dialog handles location for real downloads.
- Consider: Sensible defaults put initial focus on Prepare export, followed by Cancel and the editable fields. This preview does not invoke a native save dialog or create a file.
- Boundary or simplification: The local Dialog validates the required name/format and previews preparation, but does not export a real resource or invoke the system save-location picker.

### Track preparation and recover from an export failure

- Example ID: `export-progress-and-error`
- Type: **Interactive**
- Source mapping: partial-divergent — `errors-and-failures`
- Scenario: Show progress only while preparation runs, then communicate completion or a recoverable destination error.
- What it teaches: Operators need live preparation feedback while generating a file and explicit error reporting if preparation fails.
- Decision shown: Show an active loading state while running and surface export failures inside the modal (offering recovery or retry where feasible).
- Consider: Use indeterminate spinners unless real measurable step progress exists, and never present failed exports as ready.
- Boundary or simplification: Live demo uses an indeterminate Progress only while preparation is active. The simulated failure appears in a Dialog with initial focus on its close control; Retry restarts only the local preparation preview.

### Confirm export completion without implying a download

- Example ID: `export-confirm-completion`
- Type: **Interactive**
- Source mapping: partial-divergent — `passive-success-modal`
- Scenario: After a successful export, show a passive completion message and a separate brief notification; make the local-only result explicit.
- What it teaches: Passive completion modals and optional notifications confirm that preparation finished without overstating a file save.
- Decision shown: Pair completion with a passive success modal (opening focus onto its close icon) and/or a brief toast notification once the output is genuinely ready.
- Consider: Distinguish prepared output from local disk download when running sample previews.
- Boundary or simplification: The preview opens a passive success Dialog with initial focus on its close control; a separate action previews the optional Toast. Neither action creates or saves a file.

## Maintenance rule

Treat the catalog as the source for status, summary, component shortlist, and design decisions. Treat page content as the source for section guidance and demo teaching. Treat the rendered demo as evidence only for the behavior it visibly implements. Update this guide and [pattern routing](../PATTERN_ROUTING.md) when the pattern changes. Never treat local examples as production services or operational policy.
