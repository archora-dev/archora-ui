# Button

`ArchButton` triggers an action, submits a form, or opens a workflow.

```vue
<script setup lang="ts">
import { ArchButton } from "@archora/ui";
import "@archora/ui/styles.css";
</script>

<template>
  <ArchButton variant="primary" size="md"> Save changes </ArchButton>
</template>
```

## Variants

- `primary`
- `secondary`
- `ghost`
- `danger`
- `success`
- `warning`

## Sizes

- `sm`
- `md`
- `lg`

## States

Use `disabled` when the action is unavailable. Use `loading` when the action is already running; the component sets `aria-busy` and suppresses click emits while loading.

```vue
<ArchButton loading>
  Saving
</ArchButton>
```

## Accessibility

`ArchButton` renders a native `button`, defaults to `type="button"`, preserves native disabled behavior, and exposes loading state through `aria-busy`.
