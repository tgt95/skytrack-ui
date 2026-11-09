# Pattern knowledge

Reference guides for all 26 workflow and page patterns in the SkyTrack UI showcase.

## How the specialist skill uses these guides

Start at [`PATTERN_ROUTING.md`](../PATTERN_ROUTING.md) to match the user's workflow need to a pattern, then read that pattern's guide before proposing or reviewing a solution. The specialist skill routes through this index; do not treat a guide as a component API contract.

Each guide is meant to help a product team make a decision. It captures the user need and context, when the pattern fits, the decision rules and tradeoffs, hierarchy and placement, content/accessibility considerations, and concrete examples with their expected outcomes and limits. Use that guidance to explain why a design supports the user's task, not only to name a UI arrangement.

The maintained catalog and source page content are canonical for this showcase. When either a pattern's decision guidance or a demo changes, update its guide and the routing metadata in the same task. Keep source provenance and source gaps explicit; do not infer detailed guidance for a catalog-only entry. Verify component choices separately through [`COMPONENT_ROUTING.md`](../COMPONENT_ROUTING.md) and the installed package API.

Current coverage: 26 patterns map to 106 use-case examples (85 interactive examples and 21 static visual references). Interactive examples update local preview state only; static references explain a composition and must not imply enabled behavior.

- [Pattern routing index](../PATTERN_ROUTING.md): choose one pattern by user need and verify provenance.
- [Component routing index](../COMPONENT_ROUTING.md): verify candidate library components independently.
- [Pattern catalog](../../../../../src/showcase/pattern-library/catalog.ts): canonical IDs, source status, use guidance, design decisions, implementation notes, and component shortlist.
- [Pattern page content](../../../../../src/showcase/pattern-library/page-content.ts): canonical section copy, demo scenarios, teaching points, citations, and limits.
- [Pattern demos](../../../../../src/showcase/pattern-library/demos.tsx): implemented local example behavior.

Each pattern guide combines a decision summary with the detailed maintained guidance and example map. Source status matters: community catalog-only entries do not have detailed maintained source guidance. Local demos are samples, not production services or policy.

| Group     | Count | Guides                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| --------- | ----: | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Core      |    17 | [Common actions](./common-actions.md), [Dialogs](./dialogs.md), [Disabled states](./disabled-states.md), [Disclosures](./disclosures.md), [Empty states](./empty-states.md), [Filtering](./filtering.md), [Fluid styles](./fluid-styles.md), [Forms](./forms.md), [Global header](./global-header.md), [Loading](./loading.md), [Login](./login.md), [Notifications](./notifications.md), [Overflow content](./overflow-content.md), [Read-only states](./read-only-states.md), [Search](./search.md), [Status indicators](./status-indicators.md), [Text toolbars](./text-toolbars.md) |
| Community |     9 | [Chatbots](./community-chatbots.md), [Content: in-app learning](./community-in-app-learning.md), [Create flows](./community-create-flows.md), [Edit](./community-edit.md), [Export](./community-export.md), [Generate an API key](./community-api-key.md), [Import](./community-import.md), [Order summary](./community-order-summary.md), [Remove](./community-remove.md)                                                                                                                                                                                                              |
