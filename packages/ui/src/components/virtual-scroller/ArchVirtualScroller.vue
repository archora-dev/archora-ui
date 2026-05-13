<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";

interface Props {
  items: unknown[];
  itemHeight: number;
}

const props = defineProps<Props>();

const containerRef = ref<HTMLElement | null>(null);
const scrollTop = ref(0);
const containerHeight = ref(0);

const visibleCount = computed(() => Math.ceil(containerHeight.value / props.itemHeight) + 1);
const startIndex = computed(() => Math.floor(scrollTop.value / props.itemHeight));
const endIndex = computed(() => startIndex.value + visibleCount.value);

const visibleItems = computed(() => {
  return props.items.slice(startIndex.value, endIndex.value).map((item, index) => ({
    item,
    index: startIndex.value + index,
    top: (startIndex.value + index) * props.itemHeight
  }));
});

const totalHeight = computed(() => props.items.length * props.itemHeight);

function onScroll(e: Event) {
  scrollTop.value = (e.target as HTMLElement).scrollTop;
}

const resizeObserver = new ResizeObserver((entries) => {
  for (const entry of entries) {
    containerHeight.value = entry.contentRect.height;
  }
});

onMounted(() => {
  if (containerRef.value) {
    containerHeight.value = containerRef.value.clientHeight;
    resizeObserver.observe(containerRef.value);
  }
});

onUnmounted(() => {
  resizeObserver.disconnect();
});
</script>

<template>
  <div ref="containerRef" class="arch-virtual-scroller" @scroll="onScroll">
    <div class="arch-virtual-scroller__spacer" :style="{ height: `${totalHeight}px` }" />
    <div class="arch-virtual-scroller__content">
      <div
        v-for="vi in visibleItems"
        :key="vi.index"
        class="arch-virtual-scroller__item"
        :style="{
          height: `${itemHeight}px`,
          transform: `translateY(${vi.top}px)`
        }"
      >
        <slot :item="vi.item" :index="vi.index" />
      </div>
    </div>
  </div>
</template>
