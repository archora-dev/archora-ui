# Switch

Boolean switch with keyboard support.

## Usage

```vue
<script setup>
import { ref } from "vue";
import { ArchSwitch } from "@archora/ui";

const enabled = ref(true);
</script>

<template>
  <ArchSwitch v-model="enabled">Auto deploy</ArchSwitch>
</template>
```

<ComponentSandbox name="switch" />

## Props

| Prop            | Type    | Default | Description                  |
| :-------------- | :------ | :------ | :--------------------------- |
| modelValue      | boolean | false   | `v-model` value.             |
| label           | string  | -       | Accessible label or text.    |
| disabled        | boolean | false   | Disables the component.      |
| required        | boolean | false   | Marks the field as required. |
| invalid         | boolean | false   | Invalid state.               |
| ariaLabel       | string  | -       | aria-label.                  |
| ariaLabelledby  | string  | -       | aria-labelledby.             |
| ariaDescribedby | string  | -       | aria-describedby.            |

## Events

| Event             | Payload        | Description          |
| :---------------- | :------------- | :------------------- |
| update:modelValue | value: boolean | `modelValue` change. |
| change            | value: boolean | Value change.        |

## Slots

| Slot    | Props | Description   |
| :------ | :---- | :------------ |
| default | -     | Switch label. |
