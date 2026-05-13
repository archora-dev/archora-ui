import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { ArchFilterChip } from "./index";

describe("ArchFilterChip", () => {
  it("toggles pressed state", async () => {
    const wrapper = mount(ArchFilterChip, {
      props: { active: true },
      slots: { default: "Healthy" }
    });

    await wrapper.get("button").trigger("click");

    expect(wrapper.get("button").attributes("aria-pressed")).toBe("true");
    expect(wrapper.classes()).toContain("arch-filter-chip--active");
    expect(wrapper.emitted("toggle")).toHaveLength(1);
  });
});
