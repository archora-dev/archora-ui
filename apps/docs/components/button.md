# Button

Primary action button with variants, sizes, loading state, and width control.

## Usage

```vue
<script setup>
import { ArchButton } from "@archora/ui";
</script>

<template>
  <ArchButton variant="primary">Save</ArchButton>
  <ArchButton variant="secondary" shape="rounded">Preview</ArchButton>
  <ArchButton variant="danger" loading>Deleting</ArchButton>
</template>
```

<ComponentSandbox name="button" />

## Props

| Prop     | Type                                                                      | Default   | Description                            |
| :------- | :------------------------------------------------------------------------ | :-------- | :------------------------------------- |
| variant  | "primary" \| "secondary" \| "ghost" \| "danger" \| "success" \| "warning" | "primary" | Visual variant.                        |
| size     | "sm" \| "md" \| "lg"                                                      | "md"      | Size.                                  |
| shape    | "pill" \| "rounded" \| "square"                                           | "pill"    | Corner shape.                          |
| justify  | "center" \| "start" \| "between"                                          | "center"  | Content alignment.                     |
| type     | "button" \| "submit" \| "reset"                                           | "button"  | HTML type or field type.               |
| disabled | boolean                                                                   | false     | Disables the component.                |
| loading  | boolean                                                                   | false     | Shows the loading state.               |
| block    | boolean                                                                   | false     | Stretches the component to full width. |

## Events

| Event | Payload           | Description      |
| :---- | :---------------- | :--------------- |
| click | event: MouseEvent | Component click. |

## Slots

| Slot    | Props | Description     |
| :------ | :---- | :-------------- |
| default | -     | Button content. |
