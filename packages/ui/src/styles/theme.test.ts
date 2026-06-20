import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const css = readFileSync(resolve(__dirname, "theme.css"), "utf8");

describe("theme contract", () => {
  it("derives neutrals from the minimal base via color-mix", () => {
    expect(css).toContain("@layer arch-base, arch-theme;");
    expect(css).toMatch(
      /--arch-color-bg-subtle:\s*color-mix\(in srgb, var\(--arch-color-bg\), var\(--arch-color-fg\)/
    );
    expect(css).toMatch(
      /--arch-color-primary-glow:\s*color-mix\(in srgb, var\(--arch-color-primary\), transparent/
    );
  });

  it("keeps --arch-color-* as the only public surface", () => {
    // Приватный слой --color-* убран: компоненты и кастомные темы работают
    // напрямую с --arch-color-*.
    expect(css).not.toMatch(/--color-bg:/);
    expect(css).not.toMatch(/--color-primary:/);
    expect(css).not.toMatch(/var\(--color-/);
  });

  it("ships hand-tuned built-in dark and light themes", () => {
    expect(css).toContain('[data-theme="dark"]');
    expect(css).toContain('[data-theme="light"]');
    expect(css).toContain("--arch-color-bg-elevated: #11141a;");
    expect(css).toContain("--arch-color-bg-elevated: #ffffff;");
    expect(css).not.toMatch(/--arch-color-bg-elevated:\s*rgba\(/);
  });

  it("exposes the public custom theme color contract", () => {
    const requiredVariables = [
      "--arch-color-bg",
      "--arch-color-bg-subtle",
      "--arch-color-bg-elevated",
      "--arch-color-fg",
      "--arch-color-fg-muted",
      "--arch-color-fg-subtle",
      "--arch-color-border",
      "--arch-color-border-strong",
      "--arch-color-primary",
      "--arch-color-primary-fg",
      "--arch-color-primary-hover",
      "--arch-color-primary-active",
      "--arch-color-accent",
      "--arch-color-accent-fg",
      "--arch-color-danger",
      "--arch-color-danger-fg",
      "--arch-color-success",
      "--arch-color-success-fg",
      "--arch-color-warning",
      "--arch-color-warning-fg",
      "--arch-color-info",
      "--arch-color-info-fg"
    ];

    for (const variable of requiredVariables) {
      expect(css).toContain(variable);
    }
  });
});
