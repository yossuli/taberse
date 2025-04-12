import type { RuleSchema } from "app/zodSchemas";
import type {
  FieldErrors,
  UseFormRegister,
  UseFormTrigger,
} from "react-hook-form";
import type { z } from "zod";

export type RuleType = z.infer<typeof RuleSchema>;

export type RuleMakeFormChildrenProps = {
  // watch: UseFormWatch<RuleType>;
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
  // control: Control<RuleType>;
  register: UseFormRegister<RuleType>;
  // setFocus: UseFormSetFocus<RuleType>;
  // subscribe: UseFromSubscribe<RuleType>;
  errors: FieldErrors<RuleType>;
};
