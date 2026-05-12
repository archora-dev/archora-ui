import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { ArchDatePicker } from "./index";

describe("ArchDatePicker", () => {
  it("renders a human-readable selected date in the trigger", () => {
    const wrapper = mount(ArchDatePicker, {
      props: {
        modelValue: "2026-05-10"
      }
    });

    expect(wrapper.get("button").text()).toContain("May 10, 2026");
  });

  it("opens a calendar grid", async () => {
    const wrapper = mount(ArchDatePicker, {
      props: {
        modelValue: "2026-05-10"
      }
    });

    await wrapper.get("button").trigger("click");

    expect(wrapper.find('[role="grid"]').exists()).toBe(true);
    expect(wrapper.findAll('[role="gridcell"]').length).toBeGreaterThan(28);
  });

  it("uses accessible icon-only month navigation controls", async () => {
    const wrapper = mount(ArchDatePicker, {
      props: {
        modelValue: "2026-05-10"
      }
    });

    await wrapper.get("button").trigger("click");

    expect(wrapper.get('button[aria-label="Previous month"]').text()).toBe("");
    expect(wrapper.get('button[aria-label="Next month"]').text()).toBe("");
  });

  it("emits updates when selecting an enabled date", async () => {
    const wrapper = mount(ArchDatePicker, {
      props: {
        modelValue: "2026-05-10"
      }
    });

    await wrapper.get("button").trigger("click");
    await wrapper.find('[data-date="2026-05-15"]').trigger("click");

    expect(wrapper.emitted("update:modelValue")).toEqual([["2026-05-15"]]);
    expect(wrapper.emitted("change")).toEqual([["2026-05-15"]]);
  });

  it("does not emit dates outside min and max", async () => {
    const wrapper = mount(ArchDatePicker, {
      props: {
        modelValue: "2026-05-10",
        min: "2026-05-10",
        max: "2026-05-20"
      }
    });

    await wrapper.get("button").trigger("click");
    await wrapper.find('[data-date="2026-05-01"]').trigger("click");

    expect(wrapper.emitted("update:modelValue")).toBeUndefined();
  });

  it("moves the active day with keyboard navigation and selects it with Enter", async () => {
    const wrapper = mount(ArchDatePicker, {
      props: {
        modelValue: "2026-05-10"
      }
    });

    await wrapper.get("button").trigger("click");
    const selectedDay = wrapper.find('[data-date="2026-05-10"]');

    expect(selectedDay.attributes("tabindex")).toBe("0");

    await selectedDay.trigger("keydown", { key: "ArrowRight" });

    const nextDay = wrapper.find('[data-date="2026-05-11"]');
    expect(nextDay.attributes("tabindex")).toBe("0");

    await nextDay.trigger("keydown", { key: "Enter" });

    expect(wrapper.emitted("update:modelValue")).toEqual([["2026-05-11"]]);
  });
});
