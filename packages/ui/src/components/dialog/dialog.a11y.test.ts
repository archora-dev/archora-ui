import { mount } from "@vue/test-utils";
import { nextTick } from "vue";
import { describe, it } from "vitest";
import { expectNoA11yViolations } from "../../test/axe";
import {
  ArchDialog,
  ArchDialogContent,
  ArchDialogDescription,
  ArchDialogFooter,
  ArchDialogHeader,
  ArchDialogTitle,
  ArchDialogTrigger
} from "./index";

const DialogFixture = {
  components: {
    ArchDialog,
    ArchDialogContent,
    ArchDialogDescription,
    ArchDialogFooter,
    ArchDialogHeader,
    ArchDialogTitle,
    ArchDialogTrigger
  },
  template: `
    <ArchDialog v-model:open="open">
      <ArchDialogTrigger>Открыть диалог</ArchDialogTrigger>
      <ArchDialogContent>
        <ArchDialogHeader>
          <ArchDialogTitle>Подтвердить деплой</ArchDialogTitle>
          <ArchDialogDescription>Выкатить этот релиз?</ArchDialogDescription>
        </ArchDialogHeader>
        <ArchDialogFooter>
          <button type="button">Отмена</button>
          <button type="button">Выкатить</button>
        </ArchDialogFooter>
      </ArchDialogContent>
    </ArchDialog>
  `,
  data() {
    return { open: false };
  }
};

describe("ArchDialog a11y", () => {
  it("не имеет нарушений в открытом состоянии", async () => {
    const wrapper = mount(DialogFixture, { attachTo: document.body });

    await wrapper.get(".arch-dialog__trigger").trigger("click");
    await nextTick();

    const dialog = document.body.querySelector<HTMLElement>('[role="dialog"]');
    await expectNoA11yViolations(dialog ?? document.body);

    wrapper.unmount();
  });
});
