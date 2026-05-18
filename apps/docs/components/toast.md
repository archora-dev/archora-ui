# Toast

Toast system built from `useToast`, `ArchToastViewport`, and individual `ArchToast` items.

## Usage

```vue
<script setup>
import { ArchToastViewport, useToast, ArchButton } from "@archora/ui";

const toast = useToast();
</script>

<template>
  <ArchButton @click="toast.success('Saved', 'Project settings were updated.')">
    Show toast
  </ArchButton>
  <ArchToastViewport />
</template>
```

<ComponentSandbox name="toast" />

## Actions

Use actions for reversible work such as restoring a session or retrying an export. Actions dismiss the toast after click unless `dismiss: false` is set.

```ts
toast.push({
  title: "Restore previous workspace?",
  description: "A saved view is available for this project.",
  variant: "info",
  duration: 12000,
  actions: [
    { label: "Restore", onClick: restoreWorkspace },
    { label: "Dismiss", onClick: dismissWorkspace }
  ]
});
```

## API

`useToast()` returns:

| Method                                | Description                                      |
| :------------------------------------ | :----------------------------------------------- |
| `show(input)` / `push(input)`         | Adds a toast and returns its id.                 |
| `info(title, description?)`           | Adds an info toast.                              |
| `success(title, description?)`        | Adds a success toast.                            |
| `warning(title, description?)`        | Adds a warning toast.                            |
| `danger(title, description?)`         | Adds a danger toast.                             |
| `dismiss(id)`                         | Removes one toast.                               |
| `clear()`                             | Removes all toasts.                              |

## Props

| Prop                       | Type                                                                                                          | Default       | Description              |
| :------------------------- | :------------------------------------------------------------------------------------------------------------ | :------------ | :----------------------- |
| ArchToast.toast            | `ArchToastItem`                                                                                               | -             | Toast message object.    |
| ArchToastViewport.position | `"top-right" \| "top-left" \| "bottom-right" \| "bottom-left"`                                                | `"top-right"` | Fixed viewport position. |
