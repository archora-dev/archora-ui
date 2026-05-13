<script setup lang="ts">
import { computed, provide, ref, watch } from "vue";
import { useId } from "../../composables/useId";
import { dialogContextKey } from "./dialog.context";

const props = withDefaults(
  defineProps<{
    open?: boolean;
    defaultOpen?: boolean;
  }>(),
  {
    open: undefined,
    defaultOpen: false
  }
);

const emit = defineEmits<{
  "update:open": [open: boolean];
  openChange: [open: boolean];
}>();

const localOpen = ref(props.defaultOpen);
const triggerRef = ref<HTMLElement | null>(null);
const titleId = useId("arch-dialog-title");
const descriptionId = useId("arch-dialog-description");
const isControlled = computed(() => props.open !== undefined);
const openState = computed(() => (isControlled.value ? props.open === true : localOpen.value));

function setOpen(nextOpen: boolean) {
  if (!isControlled.value) {
    localOpen.value = nextOpen;
  }

  emit("update:open", nextOpen);
  emit("openChange", nextOpen);

  if (!nextOpen) {
    triggerRef.value?.focus();
  }
}

watch(openState, (isOpen) => {
  if (typeof document === "undefined") {
    return;
  }

  document.body.style.overflow = isOpen ? "hidden" : "";
});

provide(dialogContextKey, {
  open: openState,
  titleId,
  descriptionId,
  triggerRef,
  setOpen
});
</script>

<template>
  <slot />
</template>
