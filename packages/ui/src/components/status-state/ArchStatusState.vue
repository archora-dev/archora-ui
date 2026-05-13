<script setup lang="ts">
import { computed } from "vue";
import { ArchSpinner } from "../spinner";

const props = withDefaults(
  defineProps<{
    variant?: "loading" | "empty" | "error" | "no-results";
    title: string;
    description?: string;
  }>(),
  {
    variant: "empty",
    description: undefined
  }
);

const role = computed(() =>
  props.variant === "error" ? "alert" : props.variant === "loading" ? "status" : undefined
);
</script>

<template>
  <section class="arch-status-state" :class="`arch-status-state--${variant}`" :role="role">
    <ArchSpinner v-if="variant === 'loading'" size="lg" />
    <span v-else class="arch-status-state__icon" aria-hidden="true">
      {{ variant === "error" ? "!" : variant === "no-results" ? "∅" : "·" }}
    </span>
    <div class="arch-status-state__content">
      <h3 class="arch-status-state__title">{{ title }}</h3>
      <p v-if="description" class="arch-status-state__description">{{ description }}</p>
    </div>
    <div v-if="$slots.actions" class="arch-status-state__actions">
      <slot name="actions" />
    </div>
  </section>
</template>
