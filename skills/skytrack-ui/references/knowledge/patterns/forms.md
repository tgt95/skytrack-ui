# Forms

> Related input controls that let people provide data or configure options.

- Pattern ID: `forms`
- Catalog group: Core
- Source status: **Universal**
- Primary source: [maintained reference](../../../../../docs/carbon-ds-reference/patterns/forms-pattern/index.md)
- Catalog entry: [catalog.ts](../../../../../src/showcase/pattern-library/catalog.ts)
- Page copy, source citations, and demo map: [page-content.ts](../../../../../src/showcase/pattern-library/page-content.ts)
- Local interaction implementation: [demos.tsx](../../../../../src/showcase/pattern-library/demos.tsx)

## Decision summary

**Use when:** Use a form for one or more related values; choose a page, side panel, or dialog according to task complexity and context.

**User outcome:** Clear labels, grouped fields, and actionable errors reduce uncertainty and repeated work.

### Design decisions

- Label controls, distinguish optional from required information, and explain unusual values with helper text.
- Collect only what the task needs; group related fields and validate beside the problem with a clear repair.
- Keep action order, button emphasis, spacing, and responsive columns consistent.

### SkyTrack UI implementation route

- Compose FieldRoot, FieldLabel, FieldDescription, FieldError, and the appropriate control.
- Use real input labels and keep errors beside the affected field.
- Use a local submit state in the demo rather than implying a server saved the values.

**Candidate components:** `Field`, `Input`, `Button`. Verify each API against [component routing](../COMPONENT_ROUTING.md) and installed source.

## Source limits

- Exploratory / incomplete areas in the reference source: In-line editing inside forms, horizontal dividing Rules between sections, and Accordion forms (beyond dialog bans) do not yet have finalized source guidance.

## Source notes

- Source repeats "### Deciding what to use" three times (under Text inputs, Selection controls, Bound entry controls); headings are scoped clearly under each parent here.
- Source line 168 contains truncated alert heading "DON'T: DON" above the (optional)-on-complex-forms warning; line 243 leaves an authoring placeholder about MultiSelect examples.

## Guidance reference

### Overview

Effective forms ask only for what the workflow truly requires, present controls in logical domain order, and match the validation and button layout to the task length.

#### When to use

Use structured forms whenever users configure resources, enter request parameters, update account or operational records, or submit transactional tasks.

#### Respect the user

- Privacy by design: request only data necessary to complete the task cleanly.
- Logical grouping and sequence: group related controls under clear headings in the order users expect (for instance, given name before family name).
- Low friction: minimize switching between keyboard typing and mouse clicking, preserve compatibility with password managers and browser autofill, and reveal optional branches progressively.

#### Anatomy of a form

1. Labels: identify every control above the input.
2. Text inputs: collect freeform text, secrets, and multi-line notes.
3. Data inputs: constrain selection or structured values via choices and bound pickers.
4. Help mechanisms: helper text, tooltips, placeholders, and safe defaults.
5. Action buttons: commit, advance, or abandon the form.

### Building a form

Select every field control, label marker, help layer, and footer button intentionally so operators finish quickly with minimal preventable errors.

**Examples:** `forms-contact-details`.

#### Labels

Write short, sentence-case labels of one to three words with no trailing colons so eyes scan straight down without visual noise.

##### Top-aligned labels

Place labels consistently directly above every input control to speed vertical scanning and keep horizontal widths flexible across languages.

#### Optional versus mandatory fields

Always mark only the minority state rather than decorating every field on screen.

##### When to mark optional vs. required

On short or mostly mandatory forms, append "(optional)" exclusively to optional fields and leave required fields unmarked. On longer or complex forms where most inputs are optional, append "(required)" exclusively to mandatory fields.

##### Best practices for field requirement marking

Apply one rule consistently across all sibling forms of the same category across the platform, and cluster numerous optional fields into their own clearly headed section.

#### Text inputs

Choose between single-line text inputs, masked password fields, and multi-line text areas based on expected answer length, and place initial focus on the first required field upon form entry when appropriate.

#### Data inputs

Replace freeform typing with structured controls whenever allowable values are enumerable or bounded.

##### Selection controls

Use checkboxes, radio groups, switches, dropdowns/selects, and file uploaders to constrain discrete picks:

