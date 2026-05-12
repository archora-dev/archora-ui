import { onMounted, onUnmounted, type Ref } from "vue";

export function useOutsideClick(
  target: Ref<HTMLElement | null>,
  handler: (event: PointerEvent | MouseEvent) => void
) {
  function onPointerDown(event: PointerEvent | MouseEvent) {
    const element = target.value;
    const eventTarget = event.target;

    if (!element || !(eventTarget instanceof Node) || element.contains(eventTarget)) {
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
