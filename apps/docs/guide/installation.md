# Installation

Archora UI is distributed from the `@archora/ui` package. The current repository state is a public
preview; package publishing metadata is still being finalized.

::: code-group

```sh [pnpm]
pnpm add @archora/ui
```

```sh [npm]
npm install @archora/ui
```

```sh [yarn]
yarn add @archora/ui
```

:::

Import the component package and stylesheet once in your app entry or root layout.

```ts
import { createApp } from "vue";
import { ArchButton } from "@archora/ui";
import "@archora/ui/styles.css";
```

During local workspace development, docs and playground resolve `@archora/ui` directly to `packages/ui/src`.

For release-candidate checks before publishing, pack the UI package and install that tarball into a
clean Vite/Vue app:

```sh
corepack pnpm --filter @archora/ui build
cd packages/ui
corepack pnpm pack --pack-destination /tmp
```
