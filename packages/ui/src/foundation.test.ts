import { describe, expect, it, vi } from "vitest";
import { useDisclosure, useId, useTheme } from "./index";

describe("foundation exports", () => {
  it("creates stable prefixed ids", () => {
    expect(useId("arch-test")).toMatch(/^arch-test-\d+$/);
  });

  it("manages disclosure state", () => {
    const disclosure = useDisclosure();

    expect(disclosure.open.value).toBe(false);
    disclosure.show();
    expect(disclosure.open.value).toBe(true);
    disclosure.toggle();
    expect(disclosure.open.value).toBe(false);
  });

  it("persists explicit theme preference", () => {
    vi.stubGlobal("matchMedia", () => ({ matches: false }));

    const theme = useTheme();
    theme.setTheme("light");

    expect(document.documentElement.dataset.theme).toBe("light");
    expect(window.localStorage.getItem("archora-ui-theme")).toBe("light");
  });

  it("falls back to dark when matchMedia is unavailable", () => {
    vi.stubGlobal("matchMedia", undefined);
    window.localStorage.clear();

    const theme = useTheme();
    theme.setTheme("system");

    expect(theme.resolvedTheme.value).toBe("dark");
    expect(document.documentElement.dataset.theme).toBe("dark");
  });
});
