<script setup lang="ts">
import { ArchCard } from "@archora/ui";

defineProps<{
  label: string;
  value: string;
  delta: string;
  tone?: "good" | "watch" | "danger";
}>();
</script>

<template>
  <ArchCard class="metric-card" padding="md">
    <div class="metric-card__label">{{ label }}</div>
    <div class="metric-card__value">{{ value }}</div>
    <div class="metric-card__delta" :data-tone="tone ?? 'good'">{{ delta }}</div>
  </ArchCard>
</template>
