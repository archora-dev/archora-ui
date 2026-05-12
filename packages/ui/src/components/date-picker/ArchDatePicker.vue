<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useFloatingPosition } from "../../composables/useFloatingPosition";
import { useOutsideClick } from "../../composables/useOutsideClick";
import type { ArchDatePickerDay, ArchDatePickerProps } from "./date-picker.types";

const props = withDefaults(defineProps<ArchDatePickerProps>(), {
  modelValue: undefined,
  placeholder: "Select date",
  min: undefined,
  max: undefined,
  disabled: false
});

const emit = defineEmits<{
  "update:modelValue": [value: string];
  change: [value: string];
}>();

const open = ref(false);
const rootRef = ref<HTMLElement | null>(null);
const popoverRef = ref<HTMLElement | null>(null);
const visibleMonth = ref(monthFromValue(props.modelValue));
const activeDate = ref(props.modelValue);

const monthLabel = computed(() =>
  new Intl.DateTimeFormat("en", { month: "long", year: "numeric" }).format(
    new Date(visibleMonth.value.year, visibleMonth.value.month, 1)
  )
);
const triggerLabel = computed(() =>
  props.modelValue
    ? new Intl.DateTimeFormat("en", {
        month: "long",
        day: "numeric",
        year: "numeric"
      }).format(fromIsoDate(props.modelValue))
    : props.placeholder
);

const days = computed(() => buildCalendarDays(visibleMonth.value.year, visibleMonth.value.month));
const today = computed(() => {
  const now = new Date();
  return toIsoDate(now.getFullYear(), now.getMonth(), now.getDate());
});

watch(
  () => props.modelValue,
  (value) => {
    if (value) {
      visibleMonth.value = monthFromValue(value);
      activeDate.value = value;
    }
  }
);

function pad(value: number) {
  return String(value).padStart(2, "0");
}

function toIsoDate(year: number, month: number, day: number) {
  const date = new Date(year, month, day);
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

function fromIsoDate(value: string) {
  return new Date(Number(value.slice(0, 4)), Number(value.slice(5, 7)) - 1, Number(value.slice(8)));
}

function monthFromValue(value?: string) {
  if (value && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return {
      year: Number(value.slice(0, 4)),
      month: Number(value.slice(5, 7)) - 1
    };
  }

  const today = new Date();
  return {
    year: today.getFullYear(),
    month: today.getMonth()
  };
}

function isDisabled(date: string) {
  return Boolean((props.min && date < props.min) || (props.max && date > props.max));
}

function buildCalendarDays(year: number, month: number): ArchDatePickerDay[] {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPreviousMonth = new Date(year, month, 0).getDate();
  const cells: ArchDatePickerDay[] = [];

  for (let index = firstDay - 1; index >= 0; index -= 1) {
    const day = daysInPreviousMonth - index;
    const date = toIsoDate(year, month - 1, day);
    cells.push({ date, day, inMonth: false, disabled: true });
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    const date = toIsoDate(year, month, day);
    cells.push({ date, day, inMonth: true, disabled: isDisabled(date) });
  }

  while (cells.length % 7 !== 0) {
    const day = cells.length - firstDay - daysInMonth + 1;
    const date = toIsoDate(year, month + 1, day);
    cells.push({ date, day, inMonth: false, disabled: true });
  }

  return cells;
}

function changeMonth(delta: number) {
  const next = new Date(visibleMonth.value.year, visibleMonth.value.month + delta, 1);
  visibleMonth.value = {
    year: next.getFullYear(),
    month: next.getMonth()
  };
}

function setActiveDate(date: string) {
  activeDate.value = date;
  visibleMonth.value = monthFromValue(date);
}

function moveActiveDate(delta: number) {
  const current = fromIsoDate(
    activeDate.value ??
      props.modelValue ??
      toIsoDate(visibleMonth.value.year, visibleMonth.value.month, 1)
  );
  current.setDate(current.getDate() + delta);
  setActiveDate(toIsoDate(current.getFullYear(), current.getMonth(), current.getDate()));
}

function onDayKeydown(event: KeyboardEvent, day: ArchDatePickerDay) {
  const movement: Record<string, number> = {
    ArrowLeft: -1,
    ArrowRight: 1,
    ArrowUp: -7,
    ArrowDown: 7
  };

  if (event.key in movement) {
    event.preventDefault();
    moveActiveDate(movement[event.key]);
    return;
  }

  if (event.key === "Home") {
    event.preventDefault();
    moveActiveDate(-fromIsoDate(day.date).getDay());
    return;
  }

  if (event.key === "End") {
    event.preventDefault();
    moveActiveDate(6 - fromIsoDate(day.date).getDay());
    return;
  }

  if (event.key === "PageUp" || event.key === "PageDown") {
    event.preventDefault();
    const current = fromIsoDate(day.date);
    current.setMonth(current.getMonth() + (event.key === "PageUp" ? -1 : 1));
    setActiveDate(toIsoDate(current.getFullYear(), current.getMonth(), current.getDate()));
    return;
  }

  if (event.key === "Escape") {
    event.preventDefault();
    open.value = false;
    return;
  }

  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    selectDay(day);
  }
}

