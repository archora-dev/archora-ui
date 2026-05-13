import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { ArchBadge } from "./index";

describe("ArchBadge", () => {
  it("renders default slot with default classes", () => {
    const wrapper = mount(ArchBadge, {
      slots: {
        default: "Stable"
      }
    });

    expect(wrapper.element.tagName).toBe("SPAN");
    expect(wrapper.classes()).toContain("arch-badge");
    expect(wrapper.classes()).toContain("arch-badge--neutral");
    expect(wrapper.classes()).toContain("arch-badge--md");
    expect(wrapper.text()).toBe("Stable");
  });

  it("supports variant, size, and custom element", () => {
    const wrapper = mount(ArchBadge, {
      props: {
        as: "strong",
        variant: "success",
        size: "sm"
      },
      slots: {
        default: "Live"
      }
    });

    expect(wrapper.element.tagName).toBe("STRONG");
    expect(wrapper.classes()).toContain("arch-badge--success");
    expect(wrapper.classes()).toContain("arch-badge--sm");
  });
});
