import { mount } from "@vue/test-utils";
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
  it("opens from trigger", async () => {
    const wrapper = mount(DropdownFixture, { attachTo: document.body });

    await wrapper.get(".arch-dropdown__trigger").trigger("click");

    expect(wrapper.find('[role="menu"]').exists()).toBe(true);
    expect(wrapper.text()).toContain("Edit");

    wrapper.unmount();
  });

  it("closes on Escape", async () => {
    const wrapper = mount(DropdownFixture, { attachTo: document.body });

    await wrapper.get(".arch-dropdown__trigger").trigger("click");
    await wrapper.get('[role="menu"]').trigger("keydown", { key: "Escape" });

    expect(wrapper.find('[role="menu"]').exists()).toBe(false);

    wrapper.unmount();
  });

  it("moves focus between enabled menu items with arrow keys", async () => {
    const wrapper = mount(DropdownFixture, { attachTo: document.body });

    await wrapper.get(".arch-dropdown__trigger").trigger("click");
    await wrapper.get('[role="menu"]').trigger("keydown", { key: "ArrowDown" });

    expect(document.activeElement).toBe(wrapper.findAll('[role="menuitem"]')[0].element);

    await wrapper.get('[role="menu"]').trigger("keydown", { key: "ArrowDown" });

    expect(document.activeElement).toBe(wrapper.findAll('[role="menuitem"]')[1].element);

    wrapper.unmount();
  });

  it("opens from trigger ArrowDown and focuses the first enabled menu item", async () => {
    const wrapper = mount(DropdownFixture, { attachTo: document.body });

    const trigger = wrapper.get(".arch-dropdown__trigger");
    await trigger.trigger("keydown", { key: "ArrowDown" });

    expect(wrapper.find('[role="menu"]').exists()).toBe(true);
    expect(document.activeElement).toBe(wrapper.findAll('[role="menuitem"]')[0].element);

    wrapper.unmount();
  });

  it("emits select when item is clicked", async () => {
    const wrapper = mount(DropdownFixture, { attachTo: document.body });

    await wrapper.get(".arch-dropdown__trigger").trigger("click");
    await wrapper.findAll('[role="menuitem"]')[0].trigger("click");

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

    expect(wrapper.find('[role="menu"]').exists()).toBe(false);

    wrapper.unmount();
  });
});
