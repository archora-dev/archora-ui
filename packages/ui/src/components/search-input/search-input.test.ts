import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { ArchSearchInput } from "./index";

describe("ArchSearchInput", () => {
  it("emits updates, clears, and exposes focus", async () => {
    const wrapper = mount(ArchSearchInput, {
      props: {
        modelValue: "api",
        placeholder: "Search modules"
      },
      attachTo: document.body
    });

    await wrapper.get("input").setValue("billing");
    await wrapper.get(".arch-search-input__clear").trigger("click");
    wrapper.vm.focus();

    expect(wrapper.emitted("update:modelValue")).toEqual([["billing"], [""]]);
    expect(document.activeElement).toBe(wrapper.get("input").element);

    wrapper.unmount();
  });
});
