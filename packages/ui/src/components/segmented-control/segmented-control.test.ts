import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { ArchSegmentedControl } from "./index";

const options = [
  { value: "day", label: "Day" },
  { value: "week", label: "Week" },
  { value: "year", label: "Year", disabled: true }
];

describe("ArchSegmentedControl", () => {
  it("renders options with active state and configuration classes", () => {
    const wrapper = mount(ArchSegmentedControl, {
      props: {
        options,
        modelValue: "week",
        size: "sm",
        variant: "outline",
        fullWidth: true,
        ariaLabel: "Range"
      }
    });

    expect(wrapper.attributes("role")).toBe("radiogroup");
    expect(wrapper.classes()).toContain("arch-segmented-control--outline");
    expect(wrapper.classes()).toContain("arch-segmented-control--full-width");
    expect(wrapper.find('[aria-checked="true"]').text()).toBe("Week");
  });

  it("emits updates for enabled items and ignores disabled items", async () => {
    const wrapper = mount(ArchSegmentedControl, {
      props: { options, modelValue: "day" }
    });

    await wrapper.findAll("button")[1].trigger("click");
    await wrapper.findAll("button")[2].trigger("click");

    expect(wrapper.emitted("update:modelValue")).toEqual([["week"]]);
    expect(wrapper.emitted("change")).toEqual([["week"]]);
  });
});
