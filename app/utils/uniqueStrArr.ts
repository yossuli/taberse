import type { EnsureUniqueStrArr } from "app/types";

export const uniqueStrArr = <T extends string[]>(
  arr: EnsureUniqueStrArr<T>,
): T => arr;

if (import.meta.vitest) {
  const { test, expect } = import.meta.vitest;

  test("uniqueStrArr", () => {
    const arr = uniqueStrArr(["a", "b", "c"]);
    expect(arr).toEqual(["a", "b", "c"]);
  });
}
