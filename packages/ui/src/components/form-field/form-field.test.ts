import { mount } from "@vue/test-utils";
import { h } from "vue";
import { describe, expect, it } from "vitest";
import { ArchFormField } from "./index";

describe("ArchFormField", () => {
  it("renders label, description, and error content", () => {
    const wrapper = mount(ArchFormField, {
      props: {
        label: "Project name",
        description: "Used in dashboards",
        error: "Project name is required"
      },
      slots: {
        default: "<input />"
      }
    });

    expect(wrapper.get("label").text()).toContain("Project name");
    expect(wrapper.text()).toContain("Used in dashboards");
    expect(wrapper.get('[role="alert"]').text()).toBe("Project name is required");
  });

  it("passes accessible field props to default slot", () => {
    const wrapper = mount(ArchFormField, {
      props: {
        label: "Email",
        description: "Work email",
        error: "Invalid email"
      },
      slots: {
        default: ({ id, describedby, invalid }) =>
          h("input", {
            id,
            "aria-describedby": describedby,
            "aria-invalid": invalid ? "true" : undefined
          })
      }
    });

    const input = wrapper.get("input");

    expect(input.attributes("id")).toBeTruthy();
    expect(wrapper.get("label").attributes("for")).toBe(input.attributes("id"));
    expect(input.attributes("aria-describedby")).toContain("description");
    expect(input.attributes("aria-describedby")).toContain("error");
    expect(input.attributes("aria-invalid")).toBe("true");
  });

  it("marks required fields", () => {
    const wrapper = mount(ArchFormField, {
      props: {
        label: "Repository",
        required: true
      },
      slots: {
        default: "<input />"
      }
    });

    expect(wrapper.get(".arch-form-field__required").attributes("aria-hidden")).toBe("true");
  });
});
