# Design Tokens

Tokens cover color, background, foreground, border, accent, radius, spacing, shadows, typography,
motion, and z-index.

Component styles should consume semantic variables instead of hardcoded values.

## Useful Variables

```css
:root {
  --arch-color-bg: #020617;
  --arch-color-bg-subtle: #0f172a;
  --arch-color-bg-elevated: #111827;
  --arch-color-fg: #f8fafc;
  --arch-color-fg-muted: #94a3b8;
  --arch-color-border: rgb(148 163 184 / 0.22);
  --arch-color-primary: #8b5cf6;
  --arch-color-primary-fg: #ffffff;
  --arch-color-accent: #22d3ee;
  --arch-color-accent-fg: #0f172a;
  --arch-radius-md: 0.5rem;
  --arch-space-4: 1rem;
  --arch-shadow-focus: 0 0 0 3px rgb(34 211 238 / 0.35);
}
```

## Token Rules

- Use semantic color variables in components and product examples.
- Keep focus styling on `--arch-shadow-focus` so keyboard states stay consistent.
- Prefer spacing tokens for component internals; use layout-specific values only in app shells.
- Respect reduced motion through the duration variables in `tokens.css`.
