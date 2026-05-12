<script setup lang="ts">
import { ref } from "vue";
import { useFloatingPosition } from "../../composables/useFloatingPosition";
import { useId } from "../../composables/useId";
import type { ArchTooltipProps } from "./tooltip.types";

const props = withDefaults(defineProps<ArchTooltipProps>(), {
  placement: "top"
});

const open = ref(false);
const triggerRef = ref<HTMLElement | null>(null);
const contentRef = ref<HTMLElement | null>(null);
const tooltipId = useId("arch-tooltip");
const { floatingPlacement, floatingStyle } = useFloatingPosition(triggerRef, contentRef, open, {
  placement: props.placement,
  offset: 8,
  padding: 8,
  maxWidth: 256
});

function closeOnEscape(event: KeyboardEvent) {
  if (event.key === "Escape") {
    event.preventDefault();
    open.value = false;
  }
}
</script>

<template>
  <span
    class="arch-tooltip"
    :class="[`arch-tooltip--${floatingPlacement}`, { 'arch-tooltip--open': open }]"
  >
    <span
      ref="triggerRef"
      class="arch-tooltip__trigger"
      tabindex="0"
      :aria-describedby="tooltipId"
      @mouseenter="open = true"
      @mouseleave="open = false"
      @focusin="open = true"
      @focusout="open = false"
      @keydown="closeOnEscape"
    >
      <slot />
    </span>
    <span
      v-if="open"
      :id="tooltipId"
      ref="contentRef"
      class="arch-tooltip__content"
      role="tooltip"
      :style="floatingStyle"
    >
      {{ content }}
    </span>
  </span>
</template>
