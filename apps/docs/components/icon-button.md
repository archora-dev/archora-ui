# Icon Button

Accessible icon-only button with a required text label.

## Usage

```vue
<script setup>
import { Settings } from "lucide-vue-next";
import { ArchIconButton } from "@archora/ui";
</script>

<template>
  <ArchIconButton :icon="Settings" label="Settings" @click="openSettings" />
</template>
```

<ComponentSandbox name="icon-button" />

## Props

| Prop     | Type                                            | Default  | Description               |
| :------- | :---------------------------------------------- | :------- | :------------------------ |
| icon     | Component                                       | -        | Vue icon component.       |
| label    | string                                          | -        | Accessible label or text. |
| size     | "sm" \| "md" \| "lg"                            | "md"     | Size.                     |
| variant  | "ghost" \| "secondary" \| "primary" \| "danger" | "ghost"  | Visual variant.           |
| disabled | boolean                                         | false    | Disables the component.   |
| type     | "button" \| "submit" \| "reset"                 | "button" | HTML type or field type.  |

## Events

| Event | Payload           | Description      |
| :---- | :---------------- | :--------------- |
| click | event: MouseEvent | Component click. |
