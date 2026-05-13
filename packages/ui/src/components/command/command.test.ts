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
});
