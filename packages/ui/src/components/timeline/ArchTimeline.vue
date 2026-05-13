<script setup lang="ts">
import type { ArchTimelineItem } from "./timeline.types";

withDefaults(defineProps<{ items: readonly ArchTimelineItem[]; dense?: boolean }>(), {
  dense: false
});
</script>

<template>
  <ol class="arch-timeline" :class="{ 'arch-timeline--dense': dense }">
    <li
      v-for="item in items"
      :key="item.id"
      class="arch-timeline__item"
      :class="`arch-timeline__item--${item.tone ?? 'neutral'}`"
    >
      <span class="arch-timeline__marker" aria-hidden="true" />
      <div class="arch-timeline__content">
        <div class="arch-timeline__header">
          <h3 class="arch-timeline__title">{{ item.title }}</h3>
          <time v-if="item.time" class="arch-timeline__time">{{ item.time }}</time>
        </div>
        <p v-if="item.description" class="arch-timeline__description">{{ item.description }}</p>
      </div>
    </li>
  </ol>
</template>
