# T-441 verification — skytrack-ui folder restructure plan v2

Date: 2026-11-12
Package: `designs/components/skytrack-ui`
Plan: `docs/FOLDER-RESTRUCTURE-PLAN.md` v2
Scope executed: Phase 0-6. Phase 7 (large-file split), Phase 8 (56-component smoke suite) and Phase 9 (packaging) remain deferred per plan.

## Baseline (before changes)

Evidence: `agents/task-work/T-441/baseline.md`, `agents/task-work/T-441/baseline-gates.log`.

- `typecheck` PASS, `build:lib` PASS, `verify:lib` PASS.
- `lint` FAIL: `sheet.tsx is missing 1 component(s): code-block-tree`.
- `test` FAIL: 3 of 76 tests in `pattern-library.test.tsx`.
- `format:check` FAIL: 80 files.
- `git status` clean; HEAD `436ad81`.

## Decisions applied from plan defaults

| ID | Applied | Reason |
|---|---|---|
| D0 | Carbon reference stays tracked | Safe and reversible; fetch script needs a redistributable source |
| D1 | Primitive alpha tokens fixed in place, prefix mismatch fixed | 94/100 fallbacks already equalled the primitive value |
| D3 | Storybook generator kept | Demos are `DemoMeta` objects, not CSF |
| D4 | Tarball unchanged (`dist-lib`, `README.md`) | Owner decision still open |
| D5 | `code-block-tree` registered in the spec sheet only | Component work is tracked separately |
| D6 | Guardrail enforces cycles, layer boundaries, deep imports | Revised from v1 |
| D7 | Phase 7/8 deferred | Plan marks them as separate tasks |
| D8 | No workspace-repo action | X1 decision still open |

## Phase results

### Phase 0 — Baseline

- Task registered as T-441; dashboard row added.
- Baseline committed by the prior package commit `436ad81`; baseline evidence captured at 02:09.

### Phase 1 — Green baseline

1. `code-block-tree` added to `SPECS` in `src/showcase/sheet.tsx`.
2. Three failing pattern tests aligned with the current demo copy:
   - `example-copy.ts` keys renamed to the live page-content titles.
   - Callout test targets `Workspace name` and the current field description.
   - Panel test targets `Open sample panel` and the current experimental copy.
   - Toast test expects `Your changes have been saved.`
3. Generators now run local Prettier after writing:
   - `scripts/generate-stories.mjs`
   - `scripts/generate-exports.mjs`
   - `package.json` format globs include `.cjs`.
4. `zod` moved from `dependencies` to `devDependencies`; `package-lock.json` updated manually because the sandbox refuses remote fetches (`EALLOWREMOTE`).

Evidence: `agents/task-work/T-441/phase1-gates.log`.

- `lint` PASS.
- `test` PASS: 6 files, 76 tests.
- `format:check` PASS.

### Phase 2 — Git hygiene (D0a)

- `artifact/skytrack-ui-probe.html` and `draft/*` removed from the index; files kept on disk.
- `.gitignore` rewritten with `artifact`, `draft`, `dist`, `dist-lib`, `site`, `*.tgz`, `node_modules`, `.DS_Store`.
- `src/shadcn-tokens-original.css` deleted.
- `.DS_Store` files deleted from the working tree (not only `src/showcase`).
- `docs/carbon-ds-reference` still tracked: 2.447 files.

Verification:

```
carbon tracked: 2447
artifact tracked: 0
draft tracked: 0
```

### Phase 3 — CI

Added `.github/workflows/ci.yml`:

- Node 22, npm cache, read-only token.
- `npm ci`
- `typecheck`, `lint`, `guardrails`, `guardrails:selftest`, `test`, `format:check`
- `pack:local` (runs `build:lib` once), then `verify:lib`, then `test:consumer`.

YAML parsed successfully (`python3 -c "yaml.safe_load(...)"` reported `jobs: ['verify']`).

Local `pack:local` PASS. Local `test:consumer` reaches the install step but fails only because the sandbox blocks npm network/cache access:

```
FAIL  npm install --offline failed: npm error code ENOTCACHED
request to https://registry.npmjs.org/regex-utilities failed
```

This is an environment limit, not a package defect; CI runs with network access.

### Phase 4 — Token and CSS publish

- `primitive.css`: all 36 white alpha and 36 black alpha tokens regenerated as valid `rgb(... / a)` values; `a0` uncommented; `a100` uses `#ffffff` / `#000000`. `#NaNNaNNaN` count: 0.
- `brand.css`: 100 `--primitive-color-*` references changed to the real `--*` names; the eight `#NaNNaNNaN` fallbacks removed. Unresolved variables: 0.
- `src/showcase/showcase.css` created; `body[data-showcase-view]` removed from `src/index.css`; imported from `src/main.tsx`.
- `src/styles.css` now also scans `./lib` because cva configs moved there (see Phase 5).

Verification on the built stylesheet:

```
showcase-view false
NaN false
primitive-color false
```

`npm run build` (showcase) PASS; the showcase rule is present in `dist/assets/*.css`, absent from `dist-lib/styles.css`.

### Phase 5 — Single source for spec axes

- `src/lib/button-variants.ts` and `src/lib/toggle-variants.ts` now own the cva configs.
- `button.tsx` and `toggle.tsx` import those configs; no public export changed.
- `sheet.tsx` derives `BUTTON_VARIANTS`, `BUTTON_SIZES`, `TOGGLE_VARIANTS`, `TOGGLE_SIZES` with `Object.keys(...)`.
- `sync-sheet-specs.mjs` checks the derivation and keeps literal value checks for the other eight axes.
- `lint-ui-practices.mjs` now compares component files with `skills/.../knowledge/components/*.md`, excluding `_template.md`.

