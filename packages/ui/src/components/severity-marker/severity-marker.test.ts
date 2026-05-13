import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { ArchSeverityMarker } from "./index";

describe("ArchSeverityMarker", () => {
  it("renders an accessible severity marker", () => {
    const wrapper = mount(ArchSeverityMarker, {
      props: {
        severity: "critical",
        label: "Critical risk",
        size: "md"
      }
    });

    expect(wrapper.attributes("role")).toBe("img");
    expect(wrapper.attributes("aria-label")).toBe("Critical risk");
    expect(wrapper.classes()).toContain("arch-severity-marker--critical");
  });
});
