# Text toolbars

> A compact set of actions for editing text, searching, attaching files, or embedding links.

- Pattern ID: `text-toolbars`
- Catalog group: Core
- Source status: **Universal**
- Primary source: [maintained reference](../../../../../docs/carbon-ds-reference/patterns/text-toolbar-pattern/index.md)
- Catalog entry: [catalog.ts](../../../../../src/showcase/pattern-library/catalog.ts)
- Page copy, source citations, and demo map: [page-content.ts](../../../../../src/showcase/pattern-library/page-content.ts)
- Local interaction implementation: [demos.tsx](../../../../../src/showcase/pattern-library/demos.tsx)

## Decision summary

**Use when:** Use a text toolbar when actions apply to the current text or selection and should remain close to it.

**User outcome:** Actions stay close to the text they change, which reduces context switching during editing.

### Design decisions

- Keep actions relevant, grouped, and responsive; move lower-priority actions into an overflow menu.
- Provide accessible labels or tooltips for icon-only actions and support keyboard navigation.
- Include text search only when people need to find wording in the current document.

### SkyTrack UI implementation route

- Use Toolbar with ToggleGroup and Toggle for related formatting states.
- Keep controls keyboard-operable and labels discoverable.
- Treat this demonstration as a local formatting example, not a rich-text editor.

**Candidate components:** `Toolbar`, `ToggleGroup`, `Toggle`, `Menu`. Verify each API against [component routing](../COMPONENT_ROUTING.md) and installed source.

## Source limits

- Experimental component warning in source: the maintained reference explicitly notes that the in-editor keyword search interaction shown in Text toolbars is NOT currently ready for production use.

## Source notes

- Upstream ## Resources precedes ## Overview at line 32 and points solely to an external design kit link; excluded cleanly in normalization.

## Guidance reference

### Overview

Place a cohesive horizontal action bar directly above an editable text area whenever authors format briefs, embed links, or attach supporting documents—trimming away unused tools to keep workspaces focused.

### Anatomy

Customize your toolbar from six functional control groups paired directly with the editor body below:

1. Edit actions: Undo, Redo, Cut, Copy, and Paste.
2. Text formatting: Typeface selector, Type size selector, Bold, Italic, Underline, and Text color menu.
3. Paragraph structure: Alignment options, Bulleted, Checked, and Numbered lists, plus Indent more/less.
4. Attachments and links: File attachment trigger and inline Link embedding tool.
5. In-editor Search (optional, non-production experimental reference concept).
6. Connected editable text area immediately beneath the bar.

### When to use

Use a text toolbar for structured briefs, operational notes, comments, or message composers that genuinely require inline formatting or embedded assets; use plain text areas when unformatted notes suffice.

### Behaviors

#### Control states

Every toolbar icon control communicates five clear interactive states—enabled, hover, focus, active/pressed, and disabled—paired with dropdown pickers for font/size and compact popup menus for color or alignment options.

#### Attach files

Trigger file picking from the toolbar attachment action and anchor attached file chips directly inside the lower-left footer area of the editable text container itself with an inline close (×) button to detach.

#### Embed links

Activating the toolbar Link button opens an inline URL popover where typing or confirming embeds the target link cleanly; close via its close icon or clicking outside. Selecting or highlighting existing linked text reopens that URL popover so authors can inspect, revise, or remove the link in place.

#### In-editor search (non-production)

**Status:** Preview.

> **Source limit:** Source warning: in-editor keyword search is explicitly documented as NOT production-ready in the maintained reference; treat any in-editor find bar as an experimental pattern concept.

When toggled from the bar, searches substrings solely within the current text document, highlights matching occurrences inside the editor body, displays current hit totals inside a clearable tag/pill with × inside the search field, and exits cleanly via close icon or clicking outside.

**Examples:** `text-toolbars-find-in-context`.

#### Responsiveness across breakpoints

