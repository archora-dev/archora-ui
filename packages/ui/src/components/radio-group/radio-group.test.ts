import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { ArchRadioGroup } from "./index";

const options = [
  { value: "compact", label: "Compact", description: "Dense table rows" },
  { value: "comfortable", label: "Comfortable" },
  { value: "legacy", label: "Legacy", disabled: true }
];

describe("ArchRadioGroup", () => {
  it("renders options with orientation, size, and selected value", () => {
    const wrapper = mount(ArchRadioGroup, {
      props: {
        options,
        modelValue: "compact",
        orientation: "horizontal",
        size: "lg",
        ariaLabel: "Density"
      }
    });

    expect(wrapper.attributes("role")).toBe("radiogroup");
    expect(wrapper.attributes("aria-label")).toBe("Density");
    expect(wrapper.classes()).toContain("arch-radio-group--horizontal");
    expect(wrapper.classes()).toContain("arch-radio-group--lg");
    expect(wrapper.findAll('input[type="radio"]')).toHaveLength(3);
    expect((wrapper.find('input[value="compact"]').element as HTMLInputElement).checked).toBe(true);
  });

  it("emits updates for enabled options and ignores disabled options", async () => {
    const wrapper = mount(ArchRadioGroup, {
      props: { options }
    });

    await wrapper.find('input[value="comfortable"]').trigger("change");
    await wrapper.find('input[value="legacy"]').trigger("change");

    expect(wrapper.emitted("update:modelValue")).toEqual([["comfortable"]]);
    expect(wrapper.emitted("change")).toEqual([["comfortable"]]);
  });
});
