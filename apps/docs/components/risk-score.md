# Risk Score

Displays a risk score, severity marker, and optional reason.

## Usage

```vue
<script setup>
import { ArchRiskScore } from "@archora/ui";
</script>

<template>
  <ArchRiskScore :score="88" severity="high" reason="Dependency churn" />
</template>
```

<ComponentSandbox name="risk-score" />

## Props

| Prop     | Type                                                                                       | Default  | Description     |
| :------- | :----------------------------------------------------------------------------------------- | :------- | :-------------- |
| score    | number \| null                                                                             | -        | Numeric score.  |
| severity | "low" \| "medium" \| "high" \| "critical" \| "info" \| "success" \| "neutral" \| "unknown" | -        | Severity level. |
| reason   | string                                                                                     | -        | Reason.         |
| size     | "sm" \| "md" \| "lg"                                                                       | "sm"     | Size.           |
| layout   | "inline" \| "block"                                                                        | "inline" | Layout.         |
