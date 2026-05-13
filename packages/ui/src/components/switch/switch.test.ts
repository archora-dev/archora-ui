import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { ArchSwitch } from "./index";

describe("ArchSwitch", () => {
  it("renders a switch button with default state", () => {
    const wrapper = mount(ArchSwitch, {
      props: {
        label: "Enable sync"
      }
    });

    const button = wrapper.get("button");

    expect(button.attributes("role")).toBe("switch");
    expect(button.attributes("aria-checked")).toBe("false");
    expect(wrapper.classes()).toContain("arch-switch");
    expect(wrapper.text()).toContain("Enable sync");
  });

  it("emits model updates on click", async () => {
    const wrapper = mount(ArchSwitch, {
      props: {
        modelValue: false
      }
    });

    await wrapper.get("button").trigger("click");

    expect(wrapper.emitted("update:modelValue")).toEqual([[true]]);
  });

  it("emits model updates on space and enter", async () => {
    const wrapper = mount(ArchSwitch, {
      props: {
        modelValue: false
      }
    });

    await wrapper.get("button").trigger("keydown", { key: " " });
    await wrapper.get("button").trigger("keydown", { key: "Enter" });

    expect(wrapper.emitted("update:modelValue")).toEqual([[true], [true]]);
  });

  it("does not emit while disabled", async () => {
    const wrapper = mount(ArchSwitch, {
      props: {
        disabled: true
      }
    });

    await wrapper.get("button").trigger("click");

    expect(wrapper.get("button").attributes("disabled")).toBeDefined();
    expect(wrapper.emitted("update:modelValue")).toBeUndefined();
  });

  it("marks invalid state", () => {
    const wrapper = mount(ArchSwitch, {
      props: {
        invalid: true,
        ariaDescribedby: "switch-error"
      }
    });

    const button = wrapper.get("button");

    expect(wrapper.classes()).toContain("arch-switch--invalid");
    expect(button.attributes("aria-invalid")).toBe("true");
    expect(button.attributes("aria-describedby")).toBe("switch-error");
  });
});
