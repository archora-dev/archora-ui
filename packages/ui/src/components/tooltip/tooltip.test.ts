import { mount } from "@vue/test-utils";
import { afterEach, describe, expect, it } from "vitest";
import { ArchTooltip } from "./index";

describe("ArchTooltip", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("renders trigger slot and tooltip content when open", async () => {
    const wrapper = mount(ArchTooltip, {
      props: {
        content: "Deploy project"
      },
      slots: {
        default: "<button>Deploy</button>"
      }
    });

    expect(wrapper.text()).toContain("Deploy");
    expect(wrapper.find(".arch-tooltip__content").exists()).toBe(false);

    await wrapper.get(".arch-tooltip__trigger").trigger("focusin");

    const content = document.body.querySelector(".arch-tooltip__content");

    expect(content?.textContent).toContain("Deploy project");
    expect(content?.getAttribute("role")).toBe("tooltip");
    expect(content?.classList.contains("arch-tooltip__content--open")).toBe(true);
  });

  it("shows on focus and hides on blur", async () => {
    const wrapper = mount(ArchTooltip, {
      props: {
        content: "Deploy project"
      },
      slots: {
        default: "<button>Deploy</button>"
      }
    });

    await wrapper.get(".arch-tooltip__trigger").trigger("focusin");
    expect(wrapper.classes()).toContain("arch-tooltip--open");

    await wrapper.get(".arch-tooltip__trigger").trigger("focusout");
    expect(wrapper.classes()).not.toContain("arch-tooltip--open");
  });

  it("closes on Escape while focused", async () => {
    const wrapper = mount(ArchTooltip, {
      props: {
        content: "Deploy project"
      },
      slots: {
        default: "<button>Deploy</button>"
      }
    });

    const trigger = wrapper.get(".arch-tooltip__trigger");
    await trigger.trigger("focusin");
    await trigger.trigger("keydown", { key: "Escape" });

    expect(wrapper.classes()).not.toContain("arch-tooltip--open");
  });

  it("supports placement classes", () => {
    const wrapper = mount(ArchTooltip, {
      props: {
        content: "More details",
        placement: "right"
      },
      slots: {
        default: "Info"
      }
    });

    expect(wrapper.classes()).toContain("arch-tooltip--right");
  });
});
