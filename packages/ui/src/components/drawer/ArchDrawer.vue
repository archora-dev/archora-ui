<script setup lang="ts">
import { nextTick, ref, watch } from "vue";
import { useFocusTrap } from "../../composables/useFocusTrap";
import { useId } from "../../composables/useId";
import type { ArchDrawerProps } from "./drawer.types";

const props = withDefaults(defineProps<ArchDrawerProps>(), {
  open: false,
  side: "right",
  size: "md",
  title: undefined,
  description: undefined,
  closeOnEscape: true,
  closeOnOverlay: true,
  showClose: true,
  modal: true,
  stickyFooter: false,
  resizable: false
});

const emit = defineEmits<{
  "update:open": [open: boolean];
  openChange: [open: boolean];
}>();

const panelRef = ref<HTMLElement | null>(null);
const titleId = useId("arch-drawer-title");
const descriptionId = useId("arch-drawer-description");
const focusTrap = useFocusTrap(panelRef);

function setOpen(open: boolean) {
  emit("update:open", open);
  emit("openChange", open);
}

function close() {
  setOpen(false);
}

function onOverlayPointerdown() {
  if (props.closeOnOverlay) {
    close();
  }
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === "Escape" && props.closeOnEscape) {
    event.preventDefault();
    close();
    return;
  }

  focusTrap.onKeydown(event);
}

watch(
  () => props.open,
  async (isOpen) => {
    if (!isOpen) {
      return;
    }

    await nextTick();
    focusTrap.focusFirst();
  }
);
</script>

<template>
  <Teleport to="body">
    <div
      v-if="open"
      class="arch-drawer"
      :class="[
        `arch-drawer--${side}`,
        `arch-drawer--${size}`,
        {
          'arch-drawer--non-modal': !modal,
          'arch-drawer--sticky-footer': stickyFooter,
          'arch-drawer--resizable': resizable
        }
      ]"
    >
      <div v-if="modal" class="arch-drawer__overlay" @pointerdown="onOverlayPointerdown" />
      <section
        ref="panelRef"
        class="arch-drawer__panel"
        role="dialog"
        :aria-modal="modal ? 'true' : 'false'"
        :aria-labelledby="title || $slots.title ? titleId : undefined"
        :aria-describedby="description || $slots.description ? descriptionId : undefined"
        tabindex="-1"
        @keydown="onKeydown"
      >
        <header
          v-if="title || description || $slots.title || $slots.description || showClose"
          class="arch-drawer__header"
        >
          <div class="arch-drawer__heading">
            <h2 v-if="title || $slots.title" :id="titleId" class="arch-drawer__title">
              <slot name="title">{{ title }}</slot>
            </h2>
            <p
              v-if="description || $slots.description"
              :id="descriptionId"
              class="arch-drawer__description"
            >
              <slot name="description">{{ description }}</slot>
            </p>
          </div>
          <button
            v-if="showClose"
            class="arch-drawer__close"
            type="button"
            aria-label="Close drawer"
            @click="close"
          >
            ×
          </button>
        </header>
        <div class="arch-drawer__body">
          <slot :close="close" />
        </div>
        <footer v-if="$slots.footer" class="arch-drawer__footer">
          <slot name="footer" :close="close" />
        </footer>
      </section>
    </div>
  </Teleport>
</template>
