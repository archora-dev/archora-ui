<script setup lang="ts">
import { inject, ref } from "vue";
import { useFloatingPosition } from "../../composables/useFloatingPosition";
import { dropdownContextKey } from "./dropdown.context";

const dropdown = inject(dropdownContextKey);
const contentRef = dropdown?.contentRef ?? ref<HTMLElement | null>(null);
const { floatingStyle } = useFloatingPosition(dropdown!.triggerRef, contentRef, dropdown!.open, {
  align: "end",
  minWidth: 192
});

function getEnabledItems() {
  return Array.from(
    contentRef.value?.querySelectorAll<HTMLButtonElement>('[role="menuitem"]:not(:disabled)') ?? []
  );
}

function focusItem(delta: 1 | -1) {
  const items = getEnabledItems();

  if (items.length === 0) {
    return;
  }

  const currentIndex = items.findIndex((item) => item === document.activeElement);
  const nextIndex = (currentIndex + delta + items.length) % items.length;
  items[nextIndex]?.focus();
}

function focusFirst() {
  getEnabledItems()[0]?.focus();
}

function focusLast() {
  getEnabledItems().at(-1)?.focus();
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === "Escape") {
    event.preventDefault();
    dropdown?.setOpen(false);
    return;
  }

  if (event.key === "ArrowDown") {
    event.preventDefault();
    focusItem(1);
    return;
  }

  if (event.key === "ArrowUp") {
    event.preventDefault();
    focusItem(-1);
    return;
  }

  if (event.key === "Home") {
    event.preventDefault();
    focusFirst();
    return;
  }

  if (event.key === "End") {
    event.preventDefault();
    focusLast();
  }
}
</script>

<template>
  <Teleport to="body">
    <div
      v-if="dropdown?.open.value"
      ref="contentRef"
      class="arch-dropdown__content"
      role="menu"
      tabindex="-1"
      :style="floatingStyle"
      @keydown="onKeydown"
    >
      <slot />
    </div>
  </Teleport>
</template>
