<script setup lang="ts">
import { computed } from "vue";
import { ArchSeverityMarker, type ArchSeverity } from "../severity-marker";

const props = withDefaults(
  defineProps<{
    score?: number | null;
    severity: ArchSeverity;
    reason?: string;
    size?: "sm" | "md" | "lg";
    layout?: "inline" | "block";
  }>(),
  {
    score: undefined,
    reason: undefined,
    size: "sm",
    layout: "inline"
  }
);

const label = computed(() => props.severity.charAt(0).toUpperCase() + props.severity.slice(1));
const scoreText = computed(() =>
  props.score === null || props.score === undefined || Number.isNaN(props.score)
    ? undefined
    : Math.round(props.score).toString()
);
</script>

<template>
  <span class="arch-risk-score" :class="[`arch-risk-score--${layout}`, `arch-risk-score--${size}`]">
    <span class="arch-risk-score__main">
      <ArchSeverityMarker :severity="severity" :label="label" />
      <span v-if="scoreText" class="arch-risk-score__score">{{ scoreText }}</span>
      <span class="arch-risk-score__label">{{ label }}</span>
    </span>
    <span v-if="reason" class="arch-risk-score__reason">{{ reason }}</span>
  </span>
</template>
