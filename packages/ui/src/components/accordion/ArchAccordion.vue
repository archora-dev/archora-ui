<script setup lang="ts">
import { provide, ref } from "vue";

const props = defineProps<{
  modelValue?: string | string[];
  multiple?: boolean;
}>();

const emit = defineEmits<{
  "update:modelValue": [value: string | string[]];
}>();

const expandedItems = ref<string[]>(
  Array.isArray(props.modelValue) ? props.modelValue : props.modelValue ? [props.modelValue] : []
);

function toggleItem(id: string) {
  if (props.multiple) {
    if (expandedItems.value.includes(id)) {
      expandedItems.value = expandedItems.value.filter((item) => item !== id);
    } else {
      expandedItems.value.push(id);
    }
  } else {
    expandedItems.value = expandedItems.value.includes(id) ? [] : [id];
  }
  emit("update:modelValue", props.multiple ? expandedItems.value : expandedItems.value[0] || "");
}

provide("accordion", {
  expandedItems,
  toggleItem
});
</script>

<template>
  <div class="arch-accordion">
    <slot />
  </div>
</template>
