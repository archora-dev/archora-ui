# Tabs

Accessible tabs with keyboard navigation and named panel slots.

## Usage

```vue
<script setup>
import { ref } from "vue";
import { ArchTabs } from "@archora/ui";

const tab = ref("overview");
const items = [
  { value: "overview", label: "Overview" },
  { value: "events", label: "Events" }
];
</script>

<template>
  <ArchTabs v-model="tab" :items="items">
    <template #overview>Overview content</template>
    <template #events>Events content</template>
  </ArchTabs>
</template>
```

<ComponentSandbox name="tabs" />

## Props

| Prop       | Type                                                     | Default | Description      |
| :--------- | :------------------------------------------------------- | :------ | :--------------- |
| items      | `{ value: string; label: string; disabled?: boolean }[]` | -       | Item collection. |
| modelValue | string                                                   | -       | `v-model` value. |
| ariaLabel  | string                                                   | "Tabs"  | aria-label.      |

## Events

| Event             | Payload       | Description          |
| :---------------- | :------------ | :------------------- |
| update:modelValue | value: string | `modelValue` change. |
| change            | value: string | Value change.        |

## Slots

| Slot    | Props                                                             | Description                                  |
| :------ | :---------------------------------------------------------------- | :------------------------------------------- |
| {value} | -                                                                 | Named slot for the panel matching the value. |
| default | `{ item?: { value: string; label: string; disabled?: boolean } }` | Fallback panel.                              |
