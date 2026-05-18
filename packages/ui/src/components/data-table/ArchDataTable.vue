<script setup lang="ts">
import { computed, ref, useSlots } from "vue";
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
  visibleColumnKeys: undefined,
  sortBy: undefined,
  sortDirection: undefined,
  page: undefined,
  pageSize: undefined,
  selectable: false,
  loading: false,
  errorText: undefined,
  emptyText: "No data",
  loadingText: "Loading",
  density: "comfortable",
  stickyHeader: false
});

const emit = defineEmits<{
  "update:selectedKeys": [keys: Array<string | number>];
  "update:sortBy": [key: string];
  "update:sortDirection": [direction: ArchDataTableSortDirection];
  "update:page": [page: number];
  "update:pageSize": [pageSize: number];
  rowClick: [row: ArchDataTableRow];
}>();

const slots = useSlots();
const internalSortBy = ref<string | undefined>(props.sortBy);
const internalSortDirection = ref<ArchDataTableSortDirection | undefined>(props.sortDirection);
const internalPage = ref(props.page ?? 1);

const activeSortBy = computed(() => props.sortBy ?? internalSortBy.value);
const activeSortDirection = computed(() => props.sortDirection ?? internalSortDirection.value);
const activePage = computed(() => props.page ?? internalPage.value);
const visibleColumns = computed(() => {
  if (props.visibleColumnKeys) {
    const visibleKeys = new Set(props.visibleColumnKeys);
    return props.columns.filter((column) => visibleKeys.has(column.key));
  }

  return props.columns.filter((column) => !column.hidden);
});

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
const totalPages = computed(() => {
  if (!props.pageSize) {
    return 1;
  }

  return Math.max(1, Math.ceil(sortedRows.value.length / props.pageSize));
});
const paginatedRows = computed(() => {
  if (!props.pageSize) {
    return sortedRows.value;
  }

  const page = Math.min(Math.max(activePage.value, 1), totalPages.value);
  const start = (page - 1) * props.pageSize;

  return sortedRows.value.slice(start, start + props.pageSize);
});
const hasPagination = computed(() => Boolean(props.pageSize));
const hasRowActions = computed(() => Boolean(slots["row-actions"]));

function getRowKey(row: ArchDataTableRow, rowIndex: number) {
  const key = row[props.rowKey];
  return typeof key === "string" || typeof key === "number" ? key : rowIndex;
}

function getColumnStyle(column: ArchDataTableColumn) {
  return {
    width: column.width,
    minWidth: column.minWidth
  };
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

function setPage(page: number) {
  const nextPage = Math.min(Math.max(page, 1), totalPages.value);

  internalPage.value = nextPage;
  emit("update:page", nextPage);
}
</script>

<template>
  <div
    class="arch-data-table"
    :class="[
      `arch-data-table--${density}`,
      {
        'arch-data-table--loading': loading,
        'arch-data-table--sticky-header': stickyHeader
      }
    ]"
  >
    <table class="arch-data-table__table">
      <thead>
        <tr>
          <th v-if="selectable" class="arch-data-table__selection-cell" scope="col">
            <span class="arch-sr-only">Select row</span>
          </th>
          <th
            v-for="column in visibleColumns"
            :key="column.key"
            scope="col"
            :data-align="column.align ?? 'start'"
            :style="getColumnStyle(column)"
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
              <slot :name="`header-${column.key}`" :column="column">
                <span>{{ column.label }}</span>
              </slot>
              <span aria-hidden="true">
                {{
                  activeSortBy === column.key ? (activeSortDirection === "asc" ? "↑" : "↓") : "↕"
                }}
              </span>
            </button>
            <slot v-else :name="`header-${column.key}`" :column="column">
              <span>{{ column.label }}</span>
            </slot>
          </th>
          <th v-if="hasRowActions" class="arch-data-table__actions-cell" scope="col">
            <span class="arch-sr-only">Actions</span>
          </th>
        </tr>
      </thead>
      <tbody v-if="!loading && !errorText && paginatedRows.length > 0">
        <tr
          v-for="(row, rowIndex) in paginatedRows"
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
          <td
            v-for="column in visibleColumns"
            :key="column.key"
            :data-align="column.align ?? 'start'"
            :style="getColumnStyle(column)"
          >
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
          <td v-if="hasRowActions" class="arch-data-table__actions-cell">
            <slot name="row-actions" :row="row" :row-index="rowIndex" />
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="loading" class="arch-data-table__state" role="status">
      <slot name="loading">
        {{ loadingText }}
      </slot>
    </div>
    <div
      v-else-if="errorText"
      class="arch-data-table__state arch-data-table__state--error"
      role="alert"
    >
      <slot name="error">
        {{ errorText }}
      </slot>
    </div>
    <div v-else-if="paginatedRows.length === 0" class="arch-data-table__state" role="status">
      <slot name="empty">
        {{ emptyText }}
      </slot>
    </div>
    <div v-if="hasPagination && !loading && !errorText" class="arch-data-table__pagination">
      <button
        class="arch-data-table__page-button"
        type="button"
        aria-label="Previous page"
        :disabled="activePage <= 1"
        @click="setPage(activePage - 1)"
      >
        Previous
      </button>
      <span class="arch-data-table__page-status">Page {{ activePage }} of {{ totalPages }}</span>
      <button
        class="arch-data-table__page-button"
        type="button"
        aria-label="Next page"
        :disabled="activePage >= totalPages"
        @click="setPage(activePage + 1)"
      >
        Next
      </button>
    </div>
  </div>
</template>
