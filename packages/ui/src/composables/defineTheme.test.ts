import { afterEach, describe, expect, it } from "vitest";
import {
  buildThemeCss,
  buildThemeVars,
  defineTheme,
  readableForeground,
  setAccent
} from "./defineTheme";

describe("readableForeground", () => {
  it("выбирает тёмный текст на светлом фоне", () => {
    expect(readableForeground("#ffffff")).toBe("#0a0c10");
    expect(readableForeground("#ffb454")).toBe("#0a0c10");
  });

  it("выбирает светлый текст на тёмном фоне", () => {
    expect(readableForeground("#000000")).toBe("#ffffff");
    expect(readableForeground("#1d4ed8")).toBe("#ffffff");
  });

  it("принимает короткий hex и значение без решётки", () => {
    expect(readableForeground("#fff")).toBe("#0a0c10");
    expect(readableForeground("000")).toBe("#ffffff");
  });

  it("уважает кастомные опции light/dark", () => {
    expect(readableForeground("#000000", { light: "#f0f0f0", dark: "#111111" })).toBe("#f0f0f0");
  });

  it("бросает на некорректном hex", () => {
    expect(() => readableForeground("not-a-color")).toThrow();
  });
});

describe("buildThemeVars", () => {
  it("раскладывает минимальный набор и выводит primary-fg", () => {
    const vars = buildThemeVars({ bg: "#0a0c10", fg: "#eef0f5", primary: "#1d4ed8" });
    expect(vars["--arch-color-bg"]).toBe("#0a0c10");
    expect(vars["--arch-color-primary"]).toBe("#1d4ed8");
    expect(vars["--arch-color-primary-fg"]).toBe("#ffffff");
  });

  it("не выводит производные нейтрали (их считает CSS)", () => {
    const vars = buildThemeVars({ bg: "#0a0c10", fg: "#eef0f5", primary: "#1d4ed8" });
    expect(vars["--arch-color-bg-subtle"]).toBeUndefined();
    expect(vars["--arch-color-fg-muted"]).toBeUndefined();
  });

  it("выводит fg для статусных цветов только когда они заданы", () => {
    const vars = buildThemeVars({
      bg: "#0a0c10",
      fg: "#eef0f5",
      primary: "#1d4ed8",
      warning: "#ffb454"
    });
    expect(vars["--arch-color-warning"]).toBe("#ffb454");
    expect(vars["--arch-color-warning-fg"]).toBe("#0a0c10");
    expect(vars["--arch-color-danger"]).toBeUndefined();
  });

  it("уважает явный primaryFg", () => {
    const vars = buildThemeVars({
      bg: "#0a0c10",
      fg: "#eef0f5",
      primary: "#1d4ed8",
      primaryFg: "#fafafa"
    });
    expect(vars["--arch-color-primary-fg"]).toBe("#fafafa");
  });
});

describe("buildThemeCss", () => {
  it("собирает правило data-theme и определяет color-scheme по фону", () => {
    const css = buildThemeCss("brand", { bg: "#080b12", fg: "#f8fafc", primary: "#8b5cf6" });
    expect(css).toContain(':root[data-theme="brand"]');
    expect(css).toContain("color-scheme: dark;");
    expect(css).toContain("--arch-color-primary: #8b5cf6;");
  });

  it("определяет светлую схему по светлому фону", () => {
    const css = buildThemeCss("paper", { bg: "#fafbfc", fg: "#0f1115", primary: "#1d4ed8" });
    expect(css).toContain("color-scheme: light;");
  });

  it("уважает явный scheme", () => {
    const css = buildThemeCss("forced", {
      bg: "#fafbfc",
      fg: "#0f1115",
      primary: "#1d4ed8",
      scheme: "dark"
    });
    expect(css).toContain("color-scheme: dark;");
  });

  it("бросает на недопустимом имени темы", () => {
    expect(() =>
      buildThemeCss("2 bad name", { bg: "#000", fg: "#fff", primary: "#1d4ed8" })
    ).toThrow();
  });
});

describe("defineTheme / setAccent (jsdom)", () => {
  afterEach(() => {
    document.head.querySelectorAll("style[id^='arch-theme-']").forEach((node) => node.remove());
    document.documentElement.removeAttribute("style");
  });

  it("инжектит style с правилом темы и переиспользует его по имени", () => {
    defineTheme("brand", { bg: "#080b12", fg: "#f8fafc", primary: "#8b5cf6" });
    const style = document.getElementById("arch-theme-brand");
    expect(style).not.toBeNull();
    expect(style?.textContent).toContain('[data-theme="brand"]');

    defineTheme("brand", { bg: "#080b12", fg: "#f8fafc", primary: "#22d3ee" });
    expect(document.querySelectorAll("style[id='arch-theme-brand']")).toHaveLength(1);
    expect(document.getElementById("arch-theme-brand")?.textContent).toContain("#22d3ee");
  });

  it("setAccent ставит primary и читаемый primary-fg на корень", () => {
    setAccent("#1d4ed8");
    const root = document.documentElement;
    expect(root.style.getPropertyValue("--arch-color-primary")).toBe("#1d4ed8");
    expect(root.style.getPropertyValue("--arch-color-primary-fg")).toBe("#ffffff");
  });

  it("setAccent уважает переданный target", () => {
    const el = document.createElement("div");
    setAccent("#ffb454", el);
    expect(el.style.getPropertyValue("--arch-color-primary")).toBe("#ffb454");
    expect(el.style.getPropertyValue("--arch-color-primary-fg")).toBe("#0a0c10");
  });
});
