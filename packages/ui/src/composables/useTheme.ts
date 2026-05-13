import { computed, ref } from "vue";

export type ThemeMode = "light" | "dark";
export type BuiltInThemePreference = ThemeMode | "system";
export type CustomThemeName = string & {};
export type ThemePreference = BuiltInThemePreference | CustomThemeName;

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

  if (stored && /^[a-z][a-z0-9-]*$/i.test(stored)) {
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

function isThemeMode(value: ThemePreference): value is ThemeMode {
  return value === "light" || value === "dark";
}

export function useTheme() {
  const resolvedTheme = computed<ThemeMode>(() =>
    preference.value === "system" || !isThemeMode(preference.value)
      ? getSystemTheme()
      : preference.value
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
