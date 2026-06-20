import { mount } from "@vue/test-utils";
import { describe, it } from "vitest";
import { expectNoA11yViolations } from "../../test/axe";
import { ArchToast } from "./index";

describe("ArchToast a11y", () => {
  it("не имеет нарушений с заголовком, описанием и действием", async () => {
    const wrapper = mount(ArchToast, {
      attachTo: document.body,
      props: {
        toast: {
          id: "1",
          title: "Сохранено",
          description: "Настройки проекта обновлены.",
          variant: "success",
          actions: [{ label: "Отменить", onClick: () => {} }]
        }
      }
    });

    await expectNoA11yViolations(wrapper.element);
    wrapper.unmount();
  });

  it("не имеет нарушений для danger-варианта (role=alert)", async () => {
    const wrapper = mount(ArchToast, {
      attachTo: document.body,
      props: {
        toast: { id: "1", title: "Не удалось сохранить", variant: "danger" }
      }
    });

    await expectNoA11yViolations(wrapper.element);
    wrapper.unmount();
  });
});
