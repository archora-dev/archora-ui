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

## Sizes And Outside Clicks

Use `size` when the dialog contains dense forms, patch previews or confirmation details. Disable outside-click close for destructive or multi-step flows.

```vue
<ArchDialog v-model:open="open">
  <ArchDialogContent size="lg" :close-on-outside="false">
    <ArchDialogHeader>
      <ArchDialogTitle>Reset analysis settings</ArchDialogTitle>
      <ArchDialogDescription>
        This action changes analyzer configuration for future scans.
      </ArchDialogDescription>
    </ArchDialogHeader>
    <ArchDialogFooter>
      <ArchButton variant="ghost">Cancel</ArchButton>
      <ArchButton variant="danger">Reset</ArchButton>
    </ArchDialogFooter>
  </ArchDialogContent>
</ArchDialog>
```

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
