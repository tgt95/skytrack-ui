# Content: in-app learning

> The catalog lists five learning topics but provides no local rules for how they open, persist, or track progress.

- Pattern ID: `community-in-app-learning`
- Catalog group: Community
- Source status: **Community catalog only**
- Primary source: [maintained reference](../../../../../docs/carbon-ds-reference/community/patterns/index.md)
- Catalog entry: [catalog.ts](../../../../../src/showcase/pattern-library/catalog.ts)
- Page copy, source citations, and demo map: [page-content.ts](../../../../../src/showcase/pattern-library/page-content.ts)
- Local interaction implementation: [demos.tsx](../../../../../src/showcase/pattern-library/demos.tsx)

## Decision summary

**Use when:** Use in-app learning to explain a feature when and where users need it, or to help them get started with a new capability.

**User outcome:** Short, timely guidance helps people take a next step without leaving the task.

### Design decisions

- Local interpretation: keep guidance relevant to the current task and make it easy to dismiss or revisit when useful.
- Local interpretation: offer a short next step instead of overwhelming a first-time user with a tutorial.
- Local interpretation: if the product tracks completion, avoid repeatedly showing guidance the user has finished.

### SkyTrack UI implementation route

- Use Collapsible or Alert to illustrate contextual help with an optional next action.
- The local example illustrates welcome, contextual, and update guidance; it does not persist learning progress.
- Treat the example as a local illustration, not a complete implementation guide.

**Candidate components:** `Collapsible`, `Alert`, `Button`. Verify each API against [component routing](../COMPONENT_ROUTING.md) and installed source.

> **Local example limit:** The community catalog lists learning topics but does not define interaction or progress policy. Guidance here is local interpretation; the examples do not record or persist learner progress.

## Source limits

- Catalog-only entry: no dedicated detail specification is maintained locally; all referenced external content-design guides are unavailable here.
- Missing maintained rules: triggers, dismissal persistence, completion tracking, frequency caps, visual anatomy, placement, and accessibility requirements are not defined in the local source.
- All behavioral guidance and interactive examples on this page are SkyTrack local interpretations only.

## Guidance reference

### Catalog evidence

The maintained local community index records only a single catalog entry identifying five adoption-focused learning moments intended to help people understand key capabilities:

- Welcome screens
- Getting started
- In-context help and guidance
- Global help and guidance
- Updates (what’s new)

### Source limits

> **Source limit:** No detailed specification is maintained locally for any of these five topics. The local catalog defines no opening triggers, dismissal behavior, progress persistence, recurrence rules, layout anatomy, or accessibility contracts.

### Local interpretation for examples

> **Local interpretation:** Local interpretation: because the maintained index provides topic names without interaction rules, the guidance below explains only how SkyTrack illustrates those five moments in the interactive examples.

#### Welcome screens (local interpretation)

Local interpretation: a concise welcome banner can orient someone entering a new workspace without blocking immediate work, provided dismissal and a route to revisit are clear.

**Examples:** `in-app-learning-welcome`.

#### Getting started checklists (local interpretation)

Local interpretation: a short ordered checklist can introduce initial setup tasks one step at a time while clarifying locally whether progress persists.

**Examples:** `in-app-learning-checklist`.

#### In-context help and guidance (local interpretation)

Local interpretation: placing brief task tips right beside unfamiliar controls answers specific questions without pulling operators away from their workflow.

**Examples:** `in-app-learning-context-tip`.

#### Global help and guidance (local interpretation)

Local interpretation: a steady workspace help destination gives people a predictable place to find general documentation and support contacts across screens.

**Examples:** `in-app-learning-global-help`.

#### Product updates (local interpretation)

Local interpretation: concise release alerts can highlight meaningful workflow changes when users can dismiss them and look them up again later.

**Examples:** `in-app-learning-updates`.

## Interactive and visual examples

### Welcome a first-time user

- Example ID: `in-app-learning-welcome`
- Type: **Interactive**
- Source mapping: local-interpretation — `local-welcome-screens`
- Scenario: Orient a new workspace member with a short welcome and one clear way to begin or dismiss the introduction.
- What it teaches: Local interpretation: a brief welcome orients someone who is new and gives them a first step.
- Decision shown: Local interpretation: use a welcome when a new capability or workspace needs orientation; keep a way to dismiss and revisit it.
- Consider: Avoid blocking the user’s task; dismissal persistence and welcome behavior are not defined in the local catalog source.
- Boundary or simplification: Local-only walkthrough: Get started opens a sample first step, dismissal can be reversed, and progress is not persisted.

### Help users get started with a short checklist

- Example ID: `in-app-learning-checklist`
- Type: **Interactive**
- Source mapping: local-interpretation — `local-getting-started`
- Scenario: Break an unfamiliar task into visible first steps and show progress as each item is completed.
- What it teaches: Local interpretation: a short checklist breaks an unfamiliar task into first steps and makes progress visible.
- Decision shown: Local interpretation: use it when a person needs a sequence to get started; keep each step tied to the task at hand.
- Consider: If completion is tracked, decide how users can resume and avoid repeating finished guidance; progress policy is not in the local source.

### Show in-context guidance beside a task

- Example ID: `in-app-learning-context-tip`
- Type: **Interactive**
- Source mapping: local-interpretation — `local-in-context-help`
- Scenario: Offer a short explanation where a person encounters a new control, with a way to complete or reopen the tip.
- What it teaches: Local interpretation: a nearby tip explains a feature at the moment someone encounters it.
- Decision shown: Local interpretation: choose contextual guidance when a question arises during a specific task rather than sending users away for general reference.
- Consider: Keep tips relevant to the active control without obscuring surrounding inputs; local source defines no contextual-tip policy.

### Keep global help available across the workspace

- Example ID: `in-app-learning-global-help`
- Type: **Interactive**
- Source mapping: local-interpretation — `local-global-help`
- Scenario: Place learning resources in a predictable help location instead of repeating a full introduction on every page.
- What it teaches: Local interpretation: workspace-wide help gives people a steady destination when a question spans multiple screens.
- Decision shown: Local interpretation: use a global help entry point for reference that must stay reachable across workflows.
- Consider: Make help discoverable without interrupting active tasks; the local catalog defines no navigation or access rules.
- Boundary or simplification: In `demos.tsx:2781-2785`, expanded "Workspace help and guidance" renders static plain list text with no interactive links.

### Explain what changed in a product update

- Example ID: `in-app-learning-updates`
- Type: **Interactive**
- Source mapping: local-interpretation — `local-updates`
- Scenario: Show a concise release note that users can dismiss and find again from the help area.
- What it teaches: Local interpretation: an update explains a recent product change that affects daily workflow.
- Decision shown: Local interpretation: surface update guidance when a change matters to users, letting them dismiss and revisit it.
- Consider: Describe the real workflow change concisely; recurrence and display-frequency rules are absent from the local source.

## Maintenance rule

Treat the catalog as the source for status, summary, component shortlist, and design decisions. Treat page content as the source for section guidance and demo teaching. Treat the rendered demo as evidence only for the behavior it visibly implements. Update this guide and [pattern routing](../PATTERN_ROUTING.md) when the pattern changes. Never treat local examples as production services or operational policy.
