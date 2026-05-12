<script setup lang="ts">
import { reactive } from "vue";
import { ArchCard, type ArchCardPadding, type ArchCardVariant } from "@archora/ui";

const state = reactive<{
  variant: ArchCardVariant;
  padding: ArchCardPadding;
}>({
  variant: "elevated",
  padding: "md"
});

const variants: ArchCardVariant[] = ["elevated", "outlined", "subtle"];
const paddings: ArchCardPadding[] = ["none", "sm", "md", "lg"];
</script>

<template>
  <Story title="Components/Card">
    <Variant title="Interactive">
      <main class="card-story">
        <ArchCard :variant="state.variant" :padding="state.padding">
          <template #header> Project health </template>
          Build, tests, and deployment are healthy.
          <template #footer> Updated just now </template>
        </ArchCard>

        <section class="card-story__controls">
          <label>
            Variant
            <select v-model="state.variant">
              <option v-for="variant in variants" :key="variant" :value="variant">
                {{ variant }}
              </option>
            </select>
          </label>

          <label>
            Padding
            <select v-model="state.padding">
              <option v-for="padding in paddings" :key="padding" :value="padding">
                {{ padding }}
              </option>
            </select>
          </label>
        </section>
      </main>
    </Variant>

    <Variant title="Variants">
      <main class="card-story card-story--grid">
        <ArchCard v-for="variant in variants" :key="variant" :variant="variant">
          <template #header>
            {{ variant }}
          </template>
          A compact card surface.
        </ArchCard>
      </main>
    </Variant>
  </Story>
</template>

<style scoped>
.card-story {
  display: grid;
  gap: var(--arch-space-5);
  max-width: 42rem;
  padding: var(--arch-space-6);
  border: 1px solid var(--arch-color-border);
  border-radius: var(--arch-radius-lg);
  background: var(--arch-color-bg);
  color: var(--arch-color-fg);
}

.card-story--grid {
  grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
}

.card-story__controls {
  display: flex;
  flex-wrap: wrap;
  gap: var(--arch-space-4);
  align-items: end;
}

.card-story__controls label {
  display: grid;
  gap: var(--arch-space-2);
  color: var(--arch-color-fg-muted);
  font-size: 0.875rem;
}

.card-story__controls select {
  min-width: 9rem;
  border: 1px solid var(--arch-color-border);
  border-radius: var(--arch-radius-md);
  background: var(--arch-color-bg-subtle);
  color: var(--arch-color-fg);
  padding: var(--arch-space-2) var(--arch-space-3);
}
</style>
