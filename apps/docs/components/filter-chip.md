# Filter Chip

Compact toggle chip for filters.

## Usage

```vue
<script setup>
import { ref } from "vue";
import { ArchFilterChip } from "@archora/ui";

const active = ref(false);
</script>

<template>
  <ArchFilterChip :active="active" @toggle="active = !active">Healthy</ArchFilterChip>
</template>
```

<ComponentSandbox name="filter-chip" />

## Props

| Prop     | Type    | Default | Description             |
| :------- | :------ | :------ | :---------------------- |
| active   | boolean | false   | Active state.           |
| disabled | boolean | false   | Disables the component. |

## Events

| Event  | Payload | Description      |
| :----- | :------ | :--------------- |
| toggle | -       | Component event. |

## Slots

| Slot    | Props | Description |
| :------ | :---- | :---------- |
| default | -     | Chip text.  |
