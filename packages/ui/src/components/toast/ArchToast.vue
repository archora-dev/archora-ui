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

function runAction(action: NonNullable<ArchToastItem["actions"]>[number]) {
  action.onClick();

  if (action.dismiss !== false) {
    close();
  }
}
</script>

<template>
  <div
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
      <div v-if="props.toast.actions?.length" class="arch-toast__actions">
        <button
          v-for="(action, index) in props.toast.actions"
          :key="`${props.toast.id}-${index}`"
          type="button"
          class="arch-toast__action"
          @click="runAction(action)"
        >
          {{ action.label }}
        </button>
      </div>
    </div>
    <button class="arch-toast__close" type="button" aria-label="Close" @click="close">
      <span aria-hidden="true">×</span>
    </button>
  </div>
</template>
