import type { Ref } from "vue";

const focusableSelector = [
  "button:not(:disabled)",
  "[href]",
  "input:not(:disabled)",
  "select:not(:disabled)",
  "textarea:not(:disabled)",
  '[tabindex]:not([tabindex="-1"])'
].join(", ");

function getFocusableElements(container: HTMLElement) {
  return Array.from(container.querySelectorAll<HTMLElement>(focusableSelector)).filter(
    (element) => !element.hasAttribute("disabled") && element.tabIndex !== -1
  );
}

export function useFocusTrap(container: Ref<HTMLElement | null>) {
  function focusFirst() {
    const target = container.value;

    if (!target) {
      return;
    }

    const [firstFocusable] = getFocusableElements(target);
    (firstFocusable ?? target).focus();
  }

  function onKeydown(event: KeyboardEvent) {
    if (event.key !== "Tab") {
      return;
    }

    const target = container.value;

    if (!target) {
      return;
    }

    const focusableElements = getFocusableElements(target);

    if (focusableElements.length === 0) {
      event.preventDefault();
      target.focus();
      return;
    }

    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];
    const activeElement = document.activeElement;

    if (event.shiftKey && activeElement === firstFocusable) {
      event.preventDefault();
      lastFocusable.focus();
      return;
    }

    if (!event.shiftKey && activeElement === lastFocusable) {
      event.preventDefault();
      firstFocusable.focus();
      return;
    }

    if (!target.contains(activeElement)) {
      event.preventDefault();
      firstFocusable.focus();
    }
  }

  return {
    focusFirst,
    onKeydown
  };
}
