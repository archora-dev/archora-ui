<script setup lang="ts">
import type { Component } from "vue";
import { ArchIcon } from "../icon";

const props = withDefaults(
  defineProps<{
    icon: Component;
    label: string;
    size?: "sm" | "md" | "lg";
    variant?: "ghost" | "secondary" | "primary" | "danger";
    disabled?: boolean;
    type?: "button" | "submit" | "reset";
  }>(),
  {
    size: "md",
    variant: "ghost",
    disabled: false,
    type: "button"
  }
);

const emit = defineEmits<{ click: [event: MouseEvent] }>();
</script>

<template>
  <button
    :type="type"
    class="arch-icon-button"
    :class="[`arch-icon-button--${variant}`, `arch-icon-button--${size}`]"
    :aria-label="label"
    :title="label"
    :disabled="disabled"
    @click="emit('click', $event)"
  >
    <ArchIcon :icon="props.icon" :size="size === 'lg' ? 18 : size === 'sm' ? 14 : 16" />
  </button>
</template>
