# Virtual Scroller

Virtualizes long lists with fixed-height items.

## Usage

```vue
<script setup>
import { ArchVirtualScroller } from "@archora/ui";

const items = Array.from({ length: 1000 }, (_, index) => ({ id: index, label: "Item " + index }));
</script>

<template>
  <ArchVirtualScroller :items="items" :item-height="40" style="height: 320px" v-slot="{ item }">
    {{ item.label }}
  </ArchVirtualScroller>
</template>
```

<ComponentSandbox name="virtual-scroller" />

## Props

| Prop       | Type      | Default | Description        |
| :--------- | :-------- | :------ | :----------------- |
| items      | unknown[] | -       | Item collection.   |
| itemHeight | number    | -       | Fixed item height. |

## Slots

| Slot    | Props                            | Description             |
| :------ | :------------------------------- | :---------------------- |
| default | { item: unknown; index: number } | Renders a visible item. |
