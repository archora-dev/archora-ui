import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { ArchStat } from "./index";

describe("ArchStat", () => {
  it("renders metric value, delta, progress, and status", () => {
    const wrapper = mount(ArchStat, {
      props: {
        label: "Health",
        value: "82%",
        delta: "+4%",
        deltaTone: "positive",
        progress: 82,
        status: "Healthy"
      }
    });

    expect(wrapper.text()).toContain("Health");
    expect(wrapper.text()).toContain("82%");
    expect(wrapper.get('[role="progressbar"]').attributes("aria-valuenow")).toBe("82");
    expect(wrapper.classes()).toContain("arch-stat");
  });
});
