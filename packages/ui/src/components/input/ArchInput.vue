<script setup lang="ts">
import type { ArchInputProps } from "./input.types";

const props = withDefaults(defineProps<ArchInputProps>(), {
  modelValue: "",
  type: "text",
  size: "md",
  placeholder: undefined,
  name: undefined,
  autocomplete: undefined,
  disabled: false,
  readonly: false,
  required: false,
  invalid: false,
  ariaLabel: undefined,
  ariaLabelledby: undefined,
  ariaDescribedby: undefined
});

const emit = defineEmits<{
  "update:modelValue": [value: string];
  input: [event: Event];
  change: [event: Event];
  blur: [event: FocusEvent];
  focus: [event: FocusEvent];
}>();

function onInput(event: Event) {
  if (props.disabled) {
    return;
  }

  const target = event.target as HTMLInputElement;
  emit("update:modelValue", target.value);
  emit("input", event);
}
</script>

<template>
  <input
    class="arch-input"
    :class="[`arch-input--${size}`, { 'arch-input--invalid': invalid }]"
    :value="modelValue"
    :type="type"
    :name="name"
    :placeholder="placeholder"
    :autocomplete="autocomplete"
    :disabled="disabled"
    :readonly="readonly"
    :required="required"
    :aria-invalid="invalid ? 'true' : undefined"
    :aria-label="ariaLabel"
    :aria-labelledby="ariaLabelledby"
    :aria-describedby="ariaDescribedby"
    @input="onInput"
    @change="emit('change', $event)"
    @blur="emit('blur', $event)"
    @focus="emit('focus', $event)"
  />
</template>
