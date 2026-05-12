import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { ArchTabs } from "./index";

const items = [
  { value: "overview", label: "Overview" },
  { value: "activity", label: "Activity" },
  { value: "settings", label: "Settings", disabled: true }
];

describe("ArchTabs", () => {
  it("renders tabs and the active panel", () => {
    const wrapper = mount(ArchTabs, {
      props: {
        items,
        modelValue: "overview"
      },
      slots: {
        overview: "Overview panel",
        activity: "Activity panel"
      }
    });

    expect(wrapper.find('[role="tablist"]').exists()).toBe(true);
    expect(wrapper.findAll('[role="tab"]')).toHaveLength(3);
    expect(wrapper.get('[role="tabpanel"]').text()).toBe("Overview panel");
    expect(wrapper.find('[aria-selected="true"]').text()).toBe("Overview");
  });

  it("emits updates when selecting an enabled tab", async () => {
    const wrapper = mount(ArchTabs, {
      props: {
        items,
        modelValue: "overview"
      }
    });

    await wrapper.findAll('[role="tab"]')[1].trigger("click");

    expect(wrapper.emitted("update:modelValue")).toEqual([["activity"]]);
  });

  it("does not emit for disabled tabs", async () => {
    const wrapper = mount(ArchTabs, {
      props: {
        items,
        modelValue: "overview"
      }
    });

    await wrapper.findAll('[role="tab"]')[2].trigger("click");

    expect(wrapper.emitted("update:modelValue")).toBeUndefined();
  });

  it("supports arrow key navigation", async () => {
    const wrapper = mount(ArchTabs, {
      props: {
        items,
        modelValue: "overview"
      }
    });

    await wrapper.findAll('[role="tab"]')[0].trigger("keydown", { key: "ArrowRight" });

    expect(wrapper.emitted("update:modelValue")).toEqual([["activity"]]);
  });
});
