export const colors = {
  // Base structural shades: deep near-blacks with a blue cast.
  slate: {
    50: "#f8fafc",
    100: "#f1f5f9",
    200: "#e2e8f0",
    300: "#cbd5e1",
    400: "#94a3b8",
    500: "#64748b",
    600: "#475569",
    700: "#334155",
    800: "#1e293b",
    900: "#0b111e", // Deeper
    950: "#04070d" // Near-space black
  },
  // Primary accent: electric violet.
  violet: {
    300: "#c4b5fd",
    400: "#a78bfa",
    500: "#8b5cf6",
    600: "#7c3aed",
    700: "#6d28d9"
  },
  // Secondary accent: neon cyan.
  cyan: {
    300: "#67e8f9",
    400: "#22d3ee",
    500: "#06b6d4",
    600: "#0891b2",
    700: "#0e7490"
  },
  // Status colors with vivid organic saturation.
  red: {
    400: "#f87171",
    500: "#ef4444",
    600: "#dc2626"
  },
  amber: {
    400: "#fbbf24",
    500: "#f59e0b",
    600: "#d97706"
  },
  emerald: {
    400: "#34d399",
    500: "#10b981",
    600: "#059669"
  },
  // Dedicated glow shades.
  glow: {
    violet: "rgba(139, 92, 246, 0.5)",
    cyan: "rgba(34, 211, 238, 0.5)"
  }
} as const;
