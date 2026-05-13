import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { ArchStatusState } from "./index";

describe("ArchStatusState", () => {
  it("renders semantic state content and actions", () => {
    const wrapper = mount(ArchStatusState, {
      props: {
        variant: "error",
        title: "Scan failed",
        description: "Retry the scan."
      },
      slots: {
        actions: "<button>Retry</button>"
      }
    });

    expect(wrapper.classes()).toContain("arch-status-state--error");
    expect(wrapper.attributes("role")).toBe("alert");
    expect(wrapper.text()).toContain("Scan failed");
    expect(wrapper.text()).toContain("Retry");
  });
});
