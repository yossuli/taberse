import type { RuleSchema } from "app/zodSchemas/ruleMakeForm";
import type {
  Control,
  FieldErrors,
  UseFormRegister,
  UseFormTrigger,
  UseFormWatch,
} from "react-hook-form";
import type { z } from "zod";

export type RuleType = z.infer<typeof RuleSchema>;

export type RuleMakeFormChildrenProps = {
  watch: UseFormWatch<RuleType>;
  // getValues: UseFormGetValues<RuleType>;
  // getFieldState: UseFormGetFieldState<RuleType>;
  // setError: UseFormSetError<RuleType>;
  // clearErrors: UseFormClearErrors<RuleType>;
  // setValue: UseFormSetValue<RuleType>;
  trigger: UseFormTrigger<RuleType>;
  // formState: FormState<RuleType>;
  // resetField: UseFormResetField<RuleType>;
  // reset: UseFormReset<RuleType>;
  // unregister: UseFormUnregister<RuleType>;
  control: Control<RuleType>;
  register: UseFormRegister<RuleType>;
  // setFocus: UseFormSetFocus<RuleType>;
  // subscribe: UseFromSubscribe<RuleType>;
  errors: FieldErrors<RuleType>;
};

export type StrictOmit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export type Area = {
  t: number;
  l: number;
  b: number;
  r: number;
};

export type Pos = {
  x: number;
  y: number;
};
export type Nullable = undefined | null;

export type Primitive = string | number | boolean | null | undefined;

type FilterTarget<
  T extends string,
  Array extends readonly [string, ...string[]],
> = Array extends [infer U, infer V]
  ? U extends T
    ? V extends T
      ? [U, T]
      : [U]
    : V extends T
      ? [V]
      : []
  : Array extends [infer U, ...infer Rest extends [string, ...string[]]]
    ? U extends T
      ? [U, ...FilterTarget<T, Rest>]
      : FilterTarget<T, Rest>
    : Array;

export type EnsureUniqueStrArr<T extends readonly [string, ...string[]]> = {
  [K in keyof T]: FilterTarget<T[K], T>["length"] extends 1 ? T[K] : never;
};

export type RecursiveNonNullable<T> = T extends [infer U]
  ? [RecursiveNonNullable<U>]
  : T extends [infer U, infer V]
    ? [RecursiveNonNullable<U>, RecursiveNonNullable<V>]
    : T extends [infer U, infer V, infer W]
      ? [
          RecursiveNonNullable<U>,
          RecursiveNonNullable<V>,
          RecursiveNonNullable<W>,
        ]
      : T extends [infer U, infer V, infer W, infer X]
        ? [
            RecursiveNonNullable<U>,
            RecursiveNonNullable<V>,
            RecursiveNonNullable<W>,
            RecursiveNonNullable<X>,
          ]
        : T extends Array<infer U>
          ? RecursiveNonNullable<U>[]
          : T extends Primitive
            ? NonNullable<T>
            : {
                [K in keyof T]-?: RecursiveNonNullable<T[K]>;
              };

if (import.meta.vitest) {
  const { it, expectTypeOf, describe } = import.meta.vitest;
  describe("RecursiveNonNullable", () => {
    it("1elm should be non nullable", () => {
      expectTypeOf<RecursiveNonNullable<[string | Nullable]>>().toEqualTypeOf<
        [string]
      >();
    });

    it("2elm should be non nullable", () => {
      expectTypeOf<
        RecursiveNonNullable<[string | Nullable, number | Nullable]>
      >().toEqualTypeOf<[string, number]>();
    });

    it("3elm should be non nullable", () => {
      expectTypeOf<
        RecursiveNonNullable<
          [string | Nullable, number | Nullable, boolean | Nullable]
        >
      >().toEqualTypeOf<[string, number, boolean]>();
    });

    it("tuple should be non nullable", () => {
      expectTypeOf<
        RecursiveNonNullable<[number, string, boolean] | Nullable>
      >().toEqualTypeOf<[number, string, boolean]>();
    });

    it("nested tuple should be nullable", () => {
      expectTypeOf<
        RecursiveNonNullable<
          [number, string, [number, string, boolean] | Nullable] | Nullable
        >
      >().toEqualTypeOf<[number, string, [number, string, boolean]]>();
    });
  });

  describe("uniqueStrArr", () => {
    it("unique elm array", () => {
      expectTypeOf<EnsureUniqueStrArr<["a", "b", "c"]>>().toEqualTypeOf<
        ["a", "b", "c"]
      >();
    });
    it("duplicate elm array", () => {
      expectTypeOf<EnsureUniqueStrArr<["a", "b", "c", "a"]>>().toEqualTypeOf<
        [never, "b", "c", never]
      >();
    });
  });
  describe("FilterTargetLength", () => {
    it("should be 1", () => {
      expectTypeOf<FilterTarget<"a", ["a"]>>().toEqualTypeOf<["a"]>();
    });
    it("should be 2", () => {
      expectTypeOf<FilterTarget<"a", ["a", "a"]>>().toEqualTypeOf<["a", "a"]>();
    });
    it("should be 1", () => {
      expectTypeOf<FilterTarget<"a", ["a", "b"]>>().toEqualTypeOf<["a"]>();
    });
  });
}
