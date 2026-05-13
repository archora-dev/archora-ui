<script setup lang="ts">
import { inject, nextTick, type ComponentPublicInstance } from "vue";
import { dropdownContextKey } from "./dropdown.context";

const dropdown = inject(dropdownContextKey);

async function focusMenuItem(position: "first" | "last") {
  await nextTick();

  const items = Array.from(
    dropdown?.contentRef.value?.querySelectorAll<HTMLButtonElement>(
      '[role="menuitem"]:not(:disabled)'
    ) ?? []
  );
  const item = position === "first" ? items[0] : items.at(-1);
  item?.focus();
}

function onClick() {
  dropdown?.setOpen(!dropdown.open.value);
}

function setTriggerRef(element: Element | ComponentPublicInstance | null) {
  if (dropdown) {
    dropdown.triggerRef.value = element instanceof HTMLElement ? element : null;
  }
}

async function onKeydown(event: KeyboardEvent) {
  if (event.key === "ArrowDown" || event.key === "ArrowUp") {
    event.preventDefault();
    dropdown?.setOpen(true);
    await focusMenuItem(event.key === "ArrowDown" ? "first" : "last");
    return;
  }

  if (event.key === "Escape") {
    event.preventDefault();
    dropdown?.setOpen(false);
  }
}
</script>

<template>
  <button
    :ref="setTriggerRef"
    class="arch-dropdown__trigger"
    type="button"
    aria-haspopup="menu"
    :aria-expanded="dropdown?.open.value ? 'true' : 'false'"
    @click="onClick"
    @keydown="onKeydown"
  >
    <slot />
  </button>
</template>
