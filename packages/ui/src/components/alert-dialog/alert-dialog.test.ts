import { DOMWrapper, mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { ArchAlertDialog } from "./index";

describe("ArchAlertDialog", () => {
  function dialog() {
    return new DOMWrapper(document.body.querySelector('[role="alertdialog"]') as Element);
  }

  it("confirms, cancels, and supports destructive loading state", async () => {
    const wrapper = mount(ArchAlertDialog, {
      attachTo: document.body,
      props: {
        open: true,
        title: "Delete project",
        description: "This cannot be undone.",
        variant: "danger",
        loading: true,
        confirmLabel: "Delete"
      }
    });

    await dialog().get(".arch-alert-dialog__confirm").trigger("click");
    await dialog().get(".arch-alert-dialog__cancel").trigger("click");

    expect(dialog().attributes("aria-modal")).toBe("true");
    expect(dialog().text()).toContain("Delete project");
    expect(dialog().classes()).toContain("arch-alert-dialog__content--danger");
    expect(dialog().get(".arch-alert-dialog__confirm").attributes("aria-busy")).toBe("true");
    expect(wrapper.emitted("confirm")).toHaveLength(1);
    expect(wrapper.emitted("update:open")).toEqual([[false]]);

    wrapper.unmount();
  });
});
