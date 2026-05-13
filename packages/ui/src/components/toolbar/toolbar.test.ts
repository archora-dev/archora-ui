import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { ArchToolbar } from "./index";

describe("ArchToolbar", () => {
  it("renders toolbar semantics and configuration classes", () => {
    const wrapper = mount(ArchToolbar, {
      props: {
        orientation: "vertical",
        density: "compact",
        variant: "outlined",
        wrap: false,
        ariaLabel: "Table actions"
      },
      slots: {
        default: "<button>Export</button>"
      }
    });

    expect(wrapper.attributes("role")).toBe("toolbar");
    expect(wrapper.attributes("aria-orientation")).toBe("vertical");
    expect(wrapper.attributes("aria-label")).toBe("Table actions");
    expect(wrapper.classes()).toContain("arch-toolbar--compact");
    expect(wrapper.classes()).not.toContain("arch-toolbar--wrap");
    expect(wrapper.text()).toBe("Export");
  });
});
