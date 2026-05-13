<script setup lang="ts">
import { onErrorCaptured, ref } from "vue";

const props = withDefaults(defineProps<{ fallbackTitle?: string; retryLabel?: string }>(), {
  fallbackTitle: "Something went wrong",
  retryLabel: "Retry"
});

const emit = defineEmits<{ retry: [] }>();
const error = ref<Error | null>(null);

onErrorCaptured((captured) => {
  error.value = captured instanceof Error ? captured : new Error(String(captured));
  return false;
});

function retry() {
  error.value = null;
  emit("retry");
}
</script>

<template>
  <slot v-if="!error" />
  <section v-else class="arch-error-boundary" role="alert">
    <h3 class="arch-error-boundary__title">{{ props.fallbackTitle }}</h3>
    <p class="arch-error-boundary__message">{{ error.message }}</p>
    <button type="button" class="arch-error-boundary__retry" @click="retry">
      {{ retryLabel }}
    </button>
  </section>
</template>
