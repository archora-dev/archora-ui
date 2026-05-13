<script setup lang="ts">
import type { ArchToolbarProps } from "./toolbar.types";

withDefaults(defineProps<ArchToolbarProps>(), {
  orientation: "horizontal",
  density: "cozy",
  variant: "plain",
  wrap: true,
  ariaLabel: undefined,
  ariaLabelledby: undefined
});
</script>

<template>
  <div
    class="arch-toolbar"
    :class="[
      `arch-toolbar--${orientation}`,
      `arch-toolbar--${density}`,
      `arch-toolbar--${variant}`,
      { 'arch-toolbar--wrap': wrap }
    ]"
    role="toolbar"
    :aria-orientation="orientation"
    :aria-label="ariaLabel"
    :aria-labelledby="ariaLabelledby"
  >
    <slot />
  </div>
</template>
