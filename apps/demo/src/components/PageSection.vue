<script setup lang="ts">
defineProps<{
  title?: string;
  description?: string;
}>();
</script>

<template>
  <section class="page-section">
    <div v-if="title || description || $slots.actions" class="page-section__header">
      <div>
        <h2 v-if="title">{{ title }}</h2>
        <p v-if="description">{{ description }}</p>
      </div>
      <div v-if="$slots.actions" class="page-section__actions">
        <slot name="actions" />
      </div>
    </div>
    <slot />
  </section>
</template>
