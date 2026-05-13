# Stepper

Shows workflow steps with optional step selection.

## Usage

```vue
<script setup>
import { ref } from "vue";
import { ArchStepper } from "@archora/ui";

const current = ref("build");
const steps = [
  { id: "plan", label: "Plan", status: "complete" },
  { id: "build", label: "Build" }
];
</script>

<template>
  <ArchStepper v-model="current" :steps="steps" clickable />
</template>
```

<ComponentSandbox name="stepper" />

## Props

| Prop        | Type                                                                                                  | Default      | Description                      |
| :---------- | :---------------------------------------------------------------------------------------------------- | :----------- | :------------------------------- |
| steps       | `readonly { id: string; label: string; description?: string; status?: string; disabled?: boolean }[]` | -            | Step list.                       |
| modelValue  | string                                                                                                | -            | `v-model` value.                 |
| orientation | "horizontal" \| "vertical"                                                                            | "horizontal" | Orientation.                     |
| clickable   | boolean                                                                                               | false        | Allows selecting steps by click. |

## Events

| Event             | Payload    | Description          |
| :---------------- | :--------- | :------------------- |
| update:modelValue | id: string | `modelValue` change. |
| select            | id: string | Item selection.      |
