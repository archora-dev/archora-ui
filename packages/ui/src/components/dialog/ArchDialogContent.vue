<script setup lang="ts">
import { inject, nextTick, onUnmounted, ref, watch } from "vue";
import { useFocusTrap } from "../../composables/useFocusTrap";
import { dialogContextKey } from "./dialog.context";

export type ArchDialogContentSize = "sm" | "md" | "lg" | "xl";

const props = withDefaults(
  defineProps<{
    size?: ArchDialogContentSize;
    closeOnOutside?: boolean;
  }>(),
  {
    size: "md",
    closeOnOutside: true
  }
);

const dialog = inject(dialogContextKey);
const contentRef = ref<HTMLElement | null>(null);
const focusTrap = useFocusTrap(contentRef);

function closeDialog() {
  dialog?.setOpen(false);
}

function onOverlayPointerdown() {
  if (props.closeOnOutside) {
    closeDialog();
  }
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === "Escape") {
    event.preventDefault();
    closeDialog();
    return;
  }

  focusTrap.onKeydown(event);
}

watch(
  () => dialog?.open.value,
  async (isOpen) => {
    if (!isOpen) {
      return;
    }

    await nextTick();
    focusTrap.focusFirst();
  }
);

onUnmounted(() => {
  if (typeof document !== "undefined") {
    document.body.style.overflow = "";
  }
});
</script>

<template>
  <Teleport to="body">
    <div v-if="dialog?.open.value" class="arch-dialog">
      <div class="arch-dialog__overlay" @pointerdown="onOverlayPointerdown" />
      <div
        ref="contentRef"
        class="arch-dialog__content"
        :class="`arch-dialog__content--${props.size}`"
        role="dialog"
        aria-modal="true"
        :aria-labelledby="dialog.titleId"
        :aria-describedby="dialog.descriptionId"
        tabindex="-1"
        @keydown="onKeydown"
      >
        <slot :close="closeDialog" />
      </div>
    </div>
  </Teleport>
</template>
