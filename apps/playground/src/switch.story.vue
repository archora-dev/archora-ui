<script setup lang="ts">
import { reactive } from "vue";
import { ArchSwitch } from "@archora/ui";

const state = reactive({
  enabled: false,
  disabled: false,
  required: false,
  invalid: false
});
</script>

<template>
  <Story title="Components/Switch">
    <Variant title="Interactive">
      <main class="switch-story">
        <ArchSwitch
          v-model="state.enabled"
          :disabled="state.disabled"
          :required="state.required"
          :invalid="state.invalid"
        >
          Enable deployment sync
        </ArchSwitch>

        <section class="switch-story__controls">
          <label>
            <input v-model="state.enabled" type="checkbox" />
            Enabled
          </label>
          <label>
            <input v-model="state.disabled" type="checkbox" />
            Disabled
          </label>
          <label>
            <input v-model="state.required" type="checkbox" />
            Required
          </label>
          <label>
            <input v-model="state.invalid" type="checkbox" />
            Invalid
          </label>
        </section>
      </main>
    </Variant>

    <Variant title="States">
      <main class="switch-story switch-story--stack">
        <ArchSwitch>Default</ArchSwitch>
        <ArchSwitch model-value>Enabled</ArchSwitch>
        <ArchSwitch disabled>Disabled</ArchSwitch>
        <ArchSwitch invalid>Invalid</ArchSwitch>
      </main>
    </Variant>
  </Story>
</template>

<style scoped>
.switch-story {
  display: grid;
  gap: var(--arch-space-5);
  max-width: 42rem;
  padding: var(--arch-space-6);
  border: 1px solid var(--arch-color-border);
  border-radius: var(--arch-radius-lg);
  background: var(--arch-color-bg-elevated);
  color: var(--arch-color-fg);
}

.switch-story--stack {
  gap: var(--arch-space-3);
  max-width: 28rem;
}

.switch-story__controls {
  display: flex;
  flex-wrap: wrap;
  gap: var(--arch-space-4);
  align-items: center;
}

.switch-story__controls label {
  display: inline-flex;
  gap: var(--arch-space-2);
  align-items: center;
  color: var(--arch-color-fg-muted);
  font-size: 0.875rem;
}
</style>
