<script setup lang="ts">
import { computed } from "vue";
import { useId } from "../../composables/useId";
import type { ArchRadioGroupOption, ArchRadioGroupProps } from "./radio-group.types";

const props = withDefaults(defineProps<ArchRadioGroupProps>(), {
  modelValue: undefined,
  name: undefined,
  orientation: "vertical",
  size: "md",
  disabled: false,
  required: false,
  invalid: false,
  ariaLabel: undefined,
  ariaLabelledby: undefined
});

const emit = defineEmits<{
  "update:modelValue": [value: string];
  change: [value: string];
}>();

const generatedName = useId("arch-radio-group");
const radioName = computed(() => props.name ?? generatedName);

function selectOption(option: ArchRadioGroupOption) {
  if (props.disabled || option.disabled) {
    return;
  }

  emit("update:modelValue", option.value);
  emit("change", option.value);
}
</script>

<template>
  <div
    class="arch-radio-group"
    :class="[
      `arch-radio-group--${orientation}`,
      `arch-radio-group--${size}`,
      {
        'arch-radio-group--disabled': disabled,
        'arch-radio-group--invalid': invalid
      }
    ]"
    role="radiogroup"
    :aria-orientation="orientation"
    :aria-invalid="invalid ? 'true' : undefined"
    :aria-label="ariaLabel"
    :aria-labelledby="ariaLabelledby"
  >
    <label
      v-for="option in options"
      :key="option.value"
      class="arch-radio-group__option"
      :class="{
        'arch-radio-group__option--checked': option.value === modelValue,
        'arch-radio-group__option--disabled': disabled || option.disabled
      }"
    >
      <input
        class="arch-radio-group__input"
        type="radio"
        :name="radioName"
        :value="option.value"
        :checked="option.value === modelValue"
        :disabled="disabled || option.disabled"
        :required="required"
        @change="selectOption(option)"
      />
      <span class="arch-radio-group__control" aria-hidden="true" />
      <span class="arch-radio-group__content">
        <span class="arch-radio-group__label">{{ option.label }}</span>
        <span v-if="option.description" class="arch-radio-group__description">
          {{ option.description }}
        </span>
      </span>
    </label>
  </div>
</template>
