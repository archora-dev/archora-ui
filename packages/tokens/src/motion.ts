export const motion = {
  duration: {
    fast: "150ms",
    normal: "300ms", // Slightly slower for smoother motion
    slow: "500ms"
  },
  easing: {
    // Spring-like organic timing functions
    standard: "cubic-bezier(0.4, 0, 0.2, 1)",
    emphasized: "cubic-bezier(0.34, 1.56, 0.64, 1)", // Spring
    smooth: "cubic-bezier(0.65, 0, 0.35, 1)", // Very smooth ease-in-out
    out: "cubic-bezier(0.16, 1, 0.3, 1)"
  }
} as const;
