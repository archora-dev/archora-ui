<script setup lang="ts">
import { provide, ref } from "vue";
import { useOutsideClick } from "../../composables/useOutsideClick";
import { dropdownContextKey } from "./dropdown.context";

const emit = defineEmits<{
  select: [value: string];
}>();

const open = ref(false);
const rootRef = ref<HTMLElement | null>(null);
const triggerRef = ref<HTMLElement | null>(null);

function setOpen(nextOpen: boolean) {
  open.value = nextOpen;
}

function select(value: string) {
  emit("select", value);
  setOpen(false);
}

provide(dropdownContextKey, {
  open,
  triggerRef,
  setOpen,
  select
});

useOutsideClick(rootRef, () => {
  setOpen(false);
});
</script>

<template>
  <div ref="rootRef" class="arch-dropdown" @click.stop>
    <slot />
  </div>
</template>
