import { DOMWrapper, mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { ArchDrawer } from "./index";

function getDialog() {
  return new DOMWrapper(document.body.querySelector('[role="dialog"]') as Element);
}

describe("ArchDrawer", () => {
  it("renders teleported dialog with title, description, side, and size", () => {
    const wrapper = mount(ArchDrawer, {
      props: {
        open: true,
        side: "left",
        size: "lg",
        title: "Project details",
        description: "Review deployment status."
      },
      slots: { default: "<button>Focus target</button>" }
    });

    expect(document.body.querySelector(".arch-drawer--left")).not.toBeNull();
    expect(document.body.querySelector(".arch-drawer--lg")).not.toBeNull();
    expect(getDialog().text()).toContain("Project details");
    expect(getDialog().text()).toContain("Review deployment status.");

    wrapper.unmount();
  });

  it("emits close from overlay and Escape", async () => {
    const wrapper = mount(ArchDrawer, {
      props: { open: true, title: "Details" }
    });

    await new DOMWrapper(document.body.querySelector(".arch-drawer__overlay") as Element).trigger(
      "pointerdown"
    );
    await getDialog().trigger("keydown", { key: "Escape" });

    expect(wrapper.emitted("update:open")).toEqual([[false], [false]]);

    wrapper.unmount();
  });

  it("supports non-modal, sticky footer, and resizable panel modes", () => {
    const wrapper = mount(ArchDrawer, {
      attachTo: document.body,
      props: {
        open: true,
        modal: false,
        stickyFooter: true,
        resizable: true
      },
      slots: {
        footer: "Actions"
      }
    });

    const drawer = document.body.querySelector(".arch-drawer") as HTMLElement;
    const panel = document.body.querySelector(".arch-drawer__panel") as HTMLElement;

    expect(drawer.classList.contains("arch-drawer--non-modal")).toBe(true);
    expect(drawer.classList.contains("arch-drawer--sticky-footer")).toBe(true);
    expect(drawer.classList.contains("arch-drawer--resizable")).toBe(true);
    expect(panel.getAttribute("aria-modal")).toBe("false");

    wrapper.unmount();
  });
});
