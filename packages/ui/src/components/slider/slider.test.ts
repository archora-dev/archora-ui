import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { ArchSlider } from "./index";

describe("ArchSlider", () => {
  it("emits numeric values from the range input", async () => {
    const wrapper = mount(ArchSlider, {
      props: {
        modelValue: 40,
        label: "Threshold",
        min: 0,
        max: 100,
        step: 5,
        showValue: true
      }
    });

    await wrapper.get("input").setValue("65");

    expect(wrapper.text()).toContain("Threshold");
    expect(wrapper.text()).toContain("40");
    expect(wrapper.emitted("update:modelValue")).toEqual([[65]]);
  });
});
