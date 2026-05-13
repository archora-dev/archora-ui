<script setup lang="ts">
interface Props {
  width?: string | number;
  height?: string | number;
  circle?: boolean;
}

const props = defineProps<Props>();

const style = {
  width: typeof props.width === "number" ? `${props.width}px` : props.width,
  height: typeof props.height === "number" ? `${props.height}px` : props.height,
  borderRadius: props.circle ? "var(--arch-radius-full)" : "var(--arch-radius-md)"
};
</script>

<template>
  <div class="arch-skeleton" :style="style" aria-hidden="true" />
</template>
