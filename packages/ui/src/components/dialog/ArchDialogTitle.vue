<script setup lang="ts">
import { inject } from "vue";
import { dialogContextKey } from "./dialog.context";

const dialog = inject(dialogContextKey);
</script>

<template>
  <h2 :id="dialog?.titleId" class="arch-dialog__title">
    <slot />
  </h2>
</template>
