import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { ArchTimeline } from "./index";

describe("ArchTimeline", () => {
  it("renders timeline events with tone and metadata", () => {
    const wrapper = mount(ArchTimeline, {
      props: {
        items: [
          {
            id: "1",
            title: "Deployment queued",
            description: "Checks started",
            time: "10:42",
            tone: "success"
          }
        ]
      }
    });

    expect(wrapper.get("ol").classes()).toContain("arch-timeline");
    expect(wrapper.text()).toContain("Deployment queued");
    expect(wrapper.get(".arch-timeline__item").classes()).toContain("arch-timeline__item--success");
  });
});
