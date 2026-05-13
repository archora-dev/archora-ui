# Spinner

Inline loading indicator with a status aria-label.

## Usage

```vue
<script setup>
import { ArchSpinner } from "@archora/ui";
</script>

<template>
  <ArchSpinner label="Loading projects" tone="accent" />
</template>
```

<ComponentSandbox name="spinner" />

## Props

| Prop  | Type                             | Default   | Description               |
| :---- | :------------------------------- | :-------- | :------------------------ |
| size  | "sm" \| "md" \| "lg"             | "md"      | Size.                     |
| tone  | "muted" \| "accent" \| "primary" | "muted"   | Color tone.               |
| label | string                           | "Loading" | Accessible label or text. |
