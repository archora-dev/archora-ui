import { mount } from "@vue/test-utils";
import { h } from "vue";
import { describe, expect, it } from "vitest";
import { ArchTable } from "./index";

const columns = [
  { key: "name", label: "Name" },
  { key: "status", label: "Status" }
];

const rows = [
  { id: "1", name: "API", status: "Stable" },
  { id: "2", name: "Docs", status: "Draft" }
];

describe("ArchTable", () => {
  it("renders column headers and row cells", () => {
    const wrapper = mount(ArchTable, {
      props: {
        columns,
        rows,
        rowKey: "id"
      }
    });

    expect(wrapper.findAll("th")).toHaveLength(2);
    expect(wrapper.text()).toContain("Name");
    expect(wrapper.text()).toContain("API");
    expect(wrapper.text()).toContain("Draft");
  });

  it("renders an empty state when there are no rows", () => {
    const wrapper = mount(ArchTable, {
      props: {
        columns,
        rows: [],
        emptyText: "No projects"
      }
    });

    expect(wrapper.get('[role="status"]').text()).toBe("No projects");
  });

  it("renders a loading state", () => {
    const wrapper = mount(ArchTable, {
      props: {
        columns,
        rows,
        loading: true,
        loadingText: "Loading projects"
      }
    });

    expect(wrapper.get('[role="status"]').text()).toBe("Loading projects");
  });

  it("supports custom cell slots", () => {
    const wrapper = mount(ArchTable, {
      props: {
        columns,
        rows
      },
      slots: {
        "cell-status": ({ value }) => h("strong", String(value))
      }
    });

    expect(wrapper.get("strong").text()).toBe("Stable");
  });
});
