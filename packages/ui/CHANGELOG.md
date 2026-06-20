# @archora/ui

## 0.2.0

### Minor Changes

- Dark/light polish, accessibility coverage, and a bundle budget.
  - **Breaking:** removed duplicate CSS custom properties from `styles.css` — `--arch-shadow-xl` (use `--arch-shadow-lg`) and `--arch-ease-emphasized` (use `--arch-ease-standard`).
  - Fix: the light theme no longer shows dark-only hardcoded overlays — tree view, accordion, skeleton shimmer, and input insets are now theme-aware.
  - Fix: `ArchToast` renders a `div` carrying its `status`/`alert` role to satisfy `aria-allowed-role`.
  - Accessibility: interactive components are now checked against `axe-core` in the test suite and CI.

## 0.1.0

### Minor Changes

- Prepare the first public preview release of Archora UI.
- Extend `ArchVirtualScroller` with `height`, `overscan`, `keyFn` and `scrollTo(index)` for dense architecture lists.
- Extend toast APIs with `push`, variant helpers, duration control and action buttons.
- Extend `ArchDialogContent` with `size` and `closeOnOutside` for settings and confirmation flows.
- Extend `ArchDataTable` with `keyFn`, `selectedKey`, `initialSortDirection`, row-click indexes and a footer slot.
- Extend `ArchSelect` with full-width layout and stable test hook props for app-level adapters.
- Extend `ArchDropdownContent` with configurable start/end alignment.
