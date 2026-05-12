# Textarea

`ArchTextarea` captures longer free-form text while keeping native textarea behavior.

```vue
<script setup lang="ts">
import { ref } from "vue";
import { ArchTextarea } from "@archora/ui";
import "@archora/ui/styles.css";

const notes = ref("");
</script>

<template>
  <ArchTextarea v-model="notes" placeholder="Add implementation notes" :rows="5" />
</template>
```

## Sizes

- `sm`
- `md`
- `lg`

## Resize

Supported `resize` values are `none`, `vertical`, `horizontal`, and `both`.

## States

Use `disabled` for unavailable fields, `readonly` for locked values, and `invalid` to expose `aria-invalid="true"`.

## Accessibility

Pair textareas with visible labels in consuming forms. Connect validation messages with `aria-describedby`.
