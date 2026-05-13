import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

describe("theme surfaces", () => {
  it("uses the Archora app styleguide palette for component surfaces", () => {
    const css = readFileSync(resolve(__dirname, "theme.css"), "utf8");

    expect(css).toContain("--color-bg: #0a0c10;");
    expect(css).toContain("--arch-color-bg: var(--color-bg);");
    expect(css).toContain("--arch-color-bg-elevated: var(--color-surface);");
    expect(css).toContain("--arch-color-primary: var(--color-primary);");
    expect(css).not.toMatch(/--arch-color-bg-elevated:\s*rgba\(/);
  });

  it("exposes the public custom theme color contract", () => {
    const css = readFileSync(resolve(__dirname, "theme.css"), "utf8");
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
