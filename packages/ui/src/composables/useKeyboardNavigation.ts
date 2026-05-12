import { ref } from "vue";

export interface UseKeyboardNavigationOptions {
  getCount: () => number;
  isDisabled?: (index: number) => boolean;
  onSelect?: (index: number) => void;
}

export function useKeyboardNavigation(options: UseKeyboardNavigationOptions) {
  const activeIndex = ref(-1);

  function isAvailable(index: number) {
    return index >= 0 && index < options.getCount() && !options.isDisabled?.(index);
  }

  function move(delta: 1 | -1) {
    const count = options.getCount();

    if (count === 0) {
      activeIndex.value = -1;
      return;
    }

    let nextIndex = activeIndex.value;

    for (let attempt = 0; attempt < count; attempt += 1) {
      nextIndex = (nextIndex + delta + count) % count;

      if (isAvailable(nextIndex)) {
        activeIndex.value = nextIndex;
        return;
      }
    }

    activeIndex.value = -1;
  }

  function setFirst() {
    activeIndex.value = -1;
    move(1);
  }

  function setLast() {
    activeIndex.value = 0;
    move(-1);
  }

  function reset() {
    activeIndex.value = -1;
  }

  function selectActive() {
    if (isAvailable(activeIndex.value)) {
      options.onSelect?.(activeIndex.value);
    }
  }

  function onKeydown(event: KeyboardEvent) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      move(1);
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      move(-1);
      return;
    }

    if (event.key === "Home") {
      event.preventDefault();
      setFirst();
      return;
    }

    if (event.key === "End") {
      event.preventDefault();
      setLast();
      return;
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      selectActive();
    }
  }

  return {
    activeIndex,
    move,
    onKeydown,
    reset,
    selectActive,
    setFirst,
    setLast
  };
}
