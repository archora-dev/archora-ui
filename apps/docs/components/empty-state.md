# Empty State

Empty state for missing data or first-run onboarding.

## Usage

```vue
<script setup>
import { ArchEmptyState, ArchButton } from "@archora/ui";
</script>

<template>
  <ArchEmptyState title="No projects" description="Create a project to start." variant="outlined">
    <template #actions><ArchButton>Create project</ArchButton></template>
  </ArchEmptyState>
</template>
```

<ComponentSandbox name="empty-state" />

## Props

| Prop        | Type                              | Default  | Description     |
| :---------- | :-------------------------------- | :------- | :-------------- |
| title       | string                            | -        | Title.          |
| description | string                            | -        | Description.    |
| align       | "start" \| "center"               | "center" | Alignment.      |
| size        | "sm" \| "md" \| "lg"              | "md"     | Size.           |
| variant     | "plain" \| "subtle" \| "outlined" | "plain"  | Visual variant. |

## Slots

| Slot    | Props | Description    |
| :------ | :---- | :------------- |
| actions | -     | State actions. |
