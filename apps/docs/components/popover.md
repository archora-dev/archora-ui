# Popover

Floating content with a trigger slot, outside-click handling, and positioning.

## Usage

```vue
<script setup>
import { ArchPopover, ArchButton } from "@archora/ui";
</script>

<template>
  <ArchPopover placement="bottom-start">
    <template #trigger><ArchButton variant="secondary">Filters</ArchButton></template>
    <template #default="{ close }">Popover content</template>
  </ArchPopover>
</template>
```

<ComponentSandbox name="popover" />

## Props

| Prop      | Type              | Default  | Description                 |
| :-------- | :---------------- | :------- | :-------------------------- |
| placement | FloatingPlacement | "bottom" | Floating element placement. |
| offset    | number            | 8        | Offset from the trigger.    |

## Slots

| Slot    | Props                 | Description      |
| :------ | :-------------------- | :--------------- |
| trigger | { isOpen: boolean }   | Trigger popover. |
| default | { close: () => void } | Popover content. |
