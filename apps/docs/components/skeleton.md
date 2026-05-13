# Skeleton

Loading placeholder with configurable width, height, and circular shape.

## Usage

```vue
<script setup>
import { ArchSkeleton } from "@archora/ui";
</script>

<template>
  <ArchSkeleton width="100%" :height="16" />
  <ArchSkeleton :width="40" :height="40" circle />
</template>
```

<ComponentSandbox name="skeleton" />

## Props

| Prop   | Type             | Default | Description     |
| :----- | :--------------- | :------ | :-------------- |
| width  | string \| number | -       | Width.          |
| height | string \| number | -       | Height.         |
| circle | boolean          | -       | Circular shape. |
