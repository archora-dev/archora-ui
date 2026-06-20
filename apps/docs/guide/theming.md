# Theming

Archora UI is dark-first and themed entirely through CSS custom properties. A
theme is the **minimal set of base colors** scoped to a `data-theme` name. The
derived tokens — surfaces, muted text, borders, and `primary` hover/active/glow —
are computed from that base with `color-mix`, so you don't hand-pick 25 values.

Switch themes with the `useTheme` composable:

```ts
import { useTheme } from "@archora/ui";

const { setTheme } = useTheme();

setTheme("system"); // follow the OS preference
setTheme("light");
setTheme("brand"); // any custom theme name
```

`useTheme` stores the preference in `localStorage`. Built-in themes resolve to
`data-theme="dark"` or `data-theme="light"`; custom names are written directly,
so `setTheme("brand")` applies `data-theme="brand"`.

## Theme generator

Pick four colors and copy a ready-to-paste theme. The preview uses real
components, and the text color on `primary` is derived by WCAG contrast.

<ThemeGenerator />

## Custom theme (CSS)

Define a theme after importing `@archora/ui/styles.css`. Set the base colors and
let the rest derive:

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

Any derived token can still be overridden explicitly when you need fine control
(for example, hand-tuned surfaces).

## Theming at runtime

Register a theme from JavaScript. `defineTheme` injects the rule and derives a
readable `primary` text color by contrast:

```ts
import { defineTheme, setAccent, useTheme } from "@archora/ui";

defineTheme("brand", {
  bg: "#080b12",
  fg: "#f8fafc",
  primary: "#8b5cf6",
  accent: "#22d3ee"
});

useTheme().setTheme("brand");

// Recolor the current theme's accent on the fly:
setAccent("#22d3ee");
```

`defineTheme` is SSR-safe: with no `document` it skips DOM work and returns the
CSS string. Use `buildThemeCss(name, colors)` to render the rule during server
rendering, and `readableForeground(color)` to pick accessible text colors
yourself.

## Theme contract

The contract is semantic, not component-specific. You set the **base** tokens;
the **derived** tokens follow automatically but remain overridable.

| Variable                                             | Kind    | Purpose                                        |
| :--------------------------------------------------- | :------ | :--------------------------------------------- |
| `--arch-color-bg`                                    | base    | Page and app background.                       |
| `--arch-color-fg`                                    | base    | Primary text and icons.                        |
| `--arch-color-border`                                | base    | Default component borders.                     |
| `--arch-color-primary` / `--arch-color-primary-fg`   | base    | Primary actions (`-fg` derives by contrast).   |
| `--arch-color-accent` / `--arch-color-accent-fg`     | base    | Accent states (`-fg` derives by contrast).     |
| `--arch-color-danger` / `-fg`                        | base    | Danger and destructive states.                 |
| `--arch-color-success` / `-fg`                       | base    | Success states.                                |
| `--arch-color-warning` / `-fg`                       | base    | Warning states.                                |
| `--arch-color-info` / `-fg`                          | base    | Informational states.                          |
| `--arch-color-bg-subtle`                             | derived | Muted panels, hover fills, secondary surfaces. |
| `--arch-color-bg-elevated`                           | derived | Cards, popovers, inputs, raised surfaces.      |
| `--arch-color-fg-muted` / `--arch-color-fg-subtle`   | derived | Secondary and low-emphasis text.               |
| `--arch-color-border-strong`                         | derived | Strong borders and active outlines.            |
| `--arch-color-primary-hover` / `-active` / `-subtle` | derived | Primary interaction states.                    |
| `--arch-color-primary-glow`                          | derived | Focus glow and accent shadows.                 |

## Non-color tokens

Override shape, elevation, and motion tokens in the same scope:

```css
[data-theme="brand"] {
  --arch-radius-md: 12px;
  --arch-radius-lg: 16px;
  --arch-duration-normal: 180ms;
}
```
