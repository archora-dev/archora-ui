# Input

Text input with sizes, invalid/readonly/disabled states, and form events.

## Usage

```vue
<script setup>
import { ref } from "vue";
import { ArchInput } from "@archora/ui";

const email = ref("");
</script>

<template>
  <ArchInput v-model="email" type="email" placeholder="team@example.com" />
</template>
```

<ComponentSandbox name="input" />

## Props

| Prop            | Type                                                                      | Default | Description                  |
| :-------------- | :------------------------------------------------------------------------ | :------ | :--------------------------- |
| modelValue      | string \| number                                                          | ""      | `v-model` value.             |
| type            | "email" \| "number" \| "password" \| "search" \| "tel" \| "text" \| "url" | "text"  | HTML type or field type.     |
| size            | "sm" \| "md" \| "lg"                                                      | "md"    | Size.                        |
| placeholder     | string                                                                    | -       | Placeholder.                 |
| name            | string                                                                    | -       | Field name.                  |
| autocomplete    | string                                                                    | -       | Autocomplete.                |
| disabled        | boolean                                                                   | false   | Disables the component.      |
| readonly        | boolean                                                                   | false   | Read-only state.             |
| required        | boolean                                                                   | false   | Marks the field as required. |
| invalid         | boolean                                                                   | false   | Invalid state.               |
| ariaLabel       | string                                                                    | -       | aria-label.                  |
| ariaLabelledby  | string                                                                    | -       | aria-labelledby.             |
| ariaDescribedby | string                                                                    | -       | aria-describedby.            |

## Events

| Event             | Payload           | Description          |
| :---------------- | :---------------- | :------------------- |
| update:modelValue | value: string     | `modelValue` change. |
| input             | event: Event      | Component event.     |
| change            | event: Event      | Value change.        |
| blur              | event: FocusEvent | Component event.     |
| focus             | event: FocusEvent | Component event.     |
