import { mount } from "@vue/test-utils";
import { describe, it } from "vitest";
import { expectNoA11yViolations } from "../../test/axe";
import { ArchCheckbox } from "./index";

describe("ArchCheckbox a11y", () => {
  it("не имеет нарушений с текстовой меткой", async () => {
    const wrapper = mount(ArchCheckbox, {
      attachTo: document.body,
      props: { label: "Присылать уведомления", modelValue: false }
    });

    await expectNoA11yViolations(wrapper.element);
    wrapper.unmount();
  });

  it("не имеет нарушений в indeterminate-состоянии", async () => {
    const wrapper = mount(ArchCheckbox, {
      attachTo: document.body,
      props: { label: "Выбрать всё", indeterminate: true, modelValue: false }
    });

    await expectNoA11yViolations(wrapper.element);
    wrapper.unmount();
  });
});
