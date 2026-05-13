# Data Table

Data table with sorting, row selection, and cell slots.

## Usage

```vue
<script setup>
import { ArchDataTable } from "@archora/ui";

const columns = [
  { key: "name", label: "Name", sortable: true },
  { key: "status", label: "Status" }
];
const rows = [{ id: 1, name: "Core", status: "Healthy" }];
</script>

<template>
  <ArchDataTable :columns="columns" :rows="rows" selectable @row-click="openRow" />
</template>
```

<ComponentSandbox name="data-table" />

## Props

| Prop          | Type                      | Default   | Description              |
| :------------ | :------------------------ | :-------- | :----------------------- |
| columns       | ArchDataTableColumn[]     | -         | Column definitions.      |
| rows          | Record<string, unknown>[] | -         | Row data.                |
| rowKey        | string                    | "id"      | Row key field.           |
| selectedKeys  | Array<string \| number>   | []        | Selected row keys.       |
| sortBy        | string                    | -         | Sort field.              |
| sortDirection | "asc" \| "desc"           | -         | Sort direction.          |
| selectable    | boolean                   | false     | Shows row selection.     |
| loading       | boolean                   | false     | Shows the loading state. |
| emptyText     | string                    | "No data" | Empty-state text.        |
| loadingText   | string                    | "Loading" | Loading text.            |

## Events

| Event                | Payload                       | Description             |
| :------------------- | :---------------------------- | :---------------------- |
| update:selectedKeys  | keys: Array<string \| number> | `selectedKeys` change.  |
| update:sortBy        | key: string                   | `sortBy` change.        |
| update:sortDirection | direction: "asc" \| "desc"    | `sortDirection` change. |
| rowClick             | row: Record<string, unknown>  | Component event.        |

## Slots

| Slot       | Props                            | Description                   |
| :--------- | :------------------------------- | :---------------------------- |
| cell-{key} | { row, column, value, rowIndex } | Custom cell for a column key. |