| Control                          | Use rule & layout constraint                                                                                                 |
| -------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| Radio buttons                    | Mutually exclusive picks up to 5 choices stacked vertically; pre-select the safest default and add "None" if null is allowed |
| Checkboxes                       | Multi-select independent choices up to 5 options stacked vertically                                                          |
| Toggle / Switch                  | Instant binary on/off preference with immediate effect; label the controlled attribute clearly                               |
| Select / Combo box / Multiselect | Mandatory swap whenever choices exceed 5 options so long lists do not overwhelm form flow                                    |

**Examples:** `forms-optional-checks`.

##### Bound entry controls

Use number steppers, sliders, date pickers, and time pickers whenever inputs follow strict numeric bounds or calendar constraints—preventing malformed entries upfront so freeform text validation is unnecessary.

#### Offering help

Reserve each help layer for a clear role so hints remain accessible after typing starts:

##### Tooltips

> **do:** Pair optional background clarifications with an outlined "i" info icon trigger beside the label (or inside internal-label fluid inputs).

> **dont:** Do not use question-mark (?) icons or hide essential formatting rules behind hover/focus tooltips.

##### Helper text

> **do:** Place concise, essential rules directly under labels (shorter than the input width) where text stays visible during focus. When two side-by-side controls differ in helper length, top-align the input boxes themselves rather than misaligning boxes to keep labels level.

> **dont:** Do not write full paragraphs inside field helper text.

##### Placeholder text

> **do:** Limit placeholders to brief, anonymized example formatting cues that reinforce (never replace) the label and helper text.

> **dont:** Never rely on placeholder text as a substitute for visible labels or essential instructions, because placeholders vanish on input.

##### Default values

Pre-fill safe, verifiable defaults—such as today’s date on start pickers or standard environment quotas—only when accuracy is high and unintentional submission carries low risk.

#### Buttons

##### Button alignment and margins

| Form surface          | Horizontal edge / layout   | Primary vs. Secondary order                                                                 |
| --------------------- | -------------------------- | ------------------------------------------------------------------------------------------- |
| Standard in-page form | Left-aligned with margins  | Primary farthest left, Secondary (Cancel) right of it                                       |
| Multi-step wizard     | Right-aligned with margins | Secondary (Cancel) left of Primary Next / final verb on the right                           |
| Dialog or Side panel  | Full-width bottom bleed    | Cancel left, single Primary action farthest right (stack with Primary lowest if copy wraps) |

##### Keep action bars at the bottom of the form

> **dont:** Never place form submit buttons above fields at the top of a page; anchor actions below the last input (48px gap) so natural top-to-bottom progression leads to submission.

##### Naming form actions

Avoid generic "Submit" buttons—name the real outcome ("Save plan", "Create route", "Request flight"). Never use a secondary footer button labeled "Back" inside stepped forms; let users return through clickable progress steps, breadcrumbs, or browser history while reserving secondary buttons for Cancel.

### Behavior

#### Errors and validation

Surface validation feedback close to the broken field without clearing valid user work.

**Examples:** `forms-validation-recovery`.

##### Client-side validation

Validate format and required rules when focus leaves each control (on blur) rather than nagging mid-keystroke or only on submit, and remove the inline error immediately once corrected.

##### Server-side validation

Pair server rejection messages with an inline alert summarizing what prevented saving alongside targeted field errors, clearing resolved errors cleanly on re-submission.

#### Enabling and disabling buttons

Reserve pre-validation disabling strictly for short, compact forms whose entire input set fits comfortably above the fold. On longer forms where offending fields may scroll out of sight, keep the primary submit button enabled so clicking validates and focuses the error—disabling the button only during active in-flight submission to prevent duplicate posts.

#### In-line editing

> **Source limit:** Source limit: consolidated guidance for in-line table or value editing inside forms is incomplete in the maintained local reference.

#### Designing for longer forms

Structure complex workflows so operators tackle manageable decisions sequentially rather than facing a wall of unrelated fields:

##### Progressive disclosure

Hide secondary or branch-specific inputs until an earlier choice makes them relevant.

##### Accordion forms

> **Source limit:** Never embed accordion sections inside dialog forms; accordion form patterns on full pages remain exploratory without consolidated reference standards.

##### Multistep forms

Divide distinct procedural phases across numbered progress steps, preserving entered answers whenever users revisit earlier steps via the progress indicator.

**Examples:** `forms-multistep-request`.

### Designing a form

#### Layout and headings

Pair a clear page or container title with concise group/section subheadings organizing fields into scannable clusters.

