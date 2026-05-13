<script setup lang="ts">
import type { ArchSwitchProps } from "./switch.types";

const props = withDefaults(defineProps<ArchSwitchProps>(), {
  modelValue: false,
  label: undefined,
  disabled: false,
  required: false,
  invalid: false,
  ariaLabel: undefined,
  ariaLabelledby: undefined,
  ariaDescribedby: undefined
});

const emit = defineEmits<{
  "update:modelValue": [value: boolean];
  change: [value: boolean];
}>();

function toggle() {
  if (props.disabled) {
    return;
  }

  const nextValue = !props.modelValue;
  emit("update:modelValue", nextValue);
  emit("change", nextValue);
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === " " || event.key === "Enter") {
    event.preventDefault();
    toggle();
  }
}
</script>

<template>
  <label
    class="arch-switch"
    :class="{
      'arch-switch--checked': modelValue,
      'arch-switch--disabled': disabled,
      'arch-switch--invalid': invalid
    }"
  >
    <button
      class="arch-switch__control"
      type="button"
      role="switch"
      :disabled="disabled"
      :aria-checked="modelValue ? 'true' : 'false'"
      :aria-required="required ? 'true' : undefined"
      :aria-invalid="invalid ? 'true' : undefined"
      :aria-label="ariaLabel"
      :aria-labelledby="ariaLabelledby"
      :aria-describedby="ariaDescribedby"
      @click="toggle"
      @keydown="onKeydown"
    >
      <span class="arch-switch__thumb" aria-hidden="true" />
    </button>
    <span v-if="$slots.default || label" class="arch-switch__label">
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>
