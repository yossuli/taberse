import type { RecursiveNonNullable } from "app/types";

export const callWithIfDefine = <T>(
  value: T,
  callbackFn: (arg: RecursiveNonNullable<T>) => void,
) => {
  if (value === undefined) {
    return;
  }
  callbackFn(value as RecursiveNonNullable<T>);
};

if (import.meta.vitest) {
  const { it, expect, vi } = import.meta.vitest;
  it("callWithIfDefine normal test", () => {
    const obj = { a: 1, b: { c: 2 } };
    const callbackFn = vi.fn(
      ({ a, b: { c } }: { a: number; b: { c: number } }) => {
        expect(a).toEqual(obj.a);
        expect(c).toEqual(obj.b.c);
      },
    );
    callWithIfDefine(obj, callbackFn);
    expect(callbackFn).toHaveBeenCalled();
  });

  it("callWithIfDefine undefined test", () => {
    const obj = undefined;
    const callbackFn = vi.fn(
      ({ a, b: { c } }: { a: number; b: { c: number } }) => {
        console.error(`should not be called: ${a}, ${c}`);
      },
    );
    callWithIfDefine(obj, callbackFn);
    expect(callbackFn).not.toHaveBeenCalled();
  });
}
