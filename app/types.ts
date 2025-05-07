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

export type RecursiveRecord = {
  [key: string | number]:
    | RecursiveRecord
    | RecursiveRecord[]
    | Primitive
    | Primitive[];
};

export type RecursivePartial<T> = T extends Function
  ? T
  : T extends Array<infer U>
    ? RecursivePartial<U>[]
    : T extends object
      ? {
          [K in keyof T]?: RecursivePartial<T[K]>;
        }
      : T;

export type RecursiveNonNullable<T> = T extends Function
  ? T
  : T extends Array<infer U>
    ? RecursiveNonNullable<U>[]
    : T extends object
      ? {
          [K in keyof T]-?: RecursiveNonNullable<T[K]>;
        }
      : NonNullable<T>;

export type RecursiveNullable<T> = T extends Function
  ? T | Nullable
  : T extends Array<infer U>
    ? RecursiveNullable<U>[] | Nullable
    : T extends object
      ?
          | {
              [K in keyof T]?: RecursiveNullable<T[K]>;
            }
          | Nullable
      : T | Nullable;
