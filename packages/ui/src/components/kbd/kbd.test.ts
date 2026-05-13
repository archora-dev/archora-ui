import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { ArchKbd } from "./index";

describe("ArchKbd", () => {
  it("renders keyboard shortcut text with size and variant classes", () => {
    const wrapper = mount(ArchKbd, {
      props: { size: "lg", variant: "outline" },
      slots: { default: "Cmd K" }
    });

    expect(wrapper.element.tagName).toBe("KBD");
    expect(wrapper.classes()).toContain("arch-kbd--lg");
    expect(wrapper.classes()).toContain("arch-kbd--outline");
    expect(wrapper.text()).toBe("Cmd K");
  });

  it("can render as span for non-keyboard labels", () => {
    const wrapper = mount(ArchKbd, {
      props: { as: "span" },
      slots: { default: "/" }
    });

    expect(wrapper.element.tagName).toBe("SPAN");
  });
});
