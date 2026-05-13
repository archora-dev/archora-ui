<script setup lang="ts">
import type { ArchCardProps } from "./card.types";

withDefaults(defineProps<ArchCardProps>(), {
  as: "article",
  variant: "elevated",
  padding: "md",
  surface: "default",
  interactive: false
});
</script>

<template>
  <component
    :is="as"
    class="arch-card"
    :class="[
      `arch-card--${variant}`,
      `arch-card--${padding}`,
      `arch-card--surface-${surface}`,
      { 'arch-card--interactive': interactive }
    ]"
    :tabindex="interactive ? 0 : undefined"
  >
    <div v-if="$slots.header" class="arch-card__header">
      <slot name="header" />
    </div>
    <div class="arch-card__body">
      <slot />
    </div>
    <div v-if="$slots.footer" class="arch-card__footer">
      <slot name="footer" />
    </div>
  </component>
</template>
