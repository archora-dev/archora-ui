# Select

Select control backed by an options array with descriptions, loading/error/empty states, clear
behavior, and custom option rendering.

## Usage

```vue
<script setup>
import { ref } from "vue";
import { ArchSelect } from "@archora/ui";

const value = ref("");
const options = [
  { value: "console", label: "Console", description: "Primary admin surface" },
  { value: "billing", label: "Billing", description: "Invoices and account state" }
];
</script>

<template>
  <ArchSelect v-model="value" :options="options" clearable placeholder="Choose service">
    <template #option="{ option }">
      <strong>{{ option.label }}</strong>
      <small>{{ option.description }}</small>
    </template>
  </ArchSelect>
</template>
```

<ComponentSandbox name="select" />

## Props

| Prop        | Type                                                                           | Default         | Description                     |
| :---------- | :----------------------------------------------------------------------------- | :-------------- | :------------------------------ |
| options     | `{ value: string; label: string; description?: string; disabled?: boolean }[]` | -               | Option list.                    |
| modelValue  | string                                                                         | -               | `v-model` value.                |
| placeholder | string                                                                         | "Select option" | Placeholder.                    |
| disabled    | boolean                                                                        | false           | Disables the component.         |
| clearable   | boolean                                                                        | false           | Shows a clear selection button. |
| loading     | boolean                                                                        | false           | Shows the loading state.        |
| loadingText | string                                                                         | "Loading"       | Loading-state text.             |
| emptyText   | string                                                                         | "No options"    | Empty-state text.               |
| errorText   | string                                                                         | -               | Error-state text.               |

## Events

| Event             | Payload       | Description          |
| :---------------- | :------------ | :------------------- |
| update:modelValue | value: string | `modelValue` change. |
| change            | value: string | Value change.        |
| clear             | -             | Selection cleared.   |
| open              | -             | Listbox opened.      |
| close             | -             | Listbox closed.      |

## Slots

| Slot    | Props              | Description           |
| :------ | :----------------- | :-------------------- |
| option  | { option, active } | Custom option row.    |
| loading | -                  | Custom loading state. |
| empty   | -                  | Custom empty state.   |
| error   | -                  | Custom error state.   |
