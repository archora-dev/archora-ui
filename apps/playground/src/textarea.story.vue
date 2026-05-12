<script setup lang="ts">
import { reactive } from "vue";
import { ArchTextarea, type ArchTextareaResize, type ArchTextareaSize } from "@archora/ui";

const state = reactive<{
  value: string;
  size: ArchTextareaSize;
  resize: ArchTextareaResize;
  disabled: boolean;
  readonly: boolean;
  required: boolean;
  invalid: boolean;
}>({
  value: "Use this field for longer product or implementation notes.",
  size: "md",
  resize: "vertical",
  disabled: false,
  readonly: false,
  required: false,
  invalid: false
});

const sizes: ArchTextareaSize[] = ["sm", "md", "lg"];
const resizeModes: ArchTextareaResize[] = ["none", "vertical", "horizontal", "both"];
</script>

<template>
  <Story title="Components/Textarea">
    <Variant title="Interactive">
      <main class="textarea-story">
        <label class="textarea-story__field" for="arch-textarea-story">
          Notes
          <ArchTextarea
            id="arch-textarea-story"
            v-model="state.value"
            :size="state.size"
            :resize="state.resize"
            :disabled="state.disabled"
            :readonly="state.readonly"
            :required="state.required"
            :invalid="state.invalid"
            :rows="5"
            placeholder="Add notes"
            aria-describedby="arch-textarea-story-note"
          />
        </label>
        <p id="arch-textarea-story-note" class="textarea-story__note">
          {{ state.value.length }} characters
        </p>

        <section class="textarea-story__controls">
          <label>
            Size
            <select v-model="state.size">
              <option v-for="size in sizes" :key="size" :value="size">
                {{ size }}
              </option>
            </select>
          </label>

          <label>
            Resize
            <select v-model="state.resize">
              <option v-for="resize in resizeModes" :key="resize" :value="resize">
                {{ resize }}
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
      <main class="textarea-story textarea-story--stack">
        <ArchTextarea placeholder="Default" />
        <ArchTextarea model-value="Readonly" readonly />
        <ArchTextarea model-value="Disabled" disabled />
        <ArchTextarea model-value="Needs attention" invalid />
      </main>
    </Variant>
  </Story>
</template>

<style scoped>
.textarea-story {
  display: grid;
  gap: var(--arch-space-5);
  max-width: 42rem;
  padding: var(--arch-space-6);
  border: 1px solid var(--arch-color-border);
  border-radius: var(--arch-radius-lg);
  background: var(--arch-color-bg-elevated);
  color: var(--arch-color-fg);
}

.textarea-story--stack {
  max-width: 28rem;
}

.textarea-story__field {
  display: grid;
  gap: var(--arch-space-2);
  color: var(--arch-color-fg);
  font-weight: 600;
}

.textarea-story__note {
  margin: 0;
  color: var(--arch-color-fg-muted);
  font-size: 0.875rem;
}

.textarea-story__controls {
  display: flex;
  flex-wrap: wrap;
  gap: var(--arch-space-4);
  align-items: end;
}

.textarea-story__controls label {
  display: grid;
  gap: var(--arch-space-2);
  color: var(--arch-color-fg-muted);
  font-size: 0.875rem;
}

.textarea-story__controls select {
  min-width: 9rem;
  border: 1px solid var(--arch-color-border);
  border-radius: var(--arch-radius-md);
  background: var(--arch-color-bg-subtle);
  color: var(--arch-color-fg);
  padding: var(--arch-space-2) var(--arch-space-3);
}
</style>
