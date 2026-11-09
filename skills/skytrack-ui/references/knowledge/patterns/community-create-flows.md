# Create flows

> A flow for generating a new resource, distinct from adding an existing resource.

- Pattern ID: `community-create-flows`
- Catalog group: Community
- Source status: **Community maintained**
- Primary source: [maintained reference](../../../../../docs/carbon-ds-reference/community/patterns/create-flows/index.md)
- Catalog entry: [catalog.ts](../../../../../src/showcase/pattern-library/catalog.ts)
- Page copy, source citations, and demo map: [page-content.ts](../../../../../src/showcase/pattern-library/page-content.ts)
- Local interaction implementation: [demos.tsx](../../../../../src/showcase/pattern-library/demos.tsx)

## Decision summary

**Use when:** Use a create flow when a new resource must be configured; choose inline, modal, side panel, tearsheet, or full page by complexity.

**User outcome:** The creation surface matches the task size, so simple work stays quick and complex work has room.

### Design decisions

- Use inline creation for a simple new item; choose a larger surface when setup needs more fields, steps, or page context.
- In multi-step flows, disable Back on the first step and keep Next or Create unavailable until required fields are ready.
- For a full-page flow, confirm navigation away when the resource is still incomplete; keep Cancel as the explicit exit.
- Show completion and loading feedback after the user commits.

### SkyTrack UI implementation route

- Use Dialog and Field for the compact local creation example.
- Keep save and cancel explicit and update only an in-memory sample.
- Do not confuse creating a new resource with adding an existing one.

**Candidate components:** `Dialog`, `Field`, `Input`, `Button`. Verify each API against [component routing](../COMPONENT_ROUTING.md) and installed source.

> **Local example limit:** Community pattern; format and flow guidance comes from the local community page.

## Source limits

- Inline creation guidance is explicitly marked under construction in the maintained community reference.
- Trigger styling leaves the secondary choice between tertiary and ghost emphasis unresolved when a primary button already occupies the section.
- Wide tearsheet and full-page footers note an upcoming 80px fluid button height update replacing 64px.

## Source notes

- Source mixes H2 -> H4 directly for When to use / When not to use subsections under Inline creation, Modal, Side panel, Narrow tearsheet, Wide tearsheet, and Full page; normalized to level 3 here while preserving exact sequence.
- Full page When to use / When not to use lists vendor-specific cloud provisioning exceptions; generalized here to prerequisite-setup conditions without vendor branding.

## Guidance reference

### Overview

Creating generates a new resource rather than attaching an existing item (Add) or revising an existing one (Edit); never reuse Create surfaces for Add or Edit workflows. Select among six creation surfaces according to form complexity and whether surrounding page context must remain visible and interactive:

| Surface          | When it fits                                                                        | Page context visibility                                    |
| ---------------- | ----------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| Inline           | Quick, simple item creation right on the canvas                                     | On-page content stays visible and interactive              |
| Modal            | Simple or transitional creation with 1–2 form fields                                | On-page content is obscured by overlay                     |
| Side panel       | Medium complexity where live page context helps                                     | On-page content stays visible and interactive (no overlay) |
| Narrow tearsheet | Medium complexity needing scrolling or section headers                              | On-page content is obscured by overlay                     |
| Wide tearsheet   | Complex multi-step flows or spacious single-step layouts                            | On-page content is obscured by overlay                     |
| Full page        | Rare prerequisite flows that must finish before a product or service becomes usable | Dedicated page canvas                                      |

### Inline creation

> **note:** Under construction: the community reference notes that inline creation guidance is still evolving across edge cases.

**Examples:** `create-flows-inline`.

#### When to use

Prefer inline creation for quick, simple items when keeping the surrounding list or workspace visible helps the operator stay oriented.

#### When not to use

Do not use inline creation if finishing the flow transitions the user onto another page—such as opening the newly created resource or moving to a confirmation screen; use a Modal instead. For complex objects like major system resources, step up to Narrow or Wide tearsheets.

### Modal

**Examples:** `create-flows-modal`.

#### When to use

- Simple creations requiring only one or two form fields.
- Transitional creations that navigate the user to a new page after submitting.

