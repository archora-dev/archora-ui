import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { ArchCommand } from "./index";

const items = [
  { value: "open", label: "Open file", description: "Jump to a file" },
  { value: "settings", label: "Open settings", description: "Edit preferences" },
  { value: "archive", label: "Archive project", disabled: true }
];

describe("ArchCommand", () => {
  it("renders search input and command options", () => {
    const wrapper = mount(ArchCommand, {
      props: { items }
    });

    expect(wrapper.get('[role="searchbox"]').attributes("aria-controls")).toBeTruthy();
    expect(wrapper.findAll('[role="option"]')).toHaveLength(3);
    expect(wrapper.text()).toContain("Jump to a file");
  });

  it("filters commands by search text", async () => {
    const wrapper = mount(ArchCommand, {
      props: { items }
    });

    await wrapper.get('[role="searchbox"]').setValue("settings");

    expect(wrapper.findAll('[role="option"]')).toHaveLength(1);
    expect(wrapper.text()).toContain("Open settings");
  });

  it("emits selected command value", async () => {
    const wrapper = mount(ArchCommand, {
      props: { items }
    });

    await wrapper.findAll('[role="option"]')[0].trigger("click");

    expect(wrapper.emitted("update:modelValue")).toEqual([["open"]]);
    expect(wrapper.emitted("select")).toEqual([["open"]]);
  });

  it("does not emit disabled command values", async () => {
    const wrapper = mount(ArchCommand, {
      props: { items }
    });

    await wrapper.findAll('[role="option"]')[2].trigger("click");

    expect(wrapper.emitted("update:modelValue")).toBeUndefined();
  });

  it("renders an empty state when no command matches", async () => {
    const wrapper = mount(ArchCommand, {
      props: { items, emptyText: "No commands found" }
    });

    await wrapper.get('[role="searchbox"]').setValue("deploy");

    expect(wrapper.find('[role="status"]').text()).toBe("No commands found");
  });

  it("selects commands from keyboard navigation", async () => {
    const wrapper = mount(ArchCommand, {
      props: { items }
    });

    const input = wrapper.get('[role="searchbox"]');
    await input.trigger("keydown", { key: "ArrowDown" });

    expect(wrapper.findAll('[role="option"]')[0].attributes("data-active")).toBe("true");

    await input.trigger("keydown", { key: "Enter" });

    expect(wrapper.emitted("select")).toEqual([["open"]]);
  });

  it("renders loading and error states before items", () => {
    const loading = mount(ArchCommand, {
      props: {
        items,
        loading: true,
        loadingText: "Loading commands"
      }
    });

    expect(loading.find('[role="status"]').text()).toBe("Loading commands");
    expect(loading.findAll('[role="option"]')).toHaveLength(0);

    const error = mount(ArchCommand, {
      props: {
        items,
        errorText: "Commands unavailable"
      }
    });

    expect(error.find('[role="alert"]').text()).toBe("Commands unavailable");
    expect(error.findAll('[role="option"]')).toHaveLength(0);
  });

  it("renders custom item and state slots", async () => {
    const wrapper = mount(ArchCommand, {
      props: {
        items,
        emptyText: "No actions"
      },
      slots: {
        item: '<template #item="{ item }"><strong>{{ item.label }}</strong></template>',
        empty: "<span>No matching actions</span>"
      }
    });

    expect(wrapper.text()).toContain("Open file");

    await wrapper.get('[role="searchbox"]').setValue("deploy");

    expect(wrapper.find('[role="status"]').text()).toBe("No matching actions");
  });

  it("clears search and selected value", async () => {
    const wrapper = mount(ArchCommand, {
      props: {
        items,
        modelValue: "open",
        searchValue: "open",
        clearable: true
      }
    });

    await wrapper.get('[aria-label="Clear command search"]').trigger("click");

    expect(wrapper.emitted("update:modelValue")).toEqual([[""]]);
    expect(wrapper.emitted("update:searchValue")).toEqual([[""]]);
    expect(wrapper.emitted("clear")).toEqual([[]]);
  });
});
