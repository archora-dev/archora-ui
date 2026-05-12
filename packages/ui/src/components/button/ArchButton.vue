<script setup lang="ts">
import type { ArchButtonProps } from "./button.types";

const props = withDefaults(defineProps<ArchButtonProps>(), {
  variant: "primary",
  size: "md",
  type: "button",
  disabled: false,
  loading: false,
  block: false
});

const emit = defineEmits<{
  click: [event: MouseEvent];
}>();

function onClick(event: MouseEvent) {
  if (props.disabled || props.loading) {
    event.preventDefault();
    event.stopImmediatePropagation();
    return;
  }

  emit("click", event);
}
</script>

<template>
  <button
    :type="type"
    class="arch-button"
    :class="[
      `arch-button--${variant}`,
      `arch-button--${size}`,
      {
        'arch-button--block': block,
        'arch-button--loading': loading
      }
    ]"
    :disabled="disabled"
    :aria-disabled="disabled || loading ? 'true' : undefined"
    :aria-busy="loading ? 'true' : undefined"
    @click="onClick"
  >
    <span v-if="loading" class="arch-button__spinner" aria-hidden="true" />
    <span class="arch-button__content">
      <slot />
    </span>
  </button>
</template>
