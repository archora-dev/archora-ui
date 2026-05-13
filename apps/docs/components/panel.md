# Panel

Application panel with header, body, and footer slots.

## Usage

```vue
<script setup>
import { ArchPanel } from "@archora/ui";
</script>

<template>
  <ArchPanel title="Inspector" description="Selected module" scrollable>Details</ArchPanel>
</template>
```

<ComponentSandbox name="panel" />

## Props

| Prop       | Type                           | Default | Description                |
| :--------- | :----------------------------- | :------ | :------------------------- |
| title      | string                         | -       | Title.                     |
| padding    | "none" \| "sm" \| "md" \| "lg" | "md"    | Inner padding.             |
| scrollable | boolean                        | false   | Makes the body scrollable. |

## Slots

| Slot        | Props | Description         |
| :---------- | :---- | :------------------ |
| title       | -     | Custom title.       |
| description | -     | Custom description. |
| default     | -     | Panel body.         |
| footer      | -     | Footer.             |
