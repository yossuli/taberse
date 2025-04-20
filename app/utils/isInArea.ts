import type { Area, Pos } from "app/types";

export const isInArea = ({ l, t, r, b }: Area, { x, y }: Pos) =>
  [t <= y, l <= x, b >= y, r >= x].every(Boolean);
