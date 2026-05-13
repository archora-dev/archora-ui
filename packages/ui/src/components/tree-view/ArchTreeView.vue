<script setup lang="ts">
import type { ArchTreeViewProps } from "./tree-view.types";
import ArchTreeViewItem from "./ArchTreeViewItem.vue";

defineProps<ArchTreeViewProps>();
</script>

<template>
  <div class="arch-tree-view">
    <ArchTreeViewItem v-for="item in items" :key="item.id" :item="item" />
  </div>
</template>
