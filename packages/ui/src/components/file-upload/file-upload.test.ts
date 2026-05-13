import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { ArchFileUpload } from "./index";

describe("ArchFileUpload", () => {
  it("renders selected files and emits file changes", async () => {
    const file = new File(["hello"], "report.txt", { type: "text/plain" });
    const wrapper = mount(ArchFileUpload, {
      props: {
        modelValue: [file],
        label: "Upload report",
        description: "TXT only"
      }
    });
    const input = wrapper.get("input").element as HTMLInputElement;

    Object.defineProperty(input, "files", {
      value: [file],
      configurable: true
    });
    await wrapper.get("input").trigger("change");

    expect(wrapper.text()).toContain("Upload report");
    expect(wrapper.text()).toContain("report.txt");
    expect(wrapper.emitted("update:modelValue")?.[0]?.[0]).toEqual([file]);
  });
});
