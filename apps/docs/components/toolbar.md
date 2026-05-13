# Toolbar

ARIA toolbar for grouping commands with orientation, density, and wrapping.

## Usage

```vue
<script setup>
import { Save } from "lucide-vue-next";
import { ArchToolbar, ArchIconButton } from "@archora/ui";
</script>

<template>
  <ArchToolbar aria-label="Editor actions">
    <ArchIconButton :icon="Save" label="Save" />
  </ArchToolbar>
</template>
```

<ComponentSandbox name="toolbar" />

## Props

| Prop           | Type                                 | Default      | Description            |
| :------------- | :----------------------------------- | :----------- | :--------------------- |
| orientation    | "horizontal" \| "vertical"           | "horizontal" | Orientation.           |
| density        | "compact" \| "cozy" \| "comfortable" | "cozy"       | Toolbar density.       |
| variant        | "plain" \| "subtle" \| "outlined"    | "plain"      | Visual variant.        |
| wrap           | boolean                              | true         | Allows wrapping items. |
| ariaLabel      | string                               | -            | aria-label.            |
| ariaLabelledby | string                               | -            | aria-labelledby.       |

## Slots

| Slot    | Props | Description                   |
| :------ | :---- | :---------------------------- |
| default | -     | Toolbar buttons and controls. |
