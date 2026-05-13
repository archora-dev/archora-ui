# Tooltip

Tooltip that opens on hover/focus and closes on Escape.

## Usage

```vue
<script setup>
import { ArchTooltip, ArchButton } from "@archora/ui";
</script>

<template>
  <ArchTooltip content="Run validation" placement="top">
    <ArchButton variant="secondary">Validate</ArchButton>
  </ArchTooltip>
</template>
```

<ComponentSandbox name="tooltip" />

## Props

| Prop      | Type                                   | Default | Description                 |
| :-------- | :------------------------------------- | :------ | :-------------------------- |
| content   | string                                 | -       | Tooltip text.               |
| placement | "top" \| "right" \| "bottom" \| "left" | "top"   | Floating element placement. |

## Slots

| Slot    | Props | Description      |
| :------ | :---- | :--------------- |
| default | -     | Trigger element. |
