<script setup lang="ts">
import { nextTick, ref, watch } from "vue";
import { useId } from "../../composables/useId";

const props = withDefaults(
  defineProps<{
    open?: boolean;
    title?: string;
    description?: string;
    confirmLabel?: string;
    cancelLabel?: string;
    variant?: "default" | "danger";
    loading?: boolean;
    closeOnCancel?: boolean;
  }>(),
  {
    open: false,
    title: undefined,
    description: undefined,
    confirmLabel: "Confirm",
    cancelLabel: "Cancel",
    variant: "default",
    loading: false,
    closeOnCancel: true
  }
);

const emit = defineEmits<{ "update:open": [value: boolean]; confirm: []; cancel: [] }>();
const contentRef = ref<HTMLElement | null>(null);
const titleId = useId("arch-alert-dialog-title");
const descriptionId = useId("arch-alert-dialog-description");

watch(
  () => props.open,
  async (open) => {
    if (open) {
      await nextTick();
      contentRef.value?.querySelector<HTMLElement>("button")?.focus();
    }
  },
  { immediate: true }
);

function cancel() {
  emit("cancel");
  if (props.closeOnCancel) emit("update:open", false);
}
</script>

<template>
  <Teleport to="body">
    <div v-if="open" class="arch-alert-dialog">
      <div class="arch-alert-dialog__overlay" @click="cancel" />
      <section
        ref="contentRef"
        role="alertdialog"
        aria-modal="true"
        :aria-labelledby="title ? titleId : undefined"
        :aria-describedby="description ? descriptionId : undefined"
        class="arch-alert-dialog__content"
        :class="`arch-alert-dialog__content--${variant}`"
      >
        <header class="arch-alert-dialog__header">
          <h2 v-if="title" :id="titleId" class="arch-alert-dialog__title">{{ title }}</h2>
          <p v-if="description" :id="descriptionId" class="arch-alert-dialog__description">
            {{ description }}
          </p>
          <slot />
        </header>
        <footer class="arch-alert-dialog__footer">
          <button type="button" class="arch-alert-dialog__cancel" @click="cancel">
            {{ cancelLabel }}
          </button>
          <button
            type="button"
            class="arch-alert-dialog__confirm"
            :class="`arch-alert-dialog__confirm--${variant}`"
            :aria-busy="loading ? 'true' : undefined"
            @click="emit('confirm')"
          >
            {{ confirmLabel }}
          </button>
        </footer>
      </section>
    </div>
  </Teleport>
</template>
