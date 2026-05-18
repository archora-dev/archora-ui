# Archora UI Roadmap

Archora UI is a Vue 3 and TypeScript component library for dense dashboards, internal tools, and professional product interfaces. The project is built to be useful as a portfolio-grade design system today and structured so it can become a polished open-source package later.

This roadmap describes the planned development path for Archora UI and the standards each phase must meet before the project moves forward.

## Product Direction

Archora UI focuses on practical interface building for developer tools, operations consoles, admin surfaces, and data-heavy product screens.

The library prioritizes:

- Typed Vue component APIs with clear props, emits, and slots.
- Token-driven styling through CSS variables and theme contracts.
- Strong keyboard and accessibility behavior for interactive components.
- Dark-first visual quality with complete light and system theme support.
- Documentation that shows realistic product scenarios, not placeholder examples.
- Release discipline: tests, typecheck, lint, stylelint, format, and builds must stay green.

## Phase 1: Component Depth

Goal: make the most important components feel production-ready, not just visually complete.

### Planned Work

1. `ArchDatePicker`
   - Range selection.
   - Disabled date rules.
   - Min and max dates.
   - Month and year navigation polish.
   - Better keyboard coverage and docs examples.

2. `ArchTabs`
   - Manual and automatic activation modes.
   - Disabled tabs.
   - Better keyboard regression tests.
   - More realistic docs examples for settings and inspector surfaces.

3. `ArchToast`
   - Queue limits.
   - Pause-on-hover behavior.
   - Better action support.
   - Reduced-motion behavior checks.

4. `ArchDrawer` and `ArchDialog`
   - Audit focus trap behavior.
   - Improve stacked overlay behavior.
   - Add stronger focus return tests.
   - Expand docs for destructive confirmation, inspector panels, and settings flows.

5. Form controls
   - Align validation states across Input, Textarea, Select, Combobox, Checkbox, Radio Group, Slider, and Date Picker.
   - Make FormField examples more realistic.
   - Document form composition patterns.

6. Data display follow-up
   - Improve typed row ergonomics for `ArchTable` and `ArchDataTable`.
   - Add server-side data patterns for table-like components.
   - Document pagination, selection, and row action patterns.

### Done Criteria

This phase is complete when:

- The core interactive components have loading, empty, error, disabled, and keyboard states where relevant.
- Overlay components have tested Escape, outside-click, focus trap, and focus return behavior.
- Component examples use real product interface scenarios.
- Public types are exported deliberately.
- All quality gates pass.

## Phase 2: Documentation And Portfolio Polish

Goal: make the documentation site the strongest public face of the project.

### Planned Work

- Rewrite component pages around practical use cases.
- Add usage guidance for choosing between similar components:
  - Select vs Combobox.
  - Table vs DataTable.
  - Dropdown vs Command.
  - Dialog vs AlertDialog vs Drawer.
- Add a component status matrix:
  - stable
  - preview
  - needs accessibility audit
  - needs API review
- Add design token reference pages with examples.
- Add accessibility guidance for overlays, keyboard navigation, and form controls.
- Add migration notes for future breaking changes.
- Improve landing and quick-start copy so a reviewer can understand the project quickly.

### Done Criteria

This phase is complete when:

- A first-time visitor can understand the project, install it, and evaluate key components in under five minutes.
- Each showcase component has realistic examples, props, events, slots, accessibility notes, and state coverage.
- Docs build and browser smoke checks are part of the normal release workflow.

## Phase 3: Release Readiness

Goal: prepare the project for a first public package release.

### Planned Work

- Finalize package metadata for `@archora/ui`.
- Audit `exports`, type declarations, and bundled CSS.
- Add a local consumer smoke test that installs and imports the built package.
- Review peer dependencies and side effects.
- Add Changesets release workflow.
- Add versioning and changelog process.
- Confirm license, README, package files, and publish configuration.

### Done Criteria

This phase is complete when:

- `@archora/ui` can be built, packed, installed in a clean app, and used with TypeScript.
- CSS imports work from the published package entry.
- Public API exports are intentional and documented.
- Release commands are repeatable.

## Phase 4: Quality Automation

Goal: reduce regression risk as the component set grows.

### Planned Work

- Add browser smoke checks for key documentation pages.
- Add visual regression coverage for showcase components.
- Add accessibility-focused tests for overlays and keyboard navigation.
- Add CI jobs for lint, typecheck, tests, stylelint, format check, docs build, and package build.
- Add a small release checklist to keep manual steps consistent.

### Done Criteria

This phase is complete when:

- Every pull request can prove that the library builds, types, tests, and documents correctly.
- Core docs pages are smoke-tested in a browser.
- Visual changes to showcase components are easy to review.

## Phase 5: Component Expansion

Goal: add new components only when the existing foundation is stable and documented.

### Candidate Components

- `ArchMenuBar`
- `ArchContextMenu`
- `ArchResizablePanel`
- `ArchSplitPane`
- `ArchInlineEdit`
- `ArchCodeBlock`
- `ArchCopyButton`
- `ArchCalendar`
- `ArchRangeCalendar`
- `ArchNavigationRail`
- `ArchAppShell`
- `ArchInspectorPanel`
- `ArchMetricCard`
- `ArchActivityFeed`

### Selection Criteria

A new component should be added only when it satisfies at least one of these:

- It supports common dashboard or internal-tool workflows.
- It strengthens the portfolio value of the design system.
- It composes naturally with existing components.
- It fills a documented gap in the current component set.

New components must include:

- typed props and emits
- slot documentation where relevant
- keyboard behavior where relevant
- tests for observable behavior
- docs examples
- token-based styling

## Phase 6: Theme System Maturity

Goal: make theming predictable for real product teams.

### Planned Work

- Document the full token contract.
- Clarify which tokens are stable and which are internal.
- Add theme authoring examples.
- Add contrast review for built-in themes.
- Add theme preview examples across dense components.
- Improve custom theme guidance for brand palettes.

### Done Criteria

This phase is complete when:

- A consumer can create a custom theme without reading component internals.
- Component styling consistently uses tokens or documented CSS variables.
- Dark and light themes meet the project contrast targets.

## Ongoing Standards

These standards apply to every phase:

- Components use the `Arch` prefix.
- Public API changes are typed and documented.
- Component colors, spacing, radii, shadows, motion, and z-index values come from tokens or CSS variables.
- Interactive components have visible focus states.
- Disabled states are semantic.
- Overlay components handle Escape, outside click where appropriate, focus trap, and focus return.
- Tests cover rendering, props, states, emits, slots, and keyboard behavior where relevant.
- Documentation examples should look like real product UI.
- No new dependency should be added unless it clearly improves maintainability or correctness.
