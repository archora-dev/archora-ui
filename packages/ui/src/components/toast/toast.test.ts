import { mount } from "@vue/test-utils";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it, vi } from "vitest";
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
    toast.clear();
    const id = toast.show({ title: "Queued" });

    expect(toast.toasts.value.some((item) => item.id === id)).toBe(true);

    toast.dismiss(id);

    expect(toast.toasts.value.some((item) => item.id === id)).toBe(false);
  });

  it("keeps duration zero toasts until dismissed", () => {
    vi.useFakeTimers();
    const toast = useToast();
    toast.clear();

    const id = toast.push({ title: "Persistent", duration: 0 });
    vi.advanceTimersByTime(10_000);

    expect(toast.toasts.value.some((item) => item.id === id)).toBe(true);

    toast.dismiss(id);
    vi.useRealTimers();
  });

  it("dismisses timed toasts after their duration", () => {
    vi.useFakeTimers();
    const toast = useToast();
    toast.clear();

    const id = toast.push({ title: "Timed", duration: 250 });
    vi.advanceTimersByTime(250);

    expect(toast.toasts.value.some((item) => item.id === id)).toBe(false);

    vi.useRealTimers();
  });

  it("offers variant helper methods", () => {
    const toast = useToast();
    toast.clear();

    toast.success("Saved");
    toast.warning("Watch");
    toast.danger("Failed");

    expect(toast.toasts.value.map((item) => item.variant)).toEqual(["success", "warning", "danger"]);
  });

  it("runs actions and dismisses by default", async () => {
    const action = vi.fn();
    const toast = useToast();
    toast.clear();
    const id = toast.push({
      title: "Restore session",
      duration: 0,
      actions: [{ label: "Restore", onClick: action }]
    });

    const wrapper = mount(ArchToast, {
      props: {
        toast: toast.toasts.value.find((item) => item.id === id)!
      }
    });

    await wrapper.get(".arch-toast__action").trigger("click");

    expect(action).toHaveBeenCalledOnce();
    expect(toast.toasts.value.some((item) => item.id === id)).toBe(false);
  });

  it("keeps a toast open when an action disables dismissal", async () => {
    const action = vi.fn();
    const toast = useToast();
    toast.clear();
    const id = toast.push({
      title: "Retry",
      duration: 0,
      actions: [{ label: "Retry", onClick: action, dismiss: false }]
    });

    const wrapper = mount(ArchToast, {
      props: {
        toast: toast.toasts.value.find((item) => item.id === id)!
      }
    });

    await wrapper.get(".arch-toast__action").trigger("click");

    expect(action).toHaveBeenCalledOnce();
    expect(toast.toasts.value.some((item) => item.id === id)).toBe(true);
  });

  it("renders viewport items", () => {
    const toast = useToast();
    toast.clear();
    toast.show({ title: "Synced", variant: "info" });

    const wrapper = mount(ArchToastViewport);

    expect(wrapper.findAll(".arch-toast")).toHaveLength(1);
    expect(wrapper.text()).toContain("Synced");
  });

  it("adds the configured viewport position class", () => {
    const wrapper = mount(ArchToastViewport, {
      props: {
        position: "bottom-left"
      }
    });

    expect(wrapper.classes()).toContain("arch-toast-viewport--bottom-left");
  });

  it("positions the viewport fixed to the visible screen", () => {
    const css = readFileSync(resolve(__dirname, "../../styles/components/toast.css"), "utf8");

    expect(css).toMatch(/\.arch-toast-viewport\s*{[^}]*position:\s*fixed/s);
    expect(css).toMatch(/\.arch-toast-viewport\s*{[^}]*z-index:\s*var\(--arch-z-toast\)/s);
    expect(css).toMatch(/\.arch-toast-viewport--top-right\s*{[^}]*top:\s*var\(--arch-space-6\)/s);
    expect(css).toMatch(/\.arch-toast-viewport--top-right\s*{[^}]*right:\s*var\(--arch-space-6\)/s);
    expect(css).toMatch(
      /\.arch-toast-viewport--bottom-left\s*{[^}]*bottom:\s*var\(--arch-space-6\)/s
    );
    expect(css).toMatch(
      /\.arch-toast-viewport--bottom-left\s*{[^}]*left:\s*var\(--arch-space-6\)/s
    );
  });
});
