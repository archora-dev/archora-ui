<script setup lang="ts">
import { ref } from "vue";
import { useFloatingPosition, useOutsideClick } from "../../composables";
import type { FloatingPlacement } from "../../composables/useFloatingPosition";

interface Props {
  placement?: FloatingPlacement;
  offset?: number;
}

const props = withDefaults(defineProps<Props>(), {
  placement: "bottom",
  offset: 8
});

const isOpen = ref(false);
const triggerRef = ref<HTMLElement | null>(null);
const contentRef = ref<HTMLElement | null>(null);

const { floatingStyle } = useFloatingPosition(triggerRef, contentRef, isOpen, {
  placement: props.placement,
  offset: props.offset
});

useOutsideClick(contentRef, (event) => {
  // Ignore clicks on the trigger.
  if (isOpen.value && triggerRef.value && !triggerRef.value.contains(event.target as Node)) {
    isOpen.value = false;
  }
});

function toggle() {
  isOpen.value = !isOpen.value;
}
</script>

<template>
  <div class="arch-popover">
    <div ref="triggerRef" class="arch-popover__trigger" @click="toggle">
      <slot name="trigger" :is-open="isOpen" />
    </div>

    <Teleport to="body">
      <div
        v-if="isOpen"
        ref="contentRef"
        class="arch-popover__content"
        :style="[floatingStyle, { zIndex: 'var(--arch-z-popover)' }]"
      >
        <slot :close="() => (isOpen = false)" />
      </div>
    </Teleport>
  </div>
</template>
