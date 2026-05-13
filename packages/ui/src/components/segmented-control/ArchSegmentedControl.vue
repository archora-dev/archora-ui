<script setup lang="ts">
import type {
  ArchSegmentedControlOption,
  ArchSegmentedControlProps
} from "./segmented-control.types";

const props = withDefaults(defineProps<ArchSegmentedControlProps>(), {
  modelValue: undefined,
  size: "md",
  variant: "solid",
  disabled: false,
  fullWidth: false,
  ariaLabel: undefined,
  ariaLabelledby: undefined
});

const emit = defineEmits<{
  "update:modelValue": [value: string];
  change: [value: string];
}>();

function selectOption(option: ArchSegmentedControlOption) {
  if (props.disabled || option.disabled || option.value === props.modelValue) {
    return;
  }

  emit("update:modelValue", option.value);
  emit("change", option.value);
}
</script>

<template>
  <div
    class="arch-segmented-control"
    :class="[
      `arch-segmented-control--${size}`,
      `arch-segmented-control--${variant}`,
      {
        'arch-segmented-control--disabled': disabled,
        'arch-segmented-control--full-width': fullWidth
      }
    ]"
    role="radiogroup"
    :aria-label="ariaLabel"
    :aria-labelledby="ariaLabelledby"
  >
    <button
      v-for="option in options"
      :key="option.value"
      class="arch-segmented-control__item"
      :class="{ 'arch-segmented-control__item--active': option.value === modelValue }"
      type="button"
      role="radio"
      :aria-checked="option.value === modelValue ? 'true' : 'false'"
      :disabled="disabled || option.disabled"
      @click="selectOption(option)"
    >
      <slot name="option" :option="option" :active="option.value === modelValue">
        {{ option.label }}
      </slot>
    </button>
  </div>
</template>
