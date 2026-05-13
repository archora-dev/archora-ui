# Table

Basic table with loading/empty states and cell slots.

## Usage

```vue
<script setup>
import { ArchTable } from "@archora/ui";

const columns = [
  { key: "name", label: "Name" },
  { key: "status", label: "Status" }
];
const rows = [{ id: 1, name: "API", status: "Stable" }];
</script>

<template>
  <ArchTable :columns="columns" :rows="rows" row-key="id" />
</template>
```

<ComponentSandbox name="table" />

## Props

| Prop        | Type                      | Default   | Description              |
| :---------- | :------------------------ | :-------- | :----------------------- |
| columns     | ArchTableColumn[]         | -         | Column definitions.      |
| rows        | Record<string, unknown>[] | -         | Row data.                |
| rowKey      | string                    | -         | Row key field.           |
| emptyText   | string                    | "No data" | Empty-state text.        |
| loading     | boolean                   | false     | Shows the loading state. |
| loadingText | string                    | "Loading" | Loading text.            |

## Slots

| Slot       | Props                            | Description                   |
| :--------- | :------------------------------- | :---------------------------- |
| cell-{key} | { row, column, value, rowIndex } | Custom cell for a column key. |
