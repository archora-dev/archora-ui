<script setup lang="ts">
import type { ArchEmptyStateProps } from "./empty-state.types";

withDefaults(defineProps<ArchEmptyStateProps>(), {
  title: undefined,
  description: undefined,
  align: "center",
  size: "md",
  variant: "plain"
});
</script>

<template>
  <section
    class="arch-empty-state"
    :class="[
      `arch-empty-state--${align}`,
      `arch-empty-state--${size}`,
      `arch-empty-state--${variant}`
    ]"
  >
    <div v-if="$slots.icon" class="arch-empty-state__icon" aria-hidden="true">
      <slot name="icon" />
    </div>
    <div class="arch-empty-state__content">
      <h3 v-if="title" class="arch-empty-state__title">{{ title }}</h3>
      <p v-if="description" class="arch-empty-state__description">{{ description }}</p>
      <slot />
    </div>
    <div v-if="$slots.actions" class="arch-empty-state__actions">
      <slot name="actions" />
    </div>
  </section>
</template>
