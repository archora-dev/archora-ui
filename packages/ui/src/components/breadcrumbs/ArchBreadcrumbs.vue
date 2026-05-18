<script setup lang="ts">
import type { ArchBreadcrumbItem } from "./breadcrumbs.types";

withDefaults(defineProps<{ items: readonly ArchBreadcrumbItem[]; label?: string }>(), {
  label: "Breadcrumb"
});
</script>

<template>
  <nav class="arch-breadcrumbs" :aria-label="label">
    <ol class="arch-breadcrumbs__list">
      <li
        v-for="(item, index) in items"
        :key="`${item.label}-${index}`"
        class="arch-breadcrumbs__item"
      >
        <a
          v-if="item.href && index < items.length - 1"
          class="arch-breadcrumbs__link"
          :href="item.href"
          >{{ item.label }}</a
        >
        <span
          v-else
          class="arch-breadcrumbs__current"
          :aria-current="index === items.length - 1 ? 'page' : undefined"
        >
          {{ item.label }}
        </span>
      </li>
    </ol>
  </nav>
</template>
