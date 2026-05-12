# Date Picker

`ArchDatePicker` lets users select an ISO date from a calendar popover.

```vue
<script setup lang="ts">
import { ref } from "vue";
import { ArchDatePicker } from "@archora/ui";
import "@archora/ui/styles.css";

const releaseDate = ref("2026-05-10");
</script>

<template>
  <ArchDatePicker v-model="releaseDate" min="2026-05-01" max="2026-05-31" />
</template>
```
