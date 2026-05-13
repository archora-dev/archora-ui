import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { ArchBadgeGroup } from "./index";

describe("ArchBadgeGroup", () => {
  it("renders visible items through the slot and summarizes overflow", () => {
    const wrapper = mount(ArchBadgeGroup, {
      props: {
        items: ["API", "Web", "Billing"],
        limit: 2
      },
      slots: {
        default: `<template #default="{ item }"><span class="tag">{{ item }}</span></template>`
      }
    });

    expect(wrapper.findAll(".tag").map((tag) => tag.text())).toEqual(["API", "Web"]);
    expect(wrapper.text()).toContain("+1");
  });
});
