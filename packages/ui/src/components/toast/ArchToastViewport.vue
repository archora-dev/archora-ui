<script setup lang="ts">
import ArchToast from "./ArchToast.vue";
import { useToast } from "./useToast";

withDefaults(
  defineProps<{
    position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
  }>(),
  {
    position: "top-right"
  }
);

const toast = useToast();
</script>

<template>
  <div
    class="arch-toast-viewport"
    :class="`arch-toast-viewport--${position}`"
    aria-live="polite"
    aria-relevant="additions removals"
  >
    <ArchToast v-for="item in toast.toasts.value" :key="item.id" :toast="item" />
  </div>
</template>
