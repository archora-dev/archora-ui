export const shadows = {
  // Layered shadows for depth and softness.
  sm: "0 2px 4px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)",
  md: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
  lg: "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 15px 20px -10px rgba(0, 0, 0, 0.15)",
  // Dedicated glow shadow for active elements.
  glow: "0 0 20px rgba(139, 92, 246, 0.3)",
  focus: "0 0 0 4px rgba(34, 211, 238, 0.25)"
} as const;
