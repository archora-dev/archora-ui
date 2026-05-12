<script setup lang="ts">
import { ref } from "vue";
import { ArchCommand, type ArchCommandItem } from "@archora/ui";

const selected = ref("");
const commands: ArchCommandItem[] = [
  { value: "open", label: "Open file", description: "Jump to a file" },
  { value: "settings", label: "Open settings", description: "Edit preferences" },
  { value: "theme", label: "Toggle theme", description: "Switch dark and light mode" },
  { value: "archive", label: "Archive project", disabled: true }
];
</script>

<template>
  <Story title="Components/Command">
    <Variant title="Overview">
      <main class="command-story">
        <ArchCommand v-model="selected" :items="commands" />
      </main>
    </Variant>
  </Story>
</template>

<style scoped>
.command-story {
  min-height: 18rem;
  max-width: 42rem;
  padding: var(--arch-space-6);
  border: 1px solid var(--arch-color-border);
  border-radius: var(--arch-radius-lg);
  background: var(--arch-color-bg-elevated);
}
</style>
