<script setup lang="ts">
import { inject } from "vue";
import type { ComponentPublicInstance } from "vue";
import { dialogContextKey } from "./dialog.context";

const dialog = inject(dialogContextKey);

function setTriggerRef(element: Element | ComponentPublicInstance | null) {
  if (dialog) {
    dialog.triggerRef.value = element instanceof HTMLElement ? element : null;
  }
}
</script>

<template>
  <button
    :ref="setTriggerRef"
    class="arch-dialog__trigger"
    type="button"
    :aria-expanded="dialog?.open.value ? 'true' : 'false'"
    @click="dialog?.setOpen(true)"
  >
    <slot />
  </button>
</template>
