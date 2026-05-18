import { mount } from "@vue/test-utils";
import { defineComponent, h, nextTick, type Component, type PropType } from "vue";
import { describe, expect, it } from "vitest";
import { ArchVirtualScroller } from "./index";

const Scroller = ArchVirtualScroller as unknown as Component;

function makeItems(count: number): { id: number; label: string }[] {
  return Array.from({ length: count }, (_, index) => ({ id: index, label: `Module ${index}` }));
}

const Harness = defineComponent(
  (props: { items: { id: number; label: string }[]; overscan?: number }) => () =>
    h(
      Scroller,
      {
        items: props.items,
        itemHeight: 24,
        height: 120,
        overscan: props.overscan ?? 2,
        keyFn: (item: { id: number }) => `module-${item.id}`
      },
      {
        default: ({ item }: { item: { id: number; label: string } }) =>
          h("span", { class: "module-row", "data-id": item.id }, item.label)
      }
    ),
  {
    props: {
      items: {
        type: Array as PropType<{ id: number; label: string }[]>,
        required: true
      },
      overscan: {
        type: Number,
        default: undefined
      }
    }
  }
);

describe("ArchVirtualScroller", () => {
  it("renders a bounded window instead of the full collection", async () => {
    const wrapper = mount(Harness, {
      props: {
        items: makeItems(10_000),
        overscan: 2
      }
    });

    await nextTick();

    const rows = wrapper.findAll(".module-row");
    expect(rows.length).toBeLessThan(12);
    expect(rows.length).toBeGreaterThan(4);
    expect(rows[0]?.attributes("data-id")).toBe("0");

    wrapper.unmount();
  });

  it("renders a later window after scroll", async () => {
    const wrapper = mount(Harness, {
      props: {
        items: makeItems(1000),
        overscan: 1
      }
    });
    await nextTick();

    const container = wrapper.get(".arch-virtual-scroller").element as HTMLElement;
    Object.defineProperty(container, "scrollTop", { configurable: true, get: () => 2400 });
    container.dispatchEvent(new Event("scroll"));
    await nextTick();

    const ids = wrapper.findAll(".module-row").map((row) => Number(row.attributes("data-id")));
    expect(Math.min(...ids)).toBeGreaterThan(90);

    wrapper.unmount();
  });

  it("exposes scrollTo", async () => {
    const wrapper = mount(Scroller, {
      props: {
        items: makeItems(100),
        itemHeight: 30,
        height: 90
      },
      slots: {
        default: ({ item }: { item: unknown }) => h("span", (item as { label: string }).label)
      }
    });

    await nextTick();
    (wrapper.vm as unknown as { scrollTo(index: number): void }).scrollTo(12);

    expect((wrapper.get(".arch-virtual-scroller").element as HTMLElement).scrollTop).toBe(360);

    wrapper.unmount();
  });
});
