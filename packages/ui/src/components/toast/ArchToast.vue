<script setup lang="ts">
import type { ArchToastItem } from "./toast.types";
import { useToast } from "./useToast";

const props = defineProps<{
  toast: ArchToastItem;
}>();

const { dismiss } = useToast();

function close() {
  dismiss(props.toast.id);
}
</script>

<template>
  <article
    class="arch-toast"
    :class="`arch-toast--${toast.variant ?? 'info'}`"
    :role="toast.variant === 'danger' ? 'alert' : 'status'"
  >
    <div class="arch-toast__content">
      <div class="arch-toast__title">
        {{ props.toast.title }}
      </div>
      <div v-if="props.toast.description" class="arch-toast__description">
        {{ props.toast.description }}
      </div>
    </div>
    <button class="arch-toast__close" type="button" aria-label="Close" @click="close">
      <span aria-hidden="true">×</span>
    </button>
  </article>
</template>