| Viewport tier     | Toolbar layout adaptation                                                                  |
| ----------------- | ------------------------------------------------------------------------------------------ |
| Extra large / Max | All enabled controls render on a single row; search field expands as horizontal room grows |
| Large (lg)        | Search shrinks to an icon toggle or secondary actions tuck into an overflow menu           |
| Medium (md)       | Toolbar cleanly wraps into two organized horizontal control rows                           |
| Small (sm)        | Compact two-row wrap paired with an overflow menu gathering lower-priority actions         |

#### Overflow menu containment

Spill lower-frequency actions smoothly into a single Overflow menu button at narrow widths rather than duplicating full buttons in extra rows beneath the toolbar.

#### Saving and draft persistence

Support either an explicit "Save draft" trigger or transparent background autosave alongside final publish/send actions so operators never lose long-form writing.

**Examples:** `text-toolbars-format-draft`.

### Accessibility

#### Tooltips on hover and focus

Display concise tooltips on both pointer hover and keyboard focus for every icon-only toolbar action.

#### Keyboard roving focus and menu navigation

- Entry stop: pressing Tab enters and exits the toolbar as a single logical stop, placing focus onto the first enabled control (or optionally restoring the last focused button on return).
- Horizontal travel: Right and Left Arrow keys move smoothly across toolbar items so users never traverse twenty individual Tab stops.
- Menu traversal: Enter or Space toggles dropdowns and overflow menus open, then Up/Down Arrow keys select options cleanly.

#### Screen reader toolbar semantics

Expose `role="toolbar"` following ARIA toolbar guidelines, announce pressed formatting toggle states, and give every grouped toolbar an accessible label.

### Related components and patterns

**Related:** Toolbar, Toggle, Menu, Tooltip, Attachment, Common actions, Search.

## Interactive and visual examples

### Format a mission brief and manage its draft

- Example ID: `text-toolbars-format-draft`
- Type: **Interactive**
- Source mapping: partial-divergent — `behaviors-saving`
- Scenario: Style a sample mission brief, add a reference or attachment, and review the formatted draft before saving it locally.
- What it teaches: A text toolbar keeps editing, formatting, paragraph, attachment, and draft tools clustered immediately above the editable area.
- Decision shown: Include only controls needed for the task, collapse extra tools into an overflow menu across md/sm breakpoints, anchor attachments inside the bottom-left editor footer, and support highlight-to-edit inline link popovers.
- Consider: Expose hover+focus tooltips on icon controls, use single-Tab-stop `role="toolbar"` with Left/Right arrow navigation, and never duplicate menu actions as redundant standalone buttons below the bar.
- Boundary or simplification: The preview keeps each toolbar action and its local result together and removes duplicate standalone menu actions. It remains a simplified editor: attachment placement is below the textarea rather than in an editor footer, and icon-button tooltips/highlight-to-edit link popovers are not modeled.

### Find and edit wording in context

- Example ID: `text-toolbars-find-in-context`
- Type: **Interactive**
- Source mapping: partial-divergent — `behaviors-search`
- Scenario: Search within a sample draft, review highlighted matches and the hit count, and keep the experimental status visible.
- What it teaches: In-document search locates wording inside the active editor without confusion against global workspace search.
- Decision shown: Highlight matching text directly inside the editor body, display total hits inside a clearable pill/tag with ×, and close via × or click-outside.
- Consider: Maintained source explicitly marks in-editor keyword search NOT ready for production use—treat UI details here as experimental.
- Boundary or simplification: The local preview now highlights matching words, reports a clearable hit count, and labels the feature experimental/not production-ready. Search remains a permanent field with a separate matching preview rather than a toolbar-triggered search that highlights text directly in the editable body.

## Maintenance rule

Treat the catalog as the source for status, summary, component shortlist, and design decisions. Treat page content as the source for section guidance and demo teaching. Treat the rendered demo as evidence only for the behavior it visibly implements. Update this guide and [pattern routing](../PATTERN_ROUTING.md) when the pattern changes. Never treat local examples as production services or operational policy.
