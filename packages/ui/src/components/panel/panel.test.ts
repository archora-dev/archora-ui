import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { ArchPanel } from "./index";

describe("ArchPanel", () => {
  it("renders header, body, footer, and configuration classes", () => {
    const wrapper = mount(ArchPanel, {
      props: {
        title: "Inspector",
        padding: "lg",
        scrollable: true
      },
      slots: {
        default: "Details",
        footer: "Actions"
      }
    });

    expect(wrapper.text()).toContain("Inspector");
    expect(wrapper.text()).toContain("Details");
    expect(wrapper.text()).toContain("Actions");
    expect(wrapper.classes()).toContain("arch-panel--scrollable");
  });
});
