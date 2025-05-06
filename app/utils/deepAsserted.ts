import assert from "node:assert";
import type { RecursiveNonNullable } from "app/types";

export const deepAsserted = <T>(value: T): RecursiveNonNullable<T> => {
  deepAssert(value);
  return value;
};

type DeepAssert = <T>(value: T) => asserts value is T & RecursiveNonNullable<T>;

export const deepAssert: DeepAssert = (value) => {
  const recursionAssert = (val: unknown): void => {
    if (val !== null && typeof val === "object") {
      Object.values(val).forEach((v) => recursionAssert(v));
    } else {
      assert(val !== null && val !== undefined, "Value is null or undefined");
    }
  };
  recursionAssert(value);
};

deepAsserted(new Set());
type T = {
  [K in keyof Set<unknown>]: NonNullable<Set<unknown>[K]>;
};
