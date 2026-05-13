<script setup lang="ts">
import type { ArchKbdProps } from "./kbd.types";

withDefaults(defineProps<ArchKbdProps>(), {
  as: "kbd",
  size: "md",
  variant: "default"
});
</script>

<template>
  <component :is="as" class="arch-kbd" :class="[`arch-kbd--${size}`, `arch-kbd--${variant}`]">
    <slot />
  </component>
</template>
