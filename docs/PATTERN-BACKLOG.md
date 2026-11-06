# SkyTrack UI pattern backlog

Candidates grounded in product usage and research. Entries here are proposals; they do not change canonical rules until separately reviewed and accepted.

## Candidate: Context Rail + Task Workspace

**Status:** OPEN — evidence-backed candidate; priority not assigned.  
**Request:** Define when a persistent right-side context rail helps users compare stable object identity and active-tab context while keeping the primary task workspace readable.

### Evidence

- SkyTrack UI IA guidance groups information by domain object and task sequence, keeps decision-critical information visible, chooses split view when people select an object and inspect it alongside its list, and cautions against turning every subgroup into a card. See `skills/skytrack-ui/references/implementation.md`, sections “Research and plan Information Architecture” and “Choose page structure by relationship and sequence” (lines 20–32).
- Atlassian’s navigation layout places a contextual Panel to the right of Main; it supports collapse/expand, resize, and responsive behavior, with overlay behavior below 1024px. [Layout](https://atlassian.design/components/navigation-system/layout).
- Atlassian distinguishes supplementary right-panel content from navigation and allows a custom two-column layout inside Main when a persistent right sidebar better fits the content. [Migration guidance](https://atlassian.design/components/navigation-system/migration-guide).
- USWDS documents an adjacent sticky in-page navigation for long pages (three or more distinct sections or three or more viewport heights). This is a related sticky-side pattern, but its purpose is navigation rather than persistent run metadata. [In-page navigation](https://designsystem.digital.gov/components/in-page-navigation/).
- Carbon advises giving dense data tables sufficient width in main content to avoid cramped/truncated data. [Data Table guidance](https://www.carbondesignsystem.com/building-blocks/core/components/data-table/guidelines).

### Candidate practice questions

1. What stable context belongs in the rail across tabs, and what must remain in the main task flow?
2. When should a selected-item detail replace tab-specific summary content in the rail?
3. Which minimum viewport/content width should collapse or hide the rail?
4. How should the reading and keyboard order work when the visual rail is on the right?
5. How do table, map, gallery, chart, and code tabs preserve enough width?

### Proposed acceptance evidence

- State applicability and exclusions; distinguish context rail, master-detail panel, and in-page navigation.
- Define a stable context block plus optional active-tab context without duplicating whole cards.
- Define wide/narrow behavior, focus/reading order, sticky offset, and scroll behavior.
- Include examples for an analytics overview, selected media item, dense table, map, and code view.
- Validate at desktop and mobile widths and test content/keyboard access.
