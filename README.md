# Archora UI

**Dark-first Vue 3 component library for dense dashboards and internal tools.**

Archora is built for the screens people use all day — observability panels,
admin consoles, release pipelines: high information density, calm visuals,
readable under load. It is a focused kit, not a general-purpose marketing UI.

## Highlights

- **Dark-first, light tuned:** both themes shipped and verified, not dark as an afterthought.
- **Dense by default:** data tables, virtual scrolling, keyed rows, filters and overlays — primitives for tools.
- **Token-driven themes:** set a few `--arch-color-*` base colors on a `data-theme`; derived tokens compute via `color-mix`. SSR-safe runtime theming with `defineTheme` / `setAccent`.
- **Tiny per component:** side-effect-free ESM — one `ArchButton` is ~0.6 kB brotli, the whole library ~20 kB, with a bundle budget in CI.
- **Accessible by default:** keyboard support, visible focus, semantic ARIA — interactive components checked against `axe-core` in CI.
- **Vue 3 + TypeScript:** typed component APIs, emits, slots, and public exports.

### Why not Vuetify / PrimeVue / Element Plus

Those are broad, light-first, Material/enterprise kits for general apps. Archora
trades breadth and theming layers for a narrow target: a dense dark dashboard
aesthetic out of the box, a token contract instead of a theming framework, and a
small surface you can read end to end. Building a public marketing site? Use the
broad kits. Building the internal tool behind it? This is for you.

## Quick Start

```sh
pnpm add @archora/ui
```

```ts
import { ArchButton } from "@archora/ui";
import "@archora/ui/styles.css";
```

```vue
<template>
  <ArchButton>Deploy</ArchButton>
</template>
```

## Theming

Archora UI uses `data-theme` on the document root. The built-in themes are `dark`, `light`, and `system` through the `useTheme` composable.

```ts
import { useTheme } from "@archora/ui";

const { setTheme } = useTheme();

setTheme("dark");
setTheme("light");
setTheme("system");
setTheme("brand");
```

### Custom themes

A theme is the minimal set of base colors scoped to a `data-theme` name. The
derived tokens — surfaces, muted text, borders, `primary` hover/active/glow —
are computed from that base via `color-mix`, so you don't hand-pick 25 values:

```css
[data-theme="brand"] {
  color-scheme: dark; /* switches native controls and scrollbars */

  --arch-color-bg: #080b12;
  --arch-color-fg: #f8fafc;
  --arch-color-border: #243044;
  --arch-color-primary: #8b5cf6;
  --arch-color-accent: #22d3ee;
}
```

You can still override any derived token explicitly when you need fine control.

### Theming at runtime

Register a theme from JavaScript — `defineTheme` injects the rule and derives a
readable text color for the primary by WCAG contrast:

```ts
import { defineTheme, setAccent, useTheme } from "@archora/ui";

defineTheme("brand", {
  bg: "#080b12",
  fg: "#f8fafc",
  primary: "#8b5cf6"
});

useTheme().setTheme("brand");

// Or just recolor the current theme's accent on the fly:
setAccent("#22d3ee");
```

`defineTheme` is SSR-safe (it returns the CSS string and skips DOM work when
there is no `document`). Use `buildThemeCss(name, colors)` to render the rule
during server rendering.

## Workspace

```txt
apps/docs          VitePress documentation and live component sandboxes
packages/ui        Vue component library
packages/tokens    token source and theme contracts
packages/icons     icon package boundary
```

## Development

```sh
corepack pnpm install
corepack pnpm dev
```

Common commands:

```sh
corepack pnpm dev:docs
corepack pnpm build
corepack pnpm build:ui
corepack pnpm build:docs
corepack pnpm test
corepack pnpm typecheck
corepack pnpm lint
corepack pnpm stylelint
corepack pnpm format:check
```

## Quality

Before publishing changes, run:

```sh
corepack pnpm lint
corepack pnpm typecheck
corepack pnpm test
corepack pnpm build
```

## Status

Archora UI is in public preview. The component foundation, documentation, custom theme contract, and quality gates are ready for repository publication.

See [ROADMAP.md](./ROADMAP.md) for the planned path from public preview to release readiness.
