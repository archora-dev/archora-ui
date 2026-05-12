# Command

`ArchCommand` renders a searchable command list for palettes, action panels, and quick navigation.

```vue
<script setup lang="ts">
import { ArchCommand, type ArchCommandItem } from "@archora/ui";
import "@archora/ui/styles.css";

const commands: ArchCommandItem[] = [
  { value: "open", label: "Open file", description: "Jump to a file" },
  { value: "settings", label: "Open settings", description: "Edit preferences" }
];
</script>

<template>
  <ArchCommand :items="commands" @select="(value) => console.log(value)" />
</template>
```
