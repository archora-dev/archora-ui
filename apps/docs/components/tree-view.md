# Tree View

Hierarchical tree with local child expansion.

## Usage

```vue
<script setup>
import { ArchTreeView } from "@archora/ui";

const items = [
  { id: "src", label: "src", expanded: true, children: [{ id: "app", label: "App.vue" }] }
];
</script>

<template>
  <ArchTreeView :items="items" />
</template>
```

<ComponentSandbox name="tree-view" />

## Props

| Prop  | Type                                                                                                      | Default | Description      |
| :---- | :-------------------------------------------------------------------------------------------------------- | :------ | :--------------- |
| items | `{ id: string; label: string; children?: TreeViewItem[]; icon?: string \| object; expanded?: boolean }[]` | -       | Item collection. |
