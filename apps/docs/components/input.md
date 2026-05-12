# Input

`ArchInput` captures short text values with native input semantics and token-driven states.

```vue
<script setup lang="ts">
import { ref } from "vue";
import { ArchInput } from "@archora/ui";
import "@archora/ui/styles.css";

const email = ref("");
</script>

<template>
  <ArchInput v-model="email" type="email" placeholder="you@company.com" />
</template>
```

## Types

Supported `type` values are `text`, `email`, `password`, `search`, `tel`, `url`, and `number`.

## Sizes

- `sm`
- `md`
- `lg`

## States

Use `disabled` for unavailable inputs, `readonly` for locked values, and `invalid` to expose `aria-invalid="true"`.

```vue
<ArchInput v-model="projectName" invalid aria-describedby="project-name-error" />
```

## Accessibility

Prefer a visible `<label>` connected by `for`/`id` in consuming forms. Use `aria-label` or `aria-labelledby` only when a visible label is not available.
