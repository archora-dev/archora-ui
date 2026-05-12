import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { ArchToast, ArchToastViewport, useToast } from "./index";

describe("ArchToast", () => {
  it("renders title, description, and variant", () => {
    const wrapper = mount(ArchToast, {
      props: {
        toast: {
          id: "1",
          title: "Saved",
          description: "Project settings updated.",
          variant: "success"
        }
      }
    });

    expect(wrapper.attributes("role")).toBe("status");
    expect(wrapper.classes()).toContain("arch-toast--success");
    expect(wrapper.text()).toContain("Saved");
    expect(wrapper.text()).toContain("Project settings updated.");
  });

  it("uses alert role for danger variant", () => {
    const wrapper = mount(ArchToast, {
      props: {
        toast: {
          id: "1",
          title: "Failed",
          variant: "danger"
        }
      }
    });

    expect(wrapper.attributes("role")).toBe("alert");
  });

  it("adds and dismisses toasts through useToast", () => {
    const toast = useToast();
    const id = toast.show({ title: "Queued" });

    expect(toast.toasts.value.some((item) => item.id === id)).toBe(true);

    toast.dismiss(id);

    expect(toast.toasts.value.some((item) => item.id === id)).toBe(false);
  });

  it("renders viewport items", () => {
    const toast = useToast();
    toast.clear();
    toast.show({ title: "Synced", variant: "info" });

    const wrapper = mount(ArchToastViewport);

    expect(wrapper.findAll(".arch-toast")).toHaveLength(1);
    expect(wrapper.text()).toContain("Synced");
  });
});
