import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { ArchButton } from "./index";

describe("ArchButton", () => {
  it("renders as a native button with default styling", () => {
    const wrapper = mount(ArchButton, {
      slots: {
        default: "Save changes"
      }
    });

    expect(wrapper.element.tagName).toBe("BUTTON");
    expect(wrapper.text()).toBe("Save changes");
    expect(wrapper.classes()).toContain("arch-button");
    expect(wrapper.classes()).toContain("arch-button--primary");
    expect(wrapper.classes()).toContain("arch-button--md");
    expect(wrapper.attributes("type")).toBe("button");
  });

  it("applies variant, size, shape, justify, and block classes", () => {
    const wrapper = mount(ArchButton, {
      props: {
        variant: "secondary",
        size: "lg",
        shape: "rounded",
        justify: "between",
        block: true
      },
      slots: {
        default: "Create project"
      }
    });

    expect(wrapper.classes()).toContain("arch-button--secondary");
    expect(wrapper.classes()).toContain("arch-button--lg");
    expect(wrapper.classes()).toContain("arch-button--rounded");
    expect(wrapper.classes()).toContain("arch-button--justify-between");
    expect(wrapper.classes()).toContain("arch-button--block");
  });

  it("emits click events when enabled", async () => {
    const wrapper = mount(ArchButton, {
      slots: {
        default: "Open"
      }
    });

    await wrapper.trigger("click");

    expect(wrapper.emitted("click")).toHaveLength(1);
  });

  it("does not emit click events while loading", async () => {
    const wrapper = mount(ArchButton, {
      props: {
        loading: true
      },
      slots: {
        default: "Save"
      }
    });

    await wrapper.trigger("click");

    expect(wrapper.emitted("click")).toBeUndefined();
    expect(wrapper.attributes("aria-busy")).toBe("true");
    expect(wrapper.attributes("aria-disabled")).toBe("true");
  });

  it("sets native disabled state when disabled", async () => {
    const wrapper = mount(ArchButton, {
      props: {
        disabled: true
      },
      slots: {
        default: "Delete"
      }
    });

    await wrapper.trigger("click");

    expect(wrapper.attributes("disabled")).toBeDefined();
    expect(wrapper.emitted("click")).toBeUndefined();
  });
});
