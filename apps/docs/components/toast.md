# Toast

Toast system built from `useToast`, `ArchToastViewport`, and individual `ArchToast` items.

## Usage

```vue
<script setup>
import { ArchToastViewport, useToast, ArchButton } from "@archora/ui";

const toast = useToast();
</script>

<template>
  <ArchButton @click="toast.success({ title: 'Saved' })">Show toast</ArchButton>
  <ArchToastViewport />
</template>
```

<ComponentSandbox name="toast" />

## Props

| Prop                       | Type                                                                                                          | Default       | Description              |
| :------------------------- | :------------------------------------------------------------------------------------------------------------ | :------------ | :----------------------- |
| ArchToast.toast            | `{ id: string; title: string; description?: string; variant?: "info" \| "success" \| "warning" \| "danger" }` | -             | Toast message object.    |
| ArchToastViewport.position | `"top-right" \| "top-left" \| "bottom-right" \| "bottom-left"`                                                | `"top-right"` | Fixed viewport position. |
