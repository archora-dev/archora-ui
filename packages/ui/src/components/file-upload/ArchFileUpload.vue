<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    modelValue?: File[];
    label?: string;
    description?: string;
    accept?: string;
    multiple?: boolean;
    disabled?: boolean;
  }>(),
  {
    modelValue: () => [],
    label: "Upload files",
    description: undefined,
    accept: undefined,
    multiple: false,
    disabled: false
  }
);

const emit = defineEmits<{ "update:modelValue": [files: File[]]; change: [files: File[]] }>();

function onChange(event: Event) {
  const files = Array.from((event.target as HTMLInputElement).files ?? []);
  emit("update:modelValue", files);
  emit("change", files);
}
</script>

<template>
  <label class="arch-file-upload" :class="{ 'arch-file-upload--disabled': disabled }">
    <span class="arch-file-upload__label">{{ label }}</span>
    <span v-if="description" class="arch-file-upload__description">{{ description }}</span>
    <input
      class="arch-file-upload__input"
      type="file"
      :accept="accept"
      :multiple="multiple"
      :disabled="disabled"
      @change="onChange"
    />
    <span class="arch-file-upload__dropzone">Choose file</span>
    <ul v-if="props.modelValue.length > 0" class="arch-file-upload__list">
      <li
        v-for="file in props.modelValue"
        :key="`${file.name}-${file.size}`"
        class="arch-file-upload__file"
      >
        {{ file.name }}
      </li>
    </ul>
  </label>
</template>
