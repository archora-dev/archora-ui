# Pagination

Pagination navigation with boundary and sibling controls.

## Usage

```vue
<script setup>
import { ref } from "vue";
import { ArchPagination } from "@archora/ui";

const page = ref(1);
</script>

<template>
  <ArchPagination v-model:page="page" :page-count="12" show-edges />
</template>
```

<ComponentSandbox name="pagination" />

## Props

| Prop          | Type                 | Default    | Description                            |
| :------------ | :------------------- | :--------- | :------------------------------------- |
| page          | number               | 1          | Current page.                          |
| pageCount     | number               | -          | Total page count.                      |
| siblingCount  | number               | 1          | Sibling pages around the current page. |
| boundaryCount | number               | 1          | Pages at the beginning/end.            |
| size          | "sm" \| "md" \| "lg" | "md"       | Size.                                  |
| disabled      | boolean              | false      | Disables the component.                |
| showEdges     | boolean              | true       | Shows first/last page controls.        |
| previousLabel | string               | "Previous" | Previous button text/ARIA label.       |
| nextLabel     | string               | "Next"     | Next button text/ARIA label.           |

## Events

| Event       | Payload      | Description    |
| :---------- | :----------- | :------------- |
| update:page | page: number | `page` change. |
| change      | page: number | Value change.  |
