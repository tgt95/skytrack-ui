# AGENT_GUIDE — building UI with `skytrack-ui`

This is a detailed package reference, not a required full read for every UI task. Follow the root
[`AGENTS.md`](../../../AGENTS.md) router: scan the component decision index, open only shortlisted
component guidance, and consult only the heading below that answers a package-wide question. Do not
load the full guide by default.

---

## 1. Package status snapshot — verify for the target

`skytrack-ui` is a **private React component library** built on
[Base UI](https://base-ui.com) + Tailwind CSS v4, themed with IBM Plex Sans / IBM Plex Mono.

- It is `"private": true`, version `0.1.5`, consumed as a **local tarball**
  (`dist-lib-tarball/skytrack-ui-0.1.5.tgz`).
- **No npm registry destination has been chosen.** Never write code that assumes
  `npm install skytrack-ui`, a registry scope, or a Git URL.
- Source inspection does not establish rendered appearance, focus, cursor, overflow, or ARIA
  behavior. Do not report "looks right" unless you rendered and inspected the exact state.

## Owner-approved implementation policy

Product and visual decisions are owned by [UI_RULES.md](UI_RULES.md); implementation workflow is
owned by [`implementation.md`](implementation.md).
This guide supplies package-specific detail only. For component decisions, start at the active
[component decision index](knowledge/COMPONENT_ROUTING.md), then read only the matching audience
page and relevant guide heading. Verify API facts against the target package's source and types.

## 2. Inspect before you write

Never code from memory or from this guide alone. The installed version is the source of truth:

1. `cat node_modules/skytrack-ui/package.json` — read `version`, `exports`, `peerDependencies`.
   The `exports` map is the authoritative list of importable entry points.
2. `cat node_modules/skytrack-ui/README.md` — the shipped README for the version you have.
3. Confirm every export you use exists. The root entry lists names explicitly with no `export *`,
   so a missing name is a compile error, not a silent `undefined`.

### Load the installed theme before implementation

Import `skytrack-ui/styles.css` exactly once from the consumer app entry point. Confirm that
`node_modules/skytrack-ui/package.json` exports `./styles.css`, open the installed CSS and its
referenced font assets, and record those reads in delegated work. This import supplies the package
tokens, compiled component utilities, global base styles, and fonts; importing Tailwind alone or
copying CSS from the repository source does not replace it. Before attributing a heading-font or
component-style defect to the library, verify the stylesheet import and computed browser styles.

If the installed version disagrees with this guide, the installed version wins — say so.

### Library-first decision gate

Before coding, list each distinct visible UI need in a concise component-coverage map: control,
status, data presentation, or interaction; include nested visuals such as a meter or badge inside a
table cell. A parent card/table does not cover its child needs. For each candidate record the
  installed version/export, declaration path, actual runtime implementation path, compatible demo,
optional DEBUG read-log entries, and decision. Group repeated instances. For a single isolated repair, keep the map
inline in working notes. A router scan is discovery only and does not complete the map.

In a consumer app, inspect `node_modules/skytrack-ui/package.json` and the files resolved by its
exports. The installed artifact is the API authority. A same-version source checkout or guide does
not prove that a rebuilt tarball contains the same exports or implementation. If source docs and
the installed artifact differ, record both exact paths and the mismatch; do not use the missing
source API in the consumer or silently replace the dependency. For a test explicitly using a local
tarball, record its exact path and SHA-256, then verify the installed package against that artifact.
Name the exact export subpath and confirm it exists in the installed manifest. Declaration/runtime
evidence must resolve inside the installed package; a same-version source checkout is not a
substitute. Use the closest demo as a composition reference only after checking every used part and
prop against the installed types and runtime.

Read logging is off by default. Only when the environment is exactly `DEBUG=true`, create/append
`FILE-READ-LOG.md` through
`DEBUG=true node skills/skytrack-ui/references/scripts/read-and-log.mjs --path <file> --reason <why>` from the
assigned workspace. For a multi-section guide, use `--heading "<exact heading>"` or a narrow
`--lines` range; the helper displays only relevant content while hashing the full file. The checker
then validates timestamps, hashes, method, scope, and citations. A full-file read of this guide
fails preflight only when DEBUG logging is enabled for ordinary UI implementation and rule-probe
tasks; read only headings needed for the routed decision. For a task explicitly auditing the entire
guide, pass `--allow-full-guide-read` to both preflight and final checker commands. When DEBUG is not
exactly `true`, do not invoke the logger or create/append a read log; leave map log-entry cells blank
or `—`. In both modes, inspect the root router, package rules, installed manifest/export, declaration,
runtime implementation, and compatible demo as applicable. A coverage-map row is verified by its
exact evidence paths and decision; the final code review must confirm the mapped candidate is used.
Run the shared `audit-ui-handoff.mjs --stage preflight` gate before writing UI for those needs, adding
`--read-log` only when DEBUG is enabled. A failed/skipped gate blocks implementation; a
component/export/version change requires fresh evidence and a gate rerun. Save the generated
`PREFLIGHT-GATE-RESULT.md`; final audit checks its coverage/IA hashes, optional DEBUG log hash, and
confirms application source changed after the recorded PASS.

Use DataTable when search, sorting, row selection, pagination, or column comparison fit the task.
Use a semantic native table only for a small static lookup when interactive DataTable behavior is
unnecessary or its verified API cannot meet a stated requirement; give each native table its own
map row, compare it with DataTable, and record the concrete reason. Count authored semantic markup
accurately; do not report zero custom tables when hand-written table markup exists. For every inline bar/range indicator, separately compare installed
Meter, Progress, and Chart candidates; do not hand-build a filled div/span when one fits the meaning.
For historical, comparative, aggregate, or distribution data, use the installed Chart composition
when it fits. Do not replace it with hand-built bars or Progress.
Map each distinct chart question as its own need. A time trend and a category/outcome distribution
remain separate rows even when both use ChartContainer/BarChart; reconcile each to the exact JSX
range that renders it. MeterIndicator derives fill from Meter.value; never add a second width to it.

Before coding, read the applicable root router, implementation guide, this package guide,
`UI_RULES.md`, and component routing index. When `DEBUG=true`, the shared `--stage preflight` checker
requires these chronological reads and rejects app source changed before them; a guide read after
coding cannot retroactively pass. For a pinned local-tarball consumer/probe, pass its exact artifact with
`--package-tarball`. The checker compares installed and archived file sets in both directions,
compares each file byte-for-byte, and records the artifact hash before preflight and final review.
Never edit the installed package in
`node_modules`; investigate an install mismatch in a fresh case instead.

Run the gate and stop if it fails. At handoff, run `--stage final` with component-typography,
semantic-color, radius audits, the same preflight record, and the same `--package-tarball`. A native
HTML table is a separate need even when the same screen also uses `DataTable`. Check that chart data colors are consumed by the actual mark props;
declared but unused color fields do not count. A failed audit or code/map/report mismatch blocks
completion.

In `IMPLEMENTATION-RECONCILIATION.md`, add a `Component map reconciliation` table with one source
and DOM row per numbered coverage row. Name the implementation actually rendered, cite its source
line, and describe the element/role the coordinator must verify in the browser.

Create a local component or custom UI only after identifying a concrete unmet requirement. A visual
preference alone does not justify replacing an available component. Fix a confirmed appearance
defect through a verified prop, slot, class, or composition first. A fallback is justified only when
required behavior, semantics, accessibility, or a visual constraint cannot be met by the installed
component or its verified parts. Record the gap and why the supported composition fails. Keep the
fallback minimal and preserve library components around it.
Do not add the fallback to the shared library unless that change is in scope.

### Match the documented component composition

Before implementing a component, find its closest example in `src/demos/<component>.demo.tsx`
and inspect `src/components/ui/<component>.tsx` plus its exported types. Use the demo as the
composition pattern only after confirming that it matches the package version used by the app.

- In the library source checkout, the current component implementation, types, and `package.json`
  exports define the available API; the matching demo shows the intended composition.
- In a consumer app, the installed package version, exports, and types define the available API.
  A source-checkout demo is only applicable if it matches that installed version.
- Preserve the verified part names, nesting, portal/positioner layers, and semantic elements.
  Do not invent parts or props, swap in native HTML, or hand-build a substitute for a component
  that the library already provides.
- Apply visual differences through supported variants, `className`, and `style`. Do not copy a
  component's internals into screen markup.
- For headings, choose the semantic HTML element from the document outline; choose visual
  typography from the role rules below. A bare `h1`–`h6` element does not receive SkyTrack UI
  heading styles. Use the default heading class when it fits. An explicit reference may require a different
  visual scale using DS tokens and Tailwind utilities.
- If no matching demo exists, derive the composition from the implementation and types. If a
  required part or behavior still cannot be verified, state the gap instead of guessing.
- Preserve the heading role class (`.h3`, `.h4`, or documented group-heading style) unless a
  reference justifies a visual override. When a browser is available, verify computed `font-family`
  and that the heading font loaded. If it does not, inspect the stylesheet import and emitted font
  assets before changing size or adding a local font workaround.

### Heading roles

Use semantic heading tags that preserve the document outline, independently of visual size. For
example, a page title is usually `<h1 className='h3'>` because page titles use the `.h3` visual
style. Do not change heading semantics just to match a visual class.
For a marketing site or landing page, the Hero title uses the display style
`@apply text-5xl lg:text-7xl heading`. This is a context-specific exception to the `.h3` page-title
default. Keep the Hero title semantic (usually `<h1>`); apply the display style through the page's
stylesheet and existing Hero selector.

| Role                                                      | Visual style                                       |
| --------------------------------------------------------- | -------------------------------------------------- |
| Page title                                                | `.h3`                                              |
| Card title — Level 1                                      | `.h4`                                              |
| Card title — Level 2: group title grouping Field controls | `@apply text-lg font-medium text-(--foreground)`   |
| Card title — Level 3: subgroup title                      | `@apply text-base font-medium text-(--foreground)` |

Use the Level 2 and Level 3 declarations in a named CSS class with `@apply`; when the component is
styled inline, use the equivalent Tailwind utilities. Keep each title as a semantic heading element
at the level required by the page outline.

Before coding, record every visible heading in the IA outline with its text, parent, semantic
element/level, visual hierarchy level, and required class. Visual role follows the content outline,
not the HTML tag: a heading directly inside a Level 1 card is Level 2 and uses `text-lg`, even when
the semantic element is `<h3>`. Its nested subgroup is Level 3 and uses `text-base`. Check every
inventory entry against implementation; do not assign a visual role from the tag name alone.

Each page route also needs one semantic `<main>` landmark. Record all landmarks in the IA outline.
For delegated/substantive UI work, map each outline landmark and heading to its source location and
rendered DOM tag/role in `IMPLEMENTATION-RECONCILIATION.md`. An outline row without implementation
evidence is a handoff failure.

### Component typography defaults and exceptions

Let text inherit the typography set by its owning `skytrack-ui` component or parent. When neither
sets a size, use the body's default. Do not add `text-base` just to normalize ordinary copy or to
override a component's own `text-sm`, `text-xs`, or other documented size. Component defaults are
intentional; a below-body default is not automatically a defect or an exception.

Use explicit size utilities only when a named visual role, documented component variant, or
verified design requirement calls for them. Use the established `.h3` page-title and `.h4` card-title
roles, with semantic heading elements selected independently from the document outline. A Report
card title uses `.h4`; do not require a specific tag level solely for that visual style. Keep
`.sub-heading` limited to its documented eyebrow, assistive-label, sidebar-group, and option-menu
group roles. Set control values to human-readable labels rather than raw values such as `all`.

For substantive or delegated UI work, record relevant component typography in
`COMPONENT-TYPOGRAPHY-AUDIT.md`: component/slot, installed default, effective size, role, any
override, and exact source/type/demo evidence (add read-log IDs only when `DEBUG=true`). Distinguish library defaults from consumer overrides; a
library default below `text-base` does not need to be justified as an exception or reset. Audit
authored below-base/arbitrary utilities and deliberate changes. Status labels remain decision data;
do not restyle them merely to satisfy a generic font-size baseline.

Preserve component-owned typography, casing, tracking, and documented visual defaults. Use public
props, slots, and supported compositions for a task-specific requirement. Do not target internal
library classes from consumer CSS to standardize appearance or satisfy a visual preference; do not
add a styled child around a label merely to counter the component's typography.

An internal-class CSS override is allowed only to repair a reproduced functional or accessibility
defect after verifying that no public API, supported slot, or composition can fix it. Visual
preference, density alone, or a wish to make every component 16px is not an exception. The agent
may make an evidence-complete repair without prior Owner approval. Scope the selector under a
unique wrapper to the exact component/class; never use a global selector. Record the inspected
API/types, package version and runtime source, closest demo, attempted alternatives and why each
failed, plus a screenshot or reproducible steps. Validate the repaired behavior/accessibility and
include the evidence in the handoff. Missing evidence fails the handoff.

For example, preserve the installed `DataTable` header/cell defaults and use ordinary string
headers when sufficient; do not add `text-base` header spans or blanket CSS. Preserve `Badge`
default size, uppercase styling, and tracking; do not add `text-base`, `normal-case`, or consumer CSS
to normalize it. Use documented variants only when the task specifically calls for them. Follow
[UI_RULES.md](UI_RULES.md) for full policy and [implementation-gates.md](implementation-gates.md)
for required checks.

Treat column visibility as optional and IA-driven; the `DataTable` demo does not require every
table to expose show/hide columns. In checked package version `0.1.5`, the component always renders
that control and has no table-level disable prop. Verify the installed version; do not hide the
internal control with consumer CSS or invent an API. If its unavoidable presence materially conflicts
with the table's IA, select another supported composition only when it meets the required data and
interaction needs. Omitting the control does not need a separate note.

Before handoff, compare the typography audit with code and inspect the rendered result when font,
token, or stylesheet delivery could fail. Verify page and card heading font families when browser
inspection is available. Don't treat component defaults as text-size exceptions.

Do not show implementation-policy notes as product copy unless they aid the user's task. Mark
synthetic sample values where they could be mistaken for live operational data. Never invent numeric
safety thresholds, severity cutoffs, regulatory claims, imperative operational directions, or the
name/section/authority of a handbook or policy. A source citation is valid only when the source was
provided or actually inspected; when `DEBUG=true`, the read log must also show it was opened. A
sample disclaimer does not validate an invented policy.
Use cited Owner/source policy; when none is supplied, say that policy is unavailable and refer
people generically to approved operating guidance. Do not infer flight actions from synthetic
values. If a local demo simulates an operational action, label its UI result as simulated and say
that no live system changed. Check badges and labels at their rendered width: clipping, overlap,
overflow, or fragmented wrapping fails visual review.

For substantive screen content, treat this as a hard evidence gate: inventory each rendered
per-record `nextAction`, every numeric safety threshold/cutoff, and each operational recommendation
in `CONTENT-AUDIT.md`. Add a `Source evidence` column with an opened `file:line` and exact quoted
excerpt for sourced claims. “Prompt requirement,” “official guidance,” and “design policy” alone
are not citations. Worker-created sample values may be used only as explicitly synthetic data; they
do not support safety thresholds or flight instructions. Only the exact cited excerpt supports the
wording it contains; another line in the same file does not authorize unrelated claims. The
implementation and generated audit/report files are not policy sources. Give repeated per-record
actions separate rows. If no supplied/opened source authorizes a directive, remove it or state
neutrally that no authorized action is supplied and refer to approved guidance. The audit checker
validates exact excerpts, row coverage, and uncited directive/threshold patterns.
For category distributions with displayed percentages, calculate each share as `count / total × 100`,
state the rounding precision, and record `Displayed rounded shares: sum(...) = N%` in the consistency
calculation. Verify the sum against the values rendered in the chart/table. Do not say rounded shares
sum to 100.0% when they do not, and do not silently adjust a category to force the total.

For a browser-reviewed page, exercise at least one primary action and one meaningful control. Check
the visible state/result after interaction, not just that the trigger exists or has a handler.
Control values must be human-readable, and date/range labels must match the represented dates; only
use Q1/Q2 when the applicable fiscal calendar is explicitly known.
Worker-authored interaction rows stay PENDING/NOT RUN. The coordinator alone records PASS after
desktop browser interaction and cites a saved screenshot or DOM evidence file for each passed row.

For a delegated handoff, log each prompt/instruction file actually opened only when `DEBUG=true`.
If instruction text was injected by the runtime without a file read, report it as injected, not as
a file read. With logging off, do not create a read log or report a read-log count. Reconcile every
material handoff claim against exact code and evidence; a map or narrative that claims
`text-base`, a component, token, or policy compliance when the implementation contradicts it fails
the gate. Keep implementation-only notes (for example, “square mark radius applied per design
rules”) out of product UI.

### Radius

`--radius` is the default surface/control radius and resolves to 2px. Use `rounded-(--radius)` or a
standard utility proven to resolve to this token. Avoid `rounded-full` and larger custom radii on
ordinary surfaces, badges, tracks, thumbs, and controls. Keep full circles only for genuinely
circular elements such as avatars, radio controls, and status dots. Chart bars/areas use square
corners (`radius={0}` or equivalent); chart containers still use the 2px surface token. Before
handoff, scan custom classes and chart props for radius bypasses, then inspect computed radius on
representative surfaces and controls when browser access is available. Do not use literal radius
values in CSS or inline styles when the token fits; use zero only for intentional square geometry.
For substantive/delegated work, record every authored rounded utility, literal radius, and chart-mark
radius in `RADIUS-AUDIT.md`; the final audit rejects non-token radii and undocumented circular shapes.

### Container padding and form spacing

Use these default inner paddings for cards and content containers, based on their nesting level:

| Level                               | Default padding | Tailwind |
| ----------------------------------- | --------------: | -------- |
| 1 — outer section or top-level card |            24px | `p-6`    |
| 2 — nested card or content group    |            16px | `p-4`    |
| 3 — nested subgroup                 |            12px | `p-3`    |
| 4 — compact nested content          |             8px | `p-2`    |

Levels describe nesting within a screen, not fixed component variants. Start with 24px for a
standalone top-level card. Reduce padding as content nests. Use a smaller level only when the
content density or verified design calls for it; do not add padding to a component that already
owns its internal spacing.

Apply this padding scale only to a visual surface: a card or section with its own background,
border, or other visible boundary. Layout-only wrappers used for grid, flex, alignment, or spacing
must not receive padding by default. Avoid adding padding when a component already owns its internal
spacing.

Within a card, separate distinct content groups by 24px (`gap-6` or `space-y-6`). Keep a group
heading 12–16px from its content (`gap-3` or `gap-4`), choosing the smaller gap for compact layouts.
Do not add this group spacing between individual fields; field spacing follows the form rule below.

Use 16px (`gap-4`) as the default spacing between fields in a form, both vertically and
horizontally. Use a responsive grid: one column on narrow screens and one to two columns as the
desktop baseline. When short, same-level fields benefit from higher density, allow up to four
columns. Set each field's span from its control type and expected content length; do not force equal
columns when content needs different widths. Keep logical mobile order. Keep spacing inside each
field separate from the gap between fields; follow the field component's verified composition for
label, control, description, and error spacing.

For visual work, run the focused typecheck and inspect the rendered state in the existing browser
session. Check the states that affect the requested composition, such as multiline values, open
menus, validation, focus, and disabled controls.

### Implementing from a visual reference

For faithful reproduction, treat the supplied screenshot or mockup as the source of truth for
visual appearance, page content, and structure. For inspiration work, follow the agreed interpretation.
Before coding, map its visible hierarchy, section order, labels, table columns, filters, density,
alignment, and selected/error states. Preserve those details. Apply `skytrack-ui` components,
variants, styles, and tokens to that structure; do not replace the reference with a generic page
that happens to use the same domain or component library.

When another agent implements the screen, pass the actual reference image as an attachment or a
local image file it can open. A short text summary alone is not an equivalent visual input. Name
the exact route, identify each image separately, and give a checkable structure/content checklist.
If the image is unavailable to the implementing agent, stop before inventing its layout and ask for
the image or an approved written specification. Before handback, render the route and compare it
against the supplied reference at a similar viewport; report any unverified visual check.

### Semantic data-table pattern

The current `skytrack-ui` package exports `DataTable` from `skytrack-ui/data-table` and the root
entry. It composes a headless TanStack table with semantic HTML and SkyTrack controls. Inspect the
installed version's types/source before use; do not invent a generic `Table` import. Use
`DataTable` when its supported API fits the task. Use semantic HTML `<table>`, `<thead>`, `<tbody>`,
`<tr>`, `<th>`, and `<td>` for a local table pattern only when a requirement is outside that API,
and compose supported SkyTrack controls around or inside it.

Use the [`DataTable` demo](../../../src/demos/data-table.demo.tsx) as a composition reference for its
supported search, sorting, optional column visibility, row selection, pagination, and row actions.
Choose only the controls that the table's IA and task need; the demo is not a feature checklist.
For a custom semantic table, use the [Invoice table example](../../../src/showcase/overview-style.tsx)
for markup and token styling. Check that the chosen demo matches the installed package version
before composing a table in a consumer app.

Keep the reference's exact visible column labels and order, row content/density, filter labels,
toolbar grouping, selection controls, and pagination. Put wide tables in a local `overflow-x-auto`
wrapper. Use `border-border`, `bg-muted`, `text-muted-foreground`, and other semantic tokens;
use `tabular-nums` for numeric values and the library's `Badge` for status values. Use `TabsList`
with the variant that matches the reference (`filled` for a segmented group, `line` for underline
tabs); do not select a variant by habit. Use `InlineEdit` or the relevant supported field control
for editable cells. Keep semantic table markup even when the library provides its controls.

## 3. Install (consumer app)

```bash
# In the skytrack-ui repository root, once per clone:
npm install
npm run pack:local        # build:lib + npm pack -> dist-lib-tarball/skytrack-ui-<version>.tgz

# In the consuming app:
npm install /abs/path/to/skytrack-ui/dist-lib-tarball/skytrack-ui-0.1.5.tgz
```

Pin the exact tarball path you were given. `react` and `react-dom` are **peer dependencies**
(`^19.0.0`): the consumer owns them, so there is exactly one React copy at runtime. Never add
`react`/`react-dom` to fix a hook error — that creates a second React and breaks hooks. If you see
invalid-hook-call errors, find the duplicate React instead.

Installed automatically: `@base-ui/react`, `class-variance-authority`, `clsx`, `tailwind-merge`,
`@phosphor-icons/react`, `zod`. TypeScript is not shipped; the `.d.ts` files are standard
declarations that type-check under `tsc --strict` with `moduleResolution` `bundler` or `node16`.
Pair them with React 19 and `@types/react@^19`.

## 4. Importing

**Root import** — every component is a named export:

```tsx
import { Button, Input, cn } from 'skytrack-ui'
import 'skytrack-ui/styles.css'
```

**Per-component subpath** — the same component, imported directly. Each subpath also exports that
component's own helper names unchanged, e.g. `skytrack-ui/tooltip` exports `createHandle`:

```tsx
import {
  Tooltip,
  TooltipArrow,
  TooltipPopup,
  TooltipPortal,
  TooltipPositioner,
  TooltipProvider,
  TooltipTrigger
} from 'skytrack-ui/tooltip'
```

There are 44 subpaths, one per component: `accordion`, `alert`, `alert-dialog`, `attachment`,
`autocomplete`, `avatar`, `badge`, `breadcrumb`, `button`, `checkbox`, `checkbox-group`,
`collapsible`, `combobox`, `context-menu`, `dialog`, `drawer`, `dropzone`, `field`, `fieldset`,
`form`, `inline-edit`, `input`, `menu`, `menubar`, `meter`, `navigation-menu`, `number-field`,
`otp-field`, `popover`, `preview-card`, `progress`, `radio`, `scroll-area`, `select`, `separator`,
`sidebar`, `slider`, `switch`, `tabs`, `toast`, `toggle`, `toggle-group`, `toolbar`, `tooltip`.

**Root aliases.** `createHandle` is exported by six components, so the root does **not** export
that bare name. Use the stable aliases: `createAlertDialogHandle`, `createDialogHandle`,
`createDrawerHandle`, `createPopoverHandle`, `createPreviewCardHandle`, `createTooltipHandle`.
Use the subpath's own `createHandle` if you prefer the unaliased name.

**Plain HTML cannot import these components.** They are React components only — no vanilla-JS,
HTML-only, or web-component build. There is no Preact/Solid build either.

## 5. Styling

### Import the stylesheet once

```ts
import 'skytrack-ui/styles.css'
```

This is the only thing that turns the theme on. Import it **exactly once**, at your app entry. It is
compiled Tailwind with `source(none)` and `@source "./components"`, so it already contains every
utility the shipped components use — **you need no Tailwind, plugin or `content`/source config in
the consumer app.**

### Global reset — caution

`styles.css` is global. It includes Tailwind's preflight reset, sets `body` to
`--background`/`--foreground` on IBM Plex Sans, sets `code`/`kbd`/`samp`/`pre` to IBM Plex Mono,
and defines `--radius` (`0.125rem`, 2px) plus the `rounded-*` scale globally. All component corner
radii use `rounded-(--radius)`; circular shapes keep `rounded-full`, and intentional square seams keep
`rounded-none`. If your app already ships its
own Tailwind or reset, import this file once and be aware of the cascade — component styling
depends on these tokens existing.

### Cursors

Every enabled interactive part already ships `cursor-pointer` (buttons, toggles, triggers, links,
menu and select items, chips). Do not add it again. Readonly parts are not uniform: `Radio` uses
`cursor-default`, while `NumberField` and `OtpField` readonly inputs only render `bg-muted` and
keep the native cursor. Disabled parts vary — some keep their own `cursor-not-allowed`, while
`Button`, `Toggle` and toolbar buttons use `pointer-events: none` with no cursor override (the
inherited cursor shows, not `not-allowed`). The number-field scrub area keeps `cursor-ew-resize`.

### Use tokens, not raw values

Style with the semantic utilities that map to the CSS custom properties: `bg-background`,
`text-foreground`, `text-muted-foreground`, `bg-primary`, `text-primary-foreground`,
`border-border`, `border-input`, `ring-ring`, `bg-destructive`, `text-destructive`, `bg-accent`,
`text-success`, `bg-success`, `text-warning`, `bg-warning`, `text-info`, `bg-info`, and
`text-favorite`. Never use raw palette classes such as `text-amber-600` or `bg-emerald-500` to
encode semantic status. Use `success`, `warning`, `destructive`, and `info` only for their matching
meaning; use `favorite` for favorited or starred state, not for warnings. For chart categories,
prefer the installed chart's categorical palette. If none exists, derive colors from existing CSS
variables with `color-mix()` or relative OKLCH, check contrast in light and dark themes, and retain
labels or other non-color cues. Record any token gap; do not add shared tokens without authorization.

### Use shorthand for boolean data variants

Write Tailwind's named data variant for boolean attributes: use `data-filled:` instead of
`data-[filled]:`, and `group-data-filled/field:` instead of
`group-data-[filled]/field:`. This avoids Tailwind's arbitrary-variant warning and keeps state
selectors consistent. Keep bracket syntax when matching an attribute value, such as
`data-[orientation=vertical]:` or `data-[side=left]:`.

### Dark mode is class-based

Dark mode is wired as `@custom-variant dark (&:is(.dark *))`. Add `dark` to `<html>` (or any
ancestor) to switch the token set. There is **no** automatic `prefers-color-scheme` wiring and no
theme script — the consumer decides how the class is toggled and persisted:

```ts
document.documentElement.classList.toggle('dark', prefersDark)
```

### Fonts

`html` and `body` get IBM Plex Sans (400/500/600/700). All 88 IBM Plex font files ship under
`dist-lib/assets/` with relative URLs, so any deploy base path works; a bundler may inline them as
`data:` URIs. Both forms build.

**Mono, with the caveat that matters.** The `@theme inline` mapping does **not** emit a
`--font-mono` variable, and the `font-mono` utility is **not** in the shipped CSS — Tailwind only
compiled the utilities the shipped components use, and your app's files are not scanned. So
`className="font-mono"` silently does nothing in a consumer. For monospace text use:

```tsx
<code>SG0138</code>          {/* styled by the base layer — preferred */}
<pre>sg0138</pre>
```

or an explicit family on a non-semantic element:

```tsx
<span style={{ fontFamily: '"IBM Plex Mono", ui-monospace, monospace' }}>SG0138</span>
```

Any _custom_ utility class you invent only works if your app has its own Tailwind build that
scans your files. Do not assume it does.

### Overriding styles

Every wrapper merges `className` last through `cn` (`twMerge(clsx(...))`), so Tailwind conflicts
resolve in your favour:

```tsx
<Button variant="outline" size="sm" className="w-full justify-start">Save</Button>
<Input className="max-w-xs" />
```

Base UI parts also accept `className` callbacks that receive the part state. Keep those callbacks
working when composing defaults: pass them through `cn` without converting them to strings.
`cn` evaluates callback classes with Base UI's state before merging. Do not write
`className as string` to silence a type mismatch.

Pass composition helpers (`className`, `style`) rather than forking a wrapper into a local
component. Prefer shared components over copying wrappers into your app: the wrappers hold the
variant definitions, `focusRing` and `data-[state]` styling that keep screens consistent. Copying
one is a last resort and needs a written reason.

## 6. Composition rules

These matter most — breaking them causes real bugs, not just style drift.

**Keep the compound structure.** Base UI components are multi-part: a `Root` plus `Trigger`,
`Portal`, `Positioner`, `Popup`, and part-specific extras (`Backdrop`, `Viewport`, `Header`,
`Title`, `Arrow`). What the `Root` renders depends on the component: overlay roots (Dialog,
Popover, Tooltip, …) are context/state only and render no element, while others such as
Accordion, Toolbar and Field render real DOM around their parts. Check each component's
exported types/source rather than assuming — do not invent a `Content` part, and only include
the `Portal`/`Positioner` layer for components whose docs/types define it; some components
have no `Positioner` at all. Dropping a layer that exists, or adding one that does not, breaks
positioning, clipping and focus management.

**Preserve native semantic elements.** The parts already render the correct host element and ARIA
wiring (`DialogTitle` renders a heading, `FieldLabel` is programmatically associated with its
control, `MenuItem` is a menu item, triggers are real `button`s). Do not replace them with
`<div onClick>`, `<span>` or hand-rolled `role`/`aria-*`, and do not strip
`DialogTitle`/`DialogDescription` to "simplify" — they are what screen readers announce.

**Never put a trigger outside its root without a documented handle.** A trigger must be inside
its `Root`, or attached to a handle created with `createHandle()` and passed to _both_ the trigger
and the root (`handle={h}` on each). If a trigger must live in a different part of the tree — a
toolbar button opening a dialog in a distant panel — use the handle pattern and say so in a
comment. A `DialogTrigger` outside `Dialog` with no handle may throw rather than merely fail to open.

## 7. Worked examples (real exports)

### Button — all variants and sizes

`variant`: `default` | `destructive` | `outline` | `secondary` | `ghost` | `link`.
`size`: `default` | `xs` | `sm` | `lg` | `icon` | `icon-xs` | `icon-sm` | `icon-lg`.

```tsx
import { useId } from 'react'
import { DotsThree } from '@phosphor-icons/react'
import { Button } from 'skytrack-ui/button'

export function SaveBar({ saving }: { saving: boolean }) {
  // Some browser/screen-reader combinations do not reliably announce changes to a
  // focused button's descendant text, so the changing label is the button's explicit
  // accessible name via aria-labelledby. See Base UI button docs, "Loading states".
  const labelId = useId()
  return (
    <div className='flex items-center gap-2'>
      <Button variant='default'>Save</Button>
      <Button variant='outline' size='sm'>
        Save as draft
      </Button>
      <Button variant='secondary'>Duplicate</Button>
      <Button variant='ghost' size='sm'>
        Discard
      </Button>
      <Button variant='link'>Learn more</Button>
      <Button variant='destructive'>Delete flight</Button>

      <Button variant='outline' size='icon' aria-label='More actions'>
        {/* Phosphor icons are auto-sized and made non-interactive by the wrapper */}
        <DotsThree aria-hidden='true' />
      </Button>

      {/* Loading: focusableWhenDisabled keeps the disabled button reachable;
          aria-labelledby + a stable span id make the label change announced. */}
      <Button disabled={saving} focusableWhenDisabled aria-labelledby={labelId}>
        <span id={labelId}>{saving ? 'Saving…' : 'Save'}</span>
      </Button>
    </div>
  )
}
```

Disabled styling is driven by both `disabled:` and `data-[disabled]:`, so native `disabled` and
Base UI's `data-disabled` states both look right.

### Tooltip — full composition, with arrow

```tsx
import {
  Tooltip,
  TooltipArrow,
  TooltipPopup,
  TooltipPortal,
  TooltipPositioner,
  TooltipProvider,
  TooltipTrigger
} from 'skytrack-ui/tooltip'
import { TextB } from '@phosphor-icons/react'

export function FormatHint() {
  return (
    <TooltipProvider>
      <Tooltip>
        {/* Defaults to variant="outline" size="icon-sm". Always pass aria-label:
            the trigger is often an icon with no text of its own. */}
        <TooltipTrigger aria-label='Bold'>
          <TextB aria-hidden='true' />
        </TooltipTrigger>
        <TooltipPortal>
          <TooltipPositioner sideOffset={11}>
            <TooltipPopup>
              <TooltipArrow />
              Bold
            </TooltipPopup>
          </TooltipPositioner>
        </TooltipPortal>
      </Tooltip>
    </TooltipProvider>
  )
}
```

`TooltipArrow` ships a real triangular glyph and rotates itself per `data-[side]`, so it stays
correct on all four sides. Passing your own `children` takes over that geometry — keep it 10×10.

Detached trigger, using a handle (the only legal way to move a trigger out of its root):

```tsx
import {
  createHandle,
  Tooltip,
  TooltipPopup,
  TooltipPortal,
  TooltipPositioner,
  TooltipProvider,
  TooltipTrigger
} from 'skytrack-ui/tooltip'

const helpTooltip = createHandle()

export function Help() {
  return (
    <TooltipProvider>
      {/* Lives in a toolbar … */}
      <TooltipTrigger handle={helpTooltip} aria-label='What is a waypoint?'>
        ?
      </TooltipTrigger>

      {/* … while the popup is declared here, elsewhere in the tree. */}
      <Tooltip handle={helpTooltip}>
        <TooltipPortal>
          <TooltipPositioner sideOffset={11}>
            <TooltipPopup>A waypoint is a named point in a flight plan.</TooltipPopup>
          </TooltipPositioner>
        </TooltipPortal>
      </Tooltip>
    </TooltipProvider>
  )
}
```

### Controlled Dialog with a validated Field

`onOpenChange` receives `(open, eventDetails)`; `eventDetails.reason` tells you _why_ it changed
(escape, backdrop click, close button, …).

```tsx
import * as React from 'react'
import { Button } from 'skytrack-ui/button'
import {
  Dialog,
  DialogBackdrop,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPopup,
  DialogPortal,
  DialogTitle,
  type DialogChangeEventDetails
} from 'skytrack-ui/dialog'
import { FieldControl, FieldError, FieldLabel, FieldRoot } from 'skytrack-ui/field'

export function RenameDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [name, setName] = React.useState('')

  return (
    <Dialog
      open={open}
      onOpenChange={(next: boolean, details: DialogChangeEventDetails) => {
        onOpenChange(next)
        if (!next && details.reason === 'escape-key') setName('')
      }}
    >
      <DialogPortal>
        <DialogBackdrop />
        <DialogPopup>
          <DialogHeader>
            <DialogTitle>Rename waypoint</DialogTitle>
            <DialogDescription>Give this waypoint a name your crew will recognise.</DialogDescription>
          </DialogHeader>

          <form
            onSubmit={(event) => {
              event.preventDefault()
              onOpenChange(false)
            }}
          >
            <FieldRoot
              name='waypoint-name'
              validationMode='onChange'
              validationDebounceTime={400}
              validate={(value) => {
                const text = typeof value === 'string' ? value : ''
                if (text.length > 0 && text.length < 3) return 'Use at least 3 characters'
                return undefined
              }}
            >
              <FieldLabel>Waypoint name</FieldLabel>
              <FieldControl value={name} onValueChange={(next) => setName(next as string)} placeholder='Entry gate' />
              {/* Bare FieldError renders the message when invalid. */}
              <FieldError />
            </FieldRoot>

            <DialogFooter className='mt-6'>
              <DialogClose>Cancel</DialogClose>
              <Button type='submit'>Save</Button>
            </DialogFooter>
          </form>
        </DialogPopup>
      </DialogPortal>
    </Dialog>
  )
}
```

`FieldControl` reacts to `data-filled`, `data-disabled` and `data-invalid`, so borders,
opacity and the destructive ring update automatically. Put `disabled` on `FieldRoot` to disable the
whole field. Use `Input` instead for a standalone input with no label.

### Labelled controls and validation messages

When a UI control needs a visible label, description, or validation message, compose it inside the
SkyTrack `Field` pattern. Use the styled exports from `skytrack-ui/field`: `FieldRoot`, `FieldLabel`,
`FieldDescription`, `FieldItem`, `FieldError`, and `FieldValidity`. Follow `src/demos/field.demo.tsx`
and the relevant control demo for exact nesting and supported props.

Base UI's raw compound syntax is `<Field.Root>`, `<Field.Label>`, `<Field.Control>`,
`<Field.Description>`, `<Field.Item>`, `<Field.Error>`, and `<Field.Validity>`. SkyTrack exports
styled equivalents as named parts: `FieldRoot`, `FieldLabel`, `FieldControl`, `FieldDescription`,
`FieldItem`, `FieldError`, and `FieldValidity`. Use these styled equivalents in product screens so
the library's spacing, typography, and invalid-state styles apply. `FieldControl` wraps
`Field.Control` for compatible basic controls. For Select,
Combobox, Autocomplete, NumberField, and other compound controls, place their own verified control
parts inside `FieldRoot`; do not replace a trigger/input with `FieldControl` or invent a composition.

Use only needed parts: `FieldLabel` for the visible label, `FieldDescription` for helper text,
`FieldError` for validation feedback, `FieldItem` for a grouped label/control row, and `FieldValidity`
for custom validity details. Put `name`, validation props, and disabled state on `FieldRoot` as shown
in the demo. Bare `FieldError` displays the active validation message. Do not hand-build a label/error
wrapper when this field pattern fits.
Apply `.sub-heading` to page/section eyebrow labels, secondary/assistive labels paired with `FieldLabel`,
sidebar group titles, and option-menu group titles; this class renders those labels uppercase. Add a context-appropriate text-size utility when
needed; use `text-xs sub-heading` for compact field labels. SkyTrack defines `.sub-heading` in
`src/index.css`; do not recreate its uppercase, tracking, weight, or muted-color typography in local
classes. Keep regular page and content heading styles aligned with the heading-role guidance above.

### Shared control heights — inline with Button

`Input`, `FieldControl`, `SelectTrigger`, `ComboboxInputGroup`, `ComboboxTriggerButton`,
`AutocompleteInput`, `AutocompleteInputGroup`, `AutocompleteTriggerButton`, and `NumberFieldGroup`
accept `size='xs' | 'sm' | 'default' | 'lg'`. Their outer control heights match text Button sizes:
24px, 32px, 36px, and 40px. Pass the same size to `NumberFieldGroup` and `NumberFieldInput` so
both the group and its input match Button. `NumberFieldInput` also accepts these sizes standalone.
Its existing `compact` size remains available for 26px inputs.

### NumberField — sizes and inline inputs

`NumberFieldInput` supports `size`: `xs` | `sm` | `default` | `lg` | `compact`.

- `default`: standard 36px (`h-9`), left-aligned, text-sm.
- `sm`: 32px (`h-8`), right-aligned, text-sm.
- `lg`: 40px (`h-10`), right-aligned, text-sm.
- `compact`: 26px (`h-[26px]`), right-aligned, text-xs, full width within its container.
- `xs`: 24px (`h-6`), right-aligned, text-xs, full width within its container. Pairs with `Button` `size='xs'`.

```tsx
import { NumberField, NumberFieldInput } from 'skytrack-ui/number-field'

export function InlineNumericInputs() {
  return (
    <div className='flex items-center gap-2'>
      {/* 26px compact input */}
      <NumberField defaultValue={12.5} min={0} max={100} step={0.5} className='w-24'>
        <NumberFieldInput size='compact' aria-label='Compact coordinate' />
      </NumberField>

      {/* 24px xs input */}
      <NumberField defaultValue={8.0} min={0} max={50} step={0.5} className='w-20'>
        <NumberFieldInput size='xs' aria-label='Extra small value' />
      </NumberField>
    </div>
  )
}
```

## 8. Updating the library, and not breaking existing prototypes

Library-side scripts (run from the `skytrack-ui` repository root):

| Script                                                | What it does                                                                            |
| ----------------------------------------------------- | --------------------------------------------------------------------------------------- |
| `npm run build:lib`                                   | clean `dist-lib` → regenerate exports → Vite JS bundle → CSS + fonts → `.d.ts` → verify |
| `npm run verify:lib`                                  | re-run the `dist-lib` checks alone                                                      |
| `npm run pack:local`                                  | `build:lib` + `npm pack` into `dist-lib-tarball/`                                       |
| `npm run test:consumer`                               | install the tarball offline into a temp app and type-check + bundle it                  |
| `npm run build` / `npm run typecheck` / `npm run dev` | the showcase app, not the library                                                       |
| `npm run generate:exports`                            | regenerate `src/lib/index.ts` + `entries.json` (part of `build:lib`)                    |

**Rebuild and repack whenever the library changes.** Editing `src/` does nothing for a consumer
until `npm run pack:local` runs again. Consumer verification selects the tarball matching the
current `package.json` version, so older tarballs cannot be tested accidentally.

**Upgrade workflow is versioned, and manual.** The tarball filename carries the version
(`skytrack-ui-0.1.5.tgz`) and consumers pin the tarball path they were given. To ship a change:
bump the version (`npm version`), `npm run pack:local`, then have each consumer install the _new_
tarball path explicitly and re-run its type check and build. Never assume consumers pick up a new
tarball automatically, and never run a broad dependency upgrade across a consumer's `package.json`.

**Do not auto-mutate existing prototypes.** If a change alters an existing component's behaviour,
props or DOM, stop and report it. Do not silently rewrite call sites, and do not bump a consumer's
dependency graph on your own initiative. Behaviour changes are an owner decision.

**Vite dev vs installed tarball.** During library development `npm run dev` serves the showcase
straight from `src/`, so edits show up on reload. A consumer that installed the tarball reads a
_frozen copy_ in `node_modules` and will not see any of it. That is expected, not a bug, and
hot reload of `node_modules` is unreliable — re-install the new tarball instead.

## 9. Validating your work

Run what is available, and report what you ran.

**In the library directory:**

```bash
npm run typecheck      # tsc over src + showcase
npm run pack:local     # build:lib + npm pack; includes verify-lib; fails loudly on a broken build
npm run test:consumer  # real, current tarball: tsc --strict (bundler + node16), vite build, Node import
```

Always run `npm run pack:local` immediately before `npm run test:consumer`. `test:consumer`
exercises whatever tarball is in `dist-lib-tarball/`, so pairing it with a bare
`build:lib` (or an older pack) can validate a stale `.tgz` instead of the code you just
changed. These scripts exist only in a source checkout of `skytrack-ui` — an installed
package ships no developer scripts and no `src/`, so consumers never run them.

**In your consuming app:**

1. **Import/type/build** — `tsc --noEmit` and a production build. Catches unknown exports, wrong
   prop names, and a missing `import "skytrack-ui/styles.css"`.
2. **No duplicate React** — the build must resolve one React copy. Check `npm ls react` if hooks
   misbehave.
3. **Stylesheet and font assets resolved** — inspect the build output for the emitted CSS and font
   files. A missing stylesheet shows as unstyled components; missing fonts as silent fallback to a
   system family.
4. **States, when you can render:** keyboard reachability and visible focus ring, disabled and
   loading states, error/invalid state, and popup arrow correctness in **all four orientations**
   (`top`, `bottom`, `left`, `right` — the arrow rotates per `data-[side]`, so check each side
   actually reached, including via collision flip).
5. **Screenshots and visual claims only when you actually rendered and looked at them**, and only
   where you are authorised to use a browser. Never write "looks good", "verified visually" or
   "accessible" on the strength of a type check.

**Report limits honestly.** This repository does not include a repository-wide browser audit.
Rendered appearance, focus behavior, portals, gestures, SSR/prerender, screen-reader output, RTL,
and responsive layout remain unverified unless task-specific evidence is supplied. Do not claim
"all runtime checks passed" without evidence for those checks.
Use `checked by reading`, `type-checked` or `built successfully` — never a bare "passes".

## 10. Boundaries

Do not, without an explicit owner decision: remove `"private": true`, add `publishConfig` or a
registry, run `npm publish`, log in to any registry, publish to a public or private scope, or
create an account. `prepack` runs a guard that enforces this. If a task seems to require
publishing, that is a blocker to report, not a step to take.

## 11. Storybook

Storybook previews every `DemoMeta` variant as its own story. Stories are **generated**, never
hand-written: `scripts/generate-stories.mjs` scans `src/demos/*.demo.tsx` and emits
`src/stories/<id>.stories.tsx` (one CSF story per variant, calling `variant.render()` inside the
shared `VariantBlock` look, titled `<Group>/<Title>`).

```bash
npm run storybook        # dev server on :6006 (showcase keeps :5175 — no conflict)
npm run build-storybook  # static bundle into storybook-static/
```

**Rerun the generator after adding (or renaming variants in) a demo file:**

```bash
node scripts/generate-stories.mjs
```

Dark mode is class-based (`.dark` on `<html>`, same as the showcase): flip it with the moon
toolbar icon. Config lives in `.storybook/main.ts` (framework `@storybook/react-vite`, docs +
a11y addons, `viteFinal` mirroring `vite.config.ts` react + tailwindcss plugins and the `@`
alias) and `.storybook/preview.tsx` (imports `src/index.css`).
