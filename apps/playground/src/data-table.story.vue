<script setup lang="ts">
import { ref } from "vue";
import { ArchBadge, ArchDataTable, type ArchDataTableColumn } from "@archora/ui";

const selectedKeys = ref<Array<string | number>>(["a"]);
const columns: ArchDataTableColumn[] = [
  { key: "name", label: "Name", sortable: true },
  { key: "owner", label: "Owner", sortable: true },
  { key: "score", label: "Score", sortable: true, align: "end" },
  { key: "status", label: "Status" }
];

const rows = [
  { id: "a", name: "API", owner: "Platform", score: 3, status: "Stable" },
  { id: "d", name: "Docs", owner: "Design Systems", score: 1, status: "Draft" },
  { id: "p", name: "Playground", owner: "Frontend", score: 2, status: "Stable" }
];
</script>

<template>
  <Story title="Components/DataTable">
    <Variant title="Interactive">
      <main class="data-table-story">
        <ArchDataTable
          v-model:selected-keys="selectedKeys"
          :columns="columns"
          :rows="rows"
          row-key="id"
          selectable
        >
          <template #cell-status="{ value }">
            <ArchBadge :variant="value === 'Stable' ? 'success' : 'warning'">
              {{ value }}
            </ArchBadge>
          </template>
        </ArchDataTable>
      </main>
    </Variant>

    <Variant title="States">
      <main class="data-table-story data-table-story--stack">
        <ArchDataTable :columns="columns" :rows="[]" empty-text="No projects found" />
        <ArchDataTable :columns="columns" :rows="rows" loading loading-text="Loading projects" />
      </main>
    </Variant>
  </Story>
</template>

<style scoped>
.data-table-story {
  max-width: 64rem;
  padding: var(--arch-space-6);
  border: 1px solid var(--arch-color-border);
  border-radius: var(--arch-radius-lg);
  background: var(--arch-color-bg-elevated);
}

.data-table-story--stack {
  display: grid;
  gap: var(--arch-space-6);
}
</style>
