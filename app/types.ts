import type { RuleSchema } from "app/zodSchemas";
import type {
  Control,
  FieldErrors,
  UseFormRegisterReturn,
  UseFormTrigger,
} from "react-hook-form";
import type { z } from "zod";

export type RuleType = z.infer<typeof RuleSchema>;

export type RuleMakeFormChildrenOmitRegisterProps = {
  errors: FieldErrors<RuleType>;
  control?: Control<RuleType>;
  trigger?: UseFormTrigger<RuleType>;
};

export type RuleMakeFormChildrenProps = RuleMakeFormChildrenOmitRegisterProps &
  Record<`register${string}`, UseFormRegisterReturn<string>>;
