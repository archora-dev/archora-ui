<script setup lang="ts">
withDefaults(
  defineProps<{
    active?: boolean;
    disabled?: boolean;
  }>(),
  {
    active: false,
    disabled: false
  }
);

const emit = defineEmits<{ toggle: [] }>();
</script>

<template>
  <button
    type="button"
    class="arch-filter-chip"
    :class="{ 'arch-filter-chip--active': active }"
    :aria-pressed="active ? 'true' : 'false'"
    :disabled="disabled"
    @click="emit('toggle')"
  >
    <slot />
  </button>
</template>
