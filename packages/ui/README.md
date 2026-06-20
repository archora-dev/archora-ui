# @archora/ui

[![npm](https://img.shields.io/npm/v/@archora/ui)](https://www.npmjs.com/package/@archora/ui)
[![minzip](https://img.shields.io/bundlephobia/minzip/@archora/ui)](https://bundlephobia.com/package/@archora/ui)
[![CI](https://github.com/archora-dev/archora-ui/actions/workflows/ci.yml/badge.svg)](https://github.com/archora-dev/archora-ui/actions/workflows/ci.yml)
[![license](https://img.shields.io/npm/l/@archora/ui)](./LICENSE)

**Dark-first Vue 3 component library for dense dashboards and internal tools.**

Not another general-purpose marketing kit. Archora is built for the screens
where people spend the whole workday: observability panels, admin consoles,
release pipelines — high information density, calm visuals, readable under load.

```sh
pnpm add @archora/ui
```

```ts
import { ArchButton } from "@archora/ui";
import "@archora/ui/styles.css";
```

```vue
<template>
  <ArchButton variant="primary">Deploy</ArchButton>
</template>
```

## Why archora-ui

- **Dark-first, not dark-as-an-afterthought.** Designed in dark, with a tuned
  light theme — both shipped, both verified.
- **Dense by default.** Compact rhythm, data tables, virtual scrolling, keyed
  rows, filters and overlays — primitives for tools, not landing pages.
- **Themed by tokens, not config objects.** Set a handful of `--arch-color-*`
  base colors on a `data-theme` selector; surfaces, muted text, borders and
  `primary` hover/active states derive via `color-mix`. SSR-safe runtime
  theming with `defineTheme` / `setAccent`.
- **Tiny per component.** Side-effect-free ESM: a single `ArchButton` import is
  ~0.6 kB brotli, the whole library ~20 kB. A bundle budget guards regressions.
- **Accessible by default.** Keyboard support, visible focus, semantic ARIA —
  interactive components are checked against `axe-core` in CI.

### Why not Vuetify / PrimeVue / Element Plus

Those are excellent broad, light-first, Material/enterprise kits aimed at
general apps. Archora deliberately trades breadth and theming layers for a
narrow target: a dense dark dashboard aesthetic out of the box, a token contract
instead of a theming framework, and a small surface you can read end to end.
If you're building a public marketing site, reach for the broad kits. If you're
building the internal tool behind it, this is for you.

## Theming

A theme is a minimal set of base colors scoped to a `data-theme` name; derived
tokens compute from it, so you don't hand-pick dozens of values:

```css
[data-theme="brand"] {
  color-scheme: dark;

  --arch-color-bg: #080b12;
  --arch-color-fg: #f8fafc;
  --arch-color-border: #243044;
  --arch-color-primary: #8b5cf6;
  --arch-color-accent: #22d3ee;
}
```

At runtime, `defineTheme` injects the rule and derives a WCAG-readable text
color for the primary; it returns the CSS string and skips DOM work without a
`document`, so it is SSR-safe:

```ts
import { defineTheme, setAccent, useTheme } from "@archora/ui";

defineTheme("brand", { bg: "#080b12", fg: "#f8fafc", primary: "#8b5cf6" });
useTheme().setTheme("brand");

setAccent("#22d3ee"); // recolor the current theme's accent on the fly
```

Built-in themes: `dark`, `light`, `system`.

## Documentation

Components, live sandboxes, theming and tokens — see the
[documentation site](https://archora-dev.github.io/archora-ui/).

## License

[MIT](./LICENSE)
