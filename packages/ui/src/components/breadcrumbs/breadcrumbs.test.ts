import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { ArchBreadcrumbs } from "./index";

describe("ArchBreadcrumbs", () => {
  it("renders links and current page semantics", () => {
    const wrapper = mount(ArchBreadcrumbs, {
      props: {
        items: [{ label: "Projects", href: "/projects" }, { label: "Console" }]
      }
    });

    expect(wrapper.get("nav").attributes("aria-label")).toBe("Breadcrumb");
    expect(wrapper.get("a").attributes("href")).toBe("/projects");
    expect(wrapper.get('[aria-current="page"]').text()).toBe("Console");
  });
});
