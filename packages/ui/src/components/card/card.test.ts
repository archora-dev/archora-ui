import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { ArchCard } from "./index";

describe("ArchCard", () => {
  it("renders default slot as an article", () => {
    const wrapper = mount(ArchCard, {
      slots: {
        default: "Project summary"
      }
    });

    expect(wrapper.element.tagName).toBe("ARTICLE");
    expect(wrapper.classes()).toContain("arch-card");
    expect(wrapper.classes()).toContain("arch-card--elevated");
    expect(wrapper.classes()).toContain("arch-card--md");
    expect(wrapper.text()).toBe("Project summary");
  });

  it("supports custom element, variant, padding, surface, and interactive state", () => {
    const wrapper = mount(ArchCard, {
      props: {
        as: "section",
        variant: "outlined",
        padding: "lg",
        surface: "solid",
        interactive: true
      },
      slots: {
        default: "Settings"
      }
    });

    expect(wrapper.element.tagName).toBe("SECTION");
    expect(wrapper.classes()).toContain("arch-card--outlined");
    expect(wrapper.classes()).toContain("arch-card--lg");
    expect(wrapper.classes()).toContain("arch-card--surface-solid");
    expect(wrapper.classes()).toContain("arch-card--interactive");
    expect(wrapper.attributes("tabindex")).toBe("0");
  });

  it("renders named header, default, and footer slots", () => {
    const wrapper = mount(ArchCard, {
      slots: {
        header: "Header",
        default: "Body",
        footer: "Footer"
      }
    });

    expect(wrapper.find(".arch-card__header").text()).toBe("Header");
    expect(wrapper.find(".arch-card__body").text()).toBe("Body");
    expect(wrapper.find(".arch-card__footer").text()).toBe("Footer");
  });
});
