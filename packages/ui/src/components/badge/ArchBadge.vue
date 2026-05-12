<script setup lang="ts">
import type { ArchBadgeProps } from "./badge.types";

withDefaults(defineProps<ArchBadgeProps>(), {
  as: "span",
  variant: "neutral",
  size: "md"
});
</script>

<template>
  <component :is="as" class="arch-badge" :class="[`arch-badge--${variant}`, `arch-badge--${size}`]">
    <slot />
  </component>
</template>
