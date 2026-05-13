# Select

Select control backed by an options array and a disabled state.

## Usage

```vue
<script setup>
import { ref } from "vue";
import { ArchSelect } from "@archora/ui";

const value = ref("");
const options = [
  { value: "open", label: "Open" },
  { value: "closed", label: "Closed" }
];
</script>

<template>
  <ArchSelect v-model="value" :options="options" placeholder="Choose status" />
</template>
```

<ComponentSandbox name="select" />

## Props

| Prop        | Type                                                     | Default         | Description             |
| :---------- | :------------------------------------------------------- | :-------------- | :---------------------- |
| options     | `{ value: string; label: string; disabled?: boolean }[]` | -               | Option list.            |
| modelValue  | string                                                   | -               | `v-model` value.        |
| placeholder | string                                                   | "Select option" | Placeholder.            |
| disabled    | boolean                                                  | false           | Disables the component. |

## Events

| Event             | Payload       | Description          |
| :---------------- | :------------ | :------------------- |
| update:modelValue | value: string | `modelValue` change. |
| change            | value: string | Value change.        |
