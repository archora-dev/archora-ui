import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { ArchTextarea } from "./index";

describe("ArchTextarea", () => {
  it("renders with default classes and rows", () => {
    const wrapper = mount(ArchTextarea, {
      props: {
        placeholder: "Describe the change"
      }
    });

    const textarea = wrapper.get("textarea");

    expect(textarea.classes()).toContain("arch-textarea");
    expect(textarea.classes()).toContain("arch-textarea--md");
    expect(textarea.attributes("rows")).toBe("4");
    expect(textarea.attributes("placeholder")).toBe("Describe the change");
  });

  it("supports model updates", async () => {
    const wrapper = mount(ArchTextarea, {
      props: {
        modelValue: "Initial"
      }
    });

    await wrapper.get("textarea").setValue("Updated");

    expect(wrapper.emitted("update:modelValue")).toEqual([["Updated"]]);
  });

  it("applies size, resize, and invalid state", () => {
    const wrapper = mount(ArchTextarea, {
      props: {
        size: "lg",
        resize: "vertical",
        invalid: true,
        ariaDescribedby: "description-error"
      }
    });

    const textarea = wrapper.get("textarea");

    expect(textarea.classes()).toContain("arch-textarea--lg");
    expect(textarea.classes()).toContain("arch-textarea--resize-vertical");
    expect(textarea.classes()).toContain("arch-textarea--invalid");
    expect(textarea.attributes("aria-invalid")).toBe("true");
    expect(textarea.attributes("aria-describedby")).toBe("description-error");
  });

  it("does not emit input while disabled", async () => {
    const wrapper = mount(ArchTextarea, {
      props: {
        disabled: true
      }
    });

    await wrapper.get("textarea").setValue("Ignored");

    expect(wrapper.get("textarea").attributes("disabled")).toBeDefined();
    expect(wrapper.emitted("update:modelValue")).toBeUndefined();
  });
});
