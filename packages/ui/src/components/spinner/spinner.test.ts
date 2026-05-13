import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { ArchSpinner } from "./index";

describe("ArchSpinner", () => {
  it("renders loading status with size and tone classes", () => {
    const wrapper = mount(ArchSpinner, {
      props: {
        label: "Loading projects",
        size: "lg",
        tone: "accent"
      }
    });

    expect(wrapper.attributes("role")).toBe("status");
    expect(wrapper.attributes("aria-label")).toBe("Loading projects");
    expect(wrapper.classes()).toContain("arch-spinner--lg");
    expect(wrapper.classes()).toContain("arch-spinner--accent");
  });
});
