import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { ArchAlert } from "./index";

describe("ArchAlert", () => {
  it("renders alert role and default content", () => {
    const wrapper = mount(ArchAlert, {
      slots: {
        default: "Deployment failed"
      }
    });

    expect(wrapper.attributes("role")).toBe("status");
    expect(wrapper.classes()).toContain("arch-alert");
    expect(wrapper.classes()).toContain("arch-alert--info");
    expect(wrapper.text()).toContain("Deployment failed");
  });

  it("uses alert role for danger variant", () => {
    const wrapper = mount(ArchAlert, {
      props: {
        variant: "danger",
        title: "Build failed"
      },
      slots: {
        default: "Check the latest run."
      }
    });

    expect(wrapper.attributes("role")).toBe("alert");
    expect(wrapper.classes()).toContain("arch-alert--danger");
    expect(wrapper.find(".arch-alert__title").text()).toBe("Build failed");
  });
});
