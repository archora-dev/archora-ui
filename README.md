# Archora UI

Archora UI is a Vue 3 and TypeScript component library for dense dashboards, internal tools, and professional product interfaces.

The project is built around typed Vue components, semantic design tokens, accessible interaction patterns, and VitePress documentation with live component sandboxes.

## Highlights

- **Vue 3 + TypeScript:** typed component APIs, emits, slots, and public exports.
- **Token-driven styling:** colors, spacing, radii, shadows, motion, and z-index values are exposed as CSS variables.
- **Custom themes:** built-in dark/light themes plus custom `data-theme` palettes such as `brand`.
- **Accessible components:** keyboard support, visible focus states, semantic disabled states, and ARIA where it clarifies behavior.
- **Interactive documentation:** every component page includes a live sandbox for testing states and props.
- **Package-ready structure:** monorepo layout designed for a future `@archora/ui` package release.

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

Custom palettes are regular CSS variables scoped to a theme name:

```css
[data-theme="brand"] {
  color-scheme: dark;

  --arch-color-bg: #080b12;
  --arch-color-bg-subtle: #101827;
  --arch-color-bg-elevated: #131c2e;
  --arch-color-fg: #f8fafc;
  --arch-color-fg-muted: #a9b4c7;
  --arch-color-fg-subtle: #748199;
  --arch-color-border: #243044;
  --arch-color-border-strong: #40506a;
  --arch-color-primary: #8b5cf6;
  --arch-color-primary-fg: #ffffff;
  --arch-color-accent: #22d3ee;
  --arch-color-accent-fg: #041016;
}
```

See the theming guide for the full color contract and non-color tokens.

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