Negative check: adding an unregistered component produced

```
FAIL  skills/.../components/zz-temp-probe.md: missing guide for src/components/ui/zz-temp-probe.tsx
```

Probe file removed afterwards.

### Phase 6 — Guardrails

- `agents/file-size-baseline.json`: 27 file budgets, 400-line default, `src/lib/index.ts` excluded as generated.
- `scripts/architecture-guardrails.cjs`: size budgets, UI import cycles, UI/lib must not import `showcase`/`demos`, no deep `@/components/ui/<name>/...` imports.
- `package.json`: `guardrails`, `guardrails:selftest`.
- CI runs both.

Evidence:

```
PASS  self-test import cycle
PASS  self-test wrong layer
PASS  self-test deep import
PASS  file-size budgets, import cycles, layer boundaries and deep imports
```

## Final gate

Evidence: `agents/task-work/T-441/final-gates.log`.

| Gate | Result |
|---|---|
| `npm run typecheck` | PASS |
| `npm run lint` | PASS |
| `npm run guardrails` | PASS |
| `npm run guardrails:selftest` | PASS (3/3) |
| `npm test` | PASS (6 files, 76 tests) |
| `npm run format:check` | PASS (all files) |
| `npm run build:lib` | PASS (8 steps) |
| `npm run verify:lib` | PASS (6 groups, 442/442 utility classes, 415 root values, 56 subpaths) |
| `npm run pack:local` | PASS (15.7 MB tarball, 249 files) |
| `npm run test:consumer` | FAIL, environmental: `ENOTCACHED` for `regex-utilities` |

## Clean-clone gate (Phase 2 gate)

Evidence: `agents/task-work/T-441/clone-gates.log`.

`git clone --branch chore/folder-restructure --single-branch . <temp>` produced a checkout at `6dc2f95` (the clone was taken before the evidence-only amend, so its tracked sources match the final commit) with 2.926 tracked files; `artifact/`, `draft/` tracked count 0 each; `docs/carbon-ds-reference` 2.447 files; `src/showcase/showcase.css` present.

`npm ci` could not run in the clone because npm network access is blocked in this environment. The clone therefore reused the package's installed `node_modules` as a symlink; every gate below still ran from the cloned sources.

| Gate | Result in clone |
|---|---|
| `npm run typecheck` | PASS |
| `npm run lint` | PASS |
| `npm run guardrails` | PASS |
| `npm run guardrails:selftest` | PASS (3/3) |
| `npm test` | PASS (6 files, 76 tests) |
| `npm run format:check` | PASS |
| `npm run build:lib` | PASS |
| `npm run verify:lib` | PASS |
| `npm run pack:local` | PASS (13.1 MB tarball, 14.7 MB unpacked) |
| `npm run test:consumer` | FAIL, environmental, see below |

`npm pack` inside the clone first failed with `EACCES` writing `~/.npm/_cacache`. Retrying with `npm_config_cache=<temp dir>` passed. `test:consumer` then failed at its offline install: `react@undefined` / peer `react@^19.0.0` because the isolated project cannot fetch packages. No package defect is shown by that failure.

## CI (Phase 3 gate)

`.github/workflows/ci.yml` exists and parses; local `pack:local` and `verify:lib` pass. The workflow has not run on GitHub Actions yet, because that requires a push. This is an Owner step, not something this environment can complete.

## Visual check (Phase 4 gate)

Evidence: `agents/task-work/T-441/visual-check.md`, `agents/task-work/T-441/screenshots/`.

Before (`436ad81`) and after (final branch commit, built from `6dc2f95` sources) showcase builds of `?view=showcase&panel=overview` are pixel-identical:

```
✓ Images match (0% difference)
  0 different / 738560 total pixels
```

Body background resolves to `rgb(244, 244, 245)` in light and `rgb(39, 39, 42)` in dark in both builds. `data-showcase-view` appears once in each showcase CSS bundle and 0 times in `dist-lib/styles.css`.

## Remaining limits

1. `test:consumer` cannot install offline here (`ENOTCACHED` / unresolved `react`); needs network or a CI run.
2. CI workflow has not executed on GitHub; needs a push by the Owner.
3. `npm ci` was not exercised in the clone; network blocked, `node_modules` symlinked.
4. Phase 7 (split 12.173-line pattern content and other large files) not started.
5. Phase 8 (56-component smoke suite) not started.
6. Phase 9 (tarball contents / registry) still needs the Owner.
7. Git history rewrite (D2) not performed.
8. Workspace repo still tracks 146 package files (X1); not changed.

## Changed paths summary

100 tracked files changed plus new files:

- New: `.github/workflows/ci.yml`, `agents/file-size-baseline.json`, `agents/task-work/T-441/*`, `scripts/architecture-guardrails.cjs`, `src/lib/button-variants.ts`, `src/lib/toggle-variants.ts`, `src/showcase/showcase.css`.
- Removed: `src/shadcn-tokens-original.css`; index entries for `artifact/` and `draft/`.
- Format-only: 62 generated stories, 8 shell demos, component and showcase files.

## Commit

Local commit on branch `chore/folder-restructure` (parent `436ad81`), 122 files changed. Not pushed. Old untracked `agents/task-work/T-403..T-421` directories left untouched.

Rerun evidence after document updates: `agents/task-work/T-441/final-gates-rerun.log`, exit 0, all gates PASS.
