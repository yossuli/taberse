import type { Area, Pos } from "app/types";

export const isInArea = ({ l, t, r, b }: Area, { x, y }: Pos) =>
  [t <= y, l <= x, b >= y, r >= x].every(Boolean);

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest;
  it("isInArea normal test", () => {
    const area = { t: 0, l: 0, b: 10, r: 10 };
    const pos = { x: 5, y: 5 };
    const result = isInArea(area, pos);
    expect(result).toBe(true);
  });

  it("isInArea false test", () => {
    const area = { t: 0, l: 0, b: 10, r: 10 };
    const pos = { x: -1, y: -1 };
    const result = isInArea(area, pos);
    expect(result).toBe(false);
  });
}
