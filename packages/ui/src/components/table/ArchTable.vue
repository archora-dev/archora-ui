<script setup lang="ts">
import type { ArchTableColumn, ArchTableProps, ArchTableRow } from "./table.types";

const props = withDefaults(defineProps<ArchTableProps>(), {
  rowKey: undefined,
  emptyText: "No data",
  loading: false,
  loadingText: "Loading"
});

defineSlots<{
  [key: `cell-${string}`]: (props: {
    row: ArchTableRow;
    column: ArchTableColumn;
    value: unknown;
    rowIndex: number;
  }) => unknown;
}>();

function getRowKey(row: ArchTableRow, rowIndex: number) {
  const key = props.rowKey ? row[props.rowKey] : undefined;
  return typeof key === "string" || typeof key === "number" ? key : rowIndex;
}
</script>

<template>
  <div class="arch-table" :class="{ 'arch-table--loading': loading }">
    <table class="arch-table__table">
      <thead>
        <tr>
          <th
            v-for="column in columns"
            :key="column.key"
            scope="col"
            :data-align="column.align ?? 'start'"
          >
            {{ column.label }}
          </th>
        </tr>
      </thead>
      <tbody v-if="!loading && rows.length > 0">
        <tr v-for="(row, rowIndex) in rows" :key="getRowKey(row, rowIndex)">
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
    <div v-if="loading" class="arch-table__state" role="status">
      {{ loadingText }}
    </div>
    <div v-else-if="rows.length === 0" class="arch-table__state" role="status">
      {{ emptyText }}
    </div>
  </div>
</template>
