import { computed, nextTick, onBeforeUnmount, type Ref, ref, watch, type CSSProperties } from "vue";

export type FloatingAlign = "start" | "center" | "end";
export type FloatingSide = "top" | "right" | "bottom" | "left";
export type FloatingPlacement =
  | FloatingSide
  | "top-start"
  | "top-end"
  | "right-start"
  | "right-end"
  | "bottom-start"
  | "bottom-end"
  | "left-start"
  | "left-end";

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
  closeOnScroll?: boolean;
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
  options: FloatingPositionOptions = {},
  hasFlipped = false
): FloatingPosition {
  const fullPlacement = options.placement ?? "bottom";
  const [side, placementAlign] = fullPlacement.split("-") as [
    FloatingSide,
    FloatingAlign | undefined
  ];

  const align = options.align ?? placementAlign ?? "center";
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

  // Calculate X position.
  let left = 0;
  if (side === "top" || side === "bottom") {
    if (align === "start") left = triggerRect.left;
    else if (align === "end") left = triggerRect.right - width;
    else left = triggerRect.left + triggerRect.width / 2 - width / 2;
  } else if (side === "left") {
    left = triggerRect.left - offset - width;
  } else if (side === "right") {
    left = triggerRect.right + offset;
  }

  // Calculate Y position.
  let top = 0;
  if (side === "left" || side === "right") {
    if (align === "start") top = triggerRect.top;
    else if (align === "end") top = triggerRect.bottom - floatingRect.height;
    else top = triggerRect.top + triggerRect.height / 2 - floatingRect.height / 2;
  } else if (side === "top") {
    top = triggerRect.top - offset - floatingRect.height;
  } else if (side === "bottom") {
    top = triggerRect.bottom + offset;
  }

  // Basic boundary check with flip behavior.
  let finalSide = side;
  if (side === "top" && top < padding) finalSide = "bottom";
  else if (side === "bottom" && top + floatingRect.height > viewport.height - padding)
    finalSide = "top";
  else if (side === "left" && left < padding) finalSide = "right";
  else if (side === "right" && left + width > viewport.width - padding) finalSide = "left";

  if (finalSide !== side && !hasFlipped) {
    return computeFloatingPosition(
      triggerRect,
      floatingRect,
      viewport,
      {
        ...options,
        placement: placementAlign
          ? (`${finalSide}-${placementAlign}` as FloatingPlacement)
          : finalSide
      },
      true
    );
  }

  return {
    top: clamp(top, padding, maxTop),
    left: clamp(left, padding, maxLeft),
    width,
    placement: fullPlacement
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
    // Retry for Teleport-mounted content.
    if (!position.value && open.value) {
      setTimeout(update, 0);
    }
  }

  watch([triggerRef, floatingRef], () => {
    if (open.value) {
      update();
    }
  });

  function bindListeners() {
    function onScroll(event: Event) {
      const shouldClose = options.closeOnScroll ?? true;
      if (!shouldClose) {
        update();
        return;
      }

      const target = event.target;
      if (target instanceof Node && floatingRef.value?.contains(target)) {
        return;
      }

      open.value = false;
    }

    cleanup?.();
    window.addEventListener("resize", update);
    window.addEventListener("scroll", onScroll, true);
    cleanup = () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", onScroll, true);
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

  const floatingStyle = computed(
    (): CSSProperties =>
      position.value
        ? {
            position: "fixed" as const,
            left: `${position.value.left}px`,
            top: `${position.value.top}px`,
            width: options.matchTriggerWidth ? `${position.value.width}px` : undefined,
            minWidth: !options.matchTriggerWidth ? `${options.minWidth ?? 0}px` : undefined,
            maxWidth: `${options.maxWidth ?? 2000}px`,
            zIndex: 10000
          }
        : {
            position: "fixed" as const,
            visibility: "hidden" as const,
            pointerEvents: "none" as const,
            zIndex: 10000
          }
  );

  return {
    floatingStyle,
    floatingPlacement: computed(() => position.value?.placement ?? options.placement ?? "bottom"),
    updateFloatingPosition: update
  };
}