#### When not to use a modal

> **dont:** Never substitute a modal for an inline creation opportunity, and never use a modal if the form requires more than four fields or internal vertical scrolling.

#### Anatomy of a modal

1. Small modal container paired with a backdrop overlay that dims underlying content.
2. Create title with an optional concise subtitle.
3. Body holding necessary instructions and form fields.
4. Primary Create button and secondary Cancel button (no top-right close icon).

### Side panel

**Examples:** `create-flows-side-panel`.

#### When to use

Use a side panel when medium-complexity setup benefits from keeping live page content visible and interactive beside the form.

#### When not to use

Avoid side panels for high-complexity flows where users need a visible step-by-step progress indicator.

#### Anatomy of a side panel

1. 480px panel width with NO backdrop overlay, keeping the page in an interactive non-focus state so operators can reference on-screen records.
2. Create title and optional subtitle.
3. Body with form controls and supporting guidance.
4. Primary Create button and secondary Cancel button.

#### Alignment

Anchor the 480px panel cleanly along the trailing edge so primary page landmarks and reference tables stay unobstructed.

### Narrow tearsheet

**Examples:** `create-flows-narrow-tearsheet`.

#### When to use

- Choose a narrow tearsheet instead of a modal whenever the form needs vertical scrolling.
- Use it when related inputs organize cleanly beneath labeled section headers.

#### When not to use

Do not use a narrow tearsheet for high-complexity workflows that require a multi-step progress indicator.

#### Anatomy of a tearsheet

1. Narrow sheet container paired with a full backdrop overlay obscuring underlying page content.
2. Create title and optional subtitle.
3. Scrollable body organized around form fields and section headings.
4. Primary Create button and secondary Cancel button.

#### Alignment

Center or dock the narrow sheet rhythmically inside the viewport grid with consistent header, body, and sticky footer padding.

### Wide tearsheet

**Examples:** `create-flows-wide-tearsheet`.

#### When to use

- Use a wide tearsheet for creation flows spanning two or more distinct steps.
- For single-step tasks requiring broad space—such as interactive selectors, diagrams, or tables—use a wide tearsheet with the progress rail omitted.

#### When not to use

Do not use a wide tearsheet for simple single-step creations with few fields.

#### Anatomy of a wide tearsheet

1. Wide sheet container with screen overlay obscuring underlying content.
2. Create title with optional subtitle.
3. Left vertical progress indicator (256px default rail width, expanding to 320px for long step labels).
4. Optional "Show all available options" toggle allowing users to inspect every step on one scrollable view with anchor links.
5. Body area containing step controls, tables, or guidance.
6. Sticky footer housing primary Next (changing to Create on the final step), secondary Back (disabled on step 1), and ghost Cancel.

#### Alignment

Align form columns inside the wide canvas next to the 256px or 320px left progress rail, pairing fluid bottom footer buttons (noting upcoming 80px button height conventions replacing 64px) cleanly across the full footer span.

#### Behaviors

Switching on "Show all available options" converts the vertical progress rail into in-page navigation anchor links across one continuous scrolling canvas above a sticky, top-bordered footer without a fade gradient. You may default this view on when it benefits power users; whenever toggling it back off risks hiding or discarding modified advanced values, show a warning confirmation modal first.

### Full page

> **Warning:** Rare edge case: never confuse Full page with—or use it as a substitute for—the Wide tearsheet.

**Examples:** `create-flows-full-page`.

#### When to use

Reserve full-page creation solely for mandatory prerequisite setup that must be completed before the operator can use the product or service at all (such as initial non-billable service provisioning before workspace access exists).

#### When not to use

Do not use a full-page flow when the product or service is already usable before creation begins, or when creating the resource fits cleanly in a side panel, tearsheet, or catalog provisioning view.

#### Anatomy of a full page

1. Optional location-based breadcrumbs when hierarchy context helps.
2. Page title (not required to match the Create title verbatim).
3. Create title (typically "Create <asset>").
4. Vertical progress rail (256px default, 320px for long step labels).
5. Main form body.
6. Optional "Show all available options" toggle.
7. Fluid sticky footer buttons (64px height, transitioning toward 80px): Next (becoming Create on the final step), Back (disabled on step 1), and ghost Cancel returning to the prior view.

