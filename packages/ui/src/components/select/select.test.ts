import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { ArchSelect } from "./index";

const options = [
  { value: "dev", label: "Development" },
  { value: "prod", label: "Production" },
  { value: "legacy", label: "Legacy", disabled: true }
];

describe("ArchSelect", () => {
  it("renders trigger with selected label", () => {
    const wrapper = mount(ArchSelect, {
      props: {
        options,
        modelValue: "prod"
      }
    });

    expect(wrapper.get("button").attributes("aria-haspopup")).toBe("listbox");
    expect(wrapper.text()).toContain("Production");
  });

  it("renders an SVG chevron instead of a text marker", () => {
    const wrapper = mount(ArchSelect, {
      props: {
        options,
        modelValue: "prod"
      }
    });

    expect(wrapper.find(".arch-select__chevron svg").exists()).toBe(true);
    expect(wrapper.get(".arch-select__chevron").text()).toBe("");
  });

  it("opens options from trigger", async () => {
    const wrapper = mount(ArchSelect, {
      props: { options }
    });

    await wrapper.get("button").trigger("click");

    expect(wrapper.find('[role="listbox"]').exists()).toBe(true);
    expect(wrapper.findAll('[role="option"]')).toHaveLength(3);
  });

  it("emits updates when selecting enabled option", async () => {
    const wrapper = mount(ArchSelect, {
      props: { options }
    });

    await wrapper.get("button").trigger("click");
    await wrapper.findAll('[role="option"]')[1].trigger("click");

    expect(wrapper.emitted("update:modelValue")).toEqual([["prod"]]);
  });

  it("does not emit disabled option", async () => {
    const wrapper = mount(ArchSelect, {
      props: { options }
    });

    await wrapper.get("button").trigger("click");
    await wrapper.findAll('[role="option"]')[2].trigger("click");

    expect(wrapper.emitted("update:modelValue")).toBeUndefined();
  });

  it("closes when pointer starts outside", async () => {
    const wrapper = mount(ArchSelect, {
      attachTo: document.body,
      props: { options }
    });

    await wrapper.get("button").trigger("click");
    document.body.dispatchEvent(new MouseEvent("pointerdown", { bubbles: true }));
    await wrapper.vm.$nextTick();

    expect(wrapper.find('[role="listbox"]').exists()).toBe(false);

    wrapper.unmount();
  });

  it("selects options from keyboard navigation", async () => {
    const wrapper = mount(ArchSelect, {
      props: { options }
    });

    const trigger = wrapper.get("button");
    await trigger.trigger("click");
    await trigger.trigger("keydown", { key: "ArrowDown" });

    expect(wrapper.findAll('[role="option"]')[0].attributes("data-active")).toBe("true");

    await trigger.trigger("keydown", { key: "Enter" });

    expect(wrapper.emitted("update:modelValue")).toEqual([["dev"]]);
  });
});
