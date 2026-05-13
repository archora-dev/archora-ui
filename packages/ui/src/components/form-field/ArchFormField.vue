<script setup lang="ts">
import { computed } from "vue";
import { useId } from "../../composables/useId";
import type { ArchFormFieldProps, ArchFormFieldSlotProps } from "./form-field.types";

const props = withDefaults(defineProps<ArchFormFieldProps>(), {
  id: undefined,
  label: undefined,
  description: undefined,
  error: undefined,
  required: false,
  invalid: false
});

defineSlots<{
  default: (props: ArchFormFieldSlotProps) => unknown;
}>();

const fallbackId = useId("arch-field");
const fieldId = computed(() => props.id ?? fallbackId);
const descriptionId = computed(() =>
  props.description ? `${fieldId.value}-description` : undefined
);
const errorId = computed(() => (props.error ? `${fieldId.value}-error` : undefined));
const describedby = computed(
  () => [descriptionId.value, errorId.value].filter(Boolean).join(" ") || undefined
);
const invalidState = computed(() => props.invalid || Boolean(props.error));
</script>

<template>
  <div class="arch-form-field" :class="{ 'arch-form-field--invalid': invalidState }">
    <label v-if="label" class="arch-form-field__label" :for="fieldId">
      <span>{{ label }}</span>
      <span v-if="required" class="arch-form-field__required" aria-hidden="true">*</span>
    </label>
    <slot :id="fieldId" :describedby="describedby" :invalid="invalidState" :required="required" />
    <p v-if="description" :id="descriptionId" class="arch-form-field__description">
      {{ description }}
    </p>
    <p v-if="error" :id="errorId" class="arch-form-field__error" role="alert">
      {{ error }}
    </p>
  </div>
</template>
