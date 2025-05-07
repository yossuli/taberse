export const empty2False = <
  T extends {
    [Symbol.iterator]: () => {
      next: () => { done?: boolean };
    };
  },
>(
  arr: T,
) => (!arr[Symbol.iterator]().next().done || undefined) && arr;

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest;
  it("empty2False normal test", () => {
    const arr = [1, 2, 3];
    const result = empty2False(arr);
    expect(result).toEqual(arr);
  });
  it("empty2False empty array test", () => {
    const arr: number[] = [];
    const result = empty2False(arr);
    expect(result).toEqual(false);
  });

  it("empty2False string test", () => {
    const str = "hello";
    const result = empty2False(str);
    expect(result).toEqual(str);
  });
  it("empty2False empty string test", () => {
    const str = "";
    const result = empty2False(str);
    expect(result).toEqual(false);
  });

  it("empty2False set test", () => {
    const set = new Set([1, 2, 3]);
    const result = empty2False(set);
    expect(result).toEqual(set);
  });
  it("empty2False empty set test", () => {
    const set = new Set();
    const result = empty2False(set);
    expect(result).toEqual(false);
  });
}
