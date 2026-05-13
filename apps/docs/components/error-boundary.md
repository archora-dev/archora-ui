# Error Boundary

Vue error boundary with fallback UI and retry event.

## Usage

```vue
<script setup>
import { ArchErrorBoundary } from "@archora/ui";
</script>

<template>
  <ArchErrorBoundary fallback-title="Panel failed" @retry="reload">
    <RiskyPanel />
  </ArchErrorBoundary>
</template>
```

<ComponentSandbox name="error-boundary" />

## Props

| Prop          | Type   | Default                | Description           |
| :------------ | :----- | :--------------------- | :-------------------- |
| fallbackTitle | string | "Something went wrong" | Fallback state title. |
| retryLabel    | string | "Retry"                | Retry button text.    |

## Events

| Event | Payload | Description      |
| :---- | :------ | :--------------- |
| retry | -       | Component event. |

## Slots

| Slot    | Props | Description        |
| :------ | :---- | :----------------- |
| default | -     | Protected content. |
