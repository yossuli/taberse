export const objArr2StrArr = <T extends Record<string, any>, U extends keyof T>(
  objArray: T[] | undefined,
  key: U,
) => objArray?.map((obj) => obj[key]);

if (import.meta.vitest) {
  const { it, expect, expectTypeOf } = import.meta.vitest;
  it("objArr2StrArr normal test", () => {
    const objArray = [{ name: "a" }, { name: "b" }, { name: "c" }];
    const result = objArr2StrArr(objArray, "name");
    expect(result).toEqual(["a", "b", "c"]);
  });

  it("objArr2StrArr empty array test", () => {
    const empty: { id: number; name: string }[] = [];
    const result = objArr2StrArr(empty, "name");
    expect(result).toEqual([]);
  });

  it("objArr2StrArr undefined test", () => {
    const optArray = undefined;
    const result = objArr2StrArr(optArray, "name");
    expect(result).toEqual(undefined);
  });
}
