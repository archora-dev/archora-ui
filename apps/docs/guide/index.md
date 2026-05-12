# Introduction

Archora UI is a Vue 3 and TypeScript component system for dark-first dashboards and internal tools.

The package exposes components from `@archora/ui` and styles from `@archora/ui/styles.css`.

```ts
import { useTheme } from "@archora/ui";
import "@archora/ui/styles.css";
```

## What Is Included

- A pnpm monorepo with `@archora/ui`, `@archora/tokens`, docs, and playground apps.
- CSS-variable tokens for colors, spacing, radius, typography, shadows, and motion.
- Theme primitives for dark, light, and system preferences.
- Component coverage across base controls, overlays, search surfaces, forms, and data display.
- Archora Console, a real-world dashboard demo that uses the package as a consumer.
- Vitest, Vue Test Utils, ESLint, Prettier, Stylelint, VitePress, Histoire, and Changesets.

Use the guide pages for installation, quick start, theming, accessibility notes, and roadmap context.
For local review, run `corepack pnpm dev:docs` for this documentation site and
`corepack pnpm dev:playground` for the Histoire component gallery.

## Real-World Demo

The dashboard demo lives in `apps/demo` and is documented in [Dashboard Demo](/guide/demo). It
covers Overview, Projects, Team, Settings, and Billing screens and is included in the public preview
smoke checks.
