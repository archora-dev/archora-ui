import { mount } from "@vue/test-utils";
import { nextTick } from "vue";
import { describe, expect, it } from "vitest";
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
      <ArchDialogTrigger>Open dialog</ArchDialogTrigger>
      <ArchDialogContent>
        <ArchDialogHeader>
          <ArchDialogTitle>Confirm deploy</ArchDialogTitle>
          <ArchDialogDescription>Deploy this release?</ArchDialogDescription>
        </ArchDialogHeader>
        <button class="confirm-button">Confirm</button>
        <button class="cancel-button">Cancel</button>
        <ArchDialogFooter>Footer</ArchDialogFooter>
      </ArchDialogContent>
    </ArchDialog>
  `,
  data() {
    return {
      open: false
    };
  }
};

describe("ArchDialog", () => {
  it("opens from trigger and renders dialog content", async () => {
    const wrapper = mount(DialogFixture, { attachTo: document.body });

    await wrapper.get(".arch-dialog__trigger").trigger("click");
    await nextTick();

    expect(document.body.querySelector('[role="dialog"]')).not.toBeNull();
    expect(document.body.textContent).toContain("Confirm deploy");

    wrapper.unmount();
  });

  it("closes on Escape", async () => {
    const wrapper = mount(DialogFixture, { attachTo: document.body });

    await wrapper.get(".arch-dialog__trigger").trigger("click");
    await nextTick();
    const dialog = document.body.querySelector<HTMLElement>('[role="dialog"]');
    dialog?.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true }));
    await nextTick();

    expect(document.body.querySelector('[role="dialog"]')).toBeNull();

    wrapper.unmount();
  });

  it("returns focus to the trigger after closing with Escape", async () => {
    const wrapper = mount(DialogFixture, { attachTo: document.body });

    const trigger = wrapper.get<HTMLElement>(".arch-dialog__trigger");
    await trigger.trigger("click");
    await nextTick();

    document.body
      .querySelector<HTMLElement>('[role="dialog"]')
      ?.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true }));
    await nextTick();

    expect(document.activeElement).toBe(trigger.element);

    wrapper.unmount();
  });

  it("closes on outside click", async () => {
    const wrapper = mount(DialogFixture, { attachTo: document.body });

    await wrapper.get(".arch-dialog__trigger").trigger("click");
    await nextTick();
    document.body
      .querySelector<HTMLElement>(".arch-dialog__overlay")
      ?.dispatchEvent(new MouseEvent("pointerdown", { bubbles: true }));
    await nextTick();

    expect(document.body.querySelector('[role="dialog"]')).toBeNull();

    wrapper.unmount();
  });

  it("keeps tab focus inside dialog content", async () => {
    const wrapper = mount(DialogFixture, { attachTo: document.body });

    await wrapper.get(".arch-dialog__trigger").trigger("click");
    await nextTick();

    const dialog = document.body.querySelector<HTMLElement>('[role="dialog"]');
    const confirmButton = document.body.querySelector<HTMLElement>(".confirm-button");
    const cancelButton = document.body.querySelector<HTMLElement>(".cancel-button");

    cancelButton?.focus();
    dialog?.dispatchEvent(new KeyboardEvent("keydown", { key: "Tab", bubbles: true }));
    expect(document.activeElement).toBe(confirmButton);

    confirmButton?.focus();
    dialog?.dispatchEvent(
      new KeyboardEvent("keydown", { key: "Tab", shiftKey: true, bubbles: true })
    );
    expect(document.activeElement).toBe(cancelButton);

    wrapper.unmount();
  });

  it("emits open updates", async () => {
    const wrapper = mount(ArchDialog, {
      props: {
        open: false
      },
      slots: {
        default: "<button>Content</button>"
      }
    });

    await wrapper.vm.$emit("update:open", true);

    expect(wrapper.emitted("update:open")).toEqual([[true]]);
  });
});
