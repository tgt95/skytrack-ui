# Multi-Pane / Three-Column Shell

> Three-column master-detail layout enabling rapid triage, search, and deep inspection without page context loss.

- Package version: `0.1.5`
- Showcase demo id: `multi-pane-shell`
- Closest demo: [`src/demos/multi-pane-shell.demo.tsx`](../../../../../src/demos/multi-pane-shell.demo.tsx)
- Pattern source: [`docs/enterprise_ui_shell_patterns.md`](../../../../../docs/enterprise_ui_shell_patterns.md)

## Usage

Use Multi-Pane Shell for operational workflows where agents or specialists triage, review, and process a high volume of records in sequence. The three-column architecture provides simultaneous visibility across folder queues, the record master list, and complete item details.

- **Fit:** Customer support service desks (Zendesk, Salesforce Service Cloud), B2B communication clients, invoice approval queues, digital asset managers (DAM).
- **Avoid:** Multi-step wizard flows or full-screen analytical canvases.
- **Best alternative:** For broad analytical reporting, use Top Navigation Shell.

**Live demo variant:** `Default`

## Types

- **Fixed Three-Column Mode:** Three simultaneous columns with fixed proportions (Column 1: 15-20%, Column 2: 25-30%, Column 3: 50-60%).
- **Collapsible Master List:** Option to collapse the middle list to maximize reading or editing width in the detail panel.

## Behavior

- **Instant selection:** Clicking or keyboard-navigating up/down in the master list immediately refreshes the detail pane without page reloads.
- **Scroll state retention:** The master list retains its precise scroll position when records are inspected or actioned.

| Do | Don't | Why |
| --- | --- | --- |
| Highlight the active master list item with a distinct border and accent background. | Leave the selected row ambiguous in the master list. | Visual anchoring prevents accidental modifications to the wrong record. |
| Embed quick search and filter controls directly above the master list. | Require navigating away to a separate search page to find records. | Rapid in-place filtering is essential for high-throughput triage workflows. |

**Live demo variant:** `Default`

## Layout

- **Column 1 (Queues / Categories):** 160px - 200px width for mailbox and queue counts.
- **Column 2 (Master List):** 240px - 320px width with independent vertical scrolling.
- **Column 3 (Detail View):** Expands to fill remaining viewport, displaying invoice summaries, customer profiles, and billing breakdowns.

**Live demo variant:** `Default`

## Accessibility

- Full keyboard shortcut support (`J` / `K` or Up/Down Arrow keys) for traversing master list items.
- Focus management smoothly shifts focus into the detail pane upon selection.

**Live demo variant:** `Default`

## Content

- Master list cards must summarize four core attributes: Record ID, subject/title, customer entity, and status badge.
- Detail pane distinguishes profile attributes from audit histories.

**Live demo variant:** `Default`
