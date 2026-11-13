# Changelog

Changes to the SkyTrack UI component package. The package is private (see `DR-036`): it is consumed
as a locally built tarball, so entries describe what changed in `dist-lib` and in the docs surfaces
that ship with it.

## Unreleased

### Added

- axe-core accessibility gate inside `npm test`: every demo variant is rendered through the shared
  harness and audited against `src/showcase/a11y-baseline.json`. A new finding fails the run unless
  `A11Y_ACCEPT_NEW=1` is set; `A11Y_WRITE_BASELINE=1` rebaselines deliberately.
- Typed date entry for all three pickers (single, range, week): accepted text includes
  `2026-11-11`, locale numeric (`11/11/2026`) and month-name (`11 Nov 2026`).
- Dedicated `Calendar` demo and story page, so Storybook covers every component (63 pages: 56
  components + 7 UI shells).

### Changed

- **Date Range Picker and Week Picker are editable.** They were pick-only; they now share the single
  picker's field behaviour: click the text to edit, click the calendar icon to open the popover,
  `Enter`/blur commits, `Escape` reverts.
- Typing a complete start date in the range field appends the en dash automatically (`20 Nov 2026 – `)
  once the year has four digits, so a partially typed year never gains a separator.
- Range and week validation: a reversed range, a range end on a disabled day, a week whose start or
  end is disabled, and non-existent ISO weeks are rejected — the field shows `aria-invalid`, refuses
  to commit, and reverts to the last value on blur.
- Showcase header below `sm` switches views through a compact select instead of a 72 px window onto
  the toggle row.

### Fixed

- Tabs no longer nest a button inside a button: the close affordance is decorative and keyboard
  users close a tab with `Delete`/`Backspace`.
- Deep-linked showcase views start at the top of the page. An inline `Command` scrolled its selected
  item into view on mount, which dragged `?view=sheet` thousands of pixels down.
- `dist-lib` no longer copies the showcase `public/` assets: the tarball drops from 14.1 MB to about
  1.1 MB.

### Accessibility

- Remaining accepted finding: `tabs::aria-required-children`, because the "Add tab" button has to sit
  inside the tablist to keep the current layout; documented with the probe that proves it.
- Contrast is audited in the browser pass, not in jsdom (`color-contrast` is disabled in the harness
  because jsdom has no layout).
