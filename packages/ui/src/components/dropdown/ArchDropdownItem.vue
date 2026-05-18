<script setup lang="ts">
import { inject } from "vue";
import { dropdownContextKey } from "./dropdown.context";

const props = withDefaults(
  defineProps<{
    value: string;
    disabled?: boolean;
    description?: string;
    tone?: "default" | "danger";
  }>(),
  {
    disabled: false,
    description: undefined,
    tone: "default"
  }
);

const dropdown = inject(dropdownContextKey);

function selectItem() {
  if (!props.disabled) {
    dropdown?.select(props.value);
  }
}
</script>

<template>
  <button
    class="arch-dropdown__item"
    :class="{ 'arch-dropdown__item--danger': tone === 'danger' }"
    type="button"
    role="menuitem"
    :disabled="disabled"
    @click="selectItem"
  >
    <span class="arch-dropdown__item-label"><slot /></span>
    <span v-if="description" class="arch-dropdown__item-description">{{ description }}</span>
  </button>
</template>
