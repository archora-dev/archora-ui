# Command

Command palette with search, clear behavior, loading/error/empty states, slots, and item selection.

## Usage

```vue
<script setup>
import { ArchCommand } from "@archora/ui";

const items = [
  { value: "open", label: "Open project", description: "Go to project" },
  { value: "deploy", label: "Deploy", description: "Run release" }
];
</script>

<template>
  <ArchCommand :items="items" clearable empty-text="No commands found" @select="runCommand">
    <template #item="{ item }">
      <strong>{{ item.label }}</strong>
      <small>{{ item.description }}</small>
    </template>
  </ArchCommand>
</template>
```

<ComponentSandbox name="command" />

## Props

| Prop           | Type                                                                           | Default           | Description              |
| :------------- | :----------------------------------------------------------------------------- | :---------------- | :----------------------- |
| items          | `{ value: string; label: string; description?: string; disabled?: boolean }[]` | -                 | Item collection.         |
| modelValue     | string                                                                         | -                 | `v-model` value.         |
| searchValue    | string                                                                         | -                 | Controlled search text.  |
| placeholder    | string                                                                         | "Search commands" | Placeholder.             |
| emptyText      | string                                                                         | "No results"      | Empty-state text.        |
| loading        | boolean                                                                        | false             | Shows the loading state. |
| loadingText    | string                                                                         | "Loading"         | Loading-state text.      |
| errorText      | string                                                                         | -                 | Error-state text.        |
| clearable      | boolean                                                                        | false             | Shows a clear button.    |
| disabled       | boolean                                                                        | false             | Disables the component.  |
| ariaLabel      | string                                                                         | -                 | aria-label.              |
| ariaLabelledby | string                                                                         | -                 | aria-labelledby.         |

## Events

| Event              | Payload       | Description           |
| :----------------- | :------------ | :-------------------- |
| update:modelValue  | value: string | `modelValue` change.  |
| update:searchValue | value: string | `searchValue` change. |
| select             | value: string | Item selection.       |
| clear              | -             | Search/value cleared. |

## Slots

| Slot    | Props            | Description           |
| :------ | :--------------- | :-------------------- |
| item    | { item, active } | Custom item row.      |
| loading | -                | Custom loading state. |
| empty   | -                | Custom empty state.   |
| error   | -                | Custom error state.   |
