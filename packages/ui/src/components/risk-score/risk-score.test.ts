import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { ArchRiskScore } from "./index";

describe("ArchRiskScore", () => {
  it("renders rounded score, severity, and reason", () => {
    const wrapper = mount(ArchRiskScore, {
      props: {
        score: 87.6,
        severity: "high",
        reason: "Many changed dependencies",
        layout: "block"
      }
    });

    expect(wrapper.text()).toContain("88");
    expect(wrapper.text()).toContain("High");
    expect(wrapper.text()).toContain("Many changed dependencies");
    expect(wrapper.classes()).toContain("arch-risk-score--block");
  });
});
