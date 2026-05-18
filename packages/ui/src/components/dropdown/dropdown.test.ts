import { DOMWrapper, mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { ArchDropdown, ArchDropdownContent, ArchDropdownItem, ArchDropdownTrigger } from "./index";

const DropdownFixture = {
  components: {
    ArchDropdown,
    ArchDropdownContent,
    ArchDropdownItem,
    ArchDropdownTrigger
  },
  template: `
    <ArchDropdown>
      <ArchDropdownTrigger>Actions</ArchDropdownTrigger>
      <ArchDropdownContent>
        <ArchDropdownItem value="edit">Edit</ArchDropdownItem>
        <ArchDropdownItem value="delete">Delete</ArchDropdownItem>
      </ArchDropdownContent>
    </ArchDropdown>
  `
};

describe("ArchDropdown", () => {
  function getMenu() {
    return new DOMWrapper(
      Array.from(document.body.querySelectorAll('[role="menu"]')).at(-1) as Element
    );
  }

  function getMenuItems() {
    return Array.from(getMenu().element.querySelectorAll('[role="menuitem"]')).map(
      (item) => new DOMWrapper(item as Element)
    );
  }

  it("opens from trigger", async () => {
    const wrapper = mount(DropdownFixture, { attachTo: document.body });

    await wrapper.get(".arch-dropdown__trigger").trigger("click");

    expect(document.body.querySelector('[role="menu"]')).not.toBeNull();
    expect(document.body.textContent).toContain("Edit");

    wrapper.unmount();
  });

  it("closes on Escape", async () => {
    const wrapper = mount(DropdownFixture, { attachTo: document.body });

    await wrapper.get(".arch-dropdown__trigger").trigger("click");
    await getMenu().trigger("keydown", { key: "Escape" });

    expect(document.body.querySelector('[role="menu"]')).toBeNull();

    wrapper.unmount();
  });

  it("moves focus between enabled menu items with arrow keys", async () => {
    const wrapper = mount(DropdownFixture, { attachTo: document.body });

    await wrapper.get(".arch-dropdown__trigger").trigger("click");
    await getMenu().trigger("keydown", { key: "ArrowDown" });

    expect(document.activeElement).toBe(getMenuItems()[0].element);

    await getMenu().trigger("keydown", { key: "ArrowDown" });

    expect(document.activeElement).toBe(getMenuItems()[1].element);

    wrapper.unmount();
  });

  it("opens from trigger ArrowDown and focuses the first enabled menu item", async () => {
    const wrapper = mount(DropdownFixture, { attachTo: document.body });

    const trigger = wrapper.get(".arch-dropdown__trigger");
    await trigger.trigger("keydown", { key: "ArrowDown" });
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(document.body.querySelector('[role="menu"]')).not.toBeNull();
    expect(document.activeElement).toBe(getMenuItems()[0].element);

    wrapper.unmount();
  });

  it("emits select when item is clicked", async () => {
    const wrapper = mount(DropdownFixture, { attachTo: document.body });

    await wrapper.get(".arch-dropdown__trigger").trigger("click");
    await getMenuItems()[0].trigger("click");

    expect(wrapper.findComponent(ArchDropdown).emitted("select")).toEqual([["edit"]]);

    wrapper.unmount();
  });

  it("does not bubble trigger clicks to parent row handlers", async () => {
    const ParentFixture = {
      components: {
        ArchDropdown,
        ArchDropdownContent,
        ArchDropdownItem,
        ArchDropdownTrigger
      },
      template: `
        <div data-parent @click="clicked += 1">
          <ArchDropdown>
            <ArchDropdownTrigger>Actions</ArchDropdownTrigger>
            <ArchDropdownContent>
              <ArchDropdownItem value="edit">Edit</ArchDropdownItem>
            </ArchDropdownContent>
          </ArchDropdown>
        </div>
      `,
      data() {
        return { clicked: 0 };
      }
    };
    const wrapper = mount(ParentFixture, { attachTo: document.body });

    await wrapper.get(".arch-dropdown__trigger").trigger("click");

    expect(wrapper.vm.clicked).toBe(0);

    wrapper.unmount();
  });

  it("closes when pointer starts outside", async () => {
    const wrapper = mount(DropdownFixture, { attachTo: document.body });

    await wrapper.get(".arch-dropdown__trigger").trigger("click");
    document.body.dispatchEvent(new MouseEvent("pointerdown", { bubbles: true }));
    await wrapper.vm.$nextTick();

    expect(document.body.querySelector('[role="menu"]')).toBeNull();

    wrapper.unmount();
  });

  it("emits open and close events", async () => {
    const wrapper = mount(DropdownFixture, { attachTo: document.body });

    await wrapper.get(".arch-dropdown__trigger").trigger("click");
    await getMenu().trigger("keydown", { key: "Escape" });

    expect(wrapper.findComponent(ArchDropdown).emitted("open")).toEqual([[]]);
    expect(wrapper.findComponent(ArchDropdown).emitted("close")).toEqual([[]]);

    wrapper.unmount();
  });

  it("renders item descriptions and danger tone", async () => {
    const Fixture = {
      components: {
        ArchDropdown,
        ArchDropdownContent,
        ArchDropdownItem,
        ArchDropdownTrigger
      },
      template: `
        <ArchDropdown>
          <ArchDropdownTrigger>Actions</ArchDropdownTrigger>
          <ArchDropdownContent>
            <ArchDropdownItem value="delete" description="Remove service" tone="danger">Delete</ArchDropdownItem>
          </ArchDropdownContent>
        </ArchDropdown>
      `
    };
    const wrapper = mount(Fixture, { attachTo: document.body });

    await wrapper.get(".arch-dropdown__trigger").trigger("click");

    expect(document.body.textContent).toContain("Remove service");
    expect(getMenuItems()[0].classes()).toContain("arch-dropdown__item--danger");

    wrapper.unmount();
  });
});
