# Theming

Archora UI is dark-first and themeable through CSS variables. Theme selection is applied with
`data-theme` on the root element and should be set once near app startup.

Supported preferences are:

- `dark`
- `light`
- `system`

```ts
import { useTheme } from "@archora/ui";

const theme = useTheme();

theme.setTheme("system");
```

`useTheme` persists explicit choices in `localStorage`. The `system` preference follows
`prefers-color-scheme` and updates the applied `data-theme` value when the OS setting changes.

Component styles consume semantic variables such as `--arch-color-bg`,
`--arch-color-fg`, `--arch-color-border`, `--arch-color-primary`, and
`--arch-shadow-focus`. Override those variables in your product shell when you need brand
alignment, but keep contrast and focus indicators visible in both themes.
