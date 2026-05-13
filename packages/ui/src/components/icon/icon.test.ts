import { mount } from "@vue/test-utils";
import { defineComponent, h, markRaw } from "vue";
import { describe, expect, it } from "vitest";
import { ArchIcon } from "./index";

const TestIcon = defineComponent({
  props: {
    size: { type: Number, default: undefined },
    strokeWidth: { type: Number, default: undefined }
  },
  setup(props) {
    return () => h("svg", { "data-size": props.size, "data-stroke": props.strokeWidth });
  }
});

describe("ArchIcon", () => {
  it("renders a passed icon component with sizing props", () => {
    const wrapper = mount(ArchIcon, {
      props: {
        icon: markRaw(TestIcon),
        size: 20,
        strokeWidth: 1.5,
        label: "Search"
      }
    });

    expect(wrapper.get("span").attributes("role")).toBe("img");
    expect(wrapper.get("span").attributes("aria-label")).toBe("Search");
    expect(wrapper.get("svg").attributes("data-size")).toBe("20");
    expect(wrapper.get("svg").attributes("data-stroke")).toBe("1.5");
  });
});
