import { computed, ref, type Ref } from "vue";

export interface UseControllableStateOptions<T> {
  value?: Ref<T | undefined>;
  defaultValue: T;
  onChange?: (value: T) => void;
}

export function useControllableState<T>(options: UseControllableStateOptions<T>) {
  const localValue = ref(options.defaultValue) as Ref<T>;

  const state = computed<T>({
    get() {
      return options.value?.value ?? localValue.value;
    },
    set(nextValue) {
      if (options.value === undefined) {
        localValue.value = nextValue;
      }

      options.onChange?.(nextValue);
    }
  });

  return state;
}
