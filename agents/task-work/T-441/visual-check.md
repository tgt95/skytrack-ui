# T-441 Phase 4 visual check — showcase CSS move

Date: 2026-11-12
Route: `?view=showcase&panel=overview` (body attribute `data-showcase-view="style-overview"`).
Browser: `agent-browser` (Chrome over CDP), session `csscheck-e26443d341e2`. Viewport 1280×577, DPR 1.

## What was compared

| Build | Commit | Source of the rule |
|---|---|---|
| before | `436ad81` | `src/index.css` (`@layer base`) |
| after | `6dc2f95` sources (final branch commit only adds evidence files) | `src/showcase/showcase.css`, imported only by `src/main.tsx` |

Both were built with the same toolchain (`npm run build`, `vite.config.ts`) in the package directory, then served over `python3 -m http.server`.

Screenshots:

- `screenshots/before-style-overview.png`
- `screenshots/after-style-overview.png`
- `screenshots/diff-style-overview.png`

## Result

```
✓ Images match (0% difference)
  0 different / 738560 total pixels
```

Computed styles, both builds:

```
light  body background: rgb(244, 244, 245)  (--secondary: #f4f4f5)
dark   body background: rgb(39, 39, 42)     (--secondary: #27272a)
attr   data-showcase-view = style-overview
font   "IBM Plex Sans", ui-sans-serif, system-ui, sans-serif
```

Published artifact:

```
after  dist-lib/styles.css  data-showcase-view occurrences: 0
after  dist/assets/*.css    data-showcase-view occurrences: 1
before dist/assets/*.css    data-showcase-view occurrences: 1
```

So the demo background is unchanged in light and dark themes, and the rule still exists for the showcase build but not for consumers.

## Correction made during this check

The first comparison showed 3.96% pixel difference. Cause was the measurement setup, not the code: the "before" build came from a `git worktree` whose `node_modules` was a symlink, and that build emitted only 2 font files, so the page fell back to a system sans and text widths changed by ~3%.

The comparison was redone by checking `436ad81` sources out into the package directory (real `node_modules`), building there, copying `dist` aside, then restoring `6dc2f95`. Both builds then emitted 90 font files and loaded the same IBM Plex subsets. Result after the fix: 0% pixel difference.
