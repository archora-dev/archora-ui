import { mount } from "@vue/test-utils";
import { describe, it } from "vitest";
import { expectNoA11yViolations } from "../../test/axe";
import { ArchInput } from "./index";

describe("ArchInput a11y", () => {
  it("не имеет нарушений с доступным именем", async () => {
    const wrapper = mount(ArchInput, {
      attachTo: document.body,
      props: { ariaLabel: "Поиск по проектам", modelValue: "" }
    });

    await expectNoA11yViolations(wrapper.element);
    wrapper.unmount();
  });

  it("не имеет нарушений в невалидном состоянии с описанием", async () => {
    document.body.insertAdjacentHTML(
      "beforeend",
      '<span id="email-hint">Укажите корректный адрес</span>'
    );
    const wrapper = mount(ArchInput, {
      attachTo: document.body,
      props: {
        ariaLabel: "Email",
        invalid: true,
        ariaDescribedby: "email-hint",
        modelValue: "bad"
      }
    });

    await expectNoA11yViolations(wrapper.element);
    wrapper.unmount();
    document.getElementById("email-hint")?.remove();
  });
});
