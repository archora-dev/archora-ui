# Stat

Metric card with delta, status, and optional progress.

## Usage

```vue
<script setup>
import { ArchStat } from "@archora/ui";
</script>

<template>
  <ArchStat label="Health" value="82%" delta="+4%" delta-tone="positive" :progress="82" />
</template>
```

<ComponentSandbox name="stat" />

## Props

| Prop      | Type                                               | Default   | Description               |
| :-------- | :------------------------------------------------- | :-------- | :------------------------ |
| label     | string                                             | -         | Accessible label or text. |
| value     | string \| number                                   | -         | Value.                    |
| delta     | string                                             | -         | Metric delta.             |
| deltaTone | "neutral" \| "positive" \| "negative" \| "warning" | "neutral" | Delta tone.               |
| status    | string                                             | -         | Status.                   |
| progress  | number                                             | -         | 0-100 progress.           |

## Slots

| Slot    | Props | Description         |
| :------ | :---- | :------------------ |
| default | -     | Additional content. |
