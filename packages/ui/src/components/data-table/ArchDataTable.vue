<script setup lang="ts">
import { computed, ref } from "vue";
import ArchCheckbox from "../checkbox/ArchCheckbox.vue";
import type {
  ArchDataTableColumn,
  ArchDataTableProps,
  ArchDataTableRow,
  ArchDataTableSortDirection
} from "./data-table.types";

const props = withDefaults(defineProps<ArchDataTableProps>(), {
  rowKey: "id",
  selectedKeys: () => [],
  sortBy: undefined,
  sortDirection: undefined,
  selectable: false,
  loading: false,
  emptyText: "No data",
  loadingText: "Loading"
});

const emit = defineEmits<{
  "update:selectedKeys": [keys: Array<string | number>];
  "update:sortBy": [key: string];
  "update:sortDirection": [direction: ArchDataTableSortDirection];
  rowClick: [row: ArchDataTableRow];
}>();

const internalSortBy = ref<string | undefined>(props.sortBy);
const internalSortDirection = ref<ArchDataTableSortDirection | undefined>(props.sortDirection);

const activeSortBy = computed(() => props.sortBy ?? internalSortBy.value);
const activeSortDirection = computed(() => props.sortDirection ?? internalSortDirection.value);
const sortedRows = computed(() => {
  if (!activeSortBy.value || !activeSortDirection.value) {
    return props.rows;
  }

  const direction = activeSortDirection.value === "asc" ? 1 : -1;

  return [...props.rows].sort((left, right) => {
    const leftValue = left[activeSortBy.value as string];
    const rightValue = right[activeSortBy.value as string];

    if (leftValue === rightValue) {
      return 0;
    }

    return (
      String(leftValue).localeCompare(String(rightValue), undefined, {
        numeric: true
      }) * direction
    );
  });
});

function getRowKey(row: ArchDataTableRow, rowIndex: number) {
  const key = row[props.rowKey];
  return typeof key === "string" || typeof key === "number" ? key : rowIndex;
}

function sortColumn(column: ArchDataTableColumn) {
  if (!column.sortable) {
    return;
  }

  const nextDirection =
    activeSortBy.value === column.key && activeSortDirection.value === "asc" ? "desc" : "asc";

  internalSortBy.value = column.key;
  internalSortDirection.value = nextDirection;
  emit("update:sortBy", column.key);
  emit("update:sortDirection", nextDirection);
}

function toggleRow(row: ArchDataTableRow, rowIndex: number, checked: boolean) {
  const key = getRowKey(row, rowIndex);
  const selected = new Set(props.selectedKeys);

  if (checked) {
    selected.add(key);
  } else {
    selected.delete(key);
  }

  emit("update:selectedKeys", Array.from(selected));
}

function isSelected(row: ArchDataTableRow, rowIndex: number) {
  return props.selectedKeys.includes(getRowKey(row, rowIndex));
}
</script>

<template>
  <div class="arch-data-table" :class="{ 'arch-data-table--loading': loading }">
    <table class="arch-data-table__table">
      <thead>
        <tr>
          <th v-if="selectable" class="arch-data-table__selection-cell" scope="col">
            <span class="arch-sr-only">Select row</span>
          </th>
          <th
            v-for="column in columns"
            :key="column.key"
            scope="col"
            :data-align="column.align ?? 'start'"
            :aria-sort="
              activeSortBy === column.key
                ? activeSortDirection === 'asc'
                  ? 'ascending'
                  : 'descending'
                : undefined
            "
          >
            <button
              v-if="column.sortable"
              class="arch-data-table__sort"
              type="button"
              @click="sortColumn(column)"
            >
              <span>{{ column.label }}</span>
              <span aria-hidden="true">
                {{
                  activeSortBy === column.key ? (activeSortDirection === "asc" ? "↑" : "↓") : "↕"
                }}
              </span>
            </button>
            <span v-else>{{ column.label }}</span>
          </th>
        </tr>
      </thead>
      <tbody v-if="!loading && sortedRows.length > 0">
        <tr
          v-for="(row, rowIndex) in sortedRows"
          :key="getRowKey(row, rowIndex)"
          @click="emit('rowClick', row)"
        >
          <td v-if="selectable" class="arch-data-table__selection-cell">
            <ArchCheckbox
              class="arch-data-table__checkbox"
              :model-value="isSelected(row, rowIndex)"
              :aria-label="`Select row ${rowIndex + 1}`"
              @click.stop
              @update:model-value="toggleRow(row, rowIndex, $event)"
            />
          </td>
          <td v-for="column in columns" :key="column.key" :data-align="column.align ?? 'start'">
            <slot
              :name="`cell-${column.key}`"
              :row="row"
              :column="column"
              :value="row[column.key]"
              :row-index="rowIndex"
            >
              {{ row[column.key] }}
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="loading" class="arch-data-table__state" role="status">
      {{ loadingText }}
    </div>
    <div v-else-if="sortedRows.length === 0" class="arch-data-table__state" role="status">
      {{ emptyText }}
    </div>
  </div>
</template>
