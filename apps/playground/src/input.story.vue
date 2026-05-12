<script setup lang="ts">
import { reactive } from "vue";
import { ArchInput, type ArchInputSize, type ArchInputType } from "@archora/ui";

const state = reactive<{
  value: string;
  type: ArchInputType;
  size: ArchInputSize;
  disabled: boolean;
  readonly: boolean;
  required: boolean;
  invalid: boolean;
}>({
  value: "Archora",
  type: "text",
  size: "md",
  disabled: false,
  readonly: false,
  required: false,
  invalid: false
});

const types: ArchInputType[] = ["text", "email", "password", "search", "tel", "url", "number"];
const sizes: ArchInputSize[] = ["sm", "md", "lg"];
</script>

<template>
  <Story title="Components/Input">
    <Variant title="Interactive">
      <main class="input-story">
        <label class="input-story__field" for="arch-input-story">
          Project name
          <ArchInput
            id="arch-input-story"
            v-model="state.value"
            :type="state.type"
            :size="state.size"
            :disabled="state.disabled"
            :readonly="state.readonly"
            :required="state.required"
            :invalid="state.invalid"
            placeholder="Project name"
            aria-describedby="arch-input-story-note"
          />
        </label>
        <p id="arch-input-story-note" class="input-story__note">
          Current value: {{ state.value || "Empty" }}
        </p>

        <section class="input-story__controls">
          <label>
            Type
            <select v-model="state.type">
              <option v-for="type in types" :key="type" :value="type">
                {{ type }}
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
            <input v-model="state.readonly" type="checkbox" />
            Readonly
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
      <main class="input-story input-story--stack">
        <ArchInput placeholder="Default" />
        <ArchInput model-value="Readonly" readonly />
        <ArchInput model-value="Disabled" disabled />
        <ArchInput model-value="Needs attention" invalid />
      </main>
    </Variant>
  </Story>
</template>

<style scoped>
.input-story {
  display: grid;
  gap: var(--arch-space-5);
  max-width: 42rem;
  padding: var(--arch-space-6);
  border: 1px solid var(--arch-color-border);
  border-radius: var(--arch-radius-lg);
  background: var(--arch-color-bg-elevated);
  color: var(--arch-color-fg);
}

.input-story--stack {
  max-width: 28rem;
}

.input-story__field {
  display: grid;
  gap: var(--arch-space-2);
  color: var(--arch-color-fg);
  font-weight: 600;
}

.input-story__note {
  margin: 0;
  color: var(--arch-color-fg-muted);
  font-size: 0.875rem;
}

.input-story__controls {
  display: flex;
  flex-wrap: wrap;
  gap: var(--arch-space-4);
  align-items: end;
}

.input-story__controls label {
  display: grid;
  gap: var(--arch-space-2);
  color: var(--arch-color-fg-muted);
  font-size: 0.875rem;
}

.input-story__controls select {
  min-width: 9rem;
  border: 1px solid var(--arch-color-border);
  border-radius: var(--arch-radius-md);
  background: var(--arch-color-bg-subtle);
  color: var(--arch-color-fg);
  padding: var(--arch-space-2) var(--arch-space-3);
}
</style>
