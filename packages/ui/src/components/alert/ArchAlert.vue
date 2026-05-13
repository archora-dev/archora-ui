<script setup lang="ts">
import { computed } from "vue";
import type { ArchAlertProps } from "./alert.types";

const props = withDefaults(defineProps<ArchAlertProps>(), {
  variant: "info",
  title: undefined,
  role: undefined
});

const alertRole = computed(() => props.role ?? (props.variant === "danger" ? "alert" : "status"));
</script>

<template>
  <div class="arch-alert" :class="`arch-alert--${variant}`" :role="alertRole">
    <div v-if="title || $slots.title" class="arch-alert__title">
      <slot name="title">{{ title }}</slot>
    </div>
    <div class="arch-alert__content">
      <slot />
    </div>
  </div>
</template>
