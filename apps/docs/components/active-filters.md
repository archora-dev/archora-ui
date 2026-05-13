# Active Filters

Shows active filters as removable chips with a reset action.

## Usage

```vue
<script setup>
import { ArchActiveFilters } from "@archora/ui";

const filters = [
  { id: "status", label: "Status", value: "Healthy" },
  { id: "owner", label: "Owner", value: "Platform" }
];
</script>

<template>
  <ArchActiveFilters :filters="filters" @remove="removeFilter" @reset="resetFilters" />
</template>
```

<ComponentSandbox name="active-filters" />

## Props

| Prop    | Type                                                       | Default | Description                           |
| :------ | :--------------------------------------------------------- | :------ | :------------------------------------ |
| filters | readonly `{ id: string; label: string; value?: string }[]` | -       | Filter list: `{ id, label, value? }`. |

## Events

| Event  | Payload    | Description      |
| :----- | :--------- | :--------------- |
| remove | id: string | Component event. |
| reset  | -          | Component event. |
