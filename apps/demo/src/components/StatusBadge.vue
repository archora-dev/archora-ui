<script setup lang="ts">
import { computed } from "vue";
import { ArchBadge } from "@archora/ui";
import type { ArchBadgeVariant } from "@archora/ui";

const props = defineProps<{
  status: string;
}>();

const variant = computed<ArchBadgeVariant>(() => {
  if (["healthy", "live", "active", "Paid"].includes(props.status)) {
    return "success";
  }

  if (["watch", "queued", "building", "invited", "Open"].includes(props.status)) {
    return "warning";
  }

  if (["incident", "failed", "suspended"].includes(props.status)) {
    return "danger";
  }

  if (props.status === "paused") {
    return "neutral";
  }

  return "info";
});

const label = computed(() =>
  props.status
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ")
);
</script>

<template>
  <ArchBadge :variant="variant" size="sm">{{ label }}</ArchBadge>
</template>
