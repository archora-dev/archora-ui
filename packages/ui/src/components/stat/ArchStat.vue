<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    label: string;
    value: string | number;
    delta?: string;
    deltaTone?: "neutral" | "positive" | "negative" | "warning";
    status?: string;
    progress?: number;
  }>(),
  {
    delta: undefined,
    deltaTone: "neutral",
    status: undefined,
    progress: undefined
  }
);
</script>

<template>
  <article class="arch-stat">
    <div class="arch-stat__header">
      <span class="arch-stat__label">{{ label }}</span>
      <span v-if="status" class="arch-stat__status">{{ status }}</span>
    </div>
    <div class="arch-stat__value-row">
      <strong class="arch-stat__value">{{ value }}</strong>
      <span v-if="delta" class="arch-stat__delta" :class="`arch-stat__delta--${deltaTone}`">{{
        delta
      }}</span>
    </div>
    <div
      v-if="progress !== undefined"
      class="arch-stat__progress"
      role="progressbar"
      :aria-valuenow="Math.max(0, Math.min(100, props.progress ?? 0))"
      aria-valuemin="0"
      aria-valuemax="100"
    >
      <span
        class="arch-stat__progress-fill"
        :style="{ width: `${Math.max(0, Math.min(100, props.progress ?? 0))}%` }"
      />
    </div>
    <div v-if="$slots.default" class="arch-stat__body"><slot /></div>
  </article>
</template>
