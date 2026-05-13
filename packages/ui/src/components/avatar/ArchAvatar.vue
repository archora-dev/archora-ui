<script setup lang="ts">
import { ref, watch } from "vue";
import type { ArchAvatarProps } from "./avatar.types";

const props = withDefaults(defineProps<ArchAvatarProps>(), {
  size: "md"
});

const hasError = ref(false);

// Reset image error state when src changes.
watch(
  () => props.src,
  () => {
    hasError.value = false;
  }
);

function handleImageError() {
  hasError.value = true;
}
</script>

<template>
  <div
    class="arch-avatar"
    :class="[`arch-avatar--${size}`]"
    role="img"
    :aria-label="alt || fallback || 'User avatar'"
  >
    <img
      v-if="src && !hasError"
      :src="src"
      :alt="alt"
      class="arch-avatar__image"
      @error="handleImageError"
    />
    <span v-else class="arch-avatar__fallback">
      {{ fallback || "?" }}
    </span>
  </div>
</template>
