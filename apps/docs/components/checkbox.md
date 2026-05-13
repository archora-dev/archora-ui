# Checkbox

Controlled checkbox with invalid, required, and indeterminate states.

## Usage

```vue
<script setup>
import { ref } from "vue";
import { ArchCheckbox } from "@archora/ui";

const accepted = ref(false);
</script>

<template>
  <ArchCheckbox v-model="accepted" required>Accept policy</ArchCheckbox>
</template>
```

<ComponentSandbox name="checkbox" />

## Props

| Prop            | Type    | Default | Description                  |
| :-------------- | :------ | :------ | :--------------------------- |
| modelValue      | boolean | false   | `v-model` value.             |
| label           | string  | -       | Accessible label or text.    |
| name            | string  | -       | Field name.                  |
| value           | string  | -       | Value.                       |
| disabled        | boolean | false   | Disables the component.      |
| required        | boolean | false   | Marks the field as required. |
| invalid         | boolean | false   | Invalid state.               |
| indeterminate   | boolean | false   | Enables the mixed state.     |
| ariaLabel       | string  | -       | aria-label.                  |
| ariaLabelledby  | string  | -       | aria-labelledby.             |
| ariaDescribedby | string  | -       | aria-describedby.            |

## Events

| Event             | Payload        | Description          |
| :---------------- | :------------- | :------------------- |
| update:modelValue | value: boolean | `modelValue` change. |
| change            | event: Event   | Value change.        |

## Slots

| Slot    | Props | Description     |
| :------ | :---- | :-------------- |
| default | -     | Checkbox label. |
