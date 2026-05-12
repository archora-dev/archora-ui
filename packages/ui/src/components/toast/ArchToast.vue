<script setup lang="ts">
import type { ArchToastItem } from "./toast.types";

const props = defineProps<{
  toast: ArchToastItem;
}>();
</script>

<template>
  <article
    class="arch-toast"
    :class="`arch-toast--${toast.variant ?? 'info'}`"
    :role="toast.variant === 'danger' ? 'alert' : 'status'"
  >
    <div class="arch-toast__title">
      {{ props.toast.title }}
    </div>
    <div v-if="props.toast.description" class="arch-toast__description">
      {{ props.toast.description }}
    </div>
  </article>
</template>
