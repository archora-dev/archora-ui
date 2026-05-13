# Drawer

Slide-out panel with focus trap, overlay, and header/body/footer slots.

## Usage

```vue
<script setup>
import { ref } from "vue";
import { ArchDrawer, ArchButton } from "@archora/ui";

const open = ref(false);
</script>

<template>
  <ArchButton @click="open = true">Open drawer</ArchButton>
  <ArchDrawer v-model:open="open" title="Inspector" side="right">Details</ArchDrawer>
</template>
```

<ComponentSandbox name="drawer" />

## Props

| Prop           | Type                                   | Default | Description              |
| :------------- | :------------------------------------- | :------ | :----------------------- |
| open           | boolean                                | false   | Open state.              |
| side           | "left" \| "right" \| "top" \| "bottom" | "right" | Placement side.          |
| size           | "sm" \| "md" \| "lg" \| "full"         | "md"    | Size.                    |
| title          | string                                 | -       | Title.                   |
| description    | string                                 | -       | Description.             |
| closeOnEscape  | boolean                                | true    | Close on Escape.         |
| closeOnOverlay | boolean                                | true    | Close on overlay click.  |
| showClose      | boolean                                | true    | Shows the close button.  |
| modal          | boolean                                | true    | Enables modal semantics. |
| stickyFooter   | boolean                                | false   | Makes the footer sticky. |
| resizable      | boolean                                | false   | Enables resize styles.   |

## Events

| Event       | Payload       | Description      |
| :---------- | :------------ | :--------------- |
| update:open | open: boolean | `open` change.   |
| openChange  | open: boolean | Component event. |

## Slots

| Slot        | Props                 | Description         |
| :---------- | :-------------------- | :------------------ |
| title       | -                     | Custom title.       |
| description | -                     | Custom description. |
| default     | { close: () => void } | Panel body.         |
| footer      | { close: () => void } | Footer area.        |
