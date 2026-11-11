# Pattern routing index

**STATUS: ACTIVE** · **26 PATTERN GUIDES** · **17 CORE** · **9 COMMUNITY**

Use this index to select workflow and page-pattern guidance. Each linked guide is stored with the `skytrack-ui` specialist skill and summarizes locally maintained decision points, implementation notes, demo scenarios, and source limits.

Patterns guide product decisions. They are not component exports and do not prove an API is supported.

## How to use this index

1. Choose a pattern by user need and workflow context.
2. Read its linked Skill knowledge guide for the decision, user outcome, design checks, and limits.
3. Confirm source status. “Community catalog only” means the maintained source has only a catalog summary; do not infer detailed source rules.
4. Check the linked primary source when provenance matters. The catalog and page content remain the source of truth for this showcase.
5. Verify components separately in [COMPONENT_ROUTING.md](COMPONENT_ROUTING.md), then inspect installed exports, types, source, and compatible demos before implementing.
6. Treat local interactive and visual examples as demonstrations only. They do not perform product operations or establish operational policy.

## Supplemental report guidance

For report, dashboard, and analytical overview UX, read [Report and dashboard UX guidelines](research/REPORT_UX_GUIDELINES.md) alongside the relevant workflow pattern. This is supplemental research guidance, not a catalog pattern or component API contract. Verify component support separately.

## Core patterns

| Pattern ID          | Pattern           | Source status          | Skill knowledge                        | Primary source                                                                            |
| ------------------- | ----------------- | ---------------------- | -------------------------------------- | ----------------------------------------------------------------------------------------- |
| `common-actions`    | Common actions    | Universal              | [Guide](patterns/common-actions.md)    | [Source](../../../../docs/carbon-ds-reference/patterns/common-actions/index.md)           |
| `dialogs`           | Dialogs           | Universal              | [Guide](patterns/dialogs.md)           | [Source](../../../../docs/carbon-ds-reference/patterns/dialog-pattern/index.md)           |
| `disabled-states`   | Disabled states   | Universal              | [Guide](patterns/disabled-states.md)   | [Source](../../../../docs/carbon-ds-reference/patterns/disabled-states/index.md)          |
| `disclosures`       | Disclosures       | Universal              | [Guide](patterns/disclosures.md)       | [Source](../../../../docs/carbon-ds-reference/patterns/disclosures-pattern/index.md)      |
| `empty-states`      | Empty states      | Universal              | [Guide](patterns/empty-states.md)      | [Source](../../../../docs/carbon-ds-reference/patterns/empty-states-pattern/index.md)     |
| `filtering`         | Filtering         | Universal              | [Guide](patterns/filtering.md)         | [Source](../../../../docs/carbon-ds-reference/patterns/filtering/index.md)                |
| `fluid-styles`      | Fluid styles      | Additional local topic | [Guide](patterns/fluid-styles.md)      | [Source](../../../../docs/carbon-ds-reference/patterns/fluid-styles/index.md)             |
| `forms`             | Forms             | Universal              | [Guide](patterns/forms.md)             | [Source](../../../../docs/carbon-ds-reference/patterns/forms-pattern/index.md)            |
| `global-header`     | Global header     | Universal              | [Guide](patterns/global-header.md)     | [Source](../../../../docs/carbon-ds-reference/patterns/global-header/index.md)            |
| `loading`           | Loading           | Universal              | [Guide](patterns/loading.md)           | [Source](../../../../docs/carbon-ds-reference/patterns/loading-pattern/index.md)          |
| `login`             | Login             | Universal              | [Guide](patterns/login.md)             | [Source](../../../../docs/carbon-ds-reference/patterns/login-pattern/index.md)            |
| `notifications`     | Notifications     | Universal              | [Guide](patterns/notifications.md)     | [Source](../../../../docs/carbon-ds-reference/patterns/notification-pattern/index.md)     |
| `overflow-content`  | Overflow content  | Additional local topic | [Guide](patterns/overflow-content.md)  | [Source](../../../../docs/carbon-ds-reference/patterns/overflow-content/index.md)         |
| `read-only-states`  | Read-only states  | Universal              | [Guide](patterns/read-only-states.md)  | [Source](../../../../docs/carbon-ds-reference/patterns/read-only-states-pattern/index.md) |
| `search`            | Search            | Universal              | [Guide](patterns/search.md)            | [Source](../../../../docs/carbon-ds-reference/patterns/search-pattern/index.md)           |
| `status-indicators` | Status indicators | Additional local topic | [Guide](patterns/status-indicators.md) | [Source](../../../../docs/carbon-ds-reference/patterns/status-indicator-pattern/index.md) |
| `text-toolbars`     | Text toolbars     | Universal              | [Guide](patterns/text-toolbars.md)     | [Source](../../../../docs/carbon-ds-reference/patterns/text-toolbar-pattern/index.md)     |

## Community patterns

| Pattern ID                  | Pattern                  | Source status          | Skill knowledge                                | Primary source                                                                                 |
| --------------------------- | ------------------------ | ---------------------- | ---------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| `community-chatbots`        | Chatbots                 | Community maintained   | [Guide](patterns/community-chatbots.md)        | [Source](../../../../docs/carbon-ds-reference/community/patterns/chatbot/overview.md)          |
| `community-in-app-learning` | Content: in-app learning | Community catalog only | [Guide](patterns/community-in-app-learning.md) | [Source](../../../../docs/carbon-ds-reference/community/patterns/index.md)                     |
| `community-create-flows`    | Create flows             | Community maintained   | [Guide](patterns/community-create-flows.md)    | [Source](../../../../docs/carbon-ds-reference/community/patterns/create-flows/index.md)        |
| `community-edit`            | Edit                     | Community maintained   | [Guide](patterns/community-edit.md)            | [Source](../../../../docs/carbon-ds-reference/community/patterns/edit-pattern/index.md)        |
| `community-export`          | Export                   | Community maintained   | [Guide](patterns/community-export.md)          | [Source](../../../../docs/carbon-ds-reference/community/patterns/export-pattern/index.md)      |
| `community-api-key`         | Generate an API key      | Community maintained   | [Guide](patterns/community-api-key.md)         | [Source](../../../../docs/carbon-ds-reference/community/patterns/generate-an-api-key/index.md) |
| `community-import`          | Import                   | Community maintained   | [Guide](patterns/community-import.md)          | [Source](../../../../docs/carbon-ds-reference/community/patterns/import-pattern/index.md)      |
| `community-order-summary`   | Order summary            | Community catalog only | [Guide](patterns/community-order-summary.md)   | [Source](../../../../docs/carbon-ds-reference/community/patterns/index.md)                     |
| `community-remove`          | Remove                   | Community maintained   | [Guide](patterns/community-remove.md)          | [Source](../../../../docs/carbon-ds-reference/community/patterns/remove-pattern/index.md)      |

## Source of truth and maintenance

- Pattern identity, source status, summary, design decisions, implementation guidance, and component shortlist: [catalog.ts](../../../../src/showcase/pattern-library/catalog.ts).
- Section copy, teaching notes, citations, mappings, local caveats, and example inventory: [page-content.ts](../../../../src/showcase/pattern-library/page-content.ts).
- Rendered sample interactions and visuals: [demos.tsx](../../../../src/showcase/pattern-library/demos.tsx).
- Skill knowledge pages summarize these maintained sources for retrieval. Update the affected page and this index when the source changes; do not edit a summary in isolation.
- Verify every index link against the catalog and source file before handoff.
