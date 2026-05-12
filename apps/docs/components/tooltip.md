# Tooltip

`ArchTooltip` adds short contextual help to a trigger.

```vue
<script setup lang="ts">
import { ArchButton, ArchTooltip } from "@archora/ui";
import "@archora/ui/styles.css";
</script>

<template>
  <ArchTooltip content="Deploy project">
    <ArchButton>Deploy</ArchButton>
  </ArchTooltip>
</template>
```

Tooltips open on hover and focus. Keep content short and non-critical.
