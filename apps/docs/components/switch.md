# Switch

`ArchSwitch` toggles an on/off setting with `role="switch"` semantics.

```vue
<script setup lang="ts">
import { ref } from "vue";
import { ArchSwitch } from "@archora/ui";
import "@archora/ui/styles.css";

const enabled = ref(false);
</script>

<template>
  <ArchSwitch v-model="enabled"> Enable sync </ArchSwitch>
</template>
```

## States

Use `disabled` for unavailable settings and `invalid` when the setting fails validation.

## Accessibility

The switch is keyboard operable with Space and Enter and exposes state through `aria-checked`.
