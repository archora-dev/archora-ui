<script setup lang="ts">
import { inject } from "vue";
import { dropdownContextKey } from "./dropdown.context";

const props = withDefaults(
  defineProps<{
    value: string;
    disabled?: boolean;
  }>(),
  {
    disabled: false
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
    type="button"
    role="menuitem"
    :disabled="disabled"
    @click="selectItem"
  >
    <slot />
  </button>
</template>
