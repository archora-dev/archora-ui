<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    modelValue: number;
    label?: string;
    min?: number;
    max?: number;
    step?: number;
    disabled?: boolean;
    showValue?: boolean;
  }>(),
  {
    label: undefined,
    min: 0,
    max: 100,
    step: 1,
    disabled: false,
    showValue: false
  }
);

const emit = defineEmits<{ "update:modelValue": [value: number] }>();
</script>

<template>
  <label class="arch-slider">
    <span v-if="label || showValue" class="arch-slider__header">
      <span v-if="label" class="arch-slider__label">{{ label }}</span>
      <span v-if="showValue" class="arch-slider__value">{{ modelValue }}</span>
    </span>
    <input
      class="arch-slider__input"
      type="range"
      :value="modelValue"
      :min="props.min"
      :max="props.max"
      :step="props.step"
      :disabled="disabled"
      @input="emit('update:modelValue', Number(($event.target as HTMLInputElement).value))"
    />
  </label>
</template>
