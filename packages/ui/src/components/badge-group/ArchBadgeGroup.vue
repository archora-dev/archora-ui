<script setup lang="ts" generic="T">
import { computed } from "vue";
import { ArchBadge } from "../badge";

const props = withDefaults(
  defineProps<{
    items: readonly T[];
    limit?: number;
    gap?: "xs" | "sm";
    keyFn?: (item: T, index: number) => string | number;
  }>(),
  {
    limit: 2,
    gap: "sm",
    keyFn: undefined
  }
);

defineSlots<{
  default(props: { item: T; index: number }): unknown;
}>();

const visible = computed(() => props.items.slice(0, props.limit));
const overflowCount = computed(() => Math.max(0, props.items.length - props.limit));
</script>

<template>
  <span class="arch-badge-group" :class="`arch-badge-group--${gap}`">
    <template v-for="(item, index) in visible" :key="keyFn ? keyFn(item, index) : index">
      <slot :item="item" :index="index" />
    </template>
    <ArchBadge v-if="overflowCount > 0" variant="neutral" size="sm">+{{ overflowCount }}</ArchBadge>
  </span>
</template>
