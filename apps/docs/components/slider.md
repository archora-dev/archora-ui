# Slider

Range input for numeric settings and thresholds.

## Usage

```vue
<script setup>
import { ref } from "vue";
import { ArchSlider } from "@archora/ui";

const threshold = ref(70);
</script>

<template>
  <ArchSlider v-model="threshold" label="Risk threshold" show-value />
</template>
```

<ComponentSandbox name="slider" />

## Props

| Prop       | Type    | Default | Description               |
| :--------- | :------ | :------ | :------------------------ |
| modelValue | number  | -       | `v-model` value.          |
| label      | string  | -       | Accessible label or text. |
| min        | number  | 0       | Minimum value.            |
| max        | number  | 100     | Maximum value.            |
| step       | number  | 1       | Step.                     |
| disabled   | boolean | false   | Disables the component.   |
| showValue  | boolean | false   | Shows the current value.  |

## Events

| Event             | Payload       | Description          |
| :---------------- | :------------ | :------------------- |
| update:modelValue | value: number | `modelValue` change. |
