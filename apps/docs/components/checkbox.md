# Checkbox

`ArchCheckbox` toggles a boolean value with native checkbox semantics and an Archora-styled visual control.

```vue
<script setup lang="ts">
import { ref } from "vue";
import { ArchCheckbox } from "@archora/ui";
import "@archora/ui/styles.css";

const accepted = ref(false);
</script>

<template>
  <ArchCheckbox v-model="accepted"> Accept terms </ArchCheckbox>
</template>
```

## States

Use `disabled` for unavailable options, `invalid` for validation state, and `indeterminate` for mixed parent selection.

```vue
<ArchCheckbox v-model="allSelected" indeterminate>
  Select all
</ArchCheckbox>
```

## Accessibility

The component keeps a native checkbox input for accessibility while presenting a custom visual control. The `indeterminate` state sets `aria-checked="mixed"`.
