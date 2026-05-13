<script setup lang="ts">
import { computed } from "vue";
import type { ArchPaginationProps } from "./pagination.types";

const props = withDefaults(defineProps<ArchPaginationProps>(), {
  page: 1,
  siblingCount: 1,
  boundaryCount: 1,
  size: "md",
  disabled: false,
  showEdges: true,
  previousLabel: "Previous",
  nextLabel: "Next"
});

const emit = defineEmits<{
  "update:page": [page: number];
  change: [page: number];
}>();

const currentPage = computed(() => clampPage(props.page));
const pages = computed(() => {
  const total = Math.max(1, props.pageCount);
  const items: Array<number | "ellipsis-start" | "ellipsis-end"> = [];
  const start = Math.max(1, currentPage.value - props.siblingCount);
  const end = Math.min(total, currentPage.value + props.siblingCount);
  const leftBoundary = Math.min(props.boundaryCount, total);
  const rightBoundary = Math.max(total - props.boundaryCount + 1, leftBoundary + 1);

  for (let page = 1; page <= leftBoundary; page += 1) {
    items.push(page);
  }

  if (start > leftBoundary + 1) {
    items.push("ellipsis-start");
  }

  for (
    let page = Math.max(start, leftBoundary + 1);
    page <= Math.min(end, rightBoundary - 1);
    page += 1
  ) {
    items.push(page);
  }

  if (end < rightBoundary - 1) {
    items.push("ellipsis-end");
  }

  for (let page = Math.max(rightBoundary, leftBoundary + 1); page <= total; page += 1) {
    items.push(page);
  }

  return items;
});

function clampPage(page: number) {
  return Math.min(Math.max(page, 1), Math.max(props.pageCount, 1));
}

function selectPage(page: number) {
  const nextPage = clampPage(page);

  if (props.disabled || nextPage === currentPage.value) {
    return;
  }

  emit("update:page", nextPage);
  emit("change", nextPage);
}
</script>

<template>
  <nav
    class="arch-pagination"
    :class="[`arch-pagination--${size}`, { 'arch-pagination--disabled': disabled }]"
    aria-label="Pagination"
  >
    <button
      v-if="showEdges"
      class="arch-pagination__item"
      type="button"
      :disabled="disabled || currentPage === 1"
      :aria-label="previousLabel"
      @click="selectPage(currentPage - 1)"
    >
      ‹
    </button>
    <template v-for="item in pages" :key="item">
      <span v-if="typeof item !== 'number'" class="arch-pagination__ellipsis" aria-hidden="true">
        …
      </span>
      <button
        v-else
        class="arch-pagination__item"
        :class="{ 'arch-pagination__item--active': item === currentPage }"
        type="button"
        :disabled="disabled"
        :aria-current="item === currentPage ? 'page' : undefined"
        :aria-label="`Page ${item}`"
        @click="selectPage(item)"
      >
        {{ item }}
      </button>
    </template>
    <button
      v-if="showEdges"
      class="arch-pagination__item"
      type="button"
      :disabled="disabled || currentPage === pageCount"
      :aria-label="nextLabel"
      @click="selectPage(currentPage + 1)"
    >
      ›
    </button>
  </nav>
</template>
