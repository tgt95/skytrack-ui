# skytrack-ui

Private, reusable React component library for SkyTrack. Built on
[Base UI](https://base-ui.com) + Tailwind CSS v4, themed with IBM Plex Sans / IBM Plex Mono.

**Status: local/private phase.** The package is `private: true`, it is installed from a
local tarball, and no npm registry destination has been chosen yet. See
[Publishing](#publishing--still-an-open-owner-decision). **Building UI with this library?**
Start with this repository's [`AGENTS.md`](AGENTS.md), then route through its local
[`skills/README.md`](skills/README.md) and open only the relevant guide sections.
Contributor file-read logging is off by default; for the `DEBUG=true` opt-in and command examples,
see [File-read logging](skills/skytrack-ui/references/README.md#file-read-logging-opt-in) and the
[copy-paste Agent prompt](skills/skytrack-ui/references/README.md#prompt-for-an-agent).

For component-specific purpose, selection, anatomy, variants, states, accessibility, and verified
examples, use the [component knowledge index](skills/skytrack-ui/references/knowledge/README.md).

## Live site (GitHub Pages)

Published to the `gh-pages` branch by `npm run deploy:pages`:

- Showcase app (`src/showcase/App.tsx`): <https://tgt95.github.io/skytrack-ui/>
- Storybook (docs, stories, a11y panel): <https://tgt95.github.io/skytrack-ui/storybook/>

The showcase has four views: **Components** (live demos), **Sheet** (tokens plus each
component's library-defined design axes and selected states, grouped per component),
**Style overview** and **Dashboard**.

```bash
npm run build:site     # writes site/ (git-ignored): showcase at the root, Storybook in storybook/
npm run deploy:pages   # build:site, then force-push site/ to origin/gh-pages
```

The site is mounted at `/skytrack-ui/`, so `BASE_PATH` sets the asset prefix (Storybook already
emits relative URLs, so it works from `/storybook/`). Pages serves `gh-pages` with the legacy branch
source; no Actions minutes are used. To move deployment into CI instead, add
`.github/workflows/deploy-pages.yml` that runs `npm ci && npm run build:site` and deploys the `site`
artifact with `actions/deploy-pages`, then set the Pages source to "GitHub Actions". That push needs
a token with the `workflow` scope.

**Visual QA is component-specific.** Source checks do not establish rendered behavior for every
component. Treat appearance and interaction as unverified unless the exact component state was
rendered and inspected. Package checks are listed under [Verified how](#verified-how); scope limits
are listed under [Not verified](#not-verified).

---

## Install from the local tarball

Build the tarball (writes `dist-lib-tarball/skytrack-ui-<version>.tgz`):

```bash
cd /path/to/skytrack-ui
npm install          # once
npm run pack:local   # build:lib + npm pack
```

Install it in a consumer app:

```bash
npm install /path/to/skytrack-ui/dist-lib-tarball/skytrack-ui-0.1.5.tgz
```

`react` and `react-dom` are **peer dependencies** (`^19.0.0`) — the consumer installs and
owns them, so there is exactly one React copy at runtime. The other runtime dependencies
(`@base-ui/react`, `@tanstack/react-table`, `class-variance-authority`, `clsx`, `cmdk`,
`react-day-picker`, `react-resizable-panels`, `recharts`, `tailwind-merge`, `@phosphor-icons/react`, `zod`) are installed
automatically as regular dependencies. Shiki is included for Code Block's optional syntax-highlighting hook.

## Usage

Root import — every component is a named export:

```tsx
import { Button, Input, cn, createTooltipHandle } from 'skytrack-ui'
import 'skytrack-ui/styles.css'

export function SaveBar() {
  return (
    <div className={cn('flex items-center gap-2 p-4')}>
      <Input placeholder='Waypoint name' />
      <Button variant='outline' size='sm'>
        Save
      </Button>
    </div>
  )
}
```

Per-component subpath — the same component, imported directly. Each subpath also exposes that
component's own helper names unchanged (e.g. `createHandle`):

```tsx
import { Tooltip, TooltipPopup, TooltipPositioner, TooltipProvider, TooltipTrigger } from 'skytrack-ui/tooltip'
```

Code Block is available as a composable subpath, with optional syntax highlighting:

```tsx
import { CodeBlock, CodeBlockContent, CodeBlockLine, useHighlightedCode } from 'skytrack-ui/code-block'

const lines = useHighlightedCode('const ready = true', 'typescript')

export function Snippet() {
  return (
    <CodeBlock>
      <CodeBlockContent lineNumbers>
        {lines.map((line, index) => (
          <CodeBlockLine key={index}>{line}</CodeBlockLine>
        ))}
      </CodeBlockContent>
    </CodeBlock>
  )
}
```

Resizable panels are available through a dedicated subpath:

```tsx
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from 'skytrack-ui/resizable'

export function WorkspaceLayout() {
  return (
    <ResizablePanelGroup orientation='horizontal' className='w-full' style={{ height: '24rem' }}>
      <ResizablePanel defaultSize='35%' minSize='20%' aria-label='Map'>
        Map
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize='65%' minSize='30%' aria-label='Mission details'>
        Mission details
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
```

Syntax highlighting follows the package's class-based theme: **VS Code Light+** in light mode and **VS Code Dark+** under `.dark`.

### Sidebar

Compose a full-height app shell with an icon-collapsible sidebar. `SidebarProvider` owns the
desktop and mobile state; `SidebarTrigger` and `SidebarRail` toggle it. The keyboard shortcut is
<kbd>⌘ B</kbd> on macOS or <kbd>Ctrl B</kbd> elsewhere.

```tsx
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger
} from 'skytrack-ui/sidebar'

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <Sidebar collapsible='icon'>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Workspace</SidebarGroupLabel>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton isActive>Overview</SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <header className='flex h-12 items-center px-3'>
          <SidebarTrigger />
        </header>
        <main>{children}</main>
      </SidebarInset>
    </SidebarProvider>
  )
}
```

There are 53 component subpaths: `accordion`, `alert`, `alert-dialog`, `attachment`,
`autocomplete`, `avatar`, `badge`, `breadcrumb`, `button`, `calendar`, `chart`, `checkbox`,
`checkbox-group`, `code-block`, `collapsible`, `combobox`, `command`, `context-menu`, `data-table`, `date-picker`,
`dialog`, `drawer`, `dropzone`, `field`, `fieldset`, `form`, `inline-edit`, `input`, `menu`,
`menubar`, `meter`, `navigation-menu`, `number-field`, `otp-field`, `page-header`, `pagination`,
`popover`, `preview-card`, `progress`, `radio`, `resizable`, `scroll-area`, `select`, `separator`, `sidebar`,
`slider`, `switch`, `tabs`, `toast`, `toggle`, `toggle-group`, `toolbar`, `tooltip`.

### Aliased root exports

`createHandle` is exported by six components (`alert-dialog`, `dialog`, `drawer`, `popover`,
`preview-card`, `tooltip`), so it is **not** re-exported from the root — an ambiguous root
export would be a silent breaking change. The root exposes stable aliases instead:

| Root export               | Component      |
| ------------------------- | -------------- |
| `createAlertDialogHandle` | `alert-dialog` |
| `createDialogHandle`      | `dialog`       |
| `createDrawerHandle`      | `drawer`       |
| `createPopoverHandle`     | `popover`      |
| `createPreviewCardHandle` | `preview-card` |
| `createTooltipHandle`     | `tooltip`      |

Use `skytrack-ui/tooltip`'s own `createHandle` when you want the unaliased name. The full,
authoritative export list is generated into `src/lib/entries.json` and mirrored by
`src/lib/index.ts`; regenerate with `npm run generate:exports`.

## Styles, theme, fonts and dark mode

```ts
import 'skytrack-ui/styles.css'
```

The stylesheet is **opt-in and explicit** — importing it is the only thing that turns the
theme on. It is compiled Tailwind: every utility the shipped components use is already in the
file, so **the consumer needs no Tailwind installation, plugin or `content`/source config** to
use the components.

What is inside:

- the shadcn-style CSS custom properties (`--background`, `--foreground`, `--primary`,
  `--radius`, sidebar and chart tokens, …) as owner-supplied,
- Tailwind's preflight reset and a small `@layer base` block,
- the IBM Plex Sans and IBM Plex Mono `@font-face` rules with all 88 font files packaged
  under `dist-lib/assets/` and referenced with relative URLs, so any base path works
  (a bundler may inline them as `data:` URIs instead — both forms are verified to build),
- the compiled utilities for every shipped component.

### Global impact — read this before importing

`skytrack-ui/styles.css` is a global stylesheet. It will:

- reset browser defaults (Tailwind preflight),
- set `body` to `background`/`foreground` colours and to IBM Plex Sans, and `code`/`kbd`/`samp`/`pre`
  to IBM Plex Mono,
- define `--radius` and the `rounded-*` scale globally.

`--radius` is `0.125rem` (2px). Component corners use this single token; circular controls keep
their circular shape.

If the consumer app already ships its own Tailwind or its own reset, import this file **once**
and be aware of the cascade; component styling relies on these tokens existing.

### Dark mode

Dark mode is **class-based**: add `dark` to `<html>` (or any ancestor) to switch the token set.

```ts
document.documentElement.classList.toggle('dark', prefersDark)
```

There is no automatic `prefers-color-scheme` wiring and no theme script — the consumer decides
how the class is toggled and persisted.

## Requirements and limitations

- **React 19 and a DOM.** Every component is a React component; there is no vanilla-JS,
  HTML-only or web-component build, and no framework-agnostic (Preact/Solid) build.
- **Client-side components.** Overlay and menu components (dialog, drawer, popover, menu,
  combobox, toast, tooltip, …) use portals, focus management and browser APIs. They are not
  verified for server rendering — `next build`-style prerendering has not been tested.
- **Tailwind is a build-time dependency of this package only.** Consumers do not need it.
- **Partial visual QA.** Browser audits cover audited slices only; see below.

## Updating the library

```bash
npm run build          # showcase app -> dist/   (unchanged workflow)
npm run typecheck      # tsc over src + showcase
npm run build:lib      # publishable library -> dist-lib/ (JS + types + styles.css)
npm run verify:lib     # re-run the dist-lib checks on their own
npm run pack:local     # build:lib + npm pack -> dist-lib-tarball/
npm run test:consumer  # install the tarball in an isolated offline project and use it
npm run sync:guide     # sync source changes to ../skytrack-design-guide
```

## Dual-repository sync (`skytrack-design-guide`)

This workspace coordinates two GitHub repositories with distinct commit identities:

1. **`skytrack-ui`** (`https://github.com/tgt95/skytrack-ui`): Main package development repository, authored by `tgt95`.
2. **`skytrack-design-guide`** (`https://github.com/allandaoskytrack/skytrack-design-guide`): Shared organization design guide repository, authored by `tuantrinhatskytrack`.

### How to sync changes

After developing and committing in `skytrack-ui`:

1. **Run the sync command**:
   - **Via CLI**:
     ```bash
     npm run sync:guide
     ```
   - **Via Fork GUI**:
     In Fork (tab `skytrack-ui`), select **Repository** -> **Custom Commands** -> **Sync to Design Guide** (or right-click in the repository view).

2. **Commit and push from `skytrack-design-guide`**:
   - In Fork, switch to tab **`skytrack-design-guide`**.
   - Review the uncommitted changes in the Changes view.
   - Enter your commit message and click **Commit** (the commit author will automatically be `tuantrinhatskytrack`).
   - Click **Push** to update `origin/main` on `allandaoskytrack/skytrack-design-guide`.

### Sync rules & exclusions

The sync script (`scripts/sync-to-design-guide.mjs`) automatically mirrors `src/`, `public/`, `skills/`, package definitions, and build scripts while safely preserving target-specific files in `skytrack-design-guide` (`.git/`, `node_modules/`, `design/`, `ci/`, `CHANGELOG.md`, `CLAUDE.md`, `CONTRIBUTING.md`, `docs/PRESENTATIONS.md`, and `scripts/export-design.mjs`).

`build:lib` runs, in order: clean `dist-lib` → regenerate the export map → Vite ESM bundle
(`vite.lib.config.ts`) → compile `src/styles.css` (`vite.lib.css.config.ts`) → emit `.d.ts`
(`tsconfig.lib.json`) → rewrite `@/` aliases in the declarations → verify
(`scripts/verify-lib.mjs`). If verification fails, the build fails.

### Local quality checks

```bash
npm run typecheck       # TypeScript checks for the showcase and source
npm run lint            # audited component-boundary and accessibility invariants
npm test                # focused component behavior tests
npm run format:check    # package source, scripts, configs, and maintained package docs
```

Before shipping package changes, also run `npm run build:lib` and `npm run test:consumer`.
The format commands use explicit package-owned paths and leave unrelated docs untouched.

Adding or renaming a component means running `npm run generate:exports` (it is part of
`build:lib`) and adding the matching `./<component>` entry to `exports` in `package.json`.
The generator refuses to run if two components export the same name and no explicit alias is
recorded, so a new component can never silently shadow a root export.

Bumping the version is a plain `npm version` in this directory; the tarball name follows the
version, so consumers pin the tarball path they were given.

### Files in the package

`package.json` restricts the tarball to `dist-lib` + `README.md`. The showcase
(`src/demos`, `src/showcase`, `index.html`), the build configs and the scripts are **not**
published — they stay in this repository.

## Publishing — still an open owner decision

Nothing is configured for publication, on purpose:

- `"private": true` is set. npm **refuses to publish** a package with this flag, which is the
  guard that keeps the package internal while the destination is undecided.
- There is no `publishConfig`, no registry URL and no `.npmrc` in this package, and no
  credentials are read anywhere in the build or pack scripts.

When the owner picks a destination, the options and their requirements are:

| Destination                                                      | What has to change                                                                                                                              |
| ---------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| Private npm registry (e.g. an org registry or a self-hosted one) | Remove `"private": true`, add `publishConfig.registry`, publish unscoped or under an owned scope.                                               |
| Restricted **scoped** package on the public npm registry         | Remove `"private": true`, use a scope the org owns, and publish with `--access restricted` (npm's restricted packages are a paid-plan feature). |
| GitHub Packages                                                  | Remove `"private": true`, add `publishConfig.registry = https://npm.pkg.github.com`, and configure `.npmrc` with an authenticated token.        |

Until then, consumers install the tarball (or a Git URL / workspace link to this directory).

## Verified how

`npm run build:lib` → `scripts/verify-lib.mjs` (entry points, no `@/` alias in any emitted
file, package metadata, CSS asset resolution, utility coverage, Node import of every entry)
and `npm run test:consumer` (real tarball installed with `npm install --offline` into an
isolated temporary project, `tsc --strict` under `moduleResolution: bundler` **and** `node16`,
a `vite build` of consumer TSX importing components + styles, and Node runtime import checks).
Consumer evidence defaults to a unique temporary folder; set `SKYTRACK_UI_CONSUMER_EVIDENCE_DIR`
to retain it in a chosen location.

## Not verified

- **Visual appearance.** No repository-wide browser audit is included here. Verify the exact
  component state and viewport before making a rendered-appearance claim.
- **Behaviour in a real browser** (focus trapping, portals, gestures, SSR/prerender, screen
  readers, RTL, responsive layout).
- **Registry installation.** Only the local tarball was installed; no registry, no
  authentication, no access-control check has been performed.
