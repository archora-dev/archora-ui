<script setup lang="ts">
import { ref } from "vue";
import { ArchCombobox, type ArchComboboxOption } from "@archora/ui";

const selected = ref("vue");
const options: ArchComboboxOption[] = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "svelte", label: "Svelte" },
  { value: "solid", label: "Solid" },
  { value: "legacy", label: "Legacy", disabled: true }
];
</script>

<template>
  <Story title="Components/Combobox">
    <Variant title="Overview">
      <main class="combobox-story">
        <ArchCombobox v-model="selected" :options="options" placeholder="Search framework" />
      </main>
    </Variant>
  </Story>
</template>

<style scoped>
.combobox-story {
  min-height: 16rem;
  max-width: 42rem;
  padding: var(--arch-space-6);
  border: 1px solid var(--arch-color-border);
  border-radius: var(--arch-radius-lg);
  background: var(--arch-color-bg-elevated);
}
</style>
