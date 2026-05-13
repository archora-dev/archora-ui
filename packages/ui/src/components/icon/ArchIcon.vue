<script setup lang="ts">
import { computed, markRaw, type Component } from "vue";

const props = withDefaults(
  defineProps<{
    icon: Component;
    size?: number;
    strokeWidth?: number;
    label?: string;
  }>(),
  {
    size: 16,
    strokeWidth: 1.8,
    label: undefined
  }
);

const rawIcon = computed(() => markRaw(props.icon));
</script>

<template>
  <span
    class="arch-icon"
    :role="label ? 'img' : undefined"
    :aria-label="label"
    :aria-hidden="label ? undefined : 'true'"
  >
    <component :is="rawIcon" :size="size" :stroke-width="strokeWidth" aria-hidden="true" />
  </span>
</template>
