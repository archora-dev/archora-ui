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
  disabled: false
});

const emit = defineEmits<{
  "update:modelValue": [value: string];
  change: [value: string];
}>();

const open = ref(false);
const rootRef = ref<HTMLElement | null>(null);
const listboxRef = ref<HTMLElement | null>(null);
const listboxId = useId("arch-select-listbox");
const selectedOption = computed(() =>
  props.options.find((option) => option.value === props.modelValue)
);

function selectOption(option: ArchSelectOption) {
  if (option.disabled) {
    return;
  }

  emit("update:modelValue", option.value);
  emit("change", option.value);
  open.value = false;
}

const keyboard = useKeyboardNavigation({
  getCount: () => props.options.length,
  isDisabled: (index) => props.options[index]?.disabled === true,
  onSelect: (index) => {
    const option = props.options[index];

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

function onTriggerKeydown(event: KeyboardEvent) {
  if (event.key === "Escape") {
    open.value = false;
    return;
  }

  if (["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) {
    open.value = true;
  }

  if (open.value) {
    keyboard.onKeydown(event);
  }
}

useOutsideClick(rootRef, () => {
  open.value = false;
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
      @click="open = !open"
      @keydown="onTriggerKeydown"
    >
      <span>{{ selectedOption?.label ?? placeholder }}</span>
      <span class="arch-select__chevron" aria-hidden="true">
        <svg viewBox="0 0 16 16">
          <path d="m4 6 4 4 4-4" />
        </svg>
      </span>
    </button>
    <div
      v-if="open"
      :id="listboxId"
      ref="listboxRef"
      class="arch-select__listbox"
      role="listbox"
      :style="floatingStyle"
    >
      <button
        v-for="option in options"
        :key="option.value"
        class="arch-select__option"
        type="button"
        role="option"
        :disabled="option.disabled"
        :aria-selected="option.value === modelValue ? 'true' : 'false'"
        :data-active="options.indexOf(option) === keyboard.activeIndex.value ? 'true' : undefined"
        @click="selectOption(option)"
      >
        {{ option.label }}
      </button>
    </div>
  </div>
</template>
