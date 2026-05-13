# Date Picker

Date selection with min/max constraints and direct month/year controls.

## Usage

```vue
<script setup>
import { ref } from "vue";
import { ArchDatePicker } from "@archora/ui";

const date = ref("");
</script>

<template>
  <ArchDatePicker v-model="date" min="2026-01-01" max="2026-12-31" />
</template>
```

<ComponentSandbox name="date-picker" />

## Props

| Prop        | Type    | Default       | Description             |
| :---------- | :------ | :------------ | :---------------------- |
| modelValue  | string  | -             | `v-model` value.        |
| placeholder | string  | "Select date" | Placeholder.            |
| min         | string  | -             | Minimum value.          |
| max         | string  | -             | Maximum value.          |
| disabled    | boolean | false         | Disables the component. |

## Events

| Event             | Payload       | Description          |
| :---------------- | :------------ | :------------------- |
| update:modelValue | value: string | `modelValue` change. |
| change            | value: string | Value change.        |
