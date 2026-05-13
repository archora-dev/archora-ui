<script setup lang="ts">
import { inject, computed, type Ref } from "vue";

const props = defineProps<{
  id: string;
  title: string;
}>();

interface AccordionContext {
  expandedItems: Ref<string[]>;
  toggleItem: (id: string) => void;
}

const accordion = inject<AccordionContext>("accordion");
const isExpanded = computed(() => accordion?.expandedItems.value.includes(props.id));

function toggle() {
  accordion?.toggleItem(props.id);
}
</script>

<template>
  <div class="arch-accordion-item" :class="{ 'arch-accordion-item--expanded': isExpanded }">
    <button
      class="arch-accordion-item__trigger"
      type="button"
      :aria-expanded="isExpanded"
      @click="toggle"
    >
      <span>{{ title }}</span>
      <span class="arch-accordion-item__icon" aria-hidden="true">→</span>
    </button>
    <div v-show="isExpanded" class="arch-accordion-item__content">
      <div class="arch-accordion-item__inner">
        <slot />
      </div>
    </div>
  </div>
</template>
