# Progress Bar

Linear progress indicator with ARIA progressbar semantics.

## Usage

```vue
<script setup>
import { ArchProgressBar } from "@archora/ui";
</script>

<template>
  <ArchProgressBar :value="72" :max="100" />
</template>
```

<ComponentSandbox name="progress-bar" />

## Props

| Prop  | Type   | Default | Description    |
| :---- | :----- | :------ | :------------- |
| value | number | 0       | Value.         |
| max   | number | 100     | Maximum value. |
