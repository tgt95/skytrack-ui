# Pattern routing index

**STATUS: ACTIVE** · **26 PATTERN ENTRIES** · **17 CORE** · **9 COMMUNITY**

Use this index to find relevant workflow and page-pattern guidance in the SkyTrack UI showcase.
The catalog is separate from the component library: a pattern entry is not a component export and
does not prove that its suggested component composition is supported by the target installation.

## How to use this index

1. Shortlist a pattern by user task and data flow; do not copy a reference layout without checking
   the current product context.
2. Read the selected entry in [`src/showcase/pattern-library/catalog.ts`](../../../../src/showcase/pattern-library/catalog.ts)
   for its ID, source status, `components` shortlist, and implementation guidance.
3. Open the linked local source reference for deeper design context. Community entries marked
   `Community catalog only` have no detailed local guidance; use only the catalog summary and keep
   that limitation explicit.
4. Verify every chosen UI component independently through [`COMPONENT_ROUTING.md`](COMPONENT_ROUTING.md),
   its Developer guide, installed exports/types/source, and the closest compatible demo.
5. Read [`src/showcase/pattern-library/demos.tsx`](../../../../src/showcase/pattern-library/demos.tsx)
   only when a concrete local composition or interaction example is useful. Demos use local sample
   state and are not product services or operational policy.

The `components` list is a discovery aid, not a coverage map or API contract. Check the exact
pattern's `sourcePath` in `catalog.ts`; links below mirror the current catalog paths.

## Core patterns

Fourteen entries are marked Universal. Three local topics are additions in this workspace's
catalog; they are useful local guidance and must not be represented as universal source guidance.

| Pattern ID          | Pattern           | Source status          | Local reference                                                                                             |
| ------------------- | ----------------- | ---------------------- | ----------------------------------------------------------------------------------------------------------- |
| `common-actions`    | Common actions    | Universal              | [common-actions](../../../../docs/carbon-ds-reference/patterns/common-actions/index.md)                     |
| `dialogs`           | Dialogs           | Universal              | [dialog-pattern](../../../../docs/carbon-ds-reference/patterns/dialog-pattern/index.md)                     |
| `disabled-states`   | Disabled states   | Universal              | [disabled-states](../../../../docs/carbon-ds-reference/patterns/disabled-states/index.md)                   |
| `disclosures`       | Disclosures       | Universal              | [disclosures-pattern](../../../../docs/carbon-ds-reference/patterns/disclosures-pattern/index.md)           |
| `empty-states`      | Empty states      | Universal              | [empty-states-pattern](../../../../docs/carbon-ds-reference/patterns/empty-states-pattern/index.md)         |
| `filtering`         | Filtering         | Universal              | [filtering](../../../../docs/carbon-ds-reference/patterns/filtering/index.md)                               |
| `fluid-styles`      | Fluid styles      | Additional local topic | [fluid-styles](../../../../docs/carbon-ds-reference/patterns/fluid-styles/index.md)                         |
| `forms`             | Forms             | Universal              | [forms-pattern](../../../../docs/carbon-ds-reference/patterns/forms-pattern/index.md)                       |
| `global-header`     | Global header     | Universal              | [global-header](../../../../docs/carbon-ds-reference/patterns/global-header/index.md)                       |
| `loading`           | Loading           | Universal              | [loading-pattern](../../../../docs/carbon-ds-reference/patterns/loading-pattern/index.md)                   |
| `login`             | Login             | Universal              | [login-pattern](../../../../docs/carbon-ds-reference/patterns/login-pattern/index.md)                       |
| `notifications`     | Notifications     | Universal              | [notification-pattern](../../../../docs/carbon-ds-reference/patterns/notification-pattern/index.md)         |
| `overflow-content`  | Overflow content  | Additional local topic | [overflow-content](../../../../docs/carbon-ds-reference/patterns/overflow-content/index.md)                 |
| `read-only-states`  | Read-only states  | Universal              | [read-only-states-pattern](../../../../docs/carbon-ds-reference/patterns/read-only-states-pattern/index.md) |
| `search`            | Search            | Universal              | [search-pattern](../../../../docs/carbon-ds-reference/patterns/search-pattern/index.md)                     |
| `status-indicators` | Status indicators | Additional local topic | [status-indicator-pattern](../../../../docs/carbon-ds-reference/patterns/status-indicator-pattern/index.md) |
| `text-toolbars`     | Text toolbars     | Universal              | [text-toolbar-pattern](../../../../docs/carbon-ds-reference/patterns/text-toolbar-pattern/index.md)         |

## Community patterns

Seven entries have detailed community-maintained local references. Two are present in the source
catalog only; the referenced community index gives their title and summary, not a detailed guide.

| Pattern ID                  | Pattern                  | Source status          | Local reference                                                                                             |
| --------------------------- | ------------------------ | ---------------------- | ----------------------------------------------------------------------------------------------------------- |
| `community-chatbots`        | Chatbots                 | Community maintained   | [chatbot overview](../../../../docs/carbon-ds-reference/community/patterns/chatbot/overview.md)             |
| `community-in-app-learning` | Content: in-app learning | Community catalog only | [community index](../../../../docs/carbon-ds-reference/community/patterns/index.md)                         |
| `community-create-flows`    | Create flows             | Community maintained   | [create-flows](../../../../docs/carbon-ds-reference/community/patterns/create-flows/index.md)               |
| `community-edit`            | Edit                     | Community maintained   | [edit-pattern](../../../../docs/carbon-ds-reference/community/patterns/edit-pattern/index.md)               |
| `community-export`          | Export                   | Community maintained   | [export-pattern](../../../../docs/carbon-ds-reference/community/patterns/export-pattern/index.md)           |
| `community-api-key`         | Generate an API key      | Community maintained   | [generate-an-api-key](../../../../docs/carbon-ds-reference/community/patterns/generate-an-api-key/index.md) |
| `community-import`          | Import                   | Community maintained   | [import-pattern](../../../../docs/carbon-ds-reference/community/patterns/import-pattern/index.md)           |
| `community-order-summary`   | Order summary            | Community catalog only | [community index](../../../../docs/carbon-ds-reference/community/patterns/index.md)                         |
| `community-remove`          | Remove                   | Community maintained   | [remove-pattern](../../../../docs/carbon-ds-reference/community/patterns/remove-pattern/index.md)           |

## Catalog source and maintenance

- Catalog IDs, statuses, summaries, `components` lists, and source paths: [`catalog.ts`](../../../../src/showcase/pattern-library/catalog.ts).
- Interactive local examples: [`demos.tsx`](../../../../src/showcase/pattern-library/demos.tsx).
- Pattern page and catalog interactions: [`index.tsx`](../../../../src/showcase/pattern-library/index.tsx).
- Local reference source: [`docs/carbon-ds-reference/patterns/`](../../../../docs/carbon-ds-reference/patterns/) and [`docs/carbon-ds-reference/community/patterns/`](../../../../docs/carbon-ds-reference/community/patterns/).

When catalog entries change, update this routing list and validate every link against `catalog.ts`.
Do not duplicate full pattern guidance here; keep the catalog and local source documents as the
content sources of truth.
