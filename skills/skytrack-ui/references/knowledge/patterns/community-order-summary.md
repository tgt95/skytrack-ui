# Order summary

> The catalog describes a summary of a platform, its status, or a specific service; it does not define detailed interaction behavior.

- Pattern ID: `community-order-summary`
- Catalog group: Community
- Source status: **Community catalog only**
- Primary source: [maintained reference](../../../../../docs/carbon-ds-reference/community/patterns/index.md)
- Catalog entry: [catalog.ts](../../../../../src/showcase/pattern-library/catalog.ts)
- Page copy, source citations, and demo map: [page-content.ts](../../../../../src/showcase/pattern-library/page-content.ts)
- Local interaction implementation: [demos.tsx](../../../../../src/showcase/pattern-library/demos.tsx)

## Decision summary

**Use when:** Local interpretation: summarize a platform or service when people need a quick view of its scope, current status, and capacity before deciding whether to inspect more detail.

**User outcome:** Local interpretation: a clear summary helps people understand what is available and whether they need more detail before taking another action.

### Design decisions

- Local interpretation: group related service capabilities, operating status, and capacity so the summary is easy to scan.
- Show freshness or update time when status can change and the decision depends on current information.
- Keep the summary distinct from follow-up actions; the local example does not open a service workspace or change service state.

### SkyTrack UI implementation route

- Use semantic term/value structure for labels and amounts, with Badge only for a meaningful status.
- The service-status summary is a local interpretation because detailed interaction guidance is not available here.
- Do not imply navigation, a service change, or an external request occurred.

**Candidate components:** `Badge`, `Button`. Verify each API against [component routing](../COMPONENT_ROUTING.md) and installed source.

> **Local example limit:** The available source is a brief catalog listing, not detailed interaction guidance. The local service summary does not open a workspace or change platform state.

## Source limits

- Catalog-only entry: the linked detail specification is not included in the local library.
- Missing maintained rules: required fields, visual layout, pricing or checkout workflows, status vocabularies, actions, and accessibility requirements are absent locally.
- The live example on this page is a SkyTrack local interpretation of a platform service summary and does not define a transaction or submit requests.

## Source notes

- This catalog-only entry is intentionally illustrated as a platform service summary. The live sample reveals capabilities and reports a local preview result without opening a workspace or changing service state.

## Guidance reference

### Catalog evidence

The maintained local community index records one brief catalog description for Order summary: a summary of a platform’s functionality, status, or individual service.

### Source limits

> **Source limit:** No dedicated detail specification exists locally. The index provides no rules for required summary fields, visual formatting, pricing, checkout, payment separation, or follow-up actions.

### Local interpretation for examples

> **Local interpretation:** Local interpretation: to illustrate the catalog phrase without inventing transaction rules, the live sample summarizes platform capabilities, operational status, and workspace capacity. The preview action reports only a local sample outcome.

**Examples:** `order-summary-service-review`.

## Interactive and visual examples

### Review a platform service summary

- Example ID: `order-summary-service-review`
- Type: **Interactive**
- Source mapping: local-interpretation — `local-interpretation`
- Scenario: Summarize service scope and operating state so a team can decide whether it needs to inspect more detail.
- What it teaches: Local interpretation: a concise summary presents platform capabilities, current service status, and capacity so an operator can decide whether to inspect more detail.
- Decision shown: Local interpretation: use a scannable service summary when people need to verify operational scope and readiness before deciding whether more detail is needed.
- Consider: No required fields, pricing rules, or follow-up actions exist in the local catalog source; this sample does not change service state or submit a request.
- Boundary or simplification: Live `OrderSummaryDemo` summarizes platform service status and workspace capacity. Its buttons reveal capabilities or report that details were previewed in this sample; they do not open an external workspace or submit a transaction.

## Maintenance rule

Treat the catalog as the source for status, summary, component shortlist, and design decisions. Treat page content as the source for section guidance and demo teaching. Treat the rendered demo as evidence only for the behavior it visibly implements. Update this guide and [pattern routing](../PATTERN_ROUTING.md) when the pattern changes. Never treat local examples as production services or operational policy.
