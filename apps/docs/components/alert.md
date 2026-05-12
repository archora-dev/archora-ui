# Alert

`ArchAlert` presents status messages and validation summaries.

```vue
<script setup lang="ts">
import { ArchAlert } from "@archora/ui";
import "@archora/ui/styles.css";
</script>

<template>
  <ArchAlert variant="danger" title="Build failed"> Check the latest pipeline run. </ArchAlert>
</template>
```

Danger alerts use `role="alert"` by default. Other variants use `role="status"`.
