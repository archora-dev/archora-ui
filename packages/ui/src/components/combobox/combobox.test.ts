import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { ArchCombobox } from "./index";

const options = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "svelte", label: "Svelte" },
  { value: "legacy", label: "Legacy", disabled: true }
];

describe("ArchCombobox", () => {
  it("renders an accessible combobox input", () => {
    const wrapper = mount(ArchCombobox, {
      props: {
        options,
        modelValue: "vue"
      }
    });

    const input = wrapper.get('[role="combobox"]');

    expect(input.attributes("aria-haspopup")).toBe("listbox");
    expect((input.element as HTMLInputElement).value).toBe("Vue");
  });

  it("filters options by search text", async () => {
    const wrapper = mount(ArchCombobox, {
      props: { options }
    });

    await wrapper.get('[role="combobox"]').setValue("sv");

    expect(wrapper.find('[role="listbox"]').exists()).toBe(true);
    expect(wrapper.findAll('[role="option"]')).toHaveLength(1);
    expect(wrapper.text()).toContain("Svelte");
  });

  it("emits updates when selecting an enabled option", async () => {
    const wrapper = mount(ArchCombobox, {
      props: { options }
    });

    await wrapper.get('[role="combobox"]').trigger("focus");
    await wrapper.findAll('[role="option"]')[1].trigger("click");

    expect(wrapper.emitted("update:modelValue")).toEqual([["vue"]]);
    expect(wrapper.emitted("change")).toEqual([["vue"]]);
  });

  it("does not select disabled options", async () => {
    const wrapper = mount(ArchCombobox, {
      props: { options }
    });

    await wrapper.get('[role="combobox"]').trigger("focus");
    await wrapper.findAll('[role="option"]')[3].trigger("click");

    expect(wrapper.emitted("update:modelValue")).toBeUndefined();
  });

  it("closes when pointer starts outside", async () => {
    const wrapper = mount(ArchCombobox, {
      attachTo: document.body,
      props: { options }
    });

    await wrapper.get('[role="combobox"]').trigger("focus");
    document.body.dispatchEvent(new MouseEvent("pointerdown", { bubbles: true }));
    await wrapper.vm.$nextTick();

    expect(wrapper.find('[role="listbox"]').exists()).toBe(false);

    wrapper.unmount();
  });

  it("selects filtered option from keyboard navigation", async () => {
    const wrapper = mount(ArchCombobox, {
      props: { options }
    });

    const input = wrapper.get('[role="combobox"]');
    await input.setValue("sv");
    await input.trigger("keydown", { key: "ArrowDown" });

    expect(wrapper.findAll('[role="option"]')[0].attributes("data-active")).toBe("true");

    await input.trigger("keydown", { key: "Enter" });

    expect(wrapper.emitted("update:modelValue")).toEqual([["svelte"]]);
  });
});
