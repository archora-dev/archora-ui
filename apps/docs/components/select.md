# Select

`ArchSelect` lets users choose one option from a list.

```vue
<script setup lang="ts">
import { ref } from "vue";
import { ArchSelect, type ArchSelectOption } from "@archora/ui";
import "@archora/ui/styles.css";

const environment = ref("dev");
const options: ArchSelectOption[] = [
  { value: "dev", label: "Development" },
  { value: "prod", label: "Production" }
];
</script>

<template>
  <ArchSelect v-model="environment" :options="options" />
</template>
```
