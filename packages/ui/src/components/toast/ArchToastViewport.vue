<script setup lang="ts">
import ArchToast from "./ArchToast.vue";
import { useToast } from "./useToast";

const toast = useToast();
</script>

<template>
  <div class="arch-toast-viewport" aria-live="polite" aria-relevant="additions removals">
    <ArchToast v-for="item in toast.toasts.value" :key="item.id" :toast="item" />
  </div>
</template>
