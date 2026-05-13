# Card

Container for grouped content with header, body, and footer slots.

## Usage

```vue
<script setup>
import { ArchCard } from "@archora/ui";
</script>

<template>
  <ArchCard variant="outlined" surface="glass">
    <template #header>Project health</template>
    Current score: 92
    <template #footer>Updated today</template>
  </ArchCard>
</template>
```

<ComponentSandbox name="card" />

## Props

| Prop        | Type                                       | Default    | Description        |
| :---------- | :----------------------------------------- | :--------- | :----------------- |
| as          | "article" \| "aside" \| "div" \| "section" | "article"  | Root HTML element. |
| variant     | "elevated" \| "outlined" \| "subtle"       | "elevated" | Visual variant.    |
| padding     | "none" \| "sm" \| "md" \| "lg"             | "md"       | Inner padding.     |
| surface     | "default" \| "glass" \| "solid"            | "default"  | Surface style.     |
| interactive | boolean                                    | false      | Interactive state. |

## Slots

| Slot    | Props | Description   |
| :------ | :---- | :------------ |
| header  | -     | Header area.  |
| default | -     | Main content. |
| footer  | -     | Footer area.  |
