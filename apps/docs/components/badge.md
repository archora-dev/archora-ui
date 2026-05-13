# Badge

Compact label for status, category, or count.

## Usage

```vue
<script setup>
import { ArchBadge } from "@archora/ui";
</script>

<template>
  <ArchBadge variant="success">Stable</ArchBadge>
</template>
```

<ComponentSandbox name="badge" />

## Props

| Prop    | Type                                                                   | Default   | Description        |
| :------ | :--------------------------------------------------------------------- | :-------- | :----------------- |
| as      | "span" \| "strong"                                                     | "span"    | Root HTML element. |
| variant | "neutral" \| "primary" \| "success" \| "warning" \| "danger" \| "info" | "neutral" | Visual variant.    |
| size    | "sm" \| "md"                                                           | "md"      | Size.              |

## Slots

| Slot    | Props | Description |
| :------ | :---- | :---------- |
| default | -     | Badge text. |
