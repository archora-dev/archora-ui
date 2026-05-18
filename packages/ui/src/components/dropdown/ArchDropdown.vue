<script setup lang="ts">
import { provide, ref } from "vue";
import { useOutsideClick } from "../../composables/useOutsideClick";
import { dropdownContextKey } from "./dropdown.context";

const emit = defineEmits<{
  select: [value: string];
  open: [];
  close: [];
}>();

const open = ref(false);
const rootRef = ref<HTMLElement | null>(null);
const triggerRef = ref<HTMLElement | null>(null);
const contentRef = ref<HTMLElement | null>(null);

function setOpen(nextOpen: boolean) {
  if (open.value === nextOpen) {
    return;
  }

  open.value = nextOpen;

  if (nextOpen) {
    emit("open");
  } else {
    emit("close");
  }
}

function select(value: string) {
  emit("select", String(value));
  setOpen(false);
}

provide(dropdownContextKey, {
  open,
  triggerRef,
  contentRef,
  setOpen,
  select
});

useOutsideClick([rootRef, contentRef], () => {
  setOpen(false);
});
</script>

<template>
  <div ref="rootRef" class="arch-dropdown" @click.stop>
    <slot />
  </div>
</template>
