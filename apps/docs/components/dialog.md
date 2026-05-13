# Dialog

Composable modal built from `ArchDialog`, trigger, content, header/title/description/footer.

## Usage

```vue
<script setup>
import {
  ArchDialog,
  ArchDialogTrigger,
  ArchDialogContent,
  ArchDialogHeader,
  ArchDialogTitle
} from "@archora/ui";
</script>

<template>
  <ArchDialog>
    <ArchDialogTrigger>Open</ArchDialogTrigger>
    <ArchDialogContent>
      <ArchDialogHeader><ArchDialogTitle>Settings</ArchDialogTitle></ArchDialogHeader>
      Dialog content
    </ArchDialogContent>
  </ArchDialog>
</template>
```

<ComponentSandbox name="dialog" />

## Props

| Prop                   | Type    | Default | Description                          |
| :--------------------- | :------ | :------ | :----------------------------------- |
| ArchDialog.open        | boolean | -       | Controlled open state.               |
| ArchDialog.defaultOpen | boolean | false   | Initial state for uncontrolled mode. |

## Events

| Event       | Payload       | Description   |
| :---------- | :------------ | :------------ |
| update:open | open: boolean | State change. |
| openChange  | open: boolean | State change. |

## Slots

| Slot                      | Props                 | Description                |
| :------------------------ | :-------------------- | :------------------------- |
| ArchDialog.default        | -                     | Trigger/content structure. |
| ArchDialogContent.default | { close: () => void } | Dialog content.            |
