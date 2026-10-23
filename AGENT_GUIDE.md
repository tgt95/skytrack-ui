# AGENT_GUIDE — building UI with `skytrack-ui`

This guide is for agents (and people) who are about to write UI code that uses the
`skytrack-ui` package. It states the rules that keep SkyTrack screens consistent, and the
exact commands to verify your work honestly.

---

## 1. Current status — read this first

`skytrack-ui` is a **private React component library** built on
[Base UI](https://base-ui.com) + Tailwind CSS v4, themed with IBM Plex Sans / IBM Plex Mono.

- It is `"private": true`, version `0.1.4`, consumed as a **local tarball**
  (`dist-lib-tarball/skytrack-ui-0.1.4.tgz`).
- **No npm registry destination has been chosen.** Never write code that assumes
  `npm install skytrack-ui`, a registry scope, or a Git URL.
- **Browser audits exist (cycle 0, Oct 2026).** Rendered appearance, focus, cursor, overflow and
  ARIA wiring were probed in a real browser; reports live under
  `_tasks/2026-10-07-design-system-audit/`. Nothing below may be reported as "looks right"
  unless you personally rendered it and looked at the screenshot.

## 2. Inspect before you write

Never code from memory or from this guide alone. The installed version is the source of truth:

1. `cat node_modules/skytrack-ui/package.json` — read `version`, `exports`, `peerDependencies`.
   The `exports` map is the authoritative list of importable entry points.
2. `cat node_modules/skytrack-ui/README.md` — the shipped README for the version you have.
3. Confirm every export you use exists. The root entry lists names explicitly with no `export *`,
   so a missing name is a compile error, not a silent `undefined`.

If the installed version disagrees with this guide, the installed version wins — say so.

## 3. Install (consumer app)

```bash
# In designs/components/skytrack-ui, once per clone:
npm install
npm run pack:local        # build:lib + npm pack -> dist-lib-tarball/skytrack-ui-<version>.tgz

# In the consuming app:
npm install /abs/path/to/designs/components/skytrack-ui/dist-lib-tarball/skytrack-ui-0.1.4.tgz
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

There are 38 subpaths, one per component: `accordion`, `alert-dialog`, `autocomplete`, `avatar`,
`badge`, `button`, `checkbox`, `checkbox-group`, `collapsible`, `combobox`, `context-menu`, `dialog`,
`drawer`, `field`, `fieldset`, `form`, `input`, `menu`, `menubar`, `meter`, `navigation-menu`,
`number-field`, `otp-field`, `popover`, `preview-card`, `progress`, `radio`, `scroll-area`,
`select`, `separator`, `slider`, `switch`, `tabs`, `toast`, `toggle`, `toggle-group`, `toolbar`,
`tooltip`.

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
and defines `--radius` (`0.25rem`, 4px) plus the `rounded-*` scale globally. If your app already ships its
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
`border-border`, `border-input`, `ring-ring`, `bg-destructive`, `bg-accent`, `text-success`,
`text-warning`, `text-info`, and `text-favorite`. Never hard-code a colour. Tokens are what make
the light and dark themes work. Use `success`, `warning`, and `info` for status meaning; use
`favorite` for favorited or starred state, not for warnings.

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

`FieldControl` reacts to `data-[filled]`, `data-[disabled]` and `data-[invalid]`, so borders,
opacity and the destructive ring update automatically. Put `disabled` on `FieldRoot` to disable the
whole field. Use `Input` instead for a standalone input with no label.

### NumberField — sizes and inline inputs

`NumberFieldInput` supports `size`: `default` | `compact` | `xs`.

- `default`: standard 36px (`h-full` in `NumberFieldGroup`), left-aligned, text-sm.
- `compact`: 26px (`h-[26px]`), right-aligned, text-xs, full width within its container.
- `xs`: 24px (`h-6`), right-aligned, text-xs, full width within its container. Pairs with `Button` `size='icon-xs'`.

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

Library-side scripts (in `designs/components/skytrack-ui`):

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
(`skytrack-ui-0.1.4.tgz`) and consumers pin the tarball path they were given. To ship a change:
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

**Report limits honestly.** Browser audits (cycle 0, Oct 2026, reports under
`_tasks/2026-10-07-design-system-audit/`) have confirmed rendered appearance, focus visibility,
cursor, overflow and ARIA wiring for the audited slices. Still unconfirmed: focus trapping,
portal behaviour, gestures, SSR/prerender, screen-reader output, RTL, and responsive layout. This package is **not** production-ready and "all runtime checks passed" would be false.
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
