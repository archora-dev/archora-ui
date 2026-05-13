# Status State

Unified loading, empty, error, and no-results state.

## Usage

```vue
<script setup>
import { ArchStatusState, ArchButton } from "@archora/ui";
</script>

<template>
  <ArchStatusState variant="no-results" title="No matches" description="Try another query.">
    <template #actions><ArchButton variant="secondary">Clear filters</ArchButton></template>
  </ArchStatusState>
</template>
```

<ComponentSandbox name="status-state" />

## Props

| Prop        | Type                                            | Default | Description     |
| :---------- | :---------------------------------------------- | :------ | :-------------- |
| variant     | "loading" \| "empty" \| "error" \| "no-results" | "empty" | Visual variant. |
| title       | string                                          | -       | Title.          |
| description | string                                          | -       | Description.    |

## Slots

| Slot    | Props | Description    |
| :------ | :---- | :------------- |
| actions | -     | State actions. |
