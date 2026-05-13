import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { ArchStepper } from "./index";

describe("ArchStepper", () => {
  it("renders steps with statuses and emits selectable step ids", async () => {
    const wrapper = mount(ArchStepper, {
      props: {
        modelValue: "review",
        clickable: true,
        steps: [
          { id: "plan", label: "Plan", status: "complete" },
          { id: "review", label: "Review", status: "current" },
          { id: "ship", label: "Ship", status: "pending" }
        ]
      }
    });

    await wrapper.get('[data-step-id="ship"]').trigger("click");

    expect(wrapper.classes()).toContain("arch-stepper--horizontal");
    expect(wrapper.get('[aria-current="step"]').text()).toContain("Review");
    expect(wrapper.emitted("update:modelValue")).toEqual([["ship"]]);
  });
});
