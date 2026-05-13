<script setup lang="ts">
import { ref } from "vue";
import type { ArchTreeViewItemData } from "./tree-view.types";

const props = defineProps<{
  item: ArchTreeViewItemData;
}>();

const isExpanded = ref(props.item.expanded ?? false);

function toggle() {
  if (props.item.children) {
    isExpanded.value = !isExpanded.value;
  }
}
</script>

<template>
  <div class="arch-tree-item" :class="{ 'arch-tree-item--has-children': item.children }">
    <div
      class="arch-tree-item__label"
      :class="{ 'arch-tree-item__label--expanded': isExpanded }"
      @click="toggle"
    >
      <span v-if="item.children" class="arch-tree-item__chevron">→</span>
      <span v-else class="arch-tree-item__dot" />
      <span class="arch-tree-item__text">{{ item.label }}</span>
    </div>

    <div v-if="item.children && isExpanded" class="arch-tree-item__children">
      <ArchTreeViewItem v-for="child in item.children" :key="child.id" :item="child" />
    </div>
  </div>
</template>