#### Spacing

Use standard 40px default input heights. Apply 32px vertical spacing between inputs on spacious full pages versus 24px or 16px inside compact dialogs/panels, widen to 32px–40px before distinct field groups, and allow 48px before action buttons. Horizontal hairline dividing rules across form sections currently lack finalized source guidance.

#### Columns

Default to a single vertical column so gaze travels straight downward. Combine two or three inputs horizontally only when they form one tight conceptual cluster—such as First / Middle / Last name, City / State / Postal code, or Card / Expiration / CVC.

### Variants

Size the host container to field volume and whether page context must remain readable:

#### Dialog forms

**Use when:** Self-contained interruptions holding fewer than 5 fields.

**Avoid when:** Flows exceeding 4 fields, needing vertical tabs/accordions, or requiring background page access.

#### Side panel forms

**Use when:** Forms of 5 or more fields, repeated editing tasks, or entry tasks benefiting from live reference to the page behind (without tabs or accordions).

### Accessibility

Wrap inputs in semantic form elements, associate labels and error messages programmatically, maintain predictable visual Tab order, avoid hiding formatting syntax inside disappearing placeholders, and declare overall form rules and required conventions before users begin traversing inputs.

### Related components and patterns

**Related:** Text inputs, Checkbox, Radio, Switch, Select, DatePicker, NumberField, Slider, Common actions, Dialogs, Fluid styles, Notifications.

## Interactive and visual examples

### Collect mission contact details

- Example ID: `forms-contact-details`
- Type: **Interactive**
- Source mapping: mapped — `building-a-form`
- Scenario: Collect essential contact fields with clear labels, helper text, and minority-only optional indicators.
- What it teaches: A form gathers the information needed to complete a task, with labels and required/optional status that users can understand.
- Decision shown: Ask only for necessary details, mark only the minority state ((optional) on mostly required forms; (required) on complex mostly optional forms), and default to single-column stacking unless fields form a tight cluster.
- Consider: Use concise 1–3 word labels without colons, avoid placeholders as labels, and top-align adjacent inputs when helper lengths differ.

### Validate and recover from missing information

- Example ID: `forms-validation-recovery`
- Type: **Interactive**
- Source mapping: mapped — `behavior-errors-validation`
- Scenario: Catch client errors on blur, clear resolved errors immediately, and distinguish server-side rejection feedback.
- What it teaches: Validation tells users which input needs attention and how to fix it before they continue.
- Decision shown: Run client checks when focus leaves a field (on blur), keep submit buttons enabled on longer forms so users can locate scrolled errors, and show an inline alert for server rejections.
- Consider: Keep entered values intact, associate each message programmatically with its field, and clear fixed errors immediately.

### Break a long mission request into steps

- Example ID: `forms-multistep-request`
- Type: **Interactive**
- Source mapping: mapped — `longer-multistep-forms`
- Scenario: Organize an extended multi-phase request across progress steps while preserving entered values across steps.
- What it teaches: A multi-step form divides a longer task into manageable stages with linear progress orientation.
- Decision shown: Use wizards for genuinely multi-stage tasks, aligning actions on the right (secondary Cancel left of Primary Next / final completion label) rather than placing a "Back" button on secondary footer controls.
- Consider: Let users return to earlier stages via the progress indicator or breadcrumbs without losing entered values.

### Select optional checks for a mission request

- Example ID: `forms-optional-checks`
- Type: **Interactive**
- Source mapping: mapped — `data-selection-controls`
- Scenario: Present independent multi-select options in a vertical checkbox group (switching to Combobox/Multiselect beyond five items).
- What it teaches: Checkboxes let users select independent optional checks that can apply together.
- Decision shown: Stack Checkbox or Radio controls vertically when options are <= 5 (switch to Select/Combobox when > 5); use Checkbox for non-exclusive sets and Radio with a safe default when mutually exclusive.
- Consider: Pair bound inputs (NumberField, Slider, DatePicker) for bounded numerical or calendar values to eliminate unnecessary freeform validation errors.

## Maintenance rule

Treat the catalog as the source for status, summary, component shortlist, and design decisions. Treat page content as the source for section guidance and demo teaching. Treat the rendered demo as evidence only for the behavior it visibly implements. Update this guide and [pattern routing](../PATTERN_ROUTING.md) when the pattern changes. Never treat local examples as production services or operational policy.
