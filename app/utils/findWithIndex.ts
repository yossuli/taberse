export const findWithIndexResult = <T, U>(
  arr: T[],
  callbackFn: (value: T, index?: number, obj?: T[]) => U,
): [T, number, U] | undefined => {
  const index = arr.findIndex(callbackFn);
  if (index === -1) {
    return undefined;
  }
  return [arr[index], index, callbackFn(arr[index], index, arr)];
};

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest;
  it("findWithIndexResult normal test", () => {
    const arr = [1, 2, 3];
    const result = findWithIndexResult(arr, (value) => value === 2);
    expect(result).toEqual([2, 1, true]);
  });

  it("findWithIndexResult not found test", () => {
    const arr = [1, 2, 3];
    const result = findWithIndexResult(arr, (value) => value === 4);
    expect(result).toEqual(undefined);
  });

  it("findWithIndexResult empty array test", () => {
    const arr: number[] = [];
    const result = findWithIndexResult(arr, (value) => value === 2);
    expect(result).toEqual(undefined);
  });

  it("findWithIndexResult object test", () => {
    const arr = [
      { id: 1, name: "a" },
      { id: 2, name: "b" },
      { id: 3, name: "c" },
    ];
    const result = findWithIndexResult(arr, (value) => value.name === "b");
    expect(result).toEqual([{ id: 2, name: "b" }, 1, true]);
  });

  it("nested findWithIndexResult test", () => {
    const arr = [
      { id: 1, name: "a", children: [{ id: 4, name: "d" }] },
      { id: 2, name: "b", children: [{ id: 5, name: "e" }] },
      { id: 3, name: "c", children: [{ id: 6, name: "f" }] },
    ];
    const result = findWithIndexResult(
      arr,
      (value) =>
        findWithIndexResult(value.children, (child) => child.name === "e")?.[0],
    );
    expect(result).toEqual([
      { id: 2, name: "b", children: [{ id: 5, name: "e" }] },
      1,
      { id: 5, name: "e" },
    ]);
  });

  it("nested findWithIndexResult not found test", () => {
    const arr = [
      { id: 1, name: "a", children: [{ id: 4, name: "d" }] },
      { id: 2, name: "b", children: [{ id: 5, name: "e" }] },
      { id: 3, name: "c", children: [{ id: 6, name: "f" }] },
    ];
    const result = findWithIndexResult(
      arr,
      (value) =>
        findWithIndexResult(value.children, (child) => child.name === "g")?.[0],
    );
    expect(result).toEqual(undefined);
  });
}
