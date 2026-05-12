<script setup lang="ts">
import { reactive } from "vue";
import { ArchButton, type ArchButtonSize, type ArchButtonVariant } from "@archora/ui";

const state = reactive<{
  variant: ArchButtonVariant;
  size: ArchButtonSize;
  disabled: boolean;
  loading: boolean;
  block: boolean;
}>({
  variant: "primary",
  size: "md",
  disabled: false,
  loading: false,
  block: false
});

const variants: ArchButtonVariant[] = [
  "primary",
  "secondary",
  "ghost",
  "danger",
  "success",
  "warning"
];
const sizes: ArchButtonSize[] = ["sm", "md", "lg"];
</script>

<template>
  <Story title="Components/Button">
    <Variant title="Interactive">
      <main class="button-story">
        <section class="button-story__preview">
          <ArchButton
            :variant="state.variant"
            :size="state.size"
            :disabled="state.disabled"
            :loading="state.loading"
            :block="state.block"
          >
            Save changes
          </ArchButton>
        </section>

        <section class="button-story__controls">
          <label>
            Variant
            <select v-model="state.variant">
              <option v-for="variant in variants" :key="variant" :value="variant">
                {{ variant }}
              </option>
            </select>
          </label>

          <label>
            Size
            <select v-model="state.size">
              <option v-for="size in sizes" :key="size" :value="size">
                {{ size }}
              </option>
            </select>
          </label>

          <label>
            <input v-model="state.disabled" type="checkbox" />
            Disabled
          </label>

          <label>
            <input v-model="state.loading" type="checkbox" />
            Loading
          </label>

          <label>
            <input v-model="state.block" type="checkbox" />
            Block
          </label>
        </section>
      </main>
    </Variant>

    <Variant title="Variants">
      <main class="button-story button-story--stack">
        <ArchButton v-for="variant in variants" :key="variant" :variant="variant">
          {{ variant }}
        </ArchButton>
      </main>
    </Variant>
  </Story>
</template>

<style scoped>
.button-story {
  display: grid;
  gap: var(--arch-space-5);
  max-width: 42rem;
  padding: var(--arch-space-6);
  border: 1px solid var(--arch-color-border);
  border-radius: var(--arch-radius-lg);
  background: var(--arch-color-bg-elevated);
  color: var(--arch-color-fg);
}

.button-story--stack {
  grid-template-columns: repeat(auto-fit, minmax(8rem, max-content));
  align-items: center;
}

.button-story__preview {
  display: flex;
  align-items: center;
  min-height: 6rem;
}

.button-story__controls {
  display: flex;
  flex-wrap: wrap;
  gap: var(--arch-space-4);
  align-items: end;
}

.button-story__controls label {
  display: grid;
  gap: var(--arch-space-2);
  color: var(--arch-color-fg-muted);
  font-size: 0.875rem;
}

.button-story__controls select {
  min-width: 9rem;
  border: 1px solid var(--arch-color-border);
  border-radius: var(--arch-radius-md);
  background: var(--arch-color-bg-subtle);
  color: var(--arch-color-fg);
  padding: var(--arch-space-2) var(--arch-space-3);
}
</style>
