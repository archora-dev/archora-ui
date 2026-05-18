<script setup lang="ts" generic="T">
import { computed, onMounted, onUnmounted, ref } from "vue";

export interface ArchVirtualScrollerProps<U> {
  items: readonly U[];
  itemHeight: number;
  height?: number | string;
  overscan?: number;
  keyFn?: (item: U, index: number) => string | number;
}

const props = withDefaults(defineProps<ArchVirtualScrollerProps<T>>(), {
  height: "100%",
  overscan: 1,
  keyFn: ((_: unknown, index: number) => index) as never
});

defineSlots<{
  default(props: { item: T; index: number }): unknown;
}>();

const containerRef = ref<HTMLElement | null>(null);
const scrollTop = ref(0);
const containerHeight = ref(typeof props.height === "number" ? props.height : 0);

const resolvedHeight = computed(() =>
  typeof props.height === "number" ? `${props.height}px` : props.height
);

const totalHeight = computed(() => props.items.length * props.itemHeight);
const rowKey = computed(() => props.keyFn ?? ((_: T, index: number) => index));

const range = computed(() => {
  const height = containerHeight.value || 500;
  const visibleCount = Math.ceil(height / props.itemHeight);
  const firstVisibleIndex = Math.floor(scrollTop.value / props.itemHeight);
  const start = Math.max(0, firstVisibleIndex - props.overscan);
  const end = Math.min(props.items.length, firstVisibleIndex + visibleCount + props.overscan);

  return { start, end };
});

const visibleItems = computed(() => {
  const { start, end } = range.value;

  return props.items.slice(start, end).map((item, index) => ({
    item,
    index: start + index,
    key: rowKey.value(item as T, start + index),
    top: (start + index) * props.itemHeight
  }));
});

function onScroll(e: Event) {
  scrollTop.value = (e.target as HTMLElement).scrollTop;
}

let resizeObserver: ResizeObserver | null = null;

onMounted(() => {
  if (!containerRef.value) {
    return;
  }

  if (containerRef.value.clientHeight > 0) {
    containerHeight.value = containerRef.value.clientHeight;
  }

  if (typeof props.height !== "number") {
    resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentRect.height > 0) {
          containerHeight.value = entry.contentRect.height;
        }
      }
    });
    resizeObserver.observe(containerRef.value);
  }
});

onUnmounted(() => {
  resizeObserver?.disconnect();
});

defineExpose({
  scrollTo(index: number) {
    if (!containerRef.value) {
      return;
    }

    containerRef.value.scrollTop = index * props.itemHeight;
    scrollTop.value = containerRef.value.scrollTop;
  }
});
</script>

<template>
  <div
    ref="containerRef"
    class="arch-virtual-scroller"
    :style="{ height: resolvedHeight }"
    @scroll="onScroll"
  >
    <div class="arch-virtual-scroller__spacer" :style="{ height: `${totalHeight}px` }" />
    <div class="arch-virtual-scroller__content">
      <div
        v-for="vi in visibleItems"
        :key="vi.key"
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
