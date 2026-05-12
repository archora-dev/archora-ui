# Card

`ArchCard` frames related content with consistent surface, border, shadow, and padding.

```vue
<script setup lang="ts">
import { ArchCard } from "@archora/ui";
import "@archora/ui/styles.css";
</script>

<template>
  <ArchCard>
    <template #header> Project health </template>

    Build, tests, and deployment are healthy.
  </ArchCard>
</template>
```

## Variants

- `elevated`
- `outlined`
- `subtle`

## Padding

- `none`
- `sm`
- `md`
- `lg`
