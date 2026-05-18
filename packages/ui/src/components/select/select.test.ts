import { DOMWrapper, mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { ArchSelect } from "./index";

const options = [
  { value: "dev", label: "Development" },
  { value: "prod", label: "Production" },
  { value: "legacy", label: "Legacy", disabled: true }
];

describe("ArchSelect", () => {
  function getOptions() {
    const listbox = Array.from(document.body.querySelectorAll('[role="listbox"]')).at(-1);

    return Array.from(listbox?.querySelectorAll('[role="option"]') ?? []).map(
      (option) => new DOMWrapper(option as Element)
    );
  }

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

  it("supports full width layout and stable test hooks", async () => {
    const wrapper = mount(ArchSelect, {
      props: {
        options,
        modelValue: "prod",
        fullWidth: true,
        dataTest: "environment-select"
      }
    });

    expect(wrapper.classes()).toContain("arch-select--full");
    expect(wrapper.get('[data-test="environment-select"]').text()).toContain("Production");

    await wrapper.get('[data-test="environment-select"]').trigger("click");

    expect(document.body.querySelector('[data-test="environment-select-menu"]')).not.toBeNull();
    expect(document.body.querySelector('[data-test="environment-select-option-prod"]')).not.toBeNull();
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

    expect(document.body.querySelector('[role="listbox"]')).not.toBeNull();
    expect(getOptions()).toHaveLength(3);
  });

  it("emits updates when selecting enabled option", async () => {
    const wrapper = mount(ArchSelect, {
      props: { options }
    });

    await wrapper.get("button").trigger("click");
    await getOptions()[1].trigger("click");

    expect(wrapper.emitted("update:modelValue")).toEqual([["prod"]]);
  });

  it("does not emit disabled option", async () => {
    const wrapper = mount(ArchSelect, {
      props: { options }
    });

    await wrapper.get("button").trigger("click");
    await getOptions()[2].trigger("click");

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

    expect(document.body.querySelector('[role="listbox"]')).toBeNull();

    wrapper.unmount();
  });

  it("selects options from keyboard navigation", async () => {
    const wrapper = mount(ArchSelect, {
      props: { options }
    });

    const trigger = wrapper.get("button");
    await trigger.trigger("click");
    await trigger.trigger("keydown", { key: "ArrowDown" });

    expect(getOptions()[0].attributes("data-active")).toBe("true");

    await trigger.trigger("keydown", { key: "Enter" });

    expect(wrapper.emitted("update:modelValue")).toEqual([["dev"]]);
  });

  it("opens from keyboard and starts navigation from the selected option", async () => {
    const wrapper = mount(ArchSelect, {
      props: {
        options,
        modelValue: "dev"
      }
    });

    await wrapper.get("button").trigger("keydown", { key: "ArrowDown" });

    expect(getOptions()[1].attributes("data-active")).toBe("true");

    await wrapper.get("button").trigger("keydown", { key: "Enter" });

    expect(wrapper.emitted("update:modelValue")).toEqual([["prod"]]);
  });

  it("opens from Enter and Space keys", async () => {
    const enter = mount(ArchSelect, {
      props: { options }
    });

    await enter.get("button").trigger("keydown", { key: "Enter" });
    expect(document.body.querySelector('[role="listbox"]')).not.toBeNull();
    enter.unmount();

    const space = mount(ArchSelect, {
      props: { options }
    });

    await space.get("button").trigger("keydown", { key: " " });
    expect(document.body.querySelector('[role="listbox"]')).not.toBeNull();
    space.unmount();
  });

  it("renders descriptions and custom option content", async () => {
    const wrapper = mount(ArchSelect, {
      props: {
        options: [{ value: "prod", label: "Production", description: "Customer traffic" }]
      },
      slots: {
        option:
          '<template #option="{ option }"><strong>{{ option.label }}</strong><small>{{ option.description }}</small></template>'
      }
    });

    await wrapper.get("button").trigger("click");

    expect(document.body.textContent).toContain("Production");
    expect(document.body.textContent).toContain("Customer traffic");
  });

  it("renders loading, error, and empty states", async () => {
    const loading = mount(ArchSelect, {
      props: {
        options,
        loading: true,
        loadingText: "Loading environments"
      }
    });

    await loading.get("button").trigger("click");
    expect(document.body.querySelector('[role="status"]')?.textContent).toContain(
      "Loading environments"
    );
    loading.unmount();

    const error = mount(ArchSelect, {
      props: {
        options,
        errorText: "Environments unavailable"
      }
    });

    await error.get("button").trigger("click");
    expect(document.body.querySelector('[role="alert"]')?.textContent).toContain(
      "Environments unavailable"
    );
    error.unmount();

    const empty = mount(ArchSelect, {
      props: {
        options: [],
        emptyText: "No environments"
      }
    });

    await empty.get("button").trigger("click");
    expect(document.body.querySelector('[role="status"]')?.textContent).toContain(
      "No environments"
    );
  });

  it("clears selection and emits open close events", async () => {
    const wrapper = mount(ArchSelect, {
      props: {
        options,
        modelValue: "prod",
        clearable: true
      }
    });

    await wrapper.get("button").trigger("click");
    await wrapper.get('[aria-label="Clear selection"]').trigger("click");

    expect(wrapper.emitted("open")).toEqual([[]]);
    expect(wrapper.emitted("update:modelValue")).toEqual([[""]]);
    expect(wrapper.emitted("clear")).toEqual([[]]);
    expect(wrapper.emitted("close")).toEqual([[]]);
  });
});
