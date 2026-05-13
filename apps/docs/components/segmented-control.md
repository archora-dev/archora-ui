# Segmented Control

Switches between mutually exclusive modes.

## Usage

```vue
<script setup>
import { ref } from "vue";
import { ArchSegmentedControl } from "@archora/ui";

const mode = ref("daily");
const options = [
  { value: "daily", label: "Daily" },
  { value: "weekly", label: "Weekly" }
];
</script>

<template>
  <ArchSegmentedControl v-model="mode" :options="options" />
</template>
```

<ComponentSandbox name="segmented-control" />

## Props

| Prop           | Type                                                     | Default | Description                          |
| :------------- | :------------------------------------------------------- | :------ | :----------------------------------- |
| options        | `{ value: string; label: string; disabled?: boolean }[]` | -       | Option list.                         |
| modelValue     | string                                                   | -       | `v-model` value.                     |
| size           | "sm" \| "md" \| "lg"                                     | "md"    | Size.                                |
| variant        | "solid" \| "outline" \| "ghost"                          | "solid" | Visual variant.                      |
| disabled       | boolean                                                  | false   | Disables the component.              |
| fullWidth      | boolean                                                  | false   | Stretches the control to full width. |
| ariaLabel      | string                                                   | -       | aria-label.                          |
| ariaLabelledby | string                                                   | -       | aria-labelledby.                     |

## Events

| Event             | Payload       | Description          |
| :---------------- | :------------ | :------------------- |
| update:modelValue | value: string | `modelValue` change. |
| change            | value: string | Value change.        |
