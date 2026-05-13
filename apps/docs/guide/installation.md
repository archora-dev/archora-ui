# Installation

Archora UI is distributed as a set of npm packages.

## Step 1: Install Packages

Install the main component package and tokens with your preferred package manager:

```sh
# pnpm
pnpm add @archora/ui @archora/tokens

# npm
npm install @archora/ui @archora/tokens

# yarn
yarn add @archora/ui @archora/tokens
```

## Step 2: Import Styles

Import the base styles in your app entry file, such as `main.ts` or `App.vue`:

```ts
import "@archora/ui/styles.css";
```

## Step 3: Configure Theme

Archora UI uses the dark theme by default. Add `data-theme="light"` to the `html` element to enable the light theme:

```html
<html data-theme="light"></html>
```

You can also use the `useTheme` composable for dynamic theme switching, including custom theme names such as `brand`.
