# Combobox

`ArchCombobox` combines a searchable input with a selectable list of options.

```vue
<script setup lang="ts">
import { ref } from "vue";
import { ArchCombobox, type ArchComboboxOption } from "@archora/ui";
import "@archora/ui/styles.css";

const framework = ref("vue");
const options: ArchComboboxOption[] = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "svelte", label: "Svelte" }
];
</script>

<template>
  <ArchCombobox v-model="framework" :options="options" placeholder="Search framework" />
</template>
```
