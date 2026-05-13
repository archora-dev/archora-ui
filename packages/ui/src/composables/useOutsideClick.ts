import { onMounted, onUnmounted, type Ref } from "vue";

export function useOutsideClick(
  target: Ref<HTMLElement | null> | Array<Ref<HTMLElement | null>>,
  handler: (event: PointerEvent | MouseEvent) => void
) {
  function onPointerDown(event: PointerEvent | MouseEvent) {
    const targets = Array.isArray(target) ? target : [target];
    const eventTarget = event.target;

    if (!(eventTarget instanceof Node)) {
      return;
    }

    const isInside = targets.some((t) => {
      const element = t.value;
      return element && element.contains(eventTarget);
    });

    if (isInside) {
      return;
    }

    handler(event);
  }

  onMounted(() => {
    document.addEventListener("pointerdown", onPointerDown, true);
  });

  onUnmounted(() => {
    document.removeEventListener("pointerdown", onPointerDown, true);
  });
}
