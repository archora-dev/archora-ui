import { mount } from "@vue/test-utils";
import { describe, it } from "vitest";
import { expectNoA11yViolations } from "../../test/axe";
import { ArchProgressBar } from "./index";

describe("ArchProgressBar a11y", () => {
  it("не имеет нарушений с доступным именем и значением", async () => {
    const wrapper = mount(ArchProgressBar, {
      attachTo: document.body,
      props: { value: 40, max: 100 },
      attrs: { "aria-label": "Загрузка отчёта" }
    });

    await expectNoA11yViolations(wrapper.element);
    wrapper.unmount();
  });
});
