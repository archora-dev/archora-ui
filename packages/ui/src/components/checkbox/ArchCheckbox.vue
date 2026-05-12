<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch } from "vue";
import type { ArchCheckboxProps } from "./checkbox.types";

const props = withDefaults(defineProps<ArchCheckboxProps>(), {
  modelValue: false,
  label: undefined,
  name: undefined,
  value: undefined,
  disabled: false,
  required: false,
  invalid: false,
  indeterminate: false,
  ariaLabel: undefined,
  ariaLabelledby: undefined,
  ariaDescribedby: undefined
});

const emit = defineEmits<{
  "update:modelValue": [value: boolean];
  change: [event: Event];
}>();

const inputRef = ref<HTMLInputElement | null>(null);
const ariaChecked = computed(() => (props.indeterminate ? "mixed" : undefined));

function syncIndeterminate() {
  if (inputRef.value) {
    inputRef.value.indeterminate = props.indeterminate;
  }
}

onMounted(syncIndeterminate);

watch(
  () => props.indeterminate,
  async () => {
    await nextTick();
    syncIndeterminate();
  }
);

function onChange(event: Event) {
  if (props.disabled) {
    return;
  }

  const target = event.target as HTMLInputElement;
  emit("update:modelValue", target.checked);
  emit("change", event);
}
</script>

<template>
  <label
    class="arch-checkbox"
    :class="{
      'arch-checkbox--checked': modelValue,
      'arch-checkbox--disabled': disabled,
      'arch-checkbox--invalid': invalid,
      'arch-checkbox--indeterminate': indeterminate
    }"
  >
    <input
      ref="inputRef"
      class="arch-checkbox__input"
      type="checkbox"
      :checked="modelValue"
      :name="name"
      :value="value"
      :disabled="disabled"
      :required="required"
      :aria-checked="ariaChecked"
      :aria-invalid="invalid ? 'true' : undefined"
      :aria-label="ariaLabel"
      :aria-labelledby="ariaLabelledby"
      :aria-describedby="ariaDescribedby"
      @change="onChange"
    />
    <span class="arch-checkbox__control" aria-hidden="true">
      <span class="arch-checkbox__indicator" />
    </span>
    <span v-if="$slots.default || label" class="arch-checkbox__label">
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>
