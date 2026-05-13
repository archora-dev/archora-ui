# Icon

Wrapper for lucide/Vue icons with aria-label support for meaningful icons.

## Usage

```vue
<script setup>
import { Search } from "lucide-vue-next";
import { ArchIcon } from "@archora/ui";
</script>

<template>
  <ArchIcon :icon="Search" label="Search" />
</template>
```

<ComponentSandbox name="icon" />

## Props

| Prop        | Type      | Default | Description               |
| :---------- | :-------- | :------ | :------------------------ |
| icon        | Component | -       | Vue icon component.       |
| size        | number    | 16      | Size.                     |
| strokeWidth | number    | 1.8     | Stroke width.             |
| label       | string    | -       | Accessible label or text. |
