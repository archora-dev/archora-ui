# Table

`ArchTable` renders typed column and row data with empty/loading states and per-column cell slots.

```vue
<script setup lang="ts">
import { ArchTable, type ArchTableColumn } from "@archora/ui";
import "@archora/ui/styles.css";

const columns: ArchTableColumn[] = [
  { key: "name", label: "Name" },
  { key: "status", label: "Status" }
];

const rows = [
  { id: "1", name: "API", status: "Stable" },
  { id: "2", name: "Docs", status: "Draft" }
];
</script>

<template>
  <ArchTable :columns="columns" :rows="rows" row-key="id" />
</template>
```
