# Theming

Archora UI is built for dark interfaces first, but it supports light and custom themes through CSS variables. Set the `data-theme` attribute on the root `html` element to choose a theme.

Supported values:

- `dark`
- `light`
- `system`
- any custom theme name, such as `brand`

```ts
import { useTheme } from "@archora/ui";

const { setTheme } = useTheme();

// Use the system preference
setTheme("system");

// Use a custom theme
setTheme("brand");
```

`useTheme` stores the user preference in `localStorage`. Built-in themes resolve to `data-theme="dark"` or `data-theme="light"`. Custom themes are written directly to `data-theme`, so `setTheme("brand")` applies `data-theme="brand"`.

## Custom Palette

Define custom themes after importing `@archora/ui/styles.css`. Scope them to a `data-theme` selector and override the semantic variables used by components.

```css
[data-theme="brand"] {
  color-scheme: dark;

  --arch-color-bg: #080b12;
  --arch-color-bg-subtle: #101827;
  --arch-color-bg-elevated: #131c2e;
  --arch-color-surface: #131c2e;
  --arch-color-surface-2: #101827;

  --arch-color-fg: #f8fafc;
  --arch-color-fg-muted: #a9b4c7;
  --arch-color-fg-subtle: #748199;
  --arch-color-text-primary: var(--arch-color-fg);
  --arch-color-text-secondary: var(--arch-color-fg-muted);
  --arch-color-text-muted: var(--arch-color-fg-muted);
  --arch-color-text-subtle: var(--arch-color-fg-subtle);

  --arch-color-border: #243044;
  --arch-color-border-strong: #40506a;

  --arch-color-primary: #8b5cf6;
  --arch-color-primary-fg: #ffffff;
  --arch-color-primary-glow: rgb(139 92 246 / 0.34);

  --arch-color-accent: #22d3ee;
  --arch-color-accent-fg: #041016;
  --arch-color-accent-glow: rgb(34 211 238 / 0.28);

  --arch-color-success: #22c55e;
  --arch-color-success-fg: #ffffff;
  --arch-color-warning: #f59e0b;
  --arch-color-warning-fg: #111827;
  --arch-color-danger: #fb7185;
  --arch-color-danger-fg: #ffffff;
  --arch-color-info: #38bdf8;
  --arch-color-info-fg: #07101d;

  --arch-glass-bg: var(--arch-color-bg-elevated);
  --arch-glass-border: var(--arch-color-border);
}
```

## Theme Contract

The color contract is semantic, not component-specific. Components read these variables:

| Variable                                           | Purpose                                              |
| :------------------------------------------------- | :--------------------------------------------------- |
| `--arch-color-bg`                                  | Page and app background.                             |
| `--arch-color-bg-subtle`                           | Muted panels, hover states, and secondary fills.     |
| `--arch-color-bg-elevated`                         | Cards, popovers, inputs, and raised surfaces.        |
| `--arch-color-fg`                                  | Primary text and icons.                              |
| `--arch-color-fg-muted`                            | Secondary text and inactive icons.                   |
| `--arch-color-fg-subtle`                           | Low-emphasis labels and helper text.                 |
| `--arch-color-border`                              | Default component borders.                           |
| `--arch-color-border-strong`                       | Strong borders and active outlines.                  |
| `--arch-color-primary` / `--arch-color-primary-fg` | Primary actions.                                     |
| `--arch-color-accent` / `--arch-color-accent-fg`   | Focused controls, selected dates, and accent states. |
| `--arch-color-success` / `--arch-color-success-fg` | Success states.                                      |
| `--arch-color-warning` / `--arch-color-warning-fg` | Warning states.                                      |
| `--arch-color-danger` / `--arch-color-danger-fg`   | Danger and destructive states.                       |
| `--arch-color-info` / `--arch-color-info-fg`       | Informational states.                                |

Set foreground variables with enough contrast for their paired background. For example, `--arch-color-primary-fg` must be readable on `--arch-color-primary`.

## Non-Color Tokens

You can also override shape, elevation, and motion tokens in the same theme scope:

```css
[data-theme="brand"] {
  --arch-radius-md: 12px;
  --arch-radius-lg: 16px;
  --arch-shadow-focus: 0 0 0 2px var(--arch-color-bg), 0 0 0 4px var(--arch-color-accent);
  --arch-duration-normal: 180ms;
}
```
