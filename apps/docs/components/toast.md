# Toast

`ArchToast` and `ArchToastViewport` show short-lived status messages.

```vue
<script setup lang="ts">
import { ArchButton, ArchToastViewport, useToast } from "@archora/ui";
import "@archora/ui/styles.css";

const toast = useToast();
</script>

<template>
  <ArchButton @click="toast.show({ title: 'Saved', variant: 'success' })"> Show toast </ArchButton>
  <ArchToastViewport />
</template>
```

Danger toasts use `role="alert"`. Other variants use `role="status"`.
