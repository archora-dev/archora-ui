import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { expectNoA11yViolations } from "../../test/axe";
import { ArchButton } from "./index";

describe("ArchButton a11y", () => {
  it("не имеет нарушений в обычном состоянии", async () => {
    const wrapper = mount(ArchButton, {
      attachTo: document.body,
      slots: { default: "Сохранить" }
    });

    await expectNoA11yViolations(wrapper.element);
    wrapper.unmount();
  });

  it("не имеет нарушений в состоянии loading", async () => {
    const wrapper = mount(ArchButton, {
      attachTo: document.body,
      props: { loading: true },
      slots: { default: "Сохранить" }
    });

    expect(wrapper.attributes("aria-busy")).toBe("true");
    await expectNoA11yViolations(wrapper.element);
    wrapper.unmount();
  });
});
