<script setup lang="ts">
import { computed } from "vue";

interface Props {
  value?: number;
  max?: number;
}

const props = withDefaults(defineProps<Props>(), {
  value: 0,
  max: 100
});

const percentage = computed(
  () => (Math.max(0, Math.min(props.value, props.max)) / props.max) * 100
);
</script>

<template>
  <div
    class="arch-progress-bar"
    role="progressbar"
    :aria-valuenow="value"
    :aria-valuemin="0"
    :aria-valuemax="max"
  >
    <div class="arch-progress-bar__fill" :style="{ width: `${percentage}%` }" />
  </div>
</template>
