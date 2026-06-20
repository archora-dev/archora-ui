import { mount } from "@vue/test-utils";
import { describe, it } from "vitest";
import { expectNoA11yViolations } from "../../test/axe";
import { ArchCard } from "./index";

describe("ArchCard a11y", () => {
  it("не имеет нарушений со слотами header/body/footer", async () => {
    const wrapper = mount(ArchCard, {
      attachTo: document.body,
      props: { as: "section" },
      slots: {
        header: "<h2>Релизы</h2>",
        default: "Последний деплой прошёл успешно.",
        footer: '<a href="#log">Открыть журнал</a>'
      }
    });

    await expectNoA11yViolations(wrapper.element);
    wrapper.unmount();
  });
});
