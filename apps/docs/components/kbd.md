# Kbd

Displays a key or key combination.

## Usage

```vue
<script setup>
import { ArchKbd } from "@archora/ui";
</script>

<template><ArchKbd>Cmd</ArchKbd> <ArchKbd>K</ArchKbd></template>
```

<ComponentSandbox name="kbd" />

## Props

| Prop    | Type                               | Default   | Description        |
| :------ | :--------------------------------- | :-------- | :----------------- |
| as      | "kbd" \| "span"                    | "kbd"     | Root HTML element. |
| size    | "sm" \| "md" \| "lg"               | "md"      | Size.              |
| variant | "default" \| "subtle" \| "outline" | "default" | Visual variant.    |

## Slots

| Slot    | Props | Description |
| :------ | :---- | :---------- |
| default | -     | Key text.   |
