# Textarea

Multiline input with resize, invalid state, and form events.

## Usage

```vue
<script setup>
import { ref } from "vue";
import { ArchTextarea } from "@archora/ui";

const notes = ref("");
</script>

<template>
  <ArchTextarea v-model="notes" rows="6" placeholder="Release notes" />
</template>
```

<ComponentSandbox name="textarea" />

## Props

| Prop            | Type                                           | Default    | Description                  |
| :-------------- | :--------------------------------------------- | :--------- | :--------------------------- |
| modelValue      | string                                         | ""         | `v-model` value.             |
| size            | "sm" \| "md" \| "lg"                           | "md"       | Size.                        |
| resize          | "none" \| "vertical" \| "horizontal" \| "both" | "vertical" | Resize behavior.             |
| rows            | number \| string                               | 4          | Row data.                    |
| placeholder     | string                                         | -          | Placeholder.                 |
| name            | string                                         | -          | Field name.                  |
| autocomplete    | string                                         | -          | Autocomplete.                |
| disabled        | boolean                                        | false      | Disables the component.      |
| readonly        | boolean                                        | false      | Read-only state.             |
| required        | boolean                                        | false      | Marks the field as required. |
| invalid         | boolean                                        | false      | Invalid state.               |
| ariaLabel       | string                                         | -          | aria-label.                  |
| ariaLabelledby  | string                                         | -          | aria-labelledby.             |
| ariaDescribedby | string                                         | -          | aria-describedby.            |

## Events

| Event             | Payload           | Description          |
| :---------------- | :---------------- | :------------------- |
| update:modelValue | value: string     | `modelValue` change. |
| input             | event: Event      | Component event.     |
| change            | event: Event      | Value change.        |
| blur              | event: FocusEvent | Component event.     |
| focus             | event: FocusEvent | Component event.     |
