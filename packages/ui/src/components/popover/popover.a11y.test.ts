import { mount } from "@vue/test-utils";
import { nextTick } from "vue";
import { describe, it } from "vitest";
import { expectNoA11yViolations } from "../../test/axe";
import { ArchPopover } from "./index";

const PopoverFixture = {
  components: { ArchPopover },
  template: `
    <ArchPopover>
      <template #trigger>
        <button type="button">Фильтры</button>
      </template>
      <nav aria-label="Быстрые фильтры">
        <button type="button">Только открытые</button>
      </nav>
    </ArchPopover>
  `
};

describe("ArchPopover a11y", () => {
  it("не имеет нарушений в открытом состоянии", async () => {
    const wrapper = mount(PopoverFixture, { attachTo: document.body });

    await wrapper.get(".arch-popover__trigger").trigger("click");
    await nextTick();

    const content = document.body.querySelector<HTMLElement>(".arch-popover__content");
    await expectNoA11yViolations(content ?? document.body);

    wrapper.unmount();
  });
});
