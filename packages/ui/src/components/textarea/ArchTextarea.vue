<script setup lang="ts">
import type { ArchTextareaProps } from "./textarea.types";

const props = withDefaults(defineProps<ArchTextareaProps>(), {
  modelValue: "",
  size: "md",
  resize: "vertical",
  rows: 4,
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

  const target = event.target as HTMLTextAreaElement;
  emit("update:modelValue", target.value);
  emit("input", event);
}
</script>

<template>
  <textarea
    class="arch-textarea"
    :class="[
      `arch-textarea--${size}`,
      `arch-textarea--resize-${resize}`,
      { 'arch-textarea--invalid': invalid }
    ]"
    :value="modelValue"
    :rows="rows"
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