function selectDay(day: ArchDatePickerDay) {
  if (day.disabled || props.disabled) {
    return;
  }

  emit("update:modelValue", day.date);
  emit("change", day.date);
  open.value = false;
}

useOutsideClick(rootRef, () => {
  open.value = false;
});

const { floatingStyle } = useFloatingPosition(rootRef, popoverRef, open, {
  align: "start",
  minWidth: 336,
  maxWidth: 336
});
</script>

<template>
  <div ref="rootRef" class="arch-date-picker">
    <button
      class="arch-date-picker__trigger"
      type="button"
      :disabled="disabled"
      :aria-expanded="open ? 'true' : 'false'"
      aria-haspopup="dialog"
      @click="
        open = !open;
        activeDate = modelValue || days.find((day) => day.inMonth && !day.disabled)?.date;
      "
      @keydown.escape="open = false"
    >
      <span class="arch-date-picker__trigger-label">{{ triggerLabel }}</span>
      <span class="arch-date-picker__trigger-icon" aria-hidden="true">
        <svg viewBox="0 0 16 16">
          <path d="M4.5 2.5v2M11.5 2.5v2M3 6h10" />
          <rect width="11" height="10.5" x="2.5" y="3.5" rx="1.5" />
        </svg>
      </span>
    </button>
    <div
      v-if="open"
      ref="popoverRef"
      class="arch-date-picker__popover"
      role="dialog"
      :aria-label="monthLabel"
      :style="floatingStyle"
    >
      <header class="arch-date-picker__header">
        <button
          type="button"
          class="arch-date-picker__nav"
          aria-label="Previous month"
          @click="changeMonth(-1)"
        >
          <svg viewBox="0 0 16 16" aria-hidden="true">
            <path d="M10 3.5 5.5 8l4.5 4.5" />
          </svg>
        </button>
        <strong class="arch-date-picker__month">{{ monthLabel }}</strong>
        <button
          type="button"
          class="arch-date-picker__nav"
          aria-label="Next month"
          @click="changeMonth(1)"
        >
          <svg viewBox="0 0 16 16" aria-hidden="true">
            <path d="m6 3.5 4.5 4.5L6 12.5" />
          </svg>
        </button>
      </header>
      <div class="arch-date-picker__weekdays" aria-hidden="true">
        <span>Su</span>
        <span>Mo</span>
        <span>Tu</span>
        <span>We</span>
        <span>Th</span>
        <span>Fr</span>
        <span>Sa</span>
      </div>
      <div class="arch-date-picker__grid" role="grid">
        <button
          v-for="day in days"
          :key="day.date"
          class="arch-date-picker__day"
          type="button"
          role="gridcell"
          :data-date="day.date"
          :disabled="day.disabled"
          :aria-selected="day.date === modelValue ? 'true' : 'false'"
          :data-outside-month="day.inMonth ? undefined : 'true'"
          :data-today="day.date === today ? 'true' : undefined"
          :tabindex="day.date === activeDate ? 0 : -1"
          @click="selectDay(day)"
          @keydown="onDayKeydown($event, day)"
        >
          {{ day.day }}
        </button>
      </div>
    </div>
  </div>
</template>
