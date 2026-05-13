<script setup lang="ts">
withDefaults(
  defineProps<{
    title?: string;
    padding?: "none" | "sm" | "md" | "lg";
    scrollable?: boolean;
  }>(),
  {
    title: undefined,
    padding: "md",
    scrollable: false
  }
);
</script>

<template>
  <section
    class="arch-panel"
    :class="[`arch-panel--padding-${padding}`, { 'arch-panel--scrollable': scrollable }]"
  >
    <header v-if="title || $slots.header" class="arch-panel__header">
      <h2 v-if="title" class="arch-panel__title">{{ title }}</h2>
      <slot name="header" />
    </header>
    <div class="arch-panel__body">
      <slot />
    </div>
    <footer v-if="$slots.footer" class="arch-panel__footer">
      <slot name="footer" />
    </footer>
  </section>
</template>
