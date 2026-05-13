import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { ArchEmptyState } from "./index";

describe("ArchEmptyState", () => {
  it("renders title, description, slots, and configuration classes", () => {
    const wrapper = mount(ArchEmptyState, {
      props: {
        title: "No projects",
        description: "Create a project to start tracking deployments.",
        align: "start",
        size: "lg",
        variant: "outlined"
      },
      slots: {
        icon: "<span>0</span>",
        actions: "<button>Create</button>"
      }
    });

    expect(wrapper.classes()).toContain("arch-empty-state--start");
    expect(wrapper.classes()).toContain("arch-empty-state--lg");
    expect(wrapper.classes()).toContain("arch-empty-state--outlined");
    expect(wrapper.text()).toContain("No projects");
    expect(wrapper.text()).toContain("Create a project");
    expect(wrapper.find(".arch-empty-state__actions button").exists()).toBe(true);
  });
});
