<script setup lang="ts">
import type { ArchActiveFilter } from "./active-filters.types";

defineProps<{ filters: readonly ArchActiveFilter[] }>();
const emit = defineEmits<{ remove: [id: string]; reset: [] }>();
</script>

<template>
  <div v-if="filters.length > 0" class="arch-active-filters">
    <button
      v-for="filter in filters"
      :key="filter.id"
      type="button"
      class="arch-active-filters__item"
      :aria-label="`Remove ${filter.label} filter`"
      @click="emit('remove', filter.id)"
    >
      <span class="arch-active-filters__text">
        <span class="arch-active-filters__label">{{ filter.label }}</span><template v-if="filter.value">: </template><span v-if="filter.value" class="arch-active-filters__value">{{ filter.value }}</span>
      </span>
      <span aria-hidden="true" class="arch-active-filters__remove">×</span>
    </button>
    <button
      type="button"
      class="arch-active-filters__reset"
      aria-label="Reset filters"
      @click="emit('reset')"
    >
      Clear all
    </button>
  </div>
</template>
