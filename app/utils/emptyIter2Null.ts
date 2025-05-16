export const emptyIter2Null = <
  T extends {
    [Symbol.iterator]: () => {
      next: () => { done?: boolean };
    };
  },
>(
  arr: T,
) => (!arr[Symbol.iterator]().next().done || null) && arr;

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest;
  it("empty2False normal test", () => {
    const arr = [1, 2, 3];
    const result = emptyIter2Null(arr);
    expect(result).toEqual(arr);
  });
  it("empty2False empty array test", () => {
    const arr: number[] = [];
    const result = emptyIter2Null(arr);
    expect(result).toEqual(null);
  });

  it("empty2False string test", () => {
    const str = "hello";
    const result = emptyIter2Null(str);
    expect(result).toEqual(str);
  });
  it("empty2False empty string test", () => {
    const str = "";
    const result = emptyIter2Null(str);
    expect(result).toEqual(null);
  });

  it("empty2False set test", () => {
    const set = new Set([1, 2, 3]);
    const result = emptyIter2Null(set);
    expect(result).toEqual(set);
  });
  it("empty2False empty set test", () => {
    const set = new Set();
    const result = emptyIter2Null(set);
    expect(result).toEqual(null);
  });
}
