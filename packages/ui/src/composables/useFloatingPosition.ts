import { computed, nextTick, onBeforeUnmount, type Ref, ref, watch } from "vue";

export type FloatingAlign = "start" | "center" | "end";
export type FloatingPlacement = "top" | "right" | "bottom" | "left";

export interface FloatingRect {
  top: number;
  right: number;
  bottom: number;
  left: number;
  width: number;
  height: number;
}

export interface FloatingViewport {
  width: number;
  height: number;
}

export interface FloatingPositionOptions {
  align?: FloatingAlign;
  offset?: number;
  padding?: number;
  placement?: FloatingPlacement;
  matchTriggerWidth?: boolean;
  minWidth?: number;
  maxWidth?: number;
}

export interface FloatingPosition {
  top: number;
  left: number;
  width: number;
  placement: FloatingPlacement;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), Math.max(min, max));
}

export function computeFloatingPosition(
  triggerRect: FloatingRect,
  floatingRect: Pick<FloatingRect, "width" | "height">,
  viewport: FloatingViewport,
  options: FloatingPositionOptions = {}
): FloatingPosition {
  const preferredPlacement = options.placement ?? "bottom";
  const align = options.align ?? (options.placement ? "center" : "start");
  const offset = options.offset ?? 8;
  const padding = options.padding ?? 16;
  const availableWidth = Math.max(0, viewport.width - padding * 2);
  const preferredWidth = options.matchTriggerWidth
    ? Math.max(triggerRect.width, options.minWidth ?? 0)
    : Math.max(floatingRect.width, options.minWidth ?? 0);
  const cappedWidth =
    options.maxWidth === undefined ? preferredWidth : Math.min(preferredWidth, options.maxWidth);
  const width = Math.min(cappedWidth, availableWidth);
  const maxLeft = viewport.width - padding - width;
  const maxTop = viewport.height - padding - floatingRect.height;
  const centeredLeft = triggerRect.left + triggerRect.width / 2 - width / 2;
  const alignedLeft =
    align === "center"
      ? centeredLeft
      : align === "end"
        ? triggerRect.right - width
        : triggerRect.left;
  const centeredTop = triggerRect.top + triggerRect.height / 2 - floatingRect.height / 2;
  const belowTop = triggerRect.bottom + offset;
  const aboveTop = triggerRect.top - offset - floatingRect.height;
  const rightLeft = triggerRect.right + offset;
  const leftLeft = triggerRect.left - offset - width;
  const fitsBelow = belowTop + floatingRect.height <= viewport.height - padding;
  const fitsAbove = aboveTop >= padding;
  const fitsRight = rightLeft + width <= viewport.width - padding;
  const fitsLeft = leftLeft >= padding;

  let placement = preferredPlacement;

  if (preferredPlacement === "top" && !fitsAbove && fitsBelow) {
    placement = "bottom";
  } else if (preferredPlacement === "bottom" && !fitsBelow && fitsAbove) {
    placement = "top";
  } else if (preferredPlacement === "left" && !fitsLeft && fitsRight) {
    placement = "right";
  } else if (preferredPlacement === "right" && !fitsRight && fitsLeft) {
    placement = "left";
  }

  if (placement === "top" || placement === "bottom") {
    return {
      top: clamp(placement === "top" ? aboveTop : belowTop, padding, maxTop),
      left: clamp(alignedLeft, padding, maxLeft),
      width,
      placement
    };
  }

  return {
    top: clamp(centeredTop, padding, maxTop),
    left: clamp(placement === "left" ? leftLeft : rightLeft, padding, maxLeft),
    width,
    placement
  };
}

export function useFloatingPosition(
  triggerRef: Ref<HTMLElement | null>,
  floatingRef: Ref<HTMLElement | null>,
  open: Ref<boolean>,
  options: FloatingPositionOptions = {}
) {
  const position = ref<FloatingPosition | null>(null);
  let cleanup: (() => void) | undefined;

  function update() {
    const trigger = triggerRef.value;
    const floating = floatingRef.value;

    if (!trigger || !floating) {
      position.value = null;
      return;
    }

    position.value = computeFloatingPosition(
      trigger.getBoundingClientRect(),
      floating.getBoundingClientRect(),
      { width: window.innerWidth, height: window.innerHeight },
      options
    );
  }

  async function scheduleUpdate() {
    await nextTick();
    update();
  }

  function bindListeners() {
    cleanup?.();
    window.addEventListener("resize", update);
    window.addEventListener("scroll", update, true);
    cleanup = () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update, true);
    };
  }

  watch(
    open,
    (isOpen) => {
      if (isOpen) {
        bindListeners();
        void scheduleUpdate();
        return;
      }

      cleanup?.();
      cleanup = undefined;
      position.value = null;
    },
    { flush: "post", immediate: true }
  );

  onBeforeUnmount(() => {
    cleanup?.();
  });

  const floatingStyle = computed(() =>
    position.value
      ? {
          left: `${position.value.left}px`,
          top: `${position.value.top}px`,
          width: `${position.value.width}px`
        }
      : undefined
  );

  return {
    floatingStyle,
    floatingPlacement: computed(() => position.value?.placement ?? options.placement ?? "bottom"),
    updateFloatingPosition: update
  };
}
