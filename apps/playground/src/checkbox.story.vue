<script setup lang="ts">
import { reactive } from "vue";
import { ArchCheckbox } from "@archora/ui";

const state = reactive({
  checked: false,
  disabled: false,
  required: false,
  invalid: false,
  indeterminate: false
});
</script>

<template>
  <Story title="Components/Checkbox">
    <Variant title="Interactive">
      <main class="checkbox-story">
        <ArchCheckbox
          v-model="state.checked"
          :disabled="state.disabled"
          :required="state.required"
          :invalid="state.invalid"
          :indeterminate="state.indeterminate"
        >
          Enable deployment safeguards
        </ArchCheckbox>

        <section class="checkbox-story__controls">
          <ArchCheckbox v-model="state.checked"> Checked </ArchCheckbox>

          <ArchCheckbox v-model="state.indeterminate"> Indeterminate </ArchCheckbox>

          <ArchCheckbox v-model="state.disabled"> Disabled </ArchCheckbox>

          <ArchCheckbox v-model="state.required"> Required </ArchCheckbox>

          <ArchCheckbox v-model="state.invalid"> Invalid </ArchCheckbox>
        </section>
      </main>
    </Variant>

    <Variant title="States">
      <main class="checkbox-story checkbox-story--stack">
        <ArchCheckbox>Default</ArchCheckbox>
        <ArchCheckbox model-value>Checked</ArchCheckbox>
        <ArchCheckbox indeterminate>Indeterminate</ArchCheckbox>
        <ArchCheckbox disabled>Disabled</ArchCheckbox>
        <ArchCheckbox invalid>Invalid</ArchCheckbox>
      </main>
    </Variant>
  </Story>
</template>

<style scoped>
.checkbox-story {
  display: grid;
  gap: var(--arch-space-5);
  max-width: 42rem;
  padding: var(--arch-space-6);
  border: 1px solid var(--arch-color-border);
  border-radius: var(--arch-radius-lg);
  background: var(--arch-color-bg-elevated);
  color: var(--arch-color-fg);
}

.checkbox-story--stack {
  gap: var(--arch-space-3);
  max-width: 28rem;
}

.checkbox-story__controls {
  display: flex;
  flex-wrap: wrap;
  gap: var(--arch-space-4);
  align-items: center;
}

.checkbox-story__controls .arch-checkbox {
  color: var(--arch-color-fg-muted);
  font-size: 0.875rem;
}
</style>
