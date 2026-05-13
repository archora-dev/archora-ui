<script setup lang="ts">
import { computed } from "vue";
import type { ArchSeverity } from "./severity-marker.types";

const props = withDefaults(
  defineProps<{
    severity: ArchSeverity;
    size?: "xs" | "sm" | "md";
    label?: string;
  }>(),
  {
    size: "sm",
    label: undefined
  }
);

const fallbackLabel = computed(
  () => props.severity.charAt(0).toUpperCase() + props.severity.slice(1)
);
</script>

<template>
  <span
    class="arch-severity-marker"
    :class="[`arch-severity-marker--${severity}`, `arch-severity-marker--${size}`]"
    role="img"
    :aria-label="label ?? fallbackLabel"
    :title="label ?? fallbackLabel"
  />
</template>
