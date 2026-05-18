# Combobox

Search field with a dropdown option list, keyboard navigation, controlled search text, async states,
clear behavior, and customizable option rows.

## Usage

```vue
<script setup>
import { ref } from "vue";
import { ArchCombobox } from "@archora/ui";

const value = ref();
const options = [
  { value: "console", label: "Console", description: "Primary admin surface" },
  { value: "billing", label: "Billing", description: "Invoices and account state" },
  { value: "legacy", label: "Legacy", description: "Archived service", disabled: true }
];
</script>

<template>
  <ArchCombobox
    v-model="value"
    :options="options"
    clearable
    empty-text="No services found"
    placeholder="Search service"
  >
    <template #option="{ option }">
      <strong>{{ option.label }}</strong>
      <small>{{ option.description }}</small>
    </template>
  </ArchCombobox>
</template>
```

<ComponentSandbox name="combobox" />

## Props

| Prop            | Type                                                                           | Default         | Description                     |
| :-------------- | :----------------------------------------------------------------------------- | :-------------- | :------------------------------ |
| options         | `{ value: string; label: string; description?: string; disabled?: boolean }[]` | -               | Option list.                    |
| modelValue      | string                                                                         | -               | `v-model` value.                |
| searchValue     | string                                                                         | -               | Controlled search text.         |
| placeholder     | string                                                                         | "Search option" | Placeholder.                    |
| disabled        | boolean                                                                        | false           | Disables the component.         |
| clearable       | boolean                                                                        | false           | Shows a clear selection button. |
| loading         | boolean                                                                        | false           | Shows the loading state.        |
| loadingText     | string                                                                         | "Loading"       | Loading-state text.             |
| emptyText       | string                                                                         | "No results"    | Empty-state text.               |
| errorText       | string                                                                         | -               | Error-state text.               |
| name            | string                                                                         | -               | Field name.                     |
| autocomplete    | string                                                                         | "off"           | Autocomplete.                   |
| ariaLabel       | string                                                                         | -               | aria-label.                     |
| ariaLabelledby  | string                                                                         | -               | aria-labelledby.                |
| ariaDescribedby | string                                                                         | -               | aria-describedby.               |

## Events

| Event              | Payload       | Description           |
| :----------------- | :------------ | :-------------------- |
| update:modelValue  | value: string | `modelValue` change.  |
| update:searchValue | value: string | `searchValue` change. |
| change             | value: string | Value change.         |
| clear              | -             | Selection cleared.    |
| open               | -             | Listbox opened.       |
| close              | -             | Listbox closed.       |

## Slots

| Slot    | Props              | Description           |
| :------ | :----------------- | :-------------------- |
| option  | { option, active } | Custom option row.    |
| loading | -                  | Custom loading state. |
| empty   | -                  | Custom empty state.   |
| error   | -                  | Custom error state.   |