#### Alignment

Align page headers, progress rail, form column, and fluid footer bar cleanly to the full-page grid, allowing for upcoming 80px fluid footer buttons.

#### Optional toggle

Like wide tearsheets, full-page flows may offer the "Show all available options" toggle to replace step-by-step progress with scrollable anchor links.

#### Leaving the Create flow

Whenever an operator attempts to leave a full-page creation flow through any route other than explicitly clicking Cancel—such as breadcrumbs or workspace navigation links—display a confirmation modal warning that entered work will be lost.

### Designing with creation flows

#### Behaviors

##### Triggers

Launch creation from a "New <asset type>" button paired with a plus icon (for example, "New mission"). Apply primary emphasis only when no other primary action already exists in that section; otherwise step down to tertiary or ghost emphasis (exact preference between tertiary and ghost remains open in the reference). In multi-step flows, disable Back on step 1, rename Next to Create on the final step, and keep Next and Create disabled until every required field is populated.

##### Dismissing flows

> **dont:** Omit the top-right close (×) icon on create Modals, Side panels, Narrow tearsheets, and Wide tearsheets so operators make an explicit decision to exit via Cancel.

##### Flow completion & loading

After the user submits Create, show immediate loading or submitting feedback aligned with loading and modal loading standards. Once finished, either open the new resource or its detail page, or remain on the originating view with a clear success banner notification; whenever creation fails, always surface an error notification.

**Examples:** `create-flows-completion-loading`.

### Related use cases

#### Add

Attaching an existing resource shares similar ergonomics, yet Add workflows are distinct and must follow their own action guidance rather than Create.

#### Edit

Modifying saved resources overlaps in surface parity, yet Edit workflows carry separate impact and confirmation rules handled under the Edit pattern.

### Accessibility

Inherit accessibility contracts from the underlying Modal, Side panel, Tearsheet, Form, and Progress indicator components—preserving focus trapping on overlay surfaces, non-focus accessibility on side panels, keyboard activation on Cancel and disabled Next/Create states, and clear status announcements on submission.

### Related components and patterns

**Related:** Dialogs, Forms, Loading, Notifications, Common actions (Add), Edit, Switch (All-options toggle), Progress.

## Interactive and visual examples

### Create a quick mission inline

- Example ID: `create-flows-inline`
- Type: **Interactive**
- Source mapping: partial-divergent — `inline-creation`
- Scenario: Create a new one-field mission while keeping the collection visible; use this compact route when no extra context is needed.
- What it teaches: Inline creation adds a quick new item right inside the workspace while keeping surrounding collection records visible.
- Decision shown: Choose inline only for simple non-transitional creation (noting inline guidance remains under construction); move to a Modal if creation opens a new destination page.
- Consider: Keep required fields disabled-gated on Create and clarify exit behavior; remember Create builds a new item rather than adding an existing one.
- Boundary or simplification: The inline variant now has one required field and disables Create while it is empty; Clear empties the field rather than cancelling the whole flow.

### Create a mission in a focused dialog

- Example ID: `create-flows-modal`
- Type: **Interactive**
- Source mapping: partial-divergent — `modal`
- Scenario: Use a modal for a short task that needs focused attention but not a full page.
- What it teaches: A focused modal blocks the page to collect 1–2 inputs or bridge a short transitional create flow.
- Decision shown: Use a modal for 1–2 fields or post-create page navigation—never in place of inline creation, and never if fields exceed four or cause scrolling.
- Consider: Omit the top-right close icon so users exit via Cancel, and keep Create disabled until required fields are filled.
- Boundary or simplification: Create stays disabled until the required mission name is present; the sample still uses the library Dialog header and does not create a persisted record.

### Create a complex mission in a side panel

