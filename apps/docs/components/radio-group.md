# Radio Group

Radio option group with horizontal or vertical layout.

## Usage

```vue
<script setup>
import { ref } from "vue";
import { ArchRadioGroup } from "@archora/ui";

const value = ref("auto");
const options = [
  { value: "auto", label: "Auto" },
  { value: "manual", label: "Manual" }
];
</script>

<template>
  <ArchRadioGroup v-model="value" :options="options" />
</template>
```

<ComponentSandbox name="radio-group" />

## Props

| Prop           | Type                                                                           | Default    | Description                  |
| :------------- | :----------------------------------------------------------------------------- | :--------- | :--------------------------- |
| options        | `{ value: string; label: string; description?: string; disabled?: boolean }[]` | -          | Option list.                 |
| modelValue     | string                                                                         | -          | `v-model` value.             |
| name           | string                                                                         | -          | Field name.                  |
| orientation    | "horizontal" \| "vertical"                                                     | "vertical" | Orientation.                 |
| size           | "sm" \| "md" \| "lg"                                                           | "md"       | Size.                        |
| disabled       | boolean                                                                        | false      | Disables the component.      |
| required       | boolean                                                                        | false      | Marks the field as required. |
| invalid        | boolean                                                                        | false      | Invalid state.               |
| ariaLabel      | string                                                                         | -          | aria-label.                  |
| ariaLabelledby | string                                                                         | -          | aria-labelledby.             |

## Events

| Event             | Payload       | Description          |
| :---------------- | :------------ | :------------------- |
| update:modelValue | value: string | `modelValue` change. |
| change            | value: string | Value change.        |
