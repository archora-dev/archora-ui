import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { ArchCheckbox } from "./index";

describe("ArchCheckbox", () => {
  it("renders a native checkbox with default classes", () => {
    const wrapper = mount(ArchCheckbox, {
      props: {
        label: "Accept terms"
      }
    });

    const input = wrapper.get("input");

    expect(input.attributes("type")).toBe("checkbox");
    expect(wrapper.classes()).toContain("arch-checkbox");
    expect(input.classes()).toContain("arch-checkbox__input");
    expect(wrapper.find(".arch-checkbox__control").exists()).toBe(true);
    expect(wrapper.find(".arch-checkbox__indicator").exists()).toBe(true);
    expect(wrapper.text()).toContain("Accept terms");
  });

  it("keeps the native input visually hidden behind the custom control", () => {
    const wrapper = mount(ArchCheckbox);

    expect(wrapper.get("input").attributes("class")).toContain("arch-checkbox__input");
    expect(wrapper.get(".arch-checkbox__control").attributes("aria-hidden")).toBe("true");
  });

  it("supports checked model updates", async () => {
    const wrapper = mount(ArchCheckbox, {
      props: {
        modelValue: false
      }
    });

    await wrapper.get("input").setValue(true);

    expect(wrapper.emitted("update:modelValue")).toEqual([[true]]);
  });

  it("does not emit updates while disabled", async () => {
    const wrapper = mount(ArchCheckbox, {
      props: {
        disabled: true
      }
    });

    await wrapper.get("input").setValue(true);

    expect(wrapper.get("input").attributes("disabled")).toBeDefined();
    expect(wrapper.emitted("update:modelValue")).toBeUndefined();
  });

  it("marks invalid state", () => {
    const wrapper = mount(ArchCheckbox, {
      props: {
        invalid: true,
        ariaDescribedby: "terms-error"
      }
    });

    const input = wrapper.get("input");

    expect(wrapper.classes()).toContain("arch-checkbox--invalid");
    expect(input.attributes("aria-invalid")).toBe("true");
    expect(input.attributes("aria-describedby")).toBe("terms-error");
  });

  it("uses the checked visual state without marking danger unless invalid", () => {
    const checked = mount(ArchCheckbox, {
      props: {
        modelValue: true
      }
    });

    const invalid = mount(ArchCheckbox, {
      props: {
        modelValue: true,
        invalid: true
      }
    });

    expect(checked.classes()).toContain("arch-checkbox--checked");
    expect(checked.classes()).not.toContain("arch-checkbox--invalid");
    expect(invalid.classes()).toContain("arch-checkbox--invalid");
  });

  it("sets indeterminate state and mixed aria state", async () => {
    const wrapper = mount(ArchCheckbox, {
      props: {
        indeterminate: true
      }
    });

    const input = wrapper.get("input").element as HTMLInputElement;

    expect(input.indeterminate).toBe(true);
    expect(wrapper.get("input").attributes("aria-checked")).toBe("mixed");
  });
});
