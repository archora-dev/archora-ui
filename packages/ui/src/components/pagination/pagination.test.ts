import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { ArchPagination } from "./index";

describe("ArchPagination", () => {
  it("renders current page, ellipses, and size class", () => {
    const wrapper = mount(ArchPagination, {
      props: { page: 6, pageCount: 12, size: "lg" }
    });

    expect(wrapper.attributes("aria-label")).toBe("Pagination");
    expect(wrapper.classes()).toContain("arch-pagination--lg");
    expect(wrapper.find('[aria-current="page"]').text()).toBe("6");
    expect(wrapper.text()).toContain("…");
  });

  it("emits page changes and clamps edge controls", async () => {
    const wrapper = mount(ArchPagination, {
      props: { page: 1, pageCount: 3 }
    });

    expect(wrapper.find('button[aria-label="Previous"]').attributes("disabled")).toBeDefined();

    await wrapper.find('button[aria-label="Page 2"]').trigger("click");

    expect(wrapper.emitted("update:page")).toEqual([[2]]);
    expect(wrapper.emitted("change")).toEqual([[2]]);
  });
});
