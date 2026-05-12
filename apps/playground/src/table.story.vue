<script setup lang="ts">
import { ArchBadge, ArchTable, type ArchTableColumn } from "@archora/ui";

const columns: ArchTableColumn[] = [
  { key: "name", label: "Name" },
  { key: "owner", label: "Owner" },
  { key: "status", label: "Status" }
];

const rows = [
  { id: "1", name: "API", owner: "Platform", status: "Stable" },
  { id: "2", name: "Docs", owner: "Design Systems", status: "Draft" },
  { id: "3", name: "Playground", owner: "Frontend", status: "Stable" }
];
</script>

<template>
  <Story title="Components/Table">
    <Variant title="Overview">
      <main class="table-story">
        <ArchTable :columns="columns" :rows="rows" row-key="id">
          <template #cell-status="{ value }">
            <ArchBadge :variant="value === 'Stable' ? 'success' : 'warning'">
              {{ value }}
            </ArchBadge>
          </template>
        </ArchTable>
      </main>
    </Variant>
  </Story>
</template>

<style scoped>
.table-story {
  max-width: 56rem;
  padding: var(--arch-space-6);
  border: 1px solid var(--arch-color-border);
  border-radius: var(--arch-radius-lg);
  background: var(--arch-color-bg-elevated);
}
</style>
