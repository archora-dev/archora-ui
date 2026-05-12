<script setup lang="ts">
import { ref } from "vue";
import { ArchSelect, type ArchSelectOption } from "@archora/ui";

const selected = ref("dev");
const options: ArchSelectOption[] = [
  { value: "dev", label: "Development" },
  { value: "staging", label: "Staging" },
  { value: "prod", label: "Production" },
  { value: "legacy", label: "Legacy", disabled: true }
];
</script>

<template>
  <Story title="Components/Select">
    <Variant title="Overview">
      <main class="select-story">
        <ArchSelect v-model="selected" :options="options" />
      </main>
    </Variant>
  </Story>
</template>

<style scoped>
.select-story {
  min-height: 16rem;
  max-width: 42rem;
  padding: var(--arch-space-6);
  border: 1px solid var(--arch-color-border);
  border-radius: var(--arch-radius-lg);
  background: var(--arch-color-bg-elevated);
}
</style>
