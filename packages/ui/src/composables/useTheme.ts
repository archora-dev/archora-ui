import { computed, ref } from "vue";

export type ThemeMode = "light" | "dark";
export type ThemePreference = ThemeMode | "system";

const storageKey = "archora-ui-theme";
const preference = ref<ThemePreference>(readStoredTheme());

function getSystemTheme(): ThemeMode {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return "dark";
  }

  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

function readStoredTheme(): ThemePreference {
  if (typeof window === "undefined") {
    return "system";
  }

  const stored = window.localStorage.getItem(storageKey);

  if (stored === "light" || stored === "dark" || stored === "system") {
    return stored;
  }

  return "system";
}

function applyTheme(nextPreference: ThemePreference) {
  if (typeof document === "undefined") {
    return;
  }

  document.documentElement.dataset.theme =
    nextPreference === "system" ? getSystemTheme() : nextPreference;
}

export function useTheme() {
  const resolvedTheme = computed<ThemeMode>(() =>
    preference.value === "system" ? getSystemTheme() : preference.value
  );

  function setTheme(nextPreference: ThemePreference) {
    preference.value = nextPreference;

    if (typeof window !== "undefined") {
      window.localStorage.setItem(storageKey, nextPreference);
    }

    applyTheme(nextPreference);
  }

  applyTheme(preference.value);

  return {
    preference,
    resolvedTheme,
    setTheme
  };
}
