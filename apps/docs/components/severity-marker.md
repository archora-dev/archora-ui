# Severity Marker

Accessible color marker for severity.

## Usage

```vue
<script setup>
import { ArchSeverityMarker } from "@archora/ui";
</script>

<template>
  <ArchSeverityMarker severity="critical" label="Critical risk" />
</template>
```

<ComponentSandbox name="severity-marker" />

## Props

| Prop     | Type                                                                                       | Default | Description               |
| :------- | :----------------------------------------------------------------------------------------- | :------ | :------------------------ |
| severity | "low" \| "medium" \| "high" \| "critical" \| "info" \| "success" \| "neutral" \| "unknown" | -       | Severity level.           |
| size     | "xs" \| "sm" \| "md"                                                                       | "sm"    | Size.                     |
| label    | string                                                                                     | -       | Accessible label or text. |
