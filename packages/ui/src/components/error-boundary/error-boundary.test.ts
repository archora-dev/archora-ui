import { mount } from "@vue/test-utils";
import { defineComponent, h, nextTick } from "vue";
import { describe, expect, it } from "vitest";
import { ArchErrorBoundary } from "./index";

const BrokenChild = defineComponent({
  setup() {
    throw new Error("Render failed");
  },
  render: () => h("div")
});

describe("ArchErrorBoundary", () => {
  it("renders fallback and can retry", async () => {
    const wrapper = mount(ArchErrorBoundary, {
      props: { fallbackTitle: "Something broke" },
      slots: { default: h(BrokenChild) }
    });
    await nextTick();

    expect(wrapper.find('[role="alert"]').exists()).toBe(true);
    expect(wrapper.text()).toContain("Something broke");
    expect(wrapper.text()).toContain("Render failed");

    await wrapper.get("button").trigger("click");
    expect(wrapper.emitted("retry")).toHaveLength(1);
  });
});
