<script setup lang="ts">
import { ref } from "vue";
import { ArchFormField, ArchInput } from "@archora/ui";

const project = ref("");
</script>

<template>
  <Story title="Components/FormField">
    <Variant title="Overview">
      <main class="form-field-story">
        <ArchFormField
          v-slot="{ id, describedby, invalid, required }"
          label="Project name"
          description="Used in dashboards and navigation."
          :error="project ? undefined : 'Project name is required'"
          required
        >
          <ArchInput
            :id="id"
            v-model="project"
            :aria-describedby="describedby"
            :invalid="invalid"
            :required="required"
            placeholder="archora-web"
          />
        </ArchFormField>
      </main>
    </Variant>
  </Story>
</template>

<style scoped>
.form-field-story {
  max-width: 42rem;
  padding: var(--arch-space-6);
  border: 1px solid var(--arch-color-border);
  border-radius: var(--arch-radius-lg);
  background: var(--arch-color-bg-elevated);
}
</style>
