import { mount } from "@vue/test-utils";
import { defineComponent, h, markRaw } from "vue";
import { describe, expect, it } from "vitest";
import { ArchIconButton } from "./index";

const TestIcon = defineComponent({
  setup() {
    return () => h("svg");
  }
});

describe("ArchIconButton", () => {
  it("renders an accessible icon-only button and emits clicks", async () => {
    const wrapper = mount(ArchIconButton, {
      props: {
        icon: markRaw(TestIcon),
        label: "Open settings",
        variant: "secondary",
        size: "lg"
      }
    });

    await wrapper.get("button").trigger("click");

    expect(wrapper.get("button").attributes("aria-label")).toBe("Open settings");
    expect(wrapper.classes()).toContain("arch-icon-button--secondary");
    expect(wrapper.classes()).toContain("arch-icon-button--lg");
    expect(wrapper.emitted("click")).toHaveLength(1);
  });
});
