<script setup lang="ts">
import { ref } from "vue";

const props = withDefaults(
  defineProps<{
    modelValue?: string;
    placeholder?: string;
    disabled?: boolean;
    label?: string;
  }>(),
  {
    modelValue: "",
    placeholder: "",
    disabled: false,
    label: "Search"
  }
);

const emit = defineEmits<{ "update:modelValue": [value: string] }>();
const inputRef = ref<HTMLInputElement | null>(null);

function focus() {
  inputRef.value?.focus();
  inputRef.value?.select();
}

defineExpose({ focus });
</script>

<template>
  <label class="arch-search-input">
    <span class="arch-search-input__icon" aria-hidden="true">⌕</span>
    <span class="arch-search-input__sr">{{ label }}</span>
    <input
      ref="inputRef"
      type="search"
      :value="props.modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
    <button
      v-if="props.modelValue"
      type="button"
      class="arch-search-input__clear"
      aria-label="Clear search"
      @click="emit('update:modelValue', '')"
    >
      ×
    </button>
  </label>
</template>
