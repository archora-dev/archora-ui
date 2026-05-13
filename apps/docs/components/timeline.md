# Timeline

Vertical event feed for audit logs, releases, and incident history.

## Usage

```vue
<script setup>
import { ArchTimeline } from "@archora/ui";

const items = [{ id: "1", title: "Deploy started", time: "10:20", tone: "info" }];
</script>

<template>
  <ArchTimeline :items="items" dense />
</template>
```

<ComponentSandbox name="timeline" />

## Props

| Prop  | Type                                                                                           | Default | Description           |
| :---- | :--------------------------------------------------------------------------------------------- | :------ | :-------------------- |
| items | `readonly { id: string; title: string; description?: string; time?: string; tone?: string }[]` | -       | Item collection.      |
| dense | boolean                                                                                        | false   | Enables compact mode. |
