# Data Table

Data table for dense operational views with sorting, row selection, pagination, column visibility,
custom headers, cell slots, and row actions.

## Usage

```vue
<script setup>
import { ArchDataTable } from "@archora/ui";

const columns = [
  { key: "service", label: "Service", sortable: true, minWidth: "10rem" },
  { key: "status", label: "Status" },
  { key: "score", label: "Score", sortable: true, align: "end", width: "7rem" }
];
const rows = [{ id: 1, service: "Console", status: "Healthy", score: 92 }];
</script>

<template>
  <ArchDataTable
    :columns="columns"
    :rows="rows"
    :page-size="10"
    initial-sort-direction="desc"
    selectable
    sticky-header
    @row-click="openRow"
  >
    <template #cell-status="{ value }">
      <ArchBadge :variant="value === 'Healthy' ? 'success' : 'warning'">
        {{ value }}
      </ArchBadge>
    </template>
  </ArchDataTable>
</template>
```

<ComponentSandbox name="data-table" />

## Props

| Prop              | Type                       | Default       | Description                                  |
| :---------------- | :------------------------- | :------------ | :------------------------------------------- |
| columns           | ArchDataTableColumn[]      | -             | Column definitions.                          |
| rows              | Record<string, unknown>[]  | -             | Row data.                                    |
| rowKey            | string                     | "id"          | Row key field.                               |
| keyFn             | (row, index) => string \| number | -       | Custom row identity function.                |
| selectedKey       | string \| number \| null   | null          | Highlighted row key for single selection.    |
| selectedKeys      | Array<string \| number>    | []            | Selected row keys.                           |
| visibleColumnKeys | string[]                   | -             | Controlled list of visible column keys.      |
| sortBy            | string                     | -             | Sort field.                                  |
| sortDirection     | "asc" \| "desc"            | -             | Sort direction.                              |
| initialSortDirection | "asc" \| "desc"         | "asc"         | First direction emitted for a new sorted column. |
| page              | number                     | -             | Current page when pagination is enabled.     |
| pageSize          | number                     | -             | Rows per page. Enables built-in pagination.  |
| selectable        | boolean                    | false         | Shows row selection.                         |
| loading           | boolean                    | false         | Shows the loading state.                     |
| errorText         | string                     | -             | Error-state text.                            |
| emptyText         | string                     | "No data"     | Empty-state text.                            |
| loadingText       | string                     | "Loading"     | Loading text.                                |
| density           | "compact" \| "comfortable" | "comfortable" | Row density.                                 |
| stickyHeader      | boolean                    | false         | Keeps the header visible in scrollable data. |

## Column Options

| Option   | Type                         | Description                   |
| :------- | :--------------------------- | :---------------------------- |
| key      | string                       | Field name and slot suffix.   |
| label    | string                       | Header label.                 |
| sortable | boolean                      | Enables sort button.          |
| align    | "start" \| "center" \| "end" | Cell and header alignment.    |
| hidden   | boolean                      | Hides the column by default.  |
| hideable | boolean                      | Marks the column as hideable. |
| width    | string                       | CSS width for the column.     |
| minWidth | string                       | CSS min-width for the column. |

## Events

| Event                | Payload                       | Description             |
| :------------------- | :---------------------------- | :---------------------- |
| update:selectedKeys  | keys: Array<string \| number> | `selectedKeys` change.  |
| update:sortBy        | key: string                   | `sortBy` change.        |
| update:sortDirection | direction: "asc" \| "desc"    | `sortDirection` change. |
| update:page          | page: number                  | `page` change.          |
| update:pageSize      | pageSize: number              | `pageSize` change.      |
| rowClick             | row: Record<string, unknown>, index: number | Component event. |

## Slots

| Slot         | Props                            | Description                   |
| :----------- | :------------------------------- | :---------------------------- |
| header-{key} | { column }                       | Custom header for a column.   |
| cell-{key}   | { row, column, value, rowIndex } | Custom cell for a column key. |
| row-actions  | { row, rowIndex }                | Action cell rendered per row. |
| footer       | -                                | Table footer area.            |
| loading      | -                                | Custom loading state.         |
| empty        | -                                | Custom empty state.           |
| error        | -                                | Custom error state.           |
