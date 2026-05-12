# Tabs

`ArchTabs` switches between related panels with keyboard-accessible tab semantics.

```vue
<script setup lang="ts">
import { ref } from "vue";
import { ArchTabs, type ArchTabsItem } from "@archora/ui";
import "@archora/ui/styles.css";

const active = ref("overview");
const items: ArchTabsItem[] = [
  { value: "overview", label: "Overview" },
  { value: "activity", label: "Activity" }
];
</script>

<template>
  <ArchTabs v-model="active" :items="items">
    <template #overview> Overview content </template>
    <template #activity> Activity content </template>
  </ArchTabs>
</template>
```

Arrow keys, Home, and End move between enabled tabs.
