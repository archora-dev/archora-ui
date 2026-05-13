# Alert Dialog

Modal confirmation for destructive or guarded actions.

## Usage

```vue
<script setup>
import { ref } from "vue";
import { ArchAlertDialog, ArchButton } from "@archora/ui";

const open = ref(false);
</script>

<template>
  <ArchButton variant="danger" @click="open = true">Delete</ArchButton>
  <ArchAlertDialog
    v-model:open="open"
    title="Delete project"
    description="This action cannot be undone."
    confirm-label="Delete"
    variant="danger"
    @confirm="removeProject"
  />
</template>
```

<ComponentSandbox name="alert-dialog" />

## Props

| Prop          | Type                  | Default   | Description                  |
| :------------ | :-------------------- | :-------- | :--------------------------- |
| open          | boolean               | false     | Open state.                  |
| title         | string                | -         | Title.                       |
| description   | string                | -         | Description.                 |
| confirmLabel  | string                | "Confirm" | Confirm button text.         |
| cancelLabel   | string                | "Cancel"  | Cancel button text.          |
| variant       | "default" \| "danger" | "default" | Visual variant.              |
| loading       | boolean               | false     | Shows the loading state.     |
| closeOnCancel | boolean               | true      | Closes the dialog on cancel. |

## Events

| Event       | Payload        | Description      |
| :---------- | :------------- | :--------------- |
| update:open | value: boolean | `open` change.   |
| confirm     | -              | Component event. |
| cancel      | -              | Component event. |

## Slots

| Slot    | Props | Description                |
| :------ | :---- | :------------------------- |
| default | -     | Additional header content. |
