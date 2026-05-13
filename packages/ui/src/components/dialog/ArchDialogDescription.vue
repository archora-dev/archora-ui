<script setup lang="ts">
import { inject } from "vue";
import { dialogContextKey } from "./dialog.context";

const dialog = inject(dialogContextKey);
</script>

<template>
  <p :id="dialog?.descriptionId" class="arch-dialog__description">
    <slot />
  </p>
</template>
