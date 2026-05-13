# Breadcrumbs

Navigation trail with `aria-current` for the current page.

## Usage

```vue
<script setup>
import { ArchBreadcrumbs } from "@archora/ui";

const items = [{ label: "Projects", href: "/projects" }, { label: "Console" }];
</script>

<template>
  <ArchBreadcrumbs :items="items" />
</template>
```

<ComponentSandbox name="breadcrumbs" />

## Props

| Prop  | Type                                          | Default      | Description               |
| :---- | :-------------------------------------------- | :----------- | :------------------------ |
| items | `readonly { label: string; href?: string }[]` | -            | Breadcrumb items.         |
| label | string                                        | "Breadcrumb" | Accessible label or text. |
