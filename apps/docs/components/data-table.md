# Data Table

`ArchDataTable` adds sorting, loading and empty states, and optional row selection to tabular data.

```vue
<script setup lang="ts">
import { ref } from "vue";
import { ArchDataTable, type ArchDataTableColumn } from "@archora/ui";
import "@archora/ui/styles.css";

const selectedKeys = ref<Array<string | number>>([]);
const columns: ArchDataTableColumn[] = [
  { key: "name", label: "Name", sortable: true },
  { key: "score", label: "Score", sortable: true, align: "end" }
];

const rows = [
  { id: "a", name: "API", score: 3 },
  { id: "d", name: "Docs", score: 1 }
];
</script>

<template>
  <ArchDataTable
    v-model:selected-keys="selectedKeys"
    :columns="columns"
    :rows="rows"
    row-key="id"
    selectable
  />
</template>
```
