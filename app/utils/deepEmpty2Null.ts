// import type { Primitive, RecursiveRecord } from "app/types";
import { isNullable } from "./isNullable";

const arrayHandler = (
  obj: Primitive[] | RecursiveRecord[],
): RecursiveRecord | Primitive | Primitive[] | RecursiveRecord[] => {
  const mapped = obj.map(deepEmpty2Null) as (
    | RecursiveRecord
    | Primitive
    | null
  )[];
  return mapped.every((item) => item === null)
    ? null
    : (mapped as Primitive[] | RecursiveRecord[]);
};

const objectHandler = (
  obj: RecursiveRecord,
): RecursiveRecord | Primitive | Primitive[] | RecursiveRecord[] => {
  const newObj = Object.entries(obj).reduce((acc, [key, value]) => {
    const newValue = deepEmpty2Null(value);
    if (newValue !== null) {
      acc[key] = newValue;
    }
    return acc;
  }, {} as RecursiveRecord);
  return Object.keys(newObj).length === 0 ? null : newObj;
};
export const deepEmpty2Null = (
  obj: RecursiveRecord | Primitive | Primitive[] | RecursiveRecord[],
): RecursiveRecord | Primitive | Primitive[] | RecursiveRecord[] | null => {
  if (isNullable(obj)) {
    return null;
  }

  if (Array.isArray(obj)) {
    return arrayHandler(obj);
  }

  if (typeof obj === "object") {
    return objectHandler(obj);
  }

  return obj;
};

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest;
  it("deepEmpty2Null normal test", () => {
    const obj = { a: 1, b: [2, 3], c: { d: 4 } };
    const result = deepEmpty2Null(obj);
    expect(result).toEqual(obj);
  });

  it("deepEmpty2Null empty object test", () => {
    const obj = {};
    const result = deepEmpty2Null(obj);
    expect(result).toEqual(null);
  });

  it("deepEmpty2Null empty array test", () => {
    const obj: any[] = [];
    const result = deepEmpty2Null(obj);
    expect(result).toEqual(null);
  });

  it("deepEmpty2Null null test", () => {
    const obj = null;
    const result = deepEmpty2Null(obj);
    expect(result).toEqual(null);
  });

  it("deepEmpty2Null undefined test", () => {
    const obj = undefined;
    const result = deepEmpty2Null(obj);
    expect(result).toEqual(null);
  });

  it("deepEmpty2Null nested empty object test", () => {
    const obj = { a: {}, b: { c: {} } };
    const result = deepEmpty2Null(obj);
    expect(result).toEqual(null);
  });

  it("deepEmpty2Null nested empty array test", () => {
    const obj = [{ a: [] }, { b: [{ c: [] }] }];
    const result = deepEmpty2Null(obj);
    expect(result).toEqual(null);
  });
  it("deepEmpty2Null nested empty array test", () => {
    const obj = [{}];
    const result = deepEmpty2Null(obj);
    expect(result).toEqual(null);
  });
}
