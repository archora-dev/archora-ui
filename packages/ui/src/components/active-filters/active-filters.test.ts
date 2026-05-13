import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { ArchActiveFilters } from "./index";

describe("ArchActiveFilters", () => {
  it("renders removable filters and a reset action", async () => {
    const wrapper = mount(ArchActiveFilters, {
      props: {
        filters: [{ id: "status", label: "Status", value: "Healthy" }]
      }
    });

    await wrapper.get('[aria-label="Remove Status filter"]').trigger("click");
    await wrapper.get('[aria-label="Reset filters"]').trigger("click");

    expect(wrapper.get(".arch-active-filters__text").text()).toBe("Status: Healthy");
    expect(wrapper.emitted("remove")).toEqual([["status"]]);
    expect(wrapper.emitted("reset")).toHaveLength(1);
  });
});
