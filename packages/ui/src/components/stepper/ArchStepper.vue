<script setup lang="ts">
import type { ArchStepItem } from "./stepper.types";

const props = withDefaults(
  defineProps<{
    steps: readonly ArchStepItem[];
    modelValue?: string;
    orientation?: "horizontal" | "vertical";
    clickable?: boolean;
  }>(),
  {
    modelValue: undefined,
    orientation: "horizontal",
    clickable: false
  }
);

const emit = defineEmits<{ "update:modelValue": [id: string]; select: [id: string] }>();

function select(step: ArchStepItem) {
  if (!props.clickable || step.disabled) return;
  emit("update:modelValue", step.id);
  emit("select", step.id);
}
</script>

<template>
  <ol class="arch-stepper" :class="`arch-stepper--${orientation}`">
    <li
      v-for="(step, index) in steps"
      :key="step.id"
      class="arch-stepper__step"
      :class="[
        `arch-stepper__step--${step.status ?? (step.id === modelValue ? 'current' : 'pending')}`,
        { 'arch-stepper__step--clickable': clickable && !step.disabled }
      ]"
    >
      <button
        type="button"
        class="arch-stepper__button"
        :data-step-id="step.id"
        :disabled="step.disabled || !clickable"
        :aria-current="step.id === modelValue || step.status === 'current' ? 'step' : undefined"
        @click="select(step)"
      >
        <span class="arch-stepper__index">{{ index + 1 }}</span>
        <span class="arch-stepper__text">
          <span class="arch-stepper__label">{{ step.label }}</span>
          <span v-if="step.description" class="arch-stepper__description">{{
            step.description
          }}</span>
        </span>
      </button>
    </li>
  </ol>
</template>
