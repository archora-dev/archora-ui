import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { ArchInput } from "./index";

describe("ArchInput", () => {
  it("renders a text input with default classes", () => {
    const wrapper = mount(ArchInput, {
      props: {
        placeholder: "Search projects"
      }
    });

    const input = wrapper.get("input");

    expect(input.classes()).toContain("arch-input");
    expect(input.classes()).toContain("arch-input--md");
    expect(input.attributes("type")).toBe("text");
    expect(input.attributes("placeholder")).toBe("Search projects");
  });

  it("supports model updates", async () => {
    const wrapper = mount(ArchInput, {
      props: {
        modelValue: "Initial"
      }
    });

    await wrapper.get("input").setValue("Updated");

    expect(wrapper.emitted("update:modelValue")).toEqual([["Updated"]]);
  });

  it("applies size and invalid state", () => {
    const wrapper = mount(ArchInput, {
      props: {
        size: "lg",
        invalid: true,
        ariaDescribedby: "field-error"
      }
    });

    const input = wrapper.get("input");

    expect(input.classes()).toContain("arch-input--lg");
    expect(input.classes()).toContain("arch-input--invalid");
    expect(input.attributes("aria-invalid")).toBe("true");
    expect(input.attributes("aria-describedby")).toBe("field-error");
  });

  it("does not emit input while disabled", async () => {
    const wrapper = mount(ArchInput, {
      props: {
        disabled: true
      }
    });

    await wrapper.get("input").setValue("Ignored");

    expect(wrapper.get("input").attributes("disabled")).toBeDefined();
    expect(wrapper.emitted("update:modelValue")).toBeUndefined();
  });

  it("marks readonly inputs", () => {
    const wrapper = mount(ArchInput, {
      props: {
        readonly: true,
        modelValue: "Locked"
      }
    });

    const input = wrapper.get("input");

    expect(input.attributes("readonly")).toBeDefined();
    expect(input.element.value).toBe("Locked");
  });
});
