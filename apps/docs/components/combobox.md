# Combobox

Search field with a dropdown option list and keyboard navigation.

## Usage

```vue
<script setup>
import { ref } from "vue";
import { ArchCombobox } from "@archora/ui";

const value = ref();
const options = [
  { value: "vue", label: "Vue" },
  { value: "react", label: "React" }
];
</script>

<template>
  <ArchCombobox v-model="value" :options="options" placeholder="Search framework" />
</template>
```

<ComponentSandbox name="combobox" />

## Props

| Prop            | Type                                                     | Default         | Description             |
| :-------------- | :------------------------------------------------------- | :-------------- | :---------------------- |
| options         | `{ value: string; label: string; disabled?: boolean }[]` | -               | Option list.            |
| modelValue      | string                                                   | -               | `v-model` value.        |
| searchValue     | string                                                   | -               | Controlled search text. |
| placeholder     | string                                                   | "Search option" | Placeholder.            |
| disabled        | boolean                                                  | false           | Disables the component. |
| name            | string                                                   | -               | Field name.             |
| autocomplete    | string                                                   | "off"           | Autocomplete.           |
| ariaLabel       | string                                                   | -               | aria-label.             |
| ariaLabelledby  | string                                                   | -               | aria-labelledby.        |
| ariaDescribedby | string                                                   | -               | aria-describedby.       |

## Events

| Event              | Payload       | Description           |
| :----------------- | :------------ | :-------------------- |
| update:modelValue  | value: string | `modelValue` change.  |
| update:searchValue | value: string | `searchValue` change. |
| change             | value: string | Value change.         |
