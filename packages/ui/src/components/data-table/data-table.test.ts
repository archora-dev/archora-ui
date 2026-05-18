import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { ArchDataTable } from "./index";
import type { ArchDataTableColumn } from "./index";

const columns: ArchDataTableColumn[] = [
  { key: "name", label: "Name", sortable: true },
  { key: "score", label: "Score", sortable: true, align: "end" }
];

const rows = [
  { id: "a", name: "API", score: 3 },
  { id: "d", name: "Docs", score: 1 }
];

describe("ArchDataTable", () => {
  it("renders configured columns and rows", () => {
    const wrapper = mount(ArchDataTable, {
      props: {
        columns,
        rows,
        rowKey: "id"
      }
    });

    expect(wrapper.findAll("th")).toHaveLength(2);
    expect(wrapper.text()).toContain("API");
    expect(wrapper.text()).toContain("Docs");
  });

  it("sorts rows when sortable header is clicked", async () => {
    const wrapper = mount(ArchDataTable, {
      props: {
        columns,
        rows,
        rowKey: "id"
      }
    });

    await wrapper.findAll("th button")[1].trigger("click");

    const firstRowCells = wrapper.findAll("tbody tr")[0].findAll("td");

    expect(firstRowCells[0].text()).toBe("Docs");
    expect(wrapper.emitted("update:sortBy")).toEqual([["score"]]);
    expect(wrapper.emitted("update:sortDirection")).toEqual([["asc"]]);
  });

  it("renders loading and empty states", () => {
    const loading = mount(ArchDataTable, {
      props: {
        columns,
        rows,
        loading: true,
        loadingText: "Loading rows"
      }
    });

    const empty = mount(ArchDataTable, {
      props: {
        columns,
        rows: [],
        emptyText: "No rows"
      }
    });

    expect(loading.get('[role="status"]').text()).toBe("Loading rows");
    expect(empty.get('[role="status"]').text()).toBe("No rows");
  });

  it("emits selected row keys", async () => {
    const wrapper = mount(ArchDataTable, {
      props: {
        columns,
        rows,
        rowKey: "id",
        selectable: true
      }
    });

    await wrapper.findAll('tbody input[type="checkbox"]')[0].setValue(true);

    expect(wrapper.emitted("update:selectedKeys")).toEqual([[["a"]]]);
  });

  it("renders selectable rows with ArchCheckbox custom controls", () => {
    const wrapper = mount(ArchDataTable, {
      props: {
        columns,
        rows,
        rowKey: "id",
        selectable: true,
        selectedKeys: ["a"]
      }
    });

    expect(wrapper.findAll(".arch-checkbox")).toHaveLength(2);
    expect(wrapper.findAll(".arch-checkbox__control")).toHaveLength(2);
    expect(wrapper.findAll(".arch-checkbox--checked")).toHaveLength(1);
  });

  it("renders only visible columns when visibleColumnKeys is provided", () => {
    const wrapper = mount(ArchDataTable, {
      props: {
        columns,
        rows,
        rowKey: "id",
        visibleColumnKeys: ["name"]
      }
    });

    expect(wrapper.findAll("th")).toHaveLength(1);
    expect(wrapper.find("thead").text()).toContain("Name");
    expect(wrapper.find("thead").text()).not.toContain("Score");
    expect(wrapper.find("tbody").text()).toContain("API");
    expect(wrapper.find("tbody").text()).not.toContain("3");
  });

  it("paginates rows and emits page changes", async () => {
    const wrapper = mount(ArchDataTable, {
      props: {
        columns,
        rows: [
          { id: "a", name: "API", score: 3 },
          { id: "d", name: "Docs", score: 1 },
          { id: "s", name: "Shell", score: 5 }
        ],
        rowKey: "id",
        page: 1,
        pageSize: 2
      }
    });

    expect(wrapper.findAll("tbody tr")).toHaveLength(2);
    expect(wrapper.text()).toContain("Page 1 of 2");

    await wrapper.get('[aria-label="Next page"]').trigger("click");

    expect(wrapper.emitted("update:page")).toEqual([[2]]);

    await wrapper.setProps({ page: 2 });

    expect(wrapper.findAll("tbody tr")).toHaveLength(1);
    expect(wrapper.find("tbody").text()).toContain("Shell");
  });

  it("renders error state above empty state", () => {
    const wrapper = mount(ArchDataTable, {
      props: {
        columns,
        rows: [],
        errorText: "Could not load rows",
        emptyText: "No rows"
      }
    });

    expect(wrapper.get('[role="alert"]').text()).toBe("Could not load rows");
    expect(wrapper.text()).not.toContain("No rows");
  });

  it("renders custom header and row action slots", () => {
    const wrapper = mount(ArchDataTable, {
      props: {
        columns,
        rows,
        rowKey: "id"
      },
      slots: {
        "header-score": "<span>Health score</span>",
        "row-actions": '<button type="button">Open</button>'
      }
    });

    expect(wrapper.find("thead").text()).toContain("Health score");
    expect(wrapper.findAll("tbody tr")[0].text()).toContain("Open");
  });
});
