# Design Tokens

Tokens define color, radius, shadow, typography, and motion values. Using tokens keeps the system visually consistent.

## Core Variables

```css
:root {
  /* Background colors */
  --arch-color-bg: #05070d;
  --arch-color-bg-subtle: #0f172a;

  /* Text */
  --arch-color-fg: #f8fafc;
  --arch-color-fg-muted: #94a3b8;

  /* Accents */
  --arch-color-primary: #8b5cf6;
  --arch-color-primary-fg: #ffffff;
  --arch-color-accent: #22d3ee;
  --arch-color-accent-fg: #041016;

  /* Organic flow */
  --arch-radius-lg: 1.25rem;
  --arch-shadow-md: 0 18px 50px rgba(15, 23, 42, 0.32);
}
```

## Usage Rules

- **Semantics:** Use semantic variables instead of hard-coded HEX values.
- **Spacing:** Use `--arch-space-*` variables to preserve interface rhythm.
- **Motion:** Respect reduced-motion preferences through `--arch-duration-*` variables.
- **Focus:** Keep visible focus outlines and use `--arch-shadow-focus` for styling.

## Theme Contract

Custom palettes should override semantic variables, not component selectors. The minimum color set is:

```css
[data-theme="brand"] {
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
  --arch-color-success: #22c55e;
  --arch-color-success-fg: #ffffff;
  --arch-color-warning: #f59e0b;
  --arch-color-warning-fg: #111827;
  --arch-color-danger: #fb7185;
  --arch-color-danger-fg: #ffffff;
  --arch-color-info: #38bdf8;
  --arch-color-info-fg: #07101d;
}
```

See [Theming](/guide/theming) for a full custom theme example.
