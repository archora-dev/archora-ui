<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useId } from "../../composables/useId";
import { useFloatingPosition } from "../../composables/useFloatingPosition";
import { useKeyboardNavigation } from "../../composables/useKeyboardNavigation";
import { useOutsideClick } from "../../composables/useOutsideClick";
import type { ArchSelectOption, ArchSelectProps } from "./select.types";

const props = withDefaults(defineProps<ArchSelectProps>(), {
  modelValue: undefined,
  placeholder: "Select option",
  disabled: false,
  clearable: false,
  loading: false,
  loadingText: "Loading",
  emptyText: "No options",
  errorText: undefined
});

const emit = defineEmits<{
  "update:modelValue": [value: string];
  change: [value: string];
  clear: [];
  open: [];
  close: [];
}>();

const open = ref(false);
const rootRef = ref<HTMLElement | null>(null);
const listboxRef = ref<HTMLElement | null>(null);
const listboxId = useId("arch-select-listbox");
const selectedOption = computed(() =>
  props.options.find((option) => String(option.value) === String(props.modelValue))
);
const renderedOptions = computed(() => (props.loading || props.errorText ? [] : props.options));
const hasValue = computed(() => props.modelValue !== undefined && props.modelValue !== "");

watch(
  () => props.modelValue,
  () => {
    // Force re-calculation of selectedOption if needed,
    // although computed handles it, this ensures reactivity.
  }
);

function selectOption(option: ArchSelectOption) {
  if (option.disabled || props.loading || props.errorText) {
    return;
  }

  const newValue = String(option.value);
  emit("update:modelValue", newValue);
  emit("change", newValue);
  setOpen(false);
}

const keyboard = useKeyboardNavigation({
  getCount: () => renderedOptions.value.length,
  isDisabled: (index) => renderedOptions.value[index]?.disabled === true,
  onSelect: (index) => {
    const option = renderedOptions.value[index];

    if (option) {
      selectOption(option);
    }
  }
});

watch(open, (isOpen) => {
  if (!isOpen) {
    keyboard.reset();
  }
});

function setOpen(nextOpen: boolean) {
  if (props.disabled || open.value === nextOpen) {
    return;
  }

  open.value = nextOpen;

  if (nextOpen) {
    emit("open");
  } else {
    emit("close");
  }
}

function clearSelection() {
  if (props.disabled) {
    return;
  }

  emit("update:modelValue", "");
  emit("clear");
  setOpen(false);
}

function onTriggerKeydown(event: KeyboardEvent) {
  if (event.key === "Escape") {
    setOpen(false);
    return;
  }

  if (["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) {
    setOpen(true);
  }

  if (open.value) {
    keyboard.onKeydown(event);
  }
}

useOutsideClick([rootRef, listboxRef], () => {
  setOpen(false);
});

const { floatingStyle } = useFloatingPosition(rootRef, listboxRef, open, {
  align: "start",
  matchTriggerWidth: true,
  minWidth: 256
});
</script>

<template>
  <div
    ref="rootRef"
    class="arch-select"
    :class="{ 'arch-select--open': open, 'arch-select--disabled': disabled }"
  >
    <button
      class="arch-select__trigger"
      type="button"
      aria-haspopup="listbox"
      :aria-expanded="open ? 'true' : 'false'"
      :aria-controls="listboxId"
      :disabled="disabled"
      @click="setOpen(!open)"
      @keydown="onTriggerKeydown"
    >
      <span>{{ selectedOption?.label ?? placeholder }}</span>
      <button
        v-if="clearable && hasValue && !disabled"
        class="arch-select__clear"
        type="button"
        aria-label="Clear selection"
        @click.stop="clearSelection"
      >
        ×
      </button>
      <span class="arch-select__chevron" aria-hidden="true">
        <svg viewBox="0 0 16 16">
          <path d="m4 6 4 4 4-4" />
        </svg>
      </span>
    </button>
    <Teleport to="body">
      <div
        v-if="open"
        :id="listboxId"
        ref="listboxRef"
        class="arch-select__listbox"
        role="listbox"
        :style="floatingStyle"
      >
        <button
          v-for="option in renderedOptions"
          :key="option.value"
          class="arch-select__option"
          type="button"
          role="option"
          :disabled="option.disabled"
          :aria-selected="option.value === modelValue ? 'true' : 'false'"
          :data-active="
            renderedOptions.indexOf(option) === keyboard.activeIndex.value ? 'true' : undefined
          "
          @click="selectOption(option)"
        >
          <slot
            name="option"
            :option="option"
            :active="renderedOptions.indexOf(option) === keyboard.activeIndex.value"
          >
            <span class="arch-select__option-label">{{ option.label }}</span>
            <span v-if="option.description" class="arch-select__option-description">
              {{ option.description }}
            </span>
          </slot>
        </button>
        <div v-if="loading" class="arch-select__state" role="status">
          <slot name="loading">{{ loadingText }}</slot>
        </div>
        <div
          v-else-if="errorText"
          class="arch-select__state arch-select__state--error"
          role="alert"
        >
          <slot name="error">{{ errorText }}</slot>
        </div>
        <div v-else-if="renderedOptions.length === 0" class="arch-select__state" role="status">
          <slot name="empty">{{ emptyText }}</slot>
        </div>
      </div>
    </Teleport>
  </div>
</template>
