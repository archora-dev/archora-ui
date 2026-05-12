# Dialog

`ArchDialog` presents modal content above the page.

```vue
<script setup lang="ts">
import {
  ArchButton,
  ArchDialog,
  ArchDialogContent,
  ArchDialogDescription,
  ArchDialogFooter,
  ArchDialogHeader,
  ArchDialogTitle,
  ArchDialogTrigger
} from "@archora/ui";
import "@archora/ui/styles.css";
</script>

<template>
  <ArchDialog>
    <ArchDialogTrigger>Open dialog</ArchDialogTrigger>
    <ArchDialogContent>
      <ArchDialogHeader>
        <ArchDialogTitle>Confirm deploy</ArchDialogTitle>
        <ArchDialogDescription> Deploy this release to production? </ArchDialogDescription>
      </ArchDialogHeader>
      <ArchDialogFooter>
        <ArchButton>Confirm</ArchButton>
      </ArchDialogFooter>
    </ArchDialogContent>
  </ArchDialog>
</template>
```

The dialog closes on Escape and outside click, locks body scroll while open, and returns focus to the trigger on close.