- Example ID: `create-flows-side-panel`
- Type: **Interactive**
- Source mapping: partial-divergent — `side-panel`
- Scenario: Keep the mission collection visible and usable beside a longer creation form in a non-blocking side panel.
- What it teaches: A 480px non-modal side panel lets operators configure a medium-complexity resource while referencing and interacting with the underlying page.
- Decision shown: Use a side panel when live page context helps and no step-by-step progress rail is required; step up to a Wide tearsheet for multi-step workflows.
- Consider: Omit any backdrop overlay that blocks non-focus reference on the page, omit a top-right close icon, and gate Create until required inputs are complete.
- Boundary or simplification: The in-card side-panel preview keeps the mission list usable while the create form is open; it does not model a production drawer component or save a mission.

### Give a multi-step creation task a full-page canvas

- Example ID: `create-flows-full-page`
- Type: **Interactive**
- Source mapping: mapped — `full-page`
- Scenario: Set up the initial flight-operations workspace that dispatchers must complete before mission planning is available; the preview uses a dedicated two-step canvas.
- What it teaches: Full-page creation is a rare surface reserved for setup the operator must complete before a product or service becomes usable.
- Decision shown: Do NOT use Full page merely because a creation flow is long or multi-step—use a Wide tearsheet instead unless prerequisite blocking requires a dedicated page. On multi-step flows, disable Back on step 1 and gate Next/Create.
- Consider: Confirm before discarding when users leave through workspace navigation as well as Cancel. This preview demonstrates the Cancel path; navigation is not routed.

### Use a narrow tearsheet for a compact create task

- Example ID: `create-flows-narrow-tearsheet`
- Type: **Visual reference**
- Source mapping: mapped — `narrow-tearsheet`
- Scenario: When a create form needs vertical scrolling, use a narrow tearsheet to group related fields while keeping its actions visible.
- What it teaches: A narrow tearsheet provides an overlay-backed form when a create task is too tall for a modal or its fields need section headers.
- Decision shown: Choose it for a single-step form that needs vertical scrolling or clear field sections; choose a Wide tearsheet when progress across multiple steps must stay visible.
- Consider: Keep Cancel and Create visible while the body scrolls. This static layout preview is not an interactive `skytrack-ui` Tearsheet.
- Boundary or simplification: Static layout reference uses a scrollable, sectioned form with fixed actions; Tearsheet is not shipped in `skytrack-ui`.

### Use a wide tearsheet when the task needs more room

- Example ID: `create-flows-wide-tearsheet`
- Type: **Visual reference**
- Source mapping: mapped — `wide-tearsheet`
- Scenario: Show a multi-step mission setup that needs a progress rail and roomy review area; the overlay blocks the page until operators finish or exit the flow.
- What it teaches: A wide tearsheet hosts 2+ distinct steps (with a 256px/320px vertical progress rail) or one spacious interactive canvas (progress rail omitted).
- Decision shown: Choose a Wide tearsheet—not a Full page—for complex multi-step creations or spacious selectors/tables/diagrams; include an optional "Show all available options" anchor toggle when helpful.
- Consider: Keep Back disabled on step 1, warn before discarding edits if toggling off all-options hides data, and keep the sticky footer bordered without a fade gradient.
- Boundary or simplification: Static two-step illustration includes progress rail, review guidance, and a fixed footer; Tearsheet is not a shipped `skytrack-ui` component, so no fields or actions are interactive.

### Show completion and a brief loading state

- Example ID: `create-flows-completion-loading`
- Type: **Interactive**
- Source mapping: partial-divergent — `designing-completion-loading`
- Scenario: After the user submits a create flow, communicate that local preparation is in progress and then show completion.
- What it teaches: Submitting Create requires active loading feedback followed by an unambiguous success or failure outcome.
- Decision shown: Keep Next and Create disabled until required fields pass; after submission, show loading, then open the created resource or remain on page with a success banner—and always show an error notification on failure.
- Consider: Never report success while preparation is still running.
- Boundary or simplification: Submit starts the local preparation preview and Continue completes it; persistence and failure recovery are not simulated.

## Maintenance rule

Treat the catalog as the source for status, summary, component shortlist, and design decisions. Treat page content as the source for section guidance and demo teaching. Treat the rendered demo as evidence only for the behavior it visibly implements. Update this guide and [pattern routing](../PATTERN_ROUTING.md) when the pattern changes. Never treat local examples as production services or operational policy.
