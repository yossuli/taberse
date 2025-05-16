// import type { RecursiveNullable, RecursiveRecord } from "app/types";

const recursionAvoidAssignErrors = <T extends RecursiveRecord | undefined>(
  nullableObj: RecursiveNullable<T>,
  targetStructure: T | {},
): T | {} => {
  return Array.isArray(targetStructure)
    ? targetStructure.reduce((prev, curr, i) => {
        const nullableArrElm = nullableObj?.[i];
        if (curr instanceof Object) {
          return [...prev, recursionAvoidAssignErrors(nullableArrElm, curr)];
        }
        if (nullableObj === undefined) {
          return prev;
        }
        return [...prev, nullableArrElm];
      }, [])
    : targetStructure instanceof Object
      ? Object.entries(targetStructure).reduce((prev, [key, value]) => {
          const nullableObjProp = nullableObj?.[key];
          if (value instanceof Object) {
            return {
              ...prev,
              [key]: recursionAvoidAssignErrors(nullableObjProp, value),
            };
          }
          if (nullableObjProp === undefined) {
            return prev;
          }
          return { ...prev, [key]: nullableObjProp };
        }, {})
      : (nullableObj ?? {});
};

export const avoidAssignErrors = <
  T extends RecursiveRecord,
  U extends RecursiveNullable<T>,
>(
  nullableObj: U,
  targetStructure: T,
  fnWithAsserted: (d: T) => void,
) => {
  const AvoidedErrorObj = recursionAvoidAssignErrors(
    nullableObj,
    targetStructure,
  );

  fnWithAsserted(AvoidedErrorObj);
};

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest;
  it("avoidAssignErrors test", () => {
    const nullableObj = undefined;
    const targetStructure = {
      a: "",
    };
    const fn = ({ a }: typeof targetStructure) => {
      expect(a).toBe(undefined);
    };
    avoidAssignErrors(nullableObj, targetStructure, fn);
  });
  it("avoidAssignErrors test with nonNullObj", () => {
    const nullableObj = {
      a: "test",
    };
    const targetStructure = {
      a: "",
    };
    const fn = ({ a }: typeof targetStructure) => {
      expect(a).toBe("test");
    };
    avoidAssignErrors(nullableObj, targetStructure, fn);
  });

  it("avoidAssignErrors test nested structure", () => {
    const nullableObj = {
      a: undefined,
    };
    const targetStructure = {
      a: {
        b: "",
      },
    };
    const fn = ({ a: { b } }: typeof targetStructure) => {
      expect(b).toBe(undefined);
    };
    avoidAssignErrors(nullableObj, targetStructure, fn);
  });
  it("avoidAssignErrors test with nonNullObj and nested structure", () => {
    const nullableObj = {
      a: {
        b: "test",
      },
    };
    const targetStructure = {
      a: {
        b: "",
      },
    };
    const fn = ({ a: { b } }: typeof targetStructure) => {
      expect(b).toBe("test");
    };
    avoidAssignErrors(nullableObj, targetStructure, fn);
  });

  it("avoidAssignErrors test with nested nonNullObj", () => {
    const nullableObj = {
      a: {
        c: { d: "test" },
      },
    };
    const targetStructure = {
      a: {
        b: "",
        c: { d: "" },
      },
    };
    const fn = ({
      a: {
        b,
        c: { d },
      },
    }: typeof targetStructure) => {
      expect(b).toBe(undefined);
      expect(d).toBe("test");
    };
    avoidAssignErrors(nullableObj, targetStructure, fn);
  });
  it("avoidAssignErrors test nested structure with nonNullObj", () => {
    const nullableObj = {
      a: {
        b: "test",
      },
    };
    const targetStructure = {
      a: {
        b: "",
        c: { d: "" },
      },
    };
    const fn = ({
      a: {
        b,
        c: { d },
      },
    }: typeof targetStructure) => {
      expect(b).toBe("test");
      expect(d).toBe(undefined);
    };
    avoidAssignErrors(nullableObj, targetStructure, fn);
  });
  it("avoidAssignErrors test with nonNullObj and nested structure", () => {
    const nullableObj = {
      a: {
        b: "test",
        c: { d: "test" },
      },
    };
    const targetStructure = {
      a: {
        b: "",
        c: { d: "" },
      },
    };
    const fn = ({
      a: {
        b,
        c: { d },
      },
    }: typeof targetStructure) => {
      expect(b).toBe("test");
      expect(d).toBe("test");
    };
    avoidAssignErrors(nullableObj, targetStructure, fn);
  });
}
