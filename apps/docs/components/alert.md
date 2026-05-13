# Alert

Info, success, warning, or danger message.

## Usage

```vue
<script setup>
import { ArchAlert } from "@archora/ui";
</script>

<template>
  <ArchAlert variant="warning" title="Token drift"
    >Theme tokens changed after the last release.</ArchAlert
  >
</template>
```

<ComponentSandbox name="alert" />

## Props

| Prop    | Type                                         | Default | Description                                                       |
| :------ | :------------------------------------------- | :------ | :---------------------------------------------------------------- |
| variant | "info" \| "success" \| "warning" \| "danger" | "info"  | Visual variant.                                                   |
| title   | string                                       | -       | Title.                                                            |
| role    | "alert" \| "status"                          | -       | ARIA role; defaults to `alert` for danger and `status` otherwise. |

## Slots

| Slot    | Props | Description   |
| :------ | :---- | :------------ |
| default | -     | Main content. |
| title   | -     | Custom title. |
