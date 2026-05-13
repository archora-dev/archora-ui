# Command

Command palette with search, empty state, and item selection.

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
  <ArchCommand :items="items" @select="runCommand" />
</template>
```

<ComponentSandbox name="command" />

## Props

| Prop           | Type                                                                           | Default           | Description             |
| :------------- | :----------------------------------------------------------------------------- | :---------------- | :---------------------- |
| items          | `{ value: string; label: string; description?: string; disabled?: boolean }[]` | -                 | Item collection.        |
| modelValue     | string                                                                         | -                 | `v-model` value.        |
| searchValue    | string                                                                         | -                 | Controlled search text. |
| placeholder    | string                                                                         | "Search commands" | Placeholder.            |
| emptyText      | string                                                                         | "No results"      | Empty-state text.       |
| disabled       | boolean                                                                        | false             | Disables the component. |
| ariaLabel      | string                                                                         | -                 | aria-label.             |
| ariaLabelledby | string                                                                         | -                 | aria-labelledby.        |

## Events

| Event              | Payload       | Description           |
| :----------------- | :------------ | :-------------------- |
| update:modelValue  | value: string | `modelValue` change.  |
| update:searchValue | value: string | `searchValue` change. |
| select             | value: string | Item selection.       |
