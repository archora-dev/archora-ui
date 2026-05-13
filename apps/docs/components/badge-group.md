# Badge Group

Limits visible badges and shows an overflow count.

## Usage

```vue
<script setup>
import { ArchBadge, ArchBadgeGroup } from "@archora/ui";

const tags = ["Vue", "A11y", "Tokens", "Forms"];
</script>

<template>
  <ArchBadgeGroup :items="tags" :limit="3" v-slot="{ item }">
    <ArchBadge>{{ item }}</ArchBadge>
  </ArchBadgeGroup>
</template>
```

<ComponentSandbox name="badge-group" />

## Props

| Prop  | Type                                         | Default | Description              |
| :---- | :------------------------------------------- | :------ | :----------------------- |
| items | readonly T[]                                 | -       | Item collection.         |
| limit | number                                       | 2       | Number of visible items. |
| gap   | "xs" \| "sm"                                 | "sm"    | Spacing between items.   |
| keyFn | (item: T, index: number) => string \| number | -       | `v-for` key function.    |

## Slots

| Slot    | Props                      | Description               |
| :------ | :------------------------- | :------------------------ |
| default | { item: T; index: number } | Renders one visible item. |
