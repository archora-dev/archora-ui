# Quick Start

Start using Archora UI components in your application in a few minutes.

## Component Usage

After installing the packages and importing styles, use components directly in your Vue files.

```vue
<script setup lang="ts">
import { ArchButton, ArchCard, useToast } from "@archora/ui";

const toast = useToast();

function handleClick() {
  toast.show({
    title: "Success",
    description: "You have started using Archora UI.",
    variant: "success"
  });
}
</script>

<template>
  <ArchCard variant="elevated" padding="lg">
    <h1>Welcome</h1>
    <p>This is a basic Archora UI design-system example.</p>
    <ArchButton @click="handleClick">Click me</ArchButton>
  </ArchCard>
</template>
```

## Working With Tokens

Use system CSS variables to customize your own styles:

```css
.custom-box {
  background: var(--arch-color-bg-subtle);
  border-radius: var(--arch-radius-lg);
  padding: var(--arch-space-4);
  box-shadow: var(--arch-shadow-md);
}
```

## Interactive Documentation

Run `pnpm dev:docs` and open the Components section to inspect components in the browser. Every component page includes an embedded sandbox.
