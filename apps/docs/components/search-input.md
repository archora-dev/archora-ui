# Search Input

Search field with a clear button and exposed `focus()` method.

## Usage

```vue
<script setup>
import { ref } from "vue";
import { ArchSearchInput } from "@archora/ui";

const query = ref("");
</script>

<template>
  <ArchSearchInput v-model="query" placeholder="Search modules" />
</template>
```

<ComponentSandbox name="search-input" />

## Props

| Prop        | Type    | Default  | Description               |
| :---------- | :------ | :------- | :------------------------ |
| modelValue  | string  | ""       | `v-model` value.          |
| placeholder | string  | ""       | Placeholder.              |
| disabled    | boolean | false    | Disables the component.   |
| label       | string  | "Search" | Accessible label or text. |

## Events

| Event             | Payload       | Description          |
| :---------------- | :------------ | :------------------- |
| update:modelValue | value: string | `modelValue` change. |
