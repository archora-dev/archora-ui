<script setup lang="ts">
withDefaults(
  defineProps<{
    size?: "sm" | "md" | "lg";
    tone?: "muted" | "accent" | "primary";
    label?: string;
  }>(),
  {
    size: "md",
    tone: "muted",
    label: "Loading"
  }
);
</script>

<template>
  <span
    class="arch-spinner"
    :class="[`arch-spinner--${size}`, `arch-spinner--${tone}`]"
    role="status"
    :aria-label="label"
  />
</template>
