import { DOMWrapper, mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { ArchDatePicker } from "./index";

describe("ArchDatePicker", () => {
  function getBodyElement(selector: string) {
    return new DOMWrapper(Array.from(document.body.querySelectorAll(selector)).at(-1) as Element);
  }

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

    expect(document.body.querySelector('[role="grid"]')).not.toBeNull();
    expect(document.body.querySelectorAll('[role="gridcell"]').length).toBeGreaterThan(28);
  });

  it("uses accessible icon-only month navigation controls", async () => {
    const wrapper = mount(ArchDatePicker, {
      props: {
        modelValue: "2026-05-10"
      }
    });

    await wrapper.get("button").trigger("click");

    expect(getBodyElement('button[aria-label="Previous month"]').text()).toBe("");
    expect(getBodyElement('button[aria-label="Next month"]').text()).toBe("");
  });

  it("changes the visible calendar from month and year controls", async () => {
    const wrapper = mount(ArchDatePicker, {
      props: {
        modelValue: "2026-05-10"
      }
    });

    await wrapper.get("button").trigger("click");

    await getBodyElement('select[aria-label="Month"]').setValue("11");
    await getBodyElement('select[aria-label="Year"]').setValue("2027");

    expect(getBodyElement(".arch-date-picker__popover").attributes("aria-label")).toBe(
      "December 2027"
    );
    expect(document.body.querySelector('[data-date="2027-12-10"]')).not.toBeNull();
  });

  it("emits updates when selecting an enabled date", async () => {
    const wrapper = mount(ArchDatePicker, {
      props: {
        modelValue: "2026-05-10"
      }
    });

    await wrapper.get("button").trigger("click");
    await getBodyElement('[data-date="2026-05-15"]').trigger("click");

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
    await getBodyElement('[data-date="2026-05-01"]').trigger("click");

    expect(wrapper.emitted("update:modelValue")).toBeUndefined();
  });

  it("moves the active day with keyboard navigation and selects it with Enter", async () => {
    const wrapper = mount(ArchDatePicker, {
      props: {
        modelValue: "2026-05-10"
      }
    });

    await wrapper.get("button").trigger("click");
    const selectedDay = getBodyElement('[data-date="2026-05-10"]');

    expect(selectedDay.attributes("tabindex")).toBe("0");

    await selectedDay.trigger("keydown", { key: "ArrowRight" });

    const nextDay = getBodyElement('[data-date="2026-05-11"]');
    expect(nextDay.attributes("tabindex")).toBe("0");

    await nextDay.trigger("keydown", { key: "Enter" });

    expect(wrapper.emitted("update:modelValue")).toEqual([["2026-05-11"]]);
  });
});
