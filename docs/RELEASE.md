# Release runbook — skytrack-ui

How a change to this package reaches consumers. The package is **private** (see `DR-036` in the
workspace `decisions/`): there is no npm publish step, `package.json` sets `"private": true`, and
`prepack` runs `scripts/guard-publish.mjs`, which fails a publish attempt.

Consumers get a tarball built from `main`, so "release" here means: green gate, verified tarball,
updated docs surfaces, and a recorded deploy of the static site.

## 0. Preconditions

- Node 22 (`engines` is not pinned; CI uses 22).
- Clean working tree on `main`, `git pull` done.
- `npm ci` (the repo commits `package-lock.json`).
- If the local npm cache is not writable, point npm elsewhere for the run:
  `export npm_config_cache=/tmp/ui-npm-cache`.

## 1. Gate — must be green before anything ships

CI (`.github/workflows/ci.yml`) runs exactly these, in order:

| Step | Command | What it proves |
|---|---|---|
| 1 | `npm run typecheck` | `tsc -p tsconfig.json` over sources and stories |
| 2 | `npm run lint` | UI practice rules (a11y, shared helpers, class names) + every component registered in `component-specs.ts` |
| 3 | `npm run guardrails` | file-size budgets, import cycles, layer boundaries, deep imports |
| 4 | `npm run guardrails:selftest` | the guardrail checker still catches its own fixtures |
| 5 | `npm test` | unit, behaviour, smoke and **axe-core a11y** suites |
| 6 | `npm run format:check` | Prettier on `src/`, `scripts/`, configs, `README.md` |
| 7 | `npm run pack:local` | `build:lib` + `npm pack` into `dist-lib-tarball/` |
| 8 | `npm run verify:lib` | every `exports` target resolves in `dist-lib` |
| 9 | `npm run test:consumer` | real tarball installed in a throwaway consumer: contents, types, bundler build, single React |

Run them locally before pushing; do not merge on a red run. `npm test` is the only step that needs
jsdom, and it carries the a11y gate — a new axe finding fails the run unless it is in
`src/showcase/a11y-baseline.json`.

### The a11y baseline

- `A11Y_ACCEPT_NEW=1` is required before a *new* finding can be written into the baseline; without
  it the test reports the finding and fails.
- `A11Y_WRITE_BASELINE=1 npm run a11y` rewrites the baseline from the current run — use it only
  when the finding set legitimately changed.
- `color-contrast` is disabled in the harness because jsdom has no layout; treat contrast as a
  browser-pass item, not a jsdom item.
- Current baseline: one finding, `tabs::aria-required-children`, accepted because the probe proves
  it only disappears by moving the "Add tab" button out of the tablist.

## 2. Artifact check

`pack:local` writes `dist-lib-tarball/skytrack-ui-<version>.tgz`. Check:

- size stays around 1 MB (the 14 MB regression came from shipping the showcase `public/` assets);
- `npm pack --dry-run` file list is `dist-lib`, `README.md`, `package.json` only;
- `verify:lib` reports the full export surface (56 component subpaths + root + `styles.css`);
- `test:consumer` passes both `moduleResolution: bundler` and `node16`.

## 3. Docs surfaces

| Surface | Command | Output |
|---|---|---|
| Component showcase (site) | `npm run build:site` | `site/` |
| Storybook | `npm run build-storybook` | `storybook-static/`, one page per component (63 pages: 56 components + 7 UI shells) |
| Design guide copy | `npm run sync:guide` | writes into the workspace design guide; review the diff before committing |

A component is only "shipped" when it has a demo (`src/demos/<id>.demo.tsx`), a generated story
(`node scripts/generate-stories.mjs`), and a row in `src/showcase/specs/component-specs.ts`.
Story pages are generated — never hand-edit `src/stories/*`.

## 4. Browser pass (B1)

`npm test` cannot see layout, focus order or popover placement. Before a consumer-facing release,
run a browser pass with a dev server and record screenshots:

1. `npm run dev` and note the port.
2. Cover 4 views × 2 viewports: `?view=components`, `?view=sheet`,
   `?view=showcase&panel=overview`, `?view=showcase&panel=dashboard` at 1440×900 and 390×844.
3. Smoke the interactive components that jsdom cannot judge: popovers/dialogs position and dismiss,
   date pickers (type, auto en dash, disabled days), tabs keyboard close, command palette.
4. In this workspace the browser surface is the Orca embedded browser (`orca-cli`): `orca goto` resets
   the viewport to the pane size, so always `goto` → `wait` → `set viewport W H` → `wait` →
   `screenshot`, then confirm the image width with `sips -g pixelWidth`.
5. Keep the screenshots and the measurements with the task record; a screenshot without a measured
   viewport is not evidence.

## 5. Deploy the static site (Owner approval required)

The site is published to the `gh-pages` branch and served from `<owner>.github.io/<repo>/`.

- **Ask the Owner before deploying.** The deploy force-pushes `gh-pages`.
- Command: `npm run deploy:pages` (runs `build:site`, commits `site/` into a temp repo, force-pushes
  `HEAD:gh-pages`). `PAGES_BRANCH` overrides the branch name.
- After deploying, open the live URL and confirm the deployed build matches `main` (page header,
  component count, latest component page).
- Record the deploy date with the release evidence; a publicly visible site that lags `main` is a
  finding, not a detail.

## 6. Version, changelog, record

1. Bump `version` in `package.json` (patch for fixes, minor for components/behaviour) and add the
   entry to `CHANGELOG.md` under the new heading.
2. Commit as `chore(release): <version>`.
3. Record the evidence in the task file: gate table with results, tarball size, browser-pass
   screenshots, deploy target and date, and anything deliberately not run.

## 7. Rollback

- **Tarball**: consumers are pinned to a version; republish the previous `.tgz` from
  `dist-lib-tarball/` or rebuild it from the previous commit.
- **Site**: `git push --force origin <previous-gh-pages-sha>:gh-pages` after fetching the branch, or
  re-run `npm run deploy:pages` from the last good commit.
- **Package content**: no external registry copy exists, so rollback is a git revert on `main`.

## 8. Known limits

- jsdom has no layout: contrast, popover placement, sticky headers and clipping are browser-pass
  only.
- The a11y gate renders each variant in isolation; duplicate-landmark issues that only appear when
  everything mounts together are out of scope by design.
- Storybook and the showcase site are deployable artifacts, not gate steps — CI builds the library
  and the consumer, not the site.
