import { describe, expect, it } from "vitest";
import { computeFloatingPosition } from "./useFloatingPosition";

describe("computeFloatingPosition", () => {
  it("clamps start-aligned overlays inside the viewport", () => {
    expect(
      computeFloatingPosition(
        { top: 40, right: 1432, bottom: 72, left: 1320, width: 112, height: 32 },
        { width: 192, height: 120 },
        { width: 1440, height: 900 },
        { align: "start" }
      )
    ).toMatchObject({
      left: 1232,
      top: 80,
      width: 192
    });
  });

  it("supports end alignment for right-edge triggers", () => {
    expect(
      computeFloatingPosition(
        { top: 40, right: 1432, bottom: 72, left: 1320, width: 112, height: 32 },
        { width: 192, height: 120 },
        { width: 1440, height: 900 },
        { align: "end" }
      )
    ).toMatchObject({
      left: 1232,
      top: 80,
      width: 192
    });
  });

  it("places overlays above the trigger when there is not enough space below", () => {
    expect(
      computeFloatingPosition(
        { top: 820, right: 500, bottom: 860, left: 260, width: 240, height: 40 },
        { width: 320, height: 180 },
        { width: 1024, height: 900 },
        { align: "start" }
      )
    ).toMatchObject({
      left: 260,
      top: 632,
      width: 320
    });
  });

  it("flips top placement below the trigger when the overlay would escape above the viewport", () => {
    expect(
      computeFloatingPosition(
        { top: 4, right: 440, bottom: 44, left: 240, width: 200, height: 40 },
        { width: 220, height: 56 },
        { width: 800, height: 600 },
        { placement: "top", offset: 8, padding: 12 }
      )
    ).toMatchObject({
      left: 230,
      top: 52,
      width: 220,
      placement: "bottom"
    });
  });

  it("keeps top-placed overlays inside the horizontal viewport edges", () => {
    expect(
      computeFloatingPosition(
        { top: 120, right: 64, bottom: 160, left: 8, width: 56, height: 40 },
        { width: 260, height: 48 },
        { width: 320, height: 600 },
        { placement: "top", offset: 8, padding: 12 }
      )
    ).toMatchObject({
      left: 12,
      top: 64,
      width: 260,
      placement: "top"
    });
  });
});
